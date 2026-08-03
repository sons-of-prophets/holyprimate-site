/*
  HOLY PRIMATE — SHOPIFY CONNECTION
  ==================================
  This is the ONLY file you should need to edit to connect this site to your
  real Shopify store. Everything else on the site reads from here.

  STEP 1 — Find your store domain
  --------------------------------
  In Shopify admin, go to Settings > Domains. Your default address looks like:
      holy-primate-abc123.myshopify.com
  Copy it and paste it below as storeDomain, keeping "https://" in front.

  STEP 2 — Create three collections
  ----------------------------------
  In Shopify admin, go to Products > Collections > Create collection.
  Make one collection for Clothing, one for Art, one for Digital content.
  Each collection has a "handle" — shown in the collection's URL, and
  editable under the collection's "Search engine listing" section.
  Paste those three handles below.

  STEP 3 — Save and reload
  -------------------------
  Save this file and reload the site. Your real products now appear on the
  Shop page automatically. From then on, adding a new product in Shopify and
  assigning it to the right collection is the ONLY step needed to add it to
  the site — no further editing of these files required.

  Note: no Shopify access token is required for this basic setup (product
  titles, images, prices, and checkout all work without one). You'd only
  need to add one later if you want to show live inventory counts.
*/

window.SHOPIFY_CONFIG = {
  // Replace with your real store domain, e.g. "https://holy-primate-abc123.myshopify.com"
  storeDomain: "https://YOUR-STORE.myshopify.com",

  // Replace each value with the matching collection's handle from Shopify admin
  collections: {
    clothing: "clothing",
    art: "art",
    digital: "digital-content"
  }
};
