import React, { useState } from "react";
import { T } from "../theme";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { BOOKINGS } from "../data";

export default function BookingsPage() {
  const [tab, setTab] = useState("all");
  const shown = tab === "all" ? BOOKINGS : BOOKINGS.filter(b => b.status === tab);
  return (
    <>
      <div className="greeting-text" style={{ marginBottom: 24 }}>My <span style={{ color: T.lime }}>Bookings</span></div>
      <div className="card">
        <div className="card-header">
          <div className="tabs" style={{ border: "none", margin: 0 }}>
            {["all", "confirmed", "pending", "cancelled"].map(t => (
              <button key={t} className={`tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}
                style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="card-body">
          {shown.map(b => (
            <div className="booking-item" key={b.id}>
              <div className="booking-icon">{b.sport}</div>
              <div className="booking-info">
                <div className="booking-name">{b.name}</div>
                <div className="booking-date">{b.date}</div>
              </div>
              <span className={`status-badge status-${b.status}`}>{b.status}</span>
              {b.status === "confirmed" && (
                <button style={{ marginLeft: 8, background: "transparent", border: "1px solid rgba(255,77,77,0.3)", color: T.danger, borderRadius: 6, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────

