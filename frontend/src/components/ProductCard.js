import React from 'react';
import { useCart } from '../components/CartContext';
import { convertToRupiah } from '../utils/currencyFormatter';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{convertToRupiah(product.price)}</p>
        <p className="description">{product.description}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;