import { T, MONTHLY, WEEK_SLOTS, BOOKED_SLOTS, SESSIONS, REVIEWS } from '../theme';
import { Dumbbell, Hand, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();
  const maxV = Math.max(...MONTHLY.map(m=>m.v));
  return (
    <>
      <div className="greeting">
        <div>
          <div className="g-text">Good morning, <span>Coach Ramon</span> <Hand className="inline-block" size={24} /></div>
          <div className="g-sub">Sunday, June 21, 2026 · You have 2 sessions today</div>
        </div>
        <button className="btn-lime" onClick={()=>navigate("/availability")}>+ Add availability</button>
      </div>

      {/* Next session banner */}
      <div className="next-session">
        <Dumbbell size={36} />
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
              <span className="card-link" onClick={()=>navigate("/earnings")}>Full report →</span>
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
              <span className="card-link" onClick={()=>navigate("/sessions")}>All sessions →</span>
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
              <span className="card-link" onClick={()=>navigate("/availability")}>Edit →</span>
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
              <span className="card-link" onClick={()=>navigate("/reviews")}>All →</span>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {REVIEWS.slice(0,2).map((r,i)=>(
                <div className="review-item" key={i}>
                  <div className="review-header">
                    <div className="review-av">{r.name.split(" ").map(n=>n[0]).join("")}</div>
                    <span className="review-name">{r.name}</span>
                    <span className="review-stars" style={{display:"flex",gap:1}}>
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={12} fill={i <= r.stars ? T.warning : "none"} color={T.warning} />
                      ))}
                    </span>
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
