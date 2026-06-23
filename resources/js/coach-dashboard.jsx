import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CoachDashboard from './components/Coach Dashboard/index.jsx';

const container = document.getElementById('coach-dashboard-root');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter basename="/coach">
            <CoachDashboard />
        </BrowserRouter>
    );
}
