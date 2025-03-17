// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/edit-product/${product._id}`} className="btn btn-edit">
            Edit
          </Link>
          <button onClick={onDelete} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;