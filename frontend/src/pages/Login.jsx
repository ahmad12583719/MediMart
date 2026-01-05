import React, { useState } from 'react';

function Login({ onLogin, onRegister, onCancel }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (fullName && email && password && confirmPass) {
        if (password !== confirmPass) { alert("Passwords do not match!"); return; }
        onRegister(fullName, email, password); // Modified: Pass fullName, email, and password
      } else { alert("Please fill in all fields to register."); }
    } else {
      if (email && password) { onLogin(email, password); } else { alert("Please fill in email and password."); }
    }
  };

  return (
    <div className="login-container">
      <button onClick={onCancel} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '24px', cursor: 'pointer', zIndex: 100 }}>✕</button>
      <div className="login-card-wrapper">
        <div className="login-image-section">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ fontSize: '48px', margin: 0, textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>{isRegistering ? "Join Us." : "Future of  MediMart."}</h1>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>{isRegistering ? "Create an account to start your journey." : "Experience the next generation of healthcare."}</p>
          </div>
        </div>
        <div className="login-form-section">
          <div style={{ marginBottom: '20px' }}>
            <span className="logo-section" style={{ fontSize: '32px' }}><span style={{ color: 'var(--primary)' }}>⛨</span> MediMart</span>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>{isRegistering ? "Create your new account" : "Welcome back! Please login."}</p>
          </div>
          <form onSubmit={handleSubmit}>
            {isRegistering && (<div style={{ animation: 'fadeIn 0.5s' }}><input type="text" placeholder="Full Name" className="login-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>)}
            <div><input type="email" placeholder="Email Address " className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><input type="password" placeholder="Password " className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            {isRegistering && (<div style={{ animation: 'fadeIn 0.5s' }}><input type="password" placeholder="Confirm Password" className="login-input" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required /></div>)}
            <button type="submit" className="login-btn">{isRegistering ? "REGISTER ACCOUNT" : "SIGN IN"}</button>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
            {isRegistering ? "Already have an account? " : "New to MediMart? "}\
            <span onClick={() => { setIsRegistering(!isRegistering); setFullName(''); setPassword(''); setConfirmPass(''); }} style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>{isRegistering ? "Login here" : "Register here"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;