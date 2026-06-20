const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'resources', 'js', 'components', 'AthleteDashboard_old.jsx');
const destDir = path.join(__dirname, 'resources', 'js', 'components', 'AthleteDashboard');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  fs.mkdirSync(path.join(destDir, 'components'));
  fs.mkdirSync(path.join(destDir, 'pages'));
}

const content = fs.readFileSync(srcFile, 'utf8');

function extractBlock(startMarker, endMarker) {
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return '';
  const endIdx = endMarker ? content.indexOf(endMarker, startIdx) : content.length;
  return content.slice(startIdx, endIdx);
}

// 1. theme.js
const tStart = content.indexOf('const T = {');
const tEnd = content.indexOf('// ─── GLOBAL CSS', tStart);
const tBlock = content.slice(tStart, tEnd).replace('const T =', 'export const T =');

const cssStart = content.indexOf('const css = `');
const cssEnd = content.indexOf('// ─── MOCK DATA', cssStart);
const cssBlock = content.slice(cssStart, cssEnd).replace('const css = `', 'export const css = `');

fs.writeFileSync(path.join(destDir, 'theme.js'), `${tBlock}\n${cssBlock}`);

// 2. data.js
const mockDataRaw = extractBlock('// ─── MOCK DATA', '// ─── COMPONENTS').replace('// ─── MOCK DATA ─────────────────────────────────────────────', '');
const dataContent = `import React from "react";
import { Activity, Dumbbell, Shield, Trophy } from "lucide-react";\n
${mockDataRaw.replace(/const /g, 'export const ')}
`;
fs.writeFileSync(path.join(destDir, 'data.js'), dataContent);

// Components
const componentsRaw = extractBlock('// ─── COMPONENTS', '// ─── PAGE VIEWS');
const compParts = componentsRaw.split('\nfunction ');

let sidebarRaw = '', statCardRaw = '', facilityRowRaw = '';
compParts.forEach(part => {
  if (part.startsWith('Sidebar')) sidebarRaw = 'function ' + part;
  if (part.startsWith('StatCard')) statCardRaw = 'function ' + part;
  if (part.startsWith('FacilityRow')) facilityRowRaw = 'function ' + part;
});

fs.writeFileSync(path.join(destDir, 'components', 'Sidebar.jsx'), `import React from "react";
import { Search, Calendar, User, Settings, LayoutDashboard, BrainCircuit, Dumbbell, Trophy } from "lucide-react";
import { T } from "../theme";\n
export default ${sidebarRaw}
`);

fs.writeFileSync(path.join(destDir, 'components', 'StatCard.jsx'), `import React from "react";
import { T } from "../theme";\n
export default ${statCardRaw}
`);

fs.writeFileSync(path.join(destDir, 'components', 'FacilityRow.jsx'), `import React from "react";
import { T } from "../theme";
import { MapPin, Star, Shield, CreditCard, ChevronRight } from "lucide-react";\n
export default ${facilityRowRaw}
`);

// 3. Pages
const pagesRaw = extractBlock('// ─── PAGE VIEWS', '// ─── MAIN LAYOUT');
const pageParts = pagesRaw.split('\nfunction ');

let dashboardPageRaw = '', bookingsPageRaw = '', searchPageRaw = '', aiMatchPageRaw = '';
pageParts.forEach(part => {
  if (part.startsWith('DashboardPage')) dashboardPageRaw = 'function ' + part;
  if (part.startsWith('BookingsPage')) bookingsPageRaw = 'function ' + part;
  if (part.startsWith('SearchPage')) searchPageRaw = 'function ' + part;
  if (part.startsWith('AIMatchPage')) aiMatchPageRaw = 'function ' + part;
});

fs.writeFileSync(path.join(destDir, 'pages', 'DashboardHome.jsx'), `import React, { useState } from "react";
import { T } from "../theme";
import { MapPin, Target, Activity, Zap, Star } from "lucide-react";
import { BOOKINGS, FACILITIES, NOTIFICATIONS } from "../data";
import StatCard from "../components/StatCard";
import FacilityRow from "../components/FacilityRow";\n
export default ${dashboardPageRaw}
`);

fs.writeFileSync(path.join(destDir, 'pages', 'BookingsPage.jsx'), `import React, { useState } from "react";
import { T } from "../theme";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { BOOKINGS } from "../data";\n
export default ${bookingsPageRaw}
`);

fs.writeFileSync(path.join(destDir, 'pages', 'SearchPage.jsx'), `import React, { useState } from "react";
import { T } from "../theme";
import { Search, MapPin, SlidersHorizontal, Map, Grid, Filter, Shield } from "lucide-react";
import { FACILITIES } from "../data";
import FacilityRow from "../components/FacilityRow";\n
export default ${searchPageRaw}
`);

fs.writeFileSync(path.join(destDir, 'pages', 'AIMatchPage.jsx'), `import React, { useState } from "react";
import { T } from "../theme";
import { BrainCircuit, Star, Trophy, Users } from "lucide-react";
import { AI_COACHES } from "../data";\n
export default ${aiMatchPageRaw}
`);

// 4. Main Layout
const layoutRaw = extractBlock('// ─── MAIN LAYOUT', '');
const indexContent = `import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { T, css } from "./theme";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import SearchPage from "./pages/SearchPage";
import AIMatchPage from "./pages/AIMatchPage";
import BookingsPage from "./pages/BookingsPage";\n
${layoutRaw.replace('export default function AthleteDashboard', 'export default function AthleteDashboard')}
`;

fs.writeFileSync(path.join(destDir, 'index.jsx'), indexContent);

console.log("Refactoring complete.");
