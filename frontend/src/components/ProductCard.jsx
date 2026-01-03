import React from 'react';

const ProductCard = ({ product, onAdd, onBuy }) => (
  <div className="card product-card">
    {product.category && (
      <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: '#333' }}>
        {product.category}
      </span>
    )}
    <img src={product.img} className="product-img" alt={product.name} />
    <h4 className="product-title">{product.name}</h4>
    <div className="product-price">{product.price}</div>
    <div className="btn-group">
      <button className="btn-cart" onClick={() => onAdd(product)}>ADD</button>
      <button className="btn-buy" onClick={() => onBuy(product.name)}>BUY</button>
    </div>
  </div>
);

export default ProductCard;