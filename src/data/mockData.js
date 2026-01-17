// Mock data for trading dashboard demo

// Generate candlestick data for the past 90 days
const generateCandlestickData = () => {
  const data = [];
  let basePrice = 100;
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const volatility = 0.02 + Math.random() * 0.03;
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

// Generate volume data matching candlestick dates
const generateVolumeData = (candlestickData) => {
  return candlestickData.map(candle => ({
    time: candle.time,
    value: Math.floor(100000 + Math.random() * 500000),
    color: candle.close >= candle.open ? '#26a69a' : '#ef5350',
  }));
};

// Initial balances
export const initialBalances = {
  totalEquity: 125750.00,
  availableCash: 45230.50,
  investedAmount: 80519.50,
  dailyPnL: 1234.56,
  dailyPnLPercent: 0.99,
  totalPnL: 15750.00,
  totalPnLPercent: 14.32,
};

// Transaction history
export const initialTransactions = [
  {
    id: 1,
    type: 'dividend',
    asset: 'AAPL',
    amount: 125.50,
    date: '2025-01-15',
    description: 'Quarterly dividend payment',
  },
  {
    id: 2,
    type: 'dividend',
    asset: 'MSFT',
    amount: 89.25,
    date: '2025-01-12',
    description: 'Quarterly dividend payment',
  },
  {
    id: 3,
    type: 'buy',
    asset: 'GOOGL',
    amount: -5420.00,
    shares: 30,
    price: 180.67,
    date: '2025-01-10',
    description: 'Market order executed',
  },
  {
    id: 4,
    type: 'dividend',
    asset: 'JNJ',
    amount: 67.80,
    date: '2025-01-08',
    description: 'Quarterly dividend payment',
  },
  {
    id: 5,
    type: 'sell',
    asset: 'TSLA',
    amount: 3250.00,
    shares: 10,
    price: 325.00,
    date: '2025-01-05',
    description: 'Limit order executed',
  },
  {
    id: 6,
    type: 'dividend',
    asset: 'PG',
    amount: 45.20,
    date: '2025-01-03',
    description: 'Quarterly dividend payment',
  },
  {
    id: 7,
    type: 'buy',
    asset: 'NVDA',
    amount: -8750.00,
    shares: 25,
    price: 350.00,
    date: '2024-12-28',
    description: 'Market order executed',
  },
  {
    id: 8,
    type: 'dividend',
    asset: 'KO',
    amount: 32.15,
    date: '2024-12-20',
    description: 'Quarterly dividend payment',
  },
];

// Portfolio holdings
export const initialHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgPrice: 175.00, currentPrice: 182.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, avgPrice: 380.00, currentPrice: 395.20 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 30, avgPrice: 180.67, currentPrice: 178.30 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 25, avgPrice: 350.00, currentPrice: 485.60 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, avgPrice: 280.00, currentPrice: 325.00 },
];

// Chart data
export const initialCandlestickData = generateCandlestickData();
export const initialVolumeData = generateVolumeData(initialCandlestickData);

// Available symbols for the chart
export const availableSymbols = [
  { value: 'PORTFOLIO', label: 'Portfolio Value' },
  { value: 'AAPL', label: 'Apple Inc.' },
  { value: 'MSFT', label: 'Microsoft Corp.' },
  { value: 'GOOGL', label: 'Alphabet Inc.' },
  { value: 'NVDA', label: 'NVIDIA Corp.' },
  { value: 'TSLA', label: 'Tesla Inc.' },
];
