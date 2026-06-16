import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../../components/Logo.jsx';

const links = [
  { to: '/admin', label: 'Dashboard', exact: true, icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  )},
  { to: '/admin/propiedades', label: 'Propiedades', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  )},
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__logo">
          <Logo size={34} color="#fff" />
          <div className="adm-sidebar__brand">
            <span className="adm-sidebar__brand-name">ARANGUE</span>
            <span className="adm-sidebar__brand-sub">Panel Admin</span>
          </div>
        </div>

        <nav className="adm-sidebar__nav">
          {links.map(({ to, label, exact, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) => `adm-sidebar__link${isActive ? ' is-active' : ''}`}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="adm-sidebar__logout" onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Cerrar sesión
        </button>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <span className="adm-topbar__greeting">Hola, {user?.nombre || user?.email}</span>
        </header>
        <div className="adm-content">{children}</div>
      </div>
    </div>
  );
}
