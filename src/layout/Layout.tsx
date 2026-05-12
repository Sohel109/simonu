import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import EntranceAnimation from '../components/EntranceAnimation';
import ElegantHeader from '../components/ElegantHeader';
import FixedControls from '../components/FixedControls';
import GeopoliticsGenerator from '../components/GeopoliticsGenerator';
import '../i18n'; // Ensure i18n is initialized

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isGeopoOpen, setIsGeopoOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'white' }}>
            {/* Entrance Animation - Shows only on first load/refresh */}
            <EntranceAnimation />

            {/* Elegant Header (Fixed Top) */}
            <ElegantHeader />

            {/* Geopolitics Generator (Modal) */}
            <GeopoliticsGenerator
                isOpen={isGeopoOpen}
                onClose={() => setIsGeopoOpen(false)}
            />

            {/* Fixed Controls (Bottom Right) */}
            <FixedControls onOpenGeopo={() => setIsGeopoOpen(true)} />

            {/* Contenu Principal 
                - Elegant Header is fixed, but since it's transparent/minimal, we don't necessarily need huge padding unless content hides behind it.
                - For Home, we want map to go to top. For others, we might need padding.
            */}
            <main style={{
                flex: 1,
                position: 'relative',
                zIndex: 1,
                // On pages other than Home, add padding to avoid overlapping with fixed header elements if needed.
                // But header elements are small (Logo/Menu).
                paddingTop: isHome ? '0' : '100px'
            }}>
                {children}
            </main>

            {/* Pied de page */}
            <Footer />
        </div>
    );
};

export default Layout;
