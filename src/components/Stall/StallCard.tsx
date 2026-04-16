import React, { memo } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonBadge, IonIcon } from '@ionic/react';
import { star, timeOutline, bicycleOutline, locationOutline } from 'ionicons/icons';
import { Stall } from '../../types';

interface StallCardProps {
  stall: Stall;
  onClick?: () => void;
}

const StallCard: React.FC<StallCardProps> = memo(({ stall, onClick }) => {
  return (
    <IonCard 
      className="rider-card stall-card" 
      onClick={onClick}
    >
      <div className="stall-card-image-wrapper">
        <img 
          src={stall.image} 
          alt={stall.name}
          crossOrigin="anonymous"
          className="stall-card-image"
        />
        <IonBadge 
          color="light" 
          className="stall-card-rating"
        >
          <IonIcon icon={star} color="warning" className="stall-card-star-icon" />
          {stall.rating}
        </IonBadge>
      </div>
      
      <IonCardHeader className="stall-card-header">
        <div className="stall-card-title-row">
          <IonCardTitle className="stall-card-title">
            {stall.name}
          </IonCardTitle>
          <IonBadge color="light" className="stall-card-cuisine">
            {stall.cuisine}
          </IonBadge>
        </div>
        
        <div className="stall-card-info-row">
          <span className="stall-card-info">
            <IonIcon icon={timeOutline} />
            {stall.deliveryTime}
          </span>
          <span className="stall-card-info">
            <IonIcon icon={bicycleOutline} />
            ₱{stall.deliveryFee.toFixed(2)}
          </span>
        </div>

        <div className="stall-card-location">
          <IonIcon icon={locationOutline} className="stall-card-location-icon" />
          {stall.location}
        </div>
      </IonCardHeader>
    </IonCard>
  );
});

StallCard.displayName = 'StallCard';

export default StallCard;