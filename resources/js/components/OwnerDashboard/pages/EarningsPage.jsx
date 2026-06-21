import React from "react";
import { DollarSign, TrendingUp, Users, Star } from "lucide-react";
import { T } from "../../AthleteDashboard/theme";
import StatCard from "../../Shared/StatCard";

const TRANSACTIONS = [
  { ref:"FB-2026-00041", athlete:"Renz Latangga",   facility:"Court A",     date:"Jun 18", gross:700,  fee:70,  net:630,  status:"paid" },
  { ref:"FB-2026-00039", athlete:"Ana Reyes",       facility:"Pool Lane 3", date:"Jun 15", gross:200, fee:20, net:180, status:"paid" },
  { ref:"FB-2026-00035", athlete:"Mark Tobias",     facility:"Court B",     date:"Jun 12", gross:900, fee:90, net:810, status:"paid" },
  { ref:"FB-2026-00031", athlete:"Lia Santos",      facility:"Court A",     date:"Jun 10", gross:700, fee:70, net:630, status:"paid" },
  { ref:"FB-2026-00028", athlete:"Josh Perez",      facility:"Court A",     date:"Jun 7",  gross:350, fee:35, net:315, status:"refunded" },
];

export default function EarningsPage() {
  return (
    <>
      <div className="greeting">
        <div className="g-text">Earnings & <span>Payouts</span></div>
        <button className="btn-lime">Request payout</button>
      </div>

      {/* Payout banner */}
      <div className="payout-banner">
        <div>
          <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600, marginBottom:8 }}>Available for payout</div>
          <div className="payout-amount">₱15,525</div>
          <div className="payout-label">After 10% platform fee · Via GCash / PayMongo</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16, minWidth:200 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
            <span style={{ color:T.muted }}>Gross revenue</span><span style={{ fontWeight:600 }}>₱17,250</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
            <span style={{ color:T.muted }}>Platform fee (10%)</span><span style={{ fontWeight:600, color:T.muted }}>−₱1,725</span>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:12, display:"flex", justifyContent:"space-between", fontSize:15, fontWeight:700 }}>
            <span>Net</span><span style={{ color:T.lime }}>₱15,525</span>
          </div>
          <button className="btn-lime" style={{ justifyContent:"center" }}>Withdraw to GCash →</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-row" style={{ marginBottom:20 }}>
        <StatCard label="YTD gross" value="₱74,350" />
        <StatCard label="YTD net" value="₱66,915" />
        <StatCard label="Total bookings" value="142" />
        <StatCard label="Avg. booking value" value="₱524" />
      </div>

      {/* Transactions table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Transaction history</div>
          <span className="card-link">Export CSV →</span>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Booking ref</th>
                <th>Athlete</th>
                <th>Facility</th>
                <th>Date</th>
                <th>Gross</th>
                <th>Fee</th>
                <th>Net</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(t => (
                <tr key={t.ref}>
                  <td style={{ fontFamily:"monospace", fontSize:12, color:T.lime }}>{t.ref}</td>
                  <td>{t.athlete}</td>
                  <td style={{ color:T.muted }}>{t.facility}</td>
                  <td style={{ color:T.muted }}>{t.date}</td>
                  <td style={{ fontWeight:600 }}>₱{t.gross}</td>
                  <td style={{ color:T.muted }}>₱{t.fee}</td>
                  <td style={{ fontWeight:700, color:T.lime }}>₱{t.net}</td>
                  <td>
                    <span className={`badge ${t.status === "paid" ? "badge-confirmed" : "badge-cancelled"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
