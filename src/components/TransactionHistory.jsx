import { ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';
import { useData } from '../context/DataContext';

const TransactionHistory = () => {
  const { transactions } = useData();

  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(absValue);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'buy':
        return <ArrowDownCircle className="tx-icon buy" />;
      case 'sell':
        return <ArrowUpCircle className="tx-icon sell" />;
      case 'dividend':
        return <Coins className="tx-icon dividend" />;
      default:
        return <Coins className="tx-icon" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'buy':
        return 'Buy';
      case 'sell':
        return 'Sell';
      case 'dividend':
        return 'Dividend';
      default:
        return type;
    }
  };

  return (
    <div className="transaction-history">
      <h2 className="section-title">Activity History</h2>
      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item">
            <div className="tx-left">
              {getIcon(tx.type)}
              <div className="tx-info">
                <div className="tx-asset">{tx.asset}</div>
                <div className="tx-type">{getTypeLabel(tx.type)}</div>
              </div>
            </div>
            <div className="tx-center">
              <div className="tx-description">{tx.description}</div>
              {tx.shares && (
                <div className="tx-details">
                  {tx.shares} shares @ {formatCurrency(tx.price)}
                </div>
              )}
            </div>
            <div className="tx-right">
              <div className={`tx-amount ${tx.amount >= 0 ? 'positive' : 'negative'}`}>
                {tx.amount >= 0 ? '+' : '-'}{formatCurrency(tx.amount)}
              </div>
              <div className="tx-date">{formatDate(tx.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
