import { useState } from "react";

const T = {
  navy:   "#0A1628", navy2: "#122040", navy3: "#1E3059",
  lime:   "#CAFF00", lime2: "#AEDD00",
  white:  "#FFFFFF", muted: "#8A97AE", cardBg: "#111E35",
  danger: "#FF4D4D", success: "#00C48C", warning: "#FFB547",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.navy}; color: ${T.white}; font-family: 'Inter', sans-serif; }

  .root { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 224px; flex-shrink: 0;
    background: ${T.navy2};
    border-right: 1px solid rgba(202,255,0,0.07);
    display: flex; flex-direction: column;
    padding: 0 0 24px;
    position: fixed; top:0; left:0; bottom:0; z-index:50;
  }
  .sb-logo {
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:22px;
    letter-spacing:0.04em; text-transform:uppercase;
    padding:20px 20px 14px;
    border-bottom:1px solid rgba(255,255,255,0.06);
    display:flex; flex-direction:column; gap:6px;
  }
  .sb-logo span { color:${T.lime}; }
  .role-chip {
    font-family:'Inter',sans-serif; font-size:11px; font-weight:600;
    letter-spacing:0.08em; text-transform:uppercase;
    color:${T.navy}; background:${T.lime};
    padding:3px 10px; border-radius:100px; width:fit-content;
  }
  .sb-section { font-size:10px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${T.muted}; padding:20px 20px 8px; }
  .sb-nav { display:flex; flex-direction:column; gap:2px; padding:0 10px; }
  .nav-item {
    display:flex; align-items:center; gap:10px;
    padding:9px 12px; border-radius:8px;
    font-size:14px; font-weight:500; color:${T.muted};
    cursor:pointer; transition:all 0.15s;
    border:none; background:transparent; text-align:left; width:100%;
    font-family:'Inter',sans-serif;
  }
  .nav-item:hover { background:rgba(255,255,255,0.05); color:${T.white}; }
  .nav-item.active { background:rgba(202,255,0,0.1); color:${T.lime}; }
  .nav-icon { font-size:16px; width:20px; text-align:center; }
  .nav-badge { margin-left:auto; background:${T.lime}; color:${T.navy}; font-size:10px; font-weight:700; padding:2px 7px; border-radius:100px; }
  .nav-badge-warn { margin-left:auto; background:${T.warning}; color:${T.navy}; font-size:10px; font-weight:700; padding:2px 7px; border-radius:100px; }
  .sb-bottom {
    margin-top:auto; padding:16px 16px 0;
    border-top:1px solid rgba(255,255,255,0.06);
    display:flex; align-items:center; gap:10px;
  }
  .av {
    width:36px; height:36px; border-radius:50%;
    background:rgba(202,255,0,0.15); color:${T.lime};
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:15px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .av-name { font-size:13px; font-weight:600; }
  .av-role { font-size:11px; color:${T.muted}; }

  /* ── MAIN ── */
  .main { margin-left:224px; flex:1; display:flex; flex-direction:column; min-height:100vh; }
  .topbar {
    height:56px; background:rgba(10,22,40,0.92);
    backdrop-filter:blur(10px);
    border-bottom:1px solid rgba(202,255,0,0.07);
    display:flex; align-items:center; padding:0 28px; gap:14px;
    position:sticky; top:0; z-index:40;
  }
  .topbar-title { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:20px; text-transform:uppercase; letter-spacing:0.03em; }
  .topbar-pill {
    font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;
    padding:4px 10px; border-radius:100px;
    background:rgba(0,196,140,0.12); color:${T.success}; border:1px solid rgba(0,196,140,0.2);
  }
  .tb-right { margin-left:auto; display:flex; align-items:center; gap:10px; }
  .icon-btn {
    width:36px; height:36px; border-radius:8px;
    background:${T.navy3}; border:1px solid rgba(255,255,255,0.08);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:16px; color:${T.muted}; transition:all 0.15s; position:relative;
  }
  .icon-btn:hover { color:${T.white}; }
  .notif-dot { position:absolute; top:6px; right:6px; width:7px; height:7px; border-radius:50%; background:${T.lime}; }

  /* ── PAGE ── */
  .page { padding:28px; flex:1; }

  /* ── SHARED ELEMENTS ── */
  .greeting { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:14px; }
  .g-text { font-family:'Barlow Condensed',sans-serif; font-size:32px; font-weight:900; text-transform:uppercase; line-height:1; }
  .g-text span { color:${T.lime}; }
  .g-sub { font-size:14px; color:${T.muted}; margin-top:5px; }
  .btn-lime {
    background:${T.lime}; color:${T.navy}; border:none; border-radius:8px;
    padding:10px 20px; font-size:13px; font-weight:700; cursor:pointer;
    font-family:'Inter',sans-serif; transition:background 0.15s;
    display:inline-flex; align-items:center; gap:8px;
  }
  .btn-lime:hover { background:${T.lime2}; }
  .btn-ghost {
    background:transparent; color:${T.white};
    border:1px solid rgba(255,255,255,0.18); border-radius:8px;
    padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer;
    font-family:'Inter',sans-serif; transition:all 0.15s;
  }
  .btn-ghost:hover { border-color:rgba(255,255,255,0.35); background:rgba(255,255,255,0.04); }

  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
  .stat-card { background:${T.cardBg}; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:18px 20px; }
  .stat-label { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${T.muted}; margin-bottom:10px; }
  .stat-value { font-family:'Barlow Condensed',sans-serif; font-size:34px; font-weight:900; line-height:1; color:${T.lime}; }
  .stat-value.green { color:${T.success}; }
  .stat-value.warn  { color:${T.warning}; }
  .stat-sub { font-size:12px; color:${T.muted}; margin-top:6px; }

  .card { background:${T.cardBg}; border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden; }
  .card-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.06); gap:12px; }
  .card-title { font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; }
  .card-link { font-size:12px; color:${T.lime}; cursor:pointer; font-weight:500; white-space:nowrap; }
  .card-body { padding:20px; }

  .two-col { display:grid; grid-template-columns:1fr 360px; gap:20px; margin-bottom:20px; }
  .two-col-eq { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }

  .badge { font-size:11px; font-weight:600; padding:3px 10px; border-radius:100px; flex-shrink:0; }
  .badge-confirmed { background:rgba(0,196,140,0.12); color:${T.success}; }
  .badge-pending   { background:rgba(202,255,0,0.1);  color:${T.lime}; }
  .badge-cancelled { background:rgba(255,77,77,0.1);  color:${T.danger}; }
  .badge-completed { background:rgba(106,191,255,0.12); color:#6FBFFF; }

  .tabs { display:flex; gap:4px; border-bottom:1px solid rgba(255,255,255,0.06); margin-bottom:16px; }
  .tab {
    padding:8px 16px; font-size:13px; font-weight:500; color:${T.muted};
    cursor:pointer; border:none; background:transparent;
    border-bottom:2px solid transparent; transition:all 0.15s; margin-bottom:-1px;
    font-family:'Inter',sans-serif;
  }
  .tab:hover { color:${T.white}; }
  .tab.active { color:${T.lime}; border-bottom-color:${T.lime}; }

  .form-group { margin-bottom:14px; }
  .form-label { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${T.muted}; margin-bottom:7px; display:block; }
  .form-input {
    width:100%; background:${T.navy3}; border:1px solid rgba(255,255,255,0.1);
    border-radius:8px; padding:10px 14px; color:${T.white}; font-size:13px;
    font-family:'Inter',sans-serif; outline:none; transition:border-color 0.15s;
  }
  .form-input:focus { border-color:rgba(202,255,0,0.4); }
  .form-textarea { min-height:80px; resize:vertical; }

  /* ── COACH-SPECIFIC ── */

  /* Availability weekly grid */
  .week-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
  .day-col { display:flex; flex-direction:column; gap:4px; align-items:center; }
  .day-label { font-size:10px; font-weight:600; color:${T.muted}; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; }
  .day-slot {
    width:100%; padding:6px 0; border-radius:6px; font-size:11px; font-weight:500;
    text-align:center; cursor:pointer; transition:all 0.15s; border:1px solid transparent;
  }
  .day-slot.open     { background:rgba(0,196,140,0.1);  border-color:rgba(0,196,140,0.2);  color:${T.success}; }
  .day-slot.booked   { background:rgba(255,181,71,0.12); border-color:rgba(255,181,71,0.2); color:${T.warning}; }
  .day-slot.blocked  { background:rgba(255,77,77,0.08);  border-color:rgba(255,77,77,0.15); color:${T.danger}; }
  .day-slot.empty    { background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.07); color:${T.muted}; }
  .day-slot:hover    { filter:brightness(1.2); }

  /* Session card */
  .session-item {
    display:flex; align-items:center; gap:14px;
    padding:13px 0; border-bottom:1px solid rgba(255,255,255,0.05);
  }
  .session-item:last-child { border-bottom:none; }
  .session-av {
    width:42px; height:42px; border-radius:50%; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:16px;
  }
  .session-info { flex:1; min-width:0; }
  .session-name { font-size:13px; font-weight:600; }
  .session-meta { font-size:12px; color:${T.muted}; margin-top:2px; }
  .session-earn { font-size:14px; font-weight:700; color:${T.lime}; margin-right:8px; flex-shrink:0; }

  /* Earnings bar */
  .bar-chart { display:flex; align-items:flex-end; gap:8px; height:110px; padding-bottom:4px; }
  .bar-col { display:flex; flex-direction:column; align-items:center; gap:5px; flex:1; }
  .bar-track { width:100%; flex:1; display:flex; align-items:flex-end; }
  .bar-fill { width:100%; border-radius:4px 4px 0 0; transition:height 0.4s ease; min-height:4px; }
  .bar-month { font-size:10px; color:${T.muted}; }
  .bar-val { font-size:10px; color:${T.white}; font-weight:600; }

  /* Review */
  .review-item { padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
  .review-item:last-child { border-bottom:none; }
  .review-header { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
  .review-av { width:30px; height:30px; border-radius:50%; background:${T.navy3}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; }
  .review-name { font-size:13px; font-weight:600; }
  .review-stars { color:${T.warning}; font-size:12px; margin-left:4px; }
  .review-date { font-size:11px; color:${T.muted}; margin-left:auto; }
  .review-text { font-size:13px; color:${T.muted}; line-height:1.55; }

  /* Payout banner */
  .payout-banner {
    background:linear-gradient(135deg,rgba(202,255,0,0.08) 0%,rgba(30,48,89,0.6) 100%);
    border:1px solid rgba(202,255,0,0.2); border-radius:14px;
    padding:24px 28px; display:flex; align-items:center; justify-content:space-between;
    margin-bottom:20px; gap:20px; flex-wrap:wrap;
  }
  .payout-amount { font-family:'Barlow Condensed',sans-serif; font-size:48px; font-weight:900; color:${T.lime}; line-height:1; }

  /* Cert item */
  .cert-item {
    display:flex; align-items:center; gap:12px;
    padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.05);
  }
  .cert-item:last-child { border-bottom:none; }
  .cert-icon { width:36px; height:36px; border-radius:8px; background:rgba(202,255,0,0.08); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .cert-name { font-size:13px; font-weight:600; }
  .cert-issuer { font-size:12px; color:${T.muted}; }

  /* AI embed panel */
  .embed-panel {
    background:rgba(202,255,0,0.04); border:1px solid rgba(202,255,0,0.12);
    border-radius:10px; padding:16px; margin-bottom:14px;
  }

  /* Upcoming next session banner */
  .next-session {
    background:linear-gradient(135deg,rgba(0,196,140,0.08),rgba(30,48,89,0.5));
    border:1px solid rgba(0,196,140,0.18); border-radius:12px;
    padding:18px 22px; display:flex; align-items:center; gap:20px;
    margin-bottom:20px; flex-wrap:wrap;
  }

  .table { width:100%; border-collapse:collapse; }
  .table th { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${T.muted}; text-align:left; padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .table td { font-size:13px; padding:11px 12px; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
  .table tr:last-child td { border-bottom:none; }
  .table tr:hover td { background:rgba(255,255,255,0.02); }

  .profile-av-big {
    width:88px; height:88px; border-radius:50%;
    background:rgba(202,255,0,0.15); color:${T.lime};
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:34px;
    display:flex; align-items:center; justify-content:center; margin:0 auto 14px;
  }

  @media(max-width:1100px){ .two-col,.two-col-eq{ grid-template-columns:1fr; } .stats-row{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:768px){ .sidebar{display:none;} .main{margin-left:0;} }
`;

// ── DATA ──────────────────────────────────────────────────

const MONTHLY = [
  {m:"Jan",v:6200},{m:"Feb",v:8400},{m:"Mar",v:7100},
  {m:"Apr",v:9800},{m:"May",v:11200},{m:"Jun",v:13650},
];

const SESSIONS = [
  {id:1,name:"Renz Latangga",   ini:"RL",bg:"rgba(202,255,0,0.15)",  tc:"#CAFF00", sport:"🏀 Basketball", time:"Today · 2:00–3:00 PM",   earn:800, status:"confirmed"},
  {id:2,name:"Ana Reyes",      ini:"AR",bg:"rgba(106,191,255,0.15)",tc:"#6FBFFF", sport:"🏀 Shooting drill",time:"Today · 4:00–5:00 PM",   earn:800, status:"confirmed"},
  {id:3,name:"Mark Tobias",    ini:"MT",bg:"rgba(255,181,71,0.15)", tc:"#FFB547", sport:"🏀 Defense",     time:"Tomorrow · 7:00–8:00 AM", earn:800, status:"pending"},
  {id:4,name:"Lia Santos",     ini:"LS",bg:"rgba(202,255,0,0.12)",  tc:"#CAFF00", sport:"🏀 Fundamentals",time:"Jun 24 · 3:00–4:00 PM",   earn:800, status:"confirmed"},
  {id:5,name:"Josh Perez",     ini:"JP",bg:"rgba(255,77,77,0.12)",  tc:"#FF4D4D", sport:"🏀 1-on-1",      time:"Jun 10 · 2:00–3:00 PM",   earn:800, status:"cancelled"},
];

const WEEK_SLOTS = {
  Mon:["8AM","10AM","2PM"],
  Tue:["9AM","3PM"],
  Wed:["8AM","10AM","12PM","2PM"],
  Thu:["9AM"],
  Fri:["8AM","2PM","4PM"],
  Sat:["10AM","12PM"],
  Sun:[],
};
const BOOKED_SLOTS = {Mon:["10AM"],Wed:["12PM"],Fri:["2PM"],Sat:["10AM"]};

const REVIEWS = [
  {name:"Renz L.", stars:5, date:"Jun 18", text:"Coach Ramon is the best! My shooting improved massively after just 4 sessions. Very patient and technical."},
  {name:"Ana R.",  stars:5, date:"Jun 14", text:"Incredible coaching style. Explains every drill in detail and adjusts to your pace. Highly recommended."},
  {name:"Mark T.", stars:4, date:"Jun 10", text:"Great defense drills. Would love more conditioning work added to the sessions."},
];

const CERTS = [
  {icon:"🏀",name:"PBA Coaching License",      issuer:"Philippine Basketball Association · 2019"},
  {icon:"📜",name:"NSTP Sports Development",    issuer:"Department of Education · 2018"},
  {icon:"🎓",name:"B.S. Physical Education",   issuer:"University of Santo Tomas · 2016"},
];

const TRANSACTIONS = [
  {ref:"FB-2026-00041",athlete:"Renz Latangga",  date:"Jun 18",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00039",athlete:"Ana Reyes",       date:"Jun 14",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00035",athlete:"Mark Tobias",     date:"Jun 10",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00031",athlete:"Lia Santos",      date:"Jun 7", gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00028",athlete:"Josh Perez",      date:"Jun 3", gross:800,fee:80,net:720,status:"refunded"},
];

const NAV = [
  {label:"Dashboard",      icon:"⬛", key:"dashboard"},
  {label:"My Sessions",    icon:"📅", key:"sessions",  badge:"3"},
  {label:"Availability",   icon:"🗓️",  key:"availability"},
  {label:"Earnings",       icon:"💰", key:"earnings"},
  {label:"Reviews",        icon:"⭐", key:"reviews",   badgeWarn:"3"},
  {label:"My Profile",     icon:"👤", key:"profile"},
];

// ── COMPONENTS ────────────────────────────────────────────

function Sidebar({active, setActive}) {
  return (
    <aside className="sidebar">
      <div className="sb-logo">Fit<span>Book</span><span className="role-chip">🏋️ Coach</span></div>
      <div className="sb-section">Coach Panel</div>
      <nav className="sb-nav">
        {NAV.map(n => (
          <button key={n.key} className={`nav-item${active===n.key?" active":""}`} onClick={()=>setActive(n.key)}>
            <span className="nav-icon">{n.icon}</span>
            {n.label}
            {n.badge     && <span className="nav-badge">{n.badge}</span>}
            {n.badgeWarn && <span className="nav-badge-warn">{n.badgeWarn}</span>}
          </button>
        ))}
      </nav>
      <div className="sb-bottom">
        <div className="av">RC</div>
        <div><div className="av-name">Coach Ramon Cruz</div><div className="av-role">PBA Veteran · Basketball</div></div>
      </div>
    </aside>
  );
}

// ── PAGE: DASHBOARD ───────────────────────────────────────
function DashboardPage({setActive}) {
  const maxV = Math.max(...MONTHLY.map(m=>m.v));
  return (
    <>
      <div className="greeting">
        <div>
          <div className="g-text">Good morning, <span>Coach Ramon</span> 👋</div>
          <div className="g-sub">Sunday, June 21, 2026 · You have 2 sessions today</div>
        </div>
        <button className="btn-lime" onClick={()=>setActive("availability")}>+ Add availability</button>
      </div>

      {/* Next session banner */}
      <div className="next-session">
        <div style={{fontSize:36}}>🏀</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:T.success,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Next session · in 2 hours</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,textTransform:"uppercase"}}>Renz Latangga — Basketball Shooting</div>
          <div style={{fontSize:13,color:T.muted,marginTop:3}}>Today · 2:00–3:00 PM · PhilSports Arena, Pasig City</div>
        </div>
        <button className="btn-lime">View details →</button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Sessions this month</div><div className="stat-value">17</div><div className="stat-sub">↑ 4 vs last month</div></div>
        <div className="stat-card"><div className="stat-label">Revenue this month</div><div className="stat-value">₱13,650</div><div className="stat-sub" style={{color:T.success}}>↑ 22% vs May</div></div>
        <div className="stat-card"><div className="stat-label">Avg. session rating</div><div className="stat-value warn">4.9★</div><div className="stat-sub">from 64 reviews</div></div>
        <div className="stat-card"><div className="stat-label">AI match score</div><div className="stat-value green">92%</div><div className="stat-sub">Top coach in Pasig</div></div>
      </div>

      <div className="two-col">
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Earnings chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Earnings — 2026</div>
              <span className="card-link" onClick={()=>setActive("earnings")}>Full report →</span>
            </div>
            <div className="card-body">
              <div style={{display:"flex",gap:20,marginBottom:16}}>
                <div>
                  <div style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>Net payout (Jun)</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:T.lime,marginTop:4}}>₱12,285</div>
                </div>
                <div style={{borderLeft:"1px solid rgba(255,255,255,0.08)",paddingLeft:20}}>
                  <div style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>Platform fee (10%)</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:T.muted,marginTop:4}}>₱1,365</div>
                </div>
              </div>
              <div className="bar-chart">
                {MONTHLY.map(m=>(
                  <div key={m.m} className="bar-col">
                    <div className="bar-val">₱{(m.v/1000).toFixed(1)}k</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{
                        height:`${(m.v/maxV)*100}%`,
                        background:m.m==="Jun"?`linear-gradient(to top,${T.lime2},${T.lime})`:"rgba(202,255,0,0.18)"
                      }}/>
                    </div>
                    <div className="bar-month">{m.m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Upcoming sessions</div>
              <span className="card-link" onClick={()=>setActive("sessions")}>All sessions →</span>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {SESSIONS.filter(s=>s.status!=="cancelled").slice(0,4).map(s=>(
                <div className="session-item" key={s.id}>
                  <div className="session-av" style={{background:s.bg,color:s.tc}}>{s.ini}</div>
                  <div className="session-info">
                    <div className="session-name">{s.name}</div>
                    <div className="session-meta">{s.sport} · {s.time}</div>
                  </div>
                  <span className="session-earn">₱{s.earn}</span>
                  <span className={`badge badge-${s.status}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* This week availability snapshot */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">This week</div>
              <span className="card-link" onClick={()=>setActive("availability")}>Edit →</span>
            </div>
            <div className="card-body">
              <div className="week-grid">
                {Object.entries(WEEK_SLOTS).map(([day,slots])=>(
                  <div key={day} className="day-col">
                    <div className="day-label">{day}</div>
                    {slots.length===0
                      ? <div className="day-slot empty" style={{padding:"8px 0",fontSize:10}}>Off</div>
                      : slots.map(t=>{
                          const isBooked = (BOOKED_SLOTS[day]||[]).includes(t);
                          return <div key={t} className={`day-slot ${isBooked?"booked":"open"}`}>{t}</div>;
                        })
                    }
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:14,marginTop:14,flexWrap:"wrap"}}>
                {[{c:T.success,l:"Open"},{c:T.warning,l:"Booked"},{c:T.danger,l:"Blocked"}].map(x=>(
                  <span key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:T.muted}}>
                    <span style={{width:8,height:8,borderRadius:2,background:x.c,display:"inline-block"}}/>
                    {x.l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent reviews */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent reviews</div>
              <span className="card-link" onClick={()=>setActive("reviews")}>All →</span>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {REVIEWS.slice(0,2).map((r,i)=>(
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

          {/* AI match panel */}
          <div className="card">
            <div className="card-header"><div className="card-title">🤖 AI Visibility</div></div>
            <div className="card-body">
              <div className="embed-panel">
                <div style={{fontSize:11,color:T.muted,marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Embedding status</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:T.muted}}>Model</span><span style={{color:T.lime}}>nomic-embed-text</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:T.muted}}>Last generated</span><span>Jun 20, 2026</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                  <span style={{color:T.muted}}>Dimensions</span><span>768</span>
                </div>
              </div>
              <div style={{fontSize:13,color:T.muted,marginBottom:12,lineHeight:1.55}}>
                Your profile appears as <strong style={{color:T.white}}>#1 match</strong> for basketball athletes in Pasig City with a <strong style={{color:T.lime}}>92% similarity score</strong>.
              </div>
              <button className="btn-lime" style={{width:"100%",justifyContent:"center",fontSize:13}}>Regenerate embedding</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── PAGE: SESSIONS ────────────────────────────────────────
function SessionsPage() {
  const [tab, setTab] = useState("upcoming");
  const upcoming  = SESSIONS.filter(s=>s.status==="confirmed"||s.status==="pending");
  const past      = SESSIONS.filter(s=>s.status==="cancelled"||s.status==="completed");
  const shown     = tab==="upcoming" ? upcoming : past;
  return (
    <>
      <div className="greeting">
        <div className="g-text">My <span>Sessions</span></div>
        <button className="btn-lime">+ Block time off</button>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="tabs" style={{border:"none",margin:0}}>
            {["upcoming","past"].map(t=>(
              <button key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)} style={{textTransform:"capitalize"}}>{t}</button>
            ))}
          </div>
        </div>
        <div className="card-body" style={{padding:"8px 20px"}}>
          {shown.map(s=>(
            <div className="session-item" key={s.id}>
              <div className="session-av" style={{background:s.bg,color:s.tc}}>{s.ini}</div>
              <div className="session-info">
                <div className="session-name">{s.name}</div>
                <div className="session-meta">{s.sport} · {s.time}</div>
              </div>
              <span className="session-earn">₱{s.earn}</span>
              <span className={`badge badge-${s.status}`}>{s.status}</span>
              {s.status==="confirmed" && (
                <button style={{marginLeft:8,background:"transparent",border:"1px solid rgba(255,77,77,0.3)",color:T.danger,borderRadius:6,padding:"4px 12px",fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
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

// ── PAGE: AVAILABILITY ────────────────────────────────────
function AvailabilityPage() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const times = ["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
  const bookedTimes = ["9:00 AM","2:00 PM"];

  return (
    <>
      <div className="greeting">
        <div>
          <div className="g-text">My <span>Availability</span></div>
          <div className="g-sub">Set your weekly schedule — athletes book directly from these slots</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn-ghost">Clear week</button>
          <button className="btn-lime">Save schedule</button>
        </div>
      </div>

      <div className="two-col">
        {/* Weekly grid */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Weekly schedule template</div>
            <div style={{display:"flex",gap:12}}>
              {[{c:T.success,l:"Open"},{c:T.warning,l:"Booked"},{c:T.danger,l:"Blocked"}].map(x=>(
                <span key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:T.muted}}>
                  <span style={{width:8,height:8,borderRadius:2,background:x.c,display:"inline-block"}}/>{x.l}
                </span>
              ))}
            </div>
          </div>
          <div className="card-body">
            {/* Day headers */}
            <div style={{display:"grid",gridTemplateColumns:"72px repeat(7,1fr)",gap:4,marginBottom:4}}>
              <div/>
              {days.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.06em",padding:"4px 0"}}>{d}</div>)}
            </div>
            {/* Time rows */}
            {times.map(t=>(
              <div key={t} style={{display:"grid",gridTemplateColumns:"72px repeat(7,1fr)",gap:4,marginBottom:4}}>
                <div style={{fontSize:11,color:T.muted,display:"flex",alignItems:"center",fontWeight:500}}>{t}</div>
                {days.map(d=>{
                  const isBooked = d==="Mon"&&bookedTimes.includes(t);
                  const isOpen   = (WEEK_SLOTS[d]||[]).some(s=>t.startsWith(s.replace("AM"," AM").replace("PM"," PM").trim().substring(0,2)));
                  return (
                    <div key={d} className={`day-slot ${isBooked?"booked":isOpen?"open":"empty"}`}
                      style={{borderRadius:5,height:28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>
                      {isBooked?"📅":isOpen?"●":""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Add slot / settings */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="card">
            <div className="card-header"><div className="card-title">Add time slot</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Day(s)</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {days.map(d=>(
                    <button key={d} style={{
                      padding:"6px 10px",borderRadius:6,fontSize:12,fontWeight:500,cursor:"pointer",
                      fontFamily:"Inter,sans-serif",
                      background:"rgba(202,255,0,0.08)",color:T.lime,
                      border:"1px solid rgba(202,255,0,0.2)"
                    }}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div className="form-group">
                  <label className="form-label">Start</label>
                  <input type="time" className="form-input" style={{colorScheme:"dark"}} />
                </div>
                <div className="form-group">
                  <label className="form-label">End</label>
                  <input type="time" className="form-input" style={{colorScheme:"dark"}} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Rate override (optional)</label>
                <input className="form-input" placeholder="Default: ₱800/hr" />
              </div>
              <button className="btn-lime" style={{width:"100%",justifyContent:"center"}}>Add to schedule</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Session settings</div></div>
            <div className="card-body">
              {[
                {label:"Hourly rate",        val:"₱800"},
                {label:"Min. session length",val:"1 hour"},
                {label:"Buffer between sessions",val:"30 min"},
                {label:"Advance booking limit",val:"14 days"},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <span style={{fontSize:13,color:T.muted}}>{s.label}</span>
                  <span style={{fontSize:13,fontWeight:600}}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── PAGE: EARNINGS ────────────────────────────────────────
function EarningsPage() {
  return (
    <>
      <div className="greeting">
        <div className="g-text">Earnings &amp; <span>Payouts</span></div>
        <button className="btn-lime">Request payout</button>
      </div>
      <div className="payout-banner">
        <div>
          <div style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Available for payout</div>
          <div className="payout-amount">₱12,285</div>
          <div style={{fontSize:13,color:T.muted,marginTop:4}}>After 10% platform fee · Via GCash / PayMongo</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,minWidth:200}}>
          {[["Gross revenue","₱13,650"],["Platform fee (10%)","−₱1,365"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
              <span style={{color:T.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:12,display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:700}}>
            <span>Net</span><span style={{color:T.lime}}>₱12,285</span>
          </div>
          <button className="btn-lime" style={{justifyContent:"center"}}>Withdraw to GCash →</button>
        </div>
      </div>
      <div className="stats-row" style={{marginBottom:20}}>
        <div className="stat-card"><div className="stat-label">YTD gross</div><div className="stat-value">₱56,350</div></div>
        <div className="stat-card"><div className="stat-label">YTD net</div><div className="stat-value green">₱50,715</div></div>
        <div className="stat-card"><div className="stat-label">Total sessions</div><div className="stat-value">71</div></div>
        <div className="stat-card"><div className="stat-label">Avg per session</div><div className="stat-value warn">₱794</div></div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Transaction history</div><span className="card-link">Export CSV →</span></div>
        <div style={{overflowX:"auto"}}>
          <table className="table">
            <thead><tr>
              <th>Booking ref</th><th>Athlete</th><th>Date</th><th>Gross</th><th>Fee</th><th>Net</th><th>Status</th>
            </tr></thead>
            <tbody>{TRANSACTIONS.map(t=>(
              <tr key={t.ref}>
                <td style={{fontFamily:"monospace",fontSize:12,color:T.lime}}>{t.ref}</td>
                <td>{t.athlete}</td>
                <td style={{color:T.muted}}>{t.date}</td>
                <td style={{fontWeight:600}}>₱{t.gross}</td>
                <td style={{color:T.muted}}>₱{t.fee}</td>
                <td style={{fontWeight:700,color:T.lime}}>₱{t.net}</td>
                <td><span className={`badge ${t.status==="paid"?"badge-confirmed":"badge-cancelled"}`}>{t.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ── PAGE: REVIEWS ─────────────────────────────────────────
function ReviewsPage() {
  return (
    <>
      <div className="greeting"><div className="g-text">Reviews &amp; <span>Ratings</span></div></div>
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:20}}>
        <div className="card" style={{alignSelf:"start"}}>
          <div className="card-body" style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:64,fontWeight:900,color:T.lime,lineHeight:1}}>4.9</div>
            <div style={{color:T.warning,fontSize:22,margin:"8px 0"}}>★★★★★</div>
            <div style={{fontSize:13,color:T.muted}}>64 reviews</div>
            <div style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
              {[5,4,3,2,1].map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,color:T.muted,width:8}}>{s}</span>
                  <span style={{color:T.warning,fontSize:12}}>★</span>
                  <div style={{flex:1,height:5,borderRadius:3,background:"rgba(255,255,255,0.08)"}}>
                    <div style={{height:"100%",borderRadius:3,background:T.lime,width:s===5?"85%":s===4?"12%":"3%"}}/>
                  </div>
                  <span style={{fontSize:11,color:T.muted,width:30,textAlign:"right"}}>{s===5?"85%":s===4?"12%":"3%"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">All reviews</div></div>
          <div className="card-body" style={{padding:"8px 20px"}}>
            {REVIEWS.map((r,i)=>(
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
    </>
  );
}

// ── PAGE: PROFILE ─────────────────────────────────────────
function ProfilePage() {
  return (
    <>
      <div className="greeting">
        <div className="g-text">Coach <span>Profile</span></div>
        <button className="btn-lime">Save changes</button>
      </div>
      <div className="two-col-eq">
        <div className="card">
          <div className="card-header"><div className="card-title">Personal info</div></div>
          <div className="card-body">
            <div style={{textAlign:"center",marginBottom:20}}>
              <div className="profile-av-big">RC</div>
              <button className="btn-ghost" style={{fontSize:12,padding:"7px 16px"}}>Change photo</button>
            </div>
            {[["Full name","Ramon Cruz"],["Email","ramon@fitbook.ph"],["Phone","+63 917 800 1234"],["City","Pasig City, Metro Manila"]].map(([l,v])=>(
              <div className="form-group" key={l}>
                <label className="form-label">{l}</label>
                <input className="form-input" defaultValue={v} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Headline</label>
              <input className="form-input" defaultValue="PBA Veteran Coach · 10 yrs · Basketball Shooting Specialist" />
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-input form-textarea" defaultValue="10-year PBA career. Specialises in ball handling, shooting mechanics, and youth development for ages 12–22. Based in Pasig City." />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="form-group">
                <label className="form-label">Hourly rate (₱)</label>
                <input className="form-input" defaultValue="800" />
              </div>
              <div className="form-group">
                <label className="form-label">Years experience</label>
                <input className="form-input" defaultValue="10" />
              </div>
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Certifications */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Certifications</div>
              <button className="btn-lime" style={{padding:"6px 14px",fontSize:12}}>+ Add</button>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {CERTS.map((c,i)=>(
                <div className="cert-item" key={i}>
                  <div className="cert-icon">{c.icon}</div>
                  <div style={{flex:1}}>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-issuer">{c.issuer}</div>
                  </div>
                  <button style={{background:"transparent",border:"none",color:T.muted,cursor:"pointer",fontSize:16}}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="card">
            <div className="card-header"><div className="card-title">Verification</div></div>
            <div className="card-body">
              {[{l:"Email verified",ok:true},{l:"Phone verified",ok:true},{l:"Government ID",ok:true},{l:"Coaching license",ok:false}].map(v=>(
                <div key={v.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <span style={{fontSize:13}}>{v.l}</span>
                  {v.ok ? <span style={{fontSize:12,color:T.success,fontWeight:600}}>✓ Verified</span>
                        : <button className="btn-lime" style={{padding:"5px 14px",fontSize:12}}>Upload</button>}
                </div>
              ))}
            </div>
          </div>

          {/* AI embedding */}
          <div className="card">
            <div className="card-header"><div className="card-title">🤖 AI Matching</div></div>
            <div className="card-body">
              <div className="embed-panel">
                <div style={{fontSize:13,color:T.muted,lineHeight:1.55,marginBottom:10}}>
                  Your bio is embedded using <span style={{color:T.lime}}>nomic-embed-text</span> (768-dim vector). Athletes are matched to you via cosine similarity. Update your bio, then regenerate.
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:T.muted}}>Last generated</span><span style={{color:T.success}}>Jun 20, 2026</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                  <span style={{color:T.muted}}>Match rank</span><span style={{color:T.lime,fontWeight:600}}>#1 in Pasig City · Basketball</span>
                </div>
              </div>
              <button className="btn-lime" style={{width:"100%",justifyContent:"center"}}>Regenerate embedding</button>
            </div>
          </div>

          {/* Payout settings */}
          <div className="card">
            <div className="card-header"><div className="card-title">Payout settings</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">GCash number</label>
                <input className="form-input" placeholder="+63 9XX XXX XXXX" />
              </div>
              <div className="form-group">
                <label className="form-label">PayMongo account ID</label>
                <input className="form-input" placeholder="acct_..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── ROOT ──────────────────────────────────────────────────
export default function CoachDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const titles = {dashboard:"Dashboard",sessions:"My Sessions",availability:"Availability",earnings:"Earnings",reviews:"Reviews",profile:"Profile"};
  const renderPage = () => {
    switch(activeNav) {
      case "dashboard":    return <DashboardPage setActive={setActiveNav}/>;
      case "sessions":     return <SessionsPage/>;
      case "availability": return <AvailabilityPage/>;
      case "earnings":     return <EarningsPage/>;
      case "reviews":      return <ReviewsPage/>;
      case "profile":      return <ProfilePage/>;
      default: return null;
    }
  };
  return (
    <>
      <style>{css}</style>
      <div className="root">
        <Sidebar active={activeNav} setActive={setActiveNav}/>
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{titles[activeNav]}</div>
            {activeNav==="dashboard" && <span className="topbar-pill">● 2 sessions today</span>}
            <div className="tb-right">
              <div className="icon-btn">🔔<span className="notif-dot"/></div>
              <div className="icon-btn">⚙️</div>
              <div className="av" style={{width:36,height:36,fontSize:14}}>RC</div>
            </div>
          </div>
          <div className="page">{renderPage()}</div>
        </main>
      </div>
    </>
  );
}
