import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { PROPERTIES } from '../data/properties.js';
import FiltersPanel from '../components/FiltersPanel.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import './Propiedades.css';

export default function Propiedades() {
  const { filters: f, clearFilters } = useApp();
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
      <PageHeader
        crumb="Propiedades"
        title="Propiedades en venta y alquiler"
        subtitle="Encontrá tu próxima propiedad en Cañada de Gómez, Rosario y toda la región."
      />

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
