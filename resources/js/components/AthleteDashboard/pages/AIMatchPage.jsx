import React, { useState } from "react";
import { T } from "../theme";
import { BrainCircuit, Star, Trophy, Users, Bot, Target, Feather } from "lucide-react";
import { AI_COACHES } from "../data";

export default function AIMatchPage() {
  return (
    <>
      <div className="greeting-bar">
        <div>
          <div className="greeting-text"><Bot size={24} style={{ display: "inline", marginBottom: -4 }} /> AI <span>Coach Match</span></div>
          <div className="greeting-sub">Matched using Ollama llama3.2 + nomic-embed-text · Local AI, your data stays private</div>
        </div>
      </div>

      {/* Preference panel */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header"><div className="card-title">Your preferences</div></div>
        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Primary sport", val: "Basketball" },
            { label: "Skill level", val: "Intermediate" },
            { label: "Goal", val: "Improve shooting" },
          ].map(p => (
            <div key={p.label}>
              <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{p.label}</div>
              <div style={{ background: T.navy3, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "9px 12px", fontSize: 13, color: T.white }}>{p.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
          Top matches for you
        </div>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        <span style={{ fontSize: 12, color: T.lime }}>Ranked by cosine similarity</span>
      </div>

      <div className="three-col">
        {AI_COACHES.map((c, i) => (
          <div key={c.id} className="ai-match-card">
            <div className="match-header">
              <div className="coach-av" style={{ background: c.color, color: c.textColor }}>{c.initials}</div>
              <div>
                <div className="match-name">{c.name}</div>
                <div className="match-sport">{c.sport}</div>
              </div>
              <div className="match-score">{Math.round(c.score * 100)}%<br /><small>match</small></div>
            </div>
            <p className="match-reason">{c.reason}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="match-rate">₱{c.rate} <span>/ hr</span></span>
              <span style={{ fontSize: 11, color: T.muted }}>#{i + 1} rank</span>
            </div>
            <button className="book-btn">Book session →</button>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div style={{ marginTop: 24, background: T.cardBg, border: "1px solid rgba(202,255,0,0.08)", borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontSize: 12, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 10 }}>How matching works</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { icon: <Bot size={20} />, label: "Embeddings", desc: "Your goals & sport are converted to a 768-dim vector using nomic-embed-text." },
            { icon: <Target size={20} />, label: "Cosine similarity", desc: "Your vector is compared against all verified coach bio vectors in the database." },
            { icon: <Feather size={20} />, label: "LLM explanation", desc: "llama3.2 generates a personalized reason why each coach is a good fit for you." },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 36, height: 36, background: "rgba(202,255,0,0.08)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

