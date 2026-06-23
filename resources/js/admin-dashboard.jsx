import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const rootElement = document.getElementById('admin-dashboard-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <AdminDashboard />
        </BrowserRouter>
    );
}
