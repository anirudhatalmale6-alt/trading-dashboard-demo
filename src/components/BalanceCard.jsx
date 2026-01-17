import { TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank } from 'lucide-react';
import { useData } from '../context/DataContext';

const BalanceCard = () => {
  const { balances } = useData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="balance-cards">
      <div className="balance-card main">
        <div className="card-header">
          <DollarSign className="card-icon" />
          <span className="card-label">Total Equity</span>
        </div>
        <div className="card-value">{formatCurrency(balances.totalEquity)}</div>
        <div className={`card-change ${balances.dailyPnL >= 0 ? 'positive' : 'negative'}`}>
          {balances.dailyPnL >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{formatCurrency(Math.abs(balances.dailyPnL))} ({formatPercent(balances.dailyPnLPercent)}) today</span>
        </div>
      </div>

      <div className="balance-card">
        <div className="card-header">
          <Wallet className="card-icon" />
          <span className="card-label">Available Cash</span>
        </div>
        <div className="card-value">{formatCurrency(balances.availableCash)}</div>
      </div>

      <div className="balance-card">
        <div className="card-header">
          <PiggyBank className="card-icon" />
          <span className="card-label">Invested</span>
        </div>
        <div className="card-value">{formatCurrency(balances.investedAmount)}</div>
      </div>

      <div className="balance-card">
        <div className="card-header">
          <TrendingUp className="card-icon" />
          <span className="card-label">Total P&L</span>
        </div>
        <div className={`card-value ${balances.totalPnL >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(balances.totalPnL)}
        </div>
        <div className={`card-change ${balances.totalPnLPercent >= 0 ? 'positive' : 'negative'}`}>
          {formatPercent(balances.totalPnLPercent)}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
