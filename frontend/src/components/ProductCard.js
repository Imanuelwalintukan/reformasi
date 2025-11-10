import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { convertToRupiah } from '../utils/currencyFormatter';
import WishlistButton from './WishlistButton';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Ambil rating dari localStorage
  useEffect(() => {
    const getAverageRating = () => {
      try {
        const storedReviews = localStorage.getItem('productReviews');
        if (storedReviews) {
          const allReviews = JSON.parse(storedReviews);
          // Konversi tipe ID untuk perbandingan yang akurat
          const productReviews = allReviews.filter(review => 
            review.productId === String(product.id) // Konversi ke string untuk perbandingan
          );
          
          if (productReviews.length > 0) {
            const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / productReviews.length;
            setAverageRating(avgRating);
            setTotalReviews(productReviews.length);
          } else {
            setAverageRating(0);
            setTotalReviews(0);
          }
        }
      } catch (error) {
        console.error('Error getting average rating:', error);
        setAverageRating(0);
        setTotalReviews(0);
      }
    };

    getAverageRating();
  }, [product.id]);

  const handleAddToCart = () => {
    // Tambahkan field tambahan yang mungkin diperlukan oleh sistem keranjang
    const productForCart = {
      ...product,
      price: product.price * 8000, // Gunakan harga yang telah dikonversi ke dalam keranjang
      convertedFromOriginal: product.price, // Simpan harga asli sebagai referensi
      stock: product.stock || 10, // Default stock 
      category: product.color || 'Pottery' // Gunakan field color sebagai kategori jika tidak ada
    };
    addToCart(productForCart);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} />
          <div className="wishlist-overlay">
            <WishlistButton product={product} size="small" />
          </div>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          
          <div className="rating-info">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={i < Math.floor(averageRating) ? 'star filled' : 'star empty'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-value">({averageRating.toFixed(1)})</span>
            <span className="review-count">({totalReviews} ulasan)</span>
          </div>
          
          <p className="price">{convertToRupiah(product.price * 8000)}</p>
          <p className="description">{product.description}</p>
          <button 
            className="add-to-cart" 
            onClick={(e) => {
              e.stopPropagation(); // Mencegah klik membuka halaman detail
              handleAddToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;