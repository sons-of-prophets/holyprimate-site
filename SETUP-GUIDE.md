# Holy Primate — setup guide

This file is for you, not your customers — it's not linked from the site anywhere.
Follow it in order and you'll have a live store.

## What's in this folder

```
index.html   → Homepage
shop.html    → Shop (Clothing, Art, Digital content)
contact.html → Contact form
help.html    → Help & FAQ
css/styles.css
js/shopify-config.js  → the ONE file you edit to connect Shopify
js/main.js             → site logic, you shouldn't need to touch this
```

Every page is a plain file you can open and read. To edit text — headlines,
FAQ answers, the brand story on the homepage — open the relevant `.html` file
in any text editor and change the words between the tags. You don't need to
touch anything that looks like `<div class="...">`, just the plain text.

## 1. Connect your Shopify store (5–10 minutes)

Open `js/shopify-config.js` — it has full instructions written inside it as
comments. Short version:

1. In Shopify admin: **Settings > Domains** to find your `.myshopify.com` address.
2. In Shopify admin: **Products > Collections**, create a collection each for
   Clothing, Art, and Digital content. Note each collection's **handle**.
3. Paste the store domain and the three handles into `shopify-config.js`.
4. Add each product to the right collection as you create it in Shopify —
   nothing else on the site needs to change when you add new products.

No Shopify access token or app is required for this — products, prices,
images, and checkout all work with just the store domain. This uses
Shopify's current **Storefront Web Components**, not the older Buy Button.

Until you do this, the Shop page shows example products and a small banner
saying so — the site never looks broken or empty while you're setting up.

## 2. Turn on the contact form (2 minutes)

The form is wired to send to **sons.o.prophets@gmail.com** through a free
service called Formspree (no backend server needed for a static site like
this one):

1. Go to [formspree.io](https://formspree.io) and create a free account with
   sons.o.prophets@gmail.com.
2. Create a new form, and copy the endpoint it gives you
   (looks like `https://formspree.io/f/abcd1234`).
3. Open `contact.html`, find this line near the top of the form:
   `action="https://formspree.io/f/YOUR-FORM-ID"`
   and replace `YOUR-FORM-ID` with your real endpoint.

The free plan covers 50 messages a month, which is plenty to start — you can
upgrade later if needed, or swap in a different form service by changing
this one line.

## 3. Preview the site on your computer

Double-click `index.html` to open it in a browser. Pages, styling, the FAQ
accordion, and the demo shop all work locally. The **live** Shopify product
grid and the contact form's submission need the site to be on the internet
to fully work (Shopify's components and Formspree both call out over the
web), so use a real preview link or the deployed version to test those two
parts.

## 4. Put it on holyprimate.com

This is a set of plain files, so it can go on any static host. The
simplest option:

1. Create a free account at [netlify.com](https://www.netlify.com).
2. Drag this whole folder onto the Netlify dashboard — it deploys instantly
   with a temporary netlify.app address.
3. In Netlify, go to **Domain settings > Add a custom domain**, enter
   `holyprimate.com`, and follow the DNS records it gives you.
4. Add those DNS records at wherever you registered holyprimate.com. This
   part is outside Netlify and Shopify both — it happens at your domain
   registrar's site.

DNS changes can take a few hours to fully take effect.

## 5. Things written as placeholders — check these before launch

- **Homepage brand story** (the quote in the "maker band" section of
  `index.html`) — replace with your own words.
- **Shipping timelines and return policy** on `help.html` — the numbers
  there (3–5 business days, 14-day returns, international shipping) are
  reasonable defaults, not your confirmed policy. Adjust to match reality.
- **Demo products on `shop.html`** — these disappear automatically once
  Shopify is connected, no cleanup needed.
- **Footer year** — currently "© 2026," update yearly or make it dynamic
  later if you want.

## Questions

If anything above doesn't work as described, or a specific product (like a
very large instrument pack) needs a different setup, just ask — this is a
living project, not a one-time handoff.
