<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>FitBook — Book Courts. Find Coaches. Play More.</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/landing.jsx'])
    
    <style>
  /* ─── TOKENS ─────────────────────────────────────── */
  :root {
    --navy:    #0A1628;
    --navy2:   #122040;
    --navy3:   #1E3059;
    --lime:    #CAFF00;
    --lime2:   #AEDD00;
    --white:   #FFFFFF;
    --offwhite:#F4F6FA;
    --muted:   #8A97AE;
    --card-bg: #111E35;
    --font-display: 'Barlow Condensed', sans-serif;
    --font-body:    'Inter', sans-serif;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
  }

  /* ─── RESET ──────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    background: var(--navy);
    color: var(--white);
    line-height: 1.6;
    overflow-x: hidden;
  }
  img { display: block; max-width: 100%; }
  a { text-decoration: none; color: inherit; }

  /* ─── COURT-LINE MOTIF ───────────────────────────── */
  .court-line {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--lime);
    opacity: 0.18;
  }
  .court-slash {
    position: absolute;
    width: 3px;
    background: var(--lime);
    opacity: 0.12;
    transform-origin: top center;
  }

  /* ─── TYPOGRAPHY ─────────────────────────────────── */
  .display {
    font-family: var(--font-display);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }
  .display-xl { font-size: clamp(72px, 12vw, 140px); }
  .display-lg { font-size: clamp(40px, 6vw, 72px); }
  .display-md { font-size: clamp(28px, 4vw, 48px); }
  .eyebrow {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--lime);
  }
  .body-lg  { font-size: 18px; line-height: 1.65; }
  .body-md  { font-size: 15px; line-height: 1.7; }
  .body-sm  { font-size: 13px; line-height: 1.6; }
  .muted    { color: var(--muted); }

  /* ─── BUTTONS ────────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease;
    border: none;
    white-space: nowrap;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn-lime {
    background: var(--lime);
    color: var(--navy);
  }
  .btn-lime:hover { background: var(--lime2); }
  .btn-ghost {
    background: transparent;
    color: var(--white);
    border: 1.5px solid rgba(255,255,255,0.25);
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.05); }

  /* ─── NAV ────────────────────────────────────────── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    height: 64px;
    background: rgba(10, 22, 40, 0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(202, 255, 0, 0.08);
  }
  .logo {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .logo span { color: var(--lime); }
  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }
  .nav-links a {
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.15s;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta { display: flex; gap: 12px; align-items: center; }

  /* ─── HERO ───────────────────────────────────────── */
  #hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 5% 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 80% 30%, rgba(202,255,0,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 50% 80% at 10% 80%, rgba(30,48,89,0.8) 0%, transparent 60%);
  }
  /* court arc top-right corner decoration */
  .hero-court {
    position: absolute;
    right: 4%;
    top: 15%;
    width: 420px;
    height: 420px;
    border: 2px solid rgba(202,255,0,0.10);
    border-radius: 50%;
    pointer-events: none;
  }
  .hero-court::after {
    content: '';
    position: absolute;
    top: 40px; left: 40px; right: 40px; bottom: 40px;
    border: 1.5px solid rgba(202,255,0,0.06);
    border-radius: 50%;
  }
  /* 3-point arc line */
  .hero-court-line {
    position: absolute;
    right: 4%;
    top: 36%;
    width: 420px;
    height: 2px;
    background: rgba(202,255,0,0.08);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(202,255,0,0.1);
    border: 1px solid rgba(202,255,0,0.2);
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 28px;
    width: fit-content;
  }
  .hero-tag-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--lime);
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .hero-title {
    max-width: 820px;
    margin-bottom: 28px;
  }
  .hero-title em {
    font-style: normal;
    color: var(--lime);
  }
  .hero-subtitle {
    max-width: 520px;
    margin-bottom: 44px;
    color: var(--muted);
  }
  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }
  .hero-stats {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }
  .stat-item { display: flex; flex-direction: column; gap: 4px; }
  .stat-num {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    color: var(--lime);
  }
  .stat-label { font-size: 13px; color: var(--muted); }

  /* ─── SEARCH BAR ─────────────────────────────────── */
  #search-section {
    background: var(--navy2);
    padding: 0 5%;
  }
  .search-bar {
    background: var(--navy3);
    border: 1.5px solid rgba(202,255,0,0.15);
    border-radius: var(--radius-md);
    display: flex;
    align-items: stretch;
    overflow: hidden;
    transform: translateY(-32px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  .search-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    border-right: 1px solid rgba(255,255,255,0.07);
    min-width: 0;
  }
  .search-field:last-of-type { border-right: none; }
  .search-label { font-size: 11px; font-weight: 600; color: var(--lime); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
  .search-input {
    background: transparent;
    border: none;
    outline: none;
    color: var(--white);
    font-size: 15px;
    font-family: var(--font-body);
    width: 100%;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-btn {
    background: var(--lime);
    border: none;
    padding: 0 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
    transition: background 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .search-btn:hover { background: var(--lime2); }

  /* ─── SPORT PILLS ────────────────────────────────── */
  .sport-pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 32px 0 56px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .pill:hover, .pill.active {
    background: rgba(202,255,0,0.1);
    border-color: rgba(202,255,0,0.3);
    color: var(--lime);
  }
  .pill-icon { font-size: 18px; }

  /* ─── SECTION SHARED ─────────────────────────────── */
  section { padding: 96px 5%; }
  .section-header { margin-bottom: 56px; }
  .section-header .eyebrow { margin-bottom: 16px; }

  /* ─── HOW IT WORKS ───────────────────────────────── */
  #how {
    background: var(--navy2);
    position: relative;
    overflow: hidden;
  }
  #how::before {
    content: '';
    position: absolute;
    left: -100px; top: 50%;
    width: 500px; height: 500px;
    border: 1px solid rgba(202,255,0,0.05);
    border-radius: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2px;
    background: rgba(255,255,255,0.05);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .step-card {
    background: var(--navy2);
    padding: 40px 32px;
    position: relative;
    transition: background 0.2s;
  }
  .step-card:hover { background: var(--navy3); }
  .step-num {
    font-family: var(--font-display);
    font-size: 80px;
    font-weight: 900;
    color: rgba(202,255,0,0.08);
    line-height: 1;
    margin-bottom: 20px;
    display: block;
  }
  .step-icon {
    width: 48px; height: 48px;
    border-radius: var(--radius-sm);
    background: rgba(202,255,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
  }
  .step-title {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 12px;
    line-height: 1.1;
  }

  /* ─── FACILITIES ─────────────────────────────────── */
  #facilities { background: var(--navy); }
  .facility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .facility-card {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.2s, border-color 0.2s;
    cursor: pointer;
  }
  .facility-card:hover {
    transform: translateY(-4px);
    border-color: rgba(202,255,0,0.2);
  }
  .facility-img {
    height: 180px;
    position: relative;
    overflow: hidden;
  }
  /* Court pattern as image replacement */
  .court-pattern {
    width: 100%; height: 100%;
    position: relative;
  }
  .court-pattern svg { width: 100%; height: 100%; }
  .facility-badge {
    position: absolute;
    top: 12px; left: 12px;
    background: var(--lime);
    color: var(--navy);
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .facility-body { padding: 20px; }
  .facility-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .facility-name { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
  .facility-loc { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
  .facility-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .facility-price { font-size: 15px; font-weight: 600; }
  .facility-price span { font-size: 13px; font-weight: 400; color: var(--muted); }
  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 500;
    color: var(--lime);
  }

  /* ─── COACHES ────────────────────────────────────── */
  #coaches { background: var(--navy2); }
  .coaches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  .coach-card {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.2s, border-color 0.2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .coach-card:hover {
    transform: translateY(-4px);
    border-color: rgba(202,255,0,0.2);
  }
  .coach-avatar {
    width: 64px; height: 64px;
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }
  .coach-name { font-size: 18px; font-weight: 600; }
  .coach-sport { font-size: 13px; color: var(--lime); font-weight: 500; margin-top: 2px; }
  .coach-bio { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .coach-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .coach-rate { font-size: 15px; font-weight: 600; }
  .coach-rate span { font-size: 13px; color: var(--muted); font-weight: 400; }
  .coach-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 100px;
    background: rgba(202,255,0,0.1);
    color: var(--lime);
  }

  /* ─── AI MATCH ───────────────────────────────────── */
  #ai {
    background: var(--navy);
    position: relative;
    overflow: hidden;
  }
  .ai-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .ai-graphic {
    position: relative;
    height: 400px;
    border-radius: var(--radius-lg);
    background: var(--navy3);
    border: 1px solid rgba(202,255,0,0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ai-nodes {
    position: absolute;
    inset: 0;
  }
  .ai-center {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: var(--lime);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: relative;
    box-shadow: 0 0 40px rgba(202,255,0,0.3);
  }
  .ai-center-icon { font-size: 32px; }
  .ai-orbit {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(202,255,0,0.12);
  }
  .ai-node {
    position: absolute;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--navy2);
    border: 1px solid rgba(202,255,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--muted);
    transition: all 0.3s;
  }
  .ai-node.active { border-color: var(--lime); color: var(--lime); }
  .ai-feature { display: flex; gap: 16px; margin-bottom: 28px; }
  .ai-feature-icon {
    width: 44px; height: 44px;
    border-radius: var(--radius-sm);
    background: rgba(202,255,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* ─── PAYMENTS ───────────────────────────────────── */
  #payments { background: var(--navy2); }
  .pay-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: center;
  }
  .pay-methods {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .pay-method {
    background: var(--card-bg);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: var(--radius-md);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s;
  }
  .pay-method:hover { border-color: rgba(202,255,0,0.2); }
  .pay-method-logo {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0.02em;
  }
  .pay-method-desc { font-size: 13px; color: var(--muted); }

  /* ─── CTA BANNER ─────────────────────────────────── */
  #cta {
    background: var(--lime);
    padding: 80px 5%;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  #cta .display { color: var(--navy); }
  #cta p { color: rgba(10,22,40,0.65); margin: 20px auto 40px; max-width: 480px; font-size: 17px; }
  /* court lines decoration */
  .cta-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.07;
  }

  /* ─── FOOTER ─────────────────────────────────────── */
  footer {
    background: #060E1C;
    padding: 64px 5% 40px;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 48px;
  }
  .footer-brand p { font-size: 14px; color: var(--muted); margin-top: 16px; max-width: 280px; line-height: 1.7; }
  .footer-col h4 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 20px; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-col a { font-size: 14px; color: rgba(255,255,255,0.5); transition: color 0.15s; }
  .footer-col a:hover { color: var(--white); }
  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.07);
    font-size: 13px;
    color: var(--muted);
    flex-wrap: wrap;
    gap: 12px;
  }
  .footer-bottom-links { display: flex; gap: 24px; }
  .footer-bottom-links a { color: var(--muted); transition: color 0.15s; }
  .footer-bottom-links a:hover { color: var(--white); }

  /* ─── RESPONSIVE ─────────────────────────────────── */
  @media (max-width: 768px) {
    nav { padding: 0 4%; }
    .nav-links { display: none; }
    #hero { padding: 100px 4% 60px; }
    .hero-stats { gap: 28px; }
    .hero-court { display: none; }
    .search-bar { flex-direction: column; border-radius: var(--radius-md); }
    .search-field { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .search-btn { padding: 18px; justify-content: center; }
    .ai-container { grid-template-columns: 1fr; }
    .ai-graphic { display: none; }
    .pay-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .display-xl { font-size: 60px; }
    section { padding: 64px 4%; }
    .footer-top { grid-template-columns: 1fr; }
  }
</style>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<!-- ─── NAV ─────────────────────────────────────────── -->
<nav>
  <div class="logo">Fit<span>Book</span></div>
  <ul class="nav-links">
    <li><a href="#facilities">Facilities</a></li>
    <li><a href="#coaches">Coaches</a></li>
    <li><a href="#how">How it works</a></li>
    <li><a href="#ai">AI match</a></li>
  </ul>
  <div class="nav-cta">
    <a href="/dashboard" class="btn btn-ghost" style="padding: 10px 20px; font-size: 14px;">Log in</a>
    <a href="#" class="btn btn-lime" style="padding: 10px 20px; font-size: 14px;">Sign up free</a>
  </div>
</nav>

<!-- ─── HERO ─────────────────────────────────────────── -->
<section id="hero">
  <div class="hero-bg" id="react-hero-bg" style="z-index: 0;"></div>
  <div class="hero-court"></div>
  <div class="hero-court-line"></div>

  <div class="hero-tag">
    <span class="hero-tag-dot"></span>
    <span class="eyebrow" style="color: var(--lime); letter-spacing: 0.08em;">Live slots available now</span>
  </div>

  <!-- React component will mount here -->
  <div id="react-hero-title"></div>

  <p class="body-lg hero-subtitle">
    FitBook connects Filipino athletes with sports facilities and coaches — search, book, and pay in minutes.
  </p>

  <div class="hero-actions">
    <a href="#" class="btn btn-lime" style="padding: 16px 36px; font-size: 16px;">
      Find a court near me
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <a href="#coaches" class="btn btn-ghost" style="padding: 16px 32px; font-size: 16px;">Browse coaches</a>
  </div>

  <div class="hero-stats">
    <div class="stat-item">
      <span class="stat-num">340+</span>
      <span class="stat-label">Sports facilities</span>
    </div>
    <div class="stat-item">
      <span class="stat-num">120+</span>
      <span class="stat-label">Verified coaches</span>
    </div>
    <div class="stat-item">
      <span class="stat-num">18</span>
      <span class="stat-label">Cities covered</span>
    </div>
    <div class="stat-item">
      <span class="stat-num">4.8★</span>
      <span class="stat-label">Average rating</span>
    </div>
  </div>
</section>

<!-- ─── SEARCH + SPORT PILLS ────────────────────────── -->
<div id="search-section">
  <div class="search-bar">
    <div class="search-field">
      <div class="search-label">Sport</div>
      <input class="search-input" placeholder="Basketball, Swimming, Tennis…" />
    </div>
    <div class="search-field">
      <div class="search-label">Location</div>
      <input class="search-input" placeholder="Davao, Cebu, Manila…" />
    </div>
    <div class="search-field">
      <div class="search-label">Date</div>
      <input class="search-input" type="date" style="color-scheme: dark;" />
    </div>
    <button class="search-btn">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 12l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Search
    </button>
  </div>

  <div class="sport-pills">
    <div class="pill active"><i data-lucide="circle-dot" class="pill-icon" style="width:18px;height:18px;"></i> Basketball</div>
    <div class="pill"><i data-lucide="waves" class="pill-icon" style="width:18px;height:18px;"></i> Swimming</div>
    <div class="pill"><i data-lucide="target" class="pill-icon" style="width:18px;height:18px;"></i> Tennis</div>
    <div class="pill"><i data-lucide="circle" class="pill-icon" style="width:18px;height:18px;"></i> Football</div>
    <div class="pill"><i data-lucide="feather" class="pill-icon" style="width:18px;height:18px;"></i> Badminton</div>
    <div class="pill"><i data-lucide="flame" class="pill-icon" style="width:18px;height:18px;"></i> Boxing</div>
    <div class="pill"><i data-lucide="dumbbell" class="pill-icon" style="width:18px;height:18px;"></i> Gym</div>
    <div class="pill"><i data-lucide="waves" class="pill-icon" style="width:18px;height:18px;"></i> Aquatics</div>
    <div class="pill"><i data-lucide="activity" class="pill-icon" style="width:18px;height:18px;"></i> Gymnastics</div>
  </div>
</div>

<!-- ─── HOW IT WORKS ──────────────────────────────────── -->
<section id="how">
  <div class="section-header">
    <div class="eyebrow">How it works</div>
    <h2 class="display display-md" style="max-width: 500px; margin-top: 12px;">From search to<br><span style="color: var(--lime);">sweat in minutes</span></h2>
  </div>

  <div class="steps-grid">
    <div class="step-card">
      <span class="step-num">01</span>
      <div class="step-icon"><i data-lucide="search" style="width:24px;height:24px;"></i></div>
      <div class="step-title">Search nearby</div>
      <p class="body-md muted">Find facilities or coaches by sport, city, and available time slot — filtered to what's actually open right now.</p>
    </div>
    <div class="step-card">
      <span class="step-num">02</span>
      <div class="step-icon"><i data-lucide="calendar" style="width:24px;height:24px;"></i></div>
      <div class="step-title">Pick your slot</div>
      <p class="body-md muted">Real-time availability via Firebase means no double-bookings. Reserve your slot in one tap — it's held for 10 minutes while you pay.</p>
    </div>
    <div class="step-card">
      <span class="step-num">03</span>
      <div class="step-icon"><i data-lucide="credit-card" style="width:24px;height:24px;"></i></div>
      <div class="step-title">Pay with GCash</div>
      <p class="body-md muted">Checkout with GCash, Maya, or card via PayMongo. No account required for guests. Instant confirmation sent to your phone.</p>
    </div>
    <div class="step-card">
      <span class="step-num">04</span>
      <div class="step-icon"><i data-lucide="footprints" style="width:24px;height:24px;"></i></div>
      <div class="step-title">Show up & play</div>
      <p class="body-md muted">Your QR booking code is your entry pass. No printouts, no paperwork. Rate your experience after to help the community.</p>
    </div>
  </div>
</section>

<!-- ─── FACILITIES ────────────────────────────────────── -->
<section id="facilities">
  <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div class="eyebrow">Sports facilities</div>
      <h2 class="display display-md" style="margin-top: 12px;">Courts near you</h2>
    </div>
    <a href="#" class="btn btn-ghost" style="padding: 12px 24px;">View all →</a>
  </div>

  <div class="facility-grid">

    <!-- Card 1: Basketball -->
    <div class="facility-card">
      <div class="facility-img">
        <div class="court-pattern">
          <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="340" height="180" fill="#1A3A5C"/>
            <rect x="20" y="20" width="300" height="140" fill="none" stroke="#CAFF00" stroke-width="2" opacity="0.3"/>
            <line x1="170" y1="20" x2="170" y2="160" stroke="#CAFF00" stroke-width="1.5" opacity="0.2"/>
            <circle cx="170" cy="90" r="30" fill="none" stroke="#CAFF00" stroke-width="1.5" opacity="0.2"/>
            <path d="M20 90 Q80 40 140 90" fill="none" stroke="#CAFF00" stroke-width="1.5" opacity="0.2"/>
            <path d="M200 90 Q260 40 320 90" fill="none" stroke="#CAFF00" stroke-width="1.5" opacity="0.2"/>
            <rect x="155" y="80" width="30" height="20" fill="none" stroke="#CAFF00" stroke-width="1" opacity="0.15"/>
            <text x="170" y="98" text-anchor="middle" fill="#CAFF00" font-size="10" opacity="0.25" font-family="sans-serif"><i data-lucide="circle-dot" style="width:18px;height:18px;"></i></text>
          </svg>
        </div>
        <span class="facility-badge">Available now</span>
      </div>
      <div class="facility-body">
        <div class="facility-meta">
          <span style="font-size: 12px; color: var(--lime); font-weight: 500;">Basketball</span>
          <span style="color: var(--muted); font-size: 12px;">•</span>
          <span style="font-size: 12px; color: var(--muted);">Indoor</span>
        </div>
        <div class="facility-name">PhilSports Arena — Court A</div>
        <div class="facility-loc">📍 Pasig City, Metro Manila</div>
        <div class="facility-footer">
          <div class="facility-price">₱350 <span>/ hour</span></div>
          <div class="rating">★ 4.9 <span style="color: var(--muted);">(128)</span></div>
        </div>
      </div>
    </div>

    <!-- Card 2: Swimming -->
    <div class="facility-card">
      <div class="facility-img">
        <div class="court-pattern">
          <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="340" height="180" fill="#0A2744"/>
            <rect x="20" y="30" width="300" height="120" fill="rgba(0,80,160,0.4)" rx="4"/>
            <line x1="20" y1="60" x2="320" y2="60" stroke="#6FBFFF" stroke-width="1" opacity="0.3"/>
            <line x1="20" y1="90" x2="320" y2="90" stroke="#6FBFFF" stroke-width="1" opacity="0.3"/>
            <line x1="20" y1="120" x2="320" y2="120" stroke="#6FBFFF" stroke-width="1" opacity="0.3"/>
            <line x1="68" y1="30" x2="68" y2="150" stroke="#6FBFFF" stroke-width="0.8" opacity="0.2" stroke-dasharray="4,4"/>
            <line x1="116" y1="30" x2="116" y2="150" stroke="#6FBFFF" stroke-width="0.8" opacity="0.2" stroke-dasharray="4,4"/>
            <line x1="164" y1="30" x2="164" y2="150" stroke="#6FBFFF" stroke-width="0.8" opacity="0.2" stroke-dasharray="4,4"/>
            <line x1="212" y1="30" x2="212" y2="150" stroke="#6FBFFF" stroke-width="0.8" opacity="0.2" stroke-dasharray="4,4"/>
            <line x1="260" y1="30" x2="260" y2="150" stroke="#6FBFFF" stroke-width="0.8" opacity="0.2" stroke-dasharray="4,4"/>
            <text x="170" y="100" text-anchor="middle" fill="#6FBFFF" font-size="28" opacity="0.3" font-family="sans-serif"><i data-lucide="waves" style="width:18px;height:18px;"></i></text>
          </svg>
        </div>
        <span class="facility-badge" style="background: #6FBFFF; color: #0A2744;">6 lanes open</span>
      </div>
      <div class="facility-body">
        <div class="facility-meta">
          <span style="font-size: 12px; color: var(--lime); font-weight: 500;">Swimming</span>
          <span style="color: var(--muted); font-size: 12px;">•</span>
          <span style="font-size: 12px; color: var(--muted);">Olympic size</span>
        </div>
        <div class="facility-name">Cebu Sports Complex Pool</div>
        <div class="facility-loc">📍 Cebu City, Cebu</div>
        <div class="facility-footer">
          <div class="facility-price">₱200 <span>/ hour</span></div>
          <div class="rating">★ 4.7 <span style="color: var(--muted);">(84)</span></div>
        </div>
      </div>
    </div>

    <!-- Card 3: Tennis -->
    <div class="facility-card">
      <div class="facility-img">
        <div class="court-pattern">
          <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="340" height="180" fill="#1C4A1C"/>
            <rect x="40" y="20" width="260" height="140" fill="rgba(30,100,30,0.6)"/>
            <rect x="40" y="20" width="260" height="140" fill="none" stroke="#CAFF00" stroke-width="2" opacity="0.4"/>
            <line x1="170" y1="20" x2="170" y2="160" stroke="white" stroke-width="2" opacity="0.4"/>
            <line x1="40" y1="90" x2="300" y2="90" stroke="white" stroke-width="2" opacity="0.3"/>
            <line x1="80" y1="20" x2="80" y2="160" stroke="#CAFF00" stroke-width="1" opacity="0.2"/>
            <line x1="260" y1="20" x2="260" y2="160" stroke="#CAFF00" stroke-width="1" opacity="0.2"/>
          </svg>
        </div>
        <span class="facility-badge" style="background: var(--lime);">2 courts free</span>
      </div>
      <div class="facility-body">
        <div class="facility-meta">
          <span style="font-size: 12px; color: var(--lime); font-weight: 500;">Tennis</span>
          <span style="color: var(--muted); font-size: 12px;">•</span>
          <span style="font-size: 12px; color: var(--muted);">Hard court</span>
        </div>
        <div class="facility-name">Davao Racket Club</div>
        <div class="facility-loc">📍 Davao City, Davao del Sur</div>
        <div class="facility-footer">
          <div class="facility-price">₱450 <span>/ hour</span></div>
          <div class="rating">★ 4.8 <span style="color: var(--muted);">(61)</span></div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ─── COACHES ───────────────────────────────────────── -->
<section id="coaches">
  <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div class="eyebrow">Verified coaches</div>
      <h2 class="display display-md" style="margin-top: 12px;">Train with the <span style="color: var(--lime);">best</span></h2>
    </div>
    <a href="#" class="btn btn-ghost" style="padding: 12px 24px;">See all coaches →</a>
  </div>

  <div class="coaches-grid">

    <div class="coach-card">
      <div class="coach-avatar" style="background: rgba(202,255,0,0.15); color: var(--lime);">RC</div>
      <div>
        <div class="coach-name">Coach Ramon Cruz</div>
        <div class="coach-sport">🏀 Basketball · PBA veteran</div>
      </div>
      <div class="coach-bio">10-year PBA career. Specializes in ball handling, shooting mechanics, and youth development for ages 12–22.</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="coach-tag">Beginner</span>
        <span class="coach-tag">Intermediate</span>
      </div>
      <div class="coach-footer">
        <div class="coach-rate">₱800 <span>/ hour</span></div>
        <div class="rating">★ 4.9</div>
      </div>
    </div>

    <div class="coach-card">
      <div class="coach-avatar" style="background: rgba(106,191,255,0.15); color: #6FBFFF;">MA</div>
      <div>
        <div class="coach-name">Coach Maria Aquino</div>
        <div class="coach-sport">🏊 Swimming · FINA certified</div>
      </div>
      <div class="coach-bio">Former national swimmer. Expert in freestyle, butterfly, and competitive race strategy. Davao-based.</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="coach-tag">All levels</span>
        <span class="coach-tag">Competition</span>
      </div>
      <div class="coach-footer">
        <div class="coach-rate">₱650 <span>/ hour</span></div>
        <div class="rating">★ 5.0</div>
      </div>
    </div>

    <div class="coach-card">
      <div class="coach-avatar" style="background: rgba(202,255,0,0.12); color: var(--lime);">JD</div>
      <div>
        <div class="coach-name">Coach Jun Dela Rosa</div>
        <div class="coach-sport">⚽ Football · AFC licensed</div>
      </div>
      <div class="coach-bio">AFC B-licensed coach with 8 years of experience in youth academies and amateur clubs in Visayas.</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="coach-tag">Youth</span>
        <span class="coach-tag">Amateur</span>
      </div>
      <div class="coach-footer">
        <div class="coach-rate">₱550 <span>/ hour</span></div>
        <div class="rating">★ 4.8</div>
      </div>
    </div>

    <div class="coach-card">
      <div class="coach-avatar" style="background: rgba(255,150,100,0.12); color: #FF9664;">AL</div>
      <div>
        <div class="coach-name">Coach Ana Lim</div>
        <div class="coach-sport">🎾 Tennis · ITF ranked</div>
      </div>
      <div class="coach-bio">ITF-ranked doubles specialist. Cebu-based, available for private sessions and group clinics on weekends.</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="coach-tag">Intermediate</span>
        <span class="coach-tag">Advanced</span>
      </div>
      <div class="coach-footer">
        <div class="coach-rate">₱750 <span>/ hour</span></div>
        <div class="rating">★ 4.9</div>
      </div>
    </div>

  </div>
</section>

<!-- ─── AI MATCH ──────────────────────────────────────── -->
<section id="ai">
  <div class="ai-container">
    <div>
      <div class="eyebrow">AI coach matching</div>
      <h2 class="display display-md" style="margin-top: 12px; margin-bottom: 32px;">The right coach,<br><span style="color: var(--lime);">found for you</span></h2>

      <div class="ai-feature">
        <div class="ai-feature-icon"><i data-lucide="brain" style="width:18px;height:18px;"></i></div>
        <div>
          <div style="font-weight: 600; margin-bottom: 6px;">Understands your goals</div>
          <p class="body-md muted">Tell us your sport, skill level, and what you want to improve. Our AI reads coach bios and matches on substance, not just sport category.</p>
        </div>
      </div>

      <div class="ai-feature">
        <div class="ai-feature-icon"><i data-lucide="map-pin" style="width:18px;height:18px;"></i></div>
        <div>
          <div style="font-weight: 600; margin-bottom: 6px;">Considers your location</div>
          <p class="body-md muted">Matching weighs proximity so you're paired with coaches who are actually reachable — not just those with the best ratings nationally.</p>
        </div>
      </div>

      <div class="ai-feature">
        <div class="ai-feature-icon"><i data-lucide="zap" style="width:18px;height:18px;"></i></div>
        <div>
          <div style="font-weight: 600; margin-bottom: 6px;">Runs on local AI</div>
          <p class="body-md muted">Powered by Ollama running llama3.2 + nomic-embed-text — fast, private, and doesn't send your data to third-party servers.</p>
        </div>
      </div>
    </div>

    <div class="ai-graphic">
      <!-- orbit rings -->
      <div class="ai-orbit" style="width:120px;height:120px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
      <div class="ai-orbit" style="width:220px;height:220px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
      <div class="ai-orbit" style="width:320px;height:320px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
      <!-- outer nodes -->
      <div class="ai-node active" style="top:18%;left:50%;transform:translateX(-50%);"><i data-lucide="circle-dot" style="width:18px;height:18px;"></i></div>
      <div class="ai-node" style="top:35%;right:10%;"><i data-lucide="waves" style="width:18px;height:18px;"></i></div>
      <div class="ai-node active" style="bottom:18%;left:50%;transform:translateX(-50%);"><i data-lucide="circle" style="width:18px;height:18px;"></i></div>
      <div class="ai-node" style="top:35%;left:10%;"><i data-lucide="target" style="width:18px;height:18px;"></i></div>
      <div class="ai-node active" style="top:65%;right:10%;"><i data-lucide="flame" style="width:18px;height:18px;"></i></div>
      <div class="ai-node" style="top:65%;left:10%;"><i data-lucide="feather" style="width:18px;height:18px;"></i></div>
      <!-- center -->
      <div class="ai-center">
        <span class="ai-center-icon"><i data-lucide="bot" style="width:18px;height:18px;"></i></span>
      </div>
    </div>
  </div>
</section>

<!-- ─── PAYMENTS ──────────────────────────────────────── -->
<section id="payments">
  <div class="pay-grid">
    <div>
      <div class="eyebrow">Payments</div>
      <h2 class="display display-md" style="margin-top: 12px; margin-bottom: 20px;">Pay the way<br><span style="color: var(--lime);">Filipinos pay</span></h2>
      <p class="body-lg muted" style="margin-bottom: 32px;">GCash, Maya, or card — checkout in under a minute. All transactions go through PayMongo, the Philippines' leading payment gateway.</p>
      <a href="#" class="btn btn-lime">Start booking now →</a>
    </div>
    <div class="pay-methods">
      <div class="pay-method">
        <div class="pay-method-logo" style="color: #00AEE6;">GCash</div>
        <div class="pay-method-desc">Most used e-wallet in the Philippines</div>
      </div>
      <div class="pay-method">
        <div class="pay-method-logo" style="color: #512DA8;">Maya</div>
        <div class="pay-method-desc">Formerly PayMaya — widely accepted</div>
      </div>
      <div class="pay-method">
        <div class="pay-method-logo" style="color: #6772E5;">Card</div>
        <div class="pay-method-desc">Visa, Mastercard, JCB accepted</div>
      </div>
      <div class="pay-method">
        <div class="pay-method-logo" style="color: #CAFF00;">Stripe</div>
        <div class="pay-method-desc">International payments &amp; cards</div>
      </div>
    </div>
  </div>
</section>

<!-- ─── CTA BANNER ────────────────────────────────────── -->
<section id="cta">
  <svg class="cta-lines" viewBox="0 0 1200 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="150" x2="1200" y2="150" stroke="#0A1628" stroke-width="2"/>
    <line x1="0" y1="80" x2="1200" y2="80" stroke="#0A1628" stroke-width="1"/>
    <line x1="0" y1="220" x2="1200" y2="220" stroke="#0A1628" stroke-width="1"/>
    <circle cx="600" cy="150" r="80" fill="none" stroke="#0A1628" stroke-width="2"/>
    <circle cx="600" cy="150" r="160" fill="none" stroke="#0A1628" stroke-width="1"/>
    <line x1="600" y1="0" x2="600" y2="300" stroke="#0A1628" stroke-width="1.5"/>
  </svg>
  <div style="position: relative; z-index: 1;">
    <h2 class="display display-lg">Ready to play?</h2>
    <p>Find your nearest court or the right coach — and book it in under 2 minutes.</p>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <a href="#" class="btn" style="background: var(--navy); color: var(--lime); padding: 16px 36px; font-size: 16px;">Find a court</a>
      <a href="#" class="btn" style="background: transparent; color: var(--navy); border: 2px solid var(--navy); padding: 16px 32px; font-size: 16px;">Match me a coach</a>
    </div>
  </div>
</section>

<!-- ─── FOOTER ────────────────────────────────────────── -->
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="logo">Fit<span>Book</span></div>
      <p>The sports booking platform built for the Philippines. Find courts, hire coaches, and pay with GCash — all in one place.</p>
    </div>
    <div class="footer-col">
      <h4>For athletes</h4>
      <ul>
        <li><a href="#">Find facilities</a></li>
        <li><a href="#">Find coaches</a></li>
        <li><a href="#">AI coach match</a></li>
        <li><a href="#">My bookings</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>For coaches &amp; owners</h4>
      <ul>
        <li><a href="#">List your facility</a></li>
        <li><a href="#">Coach profile</a></li>
        <li><a href="#">Earnings dashboard</a></li>
        <li><a href="#">Verification</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About FitBook</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 FitBook. Built in the Philippines 🇵🇭</span>
    <div class="footer-bottom-links">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Cookies</a>
    </div>
  </div>
</footer>

<script>
  // Sport pill toggle
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Animate AI nodes on hover
  const nodes = document.querySelectorAll('.ai-node');
  let nodeInterval;
  const aiGraphic = document.querySelector('.ai-graphic');
  if (aiGraphic) {
    aiGraphic.addEventListener('mouseenter', () => {
      nodeInterval = setInterval(() => {
        const idx = Math.floor(Math.random() * nodes.length);
        nodes.forEach(n => n.classList.remove('active'));
        nodes[idx].classList.add('active');
        if (idx + 1 < nodes.length) nodes[idx + 1].classList.add('active');
      }, 600);
    });
    aiGraphic.addEventListener('mouseleave', () => {
      clearInterval(nodeInterval);
      nodes[0].classList.add('active');
      nodes[2].classList.add('active');
      nodes[4].classList.add('active');
    });
  }

  // Sticky nav shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
      nav.style.borderBottomColor = 'rgba(202,255,0,0.15)';
    } else {
      nav.style.borderBottomColor = 'rgba(202,255,0,0.08)';
    }
  });
</script>
  <script>lucide.createIcons();</script>
</body>
</html>
