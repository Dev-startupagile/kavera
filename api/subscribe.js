// Kavéra subscriber sign-up: POST /api/subscribe
// Saves the contact to Brevo (free email marketing tool) when these Vercel environment variables exist:
//   BREVO_API_KEY          – API key from Brevo (Settings → SMTP & API → API keys)
//   BREVO_LIST_EMAIL       – numeric id of the list for email promos
//   BREVO_LIST_WHATSAPP    – numeric id of the list for WhatsApp promos
// Without them it answers 503 and the website falls back to sending the sign-up to Karen on WhatsApp.
module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: bots fill hidden fields

  const name = String(b.name || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
  let wa = String(b.whatsapp || '').replace(/[^\d+]/g, '');
  if (wa && !wa.startsWith('+')) wa = (wa.length === 10 ? '+52' : '+') + wa;
  const optEmail = !!b.optEmail && !!email, optWa = !!b.optWhatsapp && !!wa;
  const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!emailOk || (!optEmail && !optWa)) return res.status(400).json({ ok: false, error: 'invalid' });

  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });

  const listIds = [];
  if (optEmail && process.env.BREVO_LIST_EMAIL) listIds.push(Number(process.env.BREVO_LIST_EMAIL));
  if (optWa && process.env.BREVO_LIST_WHATSAPP) listIds.push(Number(process.env.BREVO_LIST_WHATSAPP));
  const attributes = { FIRSTNAME: name };
  if (wa) attributes.SMS = wa;
  const body = { attributes, listIds, updateEnabled: true };
  if (email) body.email = email;

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body)
    });
    if (r.ok || r.status === 204) return res.status(200).json({ ok: true });
    const t = await r.text();
    console.error('brevo', r.status, t.slice(0, 300));
    return res.status(502).json({ ok: false, error: 'provider' });
  } catch (e) {
    console.error('brevo fetch', e && e.message);
    return res.status(502).json({ ok: false, error: 'provider' });
  }
};
