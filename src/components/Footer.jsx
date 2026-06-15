import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import NavAnchor from './NavAnchor.jsx';
import { whatsappLink, INSTAGRAM_URL, FACEBOOK_URL } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="ar-footer">
      <div className="ar-footer__top">
        <div>
          <div className="ar-footer__brand">
            <Logo size={38} color="#fff" />
            <span className="ar-footer__brand-text">
              <span className="ar-footer__brand-name">ARANGUE</span>
              <span className="ar-footer__brand-sub">PROPIEDADES</span>
            </span>
          </div>
          <p className="ar-footer__about">Inmobiliaria en Cañada de Gómez, Santa Fe. Operamos en toda la región con matrícula COCIR 2601.</p>
        </div>

        <div>
          <h4>Propiedades</h4>
          <div className="ar-footer__links">
            <Link to="/propiedades">Casas</Link>
            <Link to="/propiedades">Departamentos</Link>
            <Link to="/propiedades">Terrenos y lotes</Link>
            <Link to="/propiedades">Campos y galpones</Link>
          </div>
        </div>

        <div>
          <h4>Empresa</h4>
          <div className="ar-footer__links">
            <Link to="/">Inicio</Link>
            <Link to="/empresa">Quiénes somos</Link>
            <Link to="/tasaciones">Tasaciones</Link>
            <NavAnchor id="zonas">Zonas</NavAnchor>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>

        <div>
          <h4>Contacto</h4>
          <div className="ar-footer__contact">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ar-footer__contact-row ar-footer__contact-row--link" aria-label="Escribinos por WhatsApp">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#5C8BFF" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ar-footer__contact-row ar-footer__contact-row--link" aria-label="Seguinos en Instagram">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5C8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#5C8BFF" stroke="none" /></svg>
              @aranguepropiedades
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="ar-footer__contact-row ar-footer__contact-row--link" aria-label="Seguinos en Facebook">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#5C8BFF" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
              Arangue Propiedades
            </a>
          </div>
        </div>
      </div>

      <div className="ar-footer__bottom-wrap">
        <div className="ar-footer__bottom">
          <span>© 2026 Arangue Propiedades · Matrícula COCIR 2601</span>
          <span>Cañada de Gómez · Las Parejas · Armstrong · Rosario</span>
        </div>
      </div>
    </footer>
  );
}
