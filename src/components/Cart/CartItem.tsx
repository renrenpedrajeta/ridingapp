// src/components/Cart/CartItem.tsx
import React, { memo, useCallback } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add, remove, trash } from 'ionicons/icons';
import { CartItem as CartItemType } from '../../types';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleUpdateQuantity = useCallback((quantity: number) => {
    onUpdateQuantity(quantity);
  }, [onUpdateQuantity]);

  const handleRemove = useCallback(() => {
    onRemove();
  }, [onRemove]);
  return (
    <div className="cart-item-card">
      <div className="cart-item-image-wrapper">
        <img src={item.image} alt={item.name} className="cart-item-image" crossOrigin="anonymous" />
      </div>

      <div className="cart-item-content">
        <div className="cart-item-info">
          <h4 className="cart-item-name">{item.name}</h4>
          <p className="cart-item-price">₱{item.price.toFixed(2)} x {item.quantity}</p>
        </div>

        <div className="cart-item-total">
          <span className="total-label">Total:</span>
          <span className="total-amount">₱{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <IonButton
            className="quantity-button decrease-btn"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            title="Decrease quantity"
          >
            <IonIcon icon={item.quantity === 1 ? trash : remove} className="control-icon" />
          </IonButton>

          <span className="quantity-display">{item.quantity}</span>

          <IonButton
            className="quantity-button increase-btn"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            title="Increase quantity"
          >
            <IonIcon icon={add} className="control-icon" />
          </IonButton>
        </div>

        <IonButton
          className="remove-btn"
          onClick={handleRemove}
          title="Remove item"
        >
          <IonIcon icon={trash} className="remove-icon" />
        </IonButton>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;