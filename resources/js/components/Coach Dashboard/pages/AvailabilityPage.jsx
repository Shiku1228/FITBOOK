import { T } from '../../AthleteDashboard/theme.jsx';
import { WEEK_SLOTS } from '../theme';

export default function AvailabilityPage() {
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
