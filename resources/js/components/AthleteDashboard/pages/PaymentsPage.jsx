import React, { useState } from "react";
import { T } from "../theme";
import { CreditCard, Wallet, Download, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export default function PaymentsPage() {
  const [tab, setTab] = useState("all");

  const payments = [
    { id: 1, type: "booking", description: "PhilSports Arena — Court A", date: "Jun 20, 2026", amount: 385, status: "completed", method: "GCash" },
    { id: 2, type: "booking", description: "Coach Maria Aquino session", date: "Jun 18, 2026", amount: 715, status: "completed", method: "GCash" },
    { id: 3, type: "booking", description: "Davao Racket Club", date: "Jun 15, 2026", amount: 495, status: "completed", method: "GCash" },
    { id: 4, type: "refund", description: "Refund — Cebu Sports Complex", date: "Jun 12, 2026", amount: -220, status: "completed", method: "GCash" },
    { id: 5, type: "booking", description: "PhilSports Arena — Court B", date: "Jun 10, 2026", amount: 385, status: "pending", method: "GCash" },
  ];

  const filtered = tab === "all" ? payments : payments.filter(p => p.status === tab);

  return (
    <>
      <div className="greeting-bar">
        <div>
          <div className="greeting-text"><CreditCard size={24} style={{ display: "inline", marginBottom: -4 }} /> <span>Payments</span></div>
          <div className="greeting-sub">Manage your payment methods and transaction history</div>
        </div>
        <button className="book-btn" style={{ width: "auto", padding: "10px 22px", fontSize: 14 }}>
          <Download size={14} style={{ display: "inline", marginBottom: -2 }} /> Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-label">Total Spent</div>
          <div className="stat-card-value">₱4,850</div>
          <div className="stat-card-sub">June 2026</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending</div>
          <div className="stat-card-value">₱385</div>
          <div className="stat-card-sub">1 transaction</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed</div>
          <div className="stat-card-value">4</div>
          <div className="stat-card-sub">Transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Payment Method</div>
          <div className="stat-card-value" style={{ fontSize: 24 }}>GCash</div>
          <div className="stat-card-sub">Primary</div>
        </div>
      </div>

      <div className="two-col">
        {/* Payment Methods */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Payment Methods</div>
            <span className="card-link">+ Add New</span>
          </div>
          <div className="card-body">
            <div style={{ background: "rgba(202,255,0,0.08)", border: "1px solid rgba(202,255,0,0.2)", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, background: "#007bff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wallet size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>GCash</div>
                  <div style={{ fontSize: 12, color: T.muted }}>•••• 1234</div>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 11, color: T.lime, background: "rgba(202,255,0,0.15)", padding: "3px 8px", borderRadius: 100, fontWeight: 600 }}>Primary</span>
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>Expires: Never</div>
            </div>
            <div style={{ background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 16, opacity: 0.6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, background: "#6B7280", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CreditCard size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Credit Card</div>
                  <div style={{ fontSize: 12, color: T.muted }}>Not connected</div>
                </div>
              </div>
              <button style={{ fontSize: 12, color: T.lime, background: "transparent", border: "1px solid rgba(202,255,0,0.3)", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                Connect Card
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Transaction History</div>
          </div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            <div className="tabs" style={{ border: "none", margin: "0 0 16px 0" }}>
              {["all", "completed", "pending"].map(t => (
                <button key={t} className={`tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}
                  style={{ textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
            {filtered.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: p.type === "refund" ? "rgba(0,196,140,0.1)" : "rgba(202,255,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.type === "refund" ? <CheckCircle size={18} color={T.success} /> : <CreditCard size={18} color={T.lime} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.description}</div>
                  <div style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={10} style={{ display: "inline", marginBottom: -1 }} /> {p.date} · {p.method}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: p.amount < 0 ? T.success : T.white }}>
                    {p.amount < 0 ? "+" : ""}₱{Math.abs(p.amount)}
                  </div>
                  <div style={{ fontSize: 10, color: p.status === "completed" ? T.success : T.lime, fontWeight: 600, textTransform: "capitalize" }}>
                    {p.status === "completed" ? <CheckCircle size={10} style={{ display: "inline", marginBottom: -1 }} /> : <AlertCircle size={10} style={{ display: "inline", marginBottom: -1 }} />} {p.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
