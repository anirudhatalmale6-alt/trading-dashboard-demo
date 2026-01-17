import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <TrendingUp className="logo-icon" />
        <span className="logo-text">TradingView</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Admin Panel</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
