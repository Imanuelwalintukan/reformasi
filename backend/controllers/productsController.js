// controllers/productsController.js
const { createClient } = require('@supabase/supabase-js');

const getAllProducts = async (req, res) => {
  try {
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fungsi untuk menambah produk (memerlukan auth)
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error('Error creating product:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Product created successfully',
      data: data[0]
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fungsi untuk mengupdate produk (memerlukan auth)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Product updated successfully',
      data
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fungsi untuk menghapus produk (memerlukan auth)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};