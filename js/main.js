/*
  HOLY PRIMATE — site behavior
  =============================
  You shouldn't need to edit this file. Store connection lives in
  shopify-config.js; page content lives in the .html files.
*/

(function () {
  "use strict";

  function isShopifyConfigured() {
    var cfg = window.SHOPIFY_CONFIG;
    return !!(cfg && cfg.storeDomain && cfg.storeDomain.indexOf("YOUR-STORE") === -1);
  }

  function loadStorefrontScript(callback) {
    if (document.getElementById("shopify-storefront-script")) {
      callback();
      return;
    }
    var s = document.createElement("script");
    s.id = "shopify-storefront-script";
    s.src = "https://cdn.shopify.com/storefront/web-components.js";
    s.onload = callback;
    s.onerror = function () {
      console.error("Holy Primate: could not load Shopify's Storefront Web Components script.");
    };
    document.head.appendChild(s);
  }

  // Builds the markup for one collection's product grid using Shopify
  // Storefront Web Components. See: https://shopify.dev/docs/api/storefront-web-components
  function collectionMarkup(handle, label) {
    return (
      '<shopify-context type="collection" handle="' + handle + '">' +
        '<shopify-list-context type="product" query="collection.products" first="24">' +
          "<template>" +
            '<div class="product-card">' +
              '<div class="product-media">' +
                '<shopify-media query="product.selectedOrFirstAvailableVariant.image" width="500" height="500"></shopify-media>' +
              "</div>" +
              '<div class="product-info">' +
                '<span class="eyebrow">' + label + "</span>" +
                "<h4><shopify-data query=\"product.title\"></shopify-data></h4>" +
                "<shopify-variant-selector></shopify-variant-selector>" +
                '<p class="product-price"><shopify-money query="product.selectedOrFirstAvailableVariant.price" format="money_with_currency"></shopify-money></p>' +
                '<button class="btn btn-primary btn-block" ' +
                  'onclick="document.getElementById(&quot;cart&quot;).addLine(event).showModal();" ' +
                  'shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">' +
                  "Add to cart" +
                "</button>" +
              "</div>" +
            "</div>" +
          "</template>" +
        "</shopify-list-context>" +
      "</shopify-context>"
    );
  }

  function mountLiveShop() {
    var cfg = window.SHOPIFY_CONFIG;
    loadStorefrontScript(function () {
      if (!document.getElementById("store")) {
        var store = document.createElement("shopify-store");
        store.id = "store";
        store.setAttribute("store-domain", cfg.storeDomain);
        document.body.appendChild(store);
      }
      if (!document.getElementById("cart")) {
        var cart = document.createElement("shopify-cart");
        cart.id = "cart";
        document.body.appendChild(cart);
      }

      var grids = document.querySelectorAll(".product-grid[data-collection]");
      grids.forEach(function (grid) {
        var key = grid.getAttribute("data-collection");
        var label = grid.getAttribute("data-label") || key;
        var handle = cfg.collections[key];
        if (handle) {
          grid.innerHTML = collectionMarkup(handle, label);
        }
      });

      var notice = document.getElementById("demo-notice");
      if (notice) notice.hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // ---- Shopify mounting (shop page only) ----
    if (document.querySelector(".product-grid[data-collection]")) {
      if (isShopifyConfigured()) {
        mountLiveShop();
      }
      // If not configured, demo cards already in the HTML stay as-is,
      // and the demo notice banner (visible by default) explains why.
    }

    // ---- Mobile nav toggle ----
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
    }

    // ---- FAQ accordion ----
    document.querySelectorAll(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".faq-item").classList.toggle("open");
      });
    });

    // ---- Contact form (Formspree, submitted via fetch so the page never reloads) ----
    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = document.getElementById("form-status");
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalLabel = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (res.ok) {
              form.reset();
              status.textContent = "Message sent — thanks for reaching out. Expect a reply soon.";
              status.className = "form-status success";
            } else {
              throw new Error("Form submission failed");
            }
          })
          .catch(function () {
            status.textContent = "Something went wrong. Please email sons.o.prophets@gmail.com directly.";
            status.className = "form-status error";
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          });
      });
    }
  });
})();
