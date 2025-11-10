// Knowledge base untuk AI Assistant Earthen Collective - Versi Diperluas
const knowledgeBase = {
  business: {
    name: "Earthen Collective",
    tagline: "Handcrafted Pottery for the Modern Soul",
    description: "Sebuah brand yang berfokus pada produk pot dan gerabah handmade yang dibuat dengan penuh cinta dan perhatian terhadap detail.",
    philosophy: "In a world of mass production, we celebrate the slow, intentional, and imperfect beauty of handcrafted goods. Earthen Collective was born from a desire to connect people with functional art that carries a human touch. We believe the objects we bring into our homes should have a soul and a story.",
    mission: "Menghadirkan produk-produk yang tidak hanya cantik secara visual, tetapi juga bermakna secara emosional bagi penggunanya.",
    vision: "Menjadi jembatan antara seni tradisional gerabah dan kehidupan modern, membangun komunitas yang menghargai keindahan handmade.",
    values: [
      "Authenticity: Every piece is genuinely handmade, carrying the unique signature of its maker.",
      "Craftsmanship: We honor the skill and dedication that goes into traditional pottery, ensuring every item is of the highest quality.",
      "Community: We are committed to fostering a supportive network for our artisans, helping them thrive through their craft.",
      "Sustainability: We care for the environment by using natural materials and eco-friendly production methods.",
      "Innovation: Combining traditional techniques with a modern touch to create products relevant to contemporary life."
    ],
    story: "It began in 2024 with a simple observation: the most cherished items are those with a story. We started by visiting small, local studios, discovering incredible talent hidden in plain sight. What started as a small online gallery quickly grew into a vibrant collective, a space where the timeless art of pottery meets the modern connoisseur.",
    location: "Minahasa, Sulawesi Utara, Indonesia (penjualan online)",
    studioLocation: "Minahasa, Sulawesi Utara, Indonesia (By Appointment)",
    yearEstablished: "2024",
    socials: {
      instagram: "#",
      pinterest: "#",
      facebook: "#"
    }
  },
  products: {
    overview: "Earthen Collective menawarkan koleksi produk gerabah handmade yang unik dan berkualitas tinggi. Setiap produk adalah karya seni fungsional yang dibuat dengan penuh kasih dan perhatian terhadap detail.",
    types: [
      {
        name: "Pot Kecil",
        description: "Ukuran ideal untuk tanaman succulent, kaktus, dan tanaman kecil lainnya. Cocok untuk meja kerja, rak dapur, atau dekorasi ruang tamu kecil.",
        priceRange: "Rp 25.000 - Rp 75.000",
        popularModels: ["Mini Round Pot", "Square Succulent Planter", "Tiny Terracotta"]
      },
      {
        name: "Pot Medium",
        description: "Ukuran sedang untuk tanaman hias indoor seperti monstera, pothos, dan peace lily. Cocok untuk sudut ruangan atau sebagai centerpiece meja makan.",
        priceRange: "Rp 75.000 - Rp 150.000",
        popularModels: ["Classic Cylinder Planter", "Bohemian Oval Pot", "Modern Geometric Vase"]
      },
      {
        name: "Pot Besar",
        description: "Ukuran besar untuk tanaman besar outdoor seperti palem, ficus, atau olive tree. Cocok untuk teras, taman, atau area outdoor yang luas.",
        priceRange: "Rp 150.000 - Rp 300.000",
        popularModels: ["Grand Garden Urn", "Large Floor Planter", "Oversized Terracotta Pot"]
      },
      {
        name: "Planter Hias",
        description: "Produk dekoratif yang dirancang khusus untuk mempercantik ruang hidup Anda. Tidak hanya berfungsi sebagai pot, tetapi juga sebagai elemen dekorasi yang menarik.",
        priceRange: "Rp 100.000 - Rp 250.000",
        popularModels: ["Decorative Wall Planter", "Hanging Macrame Pot", "Statement Centerpiece Vase"]
      },
      {
        name: "Peralatan Makan dari Gerabah",
        description: "Set peralatan makan handmade yang menggabungkan keindahan estetika dengan fungsi praktis. Termasuk mangkuk, piring, cangkir, dan peralatan makan lainnya.",
        priceRange: "Rp 50.000 - Rp 200.000 per set",
        popularModels: ["Rustic Dinner Set", "Artisan Coffee Mug Collection", "Handcrafted Bowl Series"]
      }
    ],
    materials: {
      description: "Terbuat dari tanah liat pilihan dengan proses pembakaran khusus untuk kekuatan dan keindahan yang tahan lama.",
      types: [
        "Tanah Liat Merah: Material dasar utama kami yang kaya mineral dan memberikan karakteristik warna alami yang hangat.",
        "Tanah Liat Putih: Digunakan untuk produk premium yang membutuhkan tekstur halus dan warna netral.",
        "Glaze Khusus: Formula proprietary kami yang memberikan kilau indah dan perlindungan ekstra terhadap cuaca."
      ]
    },
    features: [
      "Dibuat secara handmade oleh seniman lokal",
      "Desain unik yang tidak akan ditemukan di tempat lain",
      "Kualitas terbaik dengan perhatian terhadap detail",
      "Ramah lingkungan dan dapat digunakan dalam jangka panjang",
      "Tahan terhadap cuaca dan variasi suhu",
      "Meningkatkan drainase tanah untuk kesehatan tanaman yang optimal",
      "Memberikan estetika alami yang melengkapi berbagai gaya interior"
    ],
    careInstructions: [
      "Hindari perubahan suhu mendadak yang ekstrem",
      "Bersihkan dengan kain lembut dan air biasa",
      "Gunakan sabun ringan untuk noda membandel",
      "Jangan rendam dalam air dalam waktu lama",
      "Simpan di tempat teduh saat tidak digunakan untuk mencegah retak"
    ]
  },
  artists: {
    introduction: "Earthen Collective bekerja sama dengan komunitas seniman lokal yang berbakat di Minahasa, Sulawesi Utara. Setiap seniman memiliki keahlian dan gaya unik yang tercermin dalam karya mereka.",
    profiles: [
      {
        name: "Marthen Roring",
        expertise: "Spesialis dalam teknik pembakaran tradisional dan desain geometris",
        background: "Telah membuat gerabah selama lebih dari 20 tahun, mewarisi teknik dari kakeknya",
        notableWorks: ["Geometric Planter Series", "Terracotta Sculpture Collection"]
      },
      {
        name: "Grace Pontoh",
        expertise: "Ahli dalam glazing dan teknik pewarnaan alami",
        background: "Lulusan seni keramik dari Institut Seni Indonesia Yogyakarta, kembali ke Minahasa untuk melestarikan seni tradisional",
        notableWorks: ["Rainbow Glaze Collection", "Natural Dye Pot Series"]
      },
      {
        name: "Ferdinand Lumenta",
        expertise: "Spesialis dalam ukuran besar dan bentuk kompleks",
        background: "Menggabungkan teknik tradisional dengan inovasi modern untuk menciptakan bentuk yang belum pernah ada sebelumnya",
        notableWorks: ["Large Garden Urns", "Abstract Sculptural Planters"]
      }
    ]
  },
  services: {
    customization: {
      description: "Kami menawarkan layanan kustomisasi untuk memenuhi kebutuhan spesifik Anda.",
      options: [
        "Warna dan glaze khusus",
        "Ukuran sesuai permintaan",
        "Desain pribadi dengan ukiran atau stensil",
        "Set koleksi untuk kebutuhan komersial"
      ],
      process: "Hubungi kami dengan ide Anda, kami akan memberikan konsultasi gratis dan estimasi harga",
      timeline: "Produk kustom membutuhkan waktu 7-14 hari kerja tergantung kompleksitas"
    },
    shipping: {
      policy: "Gratis ongkir untuk pembelian di atas Rp150.000",
      international: "Tersedia pengiriman internasional dengan biaya tambahan",
      deliveryTime: "3-5 hari kerja untuk wilayah Pulau Jawa, 5-7 hari kerja untuk luar Jawa",
      tracking: "Setiap pesanan dilengkapi dengan nomor pelacakan",
      packaging: "Produk dikemas dengan hati-hati menggunakan bahan ramah lingkungan untuk mencegah kerusakan selama pengiriman"
    },
    return: {
      policy: "Kami menerima pengembalian barang dalam waktu 7 hari setelah diterima jika produk mengalami kerusakan",
      conditions: [
        "Produk harus dalam kondisi belum digunakan dan dalam kemasan asli",
        "Bukti pembelian diperlukan untuk klaim pengembalian",
        "Biaya pengiriman pengembalian ditanggung oleh pelanggan kecuali untuk produk cacat produksi"
      ],
      process: "Kirimkan foto kerusakan dan email ke ebusinessebusinesskelompok24@gmail.com untuk instruksi pengembalian",
      timeframe: "Pengembalian dana diproses dalam waktu 5-10 hari kerja setelah menerima barang kembali"
    },
    customerSupport: {
      contactEmail: "ebusinessebusinesskelompok24@gmail.com",
      whatsapp: "+62 812-3456-7890",
      responseTime: "Balasan dalam waktu 24 jam",
      supportHours: "Senin-Jumat 09:00-17:00 WIB, Sabtu 10:00-15:00 WIB",
      liveChat: "Tersedia di website kami setiap hari kerja pukul 09:00-17:00 WIB"
    },
    installation: {
      description: "Untuk pesanan komersial atau koleksi besar, kami menyediakan layanan instalasi profesional",
      services: [
        "Penempatan produk di lokasi",
        "Konsultasi penataan ruang",
        "Perawatan awal untuk produk baru"
      ]
    }
  },
  faq: [
    {
      question: "Berapa lama waktu pembuatan produk custom?",
      answer: "Produk custom biasanya membutuhkan waktu 7-14 hari kerja setelah konfirmasi desain. Untuk pesanan besar atau kompleks, waktu produksi mungkin lebih lama. Kami akan memberikan estimasi waktu yang tepat setelah berkonsultasi dengan Anda."
    },
    {
      question: "Apakah produk tahan lama?",
      answer: "Ya, semua produk kami dibuat dengan teknik pembakaran profesional pada suhu tinggi yang membuatnya tahan lama dan kuat untuk penggunaan sehari-hari. Produk kami juga tahan terhadap cuaca dan variasi suhu, menjadikannya cocok untuk penggunaan indoor maupun outdoor."
    },
    {
      question: "Bagaimana cara merawat produk gerabah?",
      answer: "Perawatan produk gerabah kami sangat mudah: hindari perubahan suhu mendadak yang ekstrem, bersihkan dengan kain lembut dan air biasa, gunakan sabun ringan untuk noda membandel, jangan rendam dalam air dalam waktu lama, dan simpan di tempat teduh saat tidak digunakan untuk mencegah retak."
    },
    {
      question: "Apakah bisa pesan dalam jumlah besar?",
      answer: "Tentu! Kami menerima pesanan grosir dan khusus untuk kebutuhan komersial. Kami juga menawarkan harga khusus untuk pesanan volume tinggi. Silakan hubungi tim kami melalui email ebusinessebusinesskelompok24@gmail.com atau WhatsApp +62 812-3456-7890 untuk penawaran khusus dan konsultasi gratis."
    },
    {
      question: "Apakah produk Anda aman untuk tanaman?",
      answer: "Ya, semua produk kami dirancang khusus untuk kebutuhan tanaman. Mereka memiliki lubang drainase yang memadai untuk mencegah genangan air, terbuat dari bahan alami yang tidak beracun, dan poros untuk memungkinkan akar bernapas dengan baik. Bahan tanah liat kami juga membantu mengatur kelembaban tanah secara alami."
    },
    {
      question: "Bagaimana proses pembayaran dilakukan?",
      answer: "Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit/debit, dan dompet digital populer seperti OVO, GoPay, Dana, dan ShopeePay. Pembayaran dilakukan secara aman melalui gateway pembayaran terpercaya kami."
    },
    {
      question: "Apakah ada garansi produk?",
      answer: "Kami menjamin kualitas semua produk kami. Jika Anda menerima produk yang rusak atau cacat produksi, kami akan menggantinya tanpa biaya tambahan. Garansi berlaku selama 30 hari setelah tanggal pengiriman. Untuk klaim garansi, silakan hubungi ebusinessebusinesskelompok24@gmail.com dengan foto produk dan nomor pesanan."
    }
  ],
  promotions: {
    current: [
      "Gratis ongkir untuk pembelian di atas Rp150.000",
      "Diskon 10% untuk pembelian 3 produk atau lebih",
      "Cashback 5% untuk pelanggan setia",
      "Program referral: Dapatkan Rp50.000 untuk setiap teman yang berhasil melakukan pembelian pertama melalui referral Anda"
    ],
    seasonal: "Kami juga memiliki promosi spesial saat perayaan penting seperti Lebaran, Natal, dan Tahun Baru",
    loyalty: "Program keanggotaan premium dengan keuntungan eksklusif seperti akses awal ke koleksi baru, diskon khusus anggota, dan hadiah ulang tahun"
  },
  sustainability: {
    mission: "Komitmen kami terhadap keberlanjutan adalah inti dari setiap aspek bisnis kami.",
    practices: [
      "Menggunakan bahan baku lokal yang dapat diperbaharui",
      "Menerapkan teknik produksi hemat energi",
      "Mendaur ulang limbah produksi menjadi material baru",
      "Mengemas produk dengan bahan ramah lingkungan",
      "Mendukung komunitas seniman lokal untuk pelestarian budaya"
    ],
    impact: "Sejak didirikan, kami telah mencegah 500kg limbah plastik dengan kemasan ramah lingkungan dan mendukung mata pencaharian 15 seniman lokal di Minahasa, Sulawesi Utara."
  },
  testimonials: [
    {
      question: "Apa yang dikatakan pelanggan kami?",
      quotes: [
        {
          text: "Pot dari Earthen Collective benar-benar mengubah tampilan ruang tamu saya. Tidak hanya cantik, tapi juga sangat tahan lama. Tanaman saya tumbuh lebih subur!",
          author: "Sari W., Jakarta"
        },
        {
          text: "Pelayanan pelanggan luar biasa! Mereka membantu saya menyesuaikan pot untuk kebutuhan spesifik tanaman saya. Hasilnya melebihi ekspektasi!",
          author: "Budi K., Bandung"
        },
        {
          text: "Sebagai kafe, kami memesan 20 pot besar untuk dekorasi outdoor kami. Kualitas produk luar biasa dan tahan terhadap cuaca. Sangat merekomendasikan!",
          author: "Maya T., Bali"
        }
      ]
    }
  ]
};

// Fungsi untuk mencari informasi relevan dari knowledge base
export const findRelevantInformation = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Cari di business info
  Object.keys(knowledgeBase.business).forEach(key => {
    const value = knowledgeBase.business[key];
    if (typeof value === 'string' && value.toLowerCase().includes(lowerQuery)) {
      results.push({ category: 'Business Info', content: `${key}: ${value}` });
    } else if (Array.isArray(value)) {
      value.forEach(item => {
        if (item.toLowerCase().includes(lowerQuery)) {
          results.push({ category: 'Business Info', content: `${key}: ${item}` });
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      Object.keys(value).forEach(subKey => {
        const subValue = value[subKey];
        if (typeof subValue === 'string' && subValue.toLowerCase().includes(lowerQuery)) {
          results.push({ category: 'Business Info', content: `${key} - ${subKey}: ${subValue}` });
        }
      });
    }
  });

  // Cari di products info
  if (knowledgeBase.products.types && Array.isArray(knowledgeBase.products.types)) {
    knowledgeBase.products.types.forEach(type => {
      if (typeof type === 'object') {
        if (type.name.toLowerCase().includes(lowerQuery) || type.description.toLowerCase().includes(lowerQuery)) {
          results.push({ category: 'Product Info', content: `Jenis Produk: ${type.name} - ${type.description} (Harga: ${type.priceRange})` });
        }
      } else if (type.toLowerCase().includes(lowerQuery)) {
        results.push({ category: 'Product Info', content: `Jenis Produk: ${type}` });
      }
    });
  }

  // Cari di artists info
  if (knowledgeBase.artists.profiles && Array.isArray(knowledgeBase.artists.profiles)) {
    knowledgeBase.artists.profiles.forEach(artist => {
      if (artist.name.toLowerCase().includes(lowerQuery) || 
          artist.expertise.toLowerCase().includes(lowerQuery) || 
          artist.background.toLowerCase().includes(lowerQuery)) {
        results.push({ category: 'Artist Info', content: `Seniman: ${artist.name} - Spesialisasi: ${artist.expertise}. ${artist.background}` });
      }
    });
  }

  // Cari di services info
  Object.keys(knowledgeBase.services).forEach(serviceKey => {
    const service = knowledgeBase.services[serviceKey];
    if (typeof service === 'object' && service !== null) {
      Object.keys(service).forEach(key => {
        const value = service[key];
        if (typeof value === 'string' && value.toLowerCase().includes(lowerQuery)) {
          results.push({ category: 'Service Info', content: `${serviceKey} - ${key}: ${value}` });
        } else if (Array.isArray(value)) {
          value.forEach(item => {
            if (item.toLowerCase().includes(lowerQuery)) {
              results.push({ category: 'Service Info', content: `${serviceKey} - ${key}: ${item}` });
            }
          });
        }
      });
    }
  });

  // Cari di FAQ
  knowledgeBase.faq.forEach(faq => {
    if (faq.question.toLowerCase().includes(lowerQuery) || faq.answer.toLowerCase().includes(lowerQuery)) {
      results.push({ category: 'FAQ', content: `Q: ${faq.question}\nA: ${faq.answer}` });
    }
  });

  // Cari di sustainability
  if (knowledgeBase.sustainability.practices && Array.isArray(knowledgeBase.sustainability.practices)) {
    knowledgeBase.sustainability.practices.forEach(practice => {
      if (practice.toLowerCase().includes(lowerQuery)) {
        results.push({ category: 'Sustainability', content: `Praktik Keberlanjutan: ${practice}` });
      }
    });
  }

  return results;
};

export default knowledgeBase;