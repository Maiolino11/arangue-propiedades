import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PROPERTIES, GALLERY_INTERIORS, STATUS_MAP, FEATURES_BY_TYPE } from '../data/properties.js';
import { whatsappLink, mailtoLink } from '../data/site.js';
import PropertyCard from '../components/PropertyCard.jsx';
import Logo from '../components/Logo.jsx';
import './PropertyDetail.css';

export default function PropertyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const sel = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];
  const [gi, setGi] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    setGi(0);
    setForm({
      name: '',
      email: '',
      phone: '',
      message: `Hola, me interesa esta propiedad (${sel.title}). Quisiera coordinar una visita.`,
    });
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Consulta por: ${sel.title}`;
    const body = `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\n\n${form.message}`;
    window.location.href = mailtoLink({ subject, body });
  };

  const gallery = [sel.img, ...GALLERY_INTERIORS].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
  const activeIndex = Math.min(gi, gallery.length - 1);

  const selSpecs = [];
  if (sel.beds) selSpecs.push({ value: sel.beds, label: 'Dormitorios' });
  if (sel.baths) selSpecs.push({ value: sel.baths, label: 'Baños' });
  selSpecs.push({ value: sel.area, label: 'Superficie' });

  const stm = STATUS_MAP[sel.status];
  const selFeatures = FEATURES_BY_TYPE[sel.type] || [];

  let similar = PROPERTIES.filter((p) => p.slug !== sel.slug && (p.type === sel.type || p.zona === sel.zona)).slice(0, 3);
  if (similar.length < 3) {
    const extra = PROPERTIES.filter((p) => p.slug !== sel.slug && similar.indexOf(p) === -1).slice(0, 3 - similar.length);
    similar = similar.concat(extra);
  }

  return (
    <div className="ar-detail">
      <div className="ar-detail__breadcrumb">
        <Link to="/">Inicio</Link><span>/</span>
        <Link to="/propiedades">Propiedades</Link><span>/</span>
        <span className="current">{sel.title}</span>
      </div>

      <button className="ar-detail__back" onClick={() => navigate(-1)}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Volver
      </button>

      <div className="ar-detail__grid">
        <div>
          <div className="ar-detail__main-img">
            <img src={gallery[activeIndex]} alt={sel.title} />
            {stm && (
              <span className="ar-detail__badge" style={{ background: stm.bg, color: stm.color }}>{stm.label}</span>
            )}
          </div>
          <div className="ar-detail__thumbs">
            {gallery.map((src, i) => (
              <button key={src} className={`ar-detail__thumb${i === activeIndex ? ' is-active' : ''}`} onClick={() => setGi(i)}>
                <img src={src} alt="Vista" />
              </button>
            ))}
          </div>
        </div>

        <div className="ar-detail__info">
          <span className="ar-detail__type-op">{sel.type} · {sel.op}</span>
          <div className="ar-detail__price">{sel.price}</div>
          <h1 className="ar-detail__title">{sel.title}</h1>
          <div className="ar-detail__loc">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {sel.loc}
          </div>
          <div className="ar-detail__specs">
            {selSpecs.map((sp) => (
              <div key={sp.label} className="ar-detail__spec">
                <div className="ar-detail__spec-value">{sp.value}</div>
                <div className="ar-detail__spec-label">{sp.label}</div>
              </div>
            ))}
          </div>
          <div className="ar-detail__ctas">
            <a href={whatsappLink(`Hola! Quisiera más información sobre esta propiedad: ${sel.title}.`)} target="_blank" rel="noopener noreferrer" className="ar-detail__cta-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="ar-detail__grid">
        <div>
          <h2 className="ar-detail__h2">Descripción</h2>
          <p className="ar-detail__desc">{sel.desc}</p>

          <h2 className="ar-detail__h2 ar-detail__h2--spaced">Características</h2>
          <div className="ar-detail__features">
            {selFeatures.map((ft) => (
              <div key={ft} className="ar-detail__feature">
                <span className="ar-detail__feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span className="ar-detail__feature-text">{ft}</span>
              </div>
            ))}
          </div>

          <h2 className="ar-detail__h2 ar-detail__h2--spaced">Ubicación</h2>
          <div className="ar-detail__map">
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: .5 }} aria-hidden="true">
              <defs><pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" fill="none" stroke="#C9D4EC" strokeWidth="1" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M-20 180 Q 300 120 620 200 T 1300 170" fill="none" stroke="#B7C5E6" strokeWidth="6" />
            </svg>
            <div className="ar-detail__map-pin">
              <span className="ar-detail__map-pin-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
              </span>
            </div>
            <div className="ar-detail__map-card">
              <div className="ar-detail__map-address">{sel.address}</div>
              <div className="ar-detail__map-loc">{sel.loc} · Ubicación aproximada</div>
            </div>
          </div>
        </div>

        <aside className="ar-detail__contact">
          <h3>Consultá por esta propiedad</h3>
          <p>Te respondemos a la brevedad.</p>
          <form className="ar-detail__form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre y apellido" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <input type="tel" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <textarea rows="3" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
            <button type="submit">Enviar consulta</button>
          </form>
          <div className="ar-detail__agent">
            <span className="ar-detail__agent-avatar"><Logo size={24} /></span>
            <div>
              <div className="ar-detail__agent-name">Equipo Arangue</div>
              <div className="ar-detail__agent-role">Asesores · Matrícula COCIR 2601</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="ar-detail__similar">
        <h2>Propiedades similares</h2>
        <div className="ar-grid-3">
          {similar.map((item) => <PropertyCard key={item.slug} item={item} />)}
        </div>
      </div>
    </div>
  );
}
