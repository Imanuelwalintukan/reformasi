import React, { useState, useEffect } from 'react';
import { convertToRupiah } from '../utils/currencyFormatter';
import './MidtransPayment.css';

const MidtransPayment = ({
  totalAmount,
  orderDetails,
  onPaymentSuccess,
  onPaymentFailure,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('gopay'); // Default payment method
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Load Midtrans Snap script dynamically
  useEffect(() => {
    // Check if script is already loaded
    if (window.snap) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_CLIENT_KEY || 'Mid-client-o7lFKhedQ-2GDdx0');
    script.async = true;

    script.onload = () => {
      console.log('Midtrans Snap script loaded successfully');
      setScriptLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Midtrans Snap script');
      setScriptError(true);
      setScriptLoaded(false);
    };

    document.body.appendChild(script);

    // Cleanup function to remove script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Create Midtrans payment process using backend API
  const handlePayment = async () => {
    // Check if script is loaded before proceeding
    if (!scriptLoaded) {
      alert('Payment system is not ready yet. Please try again in a moment.');
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order details for the backend
      const orderData = {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: Math.round(totalAmount),
        customer_details: {
          first_name: orderDetails.name,
          email: orderDetails.email,
          phone: orderDetails.phone,
        },
        item_details: [
          {
            id: 'total_order',
            price: Math.round(totalAmount),
            quantity: 1,
            name: 'Total Order Payment'
          }
        ]
      };

      console.log('Creating Midtrans transaction with data:', orderData);

      // Determine API URL based on environment
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/midtrans/transaction'  // For production deployment
        : 'http://localhost:9000/api/midtrans/transaction'; // For development

      // Call backend to create Midtrans transaction
      console.log('Attempting to connect to backend:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (!result.success) {
        throw new Error(result.error || 'Failed to create payment transaction');
      }

      console.log('Midtrans transaction created:', result);

      // Initialize Snap payment
      if (window.snap) {
        window.snap.show({
          token: result.transactionToken,
          onSuccess: function(resultData) {
            console.log('Payment Success:', resultData);
            setIsProcessing(false);

            // Process successful payment
            const paymentResponse = {
              transactionId: resultData.transaction_id,
              paymentMethod: resultData.payment_type,
              amount: resultData.gross_amount,
              status: resultData.transaction_status,
              orderId: resultData.order_id,
              ...orderDetails,
              ...resultData
            };

            onPaymentSuccess(paymentResponse);
          },
          onPending: function(resultData) {
            console.log('Payment Pending:', resultData);
            setIsProcessing(false);

            // Handle pending payment (e.g., bank transfer)
            const paymentResponse = {
              transactionId: resultData.transaction_id,
              paymentMethod: resultData.payment_type,
              amount: resultData.gross_amount,
              status: resultData.transaction_status,
              orderId: resultData.order_id,
              ...orderDetails,
              ...resultData
            };

            onPaymentSuccess(paymentResponse);
          },
          onError: function(resultData) {
            console.log('Payment Error:', resultData);
            setIsProcessing(false);

            // Handle payment failure
            onPaymentFailure({
              error: resultData.status_message || 'Payment failed',
              paymentMethod: resultData.payment_type || paymentMethod
            });
          },
          onClose: function() {
            console.log('Payment closed by user');
            setIsProcessing(false);

            // Handle when user closes the popup
            onPaymentFailure({
              error: 'Payment cancelled by user',
              paymentMethod: paymentMethod
            });
          }
        });
      } else {
        throw new Error('Midtrans Snap is not available');
      }
    } catch (error) {
      console.error('Error processing Midtrans payment:', error);

      // More specific error handling
      let errorMessage = 'Payment failed. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }

      // Menampilkan pesan error yang lebih spesifik
      alert(`Payment Error: ${errorMessage}`);

      setIsProcessing(false);
      onPaymentFailure({
        error: errorMessage,
        paymentMethod: paymentMethod
      });
    }
  };

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', icon: '💰' },
    { id: 'ovo', name: 'OVO', icon: '📱' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🛒' },
    { id: 'dana', name: 'DANA', icon: '💵' },
    { id: 'credit_card', name: 'Credit Card', icon: '💳' },
    { id: 'bca_va', name: 'BCA Virtual Account', icon: '🏦' },
    { id: 'bri_va', name: 'BRI Virtual Account', icon: '🏦' },
    { id: 'mandiri_va', name: 'Mandiri Virtual Account', icon: '🏦' },
  ];

  // Show error message if script failed to load
  if (scriptError) {
    return (
      <div className="midtrans-payment">
        <div className="payment-error">
          <h3>Payment System Error</h3>
          <p>Unable to load payment system. Please try again later or contact support.</p>
          <button className="cancel-payment-btn" onClick={onCancel}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="midtrans-payment">
      <div className="payment-header">
        <h3>Payment Method</h3>
        <div className="payment-amount">
          Total: <strong>{convertToRupiah(totalAmount)}</strong>
        </div>
      </div>

      <div className="payment-method-selector">
        <div
          className="selected-payment-method"
          onClick={() => setShowPaymentOptions(!showPaymentOptions)}
        >
          <span className="method-icon">
            {paymentMethods.find(method => method.id === paymentMethod)?.icon}
          </span>
          <span className="method-name">
            {paymentMethods.find(method => method.id === paymentMethod)?.name}
          </span>
          <span className="dropdown-icon">▼</span>
        </div>

        {showPaymentOptions && (
          <div className="payment-methods-list">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`payment-method-option ${paymentMethod === method.id ? 'selected' : ''}`}
                onClick={() => {
                  setPaymentMethod(method.id);
                  setShowPaymentOptions(false);
                }}
              >
                <span className="method-icon">{method.icon}</span>
                <span className="method-name">{method.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="payment-actions">
        <button className="cancel-payment-btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="confirm-payment-btn"
          onClick={handlePayment}
          disabled={isProcessing || !scriptLoaded}
        >
          {!scriptLoaded ? 'Loading...' : isProcessing ? 'Processing...' : `Pay ${convertToRupiah(totalAmount)}`}
        </button>
      </div>

      {isProcessing && (
        <div className="payment-processing">
          <div className="spinner"></div>
          <p>Opening payment window...</p>
        </div>
      )}
    </div>
  );
};

export default MidtransPayment;