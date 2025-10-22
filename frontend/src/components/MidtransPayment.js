import React, { useState } from 'react';
import { convertToRupiah } from '../utils/currencyFormatter';
import midtransConfig from '../config/midtransConfig';
import './MidtransPayment.css';

const MidtransPayment = ({ 
  totalAmount, 
  orderDetails, 
  onPaymentSuccess, 
  onPaymentFailure,
  onCancel 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('gopay'); // Default payment method
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Create Midtrans payment process using backend API
  const handlePayment = async () => {
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

      // Call backend to create Midtrans transaction
      const response = await fetch('http://localhost:5001/api/midtrans/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create payment transaction');
      }

      console.log('Midtrans transaction created:', result);

      // For now, we'll simulate the payment process
      // In a real implementation, we would redirect to result.redirectUrl
      // or initialize Snap payment with result.transactionToken
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate 80% success rate for dummy payment
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        // Simulate successful payment response
        const paymentResponse = {
          transactionId: result.orderId,
          paymentMethod: paymentMethod,
          amount: totalAmount,
          status: 'settlement',
          orderId: result.orderId,
          ...orderDetails
        };
        
        onPaymentSuccess(paymentResponse);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing Midtrans payment:', error);
      onPaymentFailure({
        error: error.message || 'Payment failed. Please try again.',
        paymentMethod: paymentMethod
      });
    } finally {
      setIsProcessing(false);
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
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ${convertToRupiah(totalAmount)}`}
        </button>
      </div>

      {isProcessing && (
        <div className="payment-processing">
          <div className="spinner"></div>
          <p>Processing payment via Midtrans...</p>
        </div>
      )}
    </div>
  );
};

export default MidtransPayment;