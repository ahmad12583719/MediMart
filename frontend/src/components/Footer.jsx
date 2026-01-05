import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-col"><h3 style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--primary)' }}>⛨</span> MediMart </h3><p className="footer-desc">Your trusted partner in health and wellness. We provide 100% authentic medicines and 24/7 care.</p></div>
      <div className="footer-col"><h4>Quick Links</h4><ul className="footer-links"><li><Link to="/">Home</Link></li><li><Link to="/shop">Shop Medicines</Link></li><li><Link to="/lab-tests">Lab Tests</Link></li><li><Link to="/contact">Contact Us</Link></li></ul></div>
      <div className="footer-col"><h4>Legal</h4><ul className="footer-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Return Policy</a></li><li><a href="#">FAQs</a></li></ul></div>
      <div className="footer-col"><h4>Contact</h4><ul className="contact-list"><li>📍 Gulberg III, Lahore</li><li>📞 +92 300 123 4567</li><li>✉️ help@pharmacy.pk</li><li>🕒 Mon - Sun: 24 Hours</li></ul></div>
    </div>
    <div className="copyright-bar"><p>&copy;Developed by Medimart.</p></div>
  </footer>
);
export default Footer;