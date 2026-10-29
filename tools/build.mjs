// Kavéra SEO build: run `node tools/build.mjs` from the repo root after changing text/prices in site.js
// or copy in tools/pages.mjs. It:
//  1. generates the Playa del Carmen landing pages (*.html in the repo root)
//  2. injects structured data (JSON-LD) into index.html
//  3. writes sitemap.xml, robots.txt and llms.txt
//  4. prerenders index.html and reservar.html so bots that don't run JavaScript still see the Spanish text
// Requires Node 18+ and Playwright (for step 4).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import vm from 'node:vm';
import { pages } from './pages.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://www.kavera.mx';
const TODAY = new Date().toISOString().slice(0, 10);

// ---- load data from site.js (single source of truth) ----
const ctx = { window: {}, location: { search: '' }, localStorage: { getItem() {}, setItem() {} }, navigator: {}, document: { querySelectorAll: () => [] } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'site.js'), 'utf8'), ctx);
const { CONFIG, T } = ctx.window.KV;
const PHONE = '+' + CONFIG.whatsapp.replace(/^52(\d{3})(\d{3})(\d{4})$/, '52 $1 $2 $3');
const WA = (txt) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const num = (v) => { const m = String(v).replace(/,/g, '').match(/\$(\d+)/); return m ? m[1] : null; };

// ---- structured data ----
const business = {
  '@type': 'BeautySalon',
  '@id': SITE + '/#business',
  name: 'Kavéra Aesthetics',
  url: SITE + '/',
  image: SITE + '/logo.jpg',
  logo: SITE + '/logo.jpg',
  telephone: PHONE,
  email: 'hola@kavera.mx',
  priceRange: '$100 – $2,000 MXN',
  currenciesAccepted: 'MXN',
  description: 'Estudio privado de belleza en Playa del Carmen: extensiones de pestañas, lifting de pestañas, laminado de cejas, keratina y faciales.',
  address: { '@type': 'PostalAddress', addressLocality: 'Playa del Carmen', addressRegion: 'Quintana Roo', addressCountry: 'MX' },
  areaServed: [{ '@type': 'City', name: 'Playa del Carmen' }, { '@type': 'AdministrativeArea', name: 'Solidaridad, Quintana Roo' }],
  knowsLanguage: ['es', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Kavéra',
    itemListElement: T.es.services.map((s) => ({
      '@type': 'OfferCatalog',
      name: s.name,
      itemListElement: s.prices.filter((p) => num(p[1])).map((p) => ({
        '@type': 'Offer', priceCurrency: 'MXN', price: num(p[1]),
        itemOffered: { '@type': 'Service', name: `${s.name}: ${p[0]}`, areaServed: 'Playa del Carmen' }
      }))
    }))
  }
};
const faqLd = (faq, url) => ({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const ldScript = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;

// ---- landing pages ----
const svcData = (lang, id) => T[lang].services.find((s) => s.id === id);
const priceTable = (s) => `
      <div class="price-card">
        <h3>${esc(s.name)}</h3>
        <table>${s.prices.map((p) => `<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td></tr>`).join('')}</table>
      </div>`;

function renderPage(pg) {
  const url = `${SITE}/${pg.slug}`;
  const es = pg.lang === 'es';
  const main = svcData(pg.lang, pg.service);
  const tables = es ? priceTable(main) : T.en.services.map(priceTable).join('');
  const others = pages.filter((o) => o.slug !== pg.slug && o.lang === pg.lang);
  const book = `/reservar?s=${pg.service}${es ? '' : '&lang=en'}`;
  const waText = es ? `Hola Kavéra, me interesa: ${main.name}. ¿Qué horarios tienes?` : `Hi Kavéra, I'm interested in ${main.name.toLowerCase()}. What times do you have?`;
  const alt = pg.slug === 'pestanas-playa-del-carmen' ? 'eyelash-extensions-playa-del-carmen' : pg.slug === 'eyelash-extensions-playa-del-carmen' ? 'pestanas-playa-del-carmen' : null;
  const service = {
    '@type': 'Service', '@id': url + '#service', name: strip(pg.h1), serviceType: main.name, url,
    provider: { '@id': SITE + '/#business' }, areaServed: { '@type': 'City', name: 'Playa del Carmen' },
    offers: main.prices.filter((p) => num(p[1])).map((p) => ({ '@type': 'Offer', name: p[0], price: num(p[1]), priceCurrency: 'MXN' }))
  };
  const crumbs = { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Kavéra Aesthetics', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: strip(pg.h1), item: url }] };
  return `<!doctype html>
<html lang="${pg.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pg.title)}</title>
<meta name="description" content="${esc(pg.description)}">
<link rel="canonical" href="${url}">
${alt ? `<link rel="alternate" hreflang="${pg.lang}" href="${url}">\n<link rel="alternate" hreflang="${es ? 'en' : 'es'}" href="${SITE}/${alt}">` : ''}
<meta property="og:title" content="${esc(pg.title)}">
<meta property="og:description" content="${esc(pg.description)}">
<meta property="og:image" content="${SITE}/logo.jpg">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${es ? 'es_MX' : 'en_US'}">
<meta name="theme-color" content="#1E2A1D">
<link rel="icon" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
<style>
.lp{max-width:860px;margin:0 auto;padding:56px 20px 80px}
.lp h1{font-size:clamp(40px,7vw,68px);line-height:1.02;margin:0 0 22px}
.lp .intro{font-size:18px;line-height:1.7;color:#E9DCCD;font-weight:300;margin:0 0 30px}
.lp h2{font-size:clamp(30px,4.6vw,42px);line-height:1.1;margin:52px 0 16px}
.lp p{font-size:16px;line-height:1.75;color:#D9CBBB;margin:0 0 14px}
.lp strong{color:#F3E6D8;font-weight:500}
.ctas{display:flex;flex-wrap:wrap;gap:12px;margin:8px 0 10px}
.prices{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:8px}
.price-card{background:#F6ECE3;color:#2E2224;border-radius:24px;padding:26px 24px}
.price-card h3{font-size:28px;font-weight:600;margin:0 0 12px}
.price-card table{width:100%;border-collapse:collapse;font-size:15px}
.price-card td{padding:7px 0;border-top:1px solid rgba(154,79,92,.15)}
.price-card td:last-child{text-align:right;color:#7A3A47;font-weight:500;white-space:nowrap}
.faq details{border-radius:20px;border:1px solid rgba(243,230,216,.16);background:rgba(243,230,216,.04);padding:0 22px;margin-bottom:10px}
.faq summary{min-height:60px;display:flex;align-items:center;justify-content:space-between;gap:14px;font-family:'Cormorant Garamond',serif;font-size:22px}
.faq details p{margin:0 0 18px}
.more{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.more a{border:1px solid rgba(242,201,204,.4);border-radius:999px;padding:10px 18px;font-size:14px;min-height:44px;display:inline-flex;align-items:center}
.crumb{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#CFC1B1;margin-bottom:18px}
.crumb a{color:#CFC1B1}
</style>
${ldScript([business, service, faqLd(pg.faq, url), crumbs])}
</head>
<body>
<header class="nav">
  <nav>
    <a href="/" class="brand"><img src="/logo.jpg" alt="Kavéra Aesthetics"><span>KAVÉRA</span></a>
    <a class="btn btn-pink" href="${book}" style="min-height:44px;padding:0 20px;font-size:14px">${es ? 'Reservar' : 'Book'}</a>
  </nav>
</header>
<main class="lp">
  <div class="crumb"><a href="/">Kavéra Aesthetics</a> · ${esc(pg.kicker)}</div>
  <h1>${esc(pg.h1)}</h1>
  <p class="intro">${pg.intro}</p>
  <div class="ctas">
    <a class="btn btn-pink" href="${book}">${es ? 'Agendar cita' : 'Book an appointment'}</a>
    <a class="btn btn-outline" href="${WA(waText)}" target="_blank" rel="noopener">WhatsApp ${PHONE}</a>
  </div>
  <h2>${es ? 'Precios' : 'Prices'} <span style="font-size:.55em;color:#CFC1B1">(MXN)</span></h2>
  <div class="prices">${tables}
  </div>
${pg.sections.map((s) => `  <h2>${esc(s.h)}</h2>\n${s.p.map((p) => `  <p>${p}</p>`).join('\n')}`).join('\n')}
  <h2>${es ? 'Preguntas frecuentes' : 'FAQ'}</h2>
  <div class="faq">
${pg.faq.map(([q, a]) => `    <details><summary>${esc(q)}<span class="kv-plus" aria-hidden="true">+</span></summary><p>${esc(a)}</p></details>`).join('\n')}
  </div>
  <h2>${es ? 'Aparta tu momento' : 'Book your visit'}</h2>
  <p>${es ? 'Elige servicio, día y hora en línea, o escríbenos por WhatsApp y te ayudamos a encontrar el horario perfecto.' : 'Pick your service, day and time online, or message us on WhatsApp and we will find the perfect time.'}</p>
  <div class="ctas">
    <a class="btn btn-pink" href="${book}">${es ? 'Agendar cita' : 'Book now'}</a>
    <a class="btn btn-outline" href="${WA(waText)}" target="_blank" rel="noopener">${es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}</a>
  </div>
  ${others.length ? `<h2>${es ? 'Otros servicios en Playa del Carmen' : 'More'}</h2>\n  <div class="more">${others.map((o) => `<a href="/${o.slug}">${esc(o.h1)}</a>`).join('')}${alt ? `<a href="/${alt}" hreflang="${es ? 'en' : 'es'}">${es ? 'English' : 'Español'}</a>` : ''}</div>` : (alt ? `<div class="more"><a href="/${alt}" hreflang="es">Español</a></div>` : '')}
</main>
<footer style="border-top:1px solid rgba(243,230,216,.14);padding:40px 20px">
  <div class="wrap" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;font-size:14px;color:#CFC1B1">
    <span>© ${TODAY.slice(0, 4)} Kavéra Aesthetics · Playa del Carmen, Quintana Roo</span>
    <span><a href="/">kavera.mx</a> · <a href="mailto:hola@kavera.mx">hola@kavera.mx</a></span>
  </div>
</footer>
<a class="wa-float kv-pulse" href="${WA(waText)}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.6L3 21z"></path></svg></a>
</body>
</html>
`;
}
for (const pg of pages) fs.writeFileSync(path.join(ROOT, pg.slug + '.html'), renderPage(pg));

// ---- JSON-LD + service links into index.html ----
let index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const homeFaq = T.es.faq;
const homeLd = `<!--SEO-JSONLD-->${ldScript([business, { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'Kavéra Aesthetics', inLanguage: ['es-MX', 'en'] }, faqLd(homeFaq, SITE + '/')])}<!--/SEO-JSONLD-->`;
index = index.includes('<!--SEO-JSONLD-->') ? index.replace(/<!--SEO-JSONLD-->[\s\S]*?<!--\/SEO-JSONLD-->/, homeLd) : index.replace('</head>', homeLd + '\n</head>');
const links = `<!--SEO-LINKS--><nav aria-label="Servicios en Playa del Carmen" class="wrap" style="display:flex;flex-wrap:wrap;gap:8px 18px;margin:26px auto 0;font-size:13px;color:#A99C8E">${pages.map((p) => `<a href="/${p.slug}" style="color:#CFC1B1">${esc(p.h1)}</a>`).join('')}</nav><!--/SEO-LINKS-->`;
index = index.includes('<!--SEO-LINKS-->') ? index.replace(/<!--SEO-LINKS-->[\s\S]*?<!--\/SEO-LINKS-->/, links) : index.replace('</footer>', links + '\n</footer>');
fs.writeFileSync(path.join(ROOT, 'index.html'), index);

// ---- sitemap, robots, llms.txt ----
const urls = ['/', '/reservar', ...pages.map((p) => '/' + p.slug)];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `# Kavéra Aesthetics: everyone is welcome to read this site, including AI assistants.
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
const line = (s) => `- ${s.name}: ${s.prices.map((p) => `${p[0]} ${p[1]}`).join('; ')}`;
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# Kavéra Aesthetics

> Private beauty studio in Playa del Carmen, Quintana Roo, Mexico. Eyelash extensions (classic, mascara effect, 3D/5D, Aura, Hawaiian, Volume 8D, eyeliner, wispy), lash lift, brow lamination, keratin hair treatment and facials. Prices in Mexican pesos (MXN). Book online at ${SITE}/reservar or on WhatsApp ${PHONE}. Spanish first; English available on the site.

Estudio privado de belleza en Playa del Carmen, Quintana Roo, México: extensiones de pestañas, lifting de pestañas, laminado de cejas, keratina y faciales. Agenda en ${SITE}/reservar o por WhatsApp al ${PHONE}. La ubicación exacta del estudio se comparte por WhatsApp al confirmar la cita.

## Services and prices (MXN)
${T.es.services.map(line).join('\n')}

## Pages
- [Extensiones de pestañas en Playa del Carmen](${SITE}/pestanas-playa-del-carmen): estilos, precios, retoques, cuidados
- [Keratina en Playa del Carmen](${SITE}/keratina-playa-del-carmen): precio según el largo, cuidados
- [Laminado de cejas en Playa del Carmen](${SITE}/laminado-de-cejas-playa-del-carmen)
- [Faciales en Playa del Carmen](${SITE}/faciales-playa-del-carmen)
- [Eyelash extensions in Playa del Carmen (English)](${SITE}/eyelash-extensions-playa-del-carmen)
- [Reservar / Book](${SITE}/reservar): choose service, day and time; confirmation by WhatsApp

## Contact
- WhatsApp: ${PHONE} (https://wa.me/${CONFIG.whatsapp})
- Email: hola@kavera.mx
- Area: Playa del Carmen, Quintana Roo, Mexico
`);

// ---- prerender index.html and reservar.html (Spanish) ----
import { createRequire } from 'node:module';
let chromium = null; try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch (e) {}
if (!chromium) { console.log('Playwright not installed: skipped prerender'); process.exit(0); }
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
}).listen(0);
const port = server.address().port;
const browser = await chromium.launch();
for (const file of ['index.html', 'reservar.html']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.goto(`http://localhost:${port}/${file}?lang=es`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const html = await page.evaluate(() => {
    document.querySelectorAll('.kv-reveal.on').forEach((e) => e.classList.remove('on'));
    document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === 'es' ? 'true' : 'false'));
    return ('<!doctype html>\n' + document.documentElement.outerHTML).replace(/\s+<\/body>/, '\n</body>') + '\n';
  });
  fs.writeFileSync(path.join(ROOT, file), html);
  await page.close();
}
await browser.close(); server.close();
console.log('built', pages.length, 'pages + sitemap, robots, llms.txt; prerendered index.html, reservar.html');
