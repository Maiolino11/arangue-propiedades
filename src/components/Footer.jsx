import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import NavAnchor from './NavAnchor.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contacto" className="ar-footer">
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
            <NavAnchor id="tasacion">Tasaciones</NavAnchor>
            <NavAnchor id="zonas">Zonas</NavAnchor>
            <NavAnchor id="contacto">Publicá con nosotros</NavAnchor>
          </div>
        </div>

        <div>
          <h4>Contacto</h4>
          <div className="ar-footer__contact">
            <a href="tel:3471595464" className="ar-footer__contact-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              3471-595464
            </a>
            <span className="ar-footer__contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#5C8BFF" stroke="none" /></svg>
              @aranguepropiedades
            </span>
            <span className="ar-footer__contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#5C8BFF"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
              Arangue Propiedades
            </span>
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
