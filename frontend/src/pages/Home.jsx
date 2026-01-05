import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = ({ onAdd, onBuy, shopItems }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    { id: 0, title: "IMMUNITY BOOSTERS", subtitle: "Essential vitamins up to 30% OFF", btnText: "SHOP NOW", target: "/shop", img: "https://vims.ac.in/vims-hospital/wp-content/uploads/2023/01/Immune-System.jpg" },
    { id: 1, title: "EMERGENCY FIRST AID KIT", subtitle: "Be prepared for any injury, anytime, anywhere.", btnText: "SHOP ESSENTIALS", target: "/shop", img: "https://firstaidkitsurvival.com/cdn/shop/files/website_banner_3.jpg?v=1683793390" },
    { id: 2, title: "EXPRESS DELIVERY", subtitle: "Get your prescription delivered in under an hour.", btnText: "ORDER NOW", target: "/shop", img: "https://expressdelivery.com.pk/wp-content/uploads/2023/11/logistics.webp" }
  ];

  useEffect(() => {
    const timer = setInterval(() => { setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1)); }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <>
      <section className="hero-slider">
        {banners.map((slide, index) => (<div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url('${slide.img}')` }}><div className="slide-content"><h3 className="slide-title">{slide.title}</h3><p className="slide-subtitle">{slide.subtitle}</p><button className="slide-btn" onClick={() => navigate(slide.target)}>{slide.btnText}</button></div></div>))}
        <div className="slider-dots">{banners.map((_, idx) => (<span key={idx} className={`dot ${currentSlide === idx ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>))}</div>
      </section>
      <section className="section-container">
        <div className="super-sale-banner"><div className="sale-text-content"><h2 className="sale-heading">SUPER<br />SALE</h2><p className="sale-subheading">Discount On All Medicine</p><button className="btn-buy" style={{ marginTop: '20px', padding: '15px 40px' }} onClick={() => navigate('/shop')}>EXPLORE</button></div><div className="sale-badge-container"><span className="sale-badge-percent">30%</span><span style={{ fontSize: '20px', fontWeight: 'bold' }}>OFF</span></div></div>
      </section>
      <section className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}><h2 style={{ fontSize: '32px', margin: 0, fontWeight: '800' }}>Top Selling Items</h2><button className="btn-cart" onClick={() => navigate('/shop')}>VIEW ALL</button></div>
        <div className="grid-4">{shopItems.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onBuy={onBuy} />)}</div>
      </section>
    </>
  );
};
export default Home;
