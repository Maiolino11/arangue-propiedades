import HeroSearch from './HeroSearch.jsx';
import './HeroB.css';

export default function HeroB() {
  return (
    <section className="ar-heroB">
      <img className="ar-heroB__bg" src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80" alt="Propiedad destacada" />
      <div className="ar-heroB__overlay" />
      <div className="ar-heroB__content ar-fade-slow">
        <span className="ar-heroB__badge">
          <span className="ar-heroB__badge-dot" />
          Cañada de Gómez · Matrícula COCIR 2601
        </span>
        <h1 className="ar-heroB__title">Encontrá la propiedad<br />que estás buscando</h1>
        <p className="ar-heroB__lead">Más de 250 propiedades en venta y alquiler en toda la región, con el respaldo de una operación registrada.</p>

        <div className="ar-heroB__search">
          <HeroSearch />
        </div>
      </div>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="ar-heroB__wave">
        <path d="M0 64 C 240 8, 480 8, 720 52 C 960 96, 1200 112, 1440 56 L1440 120 L0 120 Z" fill="#F6F7FA" />
      </svg>
    </section>
  );
}
