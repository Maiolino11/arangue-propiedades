import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const ESTADO_LABEL = { disponible: 'Disponible', reservado: 'Reservado', vendido: 'Vendido' };

const fmt = (p, m) => p ? `${m === 'USD' ? 'USD ' : '$ '}${Number(p).toLocaleString('es-AR')}` : '—';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.dashboard().then(setData).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="adm-alert adm-alert--error">{error}</div>;
  if (!data) return <div className="adm-empty">Cargando...</div>;

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Resumen general del sistema</p>
        </div>
        <Link to="/admin/propiedades/nueva" className="adm-btn adm-btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Nueva propiedad
        </Link>
      </div>

      <div className="adm-stats">
        <div className="adm-stat adm-stat--blue">
          <div className="adm-stat__label">Total propiedades</div>
          <div className="adm-stat__value">{data.total}</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__label">Disponibles</div>
          <div className="adm-stat__value">{data.disponibles}</div>
        </div>
        <div className="adm-stat adm-stat--orange">
          <div className="adm-stat__label">Reservadas</div>
          <div className="adm-stat__value">{data.reservadas}</div>
        </div>
        <div className="adm-stat adm-stat--gray">
          <div className="adm-stat__label">Vendidas / alquiladas</div>
          <div className="adm-stat__value">{data.vendidas}</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card__head">
          <h2>Últimas propiedades cargadas</h2>
          <Link to="/admin/propiedades" className="adm-btn adm-btn--secondary adm-btn--sm">Ver todas</Link>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.recientes.map(p => (
                <tr key={p.id}>
                  <td><Link to={`/admin/propiedades/${p.id}/editar`} style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>{p.titulo}</Link></td>
                  <td style={{ color: '#64748B' }}>{p.tipo || '—'}</td>
                  <td style={{ fontWeight: 700 }}>{fmt(p.precio, p.moneda)}</td>
                  <td><span className={`adm-badge adm-badge--${p.estado}`}>{ESTADO_LABEL[p.estado] || p.estado}</span></td>
                  <td style={{ color: '#94A3B8', fontSize: 13 }}>{new Date(p.fecha_carga).toLocaleDateString('es-AR')}</td>
                </tr>
              ))}
              {data.recientes.length === 0 && (
                <tr><td colSpan={5} className="adm-empty">No hay propiedades cargadas aún.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
