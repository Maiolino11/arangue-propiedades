import { Link } from 'react-router-dom';
import './PageHeader.css';

export default function PageHeader({ title, subtitle, crumb }) {
  return (
    <section className="ar-page-header">
      <div className="ar-section ar-page-header__inner">
        <div className="ar-page-header__breadcrumb">
          <Link to="/">Inicio</Link><span>/</span><span className="current">{crumb}</span>
        </div>
        <h1 className="ar-page-header__title">{title}</h1>
        {subtitle && <p className="ar-page-header__subtitle">{subtitle}</p>}
      </div>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="ar-page-header__wave">
        <path d="M0 40 C 360 4, 720 4, 1080 36 C 1260 52, 1350 56, 1440 40 L1440 80 L0 80 Z" fill="#F6F7FA" />
      </svg>
    </section>
  );
}
