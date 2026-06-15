import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function defaultFilters() {
  return {
    op: 'Venta',
    tipos: [],
    zonas: [],
    currency: 'USD',
    min: '',
    max: '',
    dorm: 0,
    oport: false,
    verReservadas: true,
    verVendidas: true,
  };
}

export function AppProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters);

  const setF = useCallback((patch) => {
    setFilters((f) => ({ ...f, ...patch }));
  }, []);

  const toggleArr = useCallback((key, val) => {
    setFilters((f) => {
      const a = f[key];
      const next = a.includes(val) ? a.filter((x) => x !== val) : [...a, val];
      return { ...f, [key]: next };
    });
  }, []);

  const clearFilters = useCallback(() => setFilters(defaultFilters()), []);

  const value = {
    filters,
    setF,
    toggleArr,
    clearFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
