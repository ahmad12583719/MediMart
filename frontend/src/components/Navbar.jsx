import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({
  username,
  cartItemCount,
  toggleTheme,
  theme,
  setIsCartOpen,
  handleLogout,
  searchTerm,
  onSearchChange,
  onSearchSubmit
}) => {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <>
      <header className="main-header">
        <div className="header-content">
          <NavLink to="/" className="logo-section" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
            <span style={{ color: 'var(--primary)', marginRight: '8px' }}>⛨</span>
            MediMart
          </NavLink>
          
          <form onSubmit={handleSearchSubmit} className="search-container">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="search-input"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <button type="submit" className="search-button">GO</button>
          </form>

          <div className="nav-right" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle"
              style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="cart-icon" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer', position: 'relative' }}>
              <span role="img" aria-label="cart" style={{ fontSize: '24px' }}>🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-count" style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-12px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: '2px solid var(--bg-body)'
                }}>{cartItemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-container">
          <ul className="nav-left">
            <li className="nav-item"><NavLink to="/" end>HOME</NavLink></li>
            <li className="nav-item"><NavLink to="/shop">SHOP</NavLink></li>
            <li className="nav-item"><NavLink to="/about">ABOUT</NavLink></li>
            <li className="nav-item"><NavLink to="/contact">CONTACT</NavLink></li>
            {username && username.toLowerCase() === 'admin' && (
              <li className="nav-item">
                <NavLink to="/admin" style={{ color: '#ef4444', fontWeight: 'bold' }}>ADMIN PANEL</NavLink>
              </li>
            )}
          </ul>
          <div className="nav-right">
            {username ? (
              <a href="#logout" className="logout-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                LOGOUT ({username})
              </a>
            ) : (
              <NavLink to="/login" className="login-link" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                LOGIN / JOIN
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
