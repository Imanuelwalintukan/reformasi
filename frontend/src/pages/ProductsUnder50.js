import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { convertToRupiah, getProductsUnderPrice } from '../utils/currencyFormatter';
import products from '../products';

const ProductsUnder50 = () => {
  const { addToCart } = useCart();
  const [maxPrice, setMaxPrice] = useState(50); // Dolar
  const [sortBy, setSortBy] = useState('default');

  // Filter products with price under maxPrice
  const filteredProducts = getProductsUnderPrice(products, maxPrice);

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return a.id - b.id; // original order
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <div className="products-under-50">
      <div className="container">
        <h1>Products Under {convertToRupiah(maxPrice)}</h1>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="max-price">Max Price (USD): </label>
            <input
              type="range"
              id="max-price"
              min="10"
              max="100"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              step="1"
            />
            <span>${maxPrice.toFixed(0)}</span>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort-by">Sort by: </label>
            <select 
              id="sort-by" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{convertToRupiah(product.price)}</p>
                <p className="description">{product.description}</p>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="no-products">
            <p>No products found under {convertToRupiah(maxPrice)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsUnder50;