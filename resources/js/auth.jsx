import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthPage from './components/AuthPage';

const authRoot = document.getElementById('auth-root');
if (authRoot) {
    const root = createRoot(authRoot);
    root.render(<AuthPage />);
}
