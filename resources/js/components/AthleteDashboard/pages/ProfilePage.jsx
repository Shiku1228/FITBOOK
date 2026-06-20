import React, { useState } from "react";
import { T } from "../theme";
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Camera, Save, Key, Bell, Globe } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="greeting-bar">
        <div>
          <div className="greeting-text"><User size={24} style={{ display: "inline", marginBottom: -4 }} /> <span>Profile</span></div>
          <div className="greeting-sub">Manage your personal information and account settings</div>
        </div>
        <button 
          className="book-btn" 
          style={{ width: "auto", padding: "10px 22px", fontSize: 14 }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <Save size={14} style={{ display: "inline", marginBottom: -2 }} /> : <Edit size={14} style={{ display: "inline", marginBottom: -2 }} />} 
          {isEditing ? " Save Changes" : " Edit Profile"}
        </button>
      </div>

      <div className="two-col">
        {/* Profile Information */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Personal Information</div>
          </div>
          <div className="card-body">
            {/* Avatar Section */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ position: "relative" }}>
                <div className="avatar-circle" style={{ width: 80, height: 80, fontSize: 28, background: "rgba(202,255,0,0.15)" }}>RL</div>
                <button style={{ 
                  position: "absolute", bottom: -4, right: -4, width: 28, height: 28, borderRadius: "50%", 
                  background: T.lime, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Camera size={14} color={T.navy} />
                </button>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Renz Latangga</div>
                <div style={{ fontSize: 13, color: T.muted }}>Athlete · Member since Jan 2024</div>
                <div style={{ fontSize: 12, color: T.lime, marginTop: 4 }}>★ Premium Member</div>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>First Name</div>
                <input 
                  type="text" 
                  defaultValue="Renz"
                  disabled={!isEditing}
                  style={{ 
                    width: "100%", background: isEditing ? T.navy3 : "transparent", border: isEditing ? "1px solid rgba(255,255,255,0.1)" : "none", 
                    borderRadius: 8, padding: "10px 12px", color: T.white, fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none"
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Last Name</div>
                <input 
                  type="text" 
                  defaultValue="Latangga"
                  disabled={!isEditing}
                  style={{ 
                    width: "100%", background: isEditing ? T.navy3 : "transparent", border: isEditing ? "1px solid rgba(255,255,255,0.1)" : "none", 
                    borderRadius: 8, padding: "10px 12px", color: T.white, fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none"
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Email</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
                  <Mail size={14} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.white }}>renz.latangga@email.com</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Phone</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
                  <Phone size={14} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.white }}>+63 912 345 6789</span>
                </div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Location</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
                  <MapPin size={14} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.white }}>Davao Region, Philippines</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Date of Birth</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
                  <Calendar size={14} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.white }}>March 15, 1995</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.lime, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Gender</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.navy3, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
                  <User size={14} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.white }}>Male</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Quick Stats */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Account Stats</div>
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: T.navy3, borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: T.lime, fontFamily: "Barlow Condensed, sans-serif" }}>28</div>
                  <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Bookings</div>
                </div>
                <div style={{ background: T.navy3, borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: T.lime, fontFamily: "Barlow Condensed, sans-serif" }}>₱12.4K</div>
                  <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Spent</div>
                </div>
                <div style={{ background: T.navy3, borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: T.lime, fontFamily: "Barlow Condensed, sans-serif" }}>4</div>
                  <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Sports Played</div>
                </div>
                <div style={{ background: T.navy3, borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: T.lime, fontFamily: "Barlow Condensed, sans-serif" }}>92%</div>
                  <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Match Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div style={{ background: T.navy2, borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 16 }}>Settings</div>
            {[
              { icon: <Key size={20} />, label: "Change Password", desc: "Update your password" },
              { icon: <Bell size={20} />, label: "Notification Settings", desc: "Manage your notifications" },
              { icon: <Shield size={20} />, label: "Privacy & Security", desc: "Control your data" },
              { icon: <Globe size={20} />, label: "Language & Region", desc: "English · Philippines" },
            ].map((item, i) => (
              <button 
                key={i} 
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 0", 
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", background: "transparent", border: "none", 
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ color: T.lime }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.white }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{item.desc}</div>
                </div>
                <span style={{ color: T.muted, fontSize: 18 }}>→</span>
              </button>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="card" style={{ border: "1px solid rgba(255,77,77,0.2)" }}>
            <div className="card-header" style={{ borderBottomColor: "rgba(255,77,77,0.1)" }}>
              <div className="card-title" style={{ color: T.danger }}>Danger Zone</div>
            </div>
            <div className="card-body">
              <button style={{ 
                width: "100%", padding: "10px 14px", background: "transparent", border: "1px solid rgba(255,77,77,0.3)", 
                borderRadius: 6, color: T.danger, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
                transition: "all 0.15s"
              }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
