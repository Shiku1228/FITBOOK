import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, TrendingUp, Users, Star, DollarSign, Calendar, Building2, Plus } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";
import StatCard from "../../Shared/StatCard";

const MONTHLY_EARNINGS = [
  { month:"Jan", val:8200  },
  { month:"Feb", val:11400 },
  { month:"Mar", val:9800  },
  { month:"Apr", val:14600 },
  { month:"May", val:13100 },
  { month:"Jun", val:17250 },
];

const BOOKING_REQUESTS = [
  { id:1, name:"Renz Latangga", initials:"RL", color:"rgba(202,255,0,0.15)", tc:T.lime,    facility:"Court A", time:"Today · 2:00–4:00 PM", amount:700,  status:"pending" },
  { id:2, name:"Ana Reyes",     initials:"AR", color:"rgba(106,191,255,0.15)", tc:"#6FBFFF", facility:"Pool Lane 3", time:"Tomorrow · 6:00–7:00 AM", amount:200, status:"pending" },
  { id:3, name:"Mark Tobias",   initials:"MT", color:"rgba(255,181,71,0.15)", tc:T.warning,  facility:"Tennis Court B", time:"Jun 25 · 3:00–5:00 PM", amount:900, status:"confirmed" },
  { id:4, name:"Lia Santos",    initials:"LS", color:"rgba(202,255,0,0.12)", tc:T.lime,    facility:"Court A", time:"Jun 26 · 8:00–10:00 AM", amount:700, status:"confirmed" },
];

const SLOTS_TODAY = [
  { time:"8:00 AM",  status:"booked",    bookedBy:"Lia Santos" },
  { time:"9:00 AM",  status:"booked",    bookedBy:"Renz Latangga" },
  { time:"10:00 AM", status:"available", bookedBy:null },
  { time:"11:00 AM", status:"available", bookedBy:null },
  { time:"12:00 PM", status:"blocked",   bookedBy:"Maintenance" },
  { time:"1:00 PM",  status:"available", bookedBy:null },
  { time:"2:00 PM",  status:"booked",    bookedBy:"Ana Reyes" },
  { time:"3:00 PM",  status:"available", bookedBy:null },
  { time:"4:00 PM",  status:"booked",    bookedBy:"Mark Tobias" },
  { time:"5:00 PM",  status:"available", bookedBy:null },
];

const REVIEWS = [
  { name:"Renz L.", stars:5, date:"Jun 18", text:"Perfect court, very clean and well-lit. Booking was instant and the GCash payment worked seamlessly." },
  { name:"Ana R.",  stars:5, date:"Jun 15", text:"Coach Maria was incredible. Best swimming instruction I've had — highly recommend booking through FitBook." },
  { name:"Mark T.", stars:4, date:"Jun 12", text:"Great facility overall. Would appreciate more towels in the locker room but court conditions were excellent." },
];

export default function DashboardHome() {
  const navigate = useNavigate();
  const maxVal = Math.max(...MONTHLY_EARNINGS.map(m => m.val));

  return (
    <>
      <div className="greeting">
        <div>
          <div className="g-text">Good morning, <span>Juan</span></div>
          <div className="g-sub">Sunday, June 21, 2026 · You have 2 pending booking requests</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-ghost" onClick={() => navigate("/slots")}>Manage slots</button>
          <button className="btn-lime" onClick={() => navigate("/facilities")}>+ Add facility</button>
        </div>
      </div>

      {/* Verification banner */}
      <div className="verify-banner">
        <AlertTriangle size={20} style={{ color:T.warning }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:600, color:T.warning }}>Davao Racket Club pending verification</div>
          <div style={{ fontSize:12, color:T.muted, marginTop:2 }}>Admin review usually takes 1–2 business days. Upload your business permit to speed this up.</div>
        </div>
        <button className="btn-lime" style={{ padding:"7px 16px", fontSize:12 }}>Upload permit →</button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <StatCard label="Revenue this month" value="₱17,250" sub="↑ 31% vs May" />
        <StatCard label="Bookings this month" value="34" sub="2 pending approval" />
        <StatCard label="Occupancy rate" value="68%" sub="↑ 5% vs last week" />
        <StatCard label="Avg. rating" value="4.9★" sub="from 128 reviews" />
      </div>

      <div className="two-col">
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Earnings chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Earnings — 2026</div>
              <span className="card-link" onClick={() => navigate("/earnings")}>Full report →</span>
            </div>
            <div className="card-body">
              <div style={{ display:"flex", gap:20, marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>Net payout (Jun)</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:T.lime, marginTop:4 }}>₱15,525</div>
                </div>
                <div style={{ borderLeft:"1px solid rgba(255,255,255,0.08)", paddingLeft:20 }}>
                  <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>Platform fee (10%)</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:T.muted, marginTop:4 }}>₱1,725</div>
                </div>
              </div>
              <div className="bar-chart">
                {MONTHLY_EARNINGS.map(m => (
                  <div key={m.month} className="bar-col">
                    <div className="bar-val">₱{(m.val/1000).toFixed(1)}k</div>
                    <div className="bar-track">
                      <div className="bar-fill"
                        style={{
                          height:`${(m.val/maxVal)*100}%`,
                          background: m.month==="Jun"
                            ? `linear-gradient(to top, ${T.lime2}, ${T.lime})`
                            : "rgba(202,255,0,0.18)"
                        }}
                      />
                    </div>
                    <div className="bar-month">{m.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking requests */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Booking requests</div>
              <span className="card-link" onClick={() => navigate("/bookings")}>All bookings →</span>
            </div>
            <div className="card-body" style={{ padding:"8px 20px" }}>
              {BOOKING_REQUESTS.map(r => (
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
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Today's slot overview */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Today's slots</div>
              <span className="card-link" onClick={() => navigate("/slots")}>Edit →</span>
            </div>
            <div className="card-body" style={{ padding:"14px 20px" }}>
              <div style={{ fontSize:12, color:T.muted, marginBottom:12 }}>Court A · PhilSports Arena</div>
              <div className="slot-calendar">
                {SLOTS_TODAY.slice(0,7).map(s => (
                  <div className="slot-row" key={s.time}>
                    <span className="slot-time">{s.time}</span>
                    <div className={`slot-bar slot-${s.status}`}>
                      {s.status === "available" ? "Open" : s.status === "blocked" ? <Lock size={12} style={{ marginRight:4 }} /> + s.bookedBy : s.bookedBy}
                      {s.status === "booked" && <span className="slot-booked-by">booked</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent reviews */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent reviews</div>
              <span className="card-link" onClick={() => navigate("/reviews")}>All →</span>
            </div>
            <div className="card-body" style={{ padding:"8px 20px" }}>
              {REVIEWS.slice(0,2).map((r,i) => (
                <div className="review-item" key={i}>
                  <div className="review-header">
                    <div className="review-av">{r.name.split(" ").map(n=>n[0]).join("")}</div>
                    <span className="review-name">{r.name}</span>
                    <span className="review-stars">{"★".repeat(r.stars)}</span>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <div className="review-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
