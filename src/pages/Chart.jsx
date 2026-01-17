import { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useData } from '../context/DataContext';
import { tradingPairs } from '../data/mockData';

const Chart = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const { candlestickData, volumeData, selectedPair, setSelectedPair, marketData } = useData();
  const [activeTime, setActiveTime] = useState('1h');
  const [activeIndicator, setActiveIndicator] = useState('VOL');

  const timeframes = ['Line', '1m', '5m', '15m', '30m', '1h', '4h', '1D', '1w', '1M'];
  const indicators = ['MA', 'EMA', 'BOLL', 'VOL', 'MACD', 'KDJ', 'RSI'];

  const currentCoin = marketData.find(c => `${c.symbol}/USDT` === selectedPair) || marketData[0];
  const currentPrice = currentCoin?.price || 95000;
  const priceChange = currentCoin?.change || 0;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: '#000000' },
        textColor: '#888888',
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#2a2a2a',
      },
      timeScale: {
        borderColor: '#2a2a2a',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#0ecb81',
      downColor: '#f6465d',
      borderDownColor: '#f6465d',
      borderUpColor: '#0ecb81',
      wickDownColor: '#f6465d',
      wickUpColor: '#0ecb81',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#0ecb81',
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    candlestickSeries.setData(candlestickData);
    volumeSeries.setData(volumeData);

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [candlestickData, volumeData]);

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="chart-page">
      {/* Header */}
      <div className="chart-header-bar">
        <div>
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {tradingPairs.map(pair => (
              <option key={pair.value} value={pair.value} style={{ background: '#111' }}>
                {pair.label}
              </option>
            ))}
          </select>
        </div>
        <div className="chart-price-info">
          <div className={`chart-current-price ${priceChange >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatPrice(currentPrice)}
          </div>
          <div className={`chart-price-change ${priceChange >= 0 ? 'text-positive' : 'text-negative'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Time Selector */}
      <div className="time-selector">
        {timeframes.map(time => (
          <button
            key={time}
            className={`time-btn ${activeTime === time ? 'active' : ''}`}
            onClick={() => setActiveTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-container" ref={chartContainerRef} />

      {/* Indicators */}
      <div className="chart-indicators">
        {indicators.map(ind => (
          <button
            key={ind}
            className={`indicator-btn ${activeIndicator === ind ? 'active' : ''}`}
            onClick={() => setActiveIndicator(ind)}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Trade Buttons */}
      <div className="trade-buttons">
        <button className="buy-btn">Buy Long 50.00%</button>
        <button className="sell-btn">Buy Short 50.00%</button>
      </div>
    </div>
  );
};

export default Chart;
