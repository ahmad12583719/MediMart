import React, { useState } from 'react';

function Login({ onLogin }) {
  // State for form fields
  const [username, setUsername] = useState(''); // <--- NEW STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for button hover effect
  const [isHover, setIsHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all 3 fields
    if (username && email && password) {
      alert(`Login attempt for: ${username} (${email})`);
      
      // Pass the username or email back to the parent app
      if (onLogin) onLogin(username); 
    } else {
      alert("Please fill in all fields.");
    }
  };

  // --- INLINE STYLES OBJECT ---
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e0f7fa 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: '#ffffff',
      width: '100%',
      maxWidth: '420px',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      border: '1px solid #f0f0f0',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logoIcon: {
      fontSize: '48px',
      color: '#00bcd4',
      display: 'block',
      marginBottom: '10px',
    },
    title: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 5px 0',
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0,
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#334155',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
      color: '#333',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: isHover ? '#0097a7' : '#00bcd4',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    footerLink: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '14px',
      color: '#64748b',
    },
    link: {
      color: '#00bcd4',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <span style={styles.logoIcon}>⛨</span>
          <h2 style={styles.title}>PHARMACY</h2>
          <p style={styles.subtitle}>Welcome back! Please login to your account.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          
          {/* --- NEW USERNAME INPUT --- */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
               <label style={{...styles.label, marginBottom: 0}}>Password</label>
               <a href="#" style={{fontSize: '13px', color: '#00bcd4', textDecoration: 'none'}}>Forgot?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            SIGN IN
          </button>

        </form>

        {/* Footer Section */}
        <div style={styles.footerLink}>
          Don't have an account? <a href="#" style={styles.link}>Register</a>
        </div>

      </div>
    </div>
  );
}

export default Login;