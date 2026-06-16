import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const ESTADOS = ['disponible', 'reservado', 'vendido'];
const ESTADO_LABEL = { disponible: 'Disponible', reservado: 'Reservado', vendido: 'Vendido' };
const fmt = (p, m) => p ? `${m === 'USD' ? 'USD ' : '$ '}${Number(p).toLocaleString('es-AR')}` : '—';

export default function Properties() {
  const [props, setProps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  const load = () => {
    setLoading(true);
    api.getProperties()
      .then(setProps)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatus = async (id, estado) => {
    try {
      await api.updateStatus(id, estado);
      setProps(ps => ps.map(p => p.id === id ? { ...p, estado } : p));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (!confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return;
    try {
      await api.deleteProperty(id);
      setProps(ps => ps.filter(p => p.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered = props.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.titulo?.toLowerCase().includes(q) || p.zona?.toLowerCase().includes(q) || p.direccion?.toLowerCase().includes(q);
    const matchE = !filterEstado || p.estado === filterEstado;
    return matchQ && matchE;
  });

  if (loading) return <div className="adm-empty">Cargando propiedades...</div>;
  if (error) return <div className="adm-alert adm-alert--error">{error}</div>;

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <h1>Propiedades</h1>
          <p>{props.length} propiedades en total</p>
        </div>
        <Link to="/admin/propiedades/nueva" className="adm-btn adm-btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Nueva propiedad
        </Link>
      </div>

      <div className="adm-card">
        <div className="adm-card__head">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
            <input
              type="search" placeholder="Buscar por título, zona o dirección…"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: '8px 12px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontFamily: 'inherit', fontSize: 14, outline: 'none' }}
            />
            <select
              value={filterEstado} onChange={e => setFilterEstado(e.target.value)}
              style={{ padding: '8px 12px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontFamily: 'inherit', fontSize: 14, outline: 'none', background: '#fff' }}
            >
              <option value="">Todos los estados</option>
              {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABEL[e]}</option>)}
            </select>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Propiedad</th>
                <th>Tipo / Operación</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.foto_principal
                      ? <img className="adm-table__thumb" src={p.foto_principal} alt={p.titulo} />
                      : <div className="adm-table__no-img"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    }
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{p.titulo}</div>
                    <div style={{ fontSize: 12.5, color: '#94A3B8' }}>{p.zona || p.direccion || '—'}</div>
                  </td>
                  <td style={{ color: '#475569' }}>{[p.tipo, p.operacion].filter(Boolean).join(' · ') || '—'}</td>
                  <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(p.precio, p.moneda)}</td>
                  <td>
                    <select
                      className="adm-status-select"
                      value={p.estado}
                      onChange={e => handleStatus(p.id, e.target.value)}
                      style={{ color: p.estado === 'disponible' ? '#15803D' : p.estado === 'reservado' ? '#B45309' : '#4B5563' }}
                    >
                      {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABEL[e]}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="adm-table__actions">
                      <Link to={`/admin/propiedades/${p.id}/editar`} className="adm-btn adm-btn--secondary adm-btn--sm adm-btn--icon" title="Editar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Link>
                      <button className="adm-btn adm-btn--danger adm-btn--sm adm-btn--icon" title="Eliminar" onClick={() => handleDelete(p.id, p.titulo)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="adm-empty">
                  {search || filterEstado ? 'No hay resultados para esta búsqueda.' : 'No hay propiedades cargadas aún.'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
