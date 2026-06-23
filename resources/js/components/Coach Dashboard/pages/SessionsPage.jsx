import { useState } from "react";
import { T } from '../../AthleteDashboard/theme.jsx';
import { SESSIONS } from '../theme';

export default function SessionsPage() {
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
