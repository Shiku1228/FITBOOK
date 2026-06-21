import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MapPin, Bot, CalendarDays, CreditCard, Bell, User, Building2, CalendarClock, DollarSign, Star, Settings } from "lucide-react";
import { T } from "../AthleteDashboard/theme";

// Athlete navigation items
const ATHLETE_NAV_ITEMS = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, key: "dashboard" },
  { label: "Find Courts", icon: <MapPin size={18} />, key: "search" },
  { label: "AI Coach Match", icon: <Bot size={18} />, key: "ai", badge: "New" },
  { label: "My Bookings", icon: <CalendarDays size={18} />, key: "bookings", badge: "3" },
  { label: "Payments", icon: <CreditCard size={18} />, key: "payments" },
  { label: "Notifications", icon: <Bell size={18} />, key: "notifications", badge: "4" },
  { label: "Profile", icon: <User size={18} />, key: "profile" },
];

// Owner navigation items
const OWNER_NAV_ITEMS = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, key: "dashboard" },
  { label: "Bookings", icon: <CalendarDays size={18} />, key: "bookings", badge: "2" },
  { label: "Slot Manager", icon: <CalendarClock size={18} />, key: "slots" },
  { label: "My Facilities", icon: <Building2 size={18} />, key: "facilities" },
  { label: "Earnings", icon: <DollarSign size={18} />, key: "earnings" },
  { label: "Reviews", icon: <Star size={18} />, key: "reviews", badge: "3" },
  { label: "Profile", icon: <User size={18} />, key: "profile" },
];

const routeMap = {
  // Athlete routes
  dashboard: "/dashboard",
  search: "/courts",
  ai: "/ai-match",
  bookings: "/bookings",
  payments: "/payments",
  notifications: "/notifications",
  profile: "/profile",
  // Owner routes
  slots: "/slots",
  facilities: "/facilities",
  earnings: "/earnings",
  reviews: "/reviews",
};

export default function Sidebar({ role = "athlete" }) {
  const location = useLocation();
  const navItems = role === "athlete" ? ATHLETE_NAV_ITEMS : OWNER_NAV_ITEMS;

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/courts") return "search";
    if (path === "/ai-match") return "ai";
    if (path === "/bookings") return "bookings";
    if (path === "/payments") return "payments";
    if (path === "/notifications") return "notifications";
    if (path === "/profile") return "profile";
    if (path === "/slots") return "slots";
    if (path === "/facilities") return "facilities";
    if (path === "/earnings") return "earnings";
    if (path === "/reviews") return "reviews";
    return "dashboard";
  };

  const active = getActiveKey();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Fit<span>Book</span></div>
      <div className="sidebar-section-label">{role === "athlete" ? "Main Menu" : "Management"}</div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.key}
            to={routeMap[item.key]}
            className={`nav-item${active === item.key ? " active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="sidebar-avatar">
        <div className="avatar-circle">JD</div>
        <div>
          <div className="avatar-name">Juan dela Cruz</div>
          <div className="avatar-role">{role === "athlete" ? "Athlete" : "Facility Owner"}</div>
        </div>
      </div>
    </aside>
  );
}
