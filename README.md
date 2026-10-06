# Plastic Manufactures and Co. — Frontend

Responsive React frontend for a B2B polymer-material catalogue and quotation journey.

## Local setup

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Routes

- `/` — Home
- `/materials` — Searchable, filterable catalogue
- `/materials/:slug` — Product details and RFQ configuration
- `/request-quotation` — RFQ form
- `/request-received` — Submission confirmation
- `/quotation/:id` — Quotation preview and PDF download

## Content and assets

Material records and image imports are in `src/data/materials.js`. Application examples are in `src/data/applications.js`. Replace demo copy, specifications and certification values only with client-approved information.

Actual technical data sheets should be placed in `public/tds/` and linked from the matching material record. The current UI truthfully shows that a TDS is available on request because approved files have not been supplied.

Large source PNG files should be converted to WebP or AVIF before production launch. Keep meaningful `alt` text when replacing any image.

## SEO and analytics

Page metadata, canonical links, Open Graph fields and JSON-LD are managed by `src/hooks/usePageMeta.js`. Update the placeholder domain in `public/robots.txt` and `public/sitemap.xml` before deployment.

Analytics events are routed through `src/utils/analytics.js`. When GA4 is installed and `window.gtag` is available, the existing events will be sent automatically:

- `view_material`
- `start_rfq`
- `submit_rfq`
- `download_tds`
- `download_quote`
- `exit_intent_shown`

## Frontend-only limitations

- RFQ information is stored temporarily in `sessionStorage`; it is not sent to a database.
- Email delivery requires an approved backend or email-service integration.
- Automated pricing currently runs in clearly labelled demo mode using `src/data/pricing.demo.js`. These sample values are not a commercial offer and must be replaced with client-approved data before launch.
- Quotation validity is displayed in the frontend and is not enforced by a server.
- Authentication, admin/CMS, CRM history, secure pricing and notification workflows are separate backend scope.

## Demo pricing

The browser pricing engine is implemented in `src/utils/pricing.js`. It applies a polymer-family base rate, grade/colour/pack adjustments, margin, freight and tax; stores a calculation snapshot with the RFQ; and reuses that snapshot on screen and in the PDF. Missing, custom, below-MOQ and high-quantity configurations are routed to manual review.

Use `VITE_PRICING_MODE=demo` for the labelled frontend demonstration. Any other mode safely falls back to manual review until an approved live rate source is connected. Because browser calculations and bundled rates are visible and editable by users, this implementation is not suitable for confidential or authoritative commercial pricing.

## Future integration points

Connect the RFQ form to the approved API or form service, replace temporary quote references with server-generated IDs, load catalogue data from the approved CMS/API, and connect the pricing response to the existing priced/manual-review UI states.
