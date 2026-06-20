import fs from 'fs';
import path from 'path';

let dashboardPath = 'resources/js/components/AthleteDashboard.jsx';
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

// 1. Add lucide imports to Dashboard
if (!dashboard.includes('import {')) {
  dashboard = `import { CircleDot, Waves, Target, Search, Calendar, CreditCard, Bell, MapPin, Plus, Settings, User, Bot, LayoutDashboard, Footprints, Flame, Feather, Dumbbell, Activity, CalendarDays, Ticket } from 'lucide-react';\n` + dashboard;
}

// 2. Replace NAV_ITEMS icons
dashboard = dashboard.replace('icon:"⬛"', 'icon:<LayoutDashboard size={18} />');
dashboard = dashboard.replace('icon:"🏟️"', 'icon:<MapPin size={18} />');
dashboard = dashboard.replace('icon:"🤖"', 'icon:<Bot size={18} />');
dashboard = dashboard.replace('icon:"📅"', 'icon:<CalendarDays size={18} />');
dashboard = dashboard.replace('icon:"💳"', 'icon:<CreditCard size={18} />');
dashboard = dashboard.replace('icon:"🔔"', 'icon:<Bell size={18} />');
dashboard = dashboard.replace('icon:"👤"', 'icon:<User size={18} />');

// 3. Replace FACILITIES emojis
dashboard = dashboard.replace(/emoji:"🏀"/g, 'emoji:<CircleDot size={28} />');
dashboard = dashboard.replace(/emoji:"🏊"/g, 'emoji:<Waves size={28} />');
dashboard = dashboard.replace(/emoji:"🎾"/g, 'emoji:<Target size={28} />');

// 4. Replace BOOKINGS emojis
dashboard = dashboard.replace(/sport:"🏀"/g, 'sport:<CircleDot size={20} />');
dashboard = dashboard.replace(/sport:"🏊"/g, 'sport:<Waves size={20} />');
dashboard = dashboard.replace(/sport:"🎾"/g, 'sport:<Target size={20} />');

// 5. Replace SPORTS array
dashboard = dashboard.replace('"🏀 Basketball"', '<span><CircleDot size={16}/> Basketball</span>');
dashboard = dashboard.replace('"🏊 Swimming"', '<span><Waves size={16}/> Swimming</span>');
dashboard = dashboard.replace('"🎾 Tennis"', '<span><Target size={16}/> Tennis</span>');
dashboard = dashboard.replace('"⚽ Football"', '<span><CircleDot size={16}/> Football</span>');
dashboard = dashboard.replace('"🏸 Badminton"', '<span><Feather size={16}/> Badminton</span>');
dashboard = dashboard.replace('"🥊 Boxing"', '<span><Flame size={16}/> Boxing</span>');

// 6. Other dashboard replacements
dashboard = dashboard.replace(/📍/g, '<MapPin size={14} style={{display:"inline", marginBottom:-2}} />');
dashboard = dashboard.replace(/<span style={{ fontSize: 28 }}>\{f\.emoji\}<\/span>/g, '{f.emoji}');
dashboard = dashboard.replace(/<span style={{ color:T.muted, fontSize:14 }}>🔍<\/span>/g, '<Search size={16} color={T.muted} />');
dashboard = dashboard.replace(/🔔/g, '<Bell size={18} />');
dashboard = dashboard.replace(/⚙️/g, '<Settings size={18} />');
dashboard = dashboard.replace(/🤖/g, '<Bot size={24} style={{display:"inline", marginBottom:-4}} />');
dashboard = dashboard.replace(/🧠/g, '<Bot size={20} />');
dashboard = dashboard.replace(/📐/g, '<Target size={20} />');
dashboard = dashboard.replace(/✍️/g, '<Feather size={20} />');
dashboard = dashboard.replace(/"👋"/g, '<User size={24} />');

fs.writeFileSync(dashboardPath, dashboard);


// Blade Landing Page
let landingPath = 'resources/views/fitbook-landing.blade.php';
let landing = fs.readFileSync(landingPath, 'utf8');

if (!landing.includes('lucide.createIcons')) {
    landing = landing.replace('</head>', '  <script src="https://unpkg.com/lucide@latest"></script>\n</head>');
    landing = landing.replace('</body>', '  <script>lucide.createIcons();</script>\n</body>');
}

// Map emojis to Lucide icons
const emojiMap = {
    '🏀': 'circle-dot',
    '🏊': 'waves',
    '🎾': 'target',
    '⚽': 'circle',
    '🏸': 'feather',
    '🥊': 'flame',
    '🏋️': 'dumbbell',
    '🤸': 'activity',
    '🔍': 'search',
    '📅': 'calendar',
    '💳': 'credit-card',
    '🏃': 'footprints',
    '🤖': 'bot',
    '🧠': 'brain',
    '📍': 'map-pin',
    '⚡': 'zap'
};

for (const [emoji, icon] of Object.entries(emojiMap)) {
    // Replace <span class="pill-icon">🏀</span> with <i data-lucide="..."></i>
    landing = landing.replace(new RegExp(`<span class="pill-icon">${emoji}</span>`, 'g'), `<i data-lucide="${icon}" class="pill-icon" style="width:18px;height:18px;"></i>`);
    
    // Replace <div class="step-icon">🔍</div> with <div class="step-icon"><i data-lucide="..."></i></div>
    landing = landing.replace(new RegExp(`<div class="step-icon">${emoji}</div>`, 'g'), `<div class="step-icon"><i data-lucide="${icon}" style="width:24px;height:24px;"></i></div>`);
    
    // Replace <div class="ai-node active"...>🏀</div>
    landing = landing.replace(new RegExp(`>${emoji}<`, 'g'), `><i data-lucide="${icon}" style="width:18px;height:18px;"></i><`);
}

// Other specifics in landing
landing = landing.replace(/<span class="ai-center-icon">🤖<\/span>/g, '<span class="ai-center-icon"><i data-lucide="bot" style="width:32px;height:32px;"></i></span>');
landing = landing.replace(/<div class="ai-feature-icon">🧠<\/div>/g, '<div class="ai-feature-icon"><i data-lucide="brain"></i></div>');
landing = landing.replace(/<div class="ai-feature-icon">📍<\/div>/g, '<div class="ai-feature-icon"><i data-lucide="map-pin"></i></div>');
landing = landing.replace(/<div class="ai-feature-icon">⚡<\/div>/g, '<div class="ai-feature-icon"><i data-lucide="zap"></i></div>');

// Replace the large emojis inside the SVG court patterns with matching icons (we'll just use simple text replacement for the tags if any remain, but they are text elements in SVG)
landing = landing.replace(/<text[^>]*>🏀<\/text>/g, '<circle cx="170" cy="90" r="15" fill="none" stroke="#CAFF00" stroke-width="2" opacity="0.4" />');
landing = landing.replace(/<text[^>]*>🏊<\/text>/g, '<path d="M140 100 Q155 80 170 100 T200 100" fill="none" stroke="#6FBFFF" stroke-width="4" opacity="0.4"/>');

fs.writeFileSync(landingPath, landing);
console.log('Icons updated successfully.');
