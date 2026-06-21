import React from "react";
import { useState } from "react";
import { Bell, Settings, LogOut, AlertTriangle } from "lucide-react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { T, css } from "../AthleteDashboard/theme";
import Sidebar from "../Shared/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import BookingsPage from "./pages/BookingsPage";
import SlotsPage from "./pages/SlotsPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import EarningsPage from "./pages/EarningsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";

const pageTitleMap = {
  "/dashboard": "Dashboard",
  "/bookings": "Bookings",
  "/slots": "Slot Manager",
  "/facilities": "My Facilities",
  "/earnings": "Earnings",
  "/reviews": "Reviews",
  "/profile": "Profile",
};

export default function OwnerDashboard() {
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
        <Sidebar role="facility_owner" />
        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="topbar-title">{pageTitle}</div>
              {location.pathname === "/dashboard" && (
                <span className="topbar-pill">● 2 pending requests</span>
              )}
            </div>
            <div className="topbar-right">
              <div className="topbar-icon-btn">
                <Bell size={18} />
                <span className="notif-dot" />
              </div>
              <div className="topbar-icon-btn"><Settings size={18} /></div>
              <div className="topbar-icon-btn" onClick={handleLogout} style={{ cursor: 'pointer' }} title="Logout">
                <LogOut size={18} />
              </div>
              <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: 14 }}>JD</div>
            </div>
          </div>
          <div className="page-content">
            <Routes>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/slots" element={<SlotsPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
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
