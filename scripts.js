/* ==========================================================
   Perfectly Polished Beauty Spa
   ALL EDITABLE DETAILS LIVE IN THE CONFIG BELOW.
   Change prices, treatments, phone number, hours and images
   here and the whole page updates.
   ========================================================== */

const CONFIG = {
  businessName: "Perfectly Polished Beauty Spa",
  altName: "H/M's Beauty & SPA",

  /* ---- PHONE / WHATSAPP NUMBER (change here only) ----
     Use the international format with no "+", spaces or leading 0.
     South Africa: drop the first 0 and add 27.
       079 863 2499  ->  "27798632499"   (number on the flyer)
       062 298 0357  ->  "27622980357"
     TODO: confirm which number the spa wants customers to use. */
  whatsappNumber: "27798632499",
  phoneDisplay: "079 863 2499",   // how the number is shown on the page

  /* ---- TIKTOK ---- */
  tiktok: {
    displayName: "Mathapelo",
    handle: "@tinky",
    url: "https://www.tiktok.com/@tinky"  // check this link opens the right profile
  },

  /* ---- LOCATION ---- */
  location: {
    name: "Paledi Lodge",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paledi+Lodge"
    // Tip: for a pin on the exact spot, paste the "Share" link from Google Maps here.
  },

  /* ---- OPENING HOURS ----
     TODO: add the real hours. Leave the list empty ([]) to show a
     "message us" note instead. Example of the format:
       { days: "Monday to Friday", time: "09:00 - 17:00" },
       { days: "Saturday",         time: "09:00 - 14:00" },
       { days: "Sunday",           time: "Closed" } */
  hours: [],

  /* ---- WEBSITE ADDRESS (used for search results and link previews) ---- */
  siteUrl: "https://www.example.com/",

  /* ---- CURRENCY ---- */
  currency: "R",

  /* ---- TREATMENTS AND PRICES ----
     price: a number (e.g. 300 shows R300) or null for "Price on request".
     note:  optional short line under the treatment name. */
  categories: [
    {
      id: "body",
      label: "Body Sculpting",
      intro: "Cavity reduction sessions for the belly, arms, back and thighs. Results vary from person to person.",
      items: [
        { name: "Belly reduction", price: 300 },
        { name: "Arm flaps", price: 200 },
        { name: "Belly reduction + Lipopads", price: 600 },
        { name: "Back handles and thighs", price: 400 }
      ]
    },
    {
      id: "vacuum",
      label: "Vacuum Therapy",
      intro: "Vacuum therapy sessions focused on the hips, bum and curves. Results vary from person to person.",
      items: [
        { name: "Bum enlargement", price: 500 },
        { name: "Curvy enlightenment", price: 450 }
      ]
    },
    {
      id: "facial",
      label: "Facial Care",
      intro: "Skin-care treatments for a clean, fresh finish.",
      items: [
        { name: "Deep cleansing", price: 250 },
        { name: "Dermaplaning", price: 450 },
        { name: "Algae peel", price: 550 }
      ]
    },
    {
      id: "nails",
      label: "Nails",
      intro: "Prices depend on the set you choose. Message us for a quote.",
      items: [
        { name: "Manicures", price: null },
        { name: "Pedicures", price: null },
        { name: "Gel applications", price: null },
        { name: "Gel toes", price: null },
        { name: "Custom nail art", price: null, note: "Send us your inspiration photo" }
      ]
    }
  ],

  /* ---- GALLERY ----
     Put your photos in the images/ folder with these names (or change
     the names below). Add or remove rows to change how many tiles show.
     Always update the alt text so it describes the photo. */
  gallery: [
    { src: "images/gallery-1.jpg", alt: "Treatment room at Perfectly Polished Beauty Spa" },
    { src: "images/gallery-2.jpg", alt: "Body sculpting treatment in progress" },
    { src: "images/gallery-3.jpg", alt: "Facial care treatment" },
    { src: "images/gallery-4.jpg", alt: "Freshly done gel nails" },
    { src: "images/gallery-5.jpg", alt: "Nail art design" },
    { src: "images/gallery-6.jpg", alt: "Spa products and tools set out" }
  ]
};

/* ==========================================================
   Everything below this line powers the page.
   You normally do not need to edit it.
   ========================================================== */

document.documentElement.classList.add("js");

/* ---------- Helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const waLink = (message) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

const formatPrice = (price) =>
  price === null || price === undefined ? "Price on request" : `${CONFIG.currency}${price}`;

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "text") node.textContent = value;
    else if (key === "class") node.className = value;
    else node.setAttribute(key, value);
  });
  [].concat(children).forEach((child) => child && node.appendChild(child));
  return node;
}

/* ---------- Fill in contact details from CONFIG ---------- */
function applyContactDetails() {
  $$("[data-wa]").forEach((a) => {
    const message = a.dataset.waMessage || `Hi! I'd like to ask about ${CONFIG.businessName}.`;
    a.href = waLink(message);
    a.target = "_blank";
    a.rel = "noopener";
  });

  $$("[data-phone]").forEach((a) => { a.href = `tel:+${CONFIG.whatsappNumber}`; });
  $$("[data-phone-text]").forEach((a) => { a.textContent = CONFIG.phoneDisplay; });

  $$("[data-tiktok]").forEach((a) => { a.href = CONFIG.tiktok.url; });
  $$("[data-tiktok-text]").forEach((a) => {
    a.textContent = `${CONFIG.tiktok.displayName} (${CONFIG.tiktok.handle})`;
  });

  $$("[data-maps]").forEach((a) => { a.href = CONFIG.location.mapsUrl; });
  $$("[data-location-text]").forEach((p) => { p.textContent = CONFIG.location.name; });
  $$("[data-year]").forEach((s) => { s.textContent = new Date().getFullYear(); });
}

/* ---------- Opening hours ---------- */
function renderHours() {
  const box = $("#hours-list");
  if (!box) return;
  box.textContent = "";

  if (!CONFIG.hours.length) {
    box.appendChild(el("p", {
      class: "hours-note",
      text: "Opening hours coming soon. Message us on WhatsApp to check availability."
    }));
    return;
  }

  CONFIG.hours.forEach((row) => {
    box.appendChild(el("div", { class: "hours-row" }, [
      el("span", { text: row.days }),
      el("span", { text: row.time })
    ]));
  });
}

/* ---------- Treatments: tabs and price lists ---------- */
function renderTreatments() {
  const wrap = $("#treatment-tabs");
  if (!wrap) return;
  const tablist = $(".tablist", wrap);
  const panels = $(".tabpanels", wrap);

  CONFIG.categories.forEach((cat, index) => {
    const selected = index === 0;

    const tab = el("button", {
      class: "tab",
      type: "button",
      role: "tab",
      id: `tab-${cat.id}`,
      "aria-controls": `panel-${cat.id}`,
      "aria-selected": String(selected),
      tabindex: selected ? "0" : "-1",
      text: cat.label
    });
    tablist.appendChild(tab);

    const list = el("ul", { class: "price-list" });
    cat.items.forEach((item) => {
      const info = el("div", { class: "price-info" }, [
        el("h4", { text: item.name }),
        item.note ? el("p", { text: item.note }) : null
      ]);

      const price = el("span", {
        class: item.price === null ? "price on-request" : "price",
        text: formatPrice(item.price)
      });

      const book = el("a", {
        class: "btn btn-small",
        href: waLink(`Hi! I'd like to book ${item.name} at ${CONFIG.businessName}. When are you available?`),
        target: "_blank",
        rel: "noopener",
        "aria-label": `Book ${item.name} on WhatsApp`,
        text: "Book this"
      });

      list.appendChild(el("li", { class: "price-row" }, [info, price, book]));
    });

    const panel = el("div", {
      class: "tabpanel",
      role: "tabpanel",
      id: `panel-${cat.id}`,
      "aria-labelledby": `tab-${cat.id}`
    }, [el("p", { class: "panel-intro", text: cat.intro }), list]);
    if (!selected) panel.hidden = true;
    panels.appendChild(panel);
  });

  const tabs = $$(".tab", tablist);

  function activate(tab, moveFocus) {
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.setAttribute("aria-selected", String(isActive));
      t.tabIndex = isActive ? 0 : -1;
      $(`#${t.getAttribute("aria-controls")}`).hidden = !isActive;
    });
    if (moveFocus) tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "center" });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft")  next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End")  next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); activate(next, true); }
    });
  });
}

/* ---------- Booking form ---------- */
function renderTreatmentOptions() {
  const select = $("#treatment");
  if (!select) return;

  CONFIG.categories.forEach((cat) => {
    const group = el("optgroup", { label: cat.label });
    cat.items.forEach((item) => {
      const label = item.price === null ? item.name : `${item.name} (${formatPrice(item.price)})`;
      group.appendChild(el("option", { value: item.name, text: label }));
    });
    select.appendChild(group);
  });
}

function setupBookingForm() {
  const form = $("#booking-form");
  if (!form) return;
  const error = $("#form-error");
  const dateInput = $("#date");

  // Do not allow past dates
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";

    const fields = ["name", "treatment", "date", "time"].map((id) => $(`#${id}`));
    fields.forEach((f) => f.removeAttribute("aria-invalid"));

    const missing = fields.find((f) => !f.value.trim());
    if (missing) {
      missing.setAttribute("aria-invalid", "true");
      error.textContent = "Please fill in all the fields so we can send your request.";
      missing.focus();
      return;
    }

    const [name, treatment, date, time] = fields.map((f) => f.value.trim());
    const prettyDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-ZA", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });

    const message =
      `Hi ${CONFIG.businessName}! My name is ${name}. ` +
      `I'd like to book ${treatment} on ${prettyDate} at ${time}. ` +
      `Please let me know if that time is available. Thank you!`;

    window.open(waLink(message), "_blank", "noopener");
  });
}

/* ---------- Gallery and lightbox ---------- */
function setupGallery() {
  const grid = $("#gallery-grid");
  const box = $("#lightbox");
  if (!grid || !box) return;

  const boxImg = $("img", box);
  const boxCaption = $("figcaption", box);
  let current = 0;

  CONFIG.gallery.forEach((photo, i) => {
    const img = el("img", { src: photo.src, alt: photo.alt, loading: "lazy" });
    const button = el("button", {
      class: "gallery-item",
      type: "button",
      "aria-label": `View larger: ${photo.alt}`
    }, [img]);

    // Missing image? Show a soft "coming soon" tile instead of a broken icon.
    img.addEventListener("error", () => button.classList.add("is-missing"));
    button.addEventListener("click", () => {
      if (!button.classList.contains("is-missing")) open(i);
    });
    grid.appendChild(button);
  });

  function show(index) {
    current = (index + CONFIG.gallery.length) % CONFIG.gallery.length;
    boxImg.src = CONFIG.gallery[current].src;
    boxImg.alt = CONFIG.gallery[current].alt;
    boxCaption.textContent = CONFIG.gallery[current].alt;
  }

  function open(index) {
    show(index);
    if (typeof box.showModal === "function") box.showModal();
    else box.setAttribute("open", "");
  }

  $(".lightbox-close", box).addEventListener("click", () => box.close());
  $(".lightbox-prev", box).addEventListener("click", () => show(current - 1));
  $(".lightbox-next", box).addEventListener("click", () => show(current + 1));

  box.addEventListener("click", (e) => { if (e.target === box) box.close(); }); // click outside
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

/* ---------- Mobile menu ---------- */
function setupMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 860px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
}

/* ---------- Fade-ups on scroll ---------- */
function setupReveal() {
  const items = $$("[data-reveal]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((item) => observer.observe(item));
}

/* ---------- Search engine data (JSON-LD) kept in sync with CONFIG ---------- */
function updateStructuredData() {
  const node = $("#ld-json");
  if (!node) return;

  const prices = CONFIG.categories
    .flatMap((c) => c.items.map((i) => i.price))
    .filter((p) => typeof p === "number");

  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: CONFIG.businessName,
    alternateName: CONFIG.altName,
    description: "Body sculpting, vacuum therapy, facial care and nails in Paledi Lodge.",
    url: CONFIG.siteUrl,
    image: `${CONFIG.siteUrl}images/logo.png`,
    telephone: `+${CONFIG.whatsappNumber}`,
    priceRange: `${CONFIG.currency}${Math.min(...prices)} - ${CONFIG.currency}${Math.max(...prices)}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONFIG.location.name,
      addressCountry: "ZA"
    },
    hasMap: CONFIG.location.mapsUrl,
    sameAs: [CONFIG.tiktok.url]
  };

  node.textContent = JSON.stringify(data, null, 2);
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyContactDetails();
  renderHours();
  renderTreatments();
  renderTreatmentOptions();
  setupBookingForm();
  setupGallery();
  setupMenu();
  setupReveal();
  updateStructuredData();
});