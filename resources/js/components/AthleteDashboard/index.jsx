import React from "react";
import { Search, Bell, Menu, Settings, LogOut } from "lucide-react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { T, css } from "./theme";
import Sidebar from "../Shared/Sidebar";
import DashboardHome from "./pages/DashboardHome.jsx";
import SearchPage from "./pages/SearchPage";
import AIMatchPage from "./pages/AIMatchPage";
import BookingsPage from "./pages/BookingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";

const pageTitleMap = {
  "/dashboard": "Dashboard",
  "/courts": "Find Courts",
  "/ai-match": "AI Coach Match",
  "/bookings": "My Bookings",
  "/payments": "Payments",
  "/notifications": "Notifications",
  "/profile": "Profile",
};

export default function AthleteDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";

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
      <style>{css}</style>
      <div className="dash-root">
        <Sidebar />
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{pageTitle}</div>
            <div className="topbar-search">
              <Search size={16} color={T.muted} />
              <input placeholder="Search anything…" />
            </div>
            <div className="topbar-icon-btn">
              <Bell size={18} />
              <span className="notif-dot" />
            </div>
            <div className="topbar-icon-btn"><Settings size={18} /></div>
            <div className="topbar-icon-btn" onClick={handleLogout} style={{ cursor: 'pointer' }} title="Logout">
              <LogOut size={18} />
            </div>
            <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: 14 }}>RL</div>
          </div>
          <div className="page-content">
            <Routes>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/courts" element={<SearchPage />} />
              <Route path="/ai-match" element={<AIMatchPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<DashboardHome />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}
