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

### Business facts (DJ, 2026-10-17)
- Small **in-home studio**, general area **Centro Maya, Playa del Carmen** (share exact address only after booking). May move to a real studio later.
- **Google Business Profile: POSTPONED** (DJ, 2026-10-19) until she has a permanent studio location. Don't push address/location work until then. Capacity about **4 clients/day**.
- Main services by volume: **lashes** and **keratina**. Rough prices (DJ guessing, real list coming): new lashes ≤ **$800 MXN**, keratina about **$1,500 MXN**. Her prices are low for the area.
- Goal: **3–4 bookings per day**. Target: Mexican women in Playa del Carmen.
- Growth plan in progress: Google Business Profile, women's studio and bridal/XV partnerships (FORMA, YenyFit, Zona/Luna/Althea/Find Your Flow pilates, VALMA, nail salons), local Instagram/FB ads with a message button, lash refill retention, referrals. Main competitor for keratina: Sukar Beauty Bar (tourist pricing).

### Target persona and lead-gen ideas (2026-10-17)
- Persona: young Mexican women in Playa (~20–34), decent income (~25k MXN/mo), go to the gym/pilates, often with a partner (incl. foreign/expat boyfriends) who'd pay for treats.
- Market size (INEGI 2020 via telencuestas): Solidaridad pop. 333,800; women 18–24: 19,760, 25–29: 19,477, 30–34: 19,222 (≈58k women 18–34). Mexperience cites INM: >7% of Playa is non-Mexican.
- Ideas: (1) **AI "Tu mirada ideal" quiz** on kavera.mx: selfie/questions → lash style match → shareable result card → coupon unlocked with email + WhatsApp (opt-in list). (2) **Gift cards for partners**, English "Treat her" page aimed at expat men (expat FB groups, holidays). (3) Gym/pilates QR → quiz. (4) Opt-in email sequences. No scraped/cold email lists (spam + Mexican data-protection law).

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
whatsapp:  '529841318637'                    // +52 984 131 8637 (live)
calendly:  'https://calendly.com/YOUR-LINK'  // ← PLACEHOLDER
instagram: 'https://instagram.com/'          // ← PLACEHOLDER
hours:     ['10:00','11:30','13:00','15:00','16:30','18:00']  // ← guessed, confirm with her
discount:  '[X]'                             // ← first-visit % off, not decided
```
**WhatsApp is set: +52 984 131 8637 (added 2026-10-28).**

### Language
- Default is **always Spanish**. English only if the visitor taps EN (remembered in localStorage) or the URL has `?lang=en`. Browser language is deliberately ignored (DJ's request 2026-10-16).
- All copy lives in `KV.T.es` / `KV.T.en` in site.js. Elements use `data-t="key"`, `data-t-ph` for placeholders, `data-t-aria` for aria-labels.
- Note: Chrome may auto-translate the Spanish page for English-language users (DJ saw "IS/IN" instead of "ES/EN"). Optional fix: add `translate="no"` on `<html>` or `<meta name="google" content="notranslate">`.

### Prices (her official list, received 2026-10-19), MXN
Defined once at the top of site.js (LASH_*, BROW_*, FACIAL_*), used by both the landing cards and the booking page.
- Pestañas: Clásicas 500 · Rímel 550 · Tecnológicas 3D/5D 600 · Efecto Aura 600 · Efecto hawaiano 600 · Volumen 8D 650 · Efecto delineado 650 · Efecto wispy 700 · Lifting de pestañas 350 · Retoque 450 · Retiro 100
- Cejas: Laminado 150 · Laminado + limpieza 200 · Limpieza y perfilación: Consultar
- Faciales: Limpieza profunda 500 · Control acné 600 · Detox 600 · Profunda premium 650 · Hidratante 650
- Keratina: still the earlier rough range, desde 500 (corto) hasta 2,000 (largo); not on her list, confirm.

### Other placeholders still on the site
FAQ: payment methods, cancellation policy. **Removed 2026-10-28 (DJ):** the placeholder reviews section and the first-visit discount banner (she doesn't offer a discount). Reviews will come later, collected on **Google** (not on the site) after each session.

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

## 8b. Booking calendar: CHOSEN 2026-10-17 = Cal.com free plan (WhatsApp agent paused, revisit later)
- Why: free Individuals plan has unlimited event types (one per service, each with its own duration), email/SMS notifications, templated reminder workflows, "no usage limits", open source, and an API the future WhatsApp agent can book through.
- Setup: account on cal.com signed in with her Google (Karenv6152@gmail.com) → connect Google Calendar (blocks double-booking with personal events) → event types per service/option with durations + price in description → working hours → Spanish → reminder workflow 24h before → put links on kavera.mx (CONFIG.calendly replaced by Cal.com links, or embed in /reservar).
- Runner-up: Setmore free (up to 4 staff, unlimited appointments, email reminders; 2-way Google sync and SMS are Pro, ~$5/user/mo annual).
- Rejected: Calendly free (1 event type only), Google Calendar free booking page (1 page only, reminders paid).

## 8c. Marketing automations, plan (DJ, 2026-10-19): run in-house on SA machines with local models
Order: (1) WhatsApp number live, (2) Cal.com live, (3) then build automations and hand them to SA's own machines.
- Stack idea: Cal.com API/webhooks → **n8n self-hosted** (free, visual, DJ can read it) on an SA Mac mini → **local model** (Qwen or GPT-OSS on a DGX Spark, OpenAI-compatible endpoint over Tailscale) → senders: WhatsApp MCP on her business number, an email-sending service for the opt-in list, Instagram drafts for her approval.
- First automations: refill reminder (day 14–18 after lashes), thank-you + review request (day 1), no-show/reschedule follow-up, Monday "lugares libres esta semana" to opted-in clients, birthday offer, quiz-lead email sequence, IG caption/Reel script drafts from her photos (she approves), weekly numbers report, later the inbound WhatsApp agent on the local model.
- Rules: opt-in contacts only; WhatsApp sends slow and few (ban risk on an unofficial connection); a human approves anything sent to many people until it's proven; secrets only in env/config on the machines, never in the repo.

## 8d. SEO / AI search (built 2026-10-28)
Goal: be the answer when someone in Playa del Carmen searches (Google, ChatGPT, Claude, Perplexity) for pestañas, keratina, laminado de cejas, faciales.
- **Prerendered text:** index.html and reservar.html now ship the Spanish text in the HTML (AI crawlers don't run JavaScript; before this they saw 31 words on the homepage, now 843). The JS still re-renders at runtime, so site.js stays the source of truth.
- **Landing pages:** /pestanas-playa-del-carmen, /keratina-playa-del-carmen, /laminado-de-cejas-playa-del-carmen, /faciales-playa-del-carmen, /eyelash-extensions-playa-del-carmen (English). Copy lives in tools/pages.mjs; prices pulled from site.js.
- **Structured data (JSON-LD):** BeautySalon (no street address; locality Playa del Carmen), services + MXN prices, FAQPage, BreadcrumbList.
- **robots.txt** allows all crawlers incl. GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended. **sitemap.xml**, **llms.txt** (plain summary for AI assistants).
- **RULE: after changing prices/text in site.js or copy in tools/pages.mjs, run `node tools/build.mjs`** (needs Playwright), then commit and push. Rebuild is idempotent.
- Added 2026-10-28 (round 2): /precios, /lifting-de-pestanas-playa-del-carmen, /guia-tipos-de-pestanas, /cuidados-extensiones-de-pestanas, /keratin-treatment-playa-del-carmen; share image og.jpg (1200x630); 404.html; caching headers in vercel.json; removed unused logo.png.
- **IndexNow** (instant indexing for Bing, which feeds ChatGPT search/Copilot): key file /91a3a34391937d9c208ce7a1cc3b861f.txt. After publishing changes, ping: https://api.indexnow.org/indexnow?url=<page-url>&key=91a3a34391937d9c208ce7a1cc3b861f (one GET per changed URL).
- Next SEO steps (need DJ's logins): verify kavera.mx in **Google Search Console** and **Bing Webmaster Tools** (Bing feeds ChatGPT search) via a DNS TXT record in Namecheap, submit sitemap. Get listed/mentioned on local pages (partners' sites, Playa expat groups, directories). Instagram bio link to kavera.mx. Google Business Profile postponed until permanent studio.

## 8e. Subscribers + Instagram (2026-10-28)
- **Subscribe form** on the homepage (#promociones): name, email, WhatsApp, separate opt-ins for email and WhatsApp promos, link to /privacidad. Posts to **/api/subscribe** (Vercel function in api/subscribe.js) → **Brevo** (free plan: 100k contacts, 300 emails/day).
- **To switch it on:** create a free Brevo account (Karen's or SA's), make two lists ("Promos email", "Promos WhatsApp"), then in Vercel → kavera project → Settings → Environment Variables add BREVO_API_KEY, BREVO_LIST_EMAIL, BREVO_LIST_WHATSAPP (list ids) and redeploy. Until then, sign-ups open WhatsApp to Karen with the person's details (nothing lost).
- **/privacidad**: simplified Mexican privacy notice (aviso de privacidad). Template, not legal advice.
- **Instagram**: section right under the hero; CONFIG.featuredPost (currently the Halloween Reel reel/DeaD133IZvK, shown in a phone frame) and CONFIG.instagramPosts (row of 11). Change in site.js, run build.
- Cache-busting: build adds ?v=<hash> to styles.css/site.js links.

## 9. AI booking agent, plan (not built yet)

### Research 2026-10-16: recommended route = buy, don't build
- **AgendaPro** (Latin American salon/estética software): online agenda 24/7, automatic WhatsApp/SMS/email reminders, and an **AI agent on WhatsApp** that answers in natural language, checks real availability, books, reschedules and hands off to a human. Their page says the AI is "incluido dentro de los planes"; prices not published; 14-day free trial; setup = create account, add services/hours, connect WhatsApp Business. **Recommended first try.** Confirm during trial: monthly MXN price for 1 professional, and whether connecting WhatsApp moves her number off the normal WhatsApp app.
- **Fresha**: from $14.95/user/month (Capterra), reminders by email/SMS (no WhatsApp listed), reviewers complain about fees. Not recommended for her.
- **Google Calendar appointment schedule**: free on personal Gmail but only one booking page, and reminders/payments are paid (Google One Premium / Workspace ~$9.99/mo). Free fallback with no AI.
- **Custom (SA builds it)**: WhatsApp Cloud API + model + Google Calendar. Since 2025-07-01 Meta charges per *template* message; free-form replies within 24h of the client writing are free. Most control, most work; good later as an SA showcase.
- If AgendaPro is chosen: point every "Agendar cita / Reservar" button on kavera.mx at her AgendaPro booking link (CONFIG), and keep /reservar as a fallback or remove it.

### CHOSEN 2026-10-16 23:25: WhatsApp MCP route on a NEW dedicated number
- DJ is buying a new prepaid SIM (Telcel) just for Kavéra. Data on the SIM is optional; the SIM only has to receive the one-time WhatsApp verification SMS/call and stay active (recharge occasionally so Telcel doesn't recycle the number).
- A spare phone runs **WhatsApp Business** with that number, plugged in and on Wi-Fi 24/7 (linked devices drop if the phone is offline ~2 weeks).
- An SA Mac mini runs **personal-whatsapp-mcp** (`pip install personal-whatsapp-mcp`, Python 3.11+, libmagic; scan QR at 127.0.0.1:8100; MCP at /mcp). It's unofficial (whatsmeow / WhatsApp Web linked device), so ban risk exists. Mitigate: dedicated number, warm up a few days with normal use, only reply to inbound, no bulk messages.
- Auto-reply modes: "Model" (OpenAI-compatible endpoint, no tools; could point at SA's GPT-OSS) or **"Webhook"** (our endpoint decides and replies via MCP). Plan: Webhook → small service on the same Mac mini → Claude with tools (prices from site.js, Google Calendar availability/booking, handoff to owner).
- Its token gives full read/send access to the WhatsApp account: never expose it, keep on localhost/tailnet only. Logout wipes history.
- Once the number exists: put it in CONFIG.whatsapp in site.js (fixes the broken buttons).

### DJ's direction (2026-10-16 late): innovative, Claude-powered, no expensive subscription
Recommended build = **"Kavéra Concierge"**: our own Claude agent, hosted in this same Vercel project.
- Her existing WhatsApp Business number → linked via Meta **coexistence** → WhatsApp Cloud API webhook → Vercel function `/api/whatsapp` in this repo → Claude (Agent SDK / Messages API, small fast model, tool use) → replies.
- Tools the agent gets: `get_services_and_prices` (from site.js data), `check_availability` + `book_appointment` (Google Calendar API on her Gmail calendar), `handoff_to_human` (pings her, stops replying in that chat).
- Costs: no SaaS subscription. Meta: free-form replies within 24h of the client writing are free. Claude: pay per use (check current API pricing). Vercel: already used.
- Secrets (Claude API key, Meta token, Google credentials) go in **Vercel environment variables only**, never in code.
- Same agent can sit behind a chat bubble on kavera.mx. Reusable as an SA product for other small businesses.
- Alternatives found: (1) **Meta Business Agent**: Meta's own AI inside WhatsApp Business, global since June 2026 (TechCrunch); answers, books appointments, hands off; included in some WhatsApp Business Premium tiers; zero build, not Claude, calendar management still "planned". (2) Open-source **WhatsApp MCP servers** that let Claude Desktop read/send on a personal WhatsApp through WhatsApp Web: very cheap and hacky, needs a computer always on (could be an SA Mac mini), unofficial so **ban risk**; fine for experiments, not for her business number. (3) n8n + Claude + WhatsApp Cloud API: same idea as Concierge, built in a visual workflow tool.

### Update: "coexistence" removes the second-number problem
- Meta's **WhatsApp Coexistence**: her **existing** WhatsApp Business app number can also be connected to an AI/automation provider. She keeps chatting from her phone; the AI answers on the same number; messages sync both ways. Requirements (per Chakra's explainer): WhatsApp Business app ≥ 2.24.17 (not the regular app), the app stays installed and is opened at least every 14 days, a Meta Business Portfolio, and onboarding through Meta's "Embedded Signup" (Facebook login popup inside the provider's dashboard, no new number). Limits: groups and calls stay on the phone, one provider at a time, display name may show only the number to new clients. Mexico not confirmed as supported; check with the provider.
- Providers to test, in order: **AgendaPro** (booking-native AI that writes into a real agenda), **Kommo** (has a Spanish "CRM de WhatsApp para salones de belleza" page, from ~$15/user/mo, booking per YCloud's comparison), **YCloud** (coexistence confirmed, free tier, $39/mo Growth; booking not confirmed).
- Avoid "QR-code / WhatsApp Web" bot tools that aren't official Meta partners: they work by automating WhatsApp Web and risk getting her number banned.

### Earlier notes
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
