import { Search, Headphones, ArrowLeftRight, FileText, UserPlus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

const Home = () => {
  const { tickerData } = useData();

  const formatPrice = (price) => {
    if (!price) return '0.00';
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(2);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <div className="top-header">
        <div className="user-avatar">U</div>
        <div className="search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search coin name" />
        </div>
        <div className="header-icon">
          <Headphones size={20} />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-badge">Optitrade</div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>EXPERT ORDERS</div>
        <div className="promo-title">One Tap Access</div>
        <div className="promo-subtitle">Copy Expert Orders and Enjoy the Returns</div>
      </div>

      {/* Crypto Ticker */}
      <div className="crypto-ticker">
        {(tickerData || []).map((ticker, index) => (
          <div key={index} className="ticker-item">
            <div className="ticker-pair">
              {ticker.pair.split('/')[0]}/<span style={{ color: '#666' }}>{ticker.pair.split('/')[1]}</span>
              <span className={`ticker-change ${ticker.change >= 0 ? 'positive' : 'negative'}`}>
                {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}%
              </span>
            </div>
            <div className={`ticker-price ${ticker.change >= 0 ? 'text-positive' : 'text-negative'}`}>
              {formatPrice(ticker.price)}
            </div>
            <div style={{ fontSize: 11, color: '#666' }}>≈ ${formatPrice(ticker.price)}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">
          <div className="action-icon">
            <ArrowLeftRight size={20} />
          </div>
          <span className="action-label">Exchange</span>
        </button>
        <button className="action-btn">
          <div className="action-icon">
            <FileText size={20} />
          </div>
          <span className="action-label">Consume Record</span>
        </button>
        <button className="action-btn">
          <div className="action-icon">
            <UserPlus size={20} />
          </div>
          <span className="action-label">Invite friends</span>
        </button>
      </div>

      {/* Deposit/Withdraw Cards */}
      <div className="action-cards">
        <div className="action-card">
          <div>
            <div className="action-card-title">Deposit</div>
          </div>
          <div className="action-card-icon">
            <ArrowLeft size={20} color="#666" />
          </div>
        </div>
        <div className="action-card">
          <div>
            <div className="action-card-title">Withdraw</div>
          </div>
          <div className="action-card-icon">
            <ArrowRight size={20} color="#666" />
          </div>
        </div>
      </div>

      {/* Market Preview Banner */}
      <div style={{ margin: '12px 16px', padding: 16, background: '#1a1a1a', borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 32 }}>🏆</div>
          <div>
            <div style={{ fontWeight: 600 }}>Follow market trends, trade every day</div>
            <div style={{ fontSize: 13, color: '#888' }}>Achieve financial freedom</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #f0b90b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={16} color="#f0b90b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
