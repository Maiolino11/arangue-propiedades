import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Logo from './Logo.jsx';
import NavAnchor from './NavAnchor.jsx';
import './Header.css';

const A_GRADIENT = 'linear-gradient(95deg,#142C8C 0%, #1B36A8 52%, #2348C4 100%)';

export default function Header() {
  const { isA, isB } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isListado = location.pathname.startsWith('/propiedades');
  const isDetalle = location.pathname.startsWith('/propiedad/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const overHero = isB && isHome;
  const navTransparent = overHero && !scrolled && !menuOpen;
  const navBg = isA ? A_GRADIENT : navTransparent ? 'transparent' : '#0A1530';
  const navBorder = navTransparent
    ? '1px solid transparent'
    : isA ? '1px solid rgba(255,255,255,.10)' : '1px solid rgba(255,255,255,.08)';

  const subColor = isA ? '#AFC1F0' : '#9DB1E8';
  const phoneIcon = isA ? '#AFC1F0' : '#5C8BFF';
  const ctaBg = '#fff';
  const ctaColor = isA ? '#1B36A8' : '#15233F';

  const menuBg = isA ? '#FFFFFF' : '#0A1530';
  const menuLinkColor = isA ? '#1B2A4E' : 'rgba(255,255,255,.92)';
  const menuDivider = isA ? '#F0F2F7' : 'rgba(255,255,255,.08)';
  const menuCtaBg = isA ? '#1B36A8' : '#fff';
  const menuCtaColor = isA ? '#fff' : '#15233F';
  const menuPhoneBorder = isA ? '#C9D2EC' : 'rgba(255,255,255,.2)';
  const menuPhoneColor = isA ? '#1B36A8' : '#fff';

  const spacerBg = isA ? (isListado ? '#FFFFFF' : isHome ? '#E9EEFE' : '#F6F7FA') : '#0A1530';

  const vars = {
    '--nav-bg': navBg,
    '--nav-border': navBorder,
    '--sub-color': subColor,
    '--phone-icon': phoneIcon,
    '--cta-bg': ctaBg,
    '--cta-color': ctaColor,
    '--menu-bg': menuBg,
    '--menu-link-color': menuLinkColor,
    '--menu-divider': menuDivider,
    '--menu-cta-bg': menuCtaBg,
    '--menu-cta-color': menuCtaColor,
    '--menu-phone-border': menuPhoneBorder,
    '--menu-phone-color': menuPhoneColor,
    '--spacer-bg': spacerBg,
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="ar-header" style={vars}>
        <nav className="ar-header__nav">
          <Link to="/" className="ar-header__logo">
            <Logo size={38} color="#fff" />
            <span className="ar-header__brand">
              <span className="ar-header__brand-name">ARANGUE</span>
              <span className="ar-header__brand-sub">PROPIEDADES</span>
            </span>
          </Link>

          <div className="ar-header__links">
            <Link to="/" className={`ar-header__link${isHome ? ' is-active' : ''}`}>Inicio</Link>
            <Link to="/propiedades" className={`ar-header__link${isListado || isDetalle ? ' is-active' : ''}`}>Propiedades</Link>
            <NavAnchor id="zonas" className="ar-header__link">Zonas</NavAnchor>
            <NavAnchor id="tasacion" className="ar-header__link">Tasaciones</NavAnchor>
            <NavAnchor id="contacto" className="ar-header__link">Contacto</NavAnchor>
          </div>

          <div className="ar-header__right">
            <a href="tel:3471595464" className="ar-header__phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              3471-595464
            </a>
            <NavAnchor id="contacto" className="ar-header__cta">Publicá tu propiedad</NavAnchor>
          </div>

          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Menú" className="ar-header__hamburger">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </nav>
      </header>

      <div className={`ar-spacer${overHero ? ' is-hidden' : ''}`} style={vars} />

      {menuOpen && (
        <div className="ar-mobile-menu" style={vars}>
          <Link to="/" onClick={closeMenu} className="ar-mobile-menu__link">Inicio</Link>
          <Link to="/propiedades" onClick={closeMenu} className="ar-mobile-menu__link">Propiedades</Link>
          <NavAnchor id="zonas" onClick={closeMenu} className="ar-mobile-menu__link">Zonas</NavAnchor>
          <NavAnchor id="tasacion" onClick={closeMenu} className="ar-mobile-menu__link">Tasaciones</NavAnchor>
          <NavAnchor id="contacto" onClick={closeMenu} className="ar-mobile-menu__link">Contacto</NavAnchor>
          <a href="tel:3471595464" onClick={closeMenu} className="ar-mobile-menu__phone">Llamar 3471-595464</a>
          <NavAnchor id="contacto" onClick={closeMenu} className="ar-mobile-menu__cta">Publicá tu propiedad</NavAnchor>
        </div>
      )}
    </>
  );
}
