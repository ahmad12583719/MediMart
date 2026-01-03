import React, { useState } from 'react';
import './App.css';

// Data
import { DATA } from './data/mockData';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [username, setUsername] = useState('');
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // App State
  const [toast, setToast] = useState(null);
  const [shopItems, setShopItems] = useState(DATA.initialShop);
  const [orders, setOrders] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => { const newTheme = theme === 'light' ? 'dark' : 'light'; setTheme(newTheme); document.documentElement.setAttribute('data-theme', newTheme); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Cart Logic
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    showToast(`${product.name} added to cart`);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!username) {
      alert("Please Login to checkout.");
      setCurrentView('login');
      setIsCartOpen(false);
      return;
    }
    const newOrders = cart.map(item => ({
      id: Math.floor(Math.random() * 10000),
      customer: username,
      item: item.name,
      price: item.price,
      qty: item.qty,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    }));
    setOrders([...orders, ...newOrders]);
    setCart([]);
    setIsCartOpen(false);
    showToast("Order placed successfully!");
  };

  const handleBuyNow = (productName) => {
    if (!username) { alert("Please Login to place an order."); setCurrentView('login'); return; }
    const product = shopItems.find(p => p.name === productName) || DATA.topSelling.find(p => p.name === productName);
    if (product) {
      setOrders([...orders, { id: Math.floor(Math.random() * 10000), customer: username, item: product.name, price: product.price, qty: 1, date: new Date().toLocaleDateString(), status: 'Pending' }]);
      showToast(`Order placed for ${productName}!`);
    }
  };

  // Admin Logic
  const handleDeleteProduct = (id) => { setShopItems(prev => prev.filter(item => item.id !== id)); showToast("Product removed."); };
  const handleAddProduct = (product) => { setShopItems([{ ...product, id: Math.random(), img: 'https://via.placeholder.com/150' }, ...shopItems]); showToast("Product added."); };
  const handleUpdateOrder = (id) => { setOrders(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'Pending' ? 'Shipped' : 'Delivered' } : o)); };
  const handleCancelOrder = (id) => { setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o)); showToast("Order Cancelled"); };

  // Auth Logic
  const handleLogin = (name) => {
    const cleanName = name.trim();
    setUsername(cleanName);
    if (cleanName.toLowerCase() === 'admin') {
      setCurrentView('admin');
      showToast(`Welcome Admin`);
    } else {
      setCurrentView('home');
      showToast(`Welcome ${cleanName}`);
    }
  };

  const handleRegister = (name, fullName) => { setUsername(name); setCurrentView('home'); showToast(`Account created! Welcome, ${fullName}`); };

  return (
    <div className="App">
      {toast && <div className="toast-container"><Toast message={toast} /></div>}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Navbar 
        username={username}
        cartItemCount={cart.reduce((acc, item) => acc + item.qty, 0)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        toggleTheme={toggleTheme}
        theme={theme}
        setIsCartOpen={setIsCartOpen}
        setUsername={setUsername}
      />

      <main style={{ flex: 1 }}>
        {currentView === 'login' && <Login onLogin={handleLogin} onRegister={handleRegister} onCancel={() => setCurrentView('home')} />}
        {currentView === 'home' && <Home setView={setCurrentView} onAdd={handleAddToCart} onBuy={handleBuyNow} />}
        {currentView === 'shop' && <Shop shopItems={shopItems} onAdd={handleAddToCart} onBuy={handleBuyNow} />}
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}
        {currentView === 'admin' && <AdminDashboard products={shopItems} orders={orders} onDeleteProduct={handleDeleteProduct} onAddProduct={handleAddProduct} onUpdateOrder={handleUpdateOrder} onCancelOrder={handleCancelOrder} />}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;