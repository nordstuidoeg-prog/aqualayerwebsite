# AquaLayer™ — Marine Surface Protection (Egypt)

Production `[V1]` website for AquaLayer™. Static **HTML + CSS + vanilla JS** — no framework,
no build step, no bundler. Open the HTML files directly, or deploy as-is to GitHub Pages / Netlify.

## Run / deploy
- **Local:** open `index.html` in a browser (works over `file://`).
- **GitHub Pages:** push to the repo and enable Pages on the branch root.
- **Netlify:** drag-and-drop the folder, or connect the repo (no build command, publish dir = root).
- Canonical/OG/JSON-LD use the production domain `https://aqualayereg.com/`. Update if the domain changes.

## Structure
```
index.html                      Home (the Settle)
about/  services/  gallery/  faq/  contact/
services/<6 service pages>/
assets/css/   site.css (foundation/tokens) + per-template layers
assets/js/    deferred vanilla modules
assets/fonts/ self-hosted, subset (Fraunces, Plus Jakarta Sans, Outfit)
assets/img/   og-default.jpg
favicon.svg · favicon.ico · favicon-32/16.png · apple-touch-icon.png
robots.txt · sitemap.xml
```

## Action items
**TODO**
- **Web3Forms key** — replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact/index.html`
  (`input[name="access_key"]`). Free key at web3forms.com. Until set, the form auto-routes
  the lead to WhatsApp and still shows the success state.
- **NAP confirmation** — email `hello@` vs `book@` (spec PENDING), phone `+20 1055 9900 55`,
  domain `aqualayereg.com`. Keep consistent across site + schema.
- **Instagram** — confirm handle (assumed `instagram.com/aqualayereg`).

**DECISION** (built on-brand; confirm if desired)
- Hero H1 = "The invisible layer." (iconic thesis) + serif tagline sub-line.
- No logo files were supplied (all 86 assets are photography) → logo system stays the in-house
  SVG horizon-mark + wordmark (nav light/Pearl, footer silver, favicon, OG). Recolorable, tiny.
- OG image = treated dark-navy hull photo + Abyss scrim + waterline + wordmark, used site-wide.
- Before/after sliders use a real protected-surface photo with the "oxidized" state CSS-graded
  on the same pixels (no true same-vessel pairs were provided). Matched pairs drop straight in.
- Fonts: Manier→Fraunces, Google Sans→Plus Jakarta Sans (spec §6 PENDING).
- Palette hex = spec §6 derived best-read (confirm vs brand PDF).

## Imagery & optimization
- 22 of the 86 source photos placed; **64 unused** (available for V2 location pages / blog).
- One-time optimization: each placed photo → **AVIF + WebP + JPG** at responsive widths
  (hero 380–760w, content/BA 420–1000w), q≈78–82, EXIF stripped, served via `<picture>` +
  `srcset`/`sizes`. ~30 MB of source → ~9.6 MB of optimized variants (24–165 KB each).
- **LCP** = the home hero (framed navy bow): preloaded, `fetchpriority="high"`, AVIF, not lazy.
  Every other image is `loading="lazy" decoding="async"`. All sit in `aspect-ratio` frames
  (4px hairline + scrim + one-time gloss-pass reveal) → no CLS.
- Mapping (source → slot): Home hero=navy bow; Home before/after=cream hull; Ceramic=beading
  hull + droplet macro; PPF=film install + edge; Gelcoat=polishing + correction macro;
  Detailing=wash + hand polish; Tint=tinted glass ×2; Teak=teak deck + care kit; About=sun-baked
  marina + navy hull; Gallery=6 vessels. Full table in the delivery summary.
- TODO: when real same-vessel before/after pairs exist, drop them into the `.ba` panels
  (after = clean photo, before = matte/oxidized photo) — no markup change needed.

## Mobile layout (assets/css/mobile.css)
- Loaded **last** on every page; everything is inside `@media (max-width:767px)` so **desktop is
  untouched**. It defaults repeating content to **two columns** (service cards, five pillars,
  stat tiles, packages, gallery before/after, footer links; spec chips 3-up) and tightens section
  padding, card padding, and type so phones read composed, not an endless single-column tower.
- Per-page 2-column splits on phones: home hero (copy + yacht strip), services layer-stack
  (visual + steps), the oxidation diagnostic (intro + levels), every service hero and "what it is"
  block (text + image), and About's condition/difference blocks. Orphan tiles use `.span-2` to fill
  the row (reframe "Time", 36–60 stat, "AquaLayer Package", "Pairs with", MVP "Purpose", 5th pillar,
  contact "Locations"). Section dividers collapsed tight to content; CTA/footer padding cut.
- Single-column kept only for: hero copy column, long body paragraphs, the FAQ accordion, the
  01→04 process steps, and the contact form. Heroes/splits stack again below 360px.
- Result: gallery −38%, FAQ −23%, About/service pages −15–18%, home/services −12% (content-rich
  pillar pages stay longer by nature). Zero horizontal overflow at 375/390/430/768/1280.
- Images standardized: 16/10 hero on mobile, 4/3 in-content + before/after, lighter bottom scrim
  only where a caption sits.

## Notes
- Mobile-first; audited for zero horizontal overflow at 375 / 390 / 430 / 768 / 1280px.
- All motion is `transform`/`opacity` only, plays once, and composes to a static state under
  `prefers-reduced-motion`. Reveals are visible without JS.
- One `<h1>` per page; semantic landmarks; JSON-LD per page (Organization, WebSite,
  LocalBusiness, Service+Offer, FAQPage, BreadcrumbList, etc.); OG + Twitter on every page.
