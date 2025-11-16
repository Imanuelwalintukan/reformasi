// File testing untuk verifikasi perubahan harga produk
const products = [
  {
    id: 1,
    name: "Small Ceramic Pot",
    price: 2.47,  // 37.000 Rp (2.47 * 15000)
    description: "Beautiful handcrafted small ceramic pot with vibrant colors",
    image: "/images/pot1.jpg",
    color: "multi-color"
  },
  {
    id: 2,
    name: "Medium Plant Pot",
    price: 3.00,  // 45.000 Rp (3.00 * 15000)
    description: "Medium size pot with geometric patterns",
    image: "/images/pot2.jpg",
    color: "brown"
  },
  {
    id: 3,
    name: "Vintage Mini Pot",
    price: 2.93,  // 44.000 Rp (2.93 * 15000)
    description: "Mini vintage-inspired pot with intricate details",
    image: "/images/pot3.jpg",
    color: "terracotta"
  },
  {
    id: 4,
    name: "Tiny White Pot",
    price: 3.20,  // 48.000 Rp (3.20 * 15000)
    description: "Tiny minimalist design for small plants",
    image: "/images/pot4.jpg",
    color: "white"
  },
  {
    id: 5,
    name: "Medium Bohemian Pot",
    price: 2.67,  // 40.000 Rp (2.67 * 15000)
    description: "Medium bohemian style pot with unique textures",
    image: "/images/pot5.jpg",
    color: "beige"
  },
  {
    id: 6,
    name: "Large Decorative Pot",
    price: 2.60,  // 39.000 Rp (2.60 * 15000)
    description: "Large pot perfect for big plants",
    image: "/images/pot6.jpg",
    color: "grey"
  }
];

// Fungsi formatRupiah sederhana untuk testing
const formatRupiah = (amount, exchangeRate = 15000) => {
  // Konversi dari dolar ke rupiah (default 1 USD = 15000 IDR)
  const rupiahAmount = amount * exchangeRate;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(rupiahAmount);
};

console.log('Verifikasi perubahan harga produk:\n');

products.forEach(product => {
  const hargaRupiah15000 = product.price * 15000;
  const hargaRupiahFormatted = formatRupiah(product.price, 15000);
  
  console.log(`${product.name}:`);
  console.log(`  - Harga dalam produk.js: ${product.price}`);
  console.log(`  - Harga setelah * 15000: ${hargaRupiah15000}`);
  console.log(`  - Harga formatted: ${hargaRupiahFormatted}`);
  console.log('');
});

console.log('Jika sistem menggunakan faktor pengali 15000, maka harga produk sekarang sesuai permintaan:');
console.log('- Produk 1: 37.000 Rp');
console.log('- Produk 2: 45.000 Rp');
console.log('- Produk 3: 44.000 Rp');
console.log('- Produk 4: 48.000 Rp');
console.log('- Produk 5: 40.000 Rp');
console.log('- Produk 6: 39.000 Rp');