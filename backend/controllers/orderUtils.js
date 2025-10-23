const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Hanya inisialisasi jika environment variables tersedia
const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

const createOrderRecord = async (orderData) => {
  if (!supabase) {
    console.warn('Supabase not configured, skipping database operations');
    return {
      success: true,
      order: {
        message: 'Order recorded (supabase not configured)',
        order_id: orderData.order_id
      }
    };
  }
  
  try {
    const { order_id, gross_amount, customer_details, item_details, payment_method, status, user_id } = orderData;

    // Validasi input
    if (!order_id || !gross_amount) {
      throw new Error('Order ID and gross amount are required');
    }

    // Insert order ke Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_id,
        user_id: user_id || null,
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
      throw error;
    }

    return {
      success: true,
      order: data[0]
    };
  } catch (error) {
    console.error('Server error during create order:', error);
    throw error;
  }
};

const updateOrderStatusRecord = async (orderId, statusData) => {
  if (!supabase) {
    console.warn('Supabase not configured, skipping database operations');
    return {
      success: true,
      message: 'Status updated (supabase not configured)',
      order_id: orderId
    };
  }
  
  try {
    const { status, transaction_id, payment_type, fraud_status } = statusData;

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
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error('Order not found');
    }

    return {
      success: true,
      order: data[0]
    };
  } catch (error) {
    console.error('Server error during update order:', error);
    throw error;
  }
};

module.exports = {
  createOrderRecord,
  updateOrderStatusRecord
};