# Zamin Real Estate & Consultants

The complete front-end for **Zamin Real Estate & Consultants** — Gilgit-Baltistan's most trusted property agency, serving Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer.

Built with **React 19 + TypeScript + Vite + Tailwind CSS + React Router 7**. No backend required for the current scope: listings, testimonials, services and blog content are static mock data in `src/mocks/`, and visitor-only helpers (shortlist, saved calculator reports, remembered filters) live in `localStorage`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build → out/
npm run lint     # eslint (zero warnings)
npm run type-check
```

## Pages / routes

| Route | Page |
| --- | --- |
| `/` | Homepage — hero search, stats, featured properties, services, why-us, testimonials carousel, CTA |
| `/properties-for-sale` | Filterable sale listings (location, type, price, beds, area, sort, grid/list, load more, mobile filter drawer) |
| `/properties-for-rent` | Filterable rental listings |
| `/property/:id` | Property details — gallery, specs, features, details table, map, similar properties, sticky enquiry card (Call / WhatsApp / Schedule Viewing) |
| `/sell-your-property` | Sell / rent submission form with validation + commission transparency |
| `/services` | Seven service sections |
| `/about` | Story, mission, team, community, areas served |
| `/faq` | Search + category tabs + accordion, FAQPage JSON-LD |
| `/contact` | Form + office info + Google Maps + tap-friendly Call/Email/WhatsApp |
| `/valuation` | Free valuation request form |
| `/blog` · `/blog/:slug` | Searchable article grid; article pages with reading-progress bar, jump-to-section TOC, share, adaptive related tools, related articles, BlogPosting JSON-LD |
| `/tools` | Free tools hub |
| `/tools/mortgage-calculator` | Mortgage/EMI with yearly schedule, A/B scenario comparison, printable summary |
| `/tools/rental-yield-calculator` | Gross/net yield + payback, A/B comparison, printable summary |
| `/tools/stamp-duty-calculator` | Stamp duty / CVT / registration estimate, A/B comparison, printable summary |
| `/shortlist` | Saved properties — comparison table (beds, baths, sq ft, price/sq ft with best-value highlight), email/print/WhatsApp share |

## Key features

- **Design system** — deep forest-green primary + emerald accent (gold retired), Playfair Display headings with Manrope body, oklch token scale in `src/index.css`.
- **Contact details** — phone/WhatsApp `+92 355 509 9430`, office Sultanabad Danyore Gilgit, email `baqircustoms369@gmail.com` (centralised in `src/lib/constants.ts`).
- **Global mobile sticky Call/WhatsApp bar** — collapsible, remembered, with restore button.
- **Desktop header call pill** with the always-visible number.
- **Shortlist** — heart on every card, live navbar count, comparison table, mailto/print-PDF/WhatsApp share.
- **Remembered search filters** — returning visitors get a “welcome back” prompt with how many new listings now match.
- **Calculators** — side-by-side what-if scenarios, branded print/PDF summary, “save this report” (localStorage), “email me this summary” (mailto).
- **Forms** — contact, listing, valuation, enquiry and newsletter forms with validation, loading and success states.
- **SEO** — per-page titles/descriptions, JSON-LD (FAQPage, BlogPosting, Residence), semantic markup.
- **Resilience** — every prominent image has a branded inline-SVG fallback if a remote image fails.
- **SSR smoke test** — `scripts/ssr-smoke.tsx` renders every route server-side to catch runtime regressions:
  `npx vite build --ssr scripts/ssr-smoke.tsx --outDir .smoke && node .smoke/ssr-smoke.js`

## Structure

```
src/
  components/      layout (Navbar, Footer, sticky bar), ui, property cards, calculator toolkit
  context/         ShortlistContext, ToastContext
  hooks/           useLocalStorage, useSavedReport, usePageMeta
  lib/             constants (phone/email/address), utils, image catalog, image fallback
  mocks/           properties, testimonials, faqs, services, team, blog
  pages/           one file per route (+ pages/tools for calculators)
```
