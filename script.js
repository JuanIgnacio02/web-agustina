document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 0) Data
  // =========================
  const products = [

    // Botellas térmicas
    { name: "Botella Zorro", price: 25000, image: "assets/botella-zorro.jpg", cat: "botellas-y-vasos", sub: "botellas" },
    { name: "Botella Judy Hopps", price: 40000, image: "assets/botella-conejo.jpg", cat: "botellas-y-vasos", sub: "botellas" },
    { name: "Botella Stitch", price: 8500, image: "assets/botella-stich.jpg", cat: "botellas-y-vasos", sub: "botellas" },

    // Ropa
    { name: "Short Jean", price: 18000, image: "assets/short-jean.jpg", cat: "indumentaria", sub: "inferior" },
    { name: "Bermuda Negra", price: 22000, image: "assets/short-negro.jpg", cat: "indumentaria", sub: "inferior" },

    // Accesorios
    { name: "Cartera Trendy", price: 9500, image: "assets/cartera-trendy.jpg", cat: "accesorios", sub: "accesorios" },
    { name: "Bolso Amayra", price: 9500, image: "assets/bolso-amayra.jpg", cat: "accesorios", sub: "accesorios" },

    // Maquillaje
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje1.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje2.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje3.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje4.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje5.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje6.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje7.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje8.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje9.jpg", cat: "maquillaje", sub: "maquillaje" },
    { name: "Maquillaje", price: 9500, image: "assets/maquillaje10.jpg", cat: "maquillaje", sub: "maquillaje" },

    // Tazas
    { name: "Taza Jeryy", price: 9500, image: "assets/taza-jerry.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Tom", price: 9500, image: "assets/taza-tom.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Pelota", price: 9500, image: "assets/taza-pelota.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza1.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza2.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza3.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza4.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza5.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza6.jpg", cat: "tazas", sub: "tazas" },
    { name: "Taza Ceramica", price: 9500, image: "assets/taza7.jpg", cat: "tazas", sub: "tazas" },

  ];

  // =========================
  // 1) DOM
  // =========================
  const grid = document.getElementById("product-grid");
  const sectionTitle = document.getElementById("section-title");
  const yearEl = document.getElementById("year");
  const chips = document.querySelector(".catalogo__chips");

  const chipGroup = document.querySelector(".chip-group");

if (chipGroup) {

  chipGroup.addEventListener("mouseenter", () => {
    chipGroup.classList.add("open");
  });

  chipGroup.addEventListener("mouseleave", () => {
    chipGroup.classList.remove("open");
  });

}
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // Header dinámico
  // =========================
  const header = document.querySelector(".header");

  function setHeaderHeightVar() {
    if (!header) return;
    document.documentElement.style.setProperty("--headerH", header.offsetHeight + "px");
  }

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("header--compact", window.scrollY > 10);
    setHeaderHeightVar();
  }

  setHeaderHeightVar();
  window.addEventListener("resize", setHeaderHeightVar);
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  if (!grid) {
    console.error("No existe #product-grid en el HTML");
    return;
  }

  // =========================
  // Scroll reveal cards
  // =========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  function observeCards() {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("is-visible");
      observer.observe(card);
    });
  }

  // =========================
  // Render productos
  // =========================
  function renderProducts(filter = { type: "all", value: "all" }) {

    let list = products;

    if (filter.type === "cat") list = products.filter((p) => p.cat === filter.value);
    if (filter.type === "sub") list = products.filter((p) => p.sub === filter.value);

    grid.innerHTML = list.map(p => `
      <article class="card product-link"
      data-name="${p.name}"
      data-image="${p.image}"
      data-price="${p.price}"
      data-cat="${p.cat}"
      data-sub="${p.sub}">

  <div class="card__media">
    <span class="card__badge">NUEVO</span>
    <img src="${p.image}" class="card__img" alt="${p.name}">
  </div>

  <div class="card__info">
    <h3 class="card__title">${p.name}</h3>

    <div class="card__bottom">
      <p class="card__price">$${p.price.toLocaleString("es-AR")}</p>

      <a class="card__cta"
         href="https://wa.me/5492604002520?text=Hola!%20Quiero%20consultar%20por%20${encodeURIComponent(p.name)}"
         target="_blank">
         Consultar
      </a>
    </div>
  </div>

</article>
    `).join("");

    observeCards();
  }

  // =========================
  // Chips filtros
  // =========================
  if (chips) {

    chips.addEventListener("click", (e) => {

      const btn = e.target.closest("[data-filter]");
      if (!btn) return;

      const type = btn.dataset.filter;
      const value = btn.dataset.value;

      if (sectionTitle) {
        sectionTitle.textContent =
          type === "all"
            ? "Todo"
            : btn.textContent.trim();
      }

      grid.classList.add("is-animating");

      setTimeout(() => {

        renderProducts({ type, value });

        requestAnimationFrame(() => {
          grid.classList.remove("is-animating");
        });

      }, 140);

      chips.querySelectorAll(".chip").forEach(c =>
        c.classList.remove("is-active")
      );

      btn.classList.add("is-active");

      document.querySelector("#catalogo")?.scrollIntoView({
        behavior: "smooth"
      });

    });

  }

  // =========================
  // Init
  // =========================
  renderProducts({ type: "all", value: "all" });

// =========================
// Abrir página de producto (SOLO en el grid)
// =========================
grid.addEventListener("click", (e) => {

  // si clickeó el botón de WhatsApp no abrir detalle
  if (e.target.closest(".card__cta")) return;

  const card = e.target.closest(".product-link");
  if (!card) return;

  const product = {
    name: card.dataset.name,
    image: card.dataset.image,
    price: card.dataset.price,
    cat: card.dataset.cat,
    sub: card.dataset.sub
  };

  localStorage.setItem("productoSeleccionado", JSON.stringify(product));

  window.location.href = "producto.html";
});
  
});