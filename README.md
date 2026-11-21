# Our Apps — family app store

A small static storefront for our own apps. Three kinds of page:

| Page | What it is | Surface |
|---|---|---|
| `index.html` | The store's own home page: catalog, search, category filters | Explore |
| `<app-slug>.html` (12 files) | A real web page per app, e.g. `agate-lens.html` | Decide |
| `bridges.html` | All four bridge apps at once, side by side | Compare |

`app.html?slug=…` still works as a fallback, but the named pages are the ones
the store links to.

## The four bridge apps

`passcache.html` (Deception Pass), `tacoma-narrows.html`, `evergreen-point.html`
and `ship-canal.html`. All four share the same Log / Counts / Prizes / Salute
design; `bridges.html` lines up their crossing, water below, starter spots,
spot mix and signature detail in one aligned table, then shows every starter
spot on four aligned cards. 31 starter spots total, all marked as samples.

## Run it

```sh
cd ~/our-apps-site
python3 -m http.server 8123 --bind 0.0.0.0
```

Open http://192.168.12.243:8123/ (or http://localhost:8123/ on this machine).
The server is currently running on port 8123. Because everything is plain
scripts, opening `index.html` directly from disk also works.

## Edit it

`data.js` is the single source of truth — store name, all 12 listings, and the
bridge data. Edit that one file and every page updates on reload. No build
step, no npm, no framework.

- `assets/styles.css` — design system (warm dark palette, serif display type)
- `assets/site.js` — shared rendering for all three page types
- `data.js` — store + app data

To add an app: add an object to `window.APPS` and copy any named app page to
`<new-slug>.html`, changing `data-slug` on `<body>`.

## Selling — what is wired and what is missing

The store now has real purchase plumbing: price tags on cards, a Buy section on
every app page, and hosted-checkout buttons. It uses **Lemon Squeezy** as
Merchant of Record — that provider handles card data, VAT/sales tax, refunds,
chargebacks and (for digital products) file delivery. Our site never handles a
card number. See `SELLING_SETUP.md` for the step-by-step account and product setup.

Two things are not done and cannot be done from here:

1. **A merchant account and its product URLs.** Create the products in
   Lemon Squeezy (or Gumroad / Stripe / PayPal — any hosted checkout works),
   then paste each hosted checkout URL into `commerce.js` → `products[slug].options[].url`.
   Until that is filled, the buttons honestly say "Checkout link to be connected".
2. **The remaining detail is legal review.** Every app now has a modest
   confirmed price — $0.99 for the bridge apps and Story Mixer, $1.99 for
   EarnStack, $2.99 for Fungi Field and Kid Code Studio, $4.99 for
   Agate Lens Pro, and free for the free tools. Kits are $59/$99/$149. Every
   operational value on `policies.html` is filled but marked **proposed**
   (jurisdiction, refund windows, shipping regions, handling time, reply time);
   a lawyer/accountant must confirm them before money changes hands.

Agate Lens Pro is deliberately unconnected: the app has no billing code and no
web licence-key validation, so a web sale could not unlock anything. When a Play
listing exists, paste its URL into `agate-lens-pro.url`; the site then links out
and never handles the transaction.

Suggested first products: Agate Lens (free APK) and the three light kits as
physical products. Agate Lens Pro stays unconnected until there is a Play
listing or web licence-key support in the app. All other apps are priced and
ready for a checkout URL whenever you create their products.

## Honesty rules for this site

- No checkout link is live until a real merchant product URL is pasted into
  `commerce.js`; until then the buttons say so rather than faking a sale.
- No card handling, accounts, tracking, or third-party ad serving on this site.
  Payments happen on the checkout provider's hosted page.
- Prices are either confirmed by the owner or marked as proposed / not set.
- Bridge spot positions are approximate public landmarks from each app's
  `lib/catalog.dart`, not verified geocache coordinates. Every one is a sample.
- Prize-pool terms and eligibility are not published anywhere on this site.
- The published privacy policy remains the separate authoritative document at
  https://1nationofraiders-wq.github.io/agate-lens-privacy/

## Deploy

No build output — upload the directory as-is.

- **GitHub Pages:** push to a repo under `1nationofraiders-wq`, then
  Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
- **Cloudflare Pages:** build command empty, output directory `/`.
- **Local Wi-Fi:** the `python3 -m http.server` command above.

Live now at **https://1nationofraiders-wq.github.io/our-apps-site/**, published
from this repo's `main` branch via GitHub Pages. The free Agate Lens APK is a
working download from the published GitHub release; paid products stay in the
honest "checkout link to be connected" state until merchant URLs are added.

Relative paths are used throughout, so a project subdirectory works without
code changes. The only absolute URL in `data.js` (`STORE.url`) is informational.

## Relationship to the other sites

- `~/agate-site` is the existing Agate Lens product storefront. This site is a
  separate, broader store and does not replace it.
- `~/agate-server` is the FastAPI backend on port 8765. This site makes no API
  calls and works when that backend is offline.
- `~/web-apps` (the six LAN browser pages) is listed here as one app entry.
