import { T } from '../../AthleteDashboard/theme';
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, Filter } from 'lucide-react';

export default function BookingReports() {
  const bookingStats = [
    { label: 'Total Bookings', value: 1234, change: '+8%', color: T.success },
    { label: 'Confirmed', value: 987, change: '+12%', color: T.lime },
    { label: 'Pending', value: 156, change: '-5%', color: T.warning },
    { label: 'Cancelled', value: 91, change: '+3%', color: T.danger },
  ];

  const recentBookings = [
    { id: 1, user: 'John Doe', coach: 'Coach Ramon', sport: 'Basketball', date: 'Jun 23, 2026', time: '2:00 PM', status: 'confirmed', amount: 2500 },
    { id: 2, user: 'Anna Lee', coach: 'Coach Maria', sport: 'Tennis', date: 'Jun 23, 2026', time: '4:00 PM', status: 'pending', amount: 1800 },
    { id: 3, user: 'Mike Chen', coach: 'Coach Carlos', sport: 'Basketball', date: 'Jun 22, 2026', time: '10:00 AM', status: 'confirmed', amount: 2200 },
    { id: 4, user: 'Sarah Kim', coach: 'Coach Ana', sport: 'Swimming', date: 'Jun 22, 2026', time: '3:00 PM', status: 'cancelled', amount: 1500 },
    { id: 5, user: 'Tom Wilson', coach: 'Coach Ramon', sport: 'Basketball', date: 'Jun 21, 2026', time: '5:00 PM', status: 'confirmed', amount: 2800 },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'badge-confirmed',
      pending: 'badge-pending',
      cancelled: 'badge-cancelled',
    };
    const icons = {
      confirmed: <CheckCircle size={12} style={{marginRight: 4}} />,
      pending: <Clock size={12} style={{marginRight: 4}} />,
      cancelled: <XCircle size={12} style={{marginRight: 4}} />,
    };
    return (
      <span className={`badge ${styles[status]}`} style={{display: 'flex', alignItems: 'center'}}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="g-text">Booking Reports</div>
          <div className="g-sub">Track booking activity, cancellations, and platform trends</div>
        </div>
        <button className="btn-lime">
          <Filter size={16} />
          Export Data
        </button>
      </div>

      {/* Booking Stats */}
      <div className="stats-row">
        {bookingStats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-value" style={{color: stat.color}}>{stat.value}</div>
            <div className="stat-card-sub" style={{color: stat.color === T.danger ? T.danger : T.success}}>
              {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Recent Bookings */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Bookings</div>
              <span className="card-link">View all →</span>
            </div>
            <div className="card-body" style={{padding: 0}}>
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                      <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>User</th>
                      <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Coach</th>
                      <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Sport</th>
                      <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Date & Time</th>
                      <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Status</th>
                      <th style={{textAlign: 'right', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id} style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                        <td style={{padding: '14px 20px', fontSize: 13, fontWeight: 600}}>{booking.user}</td>
                        <td style={{padding: '14px 20px', fontSize: 13}}>{booking.coach}</td>
                        <td style={{padding: '14px 20px', fontSize: 13}}>{booking.sport}</td>
                        <td style={{padding: '14px 20px', fontSize: 13, color: T.muted}}>
                          <div>{booking.date}</div>
                          <div style={{fontSize: 11}}>{booking.time}</div>
                        </td>
                        <td style={{padding: '14px 20px'}}>
                          {getStatusBadge(booking.status)}
                        </td>
                        <td style={{padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: T.lime}}>
                          ₱{booking.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cancellation Analysis */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Cancellation Analysis</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {reason: 'User cancelled', count: 45, percent: 49, color: T.warning},
                  {reason: 'Coach unavailable', count: 28, percent: 31, color: T.danger},
                  {reason: 'Facility issue', count: 12, percent: 13, color: T.lime},
                  {reason: 'Other', count: 6, percent: 7, color: T.muted},
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:500}}>{item.reason}</span>
                      <span style={{fontSize:13,fontWeight:600,color: item.color}}>{item.count} ({item.percent}%)</span>
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

          {/* Booking Trends */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Booking Trends</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:8,background:"rgba(0,196,140,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <TrendingUp size={20} style={{color:T.success}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,color:T.muted}}>Weekly bookings</div>
                    <div style={{fontSize:18,fontWeight:700,color:T.success}}>+12%</div>
                  </div>
                </div>
                
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:8,background:"rgba(202,255,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Calendar size={20} style={{color:T.lime}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,color:T.muted}}>Avg. lead time</div>
                    <div style={{fontSize:18,fontWeight:700,color:T.lime}}>3.2 days</div>
                  </div>
                </div>

                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:8,background:"rgba(255,181,71,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Clock size={20} style={{color:T.warning}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,color:T.muted}}>Cancellation rate</div>
                    <div style={{fontSize:18,fontWeight:700,color:T.warning}}>7.4%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Sports */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Popular Sports</div>
            </div>
            <div className="card-body" style={{padding:"8px 20px"}}>
              {[
                {sport: 'Basketball', bookings: 523, percent: 42},
                {sport: 'Tennis', bookings: 312, percent: 25},
                {sport: 'Swimming', bookings: 198, percent: 16},
                {sport: 'Badminton', bookings: 145, percent: 12},
                {sport: 'Gym', bookings: 56, percent: 5},
              ].map((item, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{item.sport}</div>
                    <div style={{fontSize:11,color:T.muted}}>{item.bookings} bookings</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:T.lime}}>{item.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Peak Booking Hours</div>
            </div>
            <div className="card-body">
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {time: '4:00 PM - 6:00 PM', bookings: 287, percent: 23},
                  {time: '6:00 PM - 8:00 PM', bookings: 245, percent: 20},
                  {time: '2:00 PM - 4:00 PM', bookings: 198, percent: 16},
                  {time: '8:00 AM - 10:00 AM', bookings: 156, percent: 13},
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:500}}>{item.time}</span>
                      <span style={{fontSize:12,fontWeight:600,color:T.lime}}>{item.bookings}</span>
                    </div>
                    <div style={{height:6,background: T.navy3,borderRadius:3,overflow:"hidden"}}>
                      <div style={{
                        height:"100%",
                        background: T.lime,
                        width: `${item.percent}%`,
                        borderRadius:3
                      }}/>
                    </div>
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
