import React, { useState, useRef, useEffect } from 'react';
import { useCart } from './CartContext';
import { getAIResponse } from '../utils/openaiService';
import { extractUserPreferences, getAdvancedRecommendations, generateRecommendationDescription, getBusinessInfo } from '../utils/recommendationEngine';
import products from '../products';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! Saya asisten belanja Earthen Collective. Bagaimana saya bisa bantu Anda menemukan pot yang sempurna hari ini?", type: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { addToCart } = useCart();

  // Auto-scroll ke pesan terakhir
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Tambahkan pesan pengguna
    const userMessage = { 
      id: Date.now(), 
      text: inputValue, 
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Cek apakah pertanyaan berkaitan dengan informasi bisnis
      const businessInfo = getBusinessInfo(inputValue);
      if (businessInfo) {
        const botMessage = {
          id: Date.now(),
          text: businessInfo,
          type: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }
      
      // Ekstrak preferensi pengguna dari pesan
      const userPreferences = extractUserPreferences(inputValue);
      
      // Jika ada preferensi spesifik, gunakan engine rekomendasi
      if (Object.keys(userPreferences).length > 0) {
        const recommendedProducts = getAdvancedRecommendations(userPreferences);
        if (recommendedProducts.length > 0) {
          const recommendationText = generateRecommendationDescription(recommendedProducts, userPreferences);
          
          const botMessage = {
            id: Date.now(),
            text: recommendationText,
            type: 'bot',
            products: recommendedProducts
          };
          
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
          return;
        }
      }
      
      // Format pesan untuk dikirim ke AI
      const aiMessages = [
        { 
          role: 'system', 
          content: `Anda adalah asisten belanja produk pot dan gerabah untuk Earthen Collective. 
          Produk-produk kami:
          ${products.map(p => `ID: ${p.id}, Nama: ${p.name}, Harga: Rp${(p.price * 15000).toFixed(0)}, Deskripsi: ${p.description}`).join('\n')}
          
          Tugas Anda adalah membantu pengguna menemukan produk yang sesuai dengan kebutuhan mereka.
          Jika pengguna mencari produk tertentu, rekomendasikan produk-produk kami yang paling cocok.
          Format rekomendasi: "Saya merekomendasikan [produk 1], [produk 2], dll. Anda bisa menambahkan ke keranjang dengan mengeklik tombol 'Tambah ke Keranjang'."
          Jika diminta, jelaskan fitur dan manfaat dari produk-produk yang direkomendasikan.
          Jawab dengan ramah dan profesional.`
        },
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: inputValue }
      ];

      // Dapatkan respons dari AI
      const aiResponse = await getAIResponse(aiMessages);
      
      const botMessage = {
        id: Date.now(),
        text: aiResponse,
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now(),
        text: "Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi.",
        type: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mengekstrak produk dari teks respons AI
  const extractProductsFromResponse = (responseText) => {
    const foundProducts = [];
    
    // Cari nama produk dalam respons
    products.forEach(product => {
      if (responseText.toLowerCase().includes(product.name.toLowerCase())) {
        foundProducts.push(product);
      }
    });
    
    // Jika tidak ada produk yang ditemukan dari nama, coba cari berdasarkan harga
    if (foundProducts.length === 0) {
      // Cari harga dalam teks
      const hargaRegex = /Rp?(\d{1,3}(?:\.\d{3})*)/g;
      let match;
      while ((match = hargaRegex.exec(responseText)) !== null) {
        const harga = parseFloat(match[1].replace(/\./g, ''));
        const produkHarga = products.find(p => (p.price * 15000).toFixed(0) === harga.toString());
        if (produkHarga) {
          foundProducts.push(produkHarga);
        }
      }
    }
    
    return foundProducts;
  };

  // Fungsi untuk memformat teks agar menyorot produk yang bisa ditambahkan ke keranjang
  const formatMessageWithProducts = (message) => {
    // Gunakan produk dari pesan jika tersedia (dari recommendation engine)
    const messageProducts = message.products || extractProductsFromResponse(message.text);
    
    if (messageProducts && messageProducts.length > 0) {
      return (
        <div className="space-y-4">
          <p className="whitespace-pre-line font-medium">{message.text}</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {messageProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex items-center">
                <div className="flex-1">
                  <h4 className="font-bold text-earthen-primary text-xs">{product.name}</h4>
                  <p className="text-xs text-earthen-accent font-bold">Rp{(product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                  <p className="text-xs text-gray-600 mt-1">{product.description.substring(0, 60)}...</p>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="ml-2 bg-gradient-to-r from-earthen-primary to-earthen-secondary text-white text-xs px-2 py-1.5 rounded-lg hover:from-earthen-accent hover:to-earthen-primary transition-all"
                >
                  + Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return <p className="whitespace-pre-line font-medium">{message.text}</p>;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    const confirmationMessage = {
      id: Date.now(),
      text: `✅ ${product.name} telah ditambahkan ke keranjang Anda!`,
      type: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-96 h-[500px] border border-gray-200 overflow-hidden">
          {/* Header Chat */}
          <div className="bg-gradient-to-r from-earthen-primary to-earthen-secondary text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-1.5 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs opacity-80">Earthen Collective</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-earthen-primary to-earthen-secondary text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {formatMessageWithProducts(message)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl p-3 rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-earthen-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-earthen-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-earthen-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="ml-2 text-sm">AI sedang mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-earthen-primary focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className={`bg-gradient-to-r from-earthen-primary to-earthen-secondary text-white px-4 py-2 rounded-r-lg text-sm font-medium ${
                  isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:from-earthen-accent hover:to-earthen-primary transition-all'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Floating Button - Lebih kecil dan minimalis
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-earthen-primary to-earthen-secondary text-white p-2.5 rounded-full shadow-lg hover:from-earthen-accent hover:to-earthen-primary transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-white"
          aria-label="Chat dengan AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;