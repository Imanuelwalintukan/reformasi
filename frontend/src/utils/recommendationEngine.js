// Algoritma rekomendasi produk yang lebih canggih
import products from '../products';
import knowledgeBase, { findRelevantInformation } from './knowledgeBase';

// Fungsi untuk merekomendasikan produk berdasarkan beberapa kriteria
export const getAdvancedRecommendations = (userPreferences) => {
  let filteredProducts = [...products];
  
  // Filter berdasarkan harga
  if (userPreferences.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= userPreferences.minPrice);
  }
  
  if (userPreferences.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= userPreferences.maxPrice);
  }

  // Filter berdasarkan warna
  if (userPreferences.color) {
    filteredProducts = filteredProducts.filter(p => p.color.toLowerCase() === userPreferences.color.toLowerCase());
  }
  
  // Filter berdasarkan ukuran (jika disebutkan dalam nama)
  if (userPreferences.size) {
    if (userPreferences.size === 'kecil' || userPreferences.size === 'small' || userPreferences.size === 'mini' || userPreferences.size === 'tiny') {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes('small') || 
                                         p.name.toLowerCase().includes('mini') || 
                                         p.name.toLowerCase().includes('tiny') ||
                                         p.price <= 3);
    } else if (userPreferences.size === 'sedang' || userPreferences.size === 'medium' || userPreferences.size === 'tengah') {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes('medium') || 
                                         (p.price > 3 && p.price <= 5));
    } else if (userPreferences.size === 'besar' || userPreferences.size === 'large' || userPreferences.size === 'jumbo') {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes('large') || 
                                         p.price > 5);
    }
  }
  
  // Filter berdasarkan fungsi (tanaman, dekorasi, dll)
  if (userPreferences.purpose) {
    if (userPreferences.purpose === 'tanaman' || userPreferences.purpose === 'plant' || userPreferences.purpose === 'kaktus' || userPreferences.purpose === 'succulent') {
      filteredProducts = filteredProducts.filter(p => p.description.toLowerCase().includes('plant') || 
                                         p.description.toLowerCase().includes('small') ||
                                         p.description.toLowerCase().includes('kaktus') ||
                                         p.description.toLowerCase().includes('succulent'));
    } else if (userPreferences.purpose === 'dekorasi' || userPreferences.purpose === 'hias' || userPreferences.purpose === 'indoor') {
      filteredProducts = filteredProducts.filter(p => p.description.toLowerCase().includes('decorative') || 
                                         p.description.toLowerCase().includes('hias') ||
                                         p.description.toLowerCase().includes('indoor'));
    }
  }
  
  // Filter berdasarkan jenis tanaman
  if (userPreferences.plantType) {
    if (userPreferences.plantType === 'succulent' || userPreferences.plantType === 'kaktus') {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes('small') || 
                                         p.name.toLowerCase().includes('mini') || 
                                         p.name.toLowerCase().includes('tiny') ||
                                         p.price <= 3);
    }
  }
  
  // Urutkan berdasarkan relevansi jika disediakan
  if (userPreferences.sortBy === 'harga-tertinggi') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (userPreferences.sortBy === 'harga-terendah') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (userPreferences.sortBy === 'nama') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (userPreferences.sortBy === 'popularitas') {
    // Untuk sementara, urutkan berdasarkan harga (sebagai proxy untuk popularitas)
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  return filteredProducts;
};

// Fungsi untuk mengekstrak preferensi pengguna dari pesan teks
export const extractUserPreferences = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  const preferences = {};

  // Ekstrak warna
  const colors = ["multi-color", "brown", "terracotta", "white", "beige", "grey", "red", "blue", "green", "yellow", "black"];
  for (const color of colors) {
    if (lowerMessage.includes(color)) {
      preferences.color = color;
      break;
    }
  }
  
  // Ekstrak harga
  const priceRegex = /(\d+(?:\.\d{3})*(?:,\d{2})?|rp?\s*\d+(?:\.\d{3})*(?:,\d{2})?)/gi;
  const priceMatches = userMessage.match(priceRegex);
  if (priceMatches) {
    // Ambil harga numerik dari teks
    const numericPrices = priceMatches.map(match => {
      const num = parseFloat(match.replace(/[Rp\s.]/gi, '').replace(',', '.'));
      return num;
    }).filter(num => !isNaN(num));
    
    if (numericPrices.length > 0) {
      // Jika pengguna menyebutkan "dibawah X" atau "dibawah Rp X"
      if (lowerMessage.includes('dibawah') || lowerMessage.includes('kurang dari') || lowerMessage.includes('maksimal') || lowerMessage.includes('max')) {
        preferences.maxPrice = Math.max(...numericPrices) / 15000;
      } 
      // Jika pengguna menyebutkan "diatas X" atau "lebih dari Rp X"
      else if (lowerMessage.includes('diatas') || lowerMessage.includes('lebih dari') || lowerMessage.includes('minimal') || lowerMessage.includes('min')) {
        preferences.minPrice = Math.min(...numericPrices) / 15000;
      }
    }
  }
  
  // Ekstrak ukuran
  if (lowerMessage.includes('kecil') || lowerMessage.includes('mini') || lowerMessage.includes('mungil') || lowerMessage.includes('small') || lowerMessage.includes('tiny')) {
    preferences.size = 'kecil';
  } else if (lowerMessage.includes('sedang') || lowerMessage.includes('medium') || lowerMessage.includes('tengah')) {
    preferences.size = 'sedang';
  } else if (lowerMessage.includes('besar') || lowerMessage.includes('large') || lowerMessage.includes('jumbo') || lowerMessage.includes('giant')) {
    preferences.size = 'besar';
  }
  
  // Ekstrak kegunaan
  if (lowerMessage.includes('tanaman') || lowerMessage.includes('plant')) {
    preferences.purpose = 'tanaman';
  } else if (lowerMessage.includes('dekorasi') || lowerMessage.includes('hias') || lowerMessage.includes('dalam ruangan') || lowerMessage.includes('indoor') || lowerMessage.includes('ornamental')) {
    preferences.purpose = 'dekorasi';
  }
  
  // Ekstrak jenis tanaman spesifik
  if (lowerMessage.includes('kaktus') || lowerMessage.includes('cactus') || lowerMessage.includes('succulent')) {
    preferences.plantType = 'succulent';
    preferences.size = 'kecil'; // Secara default, kaktus/succulent menggunakan pot kecil
  } else if (lowerMessage.includes('monstera') || lowerMessage.includes('pothos') || lowerMessage.includes('peace lily')) {
    preferences.plantType = 'indoor';
    preferences.size = 'sedang'; // Tanaman indoor sedang biasanya membutuhkan pot sedang
  }
  
  // Ekstrak pengurutan
  if (lowerMessage.includes('termahal') || lowerMessage.includes('paling mahal') || lowerMessage.includes('harga tertinggi') || lowerMessage.includes('mahal')) {
    preferences.sortBy = 'harga-tertinggi';
  } else if (lowerMessage.includes('termurah') || lowerMessage.includes('paling murah') || lowerMessage.includes('harga terendah') || lowerMessage.includes('murah')) {
    preferences.sortBy = 'harga-terendah';
  } else if (lowerMessage.includes('urutkan') || lowerMessage.includes('berdasarkan nama') || lowerMessage.includes('alphabetical')) {
    preferences.sortBy = 'nama';
  } else if (lowerMessage.includes('populer') || lowerMessage.includes('best seller') || lowerMessage.includes('terlaris')) {
    preferences.sortBy = 'popularitas';
  }
  
  // Ekstrak permintaan untuk semua produk
  if (lowerMessage.includes('semua') && (lowerMessage.includes('produk') || lowerMessage.includes('item'))) {
    preferences.allProducts = true;
  }
  
  // Ekstrak permintaan untuk produk termahal/termurah secara eksplisit
  if (lowerMessage.includes('produk termahal') || lowerMessage.includes('barang paling mahal')) {
    preferences.sortBy = 'harga-tertinggi';
    preferences.limit = 1; // Hanya ambil 1 produk
  } else if (lowerMessage.includes('produk termurah') || lowerMessage.includes('barang paling murah')) {
    preferences.sortBy = 'harga-terendah';
    preferences.limit = 1; // Hanya ambil 1 produk
  }
  
  return preferences;
};

// Fungsi untuk membuat deskripsi rekomendasi yang lebih kontekstual
export const generateRecommendationDescription = (products, preferences) => {
  if (products.length === 0) {
    return "Maaf, saya tidak menemukan produk yang sesuai dengan kriteria Anda. Silakan coba kriteria yang berbeda.";
  }
  
  let description = "";
  
  // Jika permintaan untuk satu produk spesifik (termahal/termurah)
  if (preferences.limit === 1) {
    const product = products[0];
    if (preferences.sortBy === 'harga-tertinggi') {
      description += `Produk termahal kami adalah:\n\n`;
    } else if (preferences.sortBy === 'harga-terendah') {
      description += `Produk termurah kami adalah:\n\n`;
    }
    
    const priceInRupiah = (product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    description += `**${product.name}** - Rp${priceInRupiah}\n`;
    description += `${product.description}\n\n`;
    description += "Apakah Anda tertarik dengan produk ini?";
    return description;
  }
  
  // Jika permintaan untuk semua produk
  if (preferences.allProducts) {
    description += "Berikut adalah semua produk yang tersedia di Earthen Collective:\n\n";
    products.forEach((product, index) => {
      const priceInRupiah = (product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      description += `${index + 1}. **${product.name}** - Rp${priceInRupiah}\n`;
      description += `   ${product.description}\n\n`;
    });
    return description;
  }
  
  // Deskripsi berdasarkan kriteria harga
  if (preferences.maxPrice !== undefined || preferences.minPrice !== undefined) {
    if (preferences.maxPrice !== undefined && preferences.minPrice !== undefined) {
      const minPriceFormatted = (preferences.minPrice * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const maxPriceFormatted = (preferences.maxPrice * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      description += `Berikut produk dengan harga antara Rp${minPriceFormatted} dan Rp${maxPriceFormatted}:\n\n`;
    } else if (preferences.maxPrice !== undefined) {
      const maxPriceFormatted = (preferences.maxPrice * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      description += `Berikut produk dengan harga maksimal Rp${maxPriceFormatted}:\n\n`;
    } else if (preferences.minPrice !== undefined) {
      const minPriceFormatted = (preferences.minPrice * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      description += `Berikut produk dengan harga minimal Rp${minPriceFormatted}:\n\n`;
    }
  } 
  // Deskripsi berdasarkan tujuan penggunaan
  else if (preferences.purpose === 'tanaman') {
    if (preferences.plantType === 'succulent') {
      description += "Berikut pot kecil yang cocok untuk kaktus dan tanaman succulent:\n\n";
    } else {
      description += "Berikut pot yang cocok untuk tanaman Anda:\n\n";
    }
  } else if (preferences.purpose === 'dekorasi') {
    description += "Berikut pot yang cocok untuk dekorasi ruangan Anda:\n\n";
  } 
  // Deskripsi berdasarkan ukuran
  else if (preferences.size === 'kecil') {
    description += "Berikut pot kecil yang tersedia:\n\n";
  } else if (preferences.size === 'sedang') {
    description += "Berikut pot sedang yang tersedia:\n\n";
  } else if (preferences.size === 'besar') {
    description += "Berikut pot besar yang tersedia:\n\n";
  }
  // Deskripsi default
  else {
    description += "Berikut produk yang mungkin Anda cari:\n\n";
  }
  
  // Batasi jumlah produk yang ditampilkan (maks 5 untuk UX yang baik)
  const displayLimit = Math.min(products.length, 5);
  
  products.slice(0, displayLimit).forEach((product, index) => {
    const priceInRupiah = (product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    description += `${index + 1}. **${product.name}** - Rp${priceInRupiah}\n`;
    description += `   ${product.description}\n\n`;
  });
  
  if (products.length > displayLimit) {
    description += `... dan ${products.length - displayLimit} produk lainnya. `;
    description += "Anda bisa bertanya 'tampilkan semua produk' untuk melihat daftar lengkapnya.\n\n";
  }
  
  // Tambahkan rekomendasi berdasarkan konteks
  if (preferences.purpose === 'tanaman' && preferences.plantType === 'succulent') {
    description += "💡 Tips: Pot kecil sangat cocok untuk kaktus dan succulent karena membutuhkan drainase yang baik dan tidak memerlukan banyak tanah.\n\n";
  }
  
  description += "Apakah Anda ingin informasi lebih detail tentang produk tertentu? Atau butuh rekomendasi lain?";
  
  return description;
};

// Fungsi untuk mendapatkan informasi tentang bisnis berdasarkan pertanyaan
export const getRecommendationsFromHistory = () => {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (searchHistory.length === 0) {
    return "Saya belum memiliki riwayat pencarian Anda. Coba tanyakan beberapa hal terlebih dahulu!";
  }

  const allPreferences = searchHistory.map(query => extractUserPreferences(query));
  const combinedPreferences = allPreferences.reduce((acc, prefs) => {
    return { ...acc, ...prefs };
  }, {});

  const recommendedProducts = getAdvancedRecommendations(combinedPreferences);
  if (recommendedProducts.length > 0) {
    return generateRecommendationDescription(recommendedProducts, combinedPreferences);
  }

  return "Berdasarkan riwayat pencarian Anda, saya tidak dapat menemukan produk yang cocok. Coba berikan saya lebih banyak petunjuk!";
};

export const getBusinessInfo = (query) => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('rekomendasi berdasarkan riwayat')) {
    return getRecommendationsFromHistory();
  }

  // Menangani pertanyaan tentang produk termahal atau termurah
  if (lowerQuery.includes('termahal') || lowerQuery.includes('paling mahal')) {
    const mostExpensiveProduct = products.reduce((max, p) => p.price > max.price ? p : max, products[0]);
    const priceInRupiah = (mostExpensiveProduct.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Produk termahal kami adalah ${mostExpensiveProduct.name} dengan harga Rp${priceInRupiah}. Ini adalah sebuah karya seni yang istimewa.`
  }

  if (lowerQuery.includes('termurah') || lowerQuery.includes('paling murah')) {
    const cheapestProduct = products.reduce((min, p) => p.price < min.price ? p : min, products[0]);
    const priceInRupiah = (cheapestProduct.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Produk termurah kami adalah ${cheapestProduct.name} dengan harga Rp${priceInRupiah}. Pilihan yang sangat terjangkau untuk memulai koleksi Anda.`
  }

  if (lowerQuery.includes('semua produk') || lowerQuery.includes('produk kami')) {
    let productList = 'Tentu, berikut adalah semua produk yang kami tawarkan:\n\n';
    products.forEach(p => {
      const priceInRupiah = (p.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      productList += `* ${p.name} - Rp${priceInRupiah}\n`;
    });
    return productList;
  }

  const relevantInfo = findRelevantInformation(query);
  
  if (relevantInfo.length === 0) {
    return null;
  }
  
  let response = "Berdasarkan pertanyaan Anda, berikut informasi tentang Earthen Collective:\n\n";
  
  // Kelompokkan informasi berdasarkan kategori
  const groupedInfo = {};
  relevantInfo.forEach(info => {
    if (!groupedInfo[info.category]) {
      groupedInfo[info.category] = [];
    }
    groupedInfo[info.category].push(info.content);
  });
  
  // Format respons dengan kategori
  Object.keys(groupedInfo).forEach(category => {
    response += `**${category}**:\n`;
    groupedInfo[category].forEach(content => {
      response += `- ${content}\n`;
    });
    response += "\n";
  });
  
  return response;
};