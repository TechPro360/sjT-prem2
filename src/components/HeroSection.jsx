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
        Exquisite Swiss-watch frosted glass capsule with live audio wave bars
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
            gap: '11px',
            padding: '9px 20px',
            borderRadius: '999px',
            backgroundColor: scrollProgress > 0.45 ? 'rgba(255, 255, 255, 0.94)' : 'rgba(8, 13, 20, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrollProgress > 0.45 ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.22)',
            color: scrollProgress > 0.45 ? 'var(--text-headline)' : '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: scrollProgress > 0.45 ? '0 14px 32px -8px rgba(0, 0, 0, 0.12)' : '0 16px 36px -8px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 18px 40px -8px rgba(0, 0, 0, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = scrollProgress > 0.45 ? '0 14px 32px -8px rgba(0, 0, 0, 0.12)' : '0 16px 36px -8px rgba(0, 0, 0, 0.35)';
          }}
        >
          {isMuted ? (
            <>
              <VolumeX size={15} color={scrollProgress > 0.45 ? 'var(--seal-crimson)' : 'var(--seal-gold)'} />
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
              </div>
              <span style={{ color: scrollProgress > 0.45 ? 'var(--seal-green-dark)' : 'var(--seal-gold)' }}>
                AUDIO LIVE
              </span>
              <span 
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--seal-emerald)',
                  boxShadow: '0 0 8px var(--seal-emerald)',
                  marginLeft: '2px'
                }} 
              />
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
          Vertical accent hairline rule + Luxury Title + Coordinates
        */}
        <div 
          style={{
            position: 'absolute',
            top: 'clamp(20px, 4.8vh, 52px)',
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
          {/* Coordinates Eyebrow */}
          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(8.5px, 1.4vw, 10px)',
              letterSpacing: '0.24em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)',
              marginBottom: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--seal-emerald)' }} />
            15.7909° N, 120.9986° E • NUEVA ECIJA, PHILIPPINES
          </div>

          {/* Vertical Hairline Accent Line */}
          <div 
            style={{
              width: '1px',
              height: 'clamp(16px, 3vh, 32px)',
              background: 'linear-gradient(to bottom, transparent, rgba(9, 19, 29, 0.4), transparent)',
              marginBottom: '10px'
            }}
          />

          <h2 
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2.1rem, 4.5vw, 3.8rem)',
              color: 'var(--text-headline)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '6px'
            }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>San Jose</span>{' '}
            <span style={{ fontWeight: 600 }}>City</span>
          </h2>

          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px, 1.6vw, 11px)',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold-deep)'
            }}
          >
            THE GOLDEN HEARTLAND • GATEWAY TO CAGAYAN VALLEY
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
              ? `0 ${scrollProgress * 32}px ${scrollProgress * 80}px -15px rgba(0, 0, 0, ${0.18 + scrollProgress * 0.3}), 0 0 ${scrollProgress * 40}px rgba(16, 185, 129, 0.15)` 
              : 'none',
            border: scrollProgress > 0.1 ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
            transition: 'box-shadow 0.25s ease-out, border-radius 0.1s linear',
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
          Luxury stats chips + São Tomé style prose and bilingual punchline
        */}
        <div 
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3.5vh, 38px)',
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
          <div style={{ maxWidth: '720px' }}>
            {/* Quick Stats Ribbon */}
            <div 
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              {['160 KM FROM MANILA', '32 BARANGAYS', 'TANDUYONG ONION CAPITAL'].map((chip, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--seal-green-dark)',
                    backgroundColor: 'rgba(0, 132, 61, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0, 132, 61, 0.15)'
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <p 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.92rem, 1.5vw, 1.12rem)',
                lineHeight: 1.65,
                color: 'var(--text-body)',
                marginBottom: '8px'
              }}
            >
              Cradled by the emerald peaks of the Caraballo Mountains and blessed with the fertile plains of Central Luzon, 
              each landscape tells a story shaped by generations of pride and devotion.
            </p>

            <div 
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                fontWeight: 600,
                color: 'var(--text-headline)',
                letterSpacing: '-0.01em',
                fontStyle: 'italic'
              }}
            >
              "Laissez-vous transporter. Laissez-vous transformer."
            </div>

            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--seal-green-dark)',
                marginTop: '4px'
              }}
            >
              ALLOW YOURSELF TO BE TRANSPORTED • WELCOME TO SAN JOSE CITY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}