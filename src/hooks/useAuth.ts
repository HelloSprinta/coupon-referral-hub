import { useState, useEffect, createContext, useContext } from 'react';
import { AuthService, LoginCredentials } from '@/services/authService';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  verifyAuth: () => Promise<boolean>;
}

// Crear el contexto aquí mismo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Hook personalizado para la lógica de autenticación
export const useAuthProvider = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && AuthService.isAuthenticated();

  // Verificar autenticación al cargar
  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!AuthService.isAuthenticated()) {
        setUser(null);
        return false;
      }

      const response = await AuthService.verifyToken();
      
      if (response.valid) {
        setUser(response.sprintaUser || response.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);
      
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    verifyAuth,
  };
};

// Exportar el contexto para usar en el provider
export { AuthContext };