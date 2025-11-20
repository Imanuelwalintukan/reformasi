import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { convertToRupiah } from '../utils/currencyFormatter';
import MidtransPayment from '../components/MidtransPayment';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [subTotal, setSubTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMidtransPayment, setShowMidtransPayment] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' // cash on delivery
  });

  useEffect(() => {
    // Calculate subtotal when cart items change
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubTotal(total);
  }, [cartItems]);

  const total = subTotal; // No shipping cost

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user && showCheckout) {
      setOrderDetails(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || user.email.split('@')[0],
        email: user.email
      }));
    }
  }, [user, showCheckout]);

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setShowCheckout(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    
    // Check if payment method is cod (cash on delivery)
    if (orderDetails.paymentMethod === 'cod') {
      // For COD, proceed directly to confirmation
      handleCODOrder();
    } else {
      // For other payment methods, show Midtrans payment modal
      setShowMidtransPayment(true);
    }
  };

  const handleCODOrder = () => {
    // In a real app, you would send this to your backend
    console.log('COD Order Details:', {
      ...orderDetails,
      items: cartItems,
      total: total,
      userId: user?.id
    });
    
    // Show confirmation
    setCheckoutComplete(true);
    
    // In a real app, you would clear the cart after successful order
    // For now, let's just show a success message and reset after delay
    setTimeout(() => {
      setCheckoutComplete(false);
      setShowCheckout(false);
      // Clear cart after successful order
      // clearCart(); // Uncomment this in real implementation
    }, 5000);
  };

  const handleMidtransPayment = (paymentData) => {
    // Process successful Midtrans payment
    console.log('Midtrans Payment Success:', paymentData);
    
    // In a real app, you would send this to your backend to verify the payment
    // and update your order database
    
    // Show confirmation
    setCheckoutComplete(true);
    
    setTimeout(() => {
      setCheckoutComplete(false);
      setShowCheckout(false);
      setShowMidtransPayment(false);
      // Clear cart after successful order
      // clearCart(); // Uncomment this in real implementation
    }, 5000);
  };

  const handleMidtransFailure = (error) => {
    // Handle payment failure
    console.log('Midtrans Payment Failed:', error);
    alert(`Payment failed: ${error.error}`);
    setShowMidtransPayment(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (checkoutComplete) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="text-3xl font-bold text-center mb-8 text-earthen-primary font-heading">Checkout Success!</h1>
          <div className="checkout-success">
            <div className="success-icon">✓</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You for Your Order!</h2>
            <p className="text-lg mb-2">Your order has been placed successfully.</p>
            <p className="text-lg mb-4">Order Total: {convertToRupiah(total)}</p>
            <p className="text-lg">We will contact you shortly to confirm your order.</p>
            <div className="mt-6">
              <a href="/" className="inline-block bg-earthen-primary text-white px-6 py-3 rounded-lg hover:bg-earthen-accent transition-colors duration-300 mr-4">Continue Shopping</a>
              <a href="/profile" className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300">View Order History</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="text-3xl font-bold text-center mb-8 text-earthen-primary font-heading">Checkout</h1>
          <div className="checkout-container">
            <div className="checkout-form">
              <h2>Delivery Information</h2>
              <form onSubmit={handleOrderSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={orderDetails.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="input-field"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={orderDetails.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="gopay">GoPay</option>
                    <option value="ovo">OVO</option>
                    <option value="shopeepay">ShopeePay</option>
                    <option value="dana">DANA</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bca_va">BCA Virtual Account</option>
                    <option value="bri_va">BRI Virtual Account</option>
                    <option value="mandiri_va">Mandiri Virtual Account</option>
                  </select>
                </div>
                
                <div className="order-summary">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{convertToRupiah(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{convertToRupiah(subTotal)}</span>
                  </div>
                  <div className="summary-row total">
                    <strong>Total</strong>
                    <strong>{convertToRupiah(total)}</strong>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button type="button" className="back-btn" onClick={() => setShowCheckout(false)}>
                    Back to Cart
                  </button>
                  <button type="submit" className="confirm-order-btn">
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Midtrans Payment Modal */}
        {showMidtransPayment && (
          <div className="payment-modal-overlay">
            <div className="payment-modal-content">
              <h3 className="text-xl font-semibold mb-4 text-center">Payment Processing</h3>
              <MidtransPayment
                totalAmount={total}
                orderDetails={orderDetails}
                onPaymentSuccess={handleMidtransPayment}
                onPaymentFailure={handleMidtransFailure}
                onCancel={() => setShowMidtransPayment(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-8 text-earthen-primary font-heading">Your Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h3>Your Cart is Empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <p className="mt-4">
                  <a href="/products" className="inline-block bg-earthen-primary text-white px-6 py-3 rounded-lg hover:bg-earthen-accent transition-colors duration-300">Browse Products</a>
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{convertToRupiah(item.price)}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-total">
                    {convertToRupiah(item.price * item.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{convertToRupiah(subTotal)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{convertToRupiah(total)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <div className="faq-link-section">
              <p>Need help? <a href="/faq" className="text-earthen-primary hover:underline">Check our FAQ</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;