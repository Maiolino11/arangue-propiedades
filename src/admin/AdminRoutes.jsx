import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyForm from './pages/PropertyForm';
import './admin.css';

function ProtectedLayout() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/admin/login" replace />;
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="propiedades" element={<Properties />} />
        <Route path="propiedades/nueva" element={<PropertyForm />} />
        <Route path="propiedades/:id/editar" element={<PropertyForm />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ProtectedLayout />} />
      </Routes>
    </AuthProvider>
  );
}
