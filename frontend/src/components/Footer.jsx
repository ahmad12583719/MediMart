import React from 'react';

const Footer = ({ setCurrentView }) => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-col"><h3 style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--primary)' }}>⛨</span> PHARMACY</h3><p className="footer-desc">Your trusted partner in health and wellness. We provide 100% authentic medicines and 24/7 care.</p></div>
      <div className="footer-col"><h4>Quick Links</h4><ul className="footer-links"><li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home') }}>Home</a></li><li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('shop') }}>Shop Medicines</a></li><li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('services') }}>Lab Tests</a></li><li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('contact') }}>Contact Us</a></li></ul></div>
      <div className="footer-col"><h4>Legal</h4><ul className="footer-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Return Policy</a></li><li><a href="#">FAQs</a></li></ul></div>
      <div className="footer-col"><h4>Contact</h4><ul className="contact-list"><li>📍 Gulberg III, Lahore</li><li>📞 6969</li><li>✉️ help@pharmacy.pk</li><li>🕒 Mon - Sun: 24 Hours</li></ul></div>
    </div>
    <div className="copyright-bar"><p>&copy;Developed by Farhan.</p></div>
  </footer>
);
export default Footer;