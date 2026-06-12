import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { TYPES, ZONA_NAMES } from '../data/properties.js';
import './HeroSearch.css';

export default function HeroSearch() {
  const { setF } = useApp();
  const navigate = useNavigate();
  const [hero, setHero] = useState({ op: 'Venta', tipo: '', zona: '', dorm: '', currency: 'USD', min: '', max: '' });

  const patch = (p) => setHero((h) => ({ ...h, ...p }));

  const buscar = () => {
    setF({
      op: hero.op,
      tipos: hero.tipo ? [hero.tipo] : [],
      zonas: hero.zona ? [hero.zona] : [],
      currency: hero.currency || 'USD',
      min: hero.min || '',
      max: hero.max || '',
      dorm: hero.dorm ? parseInt(hero.dorm, 10) : 0,
    });
    navigate('/propiedades');
  };

  return (
    <div>
      <div className="ar-search__tabs">
        <button className={`ar-search__tab${hero.op === 'Venta' ? ' is-active' : ''}`} onClick={() => patch({ op: 'Venta' })}>Comprar</button>
        <button className={`ar-search__tab${hero.op === 'Alquiler' ? ' is-active' : ''}`} onClick={() => patch({ op: 'Alquiler' })}>Alquilar</button>
      </div>

      <div className="ar-search__row1">
        <label className="ar-search__field">
          <span className="ar-search__label">Tipo</span>
          <select value={hero.tipo} onChange={(e) => patch({ tipo: e.target.value })}>
            <option value="">Cualquiera</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="ar-search__field">
          <span className="ar-search__label">Zona</span>
          <select value={hero.zona} onChange={(e) => patch({ zona: e.target.value })}>
            <option value="">Toda la región</option>
            {ZONA_NAMES.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>
        <label className="ar-search__field">
          <span className="ar-search__label">Dormitorios</span>
          <select value={hero.dorm} onChange={(e) => patch({ dorm: e.target.value })}>
            <option value="">Cualquiera</option>
            <option value="1">1 o más</option>
            <option value="2">2 o más</option>
            <option value="3">3 o más</option>
            <option value="4">4 o más</option>
          </select>
        </label>
      </div>

      <div className="ar-search__row2">
        <label className="ar-search__field">
          <span className="ar-search__label">Moneda</span>
          <select value={hero.currency} onChange={(e) => patch({ currency: e.target.value })}>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </label>
        <label className="ar-search__field">
          <span className="ar-search__label">Precio desde</span>
          <input type="number" value={hero.min} onChange={(e) => patch({ min: e.target.value })} placeholder="0" />
        </label>
        <label className="ar-search__field">
          <span className="ar-search__label">Hasta</span>
          <input type="number" value={hero.max} onChange={(e) => patch({ max: e.target.value })} placeholder="Sin tope" />
        </label>
        <button className="ar-search__submit" onClick={buscar}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          Buscar
        </button>
      </div>
    </div>
  );
}
