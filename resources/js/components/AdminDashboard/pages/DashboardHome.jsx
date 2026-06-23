import { T } from '../../AthleteDashboard/theme';
import { Users, Calendar, DollarSign, ShieldAlert, TrendingUp, Activity } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="g-text">Good morning, <span>Admin</span></div>
          <div className="g-sub">Monday, June 23, 2026 · Platform Overview</div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-label">Total Users</div>
          <div className="stat-card-value">2,847</div>
          <div className="stat-card-sub" style={{color: T.success}}>↑ 12% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Bookings</div>
          <div className="stat-card-value">1,234</div>
          <div className="stat-card-sub" style={{color: T.success}}>↑ 8% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Revenue</div>
          <div className="stat-card-value">₱156K</div>
          <div className="stat-card-sub" style={{color: T.success}}>↑ 22% vs May</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending Verifications</div>
          <div className="stat-card-value" style={{color: T.warning}}>23</div>
          <div className="stat-card-sub">Needs attention</div>
        </div>
      </div>

      <div className="two-col">
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Users by Role */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Users by Role</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {role: 'Athletes', count: 1847, color: T.lime, percent: 65},
                  {role: 'Coaches', count: 723, color: T.success, percent: 25},
                  {role: 'Facility Owners', count: 277, color: T.warning, percent: 10},
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:500}}>{item.role}</span>
                      <span style={{fontSize:13,fontWeight:600,color: item.color}}>{item.count}</span>
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

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {[
                {action: 'New coach registered', user: 'Maria Santos', time: '5 min ago', icon: Users},
                {action: 'Booking confirmed', user: 'John Doe', time: '12 min ago', icon: Calendar},
                {action: 'Facility verified', user: 'Sports Complex', time: '1 hour ago', icon: ShieldAlert},
                {action: 'Payment received', user: '₱2,500', time: '2 hours ago', icon: DollarSign},
              ].map((item, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:36,height:36,borderRadius:8,background: T.navy3,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <item.icon size={16} style={{color: T.lime}} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{item.action}</div>
                    <div style={{fontSize:12,color: T.muted}}>{item.user}</div>
                  </div>
                  <div style={{fontSize:11,color: T.muted}}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Active Facilities */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Active Facilities</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:900,color: T.lime,lineHeight:1}}>
                  156
                </div>
                <div>
                  <div style={{fontSize:11,color: T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em"}}>Total facilities</div>
                  <div style={{fontSize:12,color: T.success,marginTop:2}}>↑ 8 new this month</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
                {[
                  {label: 'Verified', value: 142, color: T.success},
                  {label: 'Pending', value: 14, color: T.warning},
                ].map((item, i) => (
                  <div key={i} style={{background: T.navy3,padding:12,borderRadius:8}}>
                    <div style={{fontSize:11,color: T.muted,marginBottom:4}}>{item.label}</div>
                    <div style={{fontSize:20,fontWeight:700,color: item.color}}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Actions</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button className="btn-lime" style={{justifyContent:"center"}}>
                  <ShieldAlert size={16} />
                  Review Pending Verifications
                </button>
                <button className="btn-ghost" style={{justifyContent:"center"}}>
                  <Users size={16} />
                  Manage Users
                </button>
                <button className="btn-ghost" style={{justifyContent:"center"}}>
                  <DollarSign size={16} />
                  View Revenue Reports
                </button>
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Platform Health</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {label: 'System Status', value: 'Operational', color: T.success},
                  {label: 'API Response', value: '45ms', color: T.lime},
                  {label: 'Uptime (30d)', value: '99.9%', color: T.success},
                  {label: 'Active Sessions', value: '342', color: T.warning},
                ].map((item, i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color: T.muted}}>{item.label}</span>
                    <span style={{fontSize:12,fontWeight:600,color: item.color}}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
