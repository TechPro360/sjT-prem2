import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import JeepneyNavMenu from './components/JeepneyNavMenu';
import HeroSection from './components/HeroSection';
import JeepneyRouteTour from './components/JeepneyRouteTour';
import ParallaxExperienceSection from './components/ParallaxExperienceSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize Lenis Smooth Inertial Scrolling (Awwwards standard)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleReplayLoader = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
  };

  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        backgroundColor: '#F7F6F2',
        overflowX: 'clip'
      }}
    >
      {/* 
        Awwwards-Level Philippine Jeepney Road Journey Loading Screen
      */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* 
        TOP-RIGHT JEEPNEY NAVIGATION & FULL-SCREEN WIPING MENU OVERLAY
      */}
      <JeepneyNavMenu 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute} 
      />

      {/* 
        MAIN CONTENT: 100VH STICKY SHRINK VIDEO + EXPANDED JEEPNEY SAFARI TOUR
      */}
      <main>
        {/* 100vh Fullscreen Video with Sticky Scroll Shrink into Framed Showcase */}
        <HeroSection 
          isMuted={isMuted} 
          onToggleMute={handleToggleMute} 
        />

        {/* Interactive Philippine Jeepney Route Tour Safari (Prominently Enlarged Jeep) */}
        <JeepneyRouteTour />

        {/* Dynamic Parallax Experience Section: Tanduyong Saga & Heartland Lore */}
        <ParallaxExperienceSection />
      </main>

      {/* Official City Tourism Footer */}
      <Footer onReplayLoader={handleReplayLoader} />
    </div>
  );
}
