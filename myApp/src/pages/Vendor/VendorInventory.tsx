// src/pages/Vendor/VendorInventory.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonToggle,
  IonText,
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
} from '@ionic/react';
import {
  addOutline,
  removeOutline,
  warningOutline,
  checkmarkOutline,
  closeOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useHistory } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorInventory.css';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  image?: string;
  isActive: boolean;
}

// Mock data - all hardcoded and static
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    currentStock: 5,
    minStock: 10,
    maxStock: 50,
    unitPrice: 12.99,
    image: '🍕',
    isActive: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    currentStock: 8,
    minStock: 10,
    maxStock: 50,
    unitPrice: 14.99,
    image: '🍕',
    isActive: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salads',
    currentStock: 0,
    minStock: 15,
    maxStock: 40,
    unitPrice: 8.99,
    image: '🥗',
    isActive: false,
  },
  {
    id: '4',
    name: 'Coca Cola',
    category: 'Beverages',
    currentStock: 50,
    minStock: 30,
    maxStock: 100,
    unitPrice: 2.99,
    image: '🥤',
    isActive: true,
  },
  {
    id: '5',
    name: 'Chicken Burger',
    category: 'Burgers',
    currentStock: 2,
    minStock: 10,
    maxStock: 30,
    unitPrice: 10.99,
    image: '🍔',
    isActive: true,
  },
  {
    id: '6',
    name: 'Fries',
    category: 'Sides',
    currentStock: 30,
    minStock: 20,
    maxStock: 75,
    unitPrice: 4.99,
    image: '🍟',
    isActive: true,
  },
  {
    id: '7',
    name: 'Cheesecake',
    category: 'Desserts',
    currentStock: 12,
    minStock: 5,
    maxStock: 20,
    unitPrice: 6.99,
    image: '🍰',
    isActive: true,
  },
  {
    id: '8',
    name: 'Orange Juice',
    category: 'Beverages',
    currentStock: 3,
    minStock: 15,
    maxStock: 50,
    unitPrice: 3.99,
    image: '🧃',
    isActive: true,
  },
];

interface EditFormData {
  quantity: string;
  isActive: boolean;
}

const VendorInventory: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const { isVendorLoggedIn } = useVendorAuth();

  if (!isVendorLoggedIn) {
    history.replace('/vendor/login');
    return null;
  }

  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [formData, setFormData] = useState<EditFormData>({
    quantity: '',
    isActive: true,
  });

  const isLowStock = (item: InventoryItem): boolean => item.currentStock < item.minStock;
  const isOutOfStock = (item: InventoryItem): boolean => item.currentStock === 0;

  const getStockIcon = (item: InventoryItem) => {
    if (isOutOfStock(item)) return '🔴';
    if (isLowStock(item)) return '🟡';
    return '🟢';
  };

  const openEditModal = (item: InventoryItem) => {
    setFormData({
      quantity: item.currentStock.toString(),
      isActive: item.isActive,
    });
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleUpdateStock = () => {
    if (!formData.quantity || isNaN(parseInt(formData.quantity, 10))) {
      showToast('Please enter a valid quantity', 'error');
      return;
    }

    const newQuantity = parseInt(formData.quantity, 10);
    const item = inventory.find((i) => i.id === editingId);

    if (!item) return;

    setInventory(
      inventory.map((i) =>
        i.id === editingId
          ? {
              ...i,
              currentStock: newQuantity,
              isActive: formData.isActive,
            }
          : i
      )
    );

    showToast('Stock updated successfully!', 'success');
    setShowModal(false);
  };

  const handleToggleAvailability = (id: string, isActive: boolean) => {
    setInventory(
      inventory.map((i) =>
        i.id === id ? { ...i, isActive: !isActive } : i
      )
    );
    showToast(
      `Product ${isActive ? 'marked unavailable' : 'marked available'}!`,
      'success'
    );
  };

  const handleQuickAdjust = (id: string, change: number) => {
    setInventory(
      inventory.map((i) => {
        if (i.id === id) {
          const newStock = Math.max(0, i.currentStock + change);
          return { ...i, currentStock: newStock };
        }
        return i;
      })
    );
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const lowStockItems = inventory.filter(isLowStock).length;
  const outOfStockItems = inventory.filter(isOutOfStock).length;

  return (
    <VendorLayout pageTitle="Inventory Management">
      <IonContent>
        <div className="inventory-page">
          <div className="page-header">
            <h1>Inventory Management</h1>
            <IonText className="page-subtitle">Monitor and manage your product stock levels</IonText>
          </div>

          {/* Stock Status Cards */}
          <div className="status-cards-grid">
            <IonCard className="status-card">
              <IonCardContent>
                <div className="status-icon total-products">📦</div>
                <div className="status-info">
                  <p className="status-label">Total Items</p>
                  <p className="status-value">{inventory.length}</p>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="status-card">
              <IonCardContent>
                <div className="status-icon low-stock">🟡</div>
                <div className="status-info">
                  <p className="status-label">Low Stock</p>
                  <p className="status-value">{lowStockItems}</p>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="status-card">
              <IonCardContent>
                <div className="status-icon out-of-stock">🔴</div>
                <div className="status-info">
                  <p className="status-label">Out of Stock</p>
                  <p className="status-value">{outOfStockItems}</p>
                </div>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Inventory Table Container */}
          <div className="inventory-table-container">
            <IonCard className="inventory-card">
              <IonCardContent className="table-content">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Min / Max</th>
                      <th>Price</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className={`inventory-row ${isOutOfStock(item) ? 'out-of-stock' : isLowStock(item) ? 'low-stock' : ''}`}>
                        <td className="status-cell">
                          <span className="stock-icon">{getStockIcon(item)}</span>
                        </td>
                        <td>
                          <div className="product-cell">
                            <span className="product-emoji">{item.image}</span>
                            <span className="product-name">{item.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="category-badge">{item.category}</span>
                        </td>
                        <td>
                          <span className={`stock-value ${isOutOfStock(item) ? 'out-of-stock-text' : isLowStock(item) ? 'low-stock-text' : ''}`}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td>
                          <span className="min-max">{item.minStock} / {item.maxStock}</span>
                        </td>
                        <td>
                          <span className="price">${item.unitPrice.toFixed(2)}</span>
                        </td>
                        <td>
                          <div className="availability-toggle-cell">
                            <IonToggle
                              checked={item.isActive}
                              onIonChange={() => handleToggleAvailability(item.id, item.isActive)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button
                              className="action-icon-btn"
                              onClick={() => handleQuickAdjust(item.id, -1)}
                              title="Decrease"
                            >
                              <IonIcon icon={removeOutline} />
                            </button>
                            <button
                              className="action-text-btn"
                              onClick={() => openEditModal(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="action-icon-btn"
                              onClick={() => handleQuickAdjust(item.id, 1)}
                              title="Increase"
                            >
                              <IonIcon icon={addOutline} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Mobile Card View */}
          <div className="inventory-mobile-container">
            {inventory.map((item) => (
              <IonCard key={item.id} className={`inventory-card-mobile ${isOutOfStock(item) ? 'out-of-stock' : isLowStock(item) ? 'low-stock' : ''}`}>
                <IonCardContent>
                  <div className="card-header">
                    <div className="product-info">
                      <span className="product-emoji">{item.image}</span>
                      <div>
                        <p className="product-name">{item.name}</p>
                        <p className="product-category">{item.category}</p>
                      </div>
                    </div>
                    <span className="status-icon-mobile">{getStockIcon(item)}</span>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">Current Stock</span>
                      <span className={`detail-value ${isOutOfStock(item) ? 'out-of-stock-text' : isLowStock(item) ? 'low-stock-text' : ''}`}>
                        {item.currentStock}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Min / Max</span>
                      <span className="detail-value">{item.minStock} / {item.maxStock}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price</span>
                      <span className="detail-value">${item.unitPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <div className="quick-adjust-btns">
                      <button
                        className="adj-btn"
                        onClick={() => handleQuickAdjust(item.id, -1)}
                      >
                        <IonIcon icon={removeOutline} />
                      </button>
                      <span className="adj-display">{item.currentStock}</span>
                      <button
                        className="adj-btn"
                        onClick={() => handleQuickAdjust(item.id, 1)}
                      >
                        <IonIcon icon={addOutline} />
                      </button>
                    </div>
                    <IonButton
                      expand="block"
                      color="primary"
                      fill="solid"
                      size="small"
                      onClick={() => openEditModal(item)}
                    >
                      Edit Details
                    </IonButton>
                  </div>

                  <div className="availability-row">
                    <span>Active: {item.isActive ? 'Yes' : 'No'}</span>
                    <IonToggle
                      checked={item.isActive}
                      onIonChange={() => handleToggleAvailability(item.id, item.isActive)}
                    />
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        {/* Edit Stock Modal */}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="inventory-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Update Stock</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <IonInput
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onIonChange={(e) =>
                    setFormData({ ...formData, quantity: e.detail.value || '' })
                  }
                  min="0"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Availability</label>
                <div className="availability-toggle">
                  <span>Currently: {formData.isActive ? 'Active' : 'Inactive'}</span>
                  <IonToggle
                    checked={formData.isActive}
                    onIonChange={(e) =>
                      setFormData({ ...formData, isActive: e.detail.checked })
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <IonButton
                  expand="block"
                  color="primary"
                  fill="solid"
                  onClick={handleUpdateStock}
                >
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Update Stock
                </IonButton>
                <IonButton
                  expand="block"
                  color="medium"
                  fill="solid"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Toast Notification */}
        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={3000}
          color={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'danger' : 'warning'}
          position="top"
        />
      </IonContent>
    </VendorLayout>
  );
};

export default VendorInventory;
