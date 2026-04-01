// src/pages/Vendor/VendorProducts.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/react';
import {
  addOutline,
  createOutline,
  trashOutline,
  closeOutline,
  checkmarkOutline,
  imageOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useHistory } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorProducts.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
  available: boolean;
}

// Mock data - all hardcoded and static
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 12.99,
    description: 'Classic pizza with cheese and tomato',
    stock: 25,
    image: '🍕',
    available: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 14.99,
    description: 'Pizza with pepperoni and mozzarella',
    stock: 18,
    image: '🍕',
    available: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salads',
    price: 8.99,
    description: 'Fresh lettuce with parmesan and croutons',
    stock: 15,
    image: '🥗',
    available: true,
  },
  {
    id: '4',
    name: 'Coca Cola',
    category: 'Beverages',
    price: 2.99,
    description: 'Cold refreshing soda',
    stock: 50,
    image: '🥤',
    available: true,
  },
  {
    id: '5',
    name: 'Chicken Burger',
    category: 'Burgers',
    price: 10.99,
    description: 'Juicy grilled chicken burger with sauce',
    stock: 0,
    image: '🍔',
    available: false,
  },
  {
    id: '6',
    name: 'Fries',
    category: 'Sides',
    price: 4.99,
    description: 'Golden crispy french fries',
    stock: 30,
    image: '🍟',
    available: true,
  },
];

const CATEGORIES = ['Pizza', 'Burgers', 'Salads', 'Beverages', 'Sides', 'Desserts'];

interface FormData {
  name: string;
  category: string;
  price: string;
  description: string;
  stock: string;
  image: string;
  available: boolean;
}

const VendorProducts: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const { isVendorLoggedIn } = useVendorAuth();

  if (!isVendorLoggedIn) {
    history.replace('/vendor/login');
    return null;
  }

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Pizza',
    price: '',
    description: '',
    stock: '',
    image: '🍕',
    available: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Pizza',
      price: '',
      description: '',
      stock: '',
      image: '🍕',
      available: true,
    });
    setEditingId(null);
    setIsEditMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      stock: product.stock.toString(),
      image: product.image || '🍕',
      available: product.available,
    });
    setEditingId(product.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditMode && editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                description: formData.description,
                stock: parseInt(formData.stock, 10),
                image: formData.image,
                available: formData.available,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: (products.length + 1).toString(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        stock: parseInt(formData.stock, 10),
        image: formData.image,
        available: formData.available,
      };
      setProducts([...products, newProduct]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <VendorLayout pageTitle="Products Management">
      <IonContent>
        <div className="products-page">
          <div className="page-header">
            <h1>Products Management</h1>
            <IonText className="page-subtitle">Manage your menu items and inventory</IonText>
          </div>

          <div className="products-header-actions">
            <IonButton color="primary" fill="solid" onClick={openAddModal}>
              <IonIcon icon={addOutline} slot="start" />
              Add Product
            </IonButton>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.map((product) => (
              <IonCard key={product.id} className="product-card">
                <IonCardContent>
                  <div className="product-image">
                    {product.image && product.image.startsWith('data:image') ? (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                      <span className="emoji-icon">{product.image}</span>
                    )}
                    <div
                      className={`availability-badge ${product.available ? 'available' : 'unavailable'}`}
                    >
                      {product.available ? 'Available' : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-details">
                      <div className="detail">
                        <span className="detail-label">Price</span>
                        <span className="detail-value">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="detail">
                        <span className="detail-label">Stock</span>
                        <span className="detail-value">{product.stock}</span>
                      </div>
                    </div>
                  </div>

                  <div className="product-actions">
                    <IonButton
                      expand="block"
                      color="warning"
                      fill="solid"
                      size="small"
                      onClick={() => openEditModal(product)}
                    >
                      <IonIcon icon={createOutline} slot="start" />
                      Edit
                    </IonButton>
                    <IonButton
                      expand="block"
                      color="danger"
                      fill="solid"
                      size="small"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <IonIcon icon={trashOutline} slot="start" />
                      Delete
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {products.length === 0 && (
            <div className="empty-state">
              <p>No products yet. Add your first product to get started!</p>
            </div>
          )}
        </div>

        {/* Add/Edit Product Modal */}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => {
            setShowModal(false);
            resetForm();
          }}
          className="product-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <IonInput
                  placeholder="Enter product name"
                  value={formData.name}
                  onIonChange={(e) =>
                    setFormData({ ...formData, name: e.detail.value || '' })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <IonSelect
                  value={formData.category}
                  onIonChange={(e) =>
                    setFormData({ ...formData, category: e.detail.value })
                  }
                  className="form-select"
                >
                  {CATEGORIES.map((cat) => (
                    <IonSelectOption key={cat} value={cat}>
                      {cat}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price *</label>
                  <IonInput
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onIonChange={(e) =>
                      setFormData({ ...formData, price: e.detail.value || '' })
                    }
                    step="0.01"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock *</label>
                  <IonInput
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onIonChange={(e) =>
                      setFormData({ ...formData, stock: e.detail.value || '' })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <IonTextarea
                  placeholder="Enter product description"
                  value={formData.description}
                  onIonChange={(e) =>
                    setFormData({ ...formData, description: e.detail.value || '' })
                  }
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Image</label>
                <div className="image-upload-section">
                  {formData.image && formData.image.startsWith('http') && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Product preview" style={{ width: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
                  {formData.image && !formData.image.startsWith('http') && formData.image !== '🍕' && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Product preview" style={{ width: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64 = event.target?.result as string;
                          setFormData({ ...formData, image: base64 });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="form-file-input"
                    id="product-image-input"
                  />
                  <label htmlFor="product-image-input" className="form-file-label" style={{ display: 'block', padding: '16px', border: '2px dashed var(--ion-border-color)', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', backgroundColor: 'var(--ion-background-color)', transition: 'all 0.2s ease' }}>
                    <IonIcon icon={imageOutline} style={{ fontSize: '32px', color: 'var(--ion-text-color-secondary)', marginBottom: '8px', display: 'block' }} />
                    <span style={{ color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>Click to upload or drag and drop</span>
                    <div style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)', marginTop: '4px' }}>PNG, JPG, JPEG (Max 5MB)</div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Availability</label>
                <div className="availability-toggle">
                  <span>Currently: {formData.available ? 'Available' : 'Unavailable'}</span>
                  <IonToggle
                    checked={formData.available}
                    onIonChange={(e) =>
                      setFormData({ ...formData, available: e.detail.checked })
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <IonButton
                  expand="block"
                  color="primary"
                  fill="solid"
                  onClick={handleSaveProduct}
                >
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  {isEditMode ? 'Update Product' : 'Add Product'}
                </IonButton>
                <IonButton
                  expand="block"
                  color="medium"
                  fill="solid"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </VendorLayout>
  );
};

export default VendorProducts;
