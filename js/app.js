// ===== Data & helper dari P10 =====
const produkUmkm = [
  { id: 1, nama: "Kopi Arabika Gayo 250g", kategori: "Kopi", harga: 85000, stok: 24 },
  { id: 2, nama: "Kopi Robusta Temanggung 250g", kategori: "Kopi", harga: 55000, stok: 4 },
  { id: 3, nama: "Paket Hampers Pagi", kategori: "Bundling", harga: 150000, stok: 10 },
  { id: 4, nama: "Paket Coba 3 Rasa", kategori: "Bundling", harga: 120000, stok: 0 },
  { id: 5, nama: "French Press 350ml", kategori: "Aksesori", harga: 135000, stok: 7 },
  { id: 6, nama: "Gelas Keramik Nusa", kategori: "Aksesori", harga: 45000, stok: 30 }
];

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

function statusStok(stok) {
  if (stok === 0) return { label: "Stok habis", className: "is-empty" };
  if (stok <= 5) return { label: `Stok menipis (${stok})`, className: "is-low" };
  return { label: `Stok tersedia (${stok})`, className: "" };
}

// ===== Langkah 4: DOM selection =====
const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

// ===== Langkah 5: pembuat elemen =====
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  // Langkah 8: tombol sembunyikan (latihan remove)
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");
  removeButton.addEventListener("click", () => {
    card.remove();
    const sisa = produkGrid.querySelectorAll(".product-card").length;
    if (sisa === 0) {
      produkGrid.append(buatEmptyState("ini (semua kartu disembunyikan)"));
    }
    produkStatus.textContent = `${sisa} produk tampil. Kartu disembunyikan hanya dari tampilan; data asli tidak berubah.`;
  });

  card.append(title, category, price, stock, removeButton);
  return card;
}

// ===== Langkah 6: empty state & render =====
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

// ===== Langkah 7: event listener & classList =====
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

// Debug cepat (E04): target tidak boleh null
console.log("produkGrid:", produkGrid);
console.log("jumlah tombol filter:", tombolFilter.length);

renderProduk();
