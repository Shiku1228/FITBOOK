import { useState, useEffect, useRef } from "react";
import { User, Dumbbell, Building2, Mail, Phone, Lock, Eye, EyeOff, Check, PartyPopper, Loader2 } from 'lucide-react';
import Threads from './Threads';
import TextType from './TextType';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: 'Inter', sans-serif;
    background: #0A1628;
    color: #fff;
    min-height: 100vh;
  }

  /* ── ROOT SPLIT ── */
  .auth-root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    position: relative;
  }

  /* ── LEFT PANEL (branding) ── */
  .auth-left {
    background: #0A1628;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 36px 48px 48px;
    overflow: hidden;
  }

  /* Court circle — matches landing page hero motif */
  .court-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(202,255,0,0.10);
    pointer-events: none;
  }
  .court-ring-1 { width: 560px; height: 560px; right: -180px; top: 50%; transform: translateY(-50%); }
  .court-ring-2 { width: 420px; height: 420px; right: -120px; top: 50%; transform: translateY(-50%); border-color: rgba(202,255,0,0.06); }
  .court-ring-3 { width: 280px; height: 280px; right: -60px;  top: 50%; transform: translateY(-50%); border-color: rgba(202,255,0,0.04); }
  /* Horizontal court line */
  .court-hline {
    position: absolute;
    left: 0; right: 0;
    top: 50%;
    height: 1.5px;
    background: rgba(202,255,0,0.06);
    pointer-events: none;
  }
  /* Lime glow blob */
  .left-glow {
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(202,255,0,0.07) 0%, transparent 70%);
    top: 20%; right: -100px;
    pointer-events: none;
  }

  /* Logo */
  .auth-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 28px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
  }
  .auth-logo span { color: #CAFF00; }

  /* Big hero text */
  .auth-hero {
    position: relative;
    z-index: 2;
  }
  .auth-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(202,255,0,0.08);
    border: 1px solid rgba(202,255,0,0.18);
    border-radius: 100px;
    padding: 6px 14px;
    margin-bottom: 28px;
  }
  .tag-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #CAFF00;
    animation: blink 2s ease infinite;
  }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  .tag-text {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #CAFF00;
  }
  .auth-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(52px, 6vw, 80px);
    line-height: 0.92;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    margin-bottom: 28px;
  }
  .auth-headline em { font-style: normal; color: #CAFF00; }
  .auth-hero-sub {
    font-size: 15px;
    color: #8A97AE;
    line-height: 1.65;
    max-width: 360px;
    margin-bottom: 40px;
  }

  /* Stats row */
  .auth-stats {
    display: flex;
    gap: 36px;
    flex-wrap: wrap;
  }
  .auth-stat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 30px;
    font-weight: 900;
    color: #CAFF00;
    line-height: 1;
  }
  .auth-stat-label { font-size: 12px; color: #8A97AE; margin-top: 3px; }

  /* Bottom trust */
  .auth-trust {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .trust-badge {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: #8A97AE;
  }
  .trust-badge span { color: #CAFF00; font-weight: 600; }

  /* ── RIGHT PANEL (form) ── */
  .auth-right {
    background: #111E35;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    border-left: 1px solid rgba(202,255,0,0.07);
    position: relative;
  }
  /* Subtle top-right glow */
  .right-glow {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(202,255,0,0.04) 0%, transparent 70%);
    top: -80px; right: -60px;
    pointer-events: none;
  }

  .auth-box {
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }

  /* Mode toggle */
  .mode-toggle {
    display: flex;
    background: #0A1628;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 32px;
  }
  .mode-btn {
    flex: 1;
    padding: 9px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    border: none;
    font-family: 'Inter', sans-serif;
    background: transparent;
    color: #8A97AE;
  }
  .mode-btn.active {
    background: #CAFF00;
    color: #0A1628;
  }

  /* Form heading */
  .form-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 34px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1;
    margin-bottom: 6px;
  }
  .form-heading span { color: #CAFF00; }
  .form-sub { font-size: 13px; color: #8A97AE; margin-bottom: 28px; }

  /* Role selector */
  .role-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 20px;
  }
  .role-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 8px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.08);
    background: transparent;
    cursor: pointer;
    transition: all 0.15s;
    font-family: 'Inter', sans-serif;
    color: #8A97AE;
  }
  .role-card:hover { border-color: rgba(202,255,0,0.25); color: #fff; background: rgba(202,255,0,0.04); }
  .role-card.active { border-color: #CAFF00; background: rgba(202,255,0,0.08); color: #CAFF00; }
  .role-icon { font-size: 22px; }
  .role-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }

  /* Form fields */
  .field-group { margin-bottom: 14px; }
  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8A97AE;
    margin-bottom: 7px;
  }
  .field-wrap { position: relative; }
  .field-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    opacity: 0.45;
    pointer-events: none;
  }
  .field-input {
    width: 100%;
    background: #0A1628;
    border: 1.5px solid rgba(255,255,255,0.09);
    border-radius: 9px;
    padding: 11px 14px 11px 38px;
    color: #fff;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .field-input::placeholder { color: #4A5568; }
  .field-input:focus {
    border-color: rgba(202,255,0,0.5);
    box-shadow: 0 0 0 3px rgba(202,255,0,0.06);
  }
  .field-input.no-icon { padding-left: 14px; }

  /* Password toggle */
  .pw-toggle {
    position: absolute;
    right: 13px; top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    opacity: 0.45;
    transition: opacity 0.15s;
    color: #fff;
  }
  .pw-toggle:hover { opacity: 0.8; }

  /* Two-col fields */
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* Forgot */
  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -6px;
    margin-bottom: 20px;
  }
  .forgot-link { font-size: 12px; color: #CAFF00; cursor: pointer; font-weight: 500; }
  .forgot-link:hover { text-decoration: underline; }

  /* Submit */
  .submit-btn {
    width: 100%;
    background: #CAFF00;
    color: #0A1628;
    border: none;
    border-radius: 9px;
    padding: 13px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s, transform 0.12s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.01em;
  }
  .submit-btn:hover { background: #AEDD00; transform: translateY(-1px); }
  .submit-btn:active { transform: translateY(0); }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
  }
  .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
  .divider-text { font-size: 12px; color: #4A5568; font-weight: 500; }

  /* Social / Google */
  .social-btn {
    width: 100%;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    padding: 11px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .social-btn:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.03); }

  /* Switch mode */
  .switch-mode {
    text-align: center;
    margin-top: 22px;
    font-size: 13px;
    color: #8A97AE;
  }
  .switch-link { color: #CAFF00; cursor: pointer; font-weight: 600; }
  .switch-link:hover { text-decoration: underline; }

  /* Terms */
  .terms-text {
    font-size: 11px;
    color: #4A5568;
    text-align: center;
    margin-top: 16px;
    line-height: 1.6;
  }
  .terms-text a { color: #8A97AE; cursor: pointer; }
  .terms-text a:hover { color: #fff; }

  /* Password strength */
  .pw-strength { margin-top: 6px; }
  .pw-strength-bars { display: flex; gap: 4px; margin-bottom: 4px; }
  .pw-bar { flex: 1; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.1); transition: background 0.2s; }
  .pw-bar.weak   { background: #FF4D4D; }
  .pw-bar.fair   { background: #FFB547; }
  .pw-bar.strong { background: #00C48C; }
  .pw-label { font-size: 11px; color: #8A97AE; }

  /* Success state */
  .success-screen {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 16px; padding: 20px 0;
  }
  .success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(202,255,0,0.12); border: 2px solid rgba(202,255,0,0.3);
    display: flex; align-items: center; justify-content: center; font-size: 30px;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .auth-root { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 40px 24px; }
  }
`;

const ROLES = [
  { key:"athlete",       icon:<User size={22} />, label:"Athlete" },
  { key:"coach",         icon:<Dumbbell size={22} />, label:"Coach" },
  { key:"facility_owner",icon:<Building2 size={22} />, label:"Owner" },
];

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function PasswordStrength({ password }) {
  const s = getStrength(password);
  const label = ["","Weak","Fair","Good","Strong"][s] || "";
  const color  = ["","weak","fair","strong","strong"][s] || "";
  return (
    <div className="pw-strength">
      <div className="pw-strength-bars">
        {[1,2,3,4].map(i => (
          <div key={i} className={`pw-bar${i <= s ? " " + color : ""}`} />
        ))}
      </div>
      {password && <div className="pw-label">{label} password</div>}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode]           = useState("login");   // "login" | "register"
  const [role, setRole]           = useState("athlete");
  const [showPw, setShowPw]       = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Confetti effect on success
  useEffect(() => {
    if (success && confettiRef.current) {
      const canvas = confettiRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#CAFF00', '#00C48C', '#FF4D4D', '#FFB547', '#4A90E2'];

      for (let i = 0; i < 150; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 15,
          vy: (Math.random() - 0.5) * 15 - 5,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1
        });
      }

      let animationFrame;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3;
          p.rotation += p.rotationSpeed;
          p.opacity -= 0.008;

          if (p.opacity <= 0) {
            particles.splice(index, 1);
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        if (particles.length > 0) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [success]);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      if (csrfToken) {
        formData.append('_token', csrfToken);
      }

      const response = await fetch("/auth/login", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "text/html",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: 'same-origin',
      });

      if (response.redirected) {
        // Login successful, redirect to dashboard
        window.location.href = response.url;
        return;
      }

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setSuccess(false);
    setPassword("");
    setEmail("");
    setError("");
  }

  const isRegister = mode === "register";

  return (
    <>
      <style>{css}</style>
      <div className="auth-root" ref={containerRef}>
        {/* Threads background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, width: containerSize.width || '100%', height: containerSize.height || '100%' }}>
          <Threads
            color={[0.79, 1.0, 0.0]}
            amplitude={3.0}
            distance={0.5}
            verticalOffset={0}
            enableMouseInteraction={false}
          />
        </div>

        {/* ── CENTER PANEL ── */}
        <div className="auth-right" style={{ border: 'none', background: '#111E35', borderRadius: '20px', maxWidth: '500px', width: '100%', zIndex: 1 }}>
          <div className="right-glow" />

          <div className="auth-box">

            {/* Login / Register toggle */}
            <div className="mode-toggle">
              <button className={`mode-btn${mode==="login"?" active":""}`}    onClick={() => { setMode("login");    setSuccess(false); }}>Log in</button>
              <button className={`mode-btn${mode==="register"?" active":""}`} onClick={() => { setMode("register"); setSuccess(false); }}>Sign up free</button>
            </div>

            {/* Success screen */}
            {success ? (
              <div className="success-screen">
                <canvas
                  ref={confettiRef}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1000
                  }}
                />
                <div className="form-heading">
                  {isRegister ? <>You're <span>in!</span></> : <>Welcome <span>back!</span></>}
                </div>
                <p style={{ fontSize:14, color:"#8A97AE", lineHeight:1.6 }}>
                  {isRegister
                    ? "Your account has been created. Check your email to verify, then start booking."
                    : "Redirecting you to your dashboard…"}
                </p>
                <button
                  className="submit-btn"
                  style={{ marginTop:8 }}
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    const role = user.role || 'athlete';
                    window.location.href = `/${role}/dashboard`;
                  }}
                >
                  {isRegister ? "Go to dashboard →" : "Open dashboard →"}
                </button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  {isRegister ? (
                    <>Create your <span>account</span></>
                  ) : (
                    <TextType
                      text={["Welcome back", "Log in to FitBook"]}
                      typingSpeed={100}
                      pauseDuration={2000}
                      loop={false}
                      className="inline"
                    />
                  )}
                </div>
                <div className="form-sub">
                  {isRegister
                    ? "Join thousands of Filipino athletes on FitBook."
                    : "Log in to manage your bookings and sessions."}
                </div>

                {/* Role picker — register only */}
                {isRegister && (
                  <>
                    <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8A97AE", marginBottom:10 }}>
                      I am a…
                    </div>
                    <div className="role-row">
                      {ROLES.map(r => (
                        <button
                          key={r.key}
                          className={`role-card${role===r.key?" active":""}`}
                          onClick={() => setRole(r.key)}
                        >
                          <span className="role-icon">{r.icon}</span>
                          <span className="role-label">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Name row — register only */}
                {isRegister && (
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">First name</label>
                      <div className="field-wrap">
                        <span className="field-icon"><User size={15} /></span>
                        <input className="field-input" placeholder="Juan" />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Last name</label>
                      <div className="field-wrap">
                        <span className="field-icon"><User size={15} /></span>
                        <input className="field-input" placeholder="dela Cruz" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="field-group">
                  <label className="field-label">Email address</label>
                  <div className="field-wrap">
                    <span className="field-icon"><Mail size={15} /></span>
                    <input
                      className="field-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone — register only */}
                {isRegister && (
                  <div className="field-group">
                    <label className="field-label">Phone number</label>
                    <div className="field-wrap">
                      <span className="field-icon"><Phone size={15} /></span>
                      <input className="field-input" placeholder="+63 9XX XXX XXXX" />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div className="field-wrap">
                    <span className="field-icon"><Lock size={15} /></span>
                    <input
                      className="field-input"
                      type={showPw ? "text" : "password"}
                      placeholder={isRegister ? "Min. 8 characters" : "Your password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button className="pw-toggle" onClick={() => setShowPw(v => !v)} type="button">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {isRegister && <PasswordStrength password={password} />}
                </div>

                {/* Error message */}
                {error && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(255, 77, 77, 0.1)',
                    border: '1px solid rgba(255, 77, 77, 0.3)',
                    borderRadius: '8px',
                    color: '#FF4D4D',
                    fontSize: '13px',
                    marginBottom: '16px'
                  }}>
                    {error}
                  </div>
                )}

                {/* Forgot password — login only */}
                {!isRegister && (
                  <div className="forgot-row">
                    <span className="forgot-link">Forgot password?</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ marginTop: isRegister ? 20 : 0, opacity: loading ? 0.8 : 1 }}
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> Please wait…</>
                    : isRegister
                      ? `Create ${role === "athlete" ? "Athlete" : role === "coach" ? "Coach" : "Owner"} account →`
                      : "Log in to FitBook →"
                  }
                </button>

                {/* Divider */}
                <div className="divider">
                  <div className="divider-line" />
                  <span className="divider-text">or continue with</span>
                  <div className="divider-line" />
                </div>

                {/* Google */}
                <button className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                    <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Switch */}
                <div className="switch-mode">
                  {isRegister
                    ? <>Already have an account? <span className="switch-link" onClick={() => setMode("login")}>Log in</span></>
                    : <>Don't have an account? <span className="switch-link" onClick={() => setMode("register")}>Sign up free</span></>
                  }
                </div>

                {/* Terms — register only */}
                {isRegister && (
                  <div className="terms-text">
                    By creating an account you agree to our{" "}
                    <a>Terms of Service</a> and <a>Privacy Policy</a>.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
