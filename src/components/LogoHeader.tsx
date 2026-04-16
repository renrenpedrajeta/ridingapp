import React from 'react';
import { useIonRouter } from '@ionic/react';
import './LogoHeader.css';

interface LogoHeaderProps {
  className?: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ className = '' }) => {
  const ionRouter = useIonRouter();

  return (
    <div className={`logo-header ${className}`} onClick={() => ionRouter.push('/guest/home')}>
      <span className="logo-header-primary">Rider</span>
      <span className="logo-header-secondary">App</span>
    </div>
  );
};

export default LogoHeader;
