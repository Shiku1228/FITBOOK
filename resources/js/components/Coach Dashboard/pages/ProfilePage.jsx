import { T } from '../../AthleteDashboard/theme.jsx';
import { CERTS } from '../theme';
import { Award, ScrollText, GraduationCap, X } from "lucide-react";

export default function ProfilePage() {
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
                  <div className="cert-icon" style={{background:"rgba(202,255,0,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {i === 0 ? <Award size={18} color={T.lime} /> : i === 1 ? <ScrollText size={18} color={T.lime} /> : <GraduationCap size={18} color={T.lime} />}
                  </div>
                  <div style={{flex:1}}>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-issuer">{c.issuer}</div>
                  </div>
                  <button style={{background:"transparent",border:"none",color:T.muted,cursor:"pointer",fontSize:16}}><X size={16} /></button>
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
