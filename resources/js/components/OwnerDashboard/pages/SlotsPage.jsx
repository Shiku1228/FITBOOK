import React from "react";
import { useState } from "react";
import { Plus, Lock, Database } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";

const FACILITIES = [
  { id:1, name:"PhilSports Arena — Court A", city:"Pasig City", sport:"Basketball", bg:"#1A3A5C", rate:350, rating:4.9, slots:5, status:"verified" },
  { id:2, name:"Cebu Sports Complex Pool",   city:"Cebu City",  sport:"Swimming", bg:"#0A2744", rate:200, rating:4.7, slots:6, status:"verified" },
  { id:3, name:"Davao Racket Club",          city:"Davao City", sport:"Tennis", bg:"#1C4A1C", rate:450, rating:4.8, slots:2, status:"pending" },
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

export default function SlotsPage() {
  const [selectedFac, setSelectedFac] = useState(0);
  const fac = FACILITIES[selectedFac];

  return (
    <>
      <div className="greeting">
        <div className="g-text">Slot <span>Manager</span></div>
        <button className="btn-lime"><Plus size={16} style={{ marginRight:8 }} /> Add slots</button>
      </div>

      {/* Facility tabs */}
      <div className="tabs">
        {FACILITIES.map((f, i) => (
          <button key={f.id} className={`tab${selectedFac===i?" active":""}`} onClick={() => setSelectedFac(i)}>
            {f.sport} {f.name.split("—")[0].trim()}
          </button>
        ))}
      </div>

      <div className="two-col">
        {/* Full slot list */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Today · {fac.name}</div>
            <div style={{ display:"flex", gap:8 }}>
              <span style={{ fontSize:12, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:2, background:"rgba(0,196,140,0.3)", display:"inline-block" }}></span> Available</span>
              <span style={{ fontSize:12, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:2, background:"rgba(255,181,71,0.3)", display:"inline-block" }}></span> Booked</span>
              <span style={{ fontSize:12, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:2, background:"rgba(255,77,77,0.2)", display:"inline-block" }}></span> Blocked</span>
            </div>
          </div>
          <div className="card-body">
            <div className="slot-calendar">
              {SLOTS_TODAY.map(s => (
                <div className="slot-row" key={s.time}>
                  <span className="slot-time">{s.time}</span>
                  <div className={`slot-bar slot-${s.status}`} style={{ flex:1 }}>
                    {s.status === "available" ? "Open — tap to block" : s.status === "blocked" ? <Lock size={12} style={{ marginRight:4 }} /> + s.bookedBy : s.bookedBy}
                    {s.status === "booked" && <span className="slot-booked-by">₱{fac.rate}</span>}
                  </div>
                  {s.status !== "booked" && (
                    <button style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"4px 10px", fontSize:11, color:T.muted, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                      {s.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add slots panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Add new slots</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" style={{ colorScheme:"dark" }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div className="form-group">
                  <label className="form-label">Start time</label>
                  <input type="time" className="form-input" style={{ colorScheme:"dark" }} />
                </div>
                <div className="form-group">
                  <label className="form-label">End time</label>
                  <input type="time" className="form-input" style={{ colorScheme:"dark" }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Price override (optional)</label>
                <input className="form-input" placeholder={`Default: ₱${fac.rate}/hr`} />
              </div>
              <div style={{ marginBottom:16 }}>
                <label className="form-label">Repeat</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["None","Daily","Weekdays","Weekends"].map(r => (
                    <button key={r} style={{
                      padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:500, cursor:"pointer",
                      fontFamily:"Inter,sans-serif", border:"1px solid rgba(255,255,255,0.12)",
                      background: r==="None" ? "rgba(202,255,0,0.1)" : "transparent",
                      color: r==="None" ? T.lime : T.muted,
                    }}>{r}</button>
                  ))}
                </div>
              </div>
              <button className="btn-lime" style={{ width:"100%", justifyContent:"center" }}>
                Create slots
              </button>
            </div>
          </div>

          {/* Sync status */}
          <div className="card">
            <div className="card-header"><div className="card-title">Firebase sync</div></div>
            <div className="card-body">
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13 }}>Real-time sync</span>
                  <span style={{ fontSize:12, color:T.success, fontWeight:600 }}>● Live</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                  <span style={{ color:T.muted }}>Last synced</span>
                  <span>2 min ago</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                  <span style={{ color:T.muted }}>RTDB path</span>
                  <span style={{ color:T.lime, fontFamily:"monospace", fontSize:11 }}>/slots/{fac.id}</span>
                </div>
                <button className="btn-ghost" style={{ fontSize:12, padding:"8px 14px" }}>Force sync now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
