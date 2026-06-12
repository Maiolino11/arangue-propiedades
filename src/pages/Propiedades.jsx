import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { PROPERTIES } from '../data/properties.js';
import FiltersPanel from '../components/FiltersPanel.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import './Propiedades.css';

export default function Propiedades() {
  const { isA, filters: f, clearFilters } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  const num = (x) => {
    const n = parseFloat(x);
    return isNaN(n) ? null : n;
  };
  const fmin = num(f.min);
  const fmax = num(f.max);

  const filtered = PROPERTIES.filter((p) => {
    if (p.op !== f.op) return false;
    if (f.tipos.length && !f.tipos.includes(p.type)) return false;
    if (f.zonas.length && !f.zonas.includes(p.zona)) return false;
    if (f.credito && !p.aptoCredito) return false;
    if (f.dorm && (p.beds || 0) < f.dorm) return false;
    if (f.oport && p.status !== 'oportunidad') return false;
    if (!f.verReservadas && p.status === 'reservado') return false;
    if (!f.verVendidas && p.status === 'vendido') return false;
    if (fmin !== null || fmax !== null) {
      if (p.currency !== f.currency) return false;
      if (fmin !== null && p.priceNum < fmin) return false;
      if (fmax !== null && p.priceNum > fmax) return false;
    }
    return true;
  });

  return (
    <div>
      {isA ? (
        <section className="ar-listado__header--a">
          <div className="ar-section ar-listado__header-inner">
            <div className="ar-listado__breadcrumb">
              <Link to="/">Inicio</Link><span>/</span><span className="current">Propiedades</span>
            </div>
            <h1 className="ar-listado__title">Propiedades en venta y alquiler</h1>
            <p className="ar-listado__subtitle">Encontrá tu próxima propiedad en Cañada de Gómez, Rosario y toda la región.</p>
          </div>
        </section>
      ) : (
        <section className="ar-listado__header--b">
          <div className="ar-section ar-listado__header-inner">
            <div className="ar-listado__breadcrumb">
              <Link to="/">Inicio</Link><span>/</span><span className="current">Propiedades</span>
            </div>
            <h1 className="ar-listado__title">Propiedades en venta y alquiler</h1>
            <p className="ar-listado__subtitle">Encontrá tu próxima propiedad en Cañada de Gómez, Rosario y toda la región.</p>
          </div>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="ar-listado__wave"><path d="M0 40 C 360 4, 720 4, 1080 36 C 1260 52, 1350 56, 1440 40 L1440 80 L0 80 Z" fill="#F6F7FA" /></svg>
        </section>
      )}

      <section className="ar-listado__body">
        <FiltersPanel isOpen={showFilters} />

        <div>
          <button className="ar-results-toggle" onClick={() => setShowFilters((v) => !v)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M10 18h4" /></svg>
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>

          <div className="ar-results__head">
            <span className="ar-results__count"><strong>{filtered.length}</strong> propiedades encontradas</span>
            <span className="ar-results__sort">
              Ordenar: Más recientes
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A93A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="ar-results__grid">
              {filtered.map((item) => <PropertyCard key={item.slug} item={item} />)}
            </div>
          ) : (
            <div className="ar-results__empty">
              <div className="ar-results__empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <h3>No encontramos propiedades</h3>
              <p>Probá ajustar o limpiar los filtros para ver más opciones.</p>
              <button onClick={clearFilters}>Limpiar filtros</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
