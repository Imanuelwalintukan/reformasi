import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import './ProductReviews.css';

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, review_text: '' });
  const [showForm, setShowForm] = useState(false);

  // Ambil ulasan dari localStorage
  useEffect(() => {
    const storedReviews = localStorage.getItem('productReviews');
    if (storedReviews) {
      try {
        const allReviews = JSON.parse(storedReviews);
        const productReviews = allReviews.filter(review => review.productId === String(productId));
        setReviews(productReviews);
        
        // Hitung rating rata-rata
        if (productReviews.length > 0) {
          const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating((totalRating / productReviews.length).toFixed(1));
          setTotalReviews(productReviews.length);
        }
      } catch (error) {
        console.error('Error parsing reviews:', error);
      }
    }
  }, [productId]);

  const handleAddReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Silakan login terlebih dahulu untuk memberikan ulasan');
      return;
    }

    const reviewToAdd = {
      id: Date.now().toString(),
      productId: String(productId), // Konversi ke string untuk konsistensi
      userId: user?.id || 'anonymous',
      userName: user?.email || user?.user_metadata?.full_name || 'Pengguna',
      rating: parseInt(newReview.rating),
      review_text: newReview.review_text,
      createdAt: new Date().toISOString()
    };

    // Ambil ulasan yang sudah ada
    let existingReviews = [];
    const storedReviews = localStorage.getItem('productReviews');
    if (storedReviews) {
      try {
        existingReviews = JSON.parse(storedReviews);
      } catch (e) {
        existingReviews = [];
      }
    }

    // Tambahkan ulasan baru
    const updatedReviews = [...existingReviews, reviewToAdd];
    localStorage.setItem('productReviews', JSON.stringify(updatedReviews));

    // Update state
    setReviews([...reviews, reviewToAdd]);
    
    // Hitung ulang rata-rata
    const allProductReviews = updatedReviews.filter(review => review.productId === productId);
    const totalRating = allProductReviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating((totalRating / allProductReviews.length).toFixed(1));
    setTotalReviews(allProductReviews.length);

    // Reset form
    setNewReview({ rating: 5, review_text: '' });
    setShowForm(false);
    
    alert('Ulasan berhasil ditambahkan!');
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3>Ulasan Produk ({totalReviews})</h3>
        <div className="average-rating">
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
          <div className="rating-value">{averageRating}</div>
        </div>
      </div>

      {!user ? (
        <div className="login-prompt">
          <p>Silakan <a href="/login">login</a> untuk memberikan ulasan Anda.</p>
        </div>
      ) : !showForm ? (
        <button 
          className="add-review-btn"
          onClick={() => setShowForm(true)}
        >
          Tambahkan Ulasan
        </button>
      ) : (
        <form className="review-form" onSubmit={handleAddReview}>
          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="rating-option">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={newReview.rating === value}
                    onChange={() => setNewReview({...newReview, rating: value})}
                  />
                  <span className="star">{value}★</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review_text">Ulasan:</label>
            <textarea
              id="review_text"
              name="review_text"
              value={newReview.review_text}
              onChange={(e) => setNewReview({...newReview, review_text: e.target.value})}
              placeholder="Tulis ulasan Anda tentang produk ini..."
              rows="4"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-review-btn">Kirim Ulasan</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.userName}</span>
                  <div className="review-date">{new Date(review.createdAt).toLocaleDateString('id-ID')}</div>
                </div>
                <div className="review-rating">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < review.rating ? 'star filled' : 'star empty'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {review.review_text && (
                <div className="review-content">
                  <p>{review.review_text}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-reviews">Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;