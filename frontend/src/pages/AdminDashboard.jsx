import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ products, orders, onDeleteProduct, onAddProduct, onUpdateProduct, onUpdateOrder, onCancelOrder, onLogout, customers }) => {
  const [tab, setTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', img: '', stock: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [localOrders, setLocalOrders] = useState(orders);
  const [localCustomers, setLocalCustomers] = useState(customers);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  useEffect(() => {
    setLocalCustomers(customers);
  }, [customers]);

  useEffect(() => {
    if (editingProduct) {
      setNewProduct(editingProduct);
    } else {
      setNewProduct({ name: '', price: '', category: '', img: '', stock: '' });
    }
  }, [editingProduct]);

  const getStatusStyle = (status) => {
    if (status === 'Cancelled') return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
    if (status === 'Pending') return { bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706' };
    return { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' };
  };

  const totalRevenue = localCustomers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0);
  const activeOrders = localOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const deliveredOrders = localOrders.filter(o => o.status === 'Delivered').length;
  const salesData = [{ label: 'Jan', value: 30 }, { label: 'Feb', value: 45 }, { label: 'Mar', value: 25 }, { label: 'Apr', value: 60 }, { label: 'May', value: 80 }, { label: 'Jun', value: 55 }];

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
      const finalProduct = {
        ...newProduct,
        price: parseFloat(newProduct.price.toString().replace(/[^\d.]/g, '')),
        stock: parseInt(newProduct.stock, 10),
        img: newProduct.img || 'https://via.placeholder.com/150?text=Meds'
      };

      if (editingProduct) {
        await onUpdateProduct(editingProduct._id, finalProduct);
      } else {
        await onAddProduct(finalProduct);
      }
      setEditingProduct(null);
    }
    setIsLoading(false);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦', badge: activeOrders },
    { id: 'products', label: 'Inventory', icon: '💊' },
    { id: 'customers', label: 'Customers', icon: '👥' },
  ];

  const styles = {
    dashboardContainer: { padding: '20px', maxWidth: '1240px', margin: '0 auto', display: 'flex', gap: '30px', flexDirection: window.innerWidth < 768 ? 'column' : 'row' },
    sidebar: { width: '260px', padding: '30px', borderRadius: '20px', height: 'fit-content', flexShrink: 0 },
    navItem: (active) => ({ padding: '15px 20px', cursor: 'pointer', borderRadius: '12px', marginBottom: '8px', background: active ? 'var(--primary)' : 'transparent', color: active ? 'white' : 'var(--text-muted)', fontWeight: active ? '600' : '500', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s' }),
    badge: { background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '10px', marginLeft: 'auto', fontWeight: 'bold' },
    statCard: (color) => ({ background: 'var(--card-gradient)', padding: '25px', borderRadius: '20px', boxShadow: 'var(--shadow)', borderLeft: `5px solid ${color}`, border: '1px solid var(--border)' }),
    table: { width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow)' },
    th: { background: 'var(--bg-nav)', padding: '15px 20px', textAlign: 'left', fontWeight: '700', color: 'var(--text-muted)', fontSize: '14px' },
    td: { padding: '15px 20px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '14px', verticalAlign: 'middle' },
    header: { marginBottom: '30px', fontSize: '24px', fontWeight: '700' },
    graphContainer: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', paddingTop: '20px' },
    barWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', flex: 1 },
    bar: (height) => ({ width: '40%', height: `${height}%`, background: 'var(--primary)', borderRadius: '8px 8px 0 0', opacity: 0.8, transition: 'height 0.5s ease', position: 'relative' }),
    barLabel: { marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }
  };

  return (
    <section className="section-container" style={styles.dashboardContainer}>
      <div className="glass-panel" style={styles.sidebar}>
        <h3 style={{ margin: '0 0 30px', color: 'var(--text-main)', fontSize: '24px', paddingLeft: '10px' }}>Admin Panel</h3>
        {menuItems.map(item => (<div key={item.id} style={styles.navItem(tab === item.id)} onClick={() => setTab(item.id)}><span>{item.icon}</span> {item.label}{item.badge > 0 && <span style={styles.badge}>{item.badge}</span>}</div>))}
        <div style={{...styles.navItem(false), marginTop: '20px'}} onClick={onLogout}>
            <span>🔑</span> Logout
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {tab === 'overview' && (
          <div>
            <h2 style={styles.header}>Dashboard Overview</h2>
            <div className="grid-4" style={{ marginBottom: '30px' }}>
              <div style={styles.statCard('var(--primary)')}><p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Total Revenue</p><h2 style={{ margin: '5px 0 0', fontSize: '28px', color: 'var(--text-main)' }}>Rs. {totalRevenue.toLocaleString()}</h2></div>
              <div style={styles.statCard('#8e44ad')}><p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Active Orders</p><h2 style={{ margin: '5px 0 0', fontSize: '28px', color: 'var(--text-main)' }}>{activeOrders}</h2></div>
              <div style={styles.statCard('#27ae60')}><p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Delivered Orders</p><h2 style={{ margin: '5px 0 0', fontSize: '28px', color: 'var(--text-main)' }}>{deliveredOrders}</h2></div>
              <div style={styles.statCard('#f39c12')}><p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Products</p><h2 style={{ margin: '5px 0 0', fontSize: '28px', color: 'var(--text-main)' }}>{products.length}</h2></div>
            </div>
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h3 style={{ margin: 0 }}>Monthly Revenue</h3><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last 6 Months</span></div>
              <div style={styles.graphContainer}>{salesData.map((data, index) => (<div key={index} style={styles.barWrapper}><div style={styles.bar(data.value)} title={`Sales: ${data.value}%`}></div><span style={styles.barLabel}>{data.label}</span></div>))}</div>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h2 style={styles.header}>Order Management</h2>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Customer</th><th style={styles.th}>Item</th><th style={styles.th}>Qty</th><th style={styles.th}>Status</th><th style={styles.th}>Action</th></tr></thead>
              <tbody>
                {localOrders.map((order) => {
                  const statusStyle = getStatusStyle(order.status);
                  return (
                    <tr key={order.id}>
                      <td style={styles.td}>#{order.id}</td>
                      <td style={styles.td}>{order.customer}</td>
                      <td style={styles.td}>{order.item}</td>
                      <td style={styles.td}>x{order.qty || 1}</td>
                      <td style={styles.td}>
                        <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', background: statusStyle.bg, color: statusStyle.color }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-buy" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onUpdateOrder(order._id, { status: order.status === 'Pending' ? 'Confirmed' : 'Delivered' })}>Next</button>
                            <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }} onClick={() => onCancelOrder(order._id)}>Cancel</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <h2 style={styles.header}>Inventory Control</h2>
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 20px', fontSize: '20px' }}>{editingProduct ? 'Edit Medicine' : '+ Add Medicine'}</h4>
              <form onSubmit={handleProductSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <input className="login-input" type="text" placeholder="Medicine Name" style={{ margin: 0 }} value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input className="login-input" type="text" placeholder="Price (e.g. Rs. 500)" style={{ margin: 0 }} value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input className="login-input" type="text" placeholder="Image URL" style={{ margin: 0 }} value={newProduct.img} onChange={e => setNewProduct({ ...newProduct, img: e.target.value })} />
                <input className="login-input" type="number" placeholder="Stock" style={{ margin: 0 }} value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                <input className="login-input" type="text" placeholder="Category" style={{ margin: 0 }} value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                <button type="submit" className="login-btn" style={{ gridColumn: 'span 3' }} disabled={isLoading}>{isLoading ? (editingProduct ? 'UPDATING...' : 'ADDING...') : (editingProduct ? 'UPDATE PRODUCT' : 'ADD TO INVENTORY')}</button>
              </form>
            </div>
            <table style={styles.table}><thead><tr><th style={styles.th}>Image</th><th style={styles.th}>Name</th><th style={styles.th}>Category</th><th style={styles.th}>Price</th><th style={styles.th}>Stock</th><th style={styles.th}>Action</th></tr></thead><tbody>{products.map((p) => (<tr key={p._id}><td style={styles.td}><img src={p.img} alt="med" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border)' }} /></td><td style={styles.td}>{p.name}</td><td style={styles.td}>{p.category}</td><td style={styles.td}>{p.price}</td><td style={styles.td}>{p.stock}</td><td style={styles.td}><button className="btn-buy" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '10px' }} onClick={() => handleEditClick(p)}>Edit</button><button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => onDeleteProduct(p._id)}>Delete</button></td></tr>))}</tbody></table>
          </div>
        )}
        {tab === 'customers' && (
          <div>
            <h2 style={styles.header}>Registered Customers</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Joined</th>
                  <th style={styles.th}>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {localCustomers.map((c) => (
                  <tr key={c._id}>
                    <td style={styles.td}>
                      <strong>{c.username}</strong>
                    </td>
                    <td style={styles.td}>{c.email}</td>
                    <td style={styles.td}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{ ...styles.td, color: 'var(--primary)', fontWeight: 'bold' }}>
                      Rs. {(c.totalSpent || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
export default AdminDashboard;