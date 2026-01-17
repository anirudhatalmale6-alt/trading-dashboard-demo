import { createContext, useContext, useState, useEffect } from 'react';
import {
  initialBalances,
  initialTransactions,
  initialHoldings,
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
  const [candlestickData, setCandlestickData] = useState(initialCandlestickData);
  const [volumeData, setVolumeData] = useState(initialVolumeData);
  const [selectedSymbol, setSelectedSymbol] = useState('PORTFOLIO');

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBalances(prev => {
        const change = (Math.random() - 0.5) * 100;
        const newDailyPnL = prev.dailyPnL + change;
        return {
          ...prev,
          totalEquity: prev.totalEquity + change,
          dailyPnL: newDailyPnL,
          dailyPnLPercent: (newDailyPnL / (prev.totalEquity - prev.dailyPnL)) * 100,
        };
      });

      // Update holdings prices slightly
      setHoldings(prev =>
        prev.map(holding => ({
          ...holding,
          currentPrice: holding.currentPrice * (1 + (Math.random() - 0.5) * 0.002),
        }))
      );
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

  const regenerateChartData = () => {
    const newData = [];
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
        color: candle.close >= candle.open ? '#26a69a' : '#ef5350',
      }))
    );
  };

  const value = {
    balances,
    transactions,
    holdings,
    candlestickData,
    volumeData,
    selectedSymbol,
    setSelectedSymbol,
    updateBalance,
    addTransaction,
    deleteTransaction,
    updateHolding,
    addHolding,
    deleteHolding,
    regenerateChartData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
