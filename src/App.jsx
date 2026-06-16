import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Propiedades from './pages/Propiedades.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Tasaciones from './pages/Tasaciones.jsx';
import Empresa from './pages/Empresa.jsx';
import Contacto from './pages/Contacto.jsx';

const AdminRoutes = lazy(() => import('./admin/AdminRoutes.jsx'));

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.scrollTo) return;
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);
  return null;
}

function PublicSite() {
  return (
    <AppProvider>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/propiedad/:slug" element={<PropertyDetail />} />
        <Route path="/tasaciones" element={<Tasaciones />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={
        <Suspense fallback={null}>
          <AdminRoutes />
        </Suspense>
      } />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
