import { useState } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const Admin = () => {
  const {
    balances,
    updateBalance,
    holdings,
    updateHolding,
    addHolding,
    deleteHolding,
    transactions,
    addTransaction,
    deleteTransaction,
    regenerateChartData,
  } = useData();

  const [newTransaction, setNewTransaction] = useState({
    type: 'dividend',
    asset: '',
    amount: '',
    description: '',
  });

  const [newHolding, setNewHolding] = useState({
    symbol: '',
    name: '',
    shares: '',
    avgPrice: '',
    currentPrice: '',
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.asset || !newTransaction.amount) return;

    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    });

    setNewTransaction({
      type: 'dividend',
      asset: '',
      amount: '',
      description: '',
    });
  };

  const handleAddHolding = (e) => {
    e.preventDefault();
    if (!newHolding.symbol || !newHolding.shares) return;

    addHolding({
      ...newHolding,
      shares: parseFloat(newHolding.shares),
      avgPrice: parseFloat(newHolding.avgPrice),
      currentPrice: parseFloat(newHolding.currentPrice),
    });

    setNewHolding({
      symbol: '',
      name: '',
      shares: '',
      avgPrice: '',
      currentPrice: '',
    });
  };

  return (
    <div className="admin">
      <h1 className="page-title">Admin Panel</h1>
      <p className="admin-description">
        Adjust values for demo and testing purposes.
      </p>

      {/* Balance Controls */}
      <section className="admin-section">
        <h2 className="section-title">Balance Settings</h2>
        <div className="admin-grid">
          <div className="admin-field">
            <label>Total Equity ($)</label>
            <input
              type="number"
              value={balances.totalEquity.toFixed(2)}
              onChange={(e) => updateBalance('totalEquity', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Available Cash ($)</label>
            <input
              type="number"
              value={balances.availableCash.toFixed(2)}
              onChange={(e) => updateBalance('availableCash', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Invested Amount ($)</label>
            <input
              type="number"
              value={balances.investedAmount.toFixed(2)}
              onChange={(e) => updateBalance('investedAmount', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Daily P&L ($)</label>
            <input
              type="number"
              value={balances.dailyPnL.toFixed(2)}
              onChange={(e) => updateBalance('dailyPnL', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Total P&L ($)</label>
            <input
              type="number"
              value={balances.totalPnL.toFixed(2)}
              onChange={(e) => updateBalance('totalPnL', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Total P&L (%)</label>
            <input
              type="number"
              value={balances.totalPnLPercent.toFixed(2)}
              onChange={(e) => updateBalance('totalPnLPercent', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Chart Controls */}
      <section className="admin-section">
        <h2 className="section-title">Chart Data</h2>
        <button className="btn btn-primary" onClick={regenerateChartData}>
          <RefreshCw size={16} />
          Regenerate Chart Data
        </button>
      </section>

      {/* Holdings Management */}
      <section className="admin-section">
        <h2 className="section-title">Holdings Management</h2>
        <div className="holdings-admin">
          {holdings.map((holding) => (
            <div key={holding.symbol} className="holding-edit-row">
              <span className="holding-symbol">{holding.symbol}</span>
              <input
                type="number"
                placeholder="Shares"
                value={holding.shares}
                onChange={(e) => updateHolding(holding.symbol, 'shares', e.target.value)}
              />
              <input
                type="number"
                placeholder="Avg Price"
                value={holding.avgPrice.toFixed(2)}
                onChange={(e) => updateHolding(holding.symbol, 'avgPrice', e.target.value)}
              />
              <input
                type="number"
                placeholder="Current Price"
                value={holding.currentPrice.toFixed(2)}
                onChange={(e) => updateHolding(holding.symbol, 'currentPrice', e.target.value)}
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteHolding(holding.symbol)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <form className="add-form" onSubmit={handleAddHolding}>
          <h3>Add New Holding</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Symbol (e.g., AAPL)"
              value={newHolding.symbol}
              onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value.toUpperCase() })}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={newHolding.name}
              onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Shares"
              value={newHolding.shares}
              onChange={(e) => setNewHolding({ ...newHolding, shares: e.target.value })}
            />
            <input
              type="number"
              placeholder="Avg Price"
              value={newHolding.avgPrice}
              onChange={(e) => setNewHolding({ ...newHolding, avgPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Current Price"
              value={newHolding.currentPrice}
              onChange={(e) => setNewHolding({ ...newHolding, currentPrice: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Add
            </button>
          </div>
        </form>
      </section>

      {/* Transaction Management */}
      <section className="admin-section">
        <h2 className="section-title">Transaction Management</h2>

        <form className="add-form" onSubmit={handleAddTransaction}>
          <h3>Add New Transaction</h3>
          <div className="form-row">
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <option value="dividend">Dividend</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <input
              type="text"
              placeholder="Asset (e.g., AAPL)"
              value={newTransaction.asset}
              onChange={(e) => setNewTransaction({ ...newTransaction, asset: e.target.value.toUpperCase() })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Add
            </button>
          </div>
        </form>

        <div className="transactions-admin">
          {transactions.slice(0, 10).map((tx) => (
            <div key={tx.id} className="tx-edit-row">
              <span className="tx-type-badge">{tx.type}</span>
              <span className="tx-asset">{tx.asset}</span>
              <span className="tx-amount">${Math.abs(tx.amount).toFixed(2)}</span>
              <span className="tx-date">{tx.date}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTransaction(tx.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
