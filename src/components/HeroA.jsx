import HeroSearch from './HeroSearch.jsx';
import './HeroA.css';

export default function HeroA() {
  return (
    <div className="ar-heroA">
      <div className="ar-heroA__blob1" />
      <div className="ar-heroA__blob2" />
      <section className="ar-heroA__inner">
        <div className="ar-fade">
          <span className="ar-heroA__badge">
            <span className="ar-heroA__badge-dot" />
            Inmobiliaria en Cañada de Gómez
          </span>
          <h1 className="ar-heroA__title">
            Tu próximo lugar<br />en la región, <em>bien acompañado.</em>
          </h1>
          <p className="ar-heroA__lead">Casas, departamentos, terrenos, campos y galpones en Cañada de Gómez, Las Parejas, Rosario y toda la zona.</p>

          <div className="ar-heroA__search">
            <HeroSearch />
          </div>
        </div>

        <div className="ar-heroA__media">
          <div className="ar-heroA__media-main">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80" alt="Casa moderna" />
          </div>
          <div className="ar-heroA__media-secondary">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" alt="Interior" />
          </div>
          <div className="ar-heroA__stat ar-float">
            <div className="ar-heroA__stat-value">+250</div>
            <div className="ar-heroA__stat-label">propiedades activas</div>
          </div>
          <div className="ar-heroA__matricula">
            <div className="ar-heroA__matricula-label">MATRÍCULA</div>
            <div className="ar-heroA__matricula-value">COCIR 2601</div>
          </div>
        </div>
      </section>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="ar-heroA__wave">
        <path d="M0 72 C 240 18, 520 18, 760 54 C 1000 90, 1220 98, 1440 48 L1440 110 L0 110 Z" fill="#F6F7FA" />
      </svg>
    </div>
  );
}
