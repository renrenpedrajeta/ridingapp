// src/components/ProtectedRoute.tsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  requiredAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  exact = false, 
  component: Component, 
  requiredAuth = true 
}) => {
  const { user } = useAuth();

  return (
    <Route exact={exact} path={path}>
      {requiredAuth && !user ? (
        <Redirect to="/login" />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default ProtectedRoute;
