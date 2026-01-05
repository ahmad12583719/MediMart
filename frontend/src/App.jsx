import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// Main App component which sets up the router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// AppContent component contains the main application logic and state
function AppContent() {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]); // Added customers state
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchAppData = useCallback(async () => {
    try {
      const productsResponse = await fetch('/api/products');
      const productsData = await productsResponse.json();
      setShopItems(productsData.data);

      // Notify admin for low stock
      if (isAdmin) {
        productsData.data.forEach(product => {
          if (product.stock <= 5) {
            toast.error(`Restock Alert: ${product.name} is running low!`)
          }
        });
      }

      const ordersResponse = await fetch('/api/orders');
      const ordersData = await ordersResponse.json();
      setOrders(ordersData.data);

      const usersResponse = await fetch('/api/users');
      const usersData = await usersResponse.json();
      if (usersData.success) {
        setCustomers(usersData.data);
      } else {
        console.error("Error fetching users:", usersData);
        toast.error("Failed to fetch users from the server.");
      }

    } catch (error) {
      console.error("Error fetching initial data:", error);
      toast.error("Failed to fetch data from the server.");
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0)); // Also remove if qty is 0
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const handleCheckout = async () => {
    if (!username) {
      toast.error("Please Login to checkout.");
      navigate('/login');
      setIsCartOpen(false);
      return;
    }
    const newOrdersToProcess = cart.map(item => ({
      customer: username,
      item: item.name,
      price: item.price,
      qty: item.qty,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    }));

    for (const orderData of newOrdersToProcess) {
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
    await fetchAppData();
    setCart([]);
    setIsCartOpen(false);
    toast.success("Order placed successfully!");
  };

  const handleBuyNow = async (productName) => {
    if (!username) {
      toast.error("Please Login to place an order.");
      navigate('/login');
      return;
    }
    const product = shopItems.find(p => p.name === productName);
    if (product) {
      const orderData = {
        customer: username,
        item: product.name,
        price: product.price,
        qty: 1,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
      };
      try {
        await fetch(`/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        await fetchAppData();
        toast.success(`Order placed for ${productName}!`);
      } catch (error) {
        console.error("Error placing buy now order:", error);
        toast.error(`Failed to place order for ${productName}. Please try again.`);
      }
    }
  };


  const handleLogout = () => {
    setIsAdmin(false);
    setUsername('');
    navigate('/');
    toast.success("Logged out successfully.");
  };

  const handleDeleteProduct = async (id) => {
    try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        await fetchAppData();
        toast.success("Product removed.");
    } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      await fetchAppData();
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      await fetchAppData();
      toast.success("Product updated. Please refresh if you don't see the changes.");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleUpdateOrder = async (id, updateData) => {
    try {
        await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        await fetchAppData();
        toast.success('Order status updated!');
    } catch (error) {
        console.error("Error updating order:", error);
        toast.error('Failed to update order status.');
    }
  };

  const handleCancelOrder = async (id) => {
    await handleUpdateOrder(id, { status: 'Cancelled' });
  };

  const handleLogin = async (email, password) => {
    if (email === 'admin@medimart.com' && password === 'admin123') {
      setUsername('Admin');
      setIsAdmin(true);
      await fetchAppData();
      navigate('/admin');
      toast.success('Welcome Admin!');
    } else {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          setIsAdmin(false);
          setUsername(data.data.username);
          await fetchAppData();
          navigate('/');
          toast.success(`Welcome ${data.data.username}!`);
        } else {
          toast.error(data.message || 'Invalid credentials.');
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Failed to log in. Please try again.");
      }
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: fullName, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAdmin(false);
        setUsername(data.data.username);
        setCustomers(prev => [...prev, data.data]);
        await fetchAppData();
        navigate('/');
        toast.success(`Account created! Welcome, ${data.data.username}!`);
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  const filteredShopItems = shopItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onUpdateQty={handleUpdateCartQty} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
      <Navbar 
        username={username} 
        cartItemCount={cart.reduce((acc, item) => acc + (item ? item.qty : 0), 0)} 
        toggleTheme={toggleTheme} 
        theme={theme} 
        setIsCartOpen={setIsCartOpen} 
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={() => navigate('/shop')}
      />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home shopItems={filteredShopItems} onAdd={handleAddToCart} onBuy={handleBuyNow} />} />
          <Route path="/shop" element={<Shop shopItems={filteredShopItems} onAdd={handleAddToCart} onBuy={handleBuyNow} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} onRegister={handleRegister} onCancel={() => navigate('/')} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard products={shopItems} orders={orders} customers={customers} onDeleteProduct={handleDeleteProduct} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onUpdateOrder={handleUpdateOrder} onCancelOrder={handleCancelOrder} onLogout={handleLogout} /> : <Login onLogin={handleLogin} onRegister={handleRegister} onCancel={() => navigate('/')} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
