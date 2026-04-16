import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { VendorAuthProvider } from './context/VendorAuthContext';
import AppRouter from './router/AppRouter';

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
import './styles/mobile-first-responsive.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <VendorAuthProvider>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <IonReactRouter>
                <IonRouterOutlet>
                  <AppRouter />
                </IonRouterOutlet>
              </IonReactRouter>
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </VendorAuthProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;