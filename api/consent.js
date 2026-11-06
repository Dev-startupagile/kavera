// Kavéra consent form: POST /api/consent
// Every signed form is emailed to Karen (CONSENT_TO, default hola@kavera.mx → forwards to her Gmail) through Brevo,
// with the signature attached and any "Sí" health answers flagged at the top. If the client gave an email, she gets a copy.
// Vercel env vars: BREVO_API_KEY (required), CONSENT_TO, CONSENT_FROM (a sender verified in Brevo; default hola@kavera.mx).
// Without BREVO_API_KEY it answers 503 and the page falls back to WhatsApp + a downloadable copy for the client.
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function send(key, payload) {
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST', headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(payload)
  });
  if (!r.ok) console.error('brevo consent', r.status, (await r.text()).slice(0, 300));
  return r.ok;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const nombre = String(b.nombre || '').slice(0, 120), tel = String(b.telefono || '').slice(0, 40), email = String(b.email || '').slice(0, 120);
  const firma = String(b.firma || '');
  if (nombre.length < 3 || (!tel && !email) || !firma.startsWith('data:image/png;base64,') || firma.length > 1500000) return res.status(400).json({ ok: false, error: 'invalid' });
  const key = process.env.BREVO_API_KEY; if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });
  const to = process.env.CONSENT_TO || 'hola@kavera.mx', from = process.env.CONSENT_FROM || 'hola@kavera.mx';

  const ans = (Array.isArray(b.respuestas) ? b.respuestas : []).slice(0, 20).map((a) => [String(a[0] || '').slice(0, 300), String(a[1] || '').slice(0, 20)]);
  const yes = ans.filter((a) => /^s[ií]/i.test(a[1]));
  const svc = Array.isArray(b.servicios) ? b.servicios.slice(0, 10).map(String).join(', ') : '';
  const notas = String(b.notas || '').slice(0, 2000);
  const cuando = new Date(b.firmadoEn || Date.now()).toLocaleString('es-MX', { timeZone: 'America/Cancun', dateStyle: 'long', timeStyle: 'short' });
  const cita = [b.fecha, b.hora].filter(Boolean).map(String).join(' · ') || 'sin fecha';
  const row = (k, v, hl) => `<tr><td style="padding:8px 12px;color:#6A585B;vertical-align:top;border-bottom:1px solid #EFE3D5">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #EFE3D5;${hl ? 'color:#7A3A47;font-weight:bold' : ''}">${esc(v)}</td></tr>`;
  const alert = yes.length
    ? `<div style="background:#FBEDEE;border:2px solid #7A3A47;border-radius:12px;padding:14px 16px;margin:0 0 18px"><b style="color:#7A3A47">⚠️ Revisar antes del servicio (${yes.length}):</b><ul style="margin:8px 0 0;padding-left:20px">${yes.map((a) => `<li>${esc(a[0])}</li>`).join('')}</ul>${notas ? `<p style="margin:10px 0 0"><b>Notas de la clienta:</b> ${esc(notas)}</p>` : ''}</div>`
    : `<div style="background:#EEF5EE;border-radius:12px;padding:12px 16px;margin:0 0 18px;color:#1E2A1D">✓ Sin alertas de salud: respondió "No" a todo.</div>`;
  const body = (intro) => `<div style="font-family:Arial,Helvetica,sans-serif;color:#1E2A1D;max-width:640px;margin:0 auto">
<div style="background:#1E2A1D;color:#F3E6D8;border-radius:14px 14px 0 0;padding:18px 20px"><div style="letter-spacing:.2em;font-size:13px;color:#F2C9CC">KAVÉRA AESTHETICS</div><div style="font-size:22px;margin-top:4px">Ficha y consentimiento firmado</div></div>
<div style="background:#fff;border:1px solid #EFE3D5;border-top:0;border-radius:0 0 14px 14px;padding:18px 20px">
${intro}${alert}
<table style="border-collapse:collapse;font-size:14px;width:100%">${row('Nombre', nombre)}${row('WhatsApp / teléfono', tel || '—')}${row('Correo', email || '—')}${row('Cita', cita)}${row('Servicio(s)', svc || '—')}
${ans.map((a) => row(a[0], a[1], /^s[ií]/i.test(a[1]))).join('')}${row('Notas', notas || '—')}${row('Fotos para portafolio', b.fotos ? 'Sí autoriza' : 'No')}${row('Promociones', b.promo ? 'Sí acepta' : 'No')}${row('Consentimiento y aviso de privacidad', 'Aceptados')}${row('Firmado', cuando)}</table>
<p style="font-size:13px;color:#6A585B;margin:16px 0 6px">Firma: ver archivo adjunto <b>firma.png</b>. Términos aceptados:</p>
<ul style="font-size:13px;color:#4E3D40;margin:0;padding-left:20px">${(Array.isArray(b.terminos) ? b.terminos : []).slice(0, 10).map((t) => `<li>${esc(String(t).slice(0, 400))}</li>`).join('')}</ul></div></div>`;
  const attachment = [{ name: 'firma.png', content: firma.split(',')[1] }];

  const ok = await send(key, {
    sender: { name: 'Kavéra · Fichas', email: from }, to: [{ email: to, name: 'Karen' }],
    replyTo: email ? { email, name: nombre } : undefined,
    subject: `${yes.length ? '⚠️ ' : '✍️ '}Ficha firmada: ${nombre} · ${cita}`,
    htmlContent: body(''), attachment, tags: ['consentimiento']
  });
  if (!ok) return res.status(502).json({ ok: false });
  if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    await send(key, {
      sender: { name: 'Kavéra Aesthetics', email: from }, to: [{ email, name: nombre }], replyTo: { email: from, name: 'Kavéra Aesthetics' },
      subject: 'Tu ficha y consentimiento · Kavéra Aesthetics',
      htmlContent: body(`<p style="margin:0 0 14px">Hola ${esc(nombre.split(' ')[0])}, aquí tienes una copia de tu ficha firmada. ¡Nos vemos en tu cita! 💕</p>`),
      attachment, tags: ['consentimiento-copia']
    }).catch(() => {});
  }
  return res.status(200).json({ ok: true });
};
