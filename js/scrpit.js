const promoButton = document.getElementById("promoButton");

if (promoButton) {
  promoButton.addEventListener("click", function () {
    promoButton.textContent = "Promo hari ini: Beli 2 Latte Caramel Gratis 1 Kopi Tubruk Lumping!";
  });
}

const rows = document.querySelectorAll("tbody tr");

if (rows.length > 0) {
  console.log("Jumlah produk pada tabel:", rows.length);
}

const caption = document.querySelector("caption");
if (caption) {
  console.log("Caption tabel:", caption.textContent);
}