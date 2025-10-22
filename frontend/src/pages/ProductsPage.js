import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';
import products from '../products';
import './ProductsPage.css';

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100,
    sortBy: 'default'
  });

  // Apply filtering and sorting based on filters
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div id="products" className="products-page">
      <div className="container">
        <h1>Our Products</h1>
        <div className="products-layout">
          <div className="filter-sidebar">
            <PriceFilter onFilterChange={handleFilterChange} products={products} />
          </div>
          <div className="products-main">
            <div className="products-header">
              <h2>
                {filters.maxPrice < 100 ? `Products Under ${filters.maxPrice}` : 'All Products'}
                <span className="product-count"> ({filteredAndSortedProducts.length} items)</span>
              </h2>
            </div>
            <div className="products-grid">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredAndSortedProducts.length === 0 && (
              <div className="no-products">
                <p>No products found in the selected price range.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;