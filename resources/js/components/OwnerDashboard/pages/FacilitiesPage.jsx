import React from "react";
import { useState } from "react";
import { Plus, MapPin, Star, CheckCircle, Clock, Dumbbell, Waves, Target } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";

const FACILITIES = [
  { id:1, name:"PhilSports Arena — Court A", city:"Pasig City", sport:"Basketball", icon:<Dumbbell size={32} />, bg:"#1A3A5C", rate:350, rating:4.9, slots:5, status:"verified" },
  { id:2, name:"Cebu Sports Complex Pool",   city:"Cebu City",  sport:"Swimming", icon:<Waves size={32} />, bg:"#0A2744", rate:200, rating:4.7, slots:6, status:"verified" },
  { id:3, name:"Davao Racket Club",          city:"Davao City", sport:"Tennis", icon:<Target size={32} />, bg:"#1C4A1C", rate:450, rating:4.8, slots:2, status:"pending" },
];

function Toggle({ on, onToggle }) {
  return (
    <div className="toggle-wrap">
      <button className={`toggle ${on ? "active" : ""}`} onClick={onToggle}>
        <div className="toggle-knob" />
      </button>
      <span style={{ fontSize:12, color: on ? T.lime : T.muted }}>{on ? "Active" : "Inactive"}</span>
    </div>
  );
}

export default function FacilitiesPage() {
  const [active, setActive] = useState([true, true, true]);
  return (
    <>
      <div className="greeting">
        <div className="g-text">My <span>Facilities</span></div>
        <button className="btn-lime"><Plus size={16} style={{ marginRight:8 }} /> Add facility</button>
      </div>

      <div className="three-col" style={{ marginBottom:20 }}>
        {FACILITIES.map((f, i) => (
          <div key={f.id} className="fac-card-grid">
            <div className="fac-thumb" style={{ background:f.bg }}>{f.icon}</div>
            <div className="fac-body">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div className="fac-name">{f.name}</div>
                <span className={`badge ${f.status === "verified" ? "badge-verified" : "badge-pending"}`}>
                  {f.status === "verified" ? <CheckCircle size={10} style={{ marginRight:4 }} /> : <Clock size={10} style={{ marginRight:4 }} />}
                  {f.status === "verified" ? "Verified" : "Pending"}
                </span>
              </div>
              <div className="fac-loc"><MapPin size={12} style={{ marginRight:4, color:T.muted }} /> {f.city}</div>
              <div className="fac-meta">
                <span className="fac-rate">₱{f.rate}/hr</span>
                <span className="fac-rating"><Star size={12} style={{ marginRight:4, color:T.lime }} /> {f.rating}</span>
              </div>
              <div style={{ marginTop:16 }}>
                <Toggle on={active[i]} onToggle={() => setActive(a => { const n=[...a]; n[i]=!n[i]; return n; })} />
              </div>
              <div className="fac-footer">
                <button className="fac-btn-primary">Edit</button>
                <button className="fac-btn-ghost">View slots</button>
                <button className="fac-btn-ghost" style={{ color:T.danger, borderColor:"rgba(255,77,77,0.3)" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
