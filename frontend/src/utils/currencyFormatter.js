/**
 * Fungsi untuk memformat angka menjadi format rupiah
 * @param {number} amount - Jumlah uang dalam angka (dalam USD)
 * @param {number} exchangeRate - Kurs tukar (default: 15000)
 * @returns {string} - Format rupiah (Rp 1.000.000)
 */
export const formatRupiah = (amount, exchangeRate = 15000) => {
  // Konversi dari dolar ke rupiah (default 1 USD = 15000 IDR)
  const rupiahAmount = amount * exchangeRate;
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(rupiahAmount);
};

/**
 * Fungsi untuk mengonversi harga dari dolar ke rupiah
 * @param {number} dollarAmount - Jumlah dalam dolar
 * @param {number} exchangeRate - Kurs tukar (default: 15000)
 * @returns {string} - Format harga dalam rupiah
 */
export const convertToRupiah = (dollarAmount, exchangeRate = 15000) => {
  return formatRupiah(dollarAmount, exchangeRate);
};

/**
 * Fungsi untuk mendapatkan nilai rupiah tanpa format mata uang
 * @param {number} dollarAmount - Jumlah dalam dolar
 * @param {number} exchangeRate - Kurs tukar (default: 15000)
 * @returns {number} - Jumlah dalam rupiah
 */
export const getRupiahValue = (dollarAmount, exchangeRate = 15000) => {
  return dollarAmount * exchangeRate;
};

/**
 * Fungsi untuk mengonversi dari rupiah ke dolar
 * @param {number} rupiahAmount - Jumlah dalam rupiah
 * @param {number} exchangeRate - Kurs tukar (default: 15000)
 * @returns {number} - Jumlah dalam dolar
 */
export const convertFromRupiah = (rupiahAmount, exchangeRate = 15000) => {
  return rupiahAmount / exchangeRate;
};

/**
 * Fungsi untuk memeriksa apakah harga di bawah nilai tertentu
 * @param {number} dollarAmount - Jumlah dalam dolar
 * @param {number} threshold - Batas harga (default: 50 untuk $50)
 * @returns {boolean} - Apakah harga di bawah batas
 */
export const isUnderPrice = (dollarAmount, threshold = 50) => {
  return dollarAmount < threshold;
};

/**
 * Fungsi untuk mendapatkan semua produk di bawah harga tertentu
 * @param {Array} products - Array produk
 * @param {number} threshold - Batas harga (default: 50 untuk $50)
 * @returns {Array} - Produk-produk di bawah batas harga
 */
export const getProductsUnderPrice = (products, threshold = 50) => {
  return products.filter(product => product.price < threshold);
};