// Kavéra consent form: POST /api/consent
// Emails the signed form (with the signature image attached) to Karen through Brevo's transactional email API.
// Needs Vercel env vars: BREVO_API_KEY, and optionally CONSENT_TO (default hola@kavera.mx, which forwards to Karen's Gmail)
// and CONSENT_FROM (a sender verified in Brevo; default hola@kavera.mx).
// Without BREVO_API_KEY it answers 503 and the page falls back to WhatsApp + a downloadable copy for the client.
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const nombre = String(b.nombre || '').slice(0, 120), tel = String(b.telefono || '').slice(0, 40), email = String(b.email || '').slice(0, 120);
  const firma = String(b.firma || '');
  if (nombre.length < 3 || (!tel && !email) || !firma.startsWith('data:image/png;base64,') || firma.length > 1500000) return res.status(400).json({ ok: false, error: 'invalid' });
  const key = process.env.BREVO_API_KEY; if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });
  const to = process.env.CONSENT_TO || 'hola@kavera.mx', from = process.env.CONSENT_FROM || 'hola@kavera.mx';
  const ans = Array.isArray(b.respuestas) ? b.respuestas.slice(0, 20) : [];
  const svc = Array.isArray(b.servicios) ? b.servicios.slice(0, 10).join(', ') : '';
  const row = (k, v) => `<tr><td style="padding:6px 10px;color:#6A585B;vertical-align:top">${esc(k)}</td><td style="padding:6px 10px"><b>${esc(v)}</b></td></tr>`;
  const html = `<div style="font-family:Arial,sans-serif;color:#1E2A1D;max-width:640px">
<h2 style="margin:0 0 6px">Ficha y consentimiento firmado</h2><p style="margin:0 0 14px;color:#6A585B">Kavéra Aesthetics · ${esc(new Date(b.firmadoEn || Date.now()).toLocaleString('es-MX', { timeZone: 'America/Cancun' }))}</p>
<table style="border-collapse:collapse;font-size:14px">${row('Nombre', nombre)}${row('Teléfono', tel || '—')}${row('Correo', email || '—')}${row('Cita', (b.fecha || '') + ' ' + (b.hora || ''))}${row('Servicio(s)', svc)}
${ans.map((a) => row(a[0], a[1])).join('')}${row('Notas', b.notas || '—')}${row('Fotos para portafolio', b.fotos ? 'Sí' : 'No')}${row('Promociones', b.promo ? 'Sí' : 'No')}${row('Consentimiento y aviso de privacidad', 'Aceptados')}</table>
<p style="font-size:13px;color:#6A585B">Firma adjunta (firma.png). Términos aceptados:</p><ul style="font-size:13px;color:#4E3D40">${(b.terminos || []).slice(0, 10).map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`;
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ sender: { name: 'Kavéra · Consentimientos', email: from }, to: [{ email: to }], replyTo: email ? { email, name: nombre } : undefined,
        subject: `Consentimiento firmado · ${nombre} · ${b.fecha || ''}`, htmlContent: html,
        attachment: [{ name: 'firma.png', content: firma.split(',')[1] }] })
    });
    if (r.ok) return res.status(200).json({ ok: true });
    console.error('brevo consent', r.status, (await r.text()).slice(0, 300));
    return res.status(502).json({ ok: false });
  } catch (e) { console.error('brevo consent fetch', e && e.message); return res.status(502).json({ ok: false }); }
};
