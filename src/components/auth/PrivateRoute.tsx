import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
