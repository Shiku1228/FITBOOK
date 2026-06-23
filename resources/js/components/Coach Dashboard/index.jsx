import { useState, useEffect, useRef } from "react";
import { T, css } from '../AthleteDashboard/theme.jsx';
import { coachCss, MONTHLY, SESSIONS, WEEK_SLOTS, BOOKED_SLOTS, REVIEWS, CERTS, TRANSACTIONS } from './theme';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Bell, Settings, LogOut } from "lucide-react";
import Sidebar from "../Shared/Sidebar";
import DashboardHome from './pages/DashboardHome';
import SessionsPage from './pages/SessionsPage';
import AvailabilityPage from './pages/AvailabilityPage';
import EarningsPage from './pages/EarningsPage';
import ReviewsPage from './pages/ReviewsPage';
import ProfilePage from './pages/ProfilePage';

const pageTitleMap = {
  "/dashboard": "Dashboard",
  "/sessions": "My Sessions",
  "/availability": "Availability",
  "/earnings": "Earnings",
  "/reviews": "Reviews",
  "/profile": "Profile",
};

export default function CoachDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notifRef = useRef(null);
  const settingsRef = useRef(null);
  const notifBtnRef = useRef(null);
  const settingsBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target) && notifBtnRef.current && !notifBtnRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target) && settingsBtnRef.current && !settingsBtnRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <>
      <style>{css}{coachCss}</style>
      <div className="dash-root">
        <Sidebar role="coach" />
        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="topbar-title">{pageTitle}</div>
              {location.pathname === "/dashboard" && (
                <span className="topbar-pill">● 2 sessions today</span>
              )}
            </div>
            <div className="topbar-right">
              <button
                ref={notifBtnRef}
                onClick={() => { alert('Notification clicked!'); setShowNotifications(!showNotifications); }}
                style={{ cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: T.navy3, border: '1px solid rgba(255,255,255,0.08)', color: T.muted, transition: 'all 0.15s', position: 'relative', zIndex: 1 }}
                onMouseEnter={(e) => e.currentTarget.style.color = T.white}
                onMouseLeave={(e) => e.currentTarget.style.color = T.muted}
              >
                <Bell size={18} />
                <span className="notif-dot" style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', borderRadius: '50%', background: T.lime }} />
              </button>
              <button
                ref={settingsBtnRef}
                onClick={() => { alert('Settings clicked!'); setShowSettings(!showSettings); }}
                style={{ cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: T.navy3, border: '1px solid rgba(255,255,255,0.08)', color: T.muted, transition: 'all 0.15s', marginLeft: '8px', zIndex: 1 }}
                onMouseEnter={(e) => e.currentTarget.style.color = T.white}
                onMouseLeave={(e) => e.currentTarget.style.color = T.muted}
              >
                <Settings size={18} />
              </button>
              <div className="topbar-icon-btn" onClick={handleLogout} style={{ cursor: 'pointer' }} title="Logout">
                <LogOut size={18} />
              </div>
              <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: 14 }}>RC</div>
            </div>

            {/* Notifications Dropdown - positioned outside */}
            {showNotifications && (
              <div className="dropdown-panel notif-dropdown" ref={notifRef} style={{ position: 'fixed', top: '70px', right: '100px', display: 'block' }}>
                <div className="dropdown-header">
                  <span className="dropdown-title">Notifications</span>
                  <span className="dropdown-action">Mark all read</span>
                </div>
                <div className="dropdown-body">
                  <div className="notif-item">
                    <span className="notif-dot-icon" style={{ background: T.lime }} />
                    <div>
                      <div className="notif-text">New booking request from <strong>Mark Tobias</strong> for tomorrow 7:00 AM</div>
                      <div className="notif-time">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="notif-item">
                    <span className="notif-dot-icon" style={{ background: T.success }} />
                    <div>
                      <div className="notif-text">Session with <strong>Renz Latangga</strong> confirmed</div>
                      <div className="notif-time">1 hour ago</div>
                    </div>
                  </div>
                  <div className="notif-item">
                    <span className="notif-dot-icon" style={{ background: T.warning }} />
                    <div>
                      <div className="notif-text">Payment received: <strong>₱720</strong> from Ana Reyes</div>
                      <div className="notif-time">3 hours ago</div>
                    </div>
                  </div>
                  <div className="notif-item">
                    <span className="notif-dot-icon" style={{ background: 'rgba(255,255,255,0.3)' }} />
                    <div>
                      <div className="notif-text">Your profile is now <strong>#1 match</strong> for basketball in Pasig</div>
                      <div className="notif-time">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Dropdown - positioned outside */}
            {showSettings && (
              <div className="dropdown-panel settings-dropdown" ref={settingsRef} style={{ position: 'fixed', top: '70px', right: '60px', display: 'block' }}>
                <div className="dropdown-body">
                  <div className="settings-item" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <span>Profile Settings</span>
                  </div>
                  <div className="settings-item" onClick={() => navigate('/availability')} style={{ cursor: 'pointer' }}>
                    <span>Availability</span>
                  </div>
                  <div className="settings-item" style={{ cursor: 'pointer' }}>
                    <span>Notification Preferences</span>
                  </div>
                  <div className="settings-item" style={{ cursor: 'pointer' }}>
                    <span>Payment Settings</span>
                  </div>
                  <div className="settings-divider" />
                  <div className="settings-item" onClick={handleLogout} style={{ cursor: 'pointer', color: T.danger }}>
                    <span>Sign Out</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="page-content">
            <Routes>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/availability" element={<AvailabilityPage />} />
              <Route path="/earnings" element={<EarningsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<DashboardHome />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}
