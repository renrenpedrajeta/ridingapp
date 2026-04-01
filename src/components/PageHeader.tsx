import React from 'react';
import { 
  IonHeader, 
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

interface PageHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  showBackButton?: boolean;
  backHref?: string;
  customClass?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title = '',
  showLogo = true,
  showBack = false,
  showBackButton = false,
  backHref = '/guest/home',
  customClass = '',
}) => {
  const history = useHistory();

  return (
    <IonHeader className={`page-header ${customClass}`}>
      <IonToolbar className="page-header-toolbar">
        <IonButtons slot="start">
          {showBack || showBackButton ? (
            <IonBackButton 
              defaultHref={backHref} 
              className="page-header-back-btn"
            />
          ) : (
            <button 
              className="page-header-logo-btn"
              onClick={() => history.push('/guest/home')}
            >
              {showLogo ? (
                <span className="page-header-logo">
                  <span className="logo-primary">Rider</span>
                  <span className="logo-secondary">App</span>
                </span>
              ) : (
                <span className="page-header-title">{title}</span>
              )}
            </button>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
