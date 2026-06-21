import React from "react";
import { Star } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";

const REVIEWS = [
  { name:"Renz L.", stars:5, date:"Jun 18", text:"Perfect court, very clean and well-lit. Booking was instant and the GCash payment worked seamlessly." },
  { name:"Ana R.",  stars:5, date:"Jun 15", text:"Coach Maria was incredible. Best swimming instruction I've had — highly recommend booking through FitBook." },
  { name:"Mark T.", stars:4, date:"Jun 12", text:"Great facility overall. Would appreciate more towels in the locker room but court conditions were excellent." },
];

export default function ReviewsPage() {
  return (
    <>
      <div className="greeting">
        <div className="g-text">Reviews & <span>Ratings</span></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:20 }}>
        <div className="card" style={{ alignSelf:"start" }}>
          <div className="card-body" style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:64, fontWeight:900, color:T.lime, lineHeight:1 }}>4.9</div>
            <div style={{ color:T.warning, fontSize:22, margin:"8px 0" }}>
              {Array(5).fill().map(() => <Star size={22} />)}
            </div>
            <div style={{ fontSize:13, color:T.muted }}>128 reviews across all facilities</div>
            <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:8 }}>
              {[5,4,3,2,1].map(s => (
                <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:12, color:T.muted, width:8 }}>{s}</span>
                  <Star size={12} style={{ color:T.warning }} />
                  <div style={{ flex:1, height:6, borderRadius:3, background:"rgba(255,255,255,0.08)" }}>
                    <div style={{ height:"100%", borderRadius:3, background:T.lime, width: s===5?"82%":s===4?"13%":s===3?"4%":"1%" }} />
                  </div>
                  <span style={{ fontSize:11, color:T.muted, width:30, textAlign:"right" }}>{s===5?"82%":s===4?"13%":s===3?"4%":s===2?"1%":"0%"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">All reviews</div></div>
          <div className="card-body" style={{ padding:"8px 20px" }}>
            {REVIEWS.map((r,i) => (
              <div className="review-item" key={i}>
                <div className="review-header">
                  <div className="review-av">{r.name.split(" ").map(n=>n[0]).join("")}</div>
                  <span className="review-name">{r.name}</span>
                  <span className="review-stars">{Array(r.stars).fill(<Star size={12} style={{ color:T.warning }} />)}</span>
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
