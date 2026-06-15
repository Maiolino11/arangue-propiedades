import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { whatsappLink } from '../data/site.js';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isListado = location.pathname.startsWith('/propiedades') || location.pathname.startsWith('/propiedad/');
  const isEmpresa = location.pathname.startsWith('/empresa');
  const isTasaciones = location.pathname.startsWith('/tasaciones');
  const isContacto = location.pathname.startsWith('/contacto');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const overHero = isHome;
  const navTransparent = overHero && !scrolled && !menuOpen;
  const navBg = navTransparent ? 'transparent' : '#0A1530';
  const navBorder = navTransparent ? '1px solid transparent' : '1px solid rgba(255,255,255,.08)';

  const vars = {
    '--nav-bg': navBg,
    '--nav-border': navBorder,
    '--spacer-bg': '#0A1530',
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="ar-header" style={vars}>
        <nav className="ar-header__nav">
          <Link to="/" className="ar-header__logo">
            <Logo size={42} color="#fff" />
            <span className="ar-header__brand">
              <span className="ar-header__brand-name">ARANGUE</span>
              <span className="ar-header__brand-sub">PROPIEDADES</span>
            </span>
          </Link>

          <div className="ar-header__links">
            <Link to="/" className={`ar-header__link${isHome ? ' is-active' : ''}`}>Inicio</Link>
            <Link to="/propiedades" className={`ar-header__link${isListado ? ' is-active' : ''}`}>Propiedades</Link>
            <Link to="/empresa" className={`ar-header__link${isEmpresa ? ' is-active' : ''}`}>Empresa</Link>
            <Link to="/tasaciones" className={`ar-header__link${isTasaciones ? ' is-active' : ''}`}>Tasaciones</Link>
            <Link to="/contacto" className={`ar-header__link${isContacto ? ' is-active' : ''}`}>Contacto</Link>
          </div>

          <div className="ar-header__right">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ar-header__whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
              WhatsApp
            </a>
          </div>

          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Menú" className="ar-header__hamburger">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </nav>
      </header>

      <div className={`ar-spacer${overHero ? ' is-hidden' : ''}`} style={vars} />

      {menuOpen && (
        <div className="ar-mobile-menu" style={vars}>
          <Link to="/" onClick={closeMenu} className="ar-mobile-menu__link">Inicio</Link>
          <Link to="/propiedades" onClick={closeMenu} className="ar-mobile-menu__link">Propiedades</Link>
          <Link to="/empresa" onClick={closeMenu} className="ar-mobile-menu__link">Empresa</Link>
          <Link to="/tasaciones" onClick={closeMenu} className="ar-mobile-menu__link">Tasaciones</Link>
          <Link to="/contacto" onClick={closeMenu} className="ar-mobile-menu__link">Contacto</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="ar-mobile-menu__cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.5 0 12.08 0a11.82 11.82 0 0 1 8.42 3.49 11.78 11.78 0 0 1 3.5 8.42c0 6.57-5.37 11.9-11.95 11.9a12 12 0 0 1-5.72-1.46zm6.63-3.79c1.74.99 3 1.18 4.39 1.18 5.46 0 9.9-4.42 9.9-9.86a9.8 9.8 0 0 0-2.9-7 9.74 9.74 0 0 0-6.99-2.9C6.6 1.63 2.16 6.05 2.16 11.5a9.8 9.8 0 0 0 1.5 5.23l-.99 3.62z" /></svg>
            Escribinos por WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
