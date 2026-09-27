# Zamin Real Estate & Consultants

## 1. Project Description
A professional multi-page real estate website for **Zamin Real Estate & Consultants**, operating across Gilgit-Baltistan, Pakistan (Hunza, Skardu, Gilgit, Chilas, Nagar, Ghizer). The site positions the business as the region's most trusted property agency, generating leads through contact forms, property listing requests, and newsletter signups.

**Target users:** Property buyers, sellers, tenants, landlords, and tourism-driven investors in Gilgit-Baltistan and the wider Pakistani diaspora.

**Core value:** Expert local knowledge + transparent commission (2.5%–3% sales, one month's rent for rentals) + a clean, trustworthy, conversion-focused experience.

**Design system:** Deep forest-green primary + white/off-white backgrounds, with a brighter emerald accent as the second colour direction. Gold has been retired across the site at the client's request — all accents now read green. Serif (Playfair Display) headings paired with Manrope body/navigation.

## 2. Page Structure
- `/` — Homepage (hero, search, stats, featured properties, services, why choose us, testimonials, CTA)
- `/properties-for-sale` — Properties for Sale (filterable listing grid) ✅
- `/properties-for-rent` — Properties for Rent (filterable listing grid) ✅
- `/property/:id` — Property Details (gallery, specs, map, sticky enquiry card) ✅
- `/sell-your-property` — Sell / Rent Your Property (valuation + submission form) ✅
- `/services` — Services (buying, selling, renting, valuation, legal, investment) ✅
- `/about` — About Us (story, mission, team, community, badges) ✅
- `/faq` — FAQ (commission, coverage, listing, valuation, documents) ✅
- `/contact` — Contact (form, address, map, WhatsApp, hours) ✅
- `/valuation` — Property Valuation (free valuation request form) ✅
- `/blog` — Blog / Resources (searchable, category-filtered article grid) ✅
- `/blog/:slug` — Article detail (body, reading progress, jump-to-section TOC, share, sticky consult card, adaptive related tools, related articles) ✅
- `/tools` — Tools hub (all free calculators in one place) ✅
- `/tools/mortgage-calculator` — Mortgage & EMI calculator (yearly schedule + printable summary) ✅
- `/tools/rental-yield-calculator` — Rental Yield calculator (gross/net yield + printable summary) ✅
- `/tools/stamp-duty-calculator` — Stamp Duty & Transfer Cost estimator (printable summary) ✅
- `/shortlist` — Saved Properties (visitor shortlist + email/print PDF-ready summary) ✅

## 3. Core Features
- [x] Homepage hero with Gilgit-Baltistan landscape + search bar (location, type, price, bedrooms)
- [x] Quick stats bar + featured properties grid (5 cards)
- [x] Services overview (Buy / Sell / Rent) + Why Choose Us + testimonials carousel
- [x] "List Your Property" CTA + footer (link columns, contact details, social icons)
- [x] Filterable properties-for-sale listing (location, type, price, bedrooms, area, grid/list toggle, Load More, mobile filter drawer)
- [x] Filterable properties-for-rent listing (monthly rent pricing, tenant inquiry)
- [x] Property details page (image gallery, specs, features, details table, map, similar properties, sticky enquiry card with Call / WhatsApp / Schedule Viewing)
- [x] Sell/rent property submission form with validation, loading and success/error states
- [x] Services detail page (7 service sections + "Speak With a Property Consultant" CTA)
- [x] About page (brand story, mission/vision, why Zamin, areas served, team, "Talk to Our Team" CTA)
- [x] FAQ page (search + category tabs + accordion, Schema.org FAQPage)
- [x] Contact page (form, Google Maps, tap-friendly Call / Email / WhatsApp)
- [x] Property valuation page (free valuation request form)
- [x] Standardized dark forest-green primary CTA (navy→forest green) across hero, listing and property pages
- [x] Global mobile-only sticky Call / WhatsApp bar for one-tap contact (collapsible + remembered, with restore button)
- [x] Click-to-call phone number badge in the desktop header (always-visible number)
- [x] Blog / Resources page (search, category tabs, featured article, article detail page with related articles + BlogPosting SEO)
- [x] Reading progress bar + jump-to-section table of contents on articles
- [x] "Get property alerts" signup band (reuses the newsletter form) on blog + listing pages
- [x] Free tools: Mortgage/EMI calculator, Rental Yield calculator, Stamp Duty & Transfer Cost estimator
- [x] Tools hub page (`/tools`) + reusable "More free property tools" section linking all calculators
- [x] Print / Save-as-PDF branded summary on every calculator (for taking to the bank)
- [x] Side-by-side "what if" scenario comparison on every calculator (two loans / two properties / two prices at once)
- [x] "Email me this summary" on every calculator (auto-sends via backend + Resend when configured, otherwise opens the visitor's mail app)
- [x] Tools hub linked from the footer columns (kept in place of a top-nav entry to match the reference)
- [x] Blog article sidebar "Related tools" block that auto-suggests calculators on finance-related articles
- [x] Site phone & WhatsApp set to +92 355 509 9430 (calls + WhatsApp)
- [x] Office location & map set to Sultanabad, Danyore Gilgit, Gilgit Baltistan
- [x] Business info email set to baqircustoms369@gmail.com
- [x] Navbar + footer redesigned to match the client's reference (transparent logo, light-green call pill, filled WhatsApp circle, dark "List Your Property" button; footer link columns + social icons)
- [x] Fixed light-on-dark button visibility across the bottom CTA and hero banners
- [x] Automatic email notification to Zamin on every property enquiry (so no lead is missed)
- [x] "Save this report" on every calculator (stores the visitor's last inputs on their device to reopen later)
- [x] Property shortlist / favourites with a live navbar count and an email + print PDF-ready summary page
- [x] Side-by-side comparison table for shortlisted properties (beds, baths, area in sq ft, price per sq ft, with a best-value highlight)
- [x] "Share this shortlist on WhatsApp" one-tap share with a pre-filled summary message
- [x] Remembered search filters with a "welcome back" prompt to re-check new matching listings (and how many are new)

## 4. Data Model Design
No persistent database is required for the current scope. Property listings, testimonials, and blog posts are served from static mock data (`src/mocks/`). All lead-capture forms use the built-in Form feature (contact, listing, tenant inquiry, agent inquiry, property alerts, newsletter).

Visitor-only helpers (the property shortlist, each calculator's "saved report", and the remembered search filters) are stored on the visitor's own device via `localStorage` — no server round-trip, no account required.

_If dynamic property management or a CMS becomes a requirement later, a database can be added._

## 5. Backend / Third-party Integration Plan
- Backend: **SaaS Supabase** connected (Auth, Database, Storage, Edge Functions available)
- Edge Functions: `send-report-email` deployed — sends calculator summaries and enquiry notification emails
- Email: **Resend** — `RESEND_API_KEY` and `RESEND_FROM_DOMAIN` must be added in the Supabase Dashboard; until then the email buttons fall back to opening the visitor's own mail app
- Database: not required yet — property listings, testimonials and blog posts are static mock data
- Forms: **Built-in Form** (all lead forms)
- WhatsApp: direct chat link (no integration required)
- Maps: Google Maps embed iframe
- Payments / Shopify / Stripe: not needed for this site

## 6. Development Phase Plan

### Phase 1: Foundation + Homepage
- Goal: Set up the design system (colors, fonts), shared navigation/footer, and a complete, polished homepage.
- Deliverable: Homepage with hero, search, stats, featured properties, services, why-choose-us, testimonials, CTA, and footer newsletter.

### Phase 2: Property Listings (Sale + Rent)
- Goal: Build filterable listing pages with property cards, grid/list toggle, pagination, and inquiry forms.

### Phase 3: Sell/List Your Property
- Goal: Build the seller/landlord page with step-by-step process, valuation form, and commission transparency.

### Phase 4: Services + About + FAQ
- Goal: Build the three content pages.

### Phase 5: Contact + Blog
- Goal: Build the contact page (form + map + WhatsApp) and the blog/resources page.
- Status: Complete — Contact, Blog listing and Blog article detail pages are all live.

### Phase 6: Free Tools & Resources
- Goal: Give buyers and investors free planning tools, all linked together, with printable summaries.
- Deliverable: Tools hub, three calculators (mortgage/EMI, rental yield, stamp duty & transfer cost), printable PDF-style summaries, an "email me this summary" option, side-by-side scenario comparison, and an adaptive "Related tools" block in the blog sidebar.
- Status: Complete — all planned tool routes are built; the Tools hub is linked from the footer and every tool cross-links the others.

### Phase 7: Brand Alignment, Leads & Visitor Tools
- Goal: Match the client's navbar/footer reference, ensure no enquiry is missed, and give visitors sticky planning helpers.
- Deliverable: Navbar + footer rebuilt to the reference, CTA visibility fix, automatic enquiry email notification, "Save this report" on calculators, and a property shortlist with an email/print summary page.
- Status: Complete.

### Phase 8: Comparison & Returning-Visitor Tools
- Goal: Help visitors compare shortlisted homes and pick up where they left off.
- Deliverable: Shortlist comparison table (beds, baths, area, price per sq ft), WhatsApp shortlist sharing, and remembered search filters with a re-check prompt for new matching listings.
- Status: Complete.