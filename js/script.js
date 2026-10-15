
"use strict";

// =========================================
// TAHUN FOOTER OTOMATIS
// =========================================

const tahunElement = document.querySelector("#tahun");

if (tahunElement) {
  tahunElement.textContent = new Date().getFullYear();
}

// =========================================
// TOMBOL PROMO
// =========================================

const promoButton = document.querySelector("#promoButton");
const promoMessage = document.querySelector("#promoMessage");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    if (promoMessage) {
      promoMessage.textContent =
        "Promo: Beli 2, dapatkan diskon 20%! Tanyakan ketersediaan promo sebelum memesan.";
    } else {
      promoButton.textContent = "Promo: Beli 2 Diskon 20%";
    }

    console.log("Promo Kopi Gunung Lumping ditampilkan.");
  });
}

// =========================================
// FORMULIR KONTAK
// =========================================

const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const fields = [
      ["Nama", "nama"],
      ["Email", "email"],
      ["No. WA", "whatsapp"],
      ["Tanggal", "tanggal"],
      ["Waktu", "waktu"],
      ["Topik", "topik"],
      ["Kategori", "kategori"],
      ["Pesan", "pesan"]
    ];

    const result = fields.map(([label, key]) => {
      const value = data.get(key);
      const cleanValue =
        typeof value === "string" ? value.trim() : "";

      return `${label}: ${cleanValue || "-"}`;
    });

    preview.textContent = result.join("\n");
    preview.setAttribute("tabindex", "-1");
    preview.focus();
  });
}
