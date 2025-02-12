import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
}

interface LoginResponse {
  userId: string;
  token: string;
  userName: string;
  email: string;
}

interface User {
  id: string;
  role: string;
  email: string;
  userName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [authState, setAuthState] = useState<Omit<AuthContextType, 'login' | 'register' | 'logout'>>(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    return {
      isAuthenticated: Boolean(storedToken),
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken
    };
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const response = await fetch('http://localhost:8081/api/Auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token invalid');
        }

        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setAuthState({
            isAuthenticated: true,
            user,
            token
          });
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null
        });
        navigate('/login');
      } finally {
        setIsInitialized(true);
      }
    };

    verifyToken();
  }, [navigate]);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await fetch('http://localhost:8081/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json() as LoginResponse;
      
      const user: User = {
        id: data.userId,
        email: data.email, 
        userName: data.userName,
        role: 'USER'
      };

      console.log("user in atuh", user)

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        user,
        token: data.token,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const response = await fetch('http://localhost:8081/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    navigate('/login');
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};