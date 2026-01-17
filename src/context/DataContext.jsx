import { createContext, useContext, useState, useEffect } from 'react';
import {
  initialBalances,
  initialTransactions,
  initialHoldings,
  initialAccounts,
  initialMarketData,
  initialTickerData,
  initialCandlestickData,
  initialVolumeData,
} from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [balances, setBalances] = useState(initialBalances);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [holdings, setHoldings] = useState(initialHoldings);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [marketData, setMarketData] = useState(initialMarketData);
  const [tickerData, setTickerData] = useState(initialTickerData);
  const [candlestickData, setCandlestickData] = useState(initialCandlestickData);
  const [volumeData, setVolumeData] = useState(initialVolumeData);
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update market data
      setMarketData(prev =>
        prev.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
          change: coin.change + (Math.random() - 0.5) * 0.1,
        }))
      );

      // Update ticker
      setTickerData(prev =>
        prev.map(ticker => ({
          ...ticker,
          price: ticker.price * (1 + (Math.random() - 0.5) * 0.001),
        }))
      );

      // Update balances
      setBalances(prev => ({
        ...prev,
        totalAssets: prev.totalAssets + (Math.random() - 0.5) * 10,
        todayEarnings: prev.todayEarnings + (Math.random() - 0.5) * 5,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Admin functions
  const updateBalance = (field, value) => {
    setBalances(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateHolding = (symbol, field, value) => {
    setHoldings(prev =>
      prev.map(h =>
        h.symbol === symbol ? { ...h, [field]: parseFloat(value) || 0 } : h
      )
    );
  };

  const addHolding = (holding) => {
    setHoldings(prev => [...prev, holding]);
  };

  const deleteHolding = (symbol) => {
    setHoldings(prev => prev.filter(h => h.symbol !== symbol));
  };

  const updateMarketCoin = (symbol, field, value) => {
    setMarketData(prev =>
      prev.map(c =>
        c.symbol === symbol ? { ...c, [field]: parseFloat(value) || 0 } : c
      )
    );
  };

  const regenerateChartData = () => {
    const newData = [];
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

      newData.push({
        time: date.toISOString().split('T')[0],
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });

      basePrice = close;
    }

    setCandlestickData(newData);
    setVolumeData(
      newData.map(candle => ({
        time: candle.time,
        value: Math.floor(100000 + Math.random() * 500000),
        color: candle.close >= candle.open ? '#0ecb81' : '#f6465d',
      }))
    );
  };

  const value = {
    balances,
    transactions,
    holdings,
    accounts,
    marketData,
    tickerData,
    candlestickData,
    volumeData,
    selectedPair,
    setSelectedPair,
    updateBalance,
    addTransaction,
    deleteTransaction,
    updateHolding,
    addHolding,
    deleteHolding,
    updateMarketCoin,
    regenerateChartData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
