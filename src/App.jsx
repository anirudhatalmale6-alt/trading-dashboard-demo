import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Market from './pages/Market';
import Trade from './pages/Trade';
import Funds from './pages/Funds';
import Chart from './pages/Chart';
import Admin from './pages/Admin';
import './styles/main.css';

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <BottomNav />
        </div>
      </HashRouter>
    </DataProvider>
  );
}

export default App;
