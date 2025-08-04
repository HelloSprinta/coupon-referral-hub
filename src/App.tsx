import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import Login from '@/pages/Login';
import CuponesPage from '@/pages/cupones/page';

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
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<CuponesPage />} />
            <Route path="cupones" element={<CuponesPage />} />
            <Route path="referidos" element={<CuponesPage />} />
            <Route path="retiros" element={<CuponesPage />} />
            <Route path="analisis" element={<CuponesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;