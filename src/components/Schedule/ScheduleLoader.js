import React, { Suspense, lazy, useEffect, useState } from 'react';
import './Schedule.css'; // Keep the same styling

// Create a simple placeholder that matches the general layout
const SchedulePlaceholder = () => (
  <div className="schedule-container">
    <div className="schedule-header placeholder-shimmer">
      <h2>Event Schedule</h2>
    </div>
    <div className="schedule-content placeholder-shimmer">
      <div className="schedule-tabs-placeholder">
        <div className="tab-placeholder"></div>
        <div className="tab-placeholder"></div>
        <div className="tab-placeholder"></div>
      </div>
      <div className="schedule-body-placeholder">
        <div className="event-card-placeholder"></div>
        <div className="event-card-placeholder"></div>
        <div className="event-card-placeholder"></div>
      </div>
    </div>
  </div>
);

// Add this to your Schedule.css
const ScheduleLoaderStyles = () => (
  <style>{`
    .placeholder-shimmer {
      background: #5b8f8130;
      background-image: linear-gradient(
        to right,
        #5b8f8130 0%,
        #5b8f8160 20%,
        #5b8f8130 40%,
        #5b8f8130 100%
      );
      background-repeat: no-repeat;
      background-size: 800px 100%;
      animation: placeholderShimmer 1.5s linear infinite forwards;
    }
    
    @keyframes placeholderShimmer {
      0% {
        background-position: -468px 0;
      }
      100% {
        background-position: 468px 0;
      }
    }
    
    .schedule-tabs-placeholder {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .tab-placeholder {
      width: 120px;
      height: 40px;
      border-radius: 20px;
      background: #5b8f8130;
    }
    
    .schedule-body-placeholder {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .event-card-placeholder {
      height: 100px;
      border-radius: 10px;
      background: #5b8f8130;
      margin: 0 auto;
      width: 90%;
      max-width: 800px;
    }
  `}</style>
);

// Use this component in your main App.js in place of directly importing Schedule
const ScheduleLoader = () => {
  const [isReady, setIsReady] = useState(false);
  
  // Dynamically import the actual Schedule component
  const Schedule = lazy(() => 
    import('./Schedule').then(module => {
      // Small delay to ensure DOM is ready
      setTimeout(() => setIsReady(true), 100);
      return module;
    })
  );
  
  // Preload Schedule assets
  useEffect(() => {
    // Preload any images or other resources Schedule needs
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'script';
    preloadLink.href = '/static/js/schedule-chunk.js'; // This name is approximate
    document.head.appendChild(preloadLink);
    
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);
  
  return (
    <>
      <ScheduleLoaderStyles />
      <Suspense fallback={<SchedulePlaceholder />}>
        {isReady ? <Schedule /> : <SchedulePlaceholder />}
      </Suspense>
    </>
  );
};

export default ScheduleLoader;
