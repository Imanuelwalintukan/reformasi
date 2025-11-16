// Test sistem harga yang baru
console.log("TEST SISTEM HARGA BARU");
console.log("======================");

// Simulasi fungsi convertToRupiah
const convertToRupiah = (dollarAmount, exchangeRate = 15000) => {
  const rupiahAmount = dollarAmount * exchangeRate;
  
  // Simulasi format mata uang
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(rupiahAmount);
};

// Harga produk dalam dolar
const products = [
  { id: 1, name: "Small Ceramic Pot", price: 2.467 },  // 2.467 * 15000 = ~37.000
  { id: 2, name: "Medium Plant Pot", price: 3.000 },   // 3.000 * 15000 = 45.000
  { id: 3, name: "Vintage Mini Pot", price: 2.933 },   // 2.933 * 15000 = ~44.000
  { id: 4, name: "Tiny White Pot", price: 3.200 },     // 3.200 * 15000 = 48.000
  { id: 5, name: "Medium Bohemian Pot", price: 2.667 }, // 2.667 * 15000 = ~40.000
  { id: 6, name: "Large Decorative Pot", price: 2.600 } // 2.600 * 15000 = 39.000
];

console.log("Harga produk saat ditampilkan dengan convertToRupiah(product.price):");
products.forEach(p => {
  console.log(`${p.name}: ${convertToRupiah(p.price)} (dari price=${p.price} dolar)`);
});

console.log("\nHarga produk saat dikalikan langsung dengan 15000:");
products.forEach(p => {
  const directCalc = p.price * 15000;
  console.log(`${p.name}: Rp${directCalc.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} (dari price=${p.price} dolar)`);
});

console.log("\nPendekatan yang konsisten adalah:");
console.log("- Simpan product.price sebagai jumlah dalam dolar");
console.log("- Tampilkan harga dengan convertToRupiah(product.price) atau (product.price * 15000)");
console.log("- Kedua pendekatan menghasilkan nilai yang sama");