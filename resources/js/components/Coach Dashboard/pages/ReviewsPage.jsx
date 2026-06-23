import { T } from '../../AthleteDashboard/theme.jsx';
import { REVIEWS } from '../theme';
import { Star } from "lucide-react";

export default function ReviewsPage() {
  return (
    <>
      <div className="greeting"><div className="g-text">Reviews &amp; <span>Ratings</span></div></div>
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:20}}>
        <div className="card" style={{alignSelf:"start"}}>
          <div className="card-body" style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:64,fontWeight:900,color:T.lime,lineHeight:1}}>4.9</div>
            <div style={{color:T.warning,fontSize:22,margin:"8px 0",display:"flex",gap:2,justifyContent:"center"}}>
              {[1,2,3,4,5].map(i => <Star key={i} size={22} fill={T.warning} color={T.warning} />)}
            </div>
            <div style={{fontSize:13,color:T.muted}}>64 reviews</div>
            <div style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
              {[5,4,3,2,1].map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,color:T.muted,width:8}}>{s}</span>
                  <Star size={12} fill={T.warning} color={T.warning} />
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
      </div>
    </>
  );
}
