import React from 'react';

function ProductCard({ name, price, productImage }) {
  return (
    <div className="product-card">
      <img src={`http://localhost:3000/${productImage}`} alt={name} />
      <div className="product-details">
        <h4>{name}</h4>
        <div>
          <h5>Price: ${price}</h5>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
