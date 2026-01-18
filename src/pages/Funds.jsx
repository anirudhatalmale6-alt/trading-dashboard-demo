import { useState } from 'react';
import { Eye, Download, Upload, ArrowLeftRight, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

const Funds = () => {
  const { balances, accounts } = useData();
  const [activeTab, setActiveTab] = useState('total');

  if (!balances || !accounts) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Loading...</div>;
  }

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="funds-page">
      <div className="page-title">Asset</div>

      {/* Asset Tabs */}
      <div className="asset-tabs">
        <button
          className={`asset-tab ${activeTab === 'total' ? 'active' : ''}`}
          onClick={() => setActiveTab('total')}
        >
          Total assets
        </button>
        <button
          className={`asset-tab ${activeTab === 'spot' ? 'active' : ''}`}
          onClick={() => setActiveTab('spot')}
        >
          Spot
        </button>
        <button
          className={`asset-tab ${activeTab === 'contract' ? 'active' : ''}`}
          onClick={() => setActiveTab('contract')}
        >
          Contract
        </button>
        <button
          className={`asset-tab ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          Financial
        </button>
      </div>

      {/* Asset Header */}
      <div className="asset-header">
        <div className="asset-icon">₮</div>
        <div className="asset-uid">UID:{balances.uid}</div>

        <div className="asset-label">
          Total assets (USDT) <Eye size={14} />
        </div>
        <div className="total-assets">{formatNumber(balances.totalAssets)}</div>
        <div className="total-usd">≈${formatNumber(balances.totalAssetsUSD)}</div>
        <div className="today-earnings">
          Today's Earnings {balances.todayEarnings >= 0 ? '+' : ''}{formatNumber(balances.todayEarnings)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="asset-actions">
        <button className="asset-action-btn">
          <div className="asset-action-icon">
            <Download size={22} />
          </div>
          <span className="asset-action-label">Deposit</span>
        </button>
        <button className="asset-action-btn">
          <div className="asset-action-icon">
            <Upload size={22} />
          </div>
          <span className="asset-action-label">Withdraw</span>
        </button>
        <button className="asset-action-btn">
          <div className="asset-action-icon">
            <ArrowLeftRight size={22} />
          </div>
          <span className="asset-action-label">Exchange</span>
        </button>
        <button className="asset-action-btn">
          <div className="asset-action-icon">
            <FileText size={22} />
          </div>
          <span className="asset-action-label">Consume Record</span>
        </button>
      </div>

      {/* Portfolio Breakdown */}
      <div className="portfolio-section">
        <div className="portfolio-title">Portfolio</div>
        {accounts.map((account, index) => (
          <div key={index} className="portfolio-item">
            <div className="portfolio-left">
              <div className="portfolio-icon">
                {account.name === 'Spot' ? '💰' : account.name.includes('Contract') ? '📊' : '📈'}
              </div>
              <div className="portfolio-name">{account.name}</div>
            </div>
            <div className="portfolio-right">
              <div className="portfolio-amount">{formatNumber(account.amount)} USDT</div>
              <div className="portfolio-usd">≈$ {formatNumber(account.usdValue)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Funds;
