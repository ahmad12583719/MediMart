import React from 'react';

const Navbar = ({ username, cartItemCount, currentView, setCurrentView, toggleTheme, theme, setIsCartOpen, setUsername }) => {
  return (
    <>
      <header className="main-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => setCurrentView('home')}><span style={{ color: 'var(--primary)' }}>⛨</span> PHARMACY</div>
          <div className="search-container"><input type="text" placeholder="Search medicines..." className="search-input" /><button className="search-button">GO</button></div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{ background: 'var(--bg-body)', border: '1px solid var(--border)', width: '40px', height: '40px', borderRadius: '50%', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{theme === 'light' ? '🌙' : '☀️'}</button>
            <div className="cart-section" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
              <div className="cart-icon">🛒 <span className="cart-badge">{cartItemCount}</span></div>
            </div>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-container">
          <ul className="nav-left">
            {['home', 'shop', 'about', 'contact'].map(view => (
              <li key={view} className={`nav-item ${currentView === view ? 'active' : ''}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView(view); }}>{view.toUpperCase()}</a>
              </li>
            ))}
            {username && username.toLowerCase() === 'admin' && (
              <li className={`nav-item ${currentView === 'admin' ? 'active' : ''}`}>
                <a href="#" style={{ color: '#ef4444', fontWeight: 'bold' }} onClick={(e) => { e.preventDefault(); setCurrentView('admin'); }}>ADMIN PANEL</a>
              </li>
            )}
          </ul>
          <div className="nav-right">
            {username ? (
              <a href="#logout" className="logout-link" onClick={(e) => { e.preventDefault(); setUsername(''); setCurrentView('home'); }}>LOGOUT ({username})</a>
            ) : (
              <a href="#login" className="login-link" style={{ fontWeight: 'bold', color: 'var(--primary)' }} onClick={(e) => { e.preventDefault(); setCurrentView('login'); }}>LOGIN / JOIN</a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;