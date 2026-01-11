function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("active");
  });
});

/* ===== LIGHTBOX Z OPISAMI I STRZAŁKAMI ===== */
document.querySelectorAll(".gallery-grid").forEach((gallery) => {
  const items = Array.from(gallery.querySelectorAll(".gallery-item"));
  let currentIndex = 0;

  items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    const item = items[currentIndex];

    const overlay = document.createElement("div");
    overlay.className = "lightbox";

    overlay.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Zamknij">✕</button>
        <button class="lightbox-prev" aria-label="Poprzednie">‹</button>

        <img src="${item.href}" alt="">
        <p class="lightbox-caption">${item.dataset.caption || ""}</p>

        <button class="lightbox-next" aria-label="Następne">›</button>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".lightbox-close").onclick = close;
    overlay.querySelector(".lightbox-prev").onclick = prev;
    overlay.querySelector(".lightbox-next").onclick = next;

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", handleKey);
  }

  function update() {
    const item = items[currentIndex];
    document.querySelector(".lightbox-content img").src = item.href;
    document.querySelector(".lightbox-caption").textContent =
      item.dataset.caption || "";
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    update();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    update();
  }

  function close() {
    document.querySelector(".lightbox")?.remove();
    document.removeEventListener("keydown", handleKey);
  }

  function handleKey(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }
});
/* ===== KONIEC LIGHTBOX Z OPISAMI I STRZAŁKAMI ===== */

/* ===== ALERTY PO WYSŁANIU FORMULARZA KONTAKTOWEGO ===== */
const params = new URLSearchParams(window.location.search);
if (params.get("sent")) {
  alert("Dziękujemy! Wiadomość została wysłana.");
}
if (params.get("error")) {
  alert("Wystąpił błąd. Spróbuj ponownie później.");
}
/* ===== KONIEC ALERTÓW PO WYSŁANIU FORMULARZA KONTAKTOWEGO ===== */
