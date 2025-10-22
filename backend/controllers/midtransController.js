const { midtransSnap } = require('../config/midtransConfig');

// Create a Midtrans transaction
const createMidtransTransaction = async (req, res) => {
  try {
    const { order_id, gross_amount, customer_details, item_details } = req.body;

    // Validate required fields
    if (!order_id || !gross_amount) {
      return res.status(400).json({ error: 'order_id and gross_amount are required' });
    }

    // Prepare transaction parameters
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount
      },
      customer_details: customer_details || undefined,
      item_details: item_details || undefined
    };

    console.log('Creating Midtrans transaction:', parameter);

    // Create transaction using Midtrans Snap API
    const transaction = await midtransSnap.createTransaction(parameter);
    
    console.log('Midtrans transaction created:', transaction);

    // Return transaction token and redirect URL
    res.status(200).json({
      success: true,
      transactionToken: transaction.token,
      redirectUrl: transaction.redirect_url,
      orderId: order_id
    });
  } catch (error) {
    console.error('Error creating Midtrans transaction:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create Midtrans transaction'
    });
  }
};

// Handle Midtrans notification (webhook)
const handleMidtransNotification = async (req, res) => {
  try {
    const notification = req.body;

    console.log('Received Midtrans notification:', notification);

    // Get order ID from notification
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    // In a real application, you would:
    // 1. Validate the notification using Midtrans API
    // 2. Update your database based on the transaction status
    // 3. Process the order based on payment status
    // 4. Handle different transaction statuses (settlement, pending, cancel, etc.)

    // Process this asynchronously after sending response
    setTimeout(() => processNotification(notification), 0);

    // For now, just return success response
    res.status(200).json({ 
      success: true, 
      message: 'Notification received',
      orderId: orderId,
      transactionStatus: transactionStatus,
      fraudStatus: fraudStatus
    });
  } catch (error) {
    console.error('Error handling Midtrans notification:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process notification'
    });
  }
};

// Process notification asynchronously
const processNotification = async (notification) => {
  try {
    console.log('Processing notification for order:', notification.order_id);
    
    // This is where you would update your database, send emails, etc.
    // Example: updateOrderStatus(notification.order_id, notification.transaction_status);
    
    // Log the processed notification
    console.log('Notification processed:', {
      orderId: notification.order_id,
      status: notification.transaction_status,
      paymentType: notification.payment_type,
      amount: notification.gross_amount
    });
  } catch (error) {
    console.error('Error processing notification:', error);
  }
};

// Get transaction status
const getTransactionStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Get transaction status from Midtrans
    const status = await midtransCoreApi.transaction.status(orderId);

    res.status(200).json({
      success: true,
      transaction: status
    });
  } catch (error) {
    console.error('Error getting transaction status:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get transaction status'
    });
  }
};

module.exports = {
  createMidtransTransaction,
  handleMidtransNotification,
  getTransactionStatus
};