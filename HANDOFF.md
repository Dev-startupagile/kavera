# KAVÉRA AESTHETICS — PROJECT HANDOFF

Last updated: 2026-10-16 (Fri, ~23:00 Cancún time)
Written for: the next Claude session (or person) picking this up cold.
Owner of the business: DJ's girlfriend (Gmail: Karenv6152@gmail.com). DJ (dj@startupagile.app) runs the tech. DJ is non-technical; explain things plainly, in short sentences.

---

## 1. What this is

A bilingual (Spanish first, English toggle) website for an aesthetics business in Quintana Roo, Mexico.
Services: **pestañas (lashes), faciales (facials), keratina (keratin hair treatment), laminado de cejas (brow lamination/lift)**.
She has also mentioned before: laser hair removal, scar removal, skin care and skin care products, and Botox "eventually". These are NOT on the site yet.

Goal of the site: look very aesthetic and feminine, showcase services, and get people to **book an appointment or message on WhatsApp**. Region is Quintana Roo generally; don't name a city.

**LIVE:** https://kavera.mx (also https://www.kavera.mx and https://kavera-beryl.vercel.app)

---

## 2. Where everything lives

| Thing | Where | Notes |
|---|---|---|
| Code | GitHub **Dev-startupagile/kavera** (private), branch `main` | Shared SA GitHub account |
| Hosting | Vercel, team **"devstartupagile's projects"** (Hobby/free plan), project **kavera** | Every push to `main` auto-deploys in ~30 s. Do NOT use the "HerdDirect" Vercel team. |
| Domain | **kavera.mx** at **Namecheap**, account username `startupagile` | Bought 2026-10-16, 1 year, $23.98 |
| DNS (Namecheap → Advanced DNS) | `A @ 216.198.79.1` and `CNAME www 65f5055cc050928a.vercel-dns-017.com.` | Nameservers: Namecheap BasicDNS. Vercel redirects kavera.mx → www.kavera.mx (308). |
| Email | **hola@kavera.mx** forwards to **Karenv6152@gmail.com** | Namecheap → Domain tab → Redirect Email. Mail Settings = "Email Forwarding". |
| Original design canvas | claude.ai artifact "Kavéra Aesthetics Website" (Design type) | Earlier prototype with Tweaks panel. The real site is the GitHub repo now; the canvas is reference only. |
| Logo | `logo.png` (original, 1254×1254, ~2 MB, unused) and `logo.jpg` (800×800, used everywhere), `favicon.png` | Dark green circle, cream "K", woman's profile with blush/taupe hair strands, "KAVÉRA AESTHETICS" ring text. **Do not change logo colors.** |

Logins: DJ is signed in to GitHub, Vercel and Namecheap in his own Chrome. A Claude session with Claude in Chrome can drive those tabs, but **never types passwords or clicks sign-in**; ask DJ to sign in.

---

## 3. The code (static site, no build step)

```
index.html      Landing page
reservar.html   Booking page, served at /reservar (vercel.json cleanUrls)
site.js         CONFIG + all ES/EN text + shared helpers   ← most edits happen here
styles.css      All styles and animations
vercel.json     { cleanUrls: true, trailingSlash: false }
logo.jpg, favicon.png, logo.png
README.md, HANDOFF.md
```

### CONFIG (top of site.js): fill these in
```js
whatsapp:  '52XXXXXXXXXX'                    // ← PLACEHOLDER. Digits only, 52 + 10-digit number
calendly:  'https://calendly.com/YOUR-LINK'  // ← PLACEHOLDER
instagram: 'https://instagram.com/'          // ← PLACEHOLDER
hours:     ['10:00','11:30','13:00','15:00','16:30','18:00']  // ← guessed, confirm with her
discount:  '[X]'                             // ← first-visit % off, not decided
```
**Until `whatsapp` is a real number, every WhatsApp button on the live site is broken.** This is the #1 open item.

### Language
- Default is **always Spanish**. English only if the visitor taps EN (remembered in localStorage) or the URL has `?lang=en`. Browser language is deliberately ignored (DJ's request 2026-10-16).
- All copy lives in `KV.T.es` / `KV.T.en` in site.js. Elements use `data-t="key"`, `data-t-ph` for placeholders, `data-t-aria` for aria-labels.
- Note: Chrome may auto-translate the Spanish page for English-language users (DJ saw "IS/IN" instead of "ES/EN"). Optional fix: add `translate="no"` on `<html>` or `<meta name="google" content="notranslate">`.

### Prices (what she told DJ)
- Keratina: **$500 MXN short hair, up to $2,000 MXN long hair**
- Laminado de cejas: **$150 MXN** ("solo es el lift, el planchado")
- Pestañas: she has "muchos precios" (several options). Site shows Clásicas / Volumen / Retoque with `$[PRECIO]` placeholders
- Faciales: `$[PRECIO]` placeholder
Prices appear in two places in site.js per language: `services[].prices` (landing cards) and `bookOpts` (booking page). Update both.

### Other placeholders still on the site
Reviews carousel (`revText`, `revWho`): fake placeholder cards, replace with real client reviews. FAQ: payment methods, cancellation policy. Offer banner: discount % and terms.

---

## 4. Design system

- Colors (taken from the logo):
  `#1E2A1D` deep green (page bg) · `#26342A` / `#2C3B2B` green variants · `#F3E6D8` cream (text) · `#F6ECE3` light cream (light sections) · `#F2C9CC` blush pink (primary buttons) · `#E8A9B2` rose · `#C9B8A3` taupe · `#7A3A47` wine (buttons on light bg) · `#2A1B1E` near-black text on pink
- Fonts: **Cormorant Garamond** (headings, italic accents) + **Jost** (body), from Google Fonts
- Motion: falling petals, glowing blobs, 3D tilting logo with orbiting rings, rotating "Reserva tu cita" badge, scroll progress bar, shimmer text, shine sweep on buttons, scroll-reveal, marquee ribbon, review carousel
- **Four animated treatment scenes** (line-art SVG + CSS, in index.html `#tratamientos`):
  Facial (mask spreads over face, steam, bubbles) · Keratina (flat iron turns wavy hair straight) · Pestañas (lashes appear one by one with tweezers) · Cejas (spoolie brushes brow hairs up, eye blinks)
- Respects `prefers-reduced-motion`.

---

## 5. Booking flow (reservar.html), how it works today

4 steps + done screen: **1 Servicio** (service + option, price shown) → **2 Día y hora** (next 14 days, slots from CONFIG.hours) → **3 Tus datos** (name, WhatsApp, notes) → **4 Confirmar**, which opens WhatsApp to her number with the full request pre-written → done screen with petal burst.
`/reservar?s=lashes|facials|keratin|brows` preselects a service.

**Important limitation:** this does NOT block time slots or check availability. She gets a WhatsApp message and confirms manually. Calendly link is offered as an alternative that does real scheduling. Landing page also has a "quick WhatsApp message" form and a floating WhatsApp button.

---

## 6. Decisions already made (don't relitigate)

- Domain without accent: **kavera.mx** (accented domains break in links/keyboards). Brand keeps the accent: Kavéra.
- Host on **Vercel**, code on SA's GitHub, private repo.
- Spanish default, no auto-detect.
- Email: free forwarding (Namecheap) + Gmail "send as", not a paid mailbox.
- Booking = WhatsApp hand-off for now (simple, no backend).

## 7. Known issues / risks

1. **WhatsApp number, Calendly, Instagram are placeholders.** Site is live with broken buttons until filled.
2. Vercel Hobby plan is officially non-commercial. Fine to start; Pro is $20/mo if she wants to be strictly compliant.
3. Email SPF: Namecheap's forwarding SPF record is locked, so mail sent "as hola@kavera.mx" through Gmail may hit spam at first. Fix later by moving DNS to Cloudflare (free Email Routing + editable SPF) or a paid mailbox.
4. Gmail "send as" is **not done yet**. She must do it herself (needs her Google login): Gmail → Ajustes → Cuentas → Enviar como → Añadir otra dirección → hola@kavera.mx, SMTP `smtp.gmail.com`:587, user Karenv6152@gmail.com, password = Google **app password** (needs 2-Step Verification). Confirm with the code Gmail sends (arrives via the forward).
5. Two Vercel teams exist on that login (devstartupagile's projects / HerdDirect). Kavera is in **devstartupagile's projects**.
6. `logo.png` (2 MB) is in the repo but unused; can delete.

---

## 8. Open items, in priority order

1. Get from her: **WhatsApp number**, **Calendly link** (or drop Calendly), **Instagram handle**, **working hours**, **lash & facial prices**, payment methods, cancellation policy, first-visit discount.
2. Put them in site.js → push to main → check live.
3. She sets up **WhatsApp Business app** (free): greeting message, away message, quick replies (/precios, /ubicacion, /cuidados), service catalog. Claude can write all texts in Spanish.
4. She does the Gmail "send as" step (section 7.4).
5. Real photos: before/after (lashes and brows sell best), her space, her working. Replace placeholder reviews with real ones (WhatsApp/Instagram screenshots are fine).
6. Google Business Profile so she shows up in local searches ("pestañas cerca de mí").
7. Optional: add the other services (laser, scars, skin care products) as cards and booking options.
8. **AI booking agent** (section 9).

## 9. AI booking agent, plan (not built yet)

Two possible versions. DJ said "connect the booking agent" on 2026-10-16; which one he means was being confirmed.

**A. WhatsApp AI agent (the real goal).** Answers clients on WhatsApp, quotes prices, offers slots, books, and hands off to her when unsure.
- Needs: Meta Business account in her name; **WhatsApp Business Platform (Cloud API)** app; a **phone number not already used on the WhatsApp app** (or migrate hers, which removes it from the normal app); a webhook endpoint (can be a Vercel serverless function in this repo, e.g. `/api/whatsapp`); a model (SA's own GPT-OSS via SA infrastructure, or a paid API key stored as a Vercel env var, **never in code**); a calendar to check/book slots (Google Calendar API or Calendly API).
- Meta has moved to per-message pricing; replies inside the 24h customer-service window are free or cheap. **Verify current pricing before committing.**
- Claude cannot create the WhatsApp/Meta accounts (needs her phone + SMS code and her identity). She or DJ must do the signup; Claude can do the rest.

**B. Website chat agent.** A chat bubble on kavera.mx that answers questions and walks people into /reservar or WhatsApp. Buildable without Meta: Vercel function `/api/chat` + model key as env var + the price/FAQ data already in site.js as its knowledge.

Agent knowledge source: everything in `KV.T.es` (services, prices, FAQ, steps), plus hours from CONFIG. Tone: warm, feminine, short, Spanish first, uses "tú".

---

## 10. How to make a change (for any future session)

1. `git clone https://github.com/Dev-startupagile/kavera` (Claude Code: use add_repo for Dev-startupagile/kavera with push access, then clone)
2. Edit `site.js` (text/prices/config) or `index.html` / `reservar.html` / `styles.css`
3. Test locally: `python3 -m http.server` in the folder, open `/index.html` and `/reservar.html`
4. Commit and push to `main`; Vercel deploys automatically in about 30 seconds
5. Check https://kavera.mx (the cloud sandbox may not reach Vercel; use Claude in Chrome to look)

## 11. Copy that was written but isn't on the site

- Taglines: "Belleza que se mueve contigo." · "Consiéntete. Te lo mereces." · "Pequeños rituales, gran diferencia." · "Sal brillando."
- Instagram bio: "✦ Kavéra Aesthetics · Quintana Roo / Pestañas · Faciales · Keratina · Cejas / Agenda tu cita 👇 kavera.mx"
- WhatsApp greeting: "¡Hola! Gracias por escribir a Kavéra 🌸 Cuéntame qué servicio te interesa y qué día te queda mejor, y te confirmo tu cita en un momento."
- Growth ideas given to DJ: before/after photos, real reviews, Google Business Profile, Reels from the site animations, lash-refill reminders every 2–3 weeks, combos/gift cards, referral discount, FAQ.
