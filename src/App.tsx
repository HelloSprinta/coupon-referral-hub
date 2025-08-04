import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import CuponesPage from '@/pages/cupones/page';
import ReferidosPage from '@/pages/referidos/index';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/cupones" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cupones" element={<CuponesPage />} />
            <Route path="referidos" element={<ReferidosPage />} />
            <Route path="retiros" element={<div className="p-6"><h1 className="text-2xl font-bold">Retiros y Pagos</h1><p className="text-muted-foreground mt-2">Sección en desarrollo</p></div>} />
            <Route path="analisis" element={<div className="p-6"><h1 className="text-2xl font-bold">Análisis y Seguimiento</h1><p className="text-muted-foreground mt-2">Sección en desarrollo</p></div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;