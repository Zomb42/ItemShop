// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h1>Product Catalog</h1>
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available</p>
          <Link to="/add-product" className="btn btn-primary">
            Add New Product
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onDelete={() => handleDelete(product._id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;