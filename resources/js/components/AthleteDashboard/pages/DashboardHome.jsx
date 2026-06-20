import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { T } from "../theme";
import { MapPin, Target, Activity, Zap, Star, Bot } from "lucide-react";
import { BOOKINGS, FACILITIES, NOTIFICATIONS, AI_COACHES } from "../data";
import StatCard from "../components/StatCard";
import FacilityRow from "../components/FacilityRow";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [bookingTab, setBookingTab] = useState("upcoming");
  const upcoming = BOOKINGS.filter(b => b.status !== "cancelled");
  const past = BOOKINGS.filter(b => b.status === "cancelled");
  const shown = bookingTab === "upcoming" ? upcoming : past;

  return (
    <>
      <div className="greeting-bar">
        <div>
          <div className="greeting-text">Good morning, <span>Renz</span></div>
          <div className="greeting-sub">Saturday, June 20, 2026 · Davao Region, PH</div>
        </div>
        <button className="book-btn" style={{ width: "auto", padding: "10px 22px", fontSize: 14 }}
          onClick={() => navigate("/courts")}>
          + Book a slot
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <StatCard label="Bookings this month" value="7" sub="+2 vs last month" />
        <StatCard label="Total spent" value="₱4,850" sub="Jun 2026" />
        <StatCard label="Hours played" value="18h" sub="across 4 sports" />
        <StatCard label="AI match score" value="92%" sub="Coach Ramon Cruz" />
      </div>

      <div className="two-col">
        {/* Left: bookings + search quick access */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Quick search */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Find a court</div>
              <span className="card-link" onClick={() => navigate("/courts")}>Full search →</span>
            </div>
            <div className="card-body">
              <div className="search-panel">
                <div className="search-field-d">
                  <div className="sfl">Sport</div>
                  <input className="sfi" placeholder="Basketball, Tennis…" />
                </div>
                <div className="search-field-d">
                  <div className="sfl">City</div>
                  <input className="sfi" placeholder="Davao, Cebu…" />
                </div>
                <div className="search-field-d">
                  <div className="sfl">Date</div>
                  <input className="sfi" type="date" style={{ colorScheme: "dark" }} />
                </div>
                <button className="search-go">Search</button>
              </div>
              {/* Map preview */}
              <div className="map-box">
                <iframe className="map-iframe" src="https://maps.google.com/maps?q=Metro+Manila,Philippines&t=&z=11&ie=UTF8&iwloc=&output=embed" />
                <div className="map-grid-lines" />
                <span className="map-pin" style={{ top: "30%", left: "45%" }}><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /></span>
                <span className="map-pin" style={{ top: "50%", left: "60%", fontSize: 20 }}><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /></span>
                <span className="map-pin" style={{ top: "55%", left: "30%", fontSize: 18 }}><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /></span>
                <span className="map-label">3 facilities near you</span>
              </div>
              {/* Top results */}
              {FACILITIES.slice(0, 2).map(f => (
                <FacilityRow key={f.id} f={f} onBook={() => navigate("/courts")} />
              ))}
            </div>
          </div>

          {/* My bookings */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">My bookings</div>
              <span className="card-link" onClick={() => navigate("/bookings")}>See all →</span>
            </div>
            <div className="card-body" style={{ padding: "12px 20px" }}>
              <div className="tabs">
                <button className={`tab${bookingTab === "upcoming" ? " active" : ""}`} onClick={() => setBookingTab("upcoming")}>Upcoming</button>
                <button className={`tab${bookingTab === "past" ? " active" : ""}`} onClick={() => setBookingTab("past")}>Past</button>
              </div>
              {shown.map(b => (
                <div className="booking-item" key={b.id}>
                  <div className="booking-icon">{b.sport}</div>
                  <div className="booking-info">
                    <div className="booking-name">{b.name}</div>
                    <div className="booking-date">{b.date}</div>
                  </div>
                  <span className={`status-badge status-${b.status}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* AI top match */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Bot size={24} style={{ display: "inline", marginBottom: -4 }} /> AI Top Match</div>
              <span className="card-link" onClick={() => navigate("/ai-match")}>All matches →</span>
            </div>
            <div className="card-body">
              {AI_COACHES.slice(0, 1).map(c => (
                <div key={c.id} className="ai-match-card">
                  <div className="match-header">
                    <div className="coach-av" style={{ background: c.color, color: c.textColor }}>{c.initials}</div>
                    <div>
                      <div className="match-name">{c.name}</div>
                      <div className="match-sport">{c.sport}</div>
                    </div>
                    <div className="match-score">{Math.round(c.score * 100)}%<br /><small>match</small></div>
                  </div>
                  <p className="match-reason">{c.reason}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="match-rate">₱{c.rate} <span>/ hr</span></span>
                  </div>
                  <button className="book-btn">Book Coach Ramon →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Notifications</div>
              <span className="card-link" onClick={() => navigate("/notifications")}>All →</span>
            </div>
            <div className="card-body" style={{ padding: "8px 20px" }}>
              {NOTIFICATIONS.map((n, i) => (
                <div className="notif-item" key={i}>
                  <div className="notif-dot-icon" style={{ background: n.color }} />
                  <div>
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

