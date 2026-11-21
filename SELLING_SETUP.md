# Selling setup — Lemon Squeezy

This is the shortest path from "storefront" to "money arrives in your account"
without us writing or running any payment code.

Why a Merchant of Record: Lemon Squeezy is the seller of record. It charges the
buyer, works out VAT/sales tax for their region, handles refunds and chargebacks,
pays you out, and can deliver the APK file by email. Our site only holds a link —
it never sees a card number. That removes most of the legal and tax burden from
a small family operation.

## 1. Create the account (you, in a browser)

1. Go to https://www.lemonsqueezy.com/ and sign up.
2. Create your store. Use **1nationofraiders-wq** as the store/public name so it
   matches the seller name on the policy page.
3. Verify the email address you want buyers to reply to — this is the same one
   that goes into `commerce.js` (`sellerEmail`) and `policies.html`.
4. Under store settings, add your payout details (bank account) and complete the
   business/tax information it asks for. This is required before real payouts.
5. Turn on test mode while you set things up. Menu names shift occasionally; if
   a label differs, look for the equivalent.

## 2. Create the products

Create these in the Lemon Squeezy dashboard. Prices are the ones you confirmed.

| Product | Price | Type | Delivery |
|---|---|---|---|
| Starter light kit | $59 | Physical | shipping settings + weight |
| Journeyman light kit | $99 | Physical | shipping settings + weight |
| Pro light kit | $149 | Physical | shipping settings + weight |
| Agate Lens (free) | $0 | Digital | upload the signed APK as the file |
| Agate Lens Pro | $4.99 | See note below | see note below |

The free APK is at `~/agate-app/dist/agate-lens-v0.2.0.apk` (rebuild with
`flutter build apk --release` if that file is gone). Uploading it to Lemon
Squeezy means you do not have to host downloads on this site at all.

**Decision made — Agate Lens Pro stays unconnected for now.** The app has no
in-app billing code and no web licence-key validation, so neither a web purchase
nor a kit card can actually switch Pro on today. Taking $4.99 for it would mean
selling something nobody could receive. Keep `url: ""` on the Pro option — the
button honestly says "Checkout link to be connected". When a Play listing
exists, paste its URL into `agate-lens-pro.url`; that is one edit, no site
change. Web-sold Pro would require adding licence-key validation to the app
first.

## 3. Paste the checkout URLs

Each Lemon Squeezy product has a hosted checkout URL (it looks like
`https://<your-store>.lemonsqueezy.com/checkout/buy/...`). Put it in
`~/our-apps-site/commerce.js`:

- `products["agate-lens"].options[0].url` — free APK product
- `products["agate-lens"].options[1].url` — Pro, or the Play Store URL (above)
- `extras[0].url`, `extras[1].url`, `extras[2].url` — the three kits

The moment a URL is filled in, that button becomes a real "Buy … →" link.
Before then it honestly says "Checkout link to be connected".

Already filled: `commerce.js` → `sellerEmail` and the contact email on
`policies.html` both use `1nationofraiders@gmail.com`, taken from the published
privacy policy. Jurisdiction (Washington, US), 14/30-day refund windows,
US-only shipping, 2–5 day handling and 2-day reply time are filled but marked
**proposed** — confirm each with your lawyer before going live.

Then get `policies.html` reviewed by a lawyer/accountant before taking real
payments. That is the one step I cannot do for you.

## 4. Test before going live

1. In test mode, buy the $0 free product with a test card. Confirm the buyer
   email arrives and the APK downloads and installs.
2. Do a $1 test purchase if available, then refund it from the dashboard and
   confirm the refund lands.
3. For a physical kit, check the shipping charge and delivery estimate shown
   at checkout, and place one test order.
4. Switch out of test mode only after all three pass.

## 5. Then add the other apps

All apps are now priced modestly in `commerce.js` ($0.99–$4.99; free tools at
$0). Create a product for each one you want to sell and paste its `url` into the
matching entry. No site code changes are needed.

## 6. Publish the site (optional but recommended)

Hosted checkout works from any domain, so publishing is not required to sell —
the LAN URL `http://192.168.12.243:8123/` works for people on your Wi-Fi, but
not for the public. To sell to the public, push `~/our-apps-site` to a GitHub
repo under `1nationofraiders-wq` and enable Pages. The files are already
relative-path clean; no build step.
