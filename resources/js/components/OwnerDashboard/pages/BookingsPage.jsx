import React from "react";
import { useState } from "react";
import { T } from "../../AthleteDashboard/theme";

const BOOKING_REQUESTS = [
  { id:1, name:"Renz Latangga", initials:"RL", color:"rgba(202,255,0,0.15)", tc:T.lime,    facility:"Court A", time:"Today · 2:00–4:00 PM", amount:700,  status:"pending" },
  { id:2, name:"Ana Reyes",     initials:"AR", color:"rgba(106,191,255,0.15)", tc:"#6FBFFF", facility:"Pool Lane 3", time:"Tomorrow · 6:00–7:00 AM", amount:200, status:"pending" },
  { id:3, name:"Mark Tobias",   initials:"MT", color:"rgba(255,181,71,0.15)", tc:T.warning,  facility:"Tennis Court B", time:"Jun 25 · 3:00–5:00 PM", amount:900, status:"confirmed" },
  { id:4, name:"Lia Santos",    initials:"LS", color:"rgba(202,255,0,0.12)", tc:T.lime,    facility:"Court A", time:"Jun 26 · 8:00–10:00 AM", amount:700, status:"confirmed" },
];

export default function BookingsPage() {
  const [tab, setTab] = useState("all");
  const shown = tab === "all" ? BOOKING_REQUESTS : BOOKING_REQUESTS.filter(b => b.status === tab);
  return (
    <>
      <div className="greeting">
        <div className="g-text">Booking <span>Requests</span></div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="tabs" style={{ border:"none", margin:0 }}>
            {["all","pending","confirmed"].map(t => (
              <button key={t} className={`tab${tab===t?" active":""}`} onClick={() => setTab(t)}
                style={{ textTransform:"capitalize" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="card-body" style={{ padding:"8px 20px" }}>
          {shown.map(r => (
            <div className="request-item" key={r.id}>
              <div className="req-av" style={{ background:r.color, color:r.tc }}>{r.initials}</div>
              <div className="req-info">
                <div className="req-name">{r.name}</div>
                <div className="req-detail">{r.facility} · {r.time}</div>
              </div>
              <span className="req-amount">₱{r.amount}</span>
              {r.status === "pending" ? (
                <div className="req-actions">
                  <button className="btn-accept">Accept</button>
                  <button className="btn-danger">Decline</button>
                </div>
              ) : (
                <span className="badge badge-confirmed">confirmed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
