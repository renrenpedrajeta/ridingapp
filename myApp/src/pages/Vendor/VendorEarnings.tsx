// src/pages/Vendor/VendorEarnings.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonBadge,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonTextarea,
} from '@ionic/react';
import {
  walletOutline,
  cashOutline,
  timeOutline,
  checkmarkCircleOutline,
  downloadOutline,
  sendOutline,
  closeOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useHistory } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorEarnings.css';

interface Transaction {
  id: string;
  date: string;
  type: 'earnings' | 'payout' | 'fee';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
}

// Mock data - all hardcoded and static
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: 'Mar 13, 2026',
    type: 'earnings',
    amount: 150.50,
    description: 'Order #ORD-2026-001 to #ORD-2026-005',
    status: 'completed',
  },
  {
    id: '2',
    date: 'Mar 12, 2026',
    type: 'earnings',
    amount: 280.75,
    description: 'Order #ORD-2026-006 to #ORD-2026-010',
    status: 'completed',
  },
  {
    id: '3',
    date: 'Mar 11, 2026',
    type: 'payout',
    amount: -250.00,
    description: 'Bank transfer to account ending in 1234',
    status: 'completed',
  },
  {
    id: '4',
    date: 'Mar 10, 2026',
    type: 'earnings',
    amount: 120.25,
    description: 'Order #ORD-2026-011 to #ORD-2026-014',
    status: 'completed',
  },
  {
    id: '5',
    date: 'Mar 9, 2026',
    type: 'fee',
    amount: -25.00,
    description: 'Platform commission (5%)',
    status: 'completed',
  },
  {
    id: '6',
    date: 'Mar 8, 2026',
    type: 'earnings',
    amount: 310.00,
    description: 'Order #ORD-2026-015 to #ORD-2026-020',
    status: 'completed',
  },
  {
    id: '7',
    date: 'Mar 7, 2026',
    type: 'payout',
    amount: -350.00,
    description: 'Bank transfer to account ending in 1234',
    status: 'pending',
  },
  {
    id: '8',
    date: 'Mar 6, 2026',
    type: 'earnings',
    amount: 95.50,
    description: 'Order #ORD-2026-021 to #ORD-2026-023',
    status: 'completed',
  },
];

interface WithdrawalForm {
  amount: string;
  notes: string;
}

const VendorEarnings: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const { isVendorLoggedIn } = useVendorAuth();

  if (!isVendorLoggedIn) {
    history.replace('/vendor/login');
    return null;
  }

  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [withdrawalForm, setWithdrawalForm] = useState<WithdrawalForm>({
    amount: '',
    notes: '',
  });

  // Calculate totals
  const totalEarnings = transactions
    .filter((t) => t.type === 'earnings')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPayouts = Math.abs(
    transactions
      .filter((t) => t.type === 'payout')
      .reduce((sum, t) => sum + t.amount, 0)
  );
  const pendingPayouts = transactions
    .filter((t) => t.type === 'payout' && t.status === 'pending')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const currentBalance = totalEarnings - totalPayouts;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'medium';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earnings':
        return '📈';
      case 'payout':
        return '💸';
      case 'fee':
        return '📊';
      default:
        return '💰';
    }
  };

  const handleRequestWithdrawal = () => {
    if (!withdrawalForm.amount || isNaN(parseFloat(withdrawalForm.amount))) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    const withdrawAmount = parseFloat(withdrawalForm.amount);
    if (withdrawAmount > currentBalance) {
      showToast('Insufficient balance', 'error');
      return;
    }

    if (withdrawAmount <= 0) {
      showToast('Amount must be greater than 0', 'error');
      return;
    }

    // Simulate new payout transaction
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
      type: 'payout',
      amount: -withdrawAmount,
      description: `Bank transfer to account ending in 1234${withdrawalForm.notes ? ' - ' + withdrawalForm.notes : ''}`,
      status: 'pending',
    };

    setTransactions([newTransaction, ...transactions]);
    showToast('Withdrawal request submitted!', 'success');
    setShowWithdrawModal(false);
    setWithdrawalForm({ amount: '', notes: '' });
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <VendorLayout pageTitle="Earnings & Payments">
      <IonContent>
        <div className="earnings-page">
          <div className="page-header">
            <h1>Earnings & Payments</h1>
            <IonText className="page-subtitle">Manage your finances and withdrawal requests</IonText>
          </div>

          {/* Finance Cards */}
          <div className="finance-cards-grid">
            <IonCard className="finance-card primary">
              <IonCardContent>
                <div className="card-top">
                  <p className="card-label">Current Balance</p>
                  <IonIcon icon={walletOutline} className="card-icon" />
                </div>
                <p className="card-amount">${currentBalance.toFixed(2)}</p>
                <p className="card-subtext">Available for withdrawal</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="finance-card success">
              <IonCardContent>
                <div className="card-top">
                  <p className="card-label">Total Earnings</p>
                  <IonIcon icon={cashOutline} className="card-icon" />
                </div>
                <p className="card-amount">${totalEarnings.toFixed(2)}</p>
                <p className="card-subtext">All time earnings</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="finance-card warning">
              <IonCardContent>
                <div className="card-top">
                  <p className="card-label">Pending Payouts</p>
                  <IonIcon icon={timeOutline} className="card-icon" />
                </div>
                <p className="card-amount">${pendingPayouts.toFixed(2)}</p>
                <p className="card-subtext">In processing</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="finance-card info">
              <IonCardContent>
                <div className="card-top">
                  <p className="card-label">Total Paid Out</p>
                  <IonIcon icon={sendOutline} className="card-icon" />
                </div>
                <p className="card-amount">${totalPayouts.toFixed(2)}</p>
                <p className="card-subtext">Successfully transferred</p>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Withdrawal Button */}
          <div className="withdrawal-action">
            <IonButton
              color="primary"
              fill="solid"
              expand="block"
              onClick={() => setShowWithdrawModal(true)}
              disabled={currentBalance <= 0}
            >
              <IonIcon icon={sendOutline} slot="start" />
              Request Withdrawal
            </IonButton>
          </div>

          {/* Transaction History */}
          <div className="transactions-section">
            <h2 className="section-title">Transaction History</h2>

            {/* Desktop Table View */}
            <div className="transactions-table-container">
              <IonCard className="transactions-card">
                <IonCardContent className="table-content">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="transaction-row">
                          <td>
                            <span className="transaction-date">{transaction.date}</span>
                          </td>
                          <td>
                            <div className="transaction-type">
                              <span className="type-icon">{getTransactionIcon(transaction.type)}</span>
                              <span className="type-label">
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="transaction-description">{transaction.description}</span>
                          </td>
                          <td>
                            <span
                              className={`transaction-amount ${
                                transaction.amount > 0 ? 'positive' : 'negative'
                              }`}
                            >
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <IonBadge color={getStatusColor(transaction.status)}>
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </IonBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </IonCardContent>
              </IonCard>
            </div>

            {/* Mobile Card View */}
            <div className="transactions-mobile-container">
              {transactions.map((transaction) => (
                <IonCard key={transaction.id} className="transaction-card-mobile">
                  <IonCardContent>
                    <div className="transaction-card-header">
                      <div>
                        <p className="transaction-type-title">
                          {getTransactionIcon(transaction.type)}{' '}
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="transaction-date-mobile">{transaction.date}</p>
                      </div>
                      <div className="transaction-amount-mobile">
                        <span
                          className={`amount-value ${
                            transaction.amount > 0 ? 'positive' : 'negative'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                        <IonBadge
                          color={getStatusColor(transaction.status)}
                          className="status-badge-mobile"
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </IonBadge>
                      </div>
                    </div>
                    <p className="transaction-description-mobile">{transaction.description}</p>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          </div>
        </div>

        {/* Withdrawal Modal */}
        <IonModal
          isOpen={showWithdrawModal}
          onDidDismiss={() => {
            setShowWithdrawModal(false);
            setWithdrawalForm({ amount: '', notes: '' });
          }}
          className="withdrawal-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Request Withdrawal</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawalForm({ amount: '', notes: '' });
                  }}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="withdrawal-form">
              <div className="form-section">
                <p className="section-subtitle">Withdrawal Details</p>

                <div className="balance-info">
                  <span className="balance-label">Available Balance:</span>
                  <span className="balance-value">${currentBalance.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Amount *</label>
                <div className="amount-input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={withdrawalForm.amount}
                    onChange={(e) =>
                      setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })
                    }
                    min="0"
                    step="0.01"
                    className="amount-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <IonTextarea
                  placeholder="Add any notes about this withdrawal..."
                  value={withdrawalForm.notes}
                  onIonChange={(e) =>
                    setWithdrawalForm({ ...withdrawalForm, notes: e.detail.value || '' })
                  }
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <div className="form-info">
                <p className="info-text">
                  ℹ️ Withdrawals are processed within 3-5 business days to your connected bank account.
                </p>
              </div>

              <div className="form-actions">
                <IonButton
                  expand="block"
                  color="success"
                  fill="solid"
                  onClick={handleRequestWithdrawal}
                >
                  <IonIcon icon={sendOutline} slot="start" />
                  Submit Withdrawal Request
                </IonButton>
                <IonButton
                  expand="block"
                  color="medium"
                  fill="solid"
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawalForm({ amount: '', notes: '' });
                  }}
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

export default VendorEarnings;
