import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import OwnerDashboard from './components/OwnerDashboard/index.jsx';

const rootElement = document.getElementById('owner-dashboard-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter basename="/facility_owner">
            <OwnerDashboard />
        </BrowserRouter>
    );
}
