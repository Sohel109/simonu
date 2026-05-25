import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import EntranceAnimation from '../components/EntranceAnimation';
import ElegantHeader from '../components/ElegantHeader';
import FixedControls from '../components/FixedControls';
import '../i18n'; // Ensure i18n is initialized

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'white' }}>
            {/* Entrance Animation - Shows only on first load/refresh */}
            <EntranceAnimation />

            {/* Elegant Header (Fixed Top) */}
            <ElegantHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Fixed Controls (Bottom Right — language toggle only) */}
            <FixedControls isMenuOpen={isMenuOpen} />

            {/* Main content */}
            <main style={{
                flex: 1,
                position: 'relative',
                zIndex: 1,
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
