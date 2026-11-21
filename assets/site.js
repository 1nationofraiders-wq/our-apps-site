/* Our Apps — shared rendering. Reads window.STORE and window.APPS from data.js. */
(function () {
  "use strict";
  var apps = window.APPS || [];
  var store = window.STORE || {};
  var page = document.body.getAttribute("data-page") || "index";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function initials(name) {
    var parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  function tile(app) {
    return '<span class="mono-tile" style="--tile:' + esc(app.accent) + '" aria-hidden="true">' +
      esc(initials(app.name)) + "</span>";
  }
  function statusTag(app) {
    var cls = app.status === "Available" ? "status-available" :
              app.status === "In development" ? "status-dev" : "";
    return '<span class="tag ' + cls + '">' + esc(app.status) + "</span>";
  }
  function bridgeTag(app) {
    return app.bridge ? '<span class="tag bridge-tag">bridge app</span>' : "";
  }
  function bySlug(slug) {
    for (var i = 0; i < apps.length; i++) if (apps[i].slug === slug) return apps[i];
    return null;
  }
  function bridgeApps() {
    return apps.filter(function (a) { return a.bridge; });
  }
  function appUrl(app) { return encodeURIComponent(app.slug) + ".html"; }
  var commerce = window.COMMERCE || { products: {} };

  function money(c) { return "$" + (c / 100).toFixed(2); }
  function productFor(app) { return commerce.products && commerce.products[app.slug]; }
  function shortPrice(app) {
    var p = productFor(app);
    if (!p || !p.options || !p.options.length) return "";
    var paid = p.options.filter(function (o) { return o.priceCents !== null && o.priceCents > 0; });
    if (paid.length) {
      var low = Math.min.apply(null, paid.map(function (o) { return o.priceCents; }));
      var unconfirmed = paid.some(function (o) { return !o.confirmed; });
      return "from " + money(low) + (unconfirmed ? "*" : "");
    }
    var free = p.options.some(function (o) { return o.priceCents === 0; });
    return free ? "Free" : "Price to be set";
  }
  function buyButton(o, label) {
    if (o.url) return '<a class="btn primary" href="' + esc(o.url) + '" rel="noopener">' + esc(label) + " →</a>";
    return '<span class="btn disabled" aria-disabled="true">Checkout link to be connected</span>';
  }
  function renderKits() {
    var el = document.getElementById("kits");
    if (!el || !commerce.extras) return;
    el.innerHTML = commerce.extras.map(function (o) {
      var price = o.priceCents === null ? "Price not set" : money(o.priceCents);
      return '<div class="card"><h3>' + esc(o.label) + "</h3>" +
        '<p class="tagline">' + esc(o.note) + "</p>" +
        '<div class="buy-line"><b>' + esc(price) + "</b></div>" +
        buyButton(o, "Buy " + o.label) + "</div>";
    }).join("");
  }
  function buyBlock(app) {
    var p = productFor(app);
    if (!p || !p.options) return "";
    var rows = p.options.map(function (o) {
      var price = o.priceCents === null ? "Price not set" : (o.priceCents === 0 ? "Free" : money(o.priceCents));
      var star = (o.priceCents !== null && o.priceCents !== 0 && !o.confirmed) ? " (proposed)" : "";
      var btn = buyButton(o, "Buy " + o.label);
      return '<div class="buy-option"><div class="buy-line"><b>' + esc(o.label) + "</b><span>" + esc(price + star) +
        "</span></div>" + (o.note ? '<p class="note">' + esc(o.note) + "</p>" : "") + btn + "</div>";
    }).join("");
    return '<div class="callout get"><div class="label">Buy ' + esc(app.name) + "</div>" + rows +
      '<p class="fine">' + esc(commerce.checkoutNote || "") + "</p>" +
      '<p class="fine"><a href="policies.html">Terms · Refunds · Shipping · Contact</a></p></div>';
  }

  function nav(active) {
    var items = [
      ["index.html", "Store", "index"],
      ["bridges.html", "Bridge apps", "bridges"],
      ["agate-lens.html", "Agate Lens", "app"],
      ["policies.html", "Policies", "policies"]
    ];
    return items.map(function (it) {
      return '<a href="' + it[0] + '"' + (active === it[2] ? ' aria-current="page"' : "") + ">" + esc(it[1]) + "</a>";
    }).join("");
  }
  function masthead(active) {
    return '<header class="masthead"><div class="wrap">' +
      '<a class="brand" href="index.html"><span class="mark">OA</span>' +
      "<span>" + esc(store.name || "Our Apps") + "<small>" + esc(store.owner || "") + "</small></span></a>" +
      '<nav class="main">' + nav(active) + "</nav></div></header>";
  }
  function footer() {
    return '<footer class="site"><div class="wrap"><span>' + esc(store.name || "Our Apps") +
      "<span>" + esc(store.name || "Our Apps") + " — " + esc(store.tagline || "") + '</span><span>' + esc(store.note || "") +
      '</span><span><a href="policies.html">Terms</a> · <a href="policies.html#refunds">Refunds</a> · <a href="policies.html#shipping">Shipping</a> · <a href="policies.html#contact">Contact</a></span></div></footer>';
  }
  function mount(active) {
    var m = document.querySelector("[data-slot=masthead]");
    var f = document.querySelector("[data-slot=footer]");
    if (m) m.outerHTML = masthead(active);
    if (f) f.outerHTML = footer();
  }

  function card(app) {
    return '<a class="card" href="' + appUrl(app) + '">' +
      '<div class="card-top">' + tile(app) + "<h3>" + esc(app.name) + "</h3></div>" +
      '<p class="tagline">' + esc(app.tagline) + "</p>" +
      '<div class="card-foot">' + bridgeTag(app) + statusTag(app) +
      '<span class="tag">' + esc(app.platform) + "</span>" +
      (shortPrice(app) ? '<span class="tag price">' + esc(shortPrice(app)) + "</span>" : "") +
      '<span class="more">View →</span></div></a>';
  }

  /* ---------------- Storefront (index.html) ---------------- */
  function initIndex() {
    var grid = document.getElementById("grid");
    var count = document.getElementById("count");
    var chips = document.getElementById("chips");
    var search = document.getElementById("search");
    if (!grid || !chips) return;
    mount("index");

    var categories = [];
    apps.forEach(function (a) { if (categories.indexOf(a.category) < 0) categories.push(a.category); });
    chips.innerHTML = ['<button class="chip" data-cat="all" aria-pressed="true">All apps</button>']
      .concat(categories.map(function (c) {
        return '<button class="chip" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>";
      })).join("");

    var activeCat = "all";
    function render() {
      var q = (search ? search.value : "").trim().toLowerCase();
      var list = apps.filter(function (a) {
        var matchCat = activeCat === "all" || a.category === activeCat;
        var hay = (a.name + " " + a.tagline + " " + a.description + " " + a.category).toLowerCase();
        return matchCat && (!q || hay.indexOf(q) >= 0);
      });
      list.sort(function (a, b) {
        var ca = a.category === "Bridge apps" ? 1 : 0;
        var cb = b.category === "Bridge apps" ? 1 : 0;
        return ca - cb || a.name.localeCompare(b.name);
      });
      grid.innerHTML = list.length ? list.map(card).join("") :
        '<div class="empty" style="grid-column:1/-1">No apps match that filter. Try “All apps”.</div>';
      count.textContent = list.length + " of " + apps.length + " shown";
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest("button.chip");
      if (!b) return;
      activeCat = b.getAttribute("data-cat");
      Array.prototype.forEach.call(chips.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      render();
    });
    if (search) search.addEventListener("input", render);

    var strip = document.getElementById("bridge-strip");
    if (strip) {
      strip.innerHTML = bridgeApps().map(function (a) {
        return '<a class="mini" href="' + appUrl(a) + '">' +
          tile(a) + "<b>" + esc(a.name) + "</b>" +
          "<span>" + esc(a.bridgeInfo.crossing) + "</span>" +
          "<em>" + esc(a.bridgeInfo.spots.length) + " starter spots</em></a>";
      }).join("");
    }
    render();
    renderKits();
  }

  /* ---------------- Detail (app.html) ---------------- */
  function initDetail() {
    var root = document.getElementById("detail");
    if (!root) return;
    mount("app");
    var slug = document.body.getAttribute("data-slug") || new URLSearchParams(window.location.search).get("slug") || "";
    var app = bySlug(slug);
    if (!app) {
      root.innerHTML = '<div class="empty">No app matches “' + esc(slug) +
        '”. <a class="back-link" href="index.html">← Back to the store</a></div>';
      return;
    }
    document.title = app.name + " — " + (store.name || "Our Apps");
    var crumb = '<div class="breadcrumb"><a href="index.html">Store</a><span>/</span>' +
      '<a href="index.html">' + esc(app.category) + "</a><span>/</span><span>" + esc(app.name) + "</span></div>";

    var head = '<div class="detail-head">' + tile(app) + "<div><h1>" + esc(app.name) + "</h1>" +
      '<p class="tagline">' + esc(app.tagline) + '</p><div class="detail-tags">' +
      bridgeTag(app) + statusTag(app) + '<span class="tag">' + esc(app.platform) + "</span>" +
      '<span class="tag">v' + esc(app.version) + "</span></div></div></div>";

    var body = '<div class="block"><h2>What it does</h2><p class="body">' + esc(app.description) + "</p></div>" +
      '<div class="block"><h2>Features</h2><ul class="features">' +
      app.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="block"><div class="callout"><div class="label">The honest bit</div><p>' +
      esc(app.honesty) + "</p></div></div>";

    if (app.bridge && app.bridgeInfo) {
      var groups = { bridge: [], under: [], shore: [] };
      app.bridgeInfo.spots.forEach(function (s) { groups[s.kind].push(s.name); });
      var labels = { bridge: "Cross the span", under: "Pass beneath", shore: "On the shore" };
      var spots = Object.keys(groups).map(function (k) {
        if (!groups[k].length) return "";
        return '<div class="group-title">' + labels[k] + " · " + groups[k].length + "</div>" +
          groups[k].map(function (n) {
            return '<div class="spot"><span>' + esc(n) + '</span><span class="kind ' + k + '">' + esc(k) + "</span></div>";
          }).join("");
      }).join("");
      body += '<div class="block"><h2>Where you’ll log</h2>' +
        '<p class="body">Starter positions in the app — approximate public landmarks, all marked as samples.</p>' +
        '<div class="spot-list">' + spots + "</div></div>";
    }

    var aside = '<div class="aside">' + buyBlock(app) +
      '<div class="block" style="margin-top:26px"><div class="facts">' +
      fact("Category", app.category) + fact("Platform", app.platform) +
      fact("Version", "v" + app.version) + fact("Status", app.status) +
      fact("Source", app.source) + "</div></div>" +
      '<a class="back-link" href="index.html">← All apps</a>' +
      (app.bridge ? '<br><a class="back-link" href="bridges.html">→ Compare all four bridge apps</a>' : "") +
      "</div>";

    root.innerHTML = crumb + head + '<div class="detail-grid"><div>' + body + "</div>" + aside + "</div>";
  }
  function fact(k, v) {
    return "<div><dt>" + esc(k) + "</dt><dd>" + esc(v) + "</dd></div>";
  }

  /* ---------------- Compare (bridges.html) ---------------- */
  function initBridges() {
    var root = document.getElementById("bridges");
    if (!root) return;
    mount("bridges");
    var bs = bridgeApps();
    if (!bs.length) { root.innerHTML = '<div class="empty">No bridge apps listed yet.</div>'; return; }

    function counts(a) {
      var c = { bridge: 0, under: 0, shore: 0 };
      a.bridgeInfo.spots.forEach(function (s) { c[s.kind]++; });
      return c.bridge + " over · " + c.under + " under · " + c.shore + " shore";
    }

    var head = '<div class="section-head"><div><h2>Four crossings, one pattern</h2>' +
      '<p>Each app has the same four tabs — Log, Counts, Prizes and Salute — with its own bridge, water and starter spots.</p></div></div>';
    var band = '<div class="shared-band"><span class="lead"><b>In all four:</b></span><div class="tabs">' +
      ["Log", "Counts", "Prizes", "Salute"].map(function (t) { return '<span class="tab">' + t + "</span>"; }).join("") +
      "</div></div>";

    var rows = [
      ["Crossing", function (a) { return esc(a.bridgeInfo.crossing); }],
      ["Water below", function (a) { return esc(a.bridgeInfo.water); }],
      ["Starter spots", function (a) { return a.bridgeInfo.spots.length + " (all marked samples)"; }],
      ["Spot mix", counts],
      ["Approx. centre", function (a) { return esc(a.bridgeInfo.coordinates); }],
      ["Version", function (a) { return "v" + esc(a.version) + " · " + esc(a.status); }],
      ["Signature", function (a) { return esc(a.bridgeInfo.differentiator); }]
    ];
    var table = '<div class="table-scroll"><table class="compare"><thead><tr><th></th>' +
      bs.map(function (a) {
        return "<th>" + tile(a) + '<br><a href="' + appUrl(a) + '">' + esc(a.name) + "</a></th>";
      }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) {
        var sig = r[0] === "Signature";
        return '<tr class="' + (sig ? "signature" : "") + '"><th>' + esc(r[0]) + "</th>" +
          bs.map(function (a) { return "<td>" + r[1](a) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="table-note">Spots are approximate public landmarks, not verified geocache coordinates. Prize-pool terms are not yet published.</p>';

    var labels = { bridge: "Cross the span", under: "Pass beneath", shore: "On the shore" };
    var cards = '<div class="section-head" style="margin-top:48px"><div><h2>Every starter spot, side by side</h2>' +
      '<p>Same structure on each card, so you can scan one kind of spot across all four crossings.</p></div></div>' +
      '<div class="cards-four">' + bs.map(function (a) {
        var groups = { bridge: [], under: [], shore: [] };
        a.bridgeInfo.spots.forEach(function (s) { groups[s.kind].push(s.name); });
        var list = Object.keys(groups).map(function (k) {
          if (!groups[k].length) return "";
          return '<div class="group-title">' + labels[k] + " · " + groups[k].length + "</div>" +
            groups[k].map(function (n) {
              return '<div class="spot"><span>' + esc(n) + '</span><span class="kind ' + k + '">' + esc(k) + "</span></div>";
            }).join("");
        }).join("");
        return '<section class="bridge-card"><header>' + tile(a) +
          '<div><h3>' + esc(a.name) + '</h3><div class="where">' + esc(a.bridgeInfo.crossing) + "</div></div></header>" +
          '<div class="spot-list">' + list + "</div>" +
          '<div class="foot"><span class="tag">' + esc(a.version) + '</span>' +
          '<a href="' + appUrl(a) + '">Full listing →</a></div></section>';
      }).join("") + "</div>";

    root.innerHTML = head + band + table + cards;
  }

  if (page === "index") initIndex();
  else if (page === "app") initDetail();
  else if (page === "bridges") initBridges();
})();
