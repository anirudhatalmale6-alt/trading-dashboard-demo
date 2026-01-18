import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Market from './pages/Market';
import Trade from './pages/Trade';
import Funds from './pages/Funds';
import Chart from './pages/Chart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './styles/main.css';

// Protected route wrapper - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin route wrapper - redirects to home if not admin
const AdminRoute = ({ children }) => {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Bottom navigation - only show when logged in and not on login page
const ConditionalBottomNav = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated() || location.pathname === '/login') {
    return null;
  }

  return <BottomNav />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <div className="app">
            <div className="app-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute><Home /></ProtectedRoute>
                } />
                <Route path="/market" element={
                  <ProtectedRoute><Market /></ProtectedRoute>
                } />
                <Route path="/trade" element={
                  <ProtectedRoute><Trade /></ProtectedRoute>
                } />
                <Route path="/funds" element={
                  <ProtectedRoute><Funds /></ProtectedRoute>
                } />
                <Route path="/chart" element={
                  <ProtectedRoute><Chart /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <AdminRoute><Admin /></AdminRoute>
                } />
              </Routes>
            </div>
            <ConditionalBottomNav />
          </div>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
