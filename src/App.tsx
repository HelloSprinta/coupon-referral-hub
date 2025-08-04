import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import ControlPanel from '@/pages/ControlPanel';
import CuponesPage from '@/pages/cupones/page';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/control-panel"
            element={
              <ProtectedRoute>
                <ControlPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cupones"
            element={
              <ProtectedRoute>
                <CuponesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/control-panel" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;