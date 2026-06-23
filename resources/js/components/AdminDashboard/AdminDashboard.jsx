import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { T, css } from '../AthleteDashboard/theme';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  DollarSign,
  Calendar,
  LogOut,
  Bell,
  Settings,
  Search,
  ChevronDown
} from 'lucide-react';

// Pages
import DashboardHome from './pages/DashboardHome';
import UsersManagement from './pages/UsersManagement';
import VerificationQueue from './pages/VerificationQueue';
import RevenueReports from './pages/RevenueReports';
import BookingReports from './pages/BookingReports';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/verification', icon: ShieldCheck, label: 'Verification' },
    { path: '/admin/revenue', icon: DollarSign, label: 'Revenue' },
    { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        FIT<span>BOOK</span>
      </div>
      
      <div className="sidebar-section-label">Admin</div>
      <div className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <item.icon size={18} />
            </span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="sidebar-avatar">
        <div className="avatar-circle">AD</div>
        <div>
          <div className="avatar-name">Admin User</div>
          <div className="avatar-role">Administrator</div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ title }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
      });
      window.location.href = '/auth';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/auth';
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{title}</div>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-search">
          <Search size={16} style={{color: T.muted}} />
          <input type="text" placeholder="Search..." />
        </div>
        
        <button 
          className="topbar-icon-btn"
          onClick={() => setShowNotif(!showNotif)}
        >
          <Bell size={18} />
          <span className="notif-dot"></span>
        </button>
        
        <button 
          className="topbar-icon-btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={18} />
        </button>
        
        <button className="topbar-icon-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>

      {showNotif && (
        <div className="dropdown-panel" style={{top: '60px', right: '100px'}}>
          <div className="dropdown-header">
            <div className="dropdown-title">Notifications</div>
            <div className="dropdown-action">Mark all read</div>
          </div>
          <div className="dropdown-body">
            <div className="notif-item">
              <span className="notif-dot-icon" style={{background: T.lime}}></span>
              <div>
                <div className="notif-text"><strong>5 new coaches</strong> pending verification</div>
                <div className="notif-time">2 minutes ago</div>
              </div>
            </div>
            <div className="notif-item">
              <span className="notif-dot-icon" style={{background: T.warning}}></span>
              <div>
                <div className="notif-text">Revenue milestone: <strong>₱100K</strong> reached this month</div>
                <div className="notif-time">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="dropdown-panel" style={{top: '60px', right: '50px'}}>
          <div className="dropdown-header">
            <div className="dropdown-title">Settings</div>
          </div>
          <div className="dropdown-body">
            <div className="settings-item">
              <Settings size={16} />
              Account Settings
            </div>
            <div className="settings-divider"></div>
            <div className="settings-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <LogOut size={16} />
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="dash-root">
      <style>{css}</style>
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/admin/dashboard" element={<><Topbar title="Overview" /><DashboardHome /></>} />
          <Route path="/admin/users" element={<><Topbar title="User Management" /><UsersManagement /></>} />
          <Route path="/admin/verification" element={<><Topbar title="Verification Queue" /><VerificationQueue /></>} />
          <Route path="/admin/revenue" element={<><Topbar title="Revenue Reports" /><RevenueReports /></>} />
          <Route path="/admin/bookings" element={<><Topbar title="Booking Reports" /><BookingReports /></>} />
        </Routes>
      </div>
    </div>
  );
}
