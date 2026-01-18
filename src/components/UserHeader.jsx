import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const UserHeader = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="user-header">
      <div className="user-info">
        <div className="user-avatar-small">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="user-name">{user.username}</div>
          <div className="user-role">{user.role}</div>
        </div>
      </div>
      <button className="logout-btn" onClick={logout}>
        <LogOut size={14} style={{ marginRight: 6 }} />
        Logout
      </button>
    </div>
  );
};

export default UserHeader;
