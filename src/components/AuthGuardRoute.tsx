import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVendorAuth } from '../context/VendorAuthContext';

interface AuthGuardRouteProps {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  mode: 'user' | 'rider' | 'admin' | 'vendor';
}

/**
 * AuthGuardRoute - Prevents already logged-in users from accessing login/register pages
 * Redirects to appropriate dashboard/home based on role
 * Allows multiple different roles to be logged in at the same time
 */
const AuthGuardRoute: React.FC<AuthGuardRouteProps> = ({
  path,
  exact = false,
  component: Component,
  mode,
}) => {
  const { user } = useAuth();
  const { vendor } = useVendorAuth();

  // Check if user is already logged in for the given mode
  const isLoggedIn = () => {
    if (mode === 'vendor') {
      return !!vendor;
    } else {
      // For user, rider, admin - they all use AuthContext with different roles
      return !!user && user.role === mode;
    }
  };

  // Redirect to appropriate page based on role if already logged in
  const getRedirectPath = () => {
    if (mode === 'vendor' && vendor) {
      return '/vendor/dashboard';
    } else if (user && user.role === mode) {
      switch (mode) {
        case 'rider':
          return '/rider/home';
        case 'admin':
          return '/admin/dashboard';
        case 'user':
          return '/user/home';
        default:
          return '/';
      }
    }
    return null;
  };

  const redirectPath = getRedirectPath();

  return (
    <Route exact={exact} path={path}>
      {redirectPath ? <Redirect to={redirectPath} /> : <Component />}
    </Route>
  );
};

export default AuthGuardRoute;
