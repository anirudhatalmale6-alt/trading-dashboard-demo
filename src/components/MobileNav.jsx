import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, TrendingUp, LayoutDashboard, Settings } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="mobile-header">
        <div className="logo">
          <TrendingUp className="logo-icon" />
          <span className="logo-text">TradingView</span>
        </div>
        <button className="menu-btn" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </header>

      {isOpen && (
        <div className="mobile-nav-overlay open" onClick={closeMenu} />
      )}

      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo">
            <TrendingUp className="logo-icon" />
            <span className="logo-text">TradingView</span>
          </div>
          <button className="close-btn" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Settings size={20} />
            <span>Admin Panel</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
