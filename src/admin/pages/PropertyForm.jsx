import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

const TIPOS = ['Casa', 'Departamento', 'Terreno', 'Local', 'Campo', 'Galpón'];
const MONEDAS = ['USD', 'ARS'];
const OPERACIONES = ['Venta', 'Alquiler'];
const ESTADOS = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'reservado',  label: 'Reservado' },
  { value: 'vendido',    label: 'Vendido' },
];

const EMPTY = {
  titulo: '', descripcion: '', precio: '', moneda: 'USD', zona: '',
  direccion: '', tipo: '', operacion: 'Venta', dormitorios: '', banos: '',
  m2_cubiertos: '', m2_totales: '', cochera: false, pileta: false, estado: 'disponible',
};

export default function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(EMPTY);
  const [photos, setPhotos] = useState([]);
  const [pending, setPending] = useState([]);        // files selected but not yet uploaded
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    if (!isEdit) return;
    api.getProperty(id)
      .then(data => {
        setForm({
          titulo: data.titulo || '', descripcion: data.descripcion || '',
          precio: data.precio ?? '', moneda: data.moneda || 'USD', zona: data.zona || '',
          direccion: data.direccion || '', tipo: data.tipo || '', operacion: data.operacion || 'Venta',
          dormitorios: data.dormitorios ?? '', banos: data.banos ?? '',
          m2_cubiertos: data.m2_cubiertos ?? '', m2_totales: data.m2_totales ?? '',
          cochera: !!data.cochera, pileta: !!data.pileta, estado: data.estado || 'disponible',
        });
        setPhotos(data.fotos || []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        precio: form.precio !== '' ? Number(form.precio) : null,
        dormitorios: form.dormitorios !== '' ? Number(form.dormitorios) : null,
        banos: form.banos !== '' ? Number(form.banos) : null,
        m2_cubiertos: form.m2_cubiertos !== '' ? Number(form.m2_cubiertos) : null,
        m2_totales: form.m2_totales !== '' ? Number(form.m2_totales) : null,
      };
      if (isEdit) {
        await api.updateProperty(id, payload);
        setSuccess('Propiedad actualizada correctamente.');
      } else {
        const { id: newId } = await api.createProperty(payload);
        navigate(`/admin/propiedades/${newId}/editar`, { replace: true });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async () => {
    if (!pending.length) return;
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      pending.forEach(f => fd.append('photos', f));
      const updated = await api.uploadPhotos(id, fd);
      setPhotos(updated);
      setPending([]);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!confirm('¿Eliminar esta foto?')) return;
    try {
      await api.deletePhoto(photoId);
      setPhotos(ps => ps.filter(p => p.id !== photoId));
    } catch (e) { setError(e.message); }
  };

  const movePhoto = async (index, dir) => {
    const next = [...photos];
    const swapIdx = index + dir;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    const reordered = next.map((p, i) => ({ ...p, orden: i }));
    setPhotos(reordered);
    try {
      await api.reorderPhotos(reordered.map(p => ({ id: p.id, orden: p.orden })));
    } catch (e) { setError(e.message); }
  };

  if (loading) return <div className="adm-empty">Cargando...</div>;

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <h1>{isEdit ? 'Editar propiedad' : 'Nueva propiedad'}</h1>
          <p>{isEdit ? `ID #${id}` : 'Completá los datos y guardá.'}</p>
        </div>
        <Link to="/admin/propiedades" className="adm-btn adm-btn--secondary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver
        </Link>
      </div>

      {error && <div className="adm-alert adm-alert--error">{error}</div>}
      {success && <div className="adm-alert adm-alert--success">{success}</div>}

      <form className="adm-form" onSubmit={handleSave}>

        {/* DATOS PRINCIPALES */}
        <div className="adm-card">
          <div className="adm-card__head"><h2>Datos de la propiedad</h2></div>
          <div className="adm-card__body">
            <div className="adm-form-grid" style={{ gap: 20 }}>

              <div className="adm-form-row adm-form-row--full">
                <label>Título *</label>
                <input type="text" value={form.titulo} onChange={set('titulo')} required placeholder="Ej: Casa 3 dormitorios con jardín" />
              </div>

              <div className="adm-form-row adm-form-row--full">
                <label>Descripción</label>
                <textarea rows={4} value={form.descripcion} onChange={set('descripcion')} placeholder="Descripción detallada de la propiedad…" />
              </div>

              <div className="adm-form-row">
                <label>Tipo de propiedad</label>
                <select value={form.tipo} onChange={set('tipo')}>
                  <option value="">— Seleccioná —</option>
                  {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="adm-form-row">
                <label>Operación</label>
                <select value={form.operacion} onChange={set('operacion')}>
                  {OPERACIONES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div className="adm-form-row">
                <label>Precio</label>
                <input type="number" value={form.precio} onChange={set('precio')} min={0} placeholder="0" />
              </div>

              <div className="adm-form-row">
                <label>Moneda</label>
                <select value={form.moneda} onChange={set('moneda')}>
                  {MONEDAS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="adm-form-row">
                <label>Zona / Barrio</label>
                <input type="text" value={form.zona} onChange={set('zona')} placeholder="Ej: Cañada de Gómez, Puerto Norte…" />
              </div>

              <div className="adm-form-row">
                <label>Dirección</label>
                <input type="text" value={form.direccion} onChange={set('direccion')} placeholder="Ej: Av. Rivadavia 540" />
              </div>

            </div>
          </div>
        </div>

        {/* CARACTERÍSTICAS */}
        <div className="adm-card">
          <div className="adm-card__head"><h2>Características</h2></div>
          <div className="adm-card__body">
            <div className="adm-form-grid adm-form-grid--3" style={{ gap: 18 }}>

              <div className="adm-form-row">
                <label>Dormitorios</label>
                <input type="number" value={form.dormitorios} onChange={set('dormitorios')} min={0} placeholder="—" />
              </div>

              <div className="adm-form-row">
                <label>Baños</label>
                <input type="number" value={form.banos} onChange={set('banos')} min={0} placeholder="—" />
              </div>

              <div className="adm-form-row">
                <label>M² cubiertos</label>
                <input type="number" value={form.m2_cubiertos} onChange={set('m2_cubiertos')} min={0} placeholder="—" />
              </div>

              <div className="adm-form-row">
                <label>M² totales</label>
                <input type="number" value={form.m2_totales} onChange={set('m2_totales')} min={0} placeholder="—" />
              </div>

              <div className="adm-form-row">
                <label>Estado</label>
                <select value={form.estado} onChange={set('estado')}>
                  {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', paddingTop: 8 }}>
                <div className="adm-form-check">
                  <input id="cochera" type="checkbox" checked={form.cochera} onChange={set('cochera')} />
                  <label htmlFor="cochera">Cochera</label>
                </div>
                <div className="adm-form-check">
                  <input id="pileta" type="checkbox" checked={form.pileta} onChange={set('pileta')} />
                  <label htmlFor="pileta">Pileta</label>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="adm-form-actions">
          <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear propiedad'}
          </button>
          <Link to="/admin/propiedades" className="adm-btn adm-btn--secondary">Cancelar</Link>
        </div>

      </form>

      {/* FOTOS — solo disponible en modo edición */}
      {isEdit && (
        <div className="adm-card" style={{ marginTop: 28 }}>
          <div className="adm-card__head">
            <h2>Fotos ({photos.length}/15)</h2>
          </div>
          <div className="adm-card__body">

            {photos.length > 0 && (
              <div className="adm-photos-grid">
                {photos.map((ph, i) => (
                  <div key={ph.id} className="adm-photo-item">
                    <img src={ph.url_foto} alt={`Foto ${i + 1}`} />
                    <span className="adm-photo-item__order">{i + 1}</span>
                    <div className="adm-photo-item__actions">
                      <button className="adm-photo-item__btn" onClick={() => movePhoto(i, -1)} disabled={i === 0} title="Mover arriba">↑</button>
                      <button className="adm-photo-item__btn" onClick={() => movePhoto(i, 1)} disabled={i === photos.length - 1} title="Mover abajo">↓</button>
                      <button className="adm-photo-item__btn adm-photo-item__btn--del" onClick={() => handleDeletePhoto(ph.id)} title="Eliminar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {photos.length < 15 && (
              <div className="adm-photo-upload">
                <input
                  ref={fileRef}
                  type="file"
                  id="photo-input"
                  accept="image/*"
                  multiple
                  onChange={e => setPending(Array.from(e.target.files))}
                />
                <label htmlFor="photo-input">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Seleccionar fotos
                </label>
                <span className="adm-photo-count">Podés subir hasta {15 - photos.length} fotos más · Máx. 10 MB por foto</span>

                {pending.length > 0 && (
                  <>
                    <div className="adm-photo-previews">
                      {pending.map((f, i) => (
                        <img key={i} className="adm-photo-preview" src={URL.createObjectURL(f)} alt={f.name} />
                      ))}
                    </div>
                    <button type="button" className="adm-btn adm-btn--primary" onClick={handleUpload} disabled={uploading}>
                      {uploading ? 'Subiendo…' : `Subir ${pending.length} foto${pending.length > 1 ? 's' : ''}`}
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {!isEdit && (
        <div className="adm-alert" style={{ background: '#EFF6FF', color: '#1D4ED8', marginTop: 20, fontSize: 14 }}>
          Después de crear la propiedad podrás agregar fotos desde la pantalla de edición.
        </div>
      )}
    </div>
  );
}
