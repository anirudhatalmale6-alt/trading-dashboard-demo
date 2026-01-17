import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import './styles/main.css';

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="app-layout">
          <Sidebar />
          <MobileNav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </DataProvider>
  );
}

export default App;
