import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import Logo from '../../components/Logo.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api.login(email, password);
      login(token, user);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login__box">
        <div className="adm-login__logo">
          <Logo size={36} color="#1B36A8" />
          <div className="adm-login__logo-text">
            <span className="adm-login__logo-name">ARANGUE</span>
            <span className="adm-login__logo-sub">PANEL ADMIN</span>
          </div>
        </div>

        <h1 className="adm-login__title">Iniciar sesión</h1>
        <p className="adm-login__sub">Accedé al panel de administración.</p>

        <form className="adm-login__form" onSubmit={handleSubmit}>
          {error && <div className="adm-login__error">{error}</div>}
          <div>
            <label className="adm-login__label">Email</label>
            <input className="adm-login__input" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus placeholder="admin@arangue.com" />
          </div>
          <div>
            <label className="adm-login__label">Contraseña</label>
            <input className="adm-login__input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button className="adm-login__submit" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
