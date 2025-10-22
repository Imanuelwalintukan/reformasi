import React from 'react';
import ProductCard from './ProductCard';
import products from '../products';

const Products = () => {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <h2>Our Colorful Collection</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;