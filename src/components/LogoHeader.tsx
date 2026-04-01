import React from 'react';
import { useHistory } from 'react-router-dom';
import './LogoHeader.css';

interface LogoHeaderProps {
  className?: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ className = '' }) => {
  const history = useHistory();

  return (
    <div className={`logo-header ${className}`} onClick={() => history.push('/guest/home')}>
      <span className="logo-header-primary">Rider</span>
      <span className="logo-header-secondary">App</span>
    </div>
  );
};

export default LogoHeader;
