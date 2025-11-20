import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { convertToRupiah } from '../utils/currencyFormatter';
import WishlistButton from '../components/WishlistButton';
import ProductReviews from '../components/ProductReviews';
import products from '../products'; // Impor data produk
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Temukan produk berdasarkan ID (konversi string ke integer untuk mencocokkan)
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Jika produk tidak ditemukan, redirect atau tampilkan pesan
      console.error('Product not found with ID:', id);
    }
    setIsLoading(false);

    // Ambil rating produk (konversi productId ke integer untuk pencocokan)
    try {
      const storedReviews = localStorage.getItem('productReviews');
      if (storedReviews) {
        const allReviews = JSON.parse(storedReviews);
        const productReviews = allReviews.filter(review =>
          review.productId === productId || review.productId === id
        );

        if (productReviews.length > 0) {
          const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating((totalRating / productReviews.length).toFixed(1));
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
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Produk telah ditambahkan ke keranjang!');
    }
  };

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <p>Memuat produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <p>Produk tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info-section">
            <h1>{product.name}</h1>
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
              <span className="rating-value">({averageRating})</span>
              <span className="review-count">({totalReviews} ulasan)</span>
            </div>
            <div className="price">{convertToRupiah(product.price)}</div>
            <p className="description">{product.description}</p>
            <div className="product-details">
              <p><strong>Kategori:</strong> {product.color || 'Pottery'}</p>
              <p><strong>Stok:</strong> Tersedia (Stok Banyak)</p>
            </div>
            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Tambahkan ke Keranjang
              </button>
              <WishlistButton product={product} size="normal" />
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <ProductReviews productId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;