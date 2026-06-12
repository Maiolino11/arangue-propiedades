import { useApp } from '../context/AppContext.jsx';
import { PROPERTIES, TYPES, ZONA_NAMES } from '../data/properties.js';
import './FiltersPanel.css';

const DORM_OPTIONS = [
  { label: 'Todos', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
];

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

export default function FiltersPanel({ isOpen }) {
  const { filters: f, setF, toggleArr, clearFilters } = useApp();

  const oportCount = PROPERTIES.filter((p) => p.status === 'oportunidad').length;

  return (
    <aside className={`ar-filters${isOpen ? ' is-open' : ''}`}>
      <div className="ar-filters__head">
        <span className="ar-filters__title">Filtros</span>
        <button className="ar-filters__clear" onClick={clearFilters}>Limpiar</button>
      </div>

      <button className={`ar-filters__oport-btn${f.oport ? ' is-active' : ''}`} onClick={() => setF({ oport: !f.oport })}>
        <span className="ar-filters__oport-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>
          Solo oportunidades
        </span>
        <span className="ar-filters__oport-count">{oportCount}</span>
      </button>

      <div className="ar-filters__section ar-filters__section--first">
        <span className="ar-filters__label">Tipo de operación</span>
        <div className="ar-filters__chips">
          {['Venta', 'Alquiler'].map((o) => (
            <button key={o} className={`ar-chip${f.op === o ? ' on' : ''}`} onClick={() => setF({ op: o })}>{o}</button>
          ))}
        </div>
      </div>

      <div className="ar-filters__section">
        <span className="ar-filters__label">Tipo de propiedad</span>
        <div className="ar-filters__checklist">
          {TYPES.map((t) => {
            const on = f.tipos.includes(t);
            const count = PROPERTIES.filter((p) => p.type === t).length;
            return (
              <button key={t} className="ar-filters__check-item" onClick={() => toggleArr('tipos', t)}>
                <span className={`ar-checkbox${on ? ' on' : ''}`}>{on && <CheckIcon />}</span>
                <span className="ar-filters__check-name">{t}</span>
                <span className="ar-filters__check-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ar-filters__section">
        <span className="ar-filters__label">Ubicación</span>
        <div className="ar-filters__checklist">
          {ZONA_NAMES.map((z) => {
            const on = f.zonas.includes(z);
            const count = PROPERTIES.filter((p) => p.zona === z).length;
            return (
              <button key={z} className="ar-filters__check-item" onClick={() => toggleArr('zonas', z)}>
                <span className={`ar-checkbox${on ? ' on' : ''}`}>{on && <CheckIcon />}</span>
                <span className="ar-filters__check-name">{z}</span>
                <span className="ar-filters__check-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ar-filters__section">
        <div className="ar-filters__price-head">
          <span className="ar-filters__label" style={{ margin: 0 }}>Rango de precio</span>
          <div className="ar-filters__currency-toggle">
            <button className={`ar-currency-btn${f.currency === 'USD' ? ' on' : ''}`} onClick={() => setF({ currency: 'USD' })}>USD</button>
            <button className={`ar-currency-btn${f.currency === 'ARS' ? ' on' : ''}`} onClick={() => setF({ currency: 'ARS' })}>ARS</button>
          </div>
        </div>
        <div className="ar-filters__price-inputs">
          <input type="number" className="ar-filters__price-input" value={f.min} onChange={(e) => setF({ min: e.target.value })} placeholder="Desde" />
          <span className="ar-filters__price-sep">—</span>
          <input type="number" className="ar-filters__price-input" value={f.max} onChange={(e) => setF({ max: e.target.value })} placeholder="Hasta" />
        </div>
      </div>

      <div className="ar-filters__section">
        <span className="ar-filters__label">Dormitorios</span>
        <div className="ar-filters__chips">
          {DORM_OPTIONS.map((d) => (
            <button key={d.label} className={`ar-chip${f.dorm === d.value ? ' on' : ''}`} onClick={() => setF({ dorm: d.value })}>{d.label}</button>
          ))}
        </div>
      </div>

      <div className="ar-filters__section">
        <button className="ar-filters__switch-row" onClick={() => setF({ credito: !f.credito })}>
          <span className="ar-filters__switch-label">Apto crédito</span>
          <span className={`ar-filters__switch-track${f.credito ? ' is-on' : ''}`}>
            <span className="ar-filters__switch-knob" />
          </span>
        </button>
      </div>

      <div className="ar-filters__section">
        <span className="ar-filters__label">Mostrar</span>
        <button className="ar-filters__check-item" onClick={() => setF({ verReservadas: !f.verReservadas })} style={{ width: '100%' }}>
          <span className={`ar-checkbox${f.verReservadas ? ' on' : ''}`}>{f.verReservadas && <CheckIcon />}</span>
          <span className="ar-filters__check-name">Propiedades reservadas</span>
        </button>
        <button className="ar-filters__check-item" onClick={() => setF({ verVendidas: !f.verVendidas })} style={{ width: '100%' }}>
          <span className={`ar-checkbox${f.verVendidas ? ' on' : ''}`}>{f.verVendidas && <CheckIcon />}</span>
          <span className="ar-filters__check-name">Propiedades vendidas</span>
        </button>
      </div>
    </aside>
  );
}
