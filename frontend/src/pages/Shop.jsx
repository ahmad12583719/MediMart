import React from 'react';
import ProductCard from '../components/ProductCard';

const Shop = ({ shopItems, onAdd, onBuy }) => (
  <section className="section-container">
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h2 style={{ fontSize: '40px', fontWeight: '800' }}>Shop Medicines</h2>
    </div>
    <div className="grid-4">
      {shopItems.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onBuy={onBuy} />)}
    </div>
  </section>
);
export default Shop;