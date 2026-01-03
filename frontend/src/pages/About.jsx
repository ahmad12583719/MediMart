import React from 'react';
import { DATA } from '../data/mockData';

const About = () => (
  <>
    <section className="section-container">
      <div className="about-hero" style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', borderRadius: '20px', padding: '80px 40px', color: 'var(--text-main)' }}><h1 style={{ fontSize: '48px', margin: 0, fontWeight: '900', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Empowering Health</h1><p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '700px', margin: '20px auto', color: 'var(--text-muted)' }}>We are more than just a pharmacy. We are your partners in health, providing accessible, authentic, and affordable care to every household in Pakistan.</p></div>
      <div className="stats-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '-30px' }}>{['15+ Years', '50k+ Customers', '100% Authentic'].map(s => (<div key={s} className="card" style={{ padding: '30px', flex: 1, textAlign: 'center' }}><h3 style={{ color: 'var(--primary)', fontSize: '24px', margin: 0 }}>{s}</h3></div>))}</div>
    </section>
    <section className="section-container" style={{ textAlign: 'center', marginTop: '80px', marginBottom: '80px' }}><h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>Meet Our Experts</h2><div className="grid-3">{DATA.team.map((member, index) => (<div key={index} className="card" style={{ padding: '40px', textAlign: 'center' }}><img src={member.img} alt={member.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '4px solid var(--primary)', boxShadow: '0 10px 20px var(--primary-glow)' }} /><h3 style={{ margin: '0 0 5px' }}>{member.name}</h3><p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', margin: 0, textTransform: 'uppercase' }}>{member.role}</p></div>))}</div></section>
  </>
);
export default About;