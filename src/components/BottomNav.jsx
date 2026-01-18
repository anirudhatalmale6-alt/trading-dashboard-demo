import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, Target, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const { isAdmin } = useAuth();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">
          <Home size={22} />
        </div>
        <span>Home</span>
      </NavLink>
      <NavLink to="/market" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">
          <TrendingUp size={22} />
        </div>
        <span>Market</span>
      </NavLink>
      <NavLink to="/trade" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">
          <Target size={22} />
        </div>
        <span>Trade</span>
      </NavLink>
      {isAdmin() && (
        <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon">
            <Settings size={22} />
          </div>
          <span>Admin</span>
        </NavLink>
      )}
      <NavLink to="/funds" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">
          <User size={22} />
        </div>
        <span>Funds</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
