# Trading Dashboard

A modern, responsive trading dashboard built with React and Lightweight Charts.

## Features

- **Real-time Balance Display**: Track total equity, available cash, and P&L
- **Interactive Candlestick Charts**: Powered by TradingView's Lightweight Charts
- **Activity History**: View dividends, buys, and sells
- **Portfolio Holdings**: Track your positions with live P&L calculations
- **Admin Panel**: Adjust all values for demo/testing purposes

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18
- Vite
- Lightweight Charts (TradingView)
- React Router
- Lucide React (icons)

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── BalanceCard.jsx
│   ├── CandlestickChart.jsx
│   ├── Holdings.jsx
│   ├── Sidebar.jsx
│   └── TransactionHistory.jsx
├── context/          # React Context for state management
│   └── DataContext.jsx
├── data/             # Mock data
│   └── mockData.js
├── pages/            # Page components
│   ├── Admin.jsx
│   └── Dashboard.jsx
└── styles/           # CSS styles
    └── main.css
```

## Admin Panel

Access the Admin Panel via the sidebar to:
- Modify balance values
- Add/remove holdings
- Create/delete transactions
- Regenerate chart data

## Demo

The dashboard comes with pre-loaded mock data. All values update in real-time to simulate a live trading environment.

## License

MIT
