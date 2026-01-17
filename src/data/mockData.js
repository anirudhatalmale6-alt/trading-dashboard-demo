// Mock data for crypto exchange dashboard

// Generate candlestick data
const generateCandlestickData = () => {
  const data = [];
  let basePrice = 95000;
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const volatility = 0.015 + Math.random() * 0.025;
    const trend = Math.random() > 0.5 ? 1 : -1;

    const open = basePrice;
    const change = basePrice * volatility * trend;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.abs(change) * Math.random();
    const low = Math.min(open, close) - Math.abs(change) * Math.random();

    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });

    basePrice = close;
  }

  return data;
};

// Generate volume data
const generateVolumeData = (candlestickData) => {
  return candlestickData.map(candle => ({
    time: candle.time,
    value: Math.floor(100000 + Math.random() * 500000),
    color: candle.close >= candle.open ? '#0ecb81' : '#f6465d',
  }));
};

// User balance
export const initialBalances = {
  totalAssets: 12458.50,
  totalAssetsUSD: 12458.50,
  todayEarnings: 125.30,
  todayEarningsPercent: 1.02,
  uid: '5757171',
};

// Crypto holdings
export const initialHoldings = [
  { symbol: 'USDT', name: 'Tether', amount: 5420.50, usdValue: 5420.50, icon: '₮' },
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.045, usdValue: 4275.00, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', amount: 0.82, usdValue: 2680.00, icon: 'Ξ' },
  { symbol: 'BNB', name: 'BNB', amount: 0.15, usdValue: 83.00, icon: 'B' },
];

// Portfolio accounts
export const initialAccounts = [
  { name: 'Spot', amount: 10245.30, usdValue: 10245.30 },
  { name: 'Contract account', amount: 1850.20, usdValue: 1850.20 },
  { name: 'Delivery contract account', amount: 363.00, usdValue: 363.00 },
];

// Market data
export const initialMarketData = [
  { symbol: 'BTC', pair: 'USDT', price: 95157.06, change: -0.33, sparkline: 'down' },
  { symbol: 'ETH', pair: 'USDT', price: 3308.95, change: 0.39, sparkline: 'up' },
  { symbol: 'TRUMP', pair: 'USDT', price: 5.3155, change: -1.45, sparkline: 'down' },
  { symbol: 'XTZ', pair: 'USDT', price: 0.6021, change: -3.39, sparkline: 'down' },
  { symbol: 'ADA', pair: 'USDT', price: 0.396477, change: 0.29, sparkline: 'up' },
  { symbol: 'MLN', pair: 'USDT', price: 5.313, change: -0.44, sparkline: 'down' },
  { symbol: 'TRX', pair: 'USDT', price: 0.318591, change: 2.99, sparkline: 'up' },
  { symbol: 'BNB', pair: 'USDT', price: 947.61, change: 1.12, sparkline: 'up' },
  { symbol: 'YFI', pair: 'USDT', price: 3668.83, change: 5.28, sparkline: 'up' },
  { symbol: 'SOL', pair: 'USDT', price: 187.42, change: 2.15, sparkline: 'up' },
];

// Ticker data
export const initialTickerData = [
  { pair: 'BTC/USDT', price: 95071.91, change: -0.29 },
  { pair: 'ETH/USDT', price: 3296.68, change: 0.32 },
  { pair: 'YFI/USDT', price: 3681.66, change: 6.77 },
  { pair: 'LTC/USDT', price: 74.62, change: -1.23 },
];

// Transaction history
export const initialTransactions = [
  { id: 1, type: 'deposit', asset: 'USDT', amount: 1000.00, date: '2025-01-15', status: 'completed' },
  { id: 2, type: 'buy', asset: 'BTC', amount: 0.01, price: 95000, date: '2025-01-14', status: 'completed' },
  { id: 3, type: 'sell', asset: 'ETH', amount: 0.5, price: 3300, date: '2025-01-12', status: 'completed' },
  { id: 4, type: 'withdraw', asset: 'USDT', amount: 500.00, date: '2025-01-10', status: 'completed' },
  { id: 5, type: 'buy', asset: 'BNB', amount: 0.15, price: 550, date: '2025-01-08', status: 'completed' },
];

// Chart data
export const initialCandlestickData = generateCandlestickData();
export const initialVolumeData = generateVolumeData(initialCandlestickData);

// Available trading pairs
export const tradingPairs = [
  { value: 'BTC/USDT', label: 'BTC/USDT' },
  { value: 'ETH/USDT', label: 'ETH/USDT' },
  { value: 'BNB/USDT', label: 'BNB/USDT' },
  { value: 'SOL/USDT', label: 'SOL/USDT' },
];
