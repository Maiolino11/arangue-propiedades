import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { whatsappLink, mailtoLink, CONTACT_EMAIL, INSTAGRAM_URL, FACEBOOK_URL } from '../data/site.js';
import './Contacto.css';

export default function Contacto() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = 'Consulta desde la web';
    const body = `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\n\n${form.message}`;
    window.location.href = mailtoLink({ subject, body });
  };

  return (
    <div>
      <PageHeader
        crumb="Contacto"
        title="Contacto"
        subtitle="¿Tenés dudas o querés más información sobre alguna propiedad? Escribinos, te respondemos a la brevedad."
      />

      <section className="ar-contacto ar-section">
        <div className="ar-contacto__grid">
          <form className="ar-contacto__form" onSubmit={handleSubmit}>
            <h2 className="ar-contacto__title">Envianos un mensaje</h2>
            <p className="ar-contacto__lead">Completá el formulario y te respondemos por email.</p>
            <input type="text" placeholder="Nombre y apellido" required value={form.name} onChange={handleChange('name')} />
            <input type="email" placeholder="Email" required value={form.email} onChange={handleChange('email')} />
            <input type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange('phone')} />
            <textarea rows="5" placeholder="Tu mensaje" required value={form.message} onChange={handleChange('message')} />
            <button type="submit">Enviar mensaje</button>
          </form>

          <aside className="ar-contacto__info">
            <h3>Otras formas de contacto</h3>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ar-contacto__whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              Escribinos por WhatsApp
            </a>

            <div className="ar-contacto__row">
              <span className="ar-contacto__row-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6 12 13 2 6" /><path d="M2 6h20v12H2z" /></svg>
              </span>
              <div>
                <div className="ar-contacto__row-label">Email</div>
                <a href={mailtoLink({})} className="ar-contacto__row-value">{CONTACT_EMAIL}</a>
              </div>
            </div>

            <div className="ar-contacto__row">
              <span className="ar-contacto__row-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              <div>
                <div className="ar-contacto__row-label">Zona de cobertura</div>
                <div className="ar-contacto__row-value">Cañada de Gómez · Las Parejas · Armstrong · Rosario</div>
              </div>
            </div>

            <div className="ar-contacto__row">
              <span className="ar-contacto__row-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </span>
              <div>
                <div className="ar-contacto__row-label">Horario de atención</div>
                <div className="ar-contacto__row-value">Lun a Vie 9 a 18 hs · Sáb 9 a 12 hs</div>
              </div>
            </div>

            <div className="ar-contacto__socials">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Instagram" className="ar-contacto__social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#1B36A8" stroke="none" /></svg>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Facebook" className="ar-contacto__social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1B36A8" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
