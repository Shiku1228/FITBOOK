import { T } from '../../AthleteDashboard/theme.jsx';
import { TRANSACTIONS } from '../theme';

export default function EarningsPage() {
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
