import { lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <IonSpinner />
  </div>
);

const GuestHome = lazy(() => import('../pages/Guest/Home'));
const StallDetail = lazy(() => import('../pages/Guest/StallDetail'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const RiderLogin = lazy(() => import('../pages/Auth/RiderLogin'));
const RiderRegister = lazy(() => import('../pages/Auth/RiderRegister'));
const AdminLogin = lazy(() => import('../pages/Auth/AdminLogin'));
const AdminRegister = lazy(() => import('../pages/Auth/AdminRegister'));
const VendorLogin = lazy(() => import('../pages/Vendor/VendorLogin'));
const VendorRegister = lazy(() => import('../pages/Vendor/VendorRegister'));
const VendorForgotPassword = lazy(() => import('../pages/Vendor/VendorForgotPassword'));
const UserHome = lazy(() => import('../pages/User/Home'));
const UserProfile = lazy(() => import('../pages/User/Profile'));
const UserSettings = lazy(() => import('../pages/User/Settings'));
const UserCart = lazy(() => import('../pages/User/Cart'));
const UserLocationPicker = lazy(() => import('../pages/User/LocationPicker'));
const UserOrders = lazy(() => import('../pages/User/Orders'));
const RiderHome = lazy(() => import('../pages/Rider/Home'));
const RiderOrders = lazy(() => import('../pages/Rider/Orders'));
const RiderEarnings = lazy(() => import('../pages/Rider/Earnings'));
const RiderProfile = lazy(() => import('../pages/Rider/Profile'));
const RiderPendingApproval = lazy(() => import('../pages/Rider/PendingApproval'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/Admin/Users'));
const AdminRiders = lazy(() => import('../pages/Admin/Riders'));
const AdminOrders = lazy(() => import('../pages/Admin/Orders'));
const AdminReports = lazy(() => import('../pages/Admin/Reports'));
const VendorDashboard = lazy(() => import('../pages/Vendor/VendorDashboard'));
const VendorOrders = lazy(() => import('../pages/Vendor/VendorOrders'));
const VendorProducts = lazy(() => import('../pages/Vendor/VendorProducts'));
const VendorInventory = lazy(() => import('../pages/Vendor/VendorInventory'));
const VendorEarnings = lazy(() => import('../pages/Vendor/VendorEarnings'));
const VendorReviews = lazy(() => import('../pages/Vendor/VendorReviews'));
const VendorSettings = lazy(() => import('../pages/Vendor/VendorSettings'));
const VendorMessages = lazy(() => import('../pages/Vendor/VendorMessages'));
const ActivityLog = lazy(() => import('../pages/Activities/ActivityLog'));
const Messages = lazy(() => import('../pages/Messages/Messages'));
const ReportIncident = lazy(() => import('../pages/Reports/ReportIncident'));
const Payment = lazy(() => import('../pages/Checkout/Payment'));
const OrderSuccess = lazy(() => import('../pages/OrderSuccess/OrderSuccess'));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/guest/home" />} />
        
        {/* Public - Auth pages */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/rider/login" component={RiderLogin} />
        <Route exact path="/rider/register" component={RiderRegister} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/register" component={AdminRegister} />
        <Route exact path="/vendor/login" component={VendorLogin} />
        <Route exact path="/vendor/register" component={VendorRegister} />
        <Route exact path="/vendor/forgot-password" component={VendorForgotPassword} />

        {/* Public - Guest pages */}
        <Route exact path="/guest/home" component={GuestHome} />
        <Route exact path="/stall/:id" component={StallDetail} />

        {/* Protected - User */}
        <Route exact path="/user/home" component={UserHome} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/settings" component={UserSettings} />
        <Route exact path="/user/cart" component={UserCart} />
        <Route exact path="/user/location" component={UserLocationPicker} />
        <Route exact path="/user/orders" component={UserOrders} />
        <Route exact path="/user/stall/:id" component={StallDetail} />

        {/* Protected - Rider */}
        <Route exact path="/rider/home" component={RiderHome} />
        <Route exact path="/rider/orders" component={RiderOrders} />
        <Route exact path="/rider/earnings" component={RiderEarnings} />
        <Route exact path="/rider/profile" component={RiderProfile} />
        <Route exact path="/rider/pending-approval" component={RiderPendingApproval} />

        {/* Protected - Admin */}
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/riders" component={AdminRiders} />
        <Route exact path="/admin/orders" component={AdminOrders} />
        <Route exact path="/admin/reports" component={AdminReports} />

        {/* Protected - Vendor */}
        <Route exact path="/vendor/dashboard" component={VendorDashboard} />
        <Route exact path="/vendor/orders" component={VendorOrders} />
        <Route exact path="/vendor/products" component={VendorProducts} />
        <Route exact path="/vendor/inventory" component={VendorInventory} />
        <Route exact path="/vendor/earnings" component={VendorEarnings} />
        <Route exact path="/vendor/reviews" component={VendorReviews} />
        <Route exact path="/vendor/settings" component={VendorSettings} />
        <Route exact path="/vendor/messages" component={VendorMessages} />

        {/* Shared protected */}
        <Route exact path="/activities" component={ActivityLog} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/report" component={ReportIncident} />

        {/* Checkout */}
        <Route exact path="/checkout/payment" component={Payment} />
        <Route exact path="/order-success" component={OrderSuccess} />

        {/* Catch all */}
        <Route path="*" render={() => <Redirect to="/guest/home" />} />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;