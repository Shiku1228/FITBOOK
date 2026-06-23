import { T } from '../../AthleteDashboard/theme';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export default function RevenueReports() {
  const monthlyData = [
    { month: 'Jan', total: 85000, platform: 8500 },
    { month: 'Feb', total: 92000, platform: 9200 },
    { month: 'Mar', total: 105000, platform: 10500 },
    { month: 'Apr', total: 118000, platform: 11800 },
    { month: 'May', total: 128000, platform: 12800 },
    { month: 'Jun', total: 156000, platform: 15600 },
  ];

  const maxTotal = Math.max(...monthlyData.map(m => m.total));

  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="g-text">Revenue Reports</div>
          <div className="g-sub">Platform earnings and transaction analytics</div>
        </div>
        <button className="btn-lime">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Revenue Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-label">Total Revenue (Jun)</div>
          <div className="stat-card-value">₱156K</div>
          <div className="stat-card-sub" style={{color: T.success}}>↑ 22% vs May</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Platform Fee (10%)</div>
          <div className="stat-card-value">₱15.6K</div>
          <div className="stat-card-sub" style={{color: T.success}}>↑ 22% vs May</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Payouts</div>
          <div className="stat-card-value">₱140.4K</div>
          <div className="stat-card-sub">To coaches & facilities</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">YTD Revenue</div>
          <div className="stat-card-value">₱684K</div>
          <div className="stat-card-sub">Jan - Jun 2026</div>
        </div>
      </div>

      <div className="two-col">
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Revenue Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Monthly Revenue — 2026</div>
              <span className="card-link">View details →</span>
            </div>
            <div className="card-body">
              <div style={{display:"flex",gap:20,marginBottom:16}}>
                <div>
                  <div style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>Total Revenue (Jun)</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:T.lime,marginTop:4}}>₱156,000</div>
                </div>
                <div style={{borderLeft:"1px solid rgba(255,255,255,0.08)",paddingLeft:20}}>
                  <div style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>Platform Fee (10%)</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:T.success,marginTop:4}}>₱15,600</div>
                </div>
              </div>
              <div className="bar-chart">
                {monthlyData.map(m=>(
                  <div key={m.month} className="bar-col">
                    <div className="bar-val">₱{(m.total/1000).toFixed(0)}k</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{
                        height:`${(m.total/maxTotal)*100}%`,
                        background:m.month==="Jun"?`linear-gradient(to top,${T.lime2},${T.lime})`:"rgba(202,255,0,0.18)"
                      }}/>
                    </div>
                    <div className="bar-month">{m.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Revenue Breakdown (June)</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {label: 'Coach Bookings', amount: 98000, percent: 63, color: T.lime},
                  {label: 'Facility Rentals', amount: 48000, percent: 31, color: T.success},
                  {label: 'Other Fees', amount: 10000, percent: 6, color: T.warning},
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:500}}>{item.label}</span>
                      <span style={{fontSize:13,fontWeight:600,color: item.color}}>₱{item.amount.toLocaleString()}</span>
                    </div>
                    <div style={{height:8,background: T.navy3,borderRadius:4,overflow:"hidden"}}>
                      <div style={{
                        height:"100%",
                        background: item.color,
                        width: `${item.percent}%`,
                        borderRadius:4,
                        transition:"width 0.3s"
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Top Earners */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Top Earners (June)</div>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {[
                {name: 'Coach Ramon', earnings: 28500, bookings: 42},
                {name: 'Coach Maria', earnings: 22100, bookings: 38},
                {name: 'Coach Carlos', earnings: 19800, bookings: 35},
                {name: 'Sports Complex PH', earnings: 15600, bookings: 28},
                {name: 'Makati Gym', earnings: 12400, bookings: 22},
              ].map((item, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(202,255,0,0.15)",color:T.lime,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    #{i+1}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{item.name}</div>
                    <div style={{fontSize:11,color:T.muted}}>{item.bookings} bookings</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:T.lime}}>₱{item.earnings.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Fee Summary */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Platform Fee Summary</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{background: T.navy3,padding:16,borderRadius:8}}>
                  <div style={{fontSize:11,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>This Month</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,color:T.success,lineHeight:1}}>
                    ₱15,600
                  </div>
                  <div style={{fontSize:12,color:T.muted,marginTop:4}}>10% of ₱156,000 total</div>
                </div>
                
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
                  <div style={{background: T.navy3,padding:12,borderRadius:8}}>
                    <div style={{fontSize:11,color:T.muted,marginBottom:4}}>YTD Total</div>
                    <div style={{fontSize:18,fontWeight:700,color:T.lime}}>₱68.4K</div>
                  </div>
                  <div style={{background: T.navy3,padding:12,borderRadius:8}}>
                    <div style={{fontSize:11,color:T.muted,marginBottom:4}}>Avg/Month</div>
                    <div style={{fontSize:18,fontWeight:700,color:T.lime}}>₱11.4K</div>
                  </div>
                </div>

                <div style={{fontSize:12,color:T.muted,lineHeight:1.6,marginTop:8}}>
                  Platform fees are automatically deducted from each transaction and credited to the FitBook account.
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Transactions</div>
              <span className="card-link">View all →</span>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {[
                {user: 'John Doe', amount: 2500, fee: 250, time: '2 min ago'},
                {user: 'Anna Lee', amount: 1800, fee: 180, time: '15 min ago'},
                {user: 'Mike Chen', amount: 3200, fee: 320, time: '1 hour ago'},
              ].map((item, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:36,height:36,borderRadius:8,background:"rgba(202,255,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <DollarSign size={16} style={{color:T.lime}} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{item.user}</div>
                    <div style={{fontSize:11,color:T.muted}}>{item.time}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13,fontWeight:600}}>₱{item.amount.toLocaleString()}</div>
                    <div style={{fontSize:11,color:T.success}}>+₱{item.fee}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
