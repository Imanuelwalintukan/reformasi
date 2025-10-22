import React, { useState, useEffect } from 'react';

const PriceFilter = ({ onFilterChange, products }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('default');
  const [tempMaxPrice, setTempMaxPrice] = useState(100);

  // Update tempMaxPrice when maxPrice changes
  useEffect(() => {
    setTempMaxPrice(maxPrice);
  }, [maxPrice]);

  const handleApplyFilter = () => {
    onFilterChange({ 
      minPrice, 
      maxPrice: tempMaxPrice, 
      sortBy 
    });
  };

  const handleResetFilter = () => {
    setMinPrice(0);
    setTempMaxPrice(100);
    setSortBy('default');
    onFilterChange({ 
      minPrice: 0, 
      maxPrice: 100, 
      sortBy: 'default' 
    });
  };

  return (
    <div className="price-filter">
      <h3>Filter Products</h3>
      
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <div>
            <label>Min: ${minPrice}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Max: ${tempMaxPrice}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Sort By</h4>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className="filter-actions">
        <button onClick={handleApplyFilter}>Apply Filter</button>
        <button onClick={handleResetFilter}>Reset</button>
      </div>
    </div>
  );
};

export default PriceFilter;