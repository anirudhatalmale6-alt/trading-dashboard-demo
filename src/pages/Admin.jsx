import { useState } from 'react';
import { ChevronLeft, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Admin = () => {
  const navigate = useNavigate();
  const {
    balances,
    updateBalance,
    holdings,
    updateHolding,
    addHolding,
    deleteHolding,
    marketData,
    updateMarketCoin,
    regenerateChartData,
  } = useData();

  const [newHolding, setNewHolding] = useState({
    symbol: '',
    name: '',
    amount: '',
    usdValue: '',
    icon: '',
  });

  const handleAddHolding = (e) => {
    e.preventDefault();
    if (!newHolding.symbol || !newHolding.amount) return;

    addHolding({
      ...newHolding,
      amount: parseFloat(newHolding.amount),
      usdValue: parseFloat(newHolding.usdValue),
    });

    setNewHolding({ symbol: '', name: '', amount: '', usdValue: '', icon: '' });
  };

  return (
    <div className="admin-page">
      <div className="page-title-with-back">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="page-title-text">Admin Panel</div>
      </div>

      {/* Balance Settings */}
      <div className="admin-section">
        <div className="admin-section-title">Balance Settings</div>
        <div className="admin-field">
          <label>Total Assets (USDT)</label>
          <input
            type="number"
            value={balances.totalAssets.toFixed(2)}
            onChange={(e) => updateBalance('totalAssets', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Today's Earnings</label>
          <input
            type="number"
            value={balances.todayEarnings.toFixed(2)}
            onChange={(e) => updateBalance('todayEarnings', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>User ID</label>
          <input
            type="text"
            value={balances.uid}
            onChange={(e) => updateBalance('uid', e.target.value)}
          />
        </div>
      </div>

      {/* Chart Controls */}
      <div className="admin-section">
        <div className="admin-section-title">Chart Data</div>
        <button className="admin-btn" onClick={regenerateChartData}>
          <RefreshCw size={16} style={{ marginRight: 8 }} />
          Regenerate Chart Data
        </button>
      </div>

      {/* Market Prices */}
      <div className="admin-section">
        <div className="admin-section-title">Market Prices</div>
        {marketData.slice(0, 5).map((coin) => (
          <div key={coin.symbol} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{coin.symbol}/USDT</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                placeholder="Price"
                value={coin.price.toFixed(2)}
                onChange={(e) => updateMarketCoin(coin.symbol, 'price', e.target.value)}
                style={{ flex: 1, padding: '8px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
              />
              <input
                type="number"
                placeholder="Change %"
                value={coin.change.toFixed(2)}
                onChange={(e) => updateMarketCoin(coin.symbol, 'change', e.target.value)}
                style={{ width: 80, padding: '8px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Holdings Management */}
      <div className="admin-section">
        <div className="admin-section-title">Holdings</div>
        {holdings.map((holding) => (
          <div key={holding.symbol} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: 12, background: '#1a1a1a', borderRadius: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 50 }}>{holding.symbol}</span>
            <input
              type="number"
              value={holding.amount}
              onChange={(e) => updateHolding(holding.symbol, 'amount', e.target.value)}
              style={{ flex: 1, padding: '8px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 4, color: '#fff' }}
            />
            <input
              type="number"
              value={holding.usdValue.toFixed(2)}
              onChange={(e) => updateHolding(holding.symbol, 'usdValue', e.target.value)}
              style={{ width: 100, padding: '8px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 4, color: '#fff' }}
            />
            <button
              onClick={() => deleteHolding(holding.symbol)}
              style={{ padding: 8, background: 'transparent', border: '1px solid #f6465d', borderRadius: 4, color: '#f6465d', cursor: 'pointer' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div style={{ marginTop: 16, padding: 16, background: '#1a1a1a', borderRadius: 8 }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Add New Holding</div>
          <form onSubmit={handleAddHolding}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="text"
                placeholder="Symbol (e.g., SOL)"
                value={newHolding.symbol}
                onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value.toUpperCase() })}
                style={{ padding: '10px 12px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
              />
              <input
                type="text"
                placeholder="Name"
                value={newHolding.name}
                onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
                style={{ padding: '10px 12px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newHolding.amount}
                  onChange={(e) => setNewHolding({ ...newHolding, amount: e.target.value })}
                  style={{ flex: 1, padding: '10px 12px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder="USD Value"
                  value={newHolding.usdValue}
                  onChange={(e) => setNewHolding({ ...newHolding, usdValue: e.target.value })}
                  style={{ flex: 1, padding: '10px 12px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 6, color: '#fff' }}
                />
              </div>
              <button type="submit" className="admin-btn">
                <Plus size={16} style={{ marginRight: 8 }} />
                Add Holding
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
