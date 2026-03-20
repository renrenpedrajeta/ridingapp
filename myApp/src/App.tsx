// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { VendorAuthProvider } from './context/VendorAuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/global.css';
import "leaflet/dist/leaflet.css";

// Loading fallback component
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <IonSpinner />
  </div>
);

// Lazy load all route components for code splitting
const GuestHome = lazy(() => import('./pages/Guest/Home'));
const StallDetail = lazy(() => import('./pages/Guest/StallDetail'));
const GuestCart = lazy(() => import('./pages/Guest/Cart'));
const GuestLocationPicker = lazy(() => import('./pages/Guest/LocationPicker'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const RiderLogin = lazy(() => import('./pages/Auth/RiderLogin'));
const RiderRegister = lazy(() => import('./pages/Auth/RiderRegister'));
const AdminLogin = lazy(() => import('./pages/Auth/AdminLogin'));
const AdminRegister = lazy(() => import('./pages/Auth/AdminRegister'));
const UserHome = lazy(() => import('./pages/User/Home'));
const UserProfile = lazy(() => import('./pages/User/Profile'));
const UserSettings = lazy(() => import('./pages/User/Settings'));
const UserCart = lazy(() => import('./pages/User/Cart'));
const UserLocationPicker = lazy(() => import('./pages/User/LocationPicker'));
const RiderHome = lazy(() => import('./pages/Rider/Home'));
const RiderOrders = lazy(() => import('./pages/Rider/Orders'));
const RiderEarnings = lazy(() => import('./pages/Rider/Earnings'));
const RiderProfile = lazy(() => import('./pages/Rider/Profile'));
const RiderPendingApproval = lazy(() => import('./pages/Rider/PendingApproval'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/Admin/Users'));
const AdminRiders = lazy(() => import('./pages/Admin/Riders'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders'));
const AdminReports = lazy(() => import('./pages/Admin/Reports'));
const ActivityLog = lazy(() => import('./pages/Activities/ActivityLog'));
const Messages = lazy(() => import('./pages/Messages/Messages'));
const ReportIncident = lazy(() => import('./pages/Reports/ReportIncident'));
const Payment = lazy(() => import('./pages/Checkout/Payment'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const VendorLogin = lazy(() => import('./pages/Vendor/VendorLogin'));
const VendorRegister = lazy(() => import('./pages/Vendor/VendorRegister'));
const VendorForgotPassword = lazy(() => import('./pages/Vendor/VendorForgotPassword'));
const VendorDashboard = lazy(() => import('./pages/Vendor/VendorDashboard'));
const VendorOrders = lazy(() => import('./pages/Vendor/VendorOrders'));
const VendorProducts = lazy(() => import('./pages/Vendor/VendorProducts'));
const VendorInventory = lazy(() => import('./pages/Vendor/VendorInventory'));
const VendorEarnings = lazy(() => import('./pages/Vendor/VendorEarnings'));
const VendorReviews = lazy(() => import('./pages/Vendor/VendorReviews'));
const VendorSettings = lazy(() => import('./pages/Vendor/VendorSettings'));

setupIonicReact({
  mode: 'ios',
  animated: true,
});

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <AuthProvider>
        <VendorAuthProvider>
          <CartProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <Suspense fallback={<Loading />}>
                  {/* Guest Routes */}
                  <Route exact path="/guest/home" component={GuestHome} />
                  <Route exact path="/stall/:id" component={StallDetail} />
                  <Route exact path="/guest/cart" component={GuestCart} />
                  <Route exact path="/guest/location" component={GuestLocationPicker} />
                  
                  {/* User Routes */}
                  <Route exact path="/user/home" component={UserHome} />
                  <Route exact path="/user/profile" component={UserProfile} />
                  <Route exact path="/user/settings" component={UserSettings} />
                  <Route exact path="/user/cart" component={UserCart} />
                  <Route exact path="/user/location" component={UserLocationPicker} />
                  
                  {/* Rider Routes */}
                  <Route exact path="/rider/home" component={RiderHome} />
                  <Route exact path="/rider/orders" component={RiderOrders} />
                  <Route exact path="/rider/earnings" component={RiderEarnings} />
                  <Route exact path="/rider/profile" component={RiderProfile} />
                  <Route exact path="/rider/login" component={RiderLogin} />
                  <Route exact path="/rider/pending-approval" component={RiderPendingApproval} />
                  <Route exact path="/rider/register" component={RiderRegister} />
                  
                  {/* Admin Routes */}
                  <Route exact path="/admin/dashboard" component={AdminDashboard} />
                  <Route exact path="/admin/users" component={AdminUsers} />
                  <Route exact path="/admin/riders" component={AdminRiders} />
                  <Route exact path="/admin/orders" component={AdminOrders} />
                  <Route exact path="/admin/reports" component={AdminReports} />
                  <Route exact path="/admin/login" component={AdminLogin} />
                  <Route exact path="/admin/register" component={AdminRegister} />
                  
                  {/* Vendor Routes */}
                  <Route exact path="/vendor/login" component={VendorLogin} />
                  <Route exact path="/vendor/register" component={VendorRegister} />
                  <Route exact path="/vendor/forgot-password" component={VendorForgotPassword} />
                  <Route exact path="/vendor/dashboard" component={VendorDashboard} />
                  <Route exact path="/vendor/orders" component={VendorOrders} />
                  <Route exact path="/vendor/products" component={VendorProducts} />
                  <Route exact path="/vendor/inventory" component={VendorInventory} />
                  <Route exact path="/vendor/earnings" component={VendorEarnings} />
                  <Route exact path="/vendor/reviews" component={VendorReviews} />
                  <Route exact path="/vendor/settings" component={VendorSettings} />
                  
                  {/* Activity & Messages Routes */}
                  <Route exact path="/activities" component={ActivityLog} />
                  <Route exact path="/messages" component={Messages} />
                  
                  {/* Report Routes */}
                  <Route exact path="/report" component={ReportIncident} />
                  
                  {/* Checkout Routes */}
                  <Route exact path="/checkout/payment" component={Payment} />
                  
                  {/* Auth Routes */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  
                  {/* Default Redirect */}
                  <Route exact path="/">
                    <Redirect to="/guest/home" />
                  </Route>
                </Suspense>
              </IonRouterOutlet>
            </IonReactRouter>
          </CartProvider>
        </VendorAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;