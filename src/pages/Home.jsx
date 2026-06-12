import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import HeroA from '../components/HeroA.jsx';
import HeroB from '../components/HeroB.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import NavAnchor from '../components/NavAnchor.jsx';
import { PROPERTIES, STATS, ZONAS } from '../data/properties.js';
import './Home.css';

export default function Home() {
  const { isA } = useApp();
  const location = useLocation();
  const featured = PROPERTIES.slice(0, 6);

  useEffect(() => {
    const id = location.state && location.state.scrollTo;
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 78, behavior: 'smooth' });
    });
  }, [location.state]);

  return (
    <div>
      {isA ? <HeroA /> : <HeroB />}

      {/* Trust strip */}
      <section className="ar-trust">
        <div className="ar-trust__grid">
          {STATS.map((st) => (
            <div className="ar-trust__item" key={st.label}>
              <div className="ar-trust__value">{st.value}</div>
              <div className="ar-trust__label">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="ar-featured">
        <div className="ar-featured__head">
          <div>
            <span className="ar-eyebrow">Selección Arangue</span>
            <h2 className="ar-featured__title">Propiedades destacadas</h2>
          </div>
          <Link to="/propiedades" className="ar-featured__link">
            Ver todas las propiedades
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="ar-grid-3">
          {featured.map((item) => <PropertyCard key={item.slug} item={item} />)}
        </div>
      </section>

      {/* Zonas */}
      <section id="zonas" className="ar-zonas">
        <div className="ar-zonas__head">
          <span className="ar-eyebrow">Dónde operamos</span>
          <h2 className="ar-zonas__title">Conocemos la región</h2>
          <p className="ar-zonas__lead">De Cañada de Gómez a Rosario, operamos en las localidades y zonas rurales que mejor conocemos.</p>
        </div>
        <div className="ar-grid-3">
          {ZONAS.map((z) => (
            <Link to="/propiedades" className="ar-zona-card" key={z.name}>
              <img src={z.img} alt={z.name} loading="lazy" />
              <span className="ar-zona-card__overlay" />
              <span className="ar-zona-card__info">
                <span>
                  <span className="ar-zona-card__name">{z.name}</span>
                  <span className="ar-zona-card__count">{z.count}</span>
                </span>
                <span className="ar-zona-card__arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tasación */}
      <section id="tasacion" className="ar-tasacion">
        <div className="ar-tasacion__panel">
          <div className="ar-tasacion__title">
            <h2>¿Querés saber cuánto vale tu propiedad?</h2>
            <p>Tasación profesional sin cargo y sin compromiso. Te decimos un valor de mercado real para tu casa, terreno o campo.</p>
          </div>
          <div className="ar-tasacion__actions">
            <NavAnchor id="contacto" className="ar-tasacion__btn-light">Solicitar tasación gratis</NavAnchor>
            <a href="https://wa.me/543471595464" className="ar-tasacion__btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              Escribinos por WhatsApp
            </a>
          </div>
          <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="ar-tasacion__wave"><path d="M0 120 C150 40 350 40 600 120 L600 260 L0 260 Z" fill="#5C8BFF" /></svg>
        </div>
      </section>
    </div>
  );
}
