import React, { useEffect, useState, useCallback, useRef } from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
    const [scroll, setScroll] = useState(0);
    const ticking = useRef(false);
    const progressBarRef = useRef(null);

    const calculateScrollPercentage = useCallback(() => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentScroll = window.scrollY;
        return Math.min(currentScroll / windowHeight, 1);
    }, []);

    const updateProgressBar = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const scrollPercentage = calculateScrollPercentage();
                setScroll(scrollPercentage);
                ticking.current = false;
            });
            ticking.current = true;
        }
    }, [calculateScrollPercentage]);

    useEffect(() => {
        const handleScroll = () => {
            updateProgressBar();
        };

        // Debounced resize handler
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateProgressBar();
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        updateProgressBar(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [updateProgressBar]);

    return (
        <div id="progressBarContainer" ref={progressBarRef}>
            <div 
                id="progressBar" 
                style={{
                    transform: `scaleX(${scroll})`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
        </div>
    );
};

export default ProgressBar;