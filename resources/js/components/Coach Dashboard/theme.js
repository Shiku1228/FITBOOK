import { T } from '../AthleteDashboard/theme.jsx';

// Coach-specific CSS additions
export const coachCss = `
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

  .profile-av-big {
    width:88px; height:88px; border-radius:50%;
    background:rgba(202,255,0,0.15); color:${T.lime};
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:34px;
    display:flex; align-items:center; justify-content:center; margin:0 auto 14px;
  }

  /* Dropdown panels */
  .dropdown-panel {
    position:absolute !important;
    top:45px !important; right:0 !important;
    background:${T.cardBg};
    border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;
    box-shadow:0 8px 32px rgba(0,0,0,0.4);
    min-width:280px;
    max-width:360px;
    z-index:9999 !important;
    animation:slideDown 0.2s ease;
  }
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-8px); }
    to { opacity:1; transform:translateY(0); }
  }
  .dropdown-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:14px 18px;
    border-bottom:1px solid rgba(255,255,255,0.06);
  }
  .dropdown-title {
    font-family:'Barlow Condensed',sans-serif;
    font-size:14px;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:0.04em;
  }
  .dropdown-action {
    font-size:11px;
    color:${T.lime};
    cursor:pointer;
    font-weight:600;
  }
  .dropdown-action:hover { text-decoration:underline; }
  .dropdown-body {
    padding:8px 0;
    max-height:400px;
    overflow-y:auto;
  }
  .dropdown-body::-webkit-scrollbar { width:6px; }
  .dropdown-body::-webkit-scrollbar-track { background:${T.navy3}; }
  .dropdown-body::-webkit-scrollbar-thumb { background:${T.navy2}; border-radius:3px; }
  .dropdown-body::-webkit-scrollbar-thumb:hover { background:${T.muted}; }

  /* Notifications dropdown */
  .notif-dropdown { right:100px; }
  .notif-item {
    display:flex;
    gap:12px;
    padding:12px 18px;
    border-bottom:1px solid rgba(255,255,255,0.04);
    cursor:pointer;
    transition:background 0.15s;
  }
  .notif-item:last-child { border-bottom:none; }
  .notif-item:hover { background:rgba(255,255,255,0.04); }
  .notif-dot-icon {
    width:8px; height:8px;
    border-radius:50%;
    margin-top:5px;
    flex-shrink:0;
  }
  .notif-text {
    font-size:13px;
    line-height:1.5;
    color:rgba(255,255,255,0.9);
  }
  .notif-text strong { color:${T.white}; }
  .notif-time {
    font-size:11px;
    color:${T.muted};
    margin-top:4px;
  }

  /* Settings dropdown */
  .settings-dropdown { right:60px; }
  .settings-item {
    padding:10px 18px;
    font-size:13px;
    font-weight:500;
    color:${T.white};
    cursor:pointer;
    transition:background 0.15s;
    display:flex;
    align-items:center;
    gap:10px;
  }
  .settings-item:hover { background:rgba(255,255,255,0.06); }
  .settings-divider {
    height:1px;
    background:rgba(255,255,255,0.08);
    margin:6px 0;
  }

  @media(max-width:1100px){ .two-col,.two-col-eq{ grid-template-columns:1fr; } .stats-row{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:768px){ .sidebar{display:none;} .main{margin-left:0;} }
`;

export const MONTHLY = [
  {m:"Jan",v:6200},{m:"Feb",v:8400},{m:"Mar",v:7100},
  {m:"Apr",v:9800},{m:"May",v:11200},{m:"Jun",v:13650},
];

export const SESSIONS = [
  {id:1,name:"Renz Latangga",   ini:"RL",bg:"rgba(202,255,0,0.15)",  tc:"#CAFF00", sport:"Basketball", time:"Today · 2:00–3:00 PM",   earn:800, status:"confirmed"},
  {id:2,name:"Ana Reyes",      ini:"AR",bg:"rgba(106,191,255,0.15)",tc:"#6FBFFF", sport:"Shooting drill",time:"Today · 4:00–5:00 PM",   earn:800, status:"confirmed"},
  {id:3,name:"Mark Tobias",    ini:"MT",bg:"rgba(255,181,71,0.15)", tc:"#FFB547", sport:"Defense",     time:"Tomorrow · 7:00–8:00 AM", earn:800, status:"pending"},
  {id:4,name:"Lia Santos",     ini:"LS",bg:"rgba(202,255,0,0.12)",  tc:"#CAFF00", sport:"Fundamentals",time:"Jun 24 · 3:00–4:00 PM",   earn:800, status:"confirmed"},
  {id:5,name:"Josh Perez",     ini:"JP",bg:"rgba(255,77,77,0.12)",  tc:"#FF4D4D", sport:"1-on-1",      time:"Jun 10 · 2:00–3:00 PM",   earn:800, status:"cancelled"},
];

export const WEEK_SLOTS = {
  Mon:["8AM","10AM","2PM"],
  Tue:["9AM","3PM"],
  Wed:["8AM","10AM","12PM","2PM"],
  Thu:["9AM"],
  Fri:["8AM","2PM","4PM"],
  Sat:["10AM","12PM"],
  Sun:[],
};
export const BOOKED_SLOTS = {Mon:["10AM"],Wed:["12PM"],Fri:["2PM"],Sat:["10AM"]};

export const REVIEWS = [
  {name:"Renz L.", stars:5, date:"Jun 18", text:"Coach Ramon is the best! My shooting improved massively after just 4 sessions. Very patient and technical."},
  {name:"Ana R.",  stars:5, date:"Jun 14", text:"Incredible coaching style. Explains every drill in detail and adjusts to your pace. Highly recommended."},
  {name:"Mark T.", stars:4, date:"Jun 10", text:"Great defense drills. Would love more conditioning work added to the sessions."},
];

export const CERTS = [
  {name:"PBA Coaching License",      issuer:"Philippine Basketball Association · 2019"},
  {name:"NSTP Sports Development",    issuer:"Department of Education · 2018"},
  {name:"B.S. Physical Education",   issuer:"University of Santo Tomas · 2016"},
];

export const TRANSACTIONS = [
  {ref:"FB-2026-00041",athlete:"Renz Latangga",  date:"Jun 18",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00039",athlete:"Ana Reyes",       date:"Jun 14",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00035",athlete:"Mark Tobias",     date:"Jun 10",gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00031",athlete:"Lia Santos",      date:"Jun 7", gross:800,fee:80,net:720,status:"paid"},
  {ref:"FB-2026-00028",athlete:"Josh Perez",      date:"Jun 3", gross:800,fee:80,net:720,status:"refunded"},
];
