import React from 'react';
import { parsePrice } from '../utils/helpers';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.qty), 0);

  const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch' },
    backdrop: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer' },
    sidebar: { position: 'relative', width: '400px', maxWidth: '85vw', height: '100%', background: 'var(--bg-card, #ffffff)', boxShadow: '-5px 0 15px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', padding: '20px', zIndex: 10000, overflow: 'hidden', color: 'var(--text-main, #000)' }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose}></div>
      <div style={styles.sidebar}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0 }}>Your Cart ({cartItems.length})</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-main)' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '50px', marginBottom: '10px' }}>🛒</p>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border)' }}>
                <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '0 0 5px' }}>{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑</button>
                  </div>
                  <p style={{ margin: '0 0 10px', color: 'var(--primary)', fontWeight: 'bold' }}>{item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{ width: '25px', height: '25px', borderRadius: '4px', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--bg-body)' }}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{ width: '25px', height: '25px', borderRadius: '4px', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--bg-body)' }}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <button className="btn-buy" style={{ width: '100%', padding: '15px', cursor: 'pointer' }} onClick={onCheckout} disabled={cartItems.length === 0}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;