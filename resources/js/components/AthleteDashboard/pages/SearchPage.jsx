import React, { useState } from "react";
import { T } from "../theme";
import { Search, MapPin, SlidersHorizontal, Map, Grid, Filter, Shield } from "lucide-react";
import { FACILITIES, SPORTS, SLOTS, TAKEN_SLOTS } from "../data";
import FacilityRow from "../components/FacilityRow";

export default function SearchPage() {
  const [activeSport, setActiveSport] = useState("All");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedFac, setSelectedFac] = useState(null);

  const filtered = activeSport === "All"
    ? FACILITIES
    : FACILITIES.filter(f => activeSport.includes(f.sport));

  return (
    <>
      <div className="greeting-bar">
        <div className="greeting-text">Find a <span>Court</span></div>
      </div>

      {/* Search bar */}
      <div className="search-panel" style={{ marginBottom: 16 }}>
        <div className="search-field-d">
          <div className="sfl">Sport</div>
          <input className="sfi" placeholder="Basketball, Tennis…" />
        </div>
        <div className="search-field-d">
          <div className="sfl">Location / Radius</div>
          <input className="sfi" placeholder="Davao City · 20 km" />
        </div>
        <div className="search-field-d">
          <div className="sfl">Date</div>
          <input className="sfi" type="date" style={{ colorScheme: "dark" }} />
        </div>
        <button className="search-go">Search</button>
      </div>

      {/* Sport pills */}
      <div className="pills">
        {SPORTS.map(s => (
          <button key={s} className={`pill${activeSport === s ? " active" : ""}`} onClick={() => setActiveSport(s)}>{s}</button>
        ))}
      </div>

      <div className="two-col search-layout">
        {/* Results */}
        <div className="card search-results-card">
          <div className="card-header">
            <div className="card-title">Results — {filtered.length} facilities</div>
            <span className="card-link">Sort: Nearest ▾</span>
          </div>
          <div className="card-body">
            {/* Map */}
            <div className="map-box" style={{ height: 200, marginBottom: 20 }}>
              <iframe className="map-iframe" src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedFac ? selectedFac.city : "Philippines")}&t=&z=${selectedFac ? 13 : 5}&ie=UTF8&iwloc=&output=embed`} />
              <div className="map-grid-lines" />
              {filtered.map((f, i) => (
                <span key={f.id} className="map-pin"
                  style={{ top: `${25 + i * 18}%`, left: `${30 + i * 14}%`, fontSize: selectedFac?.id === f.id ? 28 : 22, zIndex: 10, cursor: "pointer" }}
                  onClick={() => setSelectedFac(f)}><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /></span>
              ))}
              <span className="map-label" style={{ zIndex: 10 }}>Google Maps · {filtered.length} pins</span>
            </div>
            <div className="search-results-list">
              {filtered.map(f => (
                <FacilityRow key={f.id} f={f} onBook={() => setSelectedFac(f)} />
              ))}
            </div>
          </div>
        </div>

        {/* Slot picker */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              {selectedFac ? `${selectedFac.emoji} ${selectedFac.name.split("—")[0].trim()}` : "Select a facility"}
            </div>
          </div>
          <div className="card-body">
            {!selectedFac ? (
              <p style={{ color: T.muted, fontSize: 14, textAlign: "center", padding: "32px 0" }}>
                Tap a facility to see available slots
              </p>
            ) : (
              <>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: T.muted, marginBottom: 4 }}><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /> {selectedFac.city}</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>₱{selectedFac.price} <span style={{ fontSize: 12, fontWeight: 400, color: T.muted }}>/hr</span></div>
                  <div style={{ fontSize: 12, color: T.lime, marginTop: 4 }}>★ {selectedFac.rating} · {selectedFac.reviews} reviews</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Available slots · Today
                </div>
                <div className="slot-grid" style={{ marginBottom: 20 }}>
                  {SLOTS.map(s => (
                    <button
                      key={s}
                      className={`slot-btn${TAKEN_SLOTS.includes(s) ? " taken" : ""}${selectedSlot === s ? " selected" : ""}`}
                      disabled={TAKEN_SLOTS.includes(s)}
                      onClick={() => setSelectedSlot(s)}
                    >{s}</button>
                  ))}
                </div>
                {selectedSlot && (
                  <div style={{ background: "rgba(202,255,0,0.07)", border: "1px solid rgba(202,255,0,0.2)", borderRadius: 8, padding: 14, marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>Booking summary</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedFac.name}</div>
                    <div style={{ fontSize: 13, color: T.muted, margin: "4px 0" }}>Today · {selectedSlot} (1 hr)</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13 }}>
                      <span style={{ color: T.muted }}>Subtotal</span><span>₱{selectedFac.price}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: T.muted }}>Platform fee (10%)</span><span>₱{Math.round(selectedFac.price * 0.1)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginTop: 6, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 6 }}>
                      <span>Total</span><span style={{ color: T.lime }}>₱{selectedFac.price + Math.round(selectedFac.price * 0.1)}</span>
                    </div>
                  </div>
                )}
                <button className="book-btn" disabled={!selectedSlot} style={{ opacity: selectedSlot ? 1 : 0.4 }}>
                  {selectedSlot ? `Pay ₱${selectedFac.price + Math.round(selectedFac.price * 0.1)} via GCash →` : "Select a slot to continue"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
