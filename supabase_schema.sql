-- Tabel users (sudah disediakan oleh Supabase Auth)
-- Anda bisa membuat view jika perlu mengakses data pengguna
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Harga dalam satuan terkecil (misal: Rupiah)
  image_url VARCHAR(500),
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  amount INTEGER NOT NULL, -- Total pembayaran dalam satuan terkecil
  customer_details JSONB, -- Data pelanggan {first_name, email, phone}
  item_details JSONB[], -- Detail item dalam pesanan
  payment_method VARCHAR(50), -- Metode pembayaran
  status VARCHAR(50) DEFAULT 'pending', -- pending, settlement, cancel, expire, failure
  transaction_id VARCHAR(255), -- ID transaksi dari Midtrans
  fraud_status VARCHAR(50) DEFAULT 'accept', -- accept, deny, challenge
  payment_type VARCHAR(50), -- cth: credit_card, gopay, dll
  transaction_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel order_items (jika ingin struktur lebih rinci)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(255) REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL, -- Harga satuan produk saat pembelian
  subtotal INTEGER NOT NULL, -- quantity * price
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel cart (keranjang belanja pengguna)
CREATE TABLE IF NOT EXISTS user_cart (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id) -- Pastikan hanya satu item per produk per pengguna
);

-- Tabel untuk menyimpan konfigurasi Midtrans (opsional)
CREATE TABLE IF NOT EXISTS payment_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fungsi trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tambahkan trigger untuk tabel-tabel yang perlu update timestamp
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock, category) VALUES
('Colorful Ceramic Pot 1', 'Beautiful handcrafted ceramic pot with vibrant colors', 195000, '/images/pot1.jpg', 10, 'pottery'),
('Medium Plant Pot 2', 'Medium size pot with geometric patterns', 277500, '/images/pot2.jpg', 8, 'pottery'),
('Vintage Mini Pot', 'Mini vintage-inspired pot with intricate details', 63000, '/images/pot3.jpg', 15, 'pottery'),
('Tiny White Pot', 'Tiny minimalist design for small plants', 150000, '/images/pot4.jpg', 12, 'pottery'),
('Medium Bohemian Pot', 'Medium bohemian style pot with unique textures', 435000, '/images/pot5.jpg', 6, 'pottery'),
('Large Decorative Pot', 'Large pot perfect for big plants', 90000, '/images/pot6.jpg', 5, 'pottery');

-- Konfigurasi RLS (Row Level Security) - aktifkan jika diperlukan
-- Contoh: Hanya pengguna yang bisa mengakses data mereka sendiri
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_cart ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS contoh (aktifkan jika diperlukan keamanan data)
-- CREATE POLICY "User can view own profile" ON user_profiles
--   FOR SELECT TO authenticated
--   USING (auth.uid() = id);

-- CREATE POLICY "User can manage own orders" ON orders
--   FOR ALL TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "User can manage own cart" ON user_cart
--   FOR ALL TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);