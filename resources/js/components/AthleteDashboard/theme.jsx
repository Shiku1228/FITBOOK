export const T = {
  navy: "#0A1628",
  navy2: "#122040",
  navy3: "#1E3059",
  lime: "#CAFF00",
  lime2: "#AEDD00",
  white: "#FFFFFF",
  offwhite: "#F4F6FA",
  muted: "#8A97AE",
  cardBg: "#111E35",
  danger: "#FF4D4D",
  success: "#00C48C",
};

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.navy}; color: ${T.white}; font-family: 'Inter', sans-serif; }

  .dash-root {
    display: flex;
    min-height: 100vh;
    background: ${T.navy};
    font-family: 'Inter', sans-serif;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px;
    flex-shrink: 0;
    background: ${T.navy2};
    border-right: 1px solid rgba(202,255,0,0.07);
    display: flex;
    flex-direction: column;
    padding: 0 0 24px;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 50;
  }
  .sidebar-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 16px 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    height: 56px;
    display: flex;
    align-items: center;
  }
  .sidebar-logo span { color: ${T.lime}; }
  .sidebar-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${T.muted};
    padding: 20px 20px 8px;
  }
  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${T.muted};
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    background: transparent;
    text-align: left;
    width: 100%;
    text-decoration: none;
  }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: ${T.white}; }
  .nav-item.active { background: rgba(202,255,0,0.1); color: ${T.lime}; }
  .nav-item .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto;
    background: ${T.lime};
    color: ${T.navy};
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 100px;
  }
  .sidebar-avatar {
    margin-top: auto;
    padding: 16px 16px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .avatar-circle {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(202,255,0,0.15);
    color: ${T.lime};
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .avatar-name { font-size: 13px; font-weight: 600; }
  .avatar-role { font-size: 11px; color: ${T.muted}; }

  /* ── MAIN ── */
  .main {
    margin-left: 240px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── TOPBAR ── */
  .topbar {
    height: 56px;
    background: rgba(10,22,40,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(202,255,0,0.07);
    display: flex;
    align-items: center;
    padding: 0 28px;
    gap: 16px;
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .topbar-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .topbar-search {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${T.navy3};
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 7px 14px;
    width: 240px;
  }
  .topbar-search input {
    background: transparent;
    border: none;
    outline: none;
    color: ${T.white};
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    width: 100%;
  }
  .topbar-search input::placeholder { color: ${T.muted}; }
  .topbar-icon-btn {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: ${T.navy3};
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: ${T.muted};
    transition: all 0.15s;
    position: relative;
  }
  .topbar-icon-btn:hover { color: ${T.white}; border-color: rgba(255,255,255,0.2); }
  .notif-dot {
    position: absolute;
    top: 6px; right: 6px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${T.lime};
  }

  /* ── PAGE CONTENT ── */
  .page-content { padding: 28px; flex: 1; }

  /* ── GREETING ── */
  .greeting-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .greeting-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 32px;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
  }
  .greeting-text span { color: ${T.lime}; }
  .greeting-sub { font-size: 14px; color: ${T.muted}; margin-top: 4px; }

  /* ── STAT CARDS ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: ${T.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 18px 20px;
  }
  .stat-card-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${T.muted}; margin-bottom: 10px; }
  .stat-card-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 34px;
    font-weight: 900;
    line-height: 1;
    color: ${T.lime};
  }
  .stat-card-sub { font-size: 12px; color: ${T.muted}; margin-top: 6px; }

  /* ── TWO-COL LAYOUT ── */
  .two-col { display: grid; grid-template-columns: 1fr 380px; gap: 20px; margin-bottom: 20px; }
  .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  /* ── CARD SHELL ── */
  .card {
    background: ${T.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .card-link { font-size: 12px; color: ${T.lime}; cursor: pointer; font-weight: 500; }
  .card-body { padding: 20px; }

  /* ── SEARCH PANEL ── */
  .search-panel {
    background: ${T.navy3};
    border: 1.5px solid rgba(202,255,0,0.15);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .search-field-d {
    flex: 1;
    padding: 12px 16px;
    border-right: 1px solid rgba(255,255,255,0.07);
  }
  .search-field-d:last-of-type { border-right: none; }
  .sfl { font-size: 10px; font-weight: 600; color: ${T.lime}; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
  .sfi {
    background: transparent;
    border: none;
    outline: none;
    color: ${T.white};
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    width: 100%;
  }
  .sfi::placeholder { color: ${T.muted}; }
  .search-go {
    background: ${T.lime};
    border: none;
    padding: 0 20px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: ${T.navy};
    transition: background 0.15s;
    flex-shrink: 0;
  }
  .search-go:hover { background: ${T.lime2}; }

  /* ── SPORT PILLS ── */
  .pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 13px;
    font-weight: 500;
    color: ${T.muted};
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
  }
  .pill:hover, .pill.active {
    background: rgba(202,255,0,0.1);
    border-color: rgba(202,255,0,0.3);
    color: ${T.lime};
  }

  /* ── FACILITY RESULT ── */
  .facility-result {
    display: flex;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: all 0.15s;
    border-radius: 8px;
  }
  .facility-result:last-child { border-bottom: none; }
  .facility-result:hover { background: rgba(255,255,255,0.03); padding-left: 8px; }
  .fac-thumb {
    width: 72px; height: 60px;
    border-radius: 8px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  .fac-info { flex: 1; min-width: 0; }
  .fac-name { font-size: 14px; font-weight: 600; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fac-loc { font-size: 12px; color: ${T.muted}; margin-bottom: 6px; }
  .fac-meta { display: flex; gap: 10px; align-items: center; }
  .fac-sport-tag {
    font-size: 11px;
    font-weight: 500;
    color: ${T.lime};
    background: rgba(202,255,0,0.08);
    padding: 2px 8px;
    border-radius: 4px;
  }
  .fac-price { font-size: 13px; font-weight: 600; }
  .fac-price span { font-size: 11px; font-weight: 400; color: ${T.muted}; }
  .fac-rating { font-size: 12px; color: ${T.lime}; margin-left: auto; font-weight: 500; }
  .available-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${T.success};
    background: rgba(0,196,140,0.1);
    padding: 2px 8px;
    border-radius: 4px;
  }

  /* ── BOOKINGS LIST ── */
  .booking-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .booking-item:last-child { border-bottom: none; }
  .booking-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(202,255,0,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .booking-info { flex: 1; min-width: 0; }
  .booking-name { font-size: 13px; font-weight: 600; }
  .booking-date { font-size: 12px; color: ${T.muted}; }
  .status-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    flex-shrink: 0;
  }
  .status-confirmed { background: rgba(0,196,140,0.12); color: ${T.success}; }
  .status-pending   { background: rgba(202,255,0,0.1); color: ${T.lime}; }
  .status-cancelled { background: rgba(255,77,77,0.1); color: ${T.danger}; }

  /* ── AI MATCH CARD ── */
  .ai-match-card {
    background: ${T.navy3};
    border: 1px solid rgba(202,255,0,0.12);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.15s, transform 0.15s;
  }
  .ai-match-card:hover { border-color: rgba(202,255,0,0.3); transform: translateY(-2px); }
  .coach-av {
    width: 44px; height: 44px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 18px;
    flex-shrink: 0;
  }
  .match-header { display: flex; gap: 10px; align-items: center; }
  .match-name { font-size: 14px; font-weight: 600; }
  .match-sport { font-size: 12px; color: ${T.lime}; }
  .match-score {
    margin-left: auto;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: ${T.lime};
    line-height: 1;
  }
  .match-score small { font-family: 'Inter', sans-serif; font-size: 10px; color: ${T.muted}; font-weight: 400; }
  .match-reason { font-size: 12px; color: ${T.muted}; line-height: 1.5; }
  .match-rate { font-size: 13px; font-weight: 600; }
  .match-rate span { font-size: 11px; color: ${T.muted}; font-weight: 400; }
  .book-btn {
    background: ${T.lime};
    color: ${T.navy};
    border: none;
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
    width: 100%;
  }
  .book-btn:hover { background: ${T.lime2}; }

  /* ── SLOT PICKER ── */
  .slot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .slot-btn {
    padding: 8px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: ${T.white};
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }
  .slot-btn:hover, .slot-btn.selected {
    background: rgba(202,255,0,0.12);
    border-color: rgba(202,255,0,0.4);
    color: ${T.lime};
  }
  .slot-btn.taken {
    opacity: 0.35;
    cursor: not-allowed;
    text-decoration: line-through;
  }

  /* ── MAP PLACEHOLDER ── */
  .map-box {
    background: ${T.navy3};
    border-radius: 10px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(202,255,0,0.08);
    position: relative;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .map-iframe {
    position: absolute;
    top: -50px; left: -50px; right: -50px; bottom: -50px;
    width: calc(100% + 100px); height: calc(100% + 100px);
    border: 0;
    pointer-events: none;
    opacity: 0.6;
    filter: invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%);
  }
  .map-grid-lines {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image:
      linear-gradient(rgba(202,255,0,1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(202,255,0,1) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .map-pin {
    position: absolute;
    font-size: 24px;
    filter: drop-shadow(0 0 8px rgba(202,255,0,0.5));
  }
  .map-label {
    position: absolute;
    bottom: 10px; left: 10px;
    font-size: 11px;
    color: ${T.lime};
    font-weight: 600;
    background: rgba(10,22,40,0.8);
    padding: 4px 8px;
    border-radius: 4px;
  }

  /* ── NOTIFICATION PANEL ── */
  .notif-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    align-items: flex-start;
  }
  .notif-item:last-child { border-bottom: none; }
  .notif-dot-icon {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }
  .notif-text { font-size: 13px; line-height: 1.5; }
  .notif-time { font-size: 11px; color: ${T.muted}; margin-top: 2px; }

  /* ── TABS ── */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 16px; }
  .tab {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: ${T.muted};
    cursor: pointer;
    border: none;
    background: transparent;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
    margin-bottom: -1px;
    font-family: 'Inter', sans-serif;
  }
  .tab:hover { color: ${T.white}; }
  .tab.active { color: ${T.lime}; border-bottom-color: ${T.lime}; }

  @media (max-width: 1100px) {
    .two-col { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .sidebar { display: none; }
    .main { margin-left: 0; }
    .three-col { grid-template-columns: 1fr; }
  }
`;

