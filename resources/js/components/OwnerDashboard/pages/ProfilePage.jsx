import React from "react";
import { User, Upload, CheckCircle, X, FileText, Bot } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";

export default function ProfilePage({ role = "facility_owner" }) {
  return (
    <>
      <div className="greeting">
        <div className="g-text">{role === "coach" ? "Coach" : "Owner"} <span>Profile</span></div>
        <button className="btn-lime">Save changes</button>
      </div>
      <div className="two-col-eq">
        {/* Left: profile form */}
        <div className="card">
          <div className="card-header"><div className="card-title">Personal info</div></div>
          <div className="card-body">
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div className="profile-av-big">JD</div>
              <button className="btn-ghost" style={{ fontSize:12, padding:"7px 16px" }}>Change photo</button>
            </div>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" defaultValue="Juan dela Cruz" />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" defaultValue="juan@fitbook.ph" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" defaultValue="+63 912 345 6789" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" defaultValue="Iligan City, Lanao del Norte" />
            </div>
            {role === "coach" && <>
              <div className="form-group">
                <label className="form-label">Headline</label>
                <input className="form-input" defaultValue="AFC B-Licensed Football Coach · 8 yrs experience" />
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-input form-textarea" defaultValue="AFC B-licensed coach with 8 years in youth academies and amateur clubs across the Visayas. Specialises in tactical positioning and youth development." />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div className="form-group">
                  <label className="form-label">Hourly rate (₱)</label>
                  <input className="form-input" defaultValue="550" />
                </div>
                <div className="form-group">
                  <label className="form-label">Years experience</label>
                  <input className="form-input" defaultValue="8" />
                </div>
              </div>
            </>}
          </div>
        </div>

        {/* Right: verification + payment */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Verification status</div></div>
            <div className="card-body">
              {[
                { label:"Email verified", ok:true },
                { label:"Phone verified", ok:true },
                { label:"Government ID", ok:true },
                { label:"Business permit", ok:false },
              ].map(v => (
                <div key={v.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize:13 }}>{v.label}</span>
                  {v.ok
                    ? <span style={{ fontSize:12, color:T.success, fontWeight:600 }}><CheckCircle size={12} style={{ marginRight:4 }} /> Verified</span>
                    : <button className="btn-lime" style={{ padding:"5px 14px", fontSize:12 }}>Upload</button>
                  }
                </div>
              ))}
            </div>
          </div>

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
              <button className="btn-ghost" style={{ width:"100%", textAlign:"center", fontSize:13 }}>Link bank account</button>
            </div>
          </div>

          {role === "coach" && (
            <div className="card">
              <div className="card-header"><div className="card-title">AI matching</div></div>
              <div className="card-body">
                <div style={{ fontSize:13, color:T.muted, marginBottom:14, lineHeight:1.55 }}>
                  Your bio is converted to a 768-dim embedding using <span style={{ color:T.lime }}>nomic-embed-text</span> for AI coach matching. Regenerate after updating your bio.
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:14 }}>
                  <span style={{ color:T.muted }}>Last generated</span>
                  <span style={{ color:T.success }}>Jun 20, 2026</span>
                </div>
                <button className="btn-lime" style={{ width:"100%", justifyContent:"center" }}><Bot size={14} style={{ marginRight:8 }} /> Regenerate embedding</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
