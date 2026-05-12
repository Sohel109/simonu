import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './layout/Layout';

// Component to re-trigger Google Translate on page navigation
const GoogleTranslateSync = () => {
    const location = useLocation();
    const { i18n } = useTranslation();

    useEffect(() => {
        // Only trigger if we are not on the default language
        if (i18n.language !== 'fr') {
            const timer = setTimeout(() => {
                const gtSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (gtSelect) {
                    gtSelect.value = i18n.language;
                    gtSelect.dispatchEvent(new Event('change'));
                }
            }, 300); // Wait for the new page components to mount
            return () => clearTimeout(timer);
        }
    }, [location.pathname, i18n.language]);

    return null;
};

// Import des VRAIES pages
import Home from './pages/Home';
import Association from './pages/Association';
import Simulations from './pages/Simulations';
import Equipe from './pages/Equipe';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import Actualites from './pages/Actualites';

// Lazy load Admin to avoid loading Sanity Studio (which is heavy and can crash) on normal pages
const Admin = React.lazy(() => import('./pages/Admin'));

// Placeholder pour Ressources (pas encore créé)
const Ressources = () => <div className="section container" style={{ paddingTop: '120px' }}><h1>Ressources</h1><p>En construction...</p></div>;

const App: React.FC = () => {
    // Check if we are on the admin route BEFORE rendering the Router
    // This prevents Sanity's internal router from clashing with react-router-dom
    if (window.location.pathname.startsWith('/admin')) {
        return (
            <React.Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}>Chargement de l'espace administration...</div>}>
                <Admin />
            </React.Suspense>
        );
    }

    return (
        <Router>
            <GoogleTranslateSync />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/association" element={<Association />} />
                    <Route path="/simulations" element={<Simulations />} />
                    <Route path="/equipe" element={<Equipe />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="/ressources" element={<Ressources />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/confidentialite" element={<Confidentialite />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
