import React from "react";
import { T } from "../theme";
import { MapPin, Star, Shield, CreditCard, ChevronRight } from "lucide-react";

export default function FacilityRow({ f, onBook }) {
  return (
    <div className="facility-result" onClick={() => onBook(f)}>
      <div className="fac-thumb" style={{ background: f.bg }}>
        {f.emoji}
      </div>
      <div className="fac-info">
        <div className="fac-name">{f.name}</div>
        <div className="fac-loc"><MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /> {f.city}</div>
        <div className="fac-meta">
          <span className="fac-sport-tag">{f.sport}</span>
          <span className="fac-price">₱{f.price} <span>/ hr</span></span>
          <span className="available-badge">{f.slots} slots open</span>
          <span className="fac-rating">★ {f.rating}</span>
        </div>
      </div>
    </div>
  );
}


