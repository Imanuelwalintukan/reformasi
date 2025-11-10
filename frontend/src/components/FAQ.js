import React, { useState } from 'react';
import '../App.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa saja jenis produk yang tersedia di Earthen Collective?",
      answer: "Kami menyediakan berbagai produk pot dan gerabah buatan tangan yang terbuat dari tanah liat berkualitas tinggi. Produk kami meliputi pot kecil untuk tanaman hias, pot medium untuk tanaman sedang, hingga pot besar untuk tanaman outdoor. Kami juga menyediakan pot dengan desain khusus dan edisi terbatas."
    },
    {
      question: "Bagaimana cara merawat produk pot dan gerabah dari Earthen Collective?",
      answer: "Untuk menjaga keawetan produk kami, kami merekomendasikan untuk membersihkan dengan air mengalir dan kain lembut. Hindari penggunaan bahan kimia keras atau alat penggosok kasar. Jika digunakan di luar ruangan, pastikan untuk melindungi dari kondisi cuaca ekstrem."
    },
    {
      question: "Apakah Earthen Collective menyediakan layanan kustomisasi?",
      answer: "Ya, kami menyediakan layanan kustomisasi untuk produk pot dan gerabah. Anda bisa memesan produk dengan ukuran, warna, atau desain tertentu sesuai kebutuhan. Silakan hubungi kami melalui halaman kontak untuk informasi lebih lanjut tentang layanan ini."
    },
    {
      question: "Berapa lama waktu pengiriman pesanan?",
      answer: "Waktu pengiriman standar adalah 3-7 hari kerja setelah pesanan dikonfirmasi. Untuk produk kustom atau pesanan dalam jumlah besar, waktu pengiriman bisa lebih lama dan akan kami informasikan sebelumnya. Kami akan memberikan nomor pelacakan setelah pesanan dikirimkan."
    },
    {
      question: "Apakah ada kebijakan retur atau penggantian produk?",
      answer: "Kami menawarkan kebijakan retur dalam 7 hari setelah penerimaan barang jika produk dalam kondisi asli dan belum digunakan. Jika Anda menerima produk yang rusak atau cacat, silakan hubungi kami dalam 48 jam setelah penerimaan untuk penggantian gratis."
    },
    {
      question: "Apa saja metode pembayaran yang tersedia?",
      answer: "Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan e-wallet populer seperti GoPay dan OVO. Kami juga menyediakan opsi pembayaran Cash on Delivery (COD) untuk lokasi tertentu. Detail pembayaran akan ditampilkan saat proses checkout."
    },
    {
      question: "Bagaimana dengan kebijakan privasi data pelanggan?",
      answer: "Kami sangat menjaga privasi dan keamanan data pelanggan. Informasi pribadi yang Anda berikan hanya digunakan untuk proses pesanan dan komunikasi terkait layanan kami. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda."
    },
    {
      question: "Dimana lokasi studio Earthen Collective?",
      answer: "Studio kami berlokasi di Minahasa, Provinsi Sulawesi Utara, Indonesia, di mana para seniman lokal kami menciptakan setiap produk dengan penuh cinta dan keahlian. Anda dapat mengunjungi studio kami dengan membuat janji terlebih dahulu melalui halaman kontak kami."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-earthen-primary font-heading">Pertanyaan Umum</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-earthen-secondary rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <button
              className="w-full px-6 py-4 text-left bg-earthen-secondary hover:bg-earthen-primary transition-colors duration-300 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-earthen-text">{faq.question}</span>
              <span className="ml-4 text-earthen-text">{openIndex === index ? '-' : '+'}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-6 py-4 bg-white text-earthen-text">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-earthen-text">
        <p className="mb-4">Masih memiliki pertanyaan? Jangan ragu untuk menghubungi kami.</p>
        <a href="/contact" className="inline-block bg-earthen-primary text-white px-6 py-3 rounded-lg hover:bg-earthen-accent transition-colors duration-300">Hubungi Kami</a>
      </div>
    </div>
  );
};

export default FAQ;