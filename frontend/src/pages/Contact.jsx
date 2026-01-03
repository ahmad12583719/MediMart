import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  return (
    <section className="section-container">
      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '32px' }}>Get in Touch</h2><p style={{ color: 'var(--text-muted)' }}>We are here to help you 24/7.</p>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</span><div><strong>Address:</strong><br /><span style={{ color: 'var(--text-muted)' }}>Gulberg, Lahore, Pakistan</span></div></div><div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ background: 'var(--accent)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span><div><strong>Phone:</strong><br /><span style={{ color: 'var(--text-muted)' }}>6969</span></div></div></div>
        </div>
        <div className="card" style={{ padding: '40px' }}><form onSubmit={(e) => { e.preventDefault(); alert("Sent!"); }}><div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-muted)' }}>Name</label><input type="text" className="login-input" placeholder="Your Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div><div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-muted)' }}>Email</label><input type="email" className="login-input" placeholder="your@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div><button type="submit" className="login-btn">SEND MESSAGE</button></form></div>
      </div>
    </section>
  );
};
export default Contact;