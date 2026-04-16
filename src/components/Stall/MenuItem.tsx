// src/components/Stall/MenuItem.tsx
import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add, flame, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { MenuItem as MenuItemType } from '../../types';
import './MenuItem.css';

interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
  quantity?: number;
  inStock?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, quantity, inStock = true }) => {
  return (
    <div className="menu-item-card" style={{ opacity: !inStock ? 0.6 : 1 }}>
      {/* Image Container */}
      <div className="menu-item-image-wrapper">
        <img src={item.image} alt={item.name} className="menu-item-image" crossOrigin="anonymous" />
        <div className="menu-item-overlay"></div>
        
        {/* Popular Badge */}
        {item.popular && inStock && (
          <div className="menu-item-popular-badge">
            <IonIcon icon={flame} className="popular-icon" />
            <span>Popular</span>
          </div>
        )}

        {/* Out of Stock Badge */}
        {!inStock && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#EF4444',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 10
          }}>
            <IonIcon icon={closeCircle} style={{ fontSize: '14px' }} />
            No Stock
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="menu-item-content">
        {/* Header with Name and Action */}
        <div className="menu-item-header">
          <div className="menu-item-info">
            <h3 className="menu-item-name">{item.name}</h3>
            <p className="menu-item-description">{item.description}</p>
          </div>
        </div>

        {/* Footer with Price and Button */}
        <div className="menu-item-footer">
          <div className="menu-item-price-section">
            <span className="menu-item-price">₱{item.price.toFixed(2)}</span>
          </div>
          
          {!inStock ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#EF4444',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <IonIcon icon={closeCircle} />
              <span>Out of Stock</span>
            </div>
          ) : quantity ? (
            <div className="menu-item-quantity-badge">
              <IonIcon icon={checkmarkCircle} className="quantity-check-icon" />
              <span className="quantity-count">{quantity}</span>
            </div>
          ) : (
            <IonButton
              className="menu-item-add-button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
            >
              <IonIcon icon={add} className="add-icon" />
            </IonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;