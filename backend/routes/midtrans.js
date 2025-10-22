const express = require('express');
const router = express.Router();
const {
  createMidtransTransaction,
  handleMidtransNotification,
  getTransactionStatus
} = require('../controllers/midtransController');

// Route to create a Midtrans transaction
router.post('/transaction', createMidtransTransaction);

// Route to handle Midtrans notification (webhook)
router.post('/notification', handleMidtransNotification);

// Route to get transaction status
router.get('/transaction/:orderId', getTransactionStatus);

// Debug route to simulate webhook notification
router.post('/debug-notification', async (req, res) => {
  try {
    const { order_id = 'TEST_ORDER_123', transaction_status = 'settlement', payment_type = 'gopay', gross_amount = 10000 } = req.body;

    // Simulate notification payload
    const notification = {
      transaction_time: new Date().toISOString(),
      transaction_status: transaction_status,
      transaction_id: '54b6d870-ac11-4b5e-82d1-8b624b0a2923',
      status_code: '200',
      signature_key: 'test-signature-key',
      payment_type: payment_type,
      order_id: order_id,
      merchant_id: 'dummy-merchant-id',
      masking_card: '481111-1114',
      fraud_status: 'accept',
      gross_amount: gross_amount.toString()
    };

    console.log('Debug: Simulating notification for order:', order_id);

    // Process notification
    await require('../controllers/midtransController').handleMidtransNotification(
      { body: notification },
      res
    );

    // Don't send response here, it's already sent by handleMidtransNotification
  } catch (error) {
    console.error('Error in debug notification:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process debug notification'
    });
  }
});

module.exports = router;