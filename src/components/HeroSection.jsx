import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSection({ isMuted, onToggleMute }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Sync video audio mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Track scroll position for pinned sticky contraction
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background editorial warmth transition
  const bgOpacity = Math.min(scrollProgress * 1.5, 1);

  // Watermark text ("SAN JOSE") fades in softly behind the shrinking video
  const watermarkOpacity = Math.min(Math.max((scrollProgress - 0.15) * 0.16, 0), 0.08);

  // Shrunk editorial content (above and below) fades in as video shrinks
  const editorialContentOpacity = Math.min(Math.max((scrollProgress - 0.28) * 1.7, 0), 1);
  const editorialTranslateY = Math.max(30 - (scrollProgress - 0.28) * 45, 0);

  // Smooth exit fade as user scrolls past the hero into the next section
  const exitFade = scrollProgress > 0.8 ? Math.max(0, 1 - (scrollProgress - 0.8) * 5) : 1;

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '280vh', // Generous sticky scroll travel
        backgroundColor: '#F7F6F2',
        margin: '0 0 clamp(80px, 14vh, 160px) 0',
        padding: 0
      }}
    >
      {/* 
        TOP-LEFT FLOATING SOUND / MUTE BUTTON (Fixed on screen)
      */}
      <div 
        style={{
          position: 'fixed',
          top: 'clamp(18px, 4vh, 32px)',
          left: 'clamp(18px, 4vw, 36px)',
          zIndex: 1000
        }}
      >
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '999px',
            backgroundColor: scrollProgress > 0.45 ? 'rgba(255, 255, 255, 0.92)' : 'rgba(10, 18, 26, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: scrollProgress > 0.45 ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.2)',
            color: scrollProgress > 0.45 ? 'var(--text-headline)' : '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 16px 36px -10px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 30px -8px rgba(0, 0, 0, 0.25)';
          }}
        >
          {isMuted ? (
            <>
              <VolumeX size={15} color={scrollProgress > 0.45 ? 'var(--seal-crimson)' : 'var(--seal-gold)'} />
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px' }}>
                <span className="sound-bar" />
                <span className="sound-bar" />
                <span className="sound-bar" />
                <span className="sound-bar" />
              </div>
              <span style={{ color: scrollProgress > 0.45 ? 'var(--seal-green-dark)' : 'var(--seal-gold)' }}>
                SOUND ON
              </span>
            </>
          )}
        </button>
      </div>

      {/* 
        STICKY VIEWPORT CONTAINER (100vh)
        Stays locked to screen while scrolling down through the 280vh parent
      */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A121A'
        }}
      >
        {/* Soft luxury editorial background that fades in as video contracts */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#F7F6F2',
            opacity: bgOpacity,
            pointerEvents: 'none',
            transition: 'opacity 0.1s linear',
            zIndex: 1
          }}
        />

        {/* 
          GIANT WATERMARK TYPOGRAPHY (São Tomé benchmark "BIENVENUE" effect)
          Displays "SAN JOSE" in massive, ethereal luxury serif letters behind the video
        */}
        <div 
          style={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${(1 - scrollProgress) * 50}px)`,
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(5rem, 18vw, 19rem)',
            fontWeight: 300,
            letterSpacing: '0.12em',
            color: '#0A121A',
            opacity: watermarkOpacity,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 2,
            transition: 'opacity 0.15s ease-out'
          }}
        >
          SAN JOSE
        </div>

        {/* 
          EDITORIAL HEADER ABOVE THE VIDEO (Appears outside video as it shrinks)
          Vertical accent hairline rule + "San Jose City" + "THE GOLDEN HEARTLAND"
        */}
        <div 
          style={{
            position: 'absolute',
            top: 'clamp(24px, 5.5vh, 56px)',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
            opacity: editorialContentOpacity,
            transform: `translateY(${editorialTranslateY * 0.5}px)`,
            pointerEvents: editorialContentOpacity > 0.5 ? 'auto' : 'none',
            padding: '0 20px',
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {/* Vertical Hairline Accent Line (from reference) */}
          <div 
            style={{
              width: '1px',
              height: 'clamp(20px, 3.8vh, 38px)',
              backgroundColor: 'rgba(9, 19, 29, 0.35)',
              marginBottom: '12px'
            }}
          />

          <h2 
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(1.9rem, 4.2vw, 3.5rem)',
              fontWeight: 400,
              color: 'var(--text-headline)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '6px'
            }}
          >
            San Jose City
          </h2>

          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px, 1.8vw, 11px)',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)'
            }}
          >
            THE GOLDEN HEARTLAND • NUEVA ECIJA
          </div>
        </div>

        {/* 
          THE CONTRACTING VIDEO FRAME
          At scrollProgress = 0: Exactly 100vw x 100vh (Pure edge-to-edge full screen)
          Upon scrolling: Smoothly shrinks into a centered luxury framed showcase
          NO TEXT ON THE VIDEO!
        */}
        <div 
          style={{
            position: 'relative',
            zIndex: 5,
            width: `clamp(320px, ${100 - scrollProgress * 38}vw, 100vw)`,
            height: `clamp(240px, ${100 - scrollProgress * 48}vh, 100vh)`,
            maxWidth: '100vw',
            maxHeight: '100vh',
            borderRadius: `${scrollProgress * 26}px`,
            overflow: 'hidden',
            boxShadow: scrollProgress > 0.04 
              ? `0 ${scrollProgress * 30}px ${scrollProgress * 70}px -15px rgba(0, 0, 0, ${0.15 + scrollProgress * 0.25})` 
              : 'none',
            border: scrollProgress > 0.1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
            transition: 'box-shadow 0.2s ease-out, border-radius 0.1s linear',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            margin: '0 auto'
          }}
        >
          {/* The Pure Video Element (Zero text on top!) */}
          <video
            ref={videoRef}
            src="/assets/san jose vd.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* 
          EDITORIAL PROSE BELOW THE VIDEO (Appears outside video as it shrinks)
          São Tomé style prose and punchline
        */}
        <div 
          style={{
            position: 'absolute',
            bottom: 'clamp(18px, 4.2vh, 44px)',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
            opacity: editorialContentOpacity * exitFade,
            transform: `translateY(${editorialTranslateY}px)`,
            pointerEvents: (editorialContentOpacity * exitFade) > 0.4 ? 'auto' : 'none',
            padding: '0 clamp(20px, 5vw, 60px)',
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <p 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'var(--text-body)',
                marginBottom: '10px'
              }}
            >
              Cradled by the emerald peaks of the Caraballo Mountains and blessed with the fertile plains of Central Luzon, 
              each landscape tells a story shaped by generations of pride and devotion.
            </p>
            <div 
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
                fontWeight: 700,
                color: 'var(--text-headline)',
                letterSpacing: '-0.01em'
              }}
            >
              Laissez-vous transporter. Laissez-vous transformer.
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--seal-green-dark)',
                marginTop: '6px'
              }}
            >
              ALLOW YOURSELF TO BE TRANSPORTED • WELCOME TO SAN JOSE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}