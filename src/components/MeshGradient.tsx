import React from 'react';
import { motion } from 'framer-motion';

const MeshGradient: React.FC = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: '#ffffff', // Fallback
            zIndex: -1
        }}>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(at 0% 0%, hsla(210,100%,96%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(205,80%,90%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(200,100%,96%,1) 0, transparent 50%)'
            }} />

            {/* Animated Blobs */}
            {/* Blob 1 - Royal Blueish */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(9, 64, 103, 0.15) 0%, rgba(9, 64, 103, 0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }}
            />

            {/* Blob 2 - Goldish */}
            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }}
            />

            {/* Blob 3 - Light Blue */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '20%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(200, 220, 255, 0.4) 0%, rgba(200, 220, 255, 0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                }}
            />
        </div>
    );
};

export default MeshGradient;
