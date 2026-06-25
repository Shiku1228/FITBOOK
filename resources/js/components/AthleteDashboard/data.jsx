import React from 'react';
import { CircleDot, Waves, Target, Feather, Flame, LayoutDashboard, MapPin, Bot, CalendarDays, CreditCard, Bell, User } from 'lucide-react';
import { T } from './theme.jsx';


export const FACILITIES = [
  { id: 1, name: "PhilSports Arena — Court A", city: "Pasig City, Metro Manila", sport: "Basketball", icon: "CircleDot", bg: "#1A3A5C", price: 350, rating: 4.9, reviews: 128, slots: 5 },
  { id: 2, name: "Cebu Sports Complex Pool", city: "Cebu City, Cebu", sport: "Swimming", icon: "Waves", bg: "#0A2744", price: 200, rating: 4.7, reviews: 84, slots: 6 },
  { id: 3, name: "Davao Racket Club", city: "Davao City, Davao del Sur", sport: "Tennis", icon: "Target", bg: "#1C4A1C", price: 450, rating: 4.8, reviews: 61, slots: 2 },
  { id: 4, name: "Iligan Sports Complex", city: "Iligan City, Lanao del Norte", sport: "Basketball", icon: "CircleDot", bg: "#1A3A5C", price: 300, rating: 4.6, reviews: 42, slots: 3 },
];

export const AI_COACHES = [
  { id: 1, name: "Coach Ramon Cruz", initials: "RC", sport: "Basketball · PBA veteran", rate: 800, score: 0.92, reason: "Matches your basketball shooting goals with 10 years PBA experience. His Pasig City location is 3 km from you.", color: "rgba(202,255,0,0.15)", textColor: T.lime },
  { id: 2, name: "Coach Maria Aquino", initials: "MA", sport: "Swimming · FINA certified", rate: 650, score: 0.85, reason: "Former national swimmer. Her freestyle drills align with your goal of improving lap times.", color: "rgba(106,191,255,0.15)", textColor: "#6FBFFF" },
  { id: 3, name: "Coach Jun Dela Rosa", initials: "JD", sport: "Football · AFC licensed", rate: 550, score: 0.78, reason: "AFC B-license coach within your city, specialising in positioning and youth development.", color: "rgba(202,255,0,0.1)", textColor: T.lime },
];

export const BOOKINGS = [
  { id: 1, name: "PhilSports Arena — Court A", date: "Today, 2:00 PM – 4:00 PM", sport: <CircleDot size={20} />, status: "confirmed" },
  { id: 2, name: "Coach Maria Aquino", date: "Tomorrow, 6:00 AM – 7:00 AM", sport: <Waves size={20} />, status: "pending" },
  { id: 3, name: "Davao Racket Club", date: "Jun 24, 3:00 PM – 5:00 PM", sport: <Target size={20} />, status: "confirmed" },
  { id: 4, name: "Cebu Sports Complex Pool", date: "Jun 10, 8:00 AM – 9:00 AM", sport: <Waves size={20} />, status: "cancelled" },
];

export const NOTIFICATIONS = [
  { text: "Your booking at PhilSports Arena has been confirmed.", time: "2 min ago", color: T.success },
  { text: "Payment of ₱700 via GCash received for Court A booking.", time: "5 min ago", color: T.lime },
  { text: "Reminder: Coach Maria session tomorrow at 6:00 AM.", time: "1 hr ago", color: "#6FBFFF" },
  { text: "Slot update: Davao Racket Club opened 2 new courts this Saturday.", time: "3 hr ago", color: T.muted },
];

export const SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];
export const TAKEN_SLOTS = ["9:00 AM", "11:00 AM", "4:00 PM", "5:00 PM"];

export const NAV_ITEMS = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, key: "dashboard" },
  { label: "Find Courts", icon: <MapPin size={18} />, key: "search" },
  { label: "AI Coach Match", icon: <Bot size={18} />, key: "ai", badge: "New" },
  { label: "My Bookings", icon: <CalendarDays size={18} />, key: "bookings", badge: "3" },
  { label: "Payments", icon: <CreditCard size={18} />, key: "payments" },
  { label: "Notifications", icon: <Bell size={18} />, key: "notifications", badge: "4" },
  { label: "Profile", icon: <User size={18} />, key: "profile" },
];

export const SPORTS = ["All", "Basketball", "Swimming", "Tennis", "Football", "Badminton", "Boxing"];

