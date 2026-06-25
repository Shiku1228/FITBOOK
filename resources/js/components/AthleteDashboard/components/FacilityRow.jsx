import React from "react";
import { MapPin, CircleDot, Waves, Target, Star, ChevronRight } from "lucide-react";

const iconMap = {
  CircleDot,
  Waves,
  Target,
};

export default function FacilityRow({ f, onBook }) {
  const IconComponent = iconMap[f.icon] || CircleDot;

  return (
    <button type="button" className="facility-card" onClick={() => onBook(f)}>
      <div className="facility-card-media" style={{ background: f.bg }}>
        <div className="facility-card-icon">
          <IconComponent size={28} style={{ color: "white" }} />
        </div>
        <div className="facility-card-price">
          ₱{f.price}
          <span>/hr</span>
        </div>
      </div>

      <div className="facility-card-body">
        <div className="facility-card-top">
          <div className="facility-card-copy">
            <div className="facility-card-name">{f.name}</div>
            <div className="facility-card-location">
              <MapPin size={14} style={{ display: "inline", marginBottom: -2 }} /> {f.city}
            </div>
          </div>

          <div className="facility-card-rating">
            <Star size={12} style={{ display: "inline", marginRight: 4, marginBottom: -1 }} />
            {f.rating}
          </div>
        </div>

        <div className="facility-card-meta">
          <span className="facility-card-chip">{f.sport}</span>
          <span className="facility-card-chip facility-card-chip-soft">{f.slots} slots open</span>
        </div>

        <div className="facility-card-footer">
          <span className="facility-card-link">View slots</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </button>
  );
}
