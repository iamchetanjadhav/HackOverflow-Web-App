import "./FutureCityTheme.css";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";
import galaxyBg from "../../assets/img/galaxy.png";

// Lazy load Lottie component
const Lottie = lazy(() => import("lottie-react"));

const FutureCityTheme = () => {
  const [lottieData, setLottieData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLottieData = async () => {
      try {
        setLoadingError(false);
        const response = await fetch(
          'https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/animations/greenglobe.json',
          {
            signal,
            headers: {
              'Cache-Control': 'max-age=3600',
            }
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch animation');
        
        const data = await response.json();
        setLottieData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error loading Lottie animation:', error);
          setLoadingError(true);
          
          // Fallback to local static JSON if CDN fails
          try {
            const staticData = await import('../../assets/Lotties/greenglobe.json');
            setLottieData(staticData.default);
            setLoadingError(false);
          } catch (fallbackError) {
            console.error('Failed to load fallback animation:', fallbackError);
          }
        }
      }
    };

    fetchLottieData();

    return () => controller.abort();
  }, []);

  return (
    <div className="theme-container" id="themes" style={{ backgroundImage: `url(${galaxyBg})` }}>
      <div className="theme-wrapper">
        <AnimatePresence>
          <motion.div 
            className="header-with-globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            layout
          >
            <div className="theme-header">
              <motion.h1 
                className="theme-title"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span>Theme</span>
                <span>-</span>
                <span id="green-yellow">Dynamic World</span>
              </motion.h1>
            </div>

            <motion.div 
              className="globe-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Suspense fallback={<div className="globe-placeholder" />}>
                {!loadingError && lottieData ? (
                  <Lottie 
                    animationData={lottieData}
                    loop={true}
                    className="globe-animation"
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                    }}
                    onError={() => setLoadingError(true)}
                  />
                ) : (
                  <div className="globe-error">
                    <div className="globe-placeholder" />
                  </div>
                )}
              </Suspense>
            </motion.div>
          </motion.div>

          <motion.div 
            className="theme-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            layout
          >
            <h2 className="theme-subtitle" id="blue-cyan">
              The concept of Dynamic World by HackOverflow 3.0
            </h2>
            <div className="theme-description">
              <p>
                Welcome to the reign of invention, where your code transforms the world! HackOverflow 3.0
                is proud to present this year's{" "}
                <span id="blue-cyan" className="highlight">
                  Theme: Dynamic World
                </span>
                . The Dynamic World demands thinkers, problem-solvers,
                and disruptors who can break boundaries and create real-world impact.
              </p>
              <p>
                For the <span id="orange-pink">HackOverflow 3.0</span>, your mission is to unleash your brilliant ideas to develop projects that revolutionize urban living,
                transforming how we live, work, and interact with our environments.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FutureCityTheme;
