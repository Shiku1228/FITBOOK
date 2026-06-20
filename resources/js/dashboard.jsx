import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AthleteDashboard from './components/AthleteDashboard/index.jsx';

const rootElement = document.getElementById('dashboard-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <AthleteDashboard />
        </BrowserRouter>
    );
}
