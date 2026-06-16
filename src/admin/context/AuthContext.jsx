import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('adm_token') || null);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adm_user')); } catch { return null; }
  });

  const login = (tok, usr) => {
    localStorage.setItem('adm_token', tok);
    localStorage.setItem('adm_user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
  };

  const logout = () => {
    localStorage.removeItem('adm_token');
    localStorage.removeItem('adm_user');
    setToken(null);
    setUser(null);
  };

  return <Ctx.Provider value={{ token, user, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
