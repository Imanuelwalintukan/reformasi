// Service untuk OpenAI API
// Ganti YOUR_API_KEY dengan API key Anda dari OpenAI

import knowledgeBase, { findRelevantInformation } from './knowledgeBase';
import products from '../products';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || ''; // Akan diisi dari .env

export const getAIResponse = async (messages) => {
  // Ambil pesan terakhir pengguna untuk analisis
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  
  // Cari informasi relevan dari knowledge base
  const relevantInfo = findRelevantInformation(lastUserMessage);
  
  // Jika tidak ada API key, gunakan fallback
  if (!OPENAI_API_KEY) {
    console.warn('OpenAI API key not found. Using fallback response.');
    return await getFallbackResponse(messages, relevantInfo);
  }

  try {
    // Buat sistem prompt dengan informasi kontekstual tambahan
    const systemPrompt = `Anda adalah asisten belanja produk pot dan gerabah untuk Earthen Collective. 
    Berikut informasi tentang bisnis kami:
    - Nama: ${knowledgeBase.business.name}
    - Tagline: ${knowledgeBase.business.tagline}
    - Deskripsi: ${knowledgeBase.business.description}
    - Filosofi: ${knowledgeBase.business.philosophy}
    - Misi: ${knowledgeBase.business.mission}
    - Visi: ${knowledgeBase.business.vision}
    - Nilai-nilai: ${knowledgeBase.business.values.join(', ')}
    - Cerita: ${knowledgeBase.business.story}
    - Lokasi: ${knowledgeBase.business.location}
    - Lokasi Studio: ${knowledgeBase.business.studioLocation}
    - Tahun Berdiri: ${knowledgeBase.business.yearEstablished}
    
    Produk-produk kami:
    ${products.map(p => `ID: ${p.id}, Nama: ${p.name}, Harga: Rp${(p.price * 15000).toFixed(0)}, Deskripsi: ${p.description}`).join('\n')}
    
    Informasi tambahan:
    - Jenis produk: ${knowledgeBase.products.overview}
    ${knowledgeBase.products.types.map(t => `-  ${t.name}: ${t.description} (${t.priceRange})`).join('\n')}
    - Bahan: ${knowledgeBase.products.materials.description}
    - Fitur: ${knowledgeBase.products.features.join(', ')}
    - Perawatan: ${knowledgeBase.products.careInstructions.join(', ')}
    
    Tentang Para Seniman:
    ${knowledgeBase.artists.profiles.map(a => `- ${a.name}: Spesialisasi ${a.expertise}. ${a.background}.`).join('\n')}
    
    Layanan Kustomisasi:
    ${knowledgeBase.services.customization.options.map(o => `- ${o}`).join('\n')}
    
    Kebijakan Pengiriman:
    - ${knowledgeBase.services.shipping.policy}
    - Waktu pengiriman: ${knowledgeBase.services.shipping.deliveryTime}
    - Internasional: ${knowledgeBase.services.shipping.international}
    
    Kebijakan Retur: 
    - ${knowledgeBase.services.return.policy}
    - Syarat: ${knowledgeBase.services.return.conditions.join(', ')}
    
    Layanan Pelanggan:
    - Email: ${knowledgeBase.services.customerSupport.contactEmail}
    - WhatsApp: ${knowledgeBase.services.customerSupport.whatsapp}
    - Jam Operasional: ${knowledgeBase.services.customerSupport.supportHours}
    
    Praktik Keberlanjutan:
    - ${knowledgeBase.sustainability.practices.join(', ')}
    
    FAQ:
    - ${knowledgeBase.faq.map(f => `Pertanyaan: ${f.question} Jawaban: ${f.answer}`).join(' | ')}
    
    Promosi Saat Ini:
    - ${knowledgeBase.promotions.current.join(' | ')}
    - Musiman: ${knowledgeBase.promotions.seasonal}
    
    Tugas Anda:
    1. Bantu pengguna menemukan produk yang sesuai dengan kebutuhan mereka
    2. Jawab pertanyaan tentang kebijakan, pengiriman, dan layanan pelanggan
    3. Berikan informasi tentang bisnis, seniman, dan filosofi kami jika diminta
    4. Gunakan informasi kontekstual yang relevan dari knowledge base jika tersedia
    5. Jawab dengan ramah dan profesional
    6. Jika pengguna mencari produk tertentu, rekomendasikan produk kami yang paling cocok
    7. Jika pengguna ingin melihat semua produk, berikan daftar produk dengan format yang rapi
    8. Jika pengguna ingin produk termahal/termurah/terbaru, tampilkan produk yang sesuai dengan permintaan
    9. Jika pengguna ingin informasi tentang seniman, berikan profil seniman yang relevan
    10. Jika pengguna ingin layanan kustomisasi, jelaskan proses dan opsi yang tersedia`;

    console.log(systemPrompt);

    // Buat ulang pesan dengan sistem prompt yang lebih kaya konteks
    const enhancedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(1) // Ambil pesan-pesan sebelumnya tanpa sistem prompt asli
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: enhancedMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Jika API gagal, gunakan fallback
    return await getFallbackResponse(messages, relevantInfo);
  }
};

// Fallback jika API tidak tersedia
const getFallbackResponse = async (messages, relevantInfo) => {
  if (relevantInfo === undefined) {
    relevantInfo = [];
  }
  const lastMessage = messages[messages.length - 1]?.content || '';
  
  // Tambahkan informasi relevan ke respons jika tersedia
  let additionalContext = '';
  if (relevantInfo.length > 0) {
    additionalContext = '\n\nInfo tambahan yang ditemukan: ';
    relevantInfo.forEach(info => {
      additionalContext += `\n- ${info.content}`;
    });
  }
  
  // Urutkan produk berdasarkan harga untuk kemudahan pemrosesan
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const mostExpensive = [...products].sort((a, b) => b.price - a.price)[0];
  const cheapest = sortedProducts[0];
  
  // Proses permintaan pengguna dan kembalikan rekomendasi produk berdasarkan produk yang tersedia
  const lowerInput = lastMessage.toLowerCase();
  let responseText = '';
  let matchedProducts = [];

  // Cek permintaan mencari semua produk
  if (lowerInput.includes('semua produk') || lowerInput.includes('tampilkan semua') || lowerInput.includes('lihat semua') || lowerInput.includes('produk apa saja')) {
    responseText = `Berikut semua produk yang tersedia di Earthen Collective:\n\n`;
    products.forEach((product, index) => {
      responseText += `${index + 1}. **${product.name}** - Rp${(product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
      responseText += `   ${product.description}\n\n`;
    });
  }
  // Cek permintaan produk termahal
  else if (lowerInput.includes('termahal') || lowerInput.includes('paling mahal') || lowerInput.includes('harga tertinggi')) {
    responseText = `Produk termahal kami adalah:\n\n`;
    responseText += `**${mostExpensive.name}** - Rp${(mostExpensive.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
    responseText += `${mostExpensive.description}\n\n`;
    responseText += "Apakah Anda tertarik dengan produk ini?";
  }
  // Cek permintaan produk termurah
  else if (lowerInput.includes('termurah') || lowerInput.includes('paling murah') || lowerInput.includes('harga terendah')) {
    responseText = `Produk termurah kami adalah:\n\n`;
    responseText += `**${cheapest.name}** - Rp${(cheapest.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
    responseText += `${cheapest.description}\n\n`;
    responseText += "Apakah Anda tertarik dengan produk ini?";
  }
  // Cek permintaan produk dengan kriteria tertentu
  else if (lowerInput.includes('kecil') || lowerInput.includes('mini') || lowerInput.includes('mungil') || lowerInput.includes('small') || lowerInput.includes('tiny')) {
    matchedProducts = products.filter(p => p.name.toLowerCase().includes('small') || 
                                       p.name.toLowerCase().includes('mini') || 
                                       p.name.toLowerCase().includes('tiny') ||
                                       p.price <= 3);
  } else if (lowerInput.includes('sedang') || lowerInput.includes('medium') || lowerInput.includes('tengah')) {
    matchedProducts = products.filter(p => p.name.toLowerCase().includes('medium') || 
                                       (p.price > 3 && p.price <= 5));
  } else if (lowerInput.includes('besar') || lowerInput.includes('large') || lowerInput.includes('jumbo')) {
    matchedProducts = products.filter(p => p.name.toLowerCase().includes('large') || 
                                       p.price > 5);
  } else if (lowerInput.includes('tanaman') || lowerInput.includes('plant') || lowerInput.includes('kaktus') || lowerInput.includes('succulent')) {
    matchedProducts = products.filter(p => p.description.toLowerCase().includes('plant') || 
                                       p.description.toLowerCase().includes('small'));
  } else if (lowerInput.includes('murah') || lowerInput.includes('budget') || lowerInput.includes('harga')) {
    matchedProducts = products.filter(p => p.price <= 3);
  } else {
    // Jika mencari informasi bisnis, layanan, atau FAQ
    const businessKeywords = ['pengiriman', 'ongkir', 'gratis', 'diskon', 'retur', 'pengembalian', 'garansi', 'layan', 'customer', 'toko', 'tentang', 'philosophy', 'nilai', 'kualitas', 'harga', 'promo', 'diskon', 'seniman', 'artist', 'keberlanjutan', 'sustainability', 'komunitas', 'community'];
    if (businessKeywords.some(keyword => lowerInput.includes(keyword))) {
      // Kembalikan informasi bisnis yang relevan
      responseText = `Tentang Earthen Collective:\n`;
      responseText += `- Deskripsi: ${knowledgeBase.business.description}\n`;
      responseText += `- Filosofi: ${knowledgeBase.business.philosophy}\n`;
      responseText += `- Nilai-nilai: ${knowledgeBase.business.values.join(', ')}\n\n`;
      
      if (lowerInput.includes('pengiriman') || lowerInput.includes('ongkir') || lowerInput.includes('gratis')) {
        responseText += `Kebijakan Pengiriman:\n`;
        responseText += `- ${knowledgeBase.services.shipping.policy}\n`;
        responseText += `- ${knowledgeBase.services.shipping.deliveryTime}\n`;
      }
      
      if (lowerInput.includes('retur') || lowerInput.includes('pengembalian') || lowerInput.includes('garansi')) {
        responseText += `Kebijakan Retur:\n`;
        responseText += `- ${knowledgeBase.services.return.policy}\n`;
      }
      
      if (lowerInput.includes('layan') || lowerInput.includes('customer') || lowerInput.includes('toko')) {
        responseText += `Layanan Pelanggan:\n`;
        responseText += `- Email: ${knowledgeBase.services.customerSupport.contactEmail}\n`;
        responseText += `- WhatsApp: ${knowledgeBase.services.customerSupport.whatsapp}\n`;
        responseText += `- Jam Operasional: ${knowledgeBase.services.customerSupport.supportHours}\n`;
      }
      
      if (lowerInput.includes('promo') || lowerInput.includes('diskon') || lowerInput.includes('harga')) {
        responseText += `Promosi Saat Ini:\n`;
        knowledgeBase.promotions.current.forEach(promo => {
          responseText += `- ${promo}\n`;
        });
      }
      
      if (lowerInput.includes('seniman') || lowerInput.includes('artist') || lowerInput.includes('komunitas') || lowerInput.includes('community')) {
        responseText += `Tentang Para Seniman:\n`;
        knowledgeBase.artists.profiles.forEach(artist => {
          responseText += `- ${artist.name}: Spesialisasi ${artist.expertise}. ${artist.background}\n`;
        });
      }
      
      if (lowerInput.includes('keberlanjutan') || lowerInput.includes('sustainability') || lowerInput.includes('lingkungan') || lowerInput.includes('environment')) {
        responseText += `Praktik Keberlanjutan:\n`;
        knowledgeBase.sustainability.practices.forEach(practice => {
          responseText += `- ${practice}\n`;
        });
      }
    } else {
      // Jika tidak ada kategori spesifik, kembalikan produk acak
      matchedProducts = [...products];
    }
  }

  // Hanya buat respons produk jika matchedProducts tidak kosong dan tidak ada responseText sebelumnya
  if (matchedProducts.length > 0 && !responseText) {
    responseText = `Saya menemukan beberapa produk yang mungkin cocok untuk Anda:\n\n`;
    
    matchedProducts.slice(0, 3).forEach((product, index) => {
      responseText += `${index + 1}. **${product.name}** - Rp${(product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
      responseText += `   ${product.description}\n\n`;
    });
    
    responseText += "Apakah ini yang Anda cari? Atau butuh rekomendasi lain?";
  } else if (!responseText) {
    responseText = `Saat ini saya tidak menemukan produk yang cocok dengan permintaan Anda. Namun, Anda bisa jelaskan lebih detail kebutuhan Anda, seperti ukuran, fungsi, atau anggaran yang Anda miliki, dan saya akan bantu temukan yang terbaik.`;
  }
  
  // Tambahkan informasi kontekstual jika ditemukan
  if (additionalContext) {
    responseText += additionalContext;
  }
  
  return responseText;
};