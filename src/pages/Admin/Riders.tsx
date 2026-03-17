import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  bicycleOutline,
  trashOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  checkmarkOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AdminNavBar from '../../components/Navbar/AdminNavBar';
import { useAuth } from '../../context/AuthContext';

interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  licensePlate: string;
  licenseNumber: string;
  bankAccount: string;
  bankName: string;
  totalDeliveries: number;
  rating: number;
  earnings: number;
  status: 'online' | 'busy' | 'offline';
  verificationStatus: 'pending' | 'approved' | 'rejected';
  joinedDate: string;
}

const AdminRiders: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  // Protect this page - redirect if not admin
  if (!user || user.role !== 'admin') {
    history.replace('/login');
    return null;
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerification, setFilterVerification] = useState('all');
  const [riders, setRiders] = useState<Rider[]>([
    {
      id: '1',
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      phone: '+63 910 123 4567',
      vehicle: 'Honda CB500F',
      licensePlate: 'XYZ-1234',
      licenseNumber: '12345678',
      bankAccount: '1234567890',
      bankName: 'Philippine National Bank',
      totalDeliveries: 245,
      rating: 4.8,
      earnings: 12450.5,
      status: 'online',
      verificationStatus: 'approved',
      joinedDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'Maria Gonzales',
      email: 'maria@example.com',
      phone: '+63 911 234 5678',
      vehicle: 'Yamaha NMAX',
      licensePlate: 'ABC-5678',
      licenseNumber: '87654321',
      bankAccount: '0987654321',
      bankName: 'BDO Bank',
      totalDeliveries: 182,
      rating: 4.6,
      earnings: 9120.75,
      status: 'offline',
      verificationStatus: 'approved',
      joinedDate: '2023-08-20',
    },
    {
      id: '3',
      name: 'Carlos Santos',
      email: 'carlos@example.com',
      phone: '+63 912 345 6789',
      vehicle: 'Suzuki GSX-R150',
      licensePlate: 'DEF-9012',
      licenseNumber: '11223344',
      bankAccount: '5555666677',
      bankName: 'Metrobank',
      totalDeliveries: 0,
      rating: 0,
      earnings: 0,
      status: 'offline',
      verificationStatus: 'pending',
      joinedDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      phone: '+63 913 456 7890',
      vehicle: 'Honda Wave',
      licensePlate: 'GHI-3456',
      licenseNumber: '99887766',
      bankAccount: '1111222233',
      bankName: 'Union Bank',
      totalDeliveries: 0,
      rating: 0,
      earnings: 0,
      status: 'offline',
      verificationStatus: 'pending',
      joinedDate: '2024-03-11',
    },
    {
      id: '5',
      name: 'Roberto Fernandez',
      email: 'roberto.f@example.com',
      phone: '+63 914 567 8901',
      vehicle: 'Kawasaki Ninja 250',
      licensePlate: 'JKL-5678',
      licenseNumber: '44556677',
      bankAccount: '3333444455',
      bankName: 'China Bank',
      totalDeliveries: 156,
      rating: 4.7,
      earnings: 7850.25,
      status: 'online',
      verificationStatus: 'approved',
      joinedDate: '2023-10-05',
    },
    {
      id: '6',
      name: 'Patricia Reyes',
      email: 'patricia.r@example.com',
      phone: '+63 915 678 9012',
      vehicle: 'KTM Duke 200',
      licensePlate: 'MNO-9012',
      licenseNumber: '55667788',
      bankAccount: '6666777788',
      bankName: 'Robinsons Bank',
      totalDeliveries: 89,
      rating: 4.4,
      earnings: 4520.50,
      status: 'busy',
      verificationStatus: 'approved',
      joinedDate: '2023-12-12',
    },
    {
      id: '7',
      name: 'Miguel Delos Santos',
      email: 'miguel.ds@example.com',
      phone: '+63 916 789 0123',
      vehicle: 'Yamaha MT-15',
      licensePlate: 'PQR-3456',
      licenseNumber: '66778899',
      bankAccount: '2222111100',
      bankName: 'Security Bank',
      totalDeliveries: 0,
      rating: 0,
      earnings: 0,
      status: 'offline',
      verificationStatus: 'pending',
      joinedDate: '2024-03-09',
    },
    {
      id: '8',
      name: 'Isabella Santos',
      email: 'isabella.s@example.com',
      phone: '+63 917 890 1234',
      vehicle: 'Honda CB150R',
      licensePlate: 'STU-7890',
      licenseNumber: '77889900',
      bankAccount: '9999888877',
      bankName: 'AUB',
      totalDeliveries: 0,
      rating: 0,
      earnings: 0,
      status: 'offline',
      verificationStatus: 'pending',
      joinedDate: '2024-03-08',
    },
  ]);

  const filteredRiders = riders.filter(rider => {
    const matchesSearch =
      rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus !== 'all' && rider.status !== filterStatus) return false;
    if (filterVerification === 'pending' && rider.verificationStatus !== 'pending')
      return false;
    if (filterVerification === 'approved' && rider.verificationStatus !== 'approved')
      return false;
    if (filterVerification === 'rejected' && rider.verificationStatus !== 'rejected')
      return false;

    return true;
  });

  const approveRider = (riderId: string) => {
    setRiders(
      riders.map(rider =>
        rider.id === riderId
          ? { ...rider, verificationStatus: 'approved' }
          : rider
      )
    );
  };

  const declineRider = (riderId: string) => {
    if (window.confirm('Are you sure you want to reject this rider?')) {
      setRiders(
        riders.map(rider =>
          rider.id === riderId
            ? { ...rider, verificationStatus: 'rejected' }
            : rider
        )
      );
    }
  };

  const toggleVerification = (riderId: string) => {
    setRiders(
      riders.map(rider =>
        rider.id === riderId
          ? {
              ...rider,
              verificationStatus:
                rider.verificationStatus === 'approved' ? 'rejected' : 'approved',
            }
          : rider
      )
    );
  };

  const deleteRider = (riderId: string) => {
    if (window.confirm('Are you sure you want to delete this rider?')) {
      setRiders(riders.filter(rider => rider.id !== riderId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#10B981';
      case 'busy':
        return '#F59E0B';
      case 'offline':
        return '#9CA3AF';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <IonPage>
      <AdminNavBar title="Riders" />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Admin Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px',
            overflowX: 'auto',
            background: 'var(--ion-card-background)',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
          }}
        >
          <IonButton
            expand="block"
            style={{
              '--background': 'transparent',
              '--color': 'var(--ion-text-color)',
              height: '40px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              flex: '1',
              minWidth: '90px',
            } as any}
            onClick={() => history.push('/admin/dashboard')}
          >
            📊 Dashboard
          </IonButton>
          <IonButton
            expand="block"
            style={{
              '--background': 'transparent',
              '--color': 'var(--ion-text-color)',
              height: '40px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              flex: '1',
              minWidth: '80px',
            } as any}
            onClick={() => history.push('/admin/users')}
          >
            👥 Users
          </IonButton>
          <IonButton
            expand="block"
            style={{
              '--background': '#6366F1',
              '--color': '#FFFFFF',
              height: '40px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              flex: '1',
              minWidth: '90px',
            } as any}
          >
            🚴 Riders
          </IonButton>
          <IonButton
            expand="block"
            style={{
              '--background': 'transparent',
              '--color': 'var(--ion-text-color)',
              height: '40px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              flex: '1',
              minWidth: '80px',
            } as any}
            onClick={() => history.push('/admin/orders')}
          >
            📦 Orders
          </IonButton>
          <IonButton
            expand="block"
            style={{
              '--background': 'transparent',
              '--color': 'var(--ion-text-color)',
              height: '40px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              flex: '1',
              minWidth: '90px',
            } as any}
            onClick={() => history.push('/admin/reports')}
          >
            ⚠️ Reports
          </IonButton>
        </div>

        {/* Header */}
        <div style={{ padding: '16px' }}>
          <h2
            style={{
              margin: '0 0 16px',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
            }}
          >
            Manage Riders
          </h2>
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value!)}
            placeholder="Search by name or email..."
            style={{
              '--background': 'var(--ion-card-background)',
              '--icon-color': 'var(--ion-text-color-secondary)',
              marginBottom: '16px',
            } as any}
          />
        </div>

        {/* Filter */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p
              style={{
                margin: '0 0 10px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--ion-text-color)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🚀</span> Status Filter
            </p>
            <IonSegment
              value={filterStatus}
              onIonChange={e => setFilterStatus(e.detail.value as string)}
              style={{
                '--background': 'var(--ion-background-color)',
                padding: '4px',
                borderRadius: '10px',
              } as any}
            >
              <IonSegmentButton
                value="all"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#6366F1',
                  '--border-radius': '8px',
                  '--indicator-color': '#6366F1',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="online"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#10B981',
                  '--border-radius': '8px',
                  '--indicator-color': '#10B981',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>● Online</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="busy"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#F59E0B',
                  '--border-radius': '8px',
                  '--indicator-color': '#F59E0B',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>● Busy</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="offline"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#9CA3AF',
                  '--border-radius': '8px',
                  '--indicator-color': '#9CA3AF',
                  fontSize: '12px',
                  fontWeight: 700,
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>● Offline</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
          <div>
            <p
              style={{
                margin: '0 0 10px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--ion-text-color)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✓</span> Verification Filter
            </p>
            <IonSegment
              value={filterVerification}
              onIonChange={e => setFilterVerification(e.detail.value as string)}
              style={{
                '--background': 'var(--ion-background-color)',
                padding: '4px',
                borderRadius: '10px',
              } as any}
            >
              <IonSegmentButton
                value="all"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#6366F1',
                  '--border-radius': '8px',
                  '--indicator-color': '#6366F1',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="pending"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#F59E0B',
                  '--border-radius': '8px',
                  '--indicator-color': '#F59E0B',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>⏳ Pending</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="approved"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#10B981',
                  '--border-radius': '8px',
                  '--indicator-color': '#10B981',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginRight: '4px',
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>✓ Approved</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="rejected"
                style={{
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#EF4444',
                  '--border-radius': '8px',
                  '--indicator-color': '#EF4444',
                  fontSize: '12px',
                  fontWeight: 700,
                } as any}
              >
                <IonLabel style={{ fontSize: '12px', fontWeight: 700 }}>✕ Rejected</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '0 16px 16px',
          }}
        >
          <IonCard
            style={{ margin: 0, background: 'var(--ion-card-background)' }}
          >
            <IonCardContent style={{ padding: '16px' }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'var(--ion-text-color-secondary)',
                }}
              >
                Total
              </p>
              <h3
                style={{
                  margin: '8px 0 0',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#6366F1',
                }}
              >
                {riders.length}
              </h3>
            </IonCardContent>
          </IonCard>
          <IonCard
            style={{ margin: 0, background: 'var(--ion-card-background)' }}
          >
            <IonCardContent style={{ padding: '16px' }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'var(--ion-text-color-secondary)',
                }}
              >
                Verified
              </p>
              <h3
                style={{
                  margin: '8px 0 0',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#10B981',
                }}
              >
                {riders.filter(r => r.verificationStatus === 'approved').length}
              </h3>
            </IonCardContent>
          </IonCard>
          <IonCard
            style={{ margin: 0, background: 'var(--ion-card-background)' }}
          >
            <IonCardContent style={{ padding: '16px' }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'var(--ion-text-color-secondary)',
                }}
              >
                Pending
              </p>
              <h3
                style={{
                  margin: '8px 0 0',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#F59E0B',
                }}
              >
                {riders.filter(r => r.verificationStatus === 'pending').length}
              </h3>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Riders Grid */}
        <div style={{ padding: '0 16px 32px' }}>
          {filteredRiders.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 16px',
                color: 'var(--ion-text-color-secondary)',
              }}
            >
              <IonIcon
                icon={bicycleOutline}
                style={{ fontSize: '48px', marginBottom: '16px' }}
              />
              <p>No riders found</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredRiders.map(rider => (
                <IonCard
                  key={rider.id}
                  style={{
                    margin: 0,
                    background: 'var(--ion-card-background)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <IonCardContent style={{ padding: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                          }}
                        >
                          <h3
                            style={{
                              margin: 0,
                              fontSize: '18px',
                              fontWeight: 700,
                              color: 'var(--ion-text-color)',
                            }}
                          >
                            {rider.name}
                          </h3>
                          {/* Verification Status Badge */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              paddingLeft: '12px',
                            }}
                          >
                            {rider.verificationStatus === 'approved' && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  color: '#10B981',
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                }}
                              >
                                <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '14px' }} />
                                <span>Verified</span>
                              </div>
                            )}
                            {rider.verificationStatus === 'pending' && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  background: 'rgba(245, 158, 11, 0.15)',
                                  color: '#F59E0B',
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  border: '1px solid rgba(245, 158, 11, 0.3)',
                                }}
                              >
                                <div style={{ width: '4px', height: '4px', background: '#F59E0B', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                                <span>Pending Review</span>
                              </div>
                            )}
                            {rider.verificationStatus === 'rejected' && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  background: 'rgba(239, 68, 68, 0.15)',
                                  color: '#EF4444',
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                }}
                              >
                                <IonIcon icon={closeCircleOutline} style={{ fontSize: '14px' }} />
                                <span>Rejected</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p
                          style={{
                            margin: '0 0 8px',
                            fontSize: '13px',
                            color: 'var(--ion-text-color-secondary)',
                          }}
                        >
                          {rider.email} • {rider.phone}
                        </p>
                        {/* Status Indicator */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '6px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              paddingLeft: '0px',
                            }}
                          >
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: getStatusColor(rider.status),
                                boxShadow: `0 0 8px ${getStatusColor(rider.status)}`,
                              }}
                            />
                            <span
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: getStatusColor(rider.status),
                                textTransform: 'capitalize',
                              }}
                            >
                              {rider.status === 'online' && '● Online'}
                              {rider.status === 'busy' && '● On Delivery'}
                              {rider.status === 'offline' && '● Offline'}
                            </span>
                          </div>
                          {rider.verificationStatus === 'approved' && (
                            <div
                              style={{
                                fontSize: '12px',
                                color: 'var(--ion-text-color-secondary)',
                                marginLeft: 'auto',
                              }}
                            >
                              Joined {new Date(rider.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '16px',
                        background: 'var(--ion-background-color)',
                        borderRadius: '12px',
                        marginTop: '12px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        border: '1px solid var(--ion-border-color, rgba(0,0,0,0.1))',
                      }}
                    >
                      {/* Vehicle Details Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid var(--ion-border-color, rgba(0,0,0,0.05))',
                        }}
                      >
                        <span
                          style={{ color: 'var(--ion-text-color-secondary)', fontSize: '12px', fontWeight: 500 }}
                        >
                          🏍 Vehicle
                        </span>
                        <span
                          style={{
                            color: 'var(--ion-text-color)',
                            fontWeight: 700,
                          }}
                        >
                          {rider.vehicle}
                        </span>
                      </div>
                      {/* License Plate Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid var(--ion-border-color, rgba(0,0,0,0.05))',
                        }}
                      >
                        <span
                          style={{ color: 'var(--ion-text-color-secondary)', fontSize: '12px', fontWeight: 500 }}
                        >
                          📋 License Plate
                        </span>
                        <span
                          style={{
                            color: 'var(--ion-text-color)',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            fontSize: '14px',
                          }}
                        >
                          {rider.licensePlate}
                        </span>
                      </div>
                      {/* Bank Info Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid var(--ion-border-color, rgba(0,0,0,0.05))',
                        }}
                      >
                        <span
                          style={{ color: 'var(--ion-text-color-secondary)', fontSize: '12px', fontWeight: 500 }}
                        >
                          🏦 Bank
                        </span>
                        <span
                          style={{
                            color: 'var(--ion-text-color)',
                            fontWeight: 600,
                          }}
                        >
                          {rider.bankName}
                        </span>
                      </div>
                      {/* Performance Stats for Verified Riders */}
                      {rider.verificationStatus === 'approved' && (
                        <>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: '12px',
                              marginTop: '12px',
                              marginBottom: '0px',
                            }}
                          >
                            {/* Deliveries Card */}
                            <div
                              style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                              }}
                            >
                              <p
                                style={{
                                  margin: '0 0 4px',
                                  fontSize: '11px',
                                  color: 'var(--ion-text-color-secondary)',
                                  fontWeight: 500,
                                }}
                              >
                                📦 Deliveries
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: '16px',
                                  fontWeight: 700,
                                  color: '#3B82F6',
                                }}
                              >
                                {rider.totalDeliveries}
                              </p>
                            </div>
                            {/* Rating Card */}
                            <div
                              style={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid rgba(245, 158, 11, 0.2)',
                              }}
                            >
                              <p
                                style={{
                                  margin: '0 0 4px',
                                  fontSize: '11px',
                                  color: 'var(--ion-text-color-secondary)',
                                  fontWeight: 500,
                                }}
                              >
                                ⭐ Rating
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: '16px',
                                  fontWeight: 700,
                                  color: '#F59E0B',
                                }}
                              >
                                {rider.rating.toFixed(1)}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {rider.verificationStatus === 'pending' ? (
                        <>
                          <IonButton
                            expand="block"
                            style={{
                              '--background': 'rgba(16, 185, 129, 0.1)',
                              '--border-color': '#10B981',
                              '--color': '#10B981',
                              '--border-radius': '8px',
                              flex: 1,
                              minWidth: '100px',
                              fontSize: '13px',
                              fontWeight: 700,
                              height: '44px',
                              border: '2px solid #10B981',
                              textTransform: 'none',
                            } as any}
                            fill="outline"
                            onClick={() => approveRider(rider.id)}
                          >
                            <IonIcon
                              slot="start"
                              icon={checkmarkCircleOutline}
                              style={{ fontSize: '20px' }}
                            />
                            Approve Rider
                          </IonButton>
                          <IonButton
                            expand="block"
                            style={{
                              '--background': '#EF4444',
                              '--color': 'white',
                              '--border-radius': '8px',
                              flex: 1,
                              minWidth: '100px',
                              fontSize: '13px',
                              fontWeight: 700,
                              height: '44px',
                              textTransform: 'none',
                            } as any}
                            onClick={() => declineRider(rider.id)}
                          >
                            <IonIcon
                              slot="start"
                              icon={closeCircleOutline}
                              style={{ fontSize: '20px' }}
                            />
                            Decline Rider
                          </IonButton>
                        </>
                      ) : (
                        <>
                          <IonButton
                            fill="outline"
                            style={{
                              '--border-color':
                                rider.verificationStatus === 'approved'
                                  ? '#EF4444'
                                  : '#10B981',
                              '--color':
                                rider.verificationStatus === 'approved'
                                  ? '#EF4444'
                                  : '#10B981',
                              '--border-radius': '8px',
                              '--border-width': '2px',
                              flex: 1,
                              minWidth: '100px',
                              fontSize: '13px',
                              fontWeight: 700,
                              height: '44px',
                              textTransform: 'none',
                            } as any}
                            onClick={() => toggleVerification(rider.id)}
                          >
                            <IonIcon
                              slot="start"
                              icon={
                                rider.verificationStatus === 'approved'
                                  ? closeCircleOutline
                                  : checkmarkCircleOutline
                              }
                              style={{ fontSize: '20px' }}
                            />
                            {rider.verificationStatus === 'approved'
                              ? 'Revoke Access'
                              : 'Approve'}
                          </IonButton>
                          <IonButton
                            fill="outline"
                            style={{
                              '--border-color': '#EF4444',
                              '--color': '#EF4444',
                              '--border-radius': '8px',
                              '--border-width': '2px',
                              minHeight: '44px',
                              minWidth: '44px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '0px',
                              margin: '0px',
                            } as any}
                            title="Delete Rider"
                            onClick={() => deleteRider(rider.id)}
                          >
                            <IonIcon
                              icon={trashOutline}
                              style={{
                                fontSize: '24px',
                                color: '#EF4444',
                              }}
                            />
                          </IonButton>
                        </>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminRiders;
