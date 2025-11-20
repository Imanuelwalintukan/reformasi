import './App.css';
import './animations.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ProductsUnder50 from './pages/ProductsUnder50';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import AuthCallback from './components/AuthCallback';
import ShopNowProtected from './components/ShopNowProtected';
import AIPage from './pages/AIPage';
import FAQ from './components/FAQ';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ShopNowProtected />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/products-under-50" element={<ProductsUnder50 />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/ai-assistant" element={<AIPage />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
