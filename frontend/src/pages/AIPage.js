import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { getAIResponse } from '../utils/openaiService';
import { extractUserPreferences, getAdvancedRecommendations, generateRecommendationDescription, getBusinessInfo } from '../utils/recommendationEngine';
import products from '../products';
import StyleQuiz from '../components/StyleQuiz';

const AIPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Selamat datang di Earthen Collective. Saya adalah asisten AI pribadi Anda. Tanyakan apa saja tentang produk kami, atau ikuti kuis gaya untuk menemukan kerajinan tembikar yang sempurna.", type: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const messagesEndRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText) => {
    const text = messageText || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage = { 
      id: Date.now(), 
      text: text, 
      type: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simpan riwayat pencarian ke localStorage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.push(text);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    try {
      const businessInfo = getBusinessInfo(text);
      if (businessInfo) {
        const botMessage = { id: Date.now(), text: businessInfo, type: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }
      
      const userPreferences = extractUserPreferences(text);
      if (Object.keys(userPreferences).length > 0) {
        const recommendedProducts = getAdvancedRecommendations(userPreferences);
        if (recommendedProducts.length > 0) {
          const recommendationText = generateRecommendationDescription(recommendedProducts, userPreferences);
          const botMessage = { id: Date.now(), text: recommendationText, type: 'bot', products: recommendedProducts };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
          return;
        }
      }
      
      const aiMessages = [
        { 
          role: 'system', 
          content: `Anda adalah asisten belanja AI yang canggih untuk Earthen Collective, sebuah butik tembikar dan gerabah premium. Nada Anda harus elegan, membantu, dan berpengetahuan luas.
          Produk-produk kami:
          ${products.map(p => `ID: ${p.id}, Nama: ${p.name}, Harga: Rp${(p.price * 15000).toFixed(0)}, Deskripsi: ${p.description}, Warna: ${p.color}`).join('\n')}
          
          Tugas utama Anda adalah:
          1.  Membantu pengguna menemukan produk yang ideal berdasarkan preferensi mereka (gaya, ukuran, warna, harga).
          2.  Memberikan informasi detail tentang produk, termasuk bahan, proses pembuatan, dan cerita di baliknya.
          3.  Menjawab pertanyaan umum tentang Earthen Collective (lokasi, jam operasional, kebijakan pengembalian).
          4.  Menawarkan rekomendasi proaktif dan panduan gaya.
          
          Saat merekomendasikan produk, gunakan format yang menarik secara visual. Alih-alih hanya teks, tampilkan produk dalam kartu yang elegan.
          Contoh: "Tentu, berdasarkan preferensi Anda untuk gaya minimalis, saya merekomendasikan produk berikut:"
          Selalu pertahankan persona yang mewah dan profesional.`
        },
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: text }
      ];

      const aiResponse = await getAIResponse(aiMessages);
      const botMessage = { id: Date.now(), text: aiResponse, type: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { id: Date.now(), text: "Maaf, saya mengalami sedikit kendala teknis. Mohon coba beberapa saat lagi.", type: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (style) => {
    setShowQuiz(false);
    const message = `Saya memiliki gaya ${style}.`;
    handleSendMessage(message);
  };

  const extractProductsFromResponse = (responseText) => {
    const foundProducts = [];
    products.forEach(product => {
      if (responseText.toLowerCase().includes(product.name.toLowerCase())) {
        foundProducts.push(product);
      }
    });
    return foundProducts;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    const confirmationMessage = {
      id: Date.now(),
      text: `Elegan! ${product.name} telah ditambahkan ke keranjang Anda.`,
      type: 'bot'
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageWithProducts = (message) => {
    const messageProducts = message.products || extractProductsFromResponse(message.text);
    
    if (messageProducts && messageProducts.length > 0) {
      return (
        <div className="space-y-4">
          <p className="whitespace-pre-line font-serif text-lg">{message.text}</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {messageProducts.map(product => (
              <div key={product.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4 shadow-lg flex flex-col text-left transition-transform transform hover:scale-105">
                <div className="flex-1">
                  <h4 className="font-bold text-yellow-400 text-sm">{product.name}</h4>
                  <p className="text-sm text-gray-300 font-semibold">Rp{(product.price * 15000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                  <p className="text-xs text-gray-400 mt-2">{product.description}</p>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-2 rounded-md hover:bg-yellow-300 transition-colors"
                >
                  + Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return <p className="whitespace-pre-line font-serif text-lg">{message.text}</p>;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-bold text-yellow-400">Earthen Collective AI</h1>
            <p className="text-xs text-gray-400">Your Personal Pottery Concierge</p>
          </div>
          <button 
            onClick={() => setShowQuiz(true)}
            className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition-colors"
          >
            Kuis Gaya
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {showQuiz ? (
            <StyleQuiz onComplete={handleQuizComplete} />
          ) : (
            <>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-6 animate-fade-in-up ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-5 shadow-2xl ${
                      message.type === 'user' 
                        ? 'bg-yellow-400 text-gray-900 rounded-br-none' 
                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                    }`}
                  >
                    {formatMessageWithProducts(message)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className="bg-gray-800 text-gray-200 border border-gray-700 rounded-2xl p-5 rounded-bl-none">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <span className="ml-2 text-sm font-serif">Mencari inspirasi...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
      
      {!showQuiz && (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center bg-gray-700 rounded-lg">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanyakan pada saya tentang tembikar..."
                className="flex-1 bg-transparent border-none rounded-l-lg px-5 py-3 text-sm text-white placeholder-gray-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className={`bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-r-lg text-sm transition-opacity ${
                  isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'
                }`}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPage;