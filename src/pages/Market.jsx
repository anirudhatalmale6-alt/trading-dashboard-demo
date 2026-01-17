import { useState } from 'react';
import { Search } from 'lucide-react';
import { useData } from '../context/DataContext';

const MiniSparkline = ({ trend }) => {
  const points = trend === 'up'
    ? "0,20 10,18 20,22 30,15 40,17 50,10 60,12 70,8 80,5"
    : "0,5 10,8 20,6 30,10 40,8 50,15 60,12 70,18 80,20";

  const color = trend === 'up' ? '#0ecb81' : '#f6465d';

  return (
    <svg viewBox="0 0 80 25" style={{ width: '100%', height: '100%' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

const Market = () => {
  const { marketData } = useData();
  const [activeTab, setActiveTab] = useState('spot');
  const [activeFilter, setActiveFilter] = useState('hot');

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `USDT ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `USDT ${price.toFixed(2)}`;
    } else {
      return `USDT ${price.toFixed(6)}`;
    }
  };

  const getCoinIconClass = (symbol) => {
    const classes = {
      'BTC': 'btc',
      'ETH': 'eth',
      'BNB': 'bnb',
      'ADA': 'ada',
      'SOL': 'sol',
      'XRP': 'xrp',
    };
    return classes[symbol] || 'default';
  };

  return (
    <div className="market-page">
      {/* Search Bar */}
      <div style={{ padding: '12px 16px' }}>
        <div className="search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search coin name" />
        </div>
      </div>

      {/* Tabs */}
      <div className="market-header">
        <button
          className={`market-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={`market-tab ${activeTab === 'spot' ? 'active' : ''}`}
          onClick={() => setActiveTab('spot')}
        >
          Spot
        </button>
        <button
          className={`market-tab ${activeTab === 'contract' ? 'active' : ''}`}
          onClick={() => setActiveTab('contract')}
        >
          Contract
        </button>
      </div>

      {/* Filters */}
      <div className="market-filters">
        <button
          className={`market-filter ${activeFilter === 'hot' ? 'active' : ''}`}
          onClick={() => setActiveFilter('hot')}
        >
          Hot
        </button>
        <button
          className={`market-filter ${activeFilter === 'gainers' ? 'active' : ''}`}
          onClick={() => setActiveFilter('gainers')}
        >
          Gainers
        </button>
        <button
          className={`market-filter ${activeFilter === 'losers' ? 'active' : ''}`}
          onClick={() => setActiveFilter('losers')}
        >
          Losers
        </button>
        <button
          className={`market-filter ${activeFilter === '24h' ? 'active' : ''}`}
          onClick={() => setActiveFilter('24h')}
        >
          24h Vol
        </button>
      </div>

      {/* Market List */}
      <div className="market-list">
        {marketData.map((coin, index) => (
          <div key={index} className="market-item">
            <div className="coin-info">
              <div className={`coin-icon ${getCoinIconClass(coin.symbol)}`}>
                {coin.symbol.charAt(0)}
              </div>
              <div>
                <div className="coin-name">{coin.symbol}</div>
                <div className="coin-pair">/{coin.pair}</div>
              </div>
            </div>
            <div className="mini-chart">
              <MiniSparkline trend={coin.sparkline} />
            </div>
            <div className="coin-price">
              <div className="price-value">{formatPrice(coin.price)}</div>
              <div className={`price-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
                {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
