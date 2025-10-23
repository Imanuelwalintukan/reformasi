// Import only the utility functions
const { createOrderRecord, updateOrderStatusRecord } = require('./orderUtils');

// HTTP handler functions that use the utility functions
const createOrder = async (req, res) => {
  try {
    const result = await createOrderRecord({
      ...req.body,
      user_id: req.user?.id || null
    });
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error: 'Failed to create order' });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const statusData = req.body;
    
    const result = await updateOrderStatusRecord(orderId, statusData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message || 'Failed to update order status' });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Ini akan diimplementasikan nanti jika diperlukan untuk rute HTTP
    res.status(501).json({ error: 'Not implemented' });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch order' });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrderById
};

const createOrder = async (req, res) => {
  try {
    const { order_id, gross_amount, customer_details, item_details, payment_method, status } = req.body;

    // Validasi input
    if (!order_id || !gross_amount || !customer_details) {
      return res.status(400).json({ error: 'Order ID, gross amount, and customer details are required' });
    }

    // Insert order ke Supabase
    const { data, error } = await supabase
      .from('orders') // Nama tabel - pastikan tabel ini sudah dibuat di Supabase
      .insert([{
        order_id,
        user_id: req.user?.id || null, // Jika ada autentikasi
        amount: gross_amount,
        customer_details,
        item_details,
        payment_method: payment_method || 'unknown',
        status: status || 'pending',
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      success: true,
      order: data[0]
    });
  } catch (error) {
    console.error('Server error during create order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, transaction_id, payment_type, fraud_status } = req.body;

    // Update order status di Supabase
    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        transaction_id,
        payment_type,
        fraud_status,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', orderId)
      .select();

    if (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order: data[0]
    });
  } catch (error) {
    console.error('Server error during update order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return res.status(404).json({ error: 'Order not found' });
      }
      console.error('Error fetching order:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      order: data
    });
  } catch (error) {
    console.error('Server error during fetch order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrderById
};