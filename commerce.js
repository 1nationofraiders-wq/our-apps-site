/*
 * Commerce config for Our Apps.
 *
 * Recommended setup: Lemon Squeezy as Merchant of Record. It handles VAT /
 * sales tax, refunds, chargebacks and card data, and can host the APK as the
 * delivery file. Our site never touches a card number.
 *
 * TO GO LIVE (two edits per product):
 *   1. Create the product in your merchant account.
 *   2. Paste its hosted checkout URL into `url` below.
 *
 * Owner confirmed the catalog prices: Agate Lens Pro $4.99, kits $59/$99/$149.
 * All apps now have a confirmed modest price; free tools stay at zero.
 */
window.COMMERCE = Object.freeze({
  provider: "Lemon Squeezy",
  seller: "1nationofraiders-wq",
  sellerEmail: "1nationofraiders@gmail.com",
  currency: "USD",
  checkoutNote:
    "Checkout is hosted by our merchant provider. We never see or store your card details. " +
    "Taxes are calculated at checkout for your region.",
  products: {
    "agate-lens": {
      options: [
        { sku: "agate-lens-free", label: "Agate Lens (free)", priceCents: 0, confirmed: true, url: "",
          note: "No payment. Download the signed APK." },
        { sku: "agate-lens-pro", label: "Agate Lens Pro", priceCents: 499, confirmed: true, url: "",
          note: "Not connected yet — the app has no web-licence support. Google Play Billing is the intended path." }
      ]
    },
    "earnstack": {
      options: [{ sku: "earnstack", label: "EarnStack", priceCents: 199, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "fungi-field": {
      options: [{ sku: "fungi-field", label: "Fungi Field", priceCents: 299, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "kidcode-studio": {
      options: [{ sku: "kidcode-studio", label: "Kid Code Studio", priceCents: 299, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "passcache": {
      options: [{ sku: "passcache", label: "Deception Pass", priceCents: 99, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "tacoma-narrows": {
      options: [{ sku: "tacoma-narrows", label: "Tacoma Narrows", priceCents: 99, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "evergreen-point": {
      options: [{ sku: "evergreen-point", label: "Evergreen Point", priceCents: 99, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "ship-canal": {
      options: [{ sku: "ship-canal", label: "Ship Canal", priceCents: 99, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "story-mixer": {
      options: [{ sku: "story-mixer", label: "Story Mixer", priceCents: 99, confirmed: true, url: "",
        note: "One-time purchase. No subscription." }]
    },
    "tell-lab": {
      options: [{ sku: "tell-lab", label: "Tell Lab", priceCents: 0, confirmed: true, url: "",
        note: "Free research tool — no checkout needed." }]
    },
    "voice-tell-lab": {
      options: [{ sku: "voice-tell-lab", label: "Voice Tell Lab", priceCents: 0, confirmed: true, url: "",
        note: "Research tool — free to use, source lives locally." }]
    },
    "browser-apps": {
      options: [{ sku: "browser-apps", label: "Browser Apps", priceCents: 0, confirmed: true, url: "",
        note: "Free on the local Wi-Fi. No checkout needed." }]
    }
  },
  extras: [
    { sku: "kit-starter", label: "Starter light kit", priceCents: 5900, confirmed: true, url: "",
      note: "Entry-level backlighting kit. Shipping calculated at checkout." },
    { sku: "kit-journeyman", label: "Journeyman light kit", priceCents: 9900, confirmed: true, url: "",
      note: "More light, more control. Shipping calculated at checkout." },
    { sku: "kit-pro", label: "Pro light kit", priceCents: 14900, confirmed: true, url: "",
      note: "Full kit for serious field work. Shipping calculated at checkout." }
  ]
});
