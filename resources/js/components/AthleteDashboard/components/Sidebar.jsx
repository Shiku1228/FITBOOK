import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Calendar, User, Settings, LayoutDashboard, BrainCircuit, Dumbbell, Trophy } from "lucide-react";
import { T } from "../theme";
import { NAV_ITEMS } from "../data";

const routeMap = {
  dashboard: "/dashboard",
  search: "/courts",
  ai: "/ai-match",
  bookings: "/bookings",
  payments: "/payments",
  notifications: "/notifications",
  profile: "/profile",
};

export default function Sidebar() {
  const location = useLocation();

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/courts") return "search";
    if (path === "/ai-match") return "ai";
    if (path === "/bookings") return "bookings";
    if (path === "/payments") return "payments";
    if (path === "/notifications") return "notifications";
    if (path === "/profile") return "profile";
    return "dashboard";
  };

  const active = getActiveKey();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Fit<span>Book</span></div>
      <div className="sidebar-section-label">Main Menu</div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
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
        <div className="avatar-circle">RL</div>
        <div>
          <div className="avatar-name">Renz Latangga</div>
          <div className="avatar-role">Athlete</div>
        </div>
      </div>
    </aside>
  );
}

