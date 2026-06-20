import React, { useState } from "react";
import { T } from "../theme";
import { Bell, Check, CheckCircle, Calendar, MapPin, CreditCard, User, Trash2, Filter } from "lucide-react";
import { NOTIFICATIONS } from "../data";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const allNotifications = [
    ...NOTIFICATIONS,
    { text: "Your profile has been successfully updated.", time: "5 hr ago", color: T.success, type: "profile" },
    { text: "New coach available in your area: Coach Jun Dela Rosa (Football)", time: "6 hr ago", color: T.lime, type: "coach" },
    { text: "Your subscription has been renewed for July 2026.", time: "1 day ago", color: "#6FBFFF", type: "payment" },
    { text: "Coach Ramon Cruz sent you a message about your upcoming session.", time: "1 day ago", color: T.lime, type: "message" },
    { text: "Facility maintenance: PhilSports Arena Court B closed on Jun 25.", time: "2 days ago", color: T.danger, type: "alert" },
    { text: "You earned a new badge: Regular Player (10+ bookings)", time: "3 days ago", color: T.lime, type: "achievement" },
  ];

  const filtered = filter === "all" 
    ? allNotifications 
    : allNotifications.filter(n => n.type === filter);

  return (
    <>
      <div className="greeting-bar">
        <div>
          <div className="greeting-text"><Bell size={24} style={{ display: "inline", marginBottom: -4 }} /> <span>Notifications</span></div>
          <div className="greeting-sub">Stay updated with your bookings, payments, and coach messages</div>
        </div>
        <button className="book-btn" style={{ width: "auto", padding: "10px 22px", fontSize: 14 }}>
          <Check size={14} style={{ display: "inline", marginBottom: -2 }} /> Mark All Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ padding: "12px 20px" }}>
          <div className="tabs" style={{ border: "none", margin: 0 }}>
            {[
              { key: "all", label: "All", icon: <Bell size={14} style={{ display: "inline", marginBottom: -1 }} /> },
              { key: "booking", label: "Bookings", icon: <Calendar size={14} style={{ display: "inline", marginBottom: -1 }} /> },
              { key: "payment", label: "Payments", icon: <CreditCard size={14} style={{ display: "inline", marginBottom: -1 }} /> },
              { key: "coach", label: "Coaches", icon: <User size={14} style={{ display: "inline", marginBottom: -1 }} /> },
              { key: "alert", label: "Alerts", icon: <MapPin size={14} style={{ display: "inline", marginBottom: -1 }} /> },
            ].map(f => (
              <button 
                key={f.key} 
                className={`tab${filter === f.key ? " active" : ""}`} 
                onClick={() => setFilter(f.key)}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Notifications — {filtered.length}</div>
          <span className="card-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Filter size={12} style={{ display: "inline", marginBottom: -1 }} /> Filter
          </span>
        </div>
        <div className="card-body" style={{ padding: "8px 20px" }}>
          {filtered.map((n, i) => (
            <div key={i} className="notif-item" style={{ padding: "14px 0", cursor: "pointer" }}>
              <div className="notif-dot-icon" style={{ background: n.color, width: 10, height: 10, marginTop: 6 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="notif-text" style={{ fontSize: 14 }}>{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              <button style={{ background: "transparent", border: "none", color: T.muted, cursor: "pointer", padding: 4, borderRadius: 4, transition: "all 0.15s" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: T.muted }}>
              <Bell size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
              <div style={{ fontSize: 14 }}>No notifications found</div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <div className="card-title">Notification Preferences</div>
        </div>
        <div className="card-body">
          {[
            { label: "Booking confirmations", desc: "Get notified when your bookings are confirmed", checked: true },
            { label: "Payment receipts", desc: "Receive payment confirmation emails", checked: true },
            { label: "Coach messages", desc: "Notifications when coaches send you messages", checked: true },
            { label: "Promotional offers", desc: "Receive special offers and discounts", checked: false },
            { label: "Facility updates", desc: "Get alerts about facility maintenance or closures", checked: true },
          ].map((pref, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{pref.label}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{pref.desc}</div>
              </div>
              <div style={{ 
                width: 44, height: 24, borderRadius: 12, background: pref.checked ? T.lime : T.navy3, 
                border: pref.checked ? "none" : "1px solid rgba(255,255,255,0.2)", cursor: "pointer", position: "relative", transition: "all 0.15s"
              }}>
                <div style={{ 
                  width: 18, height: 18, borderRadius: "50%", background: pref.checked ? T.navy : T.muted, 
                  position: "absolute", top: 3, left: pref.checked ? 23 : 3, transition: "all 0.15s"
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
