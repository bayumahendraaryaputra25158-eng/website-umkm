
// ========================================
// 1. DATA PRODUK UMKM
// ========================================

const produkUmkm = [
  {
    nama: "Kopi Gunung Lumping",
    kategori: "Rumahan",
    berat: 250,
    harga: 40000,
    stok: 5,
    unggulan: true
  },
  {
    nama: "Kopsu Gula Aren",
    kategori: "Rumahan",
    berat: 250,
    harga: 50000,
    stok: 0,
    unggulan: false
  },
  {
    nama: "Cappuccino",
    kategori: "Rumahan",
    berat: 250,
    harga: 22000,
    stok: 10,
    unggulan: false
  },
  {
    nama: "Latte Caramel",
    kategori: "Lapak",
    berat: null,
    harga: 25000,
    stok: 15,
    unggulan: true
  },
  {
    nama: "Red Velvet",
    kategori: "Lapak",
    berat: null,
    harga: 24000,
    stok: 5,
    unggulan: false
  },
  {
    nama: "Americano",
    kategori: "Lapak",
    berat: null,
    harga: 22000,
    stok: 5,
    unggulan: false
  }
];


// ========================================
// 2. FUNCTION FORMAT RUPIAH
// ========================================

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}


// ========================================
// 3. FUNCTION STATUS STOK
// ========================================

function statusStok(stok) {
  if (stok <= 0) {
    return {
      label: "Habis",
      className: "warning"
    };
  }

  if (stok <= 5) {
    return {
      label: "Stok terbatas",
      className: "warning"
    };
  }

  return {
    label: "Tersedia",
    className: ""
  };
}


// ========================================
// 4. FUNCTION LABEL KATEGORI
// ========================================

function labelKategori(kategori) {
  switch (kategori) {
    case "Lapak":
      return "Produk Lapak";

    case "Rumahan":
      return "Paket Hemat Rumahan";

    default:
      return "Produk UMKM";
  }
}


// ========================================
// 5. FUNCTION MEMBUAT KARTU PRODUK
// ========================================

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  const beratProduk = produk.berat
    ? `<p>Berat: ${produk.berat} gram</p>`
    : "";

  return `
    <article class="product-card js-product-card">

      ${
        produk.unggulan
          ? '<span class="featured-badge">Unggulan</span>'
          : ""
      }

      <h3>${produk.nama}</h3>

      <p class="category-note">
        ${labelKategori(produk.kategori)}
      </p>

      ${beratProduk}

      <p class="price">
        ${formatRupiah(produk.harga)}
      </p>

      <span class="stock-badge ${status.className}">
        ${status.label}
      </span>

      <div class="card-actions">
        <a class="button" href="kontak.html">
          Tanya Produk
        </a>
      </div>

    </article>
  `;
}


// ========================================
// 6. FOREACH UNTUK DEBUGGING
// ========================================

produkUmkm.forEach((produk) => {
  console.log(
    "Debug produk:",
    produk.nama,
    "stok:",
    produk.stok
  );
});

console.table(produkUmkm);


// ========================================
// 7. FUNCTION RENDER PRODUK
// ========================================

function renderProduk() {

  // Mengambil elemen HTML
  const grid = document.querySelector("#produk-dinamis");

  const ringkasan = document.querySelector(
    "#produk-ringkasan"
  );

  const unggulan = document.querySelector(
    "#produk-unggulan"
  );


  // Guard DOM
  if (!grid || !ringkasan || !unggulan) {
    return;
  }


  // FILTER: mengambil produk yang stoknya tersedia
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );


  // FIND: mencari produk unggulan pertama
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );


  // MAP: mengubah data produk menjadi HTML
  const markupProduk = produkTersedia
    .map(buatKartuProduk)
    .join("");


  // Menampilkan kartu produk
  grid.innerHTML = markupProduk;


  // Menampilkan ringkasan
  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;


  // Menampilkan produk unggulan
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";


  // Debugging
  console.log("Jumlah produk tersedia:", produkTersedia.length);

  console.log("Produk unggulan:", produkUnggulan);

  console.table(produkUmkm);
}


// ========================================
// 8. MENJALANKAN RENDER SETELAH DOM SIAP
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  renderProduk
);
