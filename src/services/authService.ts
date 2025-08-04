const API_BASE_URL = 'http://localhost:5000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    auth_id: string;
    created_at: string;
  };
  access_token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user: any;
  sprintaUser: any;
  tokenInfo: {
    authId: string;
    email: string;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
  };
}

export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly USER_KEY = 'userData';

  // Login del usuario
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/sprinta-users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Credenciales inválidas');
    }

    const data = await response.json();
    
    // Guardar token y datos del usuario
    this.setToken(data.access_token);
    this.setUserData(data.user);
    
    return data;
  }

  // Verificar si el token es válido
  static async verifyToken(): Promise<VerifyTokenResponse> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const response = await fetch(`${API_BASE_URL}/sprinta-users/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      this.logout(); // Limpiar token inválido
      throw new Error('Token inválido');
    }

    return response.json();
  }

  // Gestión del token
  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setUserData(userData: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  static getUserData(): any | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}