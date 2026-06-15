import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeroB from '../components/HeroB.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { PROPERTIES, STATS, ZONAS } from '../data/properties.js';
import './Home.css';

export default function Home() {
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
      <HeroB />

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
    </div>
  );
}
