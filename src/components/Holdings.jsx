import { useData } from '../context/DataContext';

const Holdings = () => {
  const { holdings } = useData();

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
    <div className="holdings">
      <h2 className="section-title">Portfolio Holdings</h2>
      <div className="holdings-table">
        <div className="holdings-header">
          <div className="col-symbol">Symbol</div>
          <div className="col-shares">Shares</div>
          <div className="col-price">Price</div>
          <div className="col-value">Value</div>
          <div className="col-pnl">P&L</div>
        </div>
        {holdings.map((holding) => {
          const value = holding.shares * holding.currentPrice;
          const cost = holding.shares * holding.avgPrice;
          const pnl = value - cost;
          const pnlPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;

          return (
            <div key={holding.symbol} className="holdings-row">
              <div className="col-symbol">
                <div className="symbol-name">{holding.symbol}</div>
                <div className="symbol-company">{holding.name}</div>
              </div>
              <div className="col-shares">{holding.shares}</div>
              <div className="col-price">{formatCurrency(holding.currentPrice)}</div>
              <div className="col-value">{formatCurrency(value)}</div>
              <div className={`col-pnl ${pnl >= 0 ? 'positive' : 'negative'}`}>
                <div>{formatCurrency(pnl)}</div>
                <div className="pnl-percent">{formatPercent(pnlPercent)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holdings;
