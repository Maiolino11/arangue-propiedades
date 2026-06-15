import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { whatsappLink, mailtoLink } from '../data/site.js';
import { TYPES, ZONA_NAMES } from '../data/properties.js';
import './Tasaciones.css';

const STEPS = [
  {
    title: 'Contanos sobre tu propiedad',
    text: 'Completá el formulario con los datos básicos o escribinos directamente por WhatsApp.',
  },
  {
    title: 'Coordinamos una visita',
    text: 'Un asesor matriculado visita la propiedad y analiza el mercado de la zona.',
  },
  {
    title: 'Recibís tu informe',
    text: 'Te entregamos una tasación detallada con el valor de mercado, sin cargo y sin compromiso.',
  },
];

export default function Tasaciones() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', zona: '', address: '', message: '' });

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = 'Solicitud de tasación';
    const body = `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\nTipo de propiedad: ${form.type}\nZona: ${form.zona}\nDirección: ${form.address}\n\n${form.message}`;
    window.location.href = mailtoLink({ subject, body });
  };

  return (
    <div>
      <PageHeader
        crumb="Tasaciones"
        title="Tasación gratuita de tu propiedad"
        subtitle="Conocé el valor real de tu casa, departamento, terreno o campo con un informe profesional, sin cargo y sin compromiso."
      />

      <section className="ar-tasaciones ar-section">
        <div className="ar-tasaciones__steps ar-grid-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="ar-tasaciones__step">
              <span className="ar-tasaciones__step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="ar-tasaciones__grid">
          <form className="ar-tasaciones__form" onSubmit={handleSubmit}>
            <h2 className="ar-tasaciones__form-title">Solicitar tasación</h2>
            <p className="ar-tasaciones__form-lead">Dejanos tus datos y nos pondremos en contacto a la brevedad.</p>
            <div className="ar-tasaciones__row">
              <input type="text" placeholder="Nombre y apellido" required value={form.name} onChange={handleChange('name')} />
              <input type="email" placeholder="Email" required value={form.email} onChange={handleChange('email')} />
            </div>
            <div className="ar-tasaciones__row">
              <input type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange('phone')} />
              <select value={form.type} onChange={handleChange('type')}>
                <option value="">Tipo de propiedad</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="ar-tasaciones__row">
              <select value={form.zona} onChange={handleChange('zona')}>
                <option value="">Zona</option>
                {ZONA_NAMES.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
              <input type="text" placeholder="Dirección" value={form.address} onChange={handleChange('address')} />
            </div>
            <textarea rows="3" placeholder="Contanos más sobre la propiedad" value={form.message} onChange={handleChange('message')} />
            <button type="submit">Solicitar tasación</button>
          </form>

          <aside className="ar-tasaciones__info">
            <h3>¿Por qué tasar con nosotros?</h3>
            <ul className="ar-tasaciones__list">
              <li>Más de una década de experiencia en el mercado regional</li>
              <li>Asesores matriculados (COCIR 2601)</li>
              <li>Informe con valor de mercado real, sin cargo</li>
              <li>Sin compromiso de venta ni alquiler</li>
            </ul>
            <a href={whatsappLink('Hola! Quisiera solicitar la tasación de mi propiedad.')} target="_blank" rel="noopener noreferrer" className="ar-tasaciones__whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              Solicitar por WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
