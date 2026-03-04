// src/App.tsx
import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

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

/* Pages */
import GuestHome from './pages/Guest/Home';
import StallDetail from './pages/Guest/StallDetail';
import GuestCart from './pages/Guest/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserHome from './pages/User/Home';
import UserProfile from './pages/User/Profile';
import ProtectedRoute from './components/ProtectedRoute';

setupIonicReact({
  mode: 'ios',
  animated: true,
});

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              {/* Guest Routes */}
              <Route exact path="/guest/home" component={GuestHome} />
              <Route exact path="/stall/:id" component={StallDetail} />
              <Route exact path="/guest/cart" component={GuestCart} />
              
              {/* User Routes (Protected) */}
              <Route exact path="/user/home" component={UserHome} />
              <Route exact path="/user/profile" component={UserProfile}  />
              
              {/* Auth Routes */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              
              {/* Default Redirect */}
              <Route exact path="/">
                <Redirect to="/guest/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;