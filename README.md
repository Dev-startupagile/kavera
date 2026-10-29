# Kavéra Aesthetics — kavera.mx

Static site, no build step. Deploys on Vercel as-is.

- `index.html` — landing page (ES/EN)
- `reservar.html` — booking page (`/reservar`)
- `site.js` — **edit `CONFIG` at the top** for WhatsApp number, Calendly link, Instagram, hours, discount
- `styles.css` — styles and animations

## SEO build
After changing text or prices in `site.js` (or landing-page copy in `tools/pages.mjs`), run:

    node tools/build.mjs

It regenerates the Playa del Carmen landing pages, structured data, sitemap.xml, robots.txt, llms.txt and prerenders index/reservar so AI crawlers can read them.
