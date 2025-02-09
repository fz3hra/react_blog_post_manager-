// import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface LoginRequest {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   userId: string;
//   token: string;
// }

// interface User {
//   id: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   token: string | null;
//   login: (credentials: LoginRequest) => Promise<boolean>;
//   logout: () => void;
// }

// const initialAuthState: AuthContextType = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
//   login: async () => false,
//   logout: () => {}
// };

// const AuthContext = createContext<AuthContextType>(initialAuthState);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [authState, setAuthState] = useState<Omit<AuthContextType, 'login' | 'logout'>>({
//     isAuthenticated: false,
//     user: null,
//     token: null,
//   });

//   const navigate = useNavigate();

//   const login = async (credentials: LoginRequest) => {
//     try {
//       const response = await fetch('http://localhost:8081/api/Auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json() as LoginResponse;
      
//       const user: User = {
//         id: data.userId,
//         email: credentials.email,
//         role: 'USER'
//       };

//       setAuthState({
//         isAuthenticated: true,
//         user,
//         token: data.token,
//       });

//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('user', JSON.stringify(user));

//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setAuthState({
//       isAuthenticated: false,
//       user: null,
//       token: null,
//     });
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const userStr = localStorage.getItem('user');

//     if (token && userStr) {
//       try {
//         const user = JSON.parse(userStr) as User;
//         setAuthState({
//           isAuthenticated: true,
//           user,
//           token,
//         });
//       } catch {
//         logout();
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ ...authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };



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
}

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
}

const initialAuthState: AuthContextType = {
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {}
};

const AuthContext = createContext<AuthContextType>(initialAuthState);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<Omit<AuthContextType, 'login' | 'register' | 'logout'>>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const navigate = useNavigate();

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

      // Automatically login after successful registration
      return await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

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
        email: credentials.email,
        role: 'USER'
      };

      setAuthState({
        isAuthenticated: true,
        user,
        token: data.token,
      });

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(user));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });
      } catch {
        logout();
      }
    }
  }, []);

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