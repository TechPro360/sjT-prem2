import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Pause, MapPin, Compass, ChevronDown, Award, Mountain } from 'lucide-react';

export default function HeroSection({ isMuted, onToggleMute }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
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

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Background editorial warmth transition
  const bgOpacity = Math.min(scrollProgress * 1.5, 1);

  // Watermark text ("SAN JOSE CITY") fades in softly behind the shrinking video
  const watermarkOpacity = Math.min(Math.max((scrollProgress - 0.15) * 0.14, 0), 0.05);

  // Shrunk editorial content (above and below) fades in as video shrinks
  const editorialContentOpacity = Math.min(Math.max((scrollProgress - 0.22) * 1.9, 0), 1);
  const editorialTranslateY = Math.max(32 - (scrollProgress - 0.22) * 50, 0);

  // Fullscreen overlay title (visible when video is at top/expanded, smoothly fades out as user scrolls)
  const fullscreenOverlayOpacity = Math.max(1 - scrollProgress * 3.8, 0);
  const fullscreenOverlayY = scrollProgress * -45;

  // Smooth exit fade as user scrolls past the hero into the next section
  const exitFade = scrollProgress > 0.82 ? Math.max(0, 1 - (scrollProgress - 0.82) * 5.5) : 1;

  return (
    <section 
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '280vh', // Generous sticky scroll travel
        backgroundColor: '#F8F7F4',
        margin: '0 0 clamp(80px, 14vh, 160px) 0',
        padding: 0
      }}
    >
      {/* 
        TOP FIXED CIVIC STATUS HUD (Left & Center)
        Displays official San Jose City seal badge + live audio capsule
      */}
      <div 
        style={{
          position: 'fixed',
          top: 'clamp(18px, 4vh, 32px)',
          left: 'clamp(18px, 4vw, 36px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {/* Official San Jose City Seal Badge */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 16px 7px 10px',
            borderRadius: '999px',
            backgroundColor: scrollProgress > 0.4 ? 'rgba(255, 255, 255, 0.94)' : 'rgba(8, 13, 20, 0.78)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrollProgress > 0.4 ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.22)',
            color: scrollProgress > 0.4 ? 'var(--text-headline)' : '#FFFFFF',
            boxShadow: scrollProgress > 0.4 ? '0 12px 28px -6px rgba(0, 0, 0, 0.12)' : '0 16px 36px -8px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img 
            src="/assets/san-jose-seal.png" 
            alt="Official Seal of San Jose City"
            style={{
              width: '26px',
              height: '26px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 5px rgba(0, 132, 61, 0.35))'
            }}
          />
          <div style={{ lineHeight: 1.15, textAlign: 'left' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: scrollProgress > 0.4 ? 'var(--seal-green-dark)' : 'var(--seal-gold)'
            }}>
              LUNGSOD NG SAN JOSE
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: scrollProgress > 0.4 ? 'var(--text-headline)' : '#FFFFFF'
            }}>
              OFFICIAL TOURISM
            </div>
          </div>
        </div>

        {/* Live Audio Capsule / Sound Toggle */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: scrollProgress > 0.4 ? 'rgba(255, 255, 255, 0.94)' : 'rgba(8, 13, 20, 0.78)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrollProgress > 0.4 ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.22)',
            color: scrollProgress > 0.4 ? 'var(--text-headline)' : '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: scrollProgress > 0.4 ? '0 12px 28px -6px rgba(0, 0, 0, 0.12)' : '0 16px 36px -8px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} color={scrollProgress > 0.4 ? 'var(--seal-crimson)' : 'var(--seal-gold)'} />
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '12px' }}>
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
                <span className="sound-bar" style={{ backgroundColor: 'var(--seal-emerald)' }} />
              </div>
              <span style={{ color: scrollProgress > 0.4 ? 'var(--seal-green-dark)' : 'var(--seal-gold)' }}>
                LIVE AUDIO
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
          backgroundColor: '#080D14'
        }}
      >
        {/* Soft luxury editorial background that fades in as video contracts */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 90% 60% at 50% 20%, rgba(255, 199, 44, 0.12) 0%, rgba(0, 132, 61, 0.05) 45%, transparent 75%), #F8F7F4',
            opacity: bgOpacity,
            pointerEvents: 'none',
            transition: 'opacity 0.1s linear',
            zIndex: 1
          }}
        />

        {/* Subtle Architectural Grid & Contour Texture */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(0, 132, 61, 0.08) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            opacity: bgOpacity * 0.7,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* 
          GIANT WATERMARK TYPOGRAPHY (São Tomé benchmark style)
          Displays "SAN JOSE CITY" in luxury serif letters behind the video
        */}
        <div 
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${(1 - scrollProgress) * 60}px)`,
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(5rem, 16vw, 18rem)',
            fontWeight: 300,
            letterSpacing: '0.14em',
            color: '#09131D',
            opacity: watermarkOpacity,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 2,
            transition: 'opacity 0.15s ease-out'
          }}
        >
          SAN JOSE CITY
        </div>

        {/* 
          FULLSCREEN INTRO OVERLAY (Visible on initial load, dissolves as user scrolls)
          Provides immediate cinematic wow factor before the video contracts
        */}
        {fullscreenOverlayOpacity > 0.01 && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 'clamp(36px, 8vh, 64px)',
              background: 'linear-gradient(to top, rgba(8, 13, 20, 0.88) 0%, rgba(8, 13, 20, 0.35) 40%, transparent 80%)',
              opacity: fullscreenOverlayOpacity,
              transform: `translateY(${fullscreenOverlayY}px)`,
              pointerEvents: 'none',
              transition: 'opacity 0.15s ease-out'
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '860px', padding: '0 20px' }}>
              {/* City Seal Floating Medallion */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '8px 20px 8px 12px',
                  borderRadius: '999px',
                  marginBottom: '16px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)'
                }}
              >
                <img 
                  src="/assets/san-jose-seal.png" 
                  alt="City Seal"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--seal-gold)'
                }}>
                  LALAWIGAN NG NUEVA ECIJA • REPUBLIKA NG PILIPINAS
                </span>
              </div>

              <h1 
                style={{
                  fontFamily: 'var(--font-serif-luxury)',
                  fontSize: 'clamp(2.8rem, 6.5vw, 5.6rem)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  textShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontStyle: 'italic', fontWeight: 300 }}>San Jose</span>{' '}
                <span style={{ fontWeight: 700 }}>City</span>
              </h1>

              <div 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(10px, 1.8vw, 13px)',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--seal-gold)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                  marginBottom: '20px'
                }}
              >
                THE GOLDEN HEARTLAND • GATEWAY TO CAGAYAN VALLEY
              </div>

              {/* Animated Scroll Down Prompt */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <span>SCROLL TO EXPLORE</span>
                <ChevronDown size={14} className="animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* 
          EDITORIAL HEADER ABOVE THE VIDEO (Appears as video contracts)
          Features PROMINENT Official San Jose City Seal Medallion + Luxury Typography
        */}
        <div 
          style={{
            position: 'absolute',
            top: 'clamp(14px, 3vh, 36px)',
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
            padding: '0 clamp(16px, 4vw, 32px)',
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {/* Prominent San Jose City Seal Medallion with Ornamental Dividers */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(12px, 3vw, 24px)',
              marginBottom: '8px'
            }}
          >
            {/* Left Symmetrical Gold Rule */}
            <div 
              style={{
                width: 'clamp(30px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--seal-gold-deep))'
              }} 
            />

            {/* The Official San Jose City Logo / Seal Medallion */}
            <div 
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'clamp(56px, 6.5vw, 72px)',
                height: 'clamp(56px, 6.5vw, 72px)',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                padding: '4px',
                boxShadow: '0 10px 28px -6px rgba(0, 132, 61, 0.35), 0 0 0 2px var(--seal-gold), 0 0 24px rgba(255, 199, 44, 0.35)',
                transition: 'transform 0.3s ease'
              }}
            >
              <img 
                src="/assets/san-jose-seal.png" 
                alt="Official Seal of San Jose City"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Right Symmetrical Gold Rule */}
            <div 
              style={{
                width: 'clamp(30px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(to left, transparent, var(--seal-gold-deep))'
              }} 
            />
          </div>

          {/* Civic Eyebrow Tag */}
          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(8px, 1.2vw, 10px)',
              letterSpacing: '0.24em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)',
              marginBottom: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--seal-emerald)' }} />
            REPUBLIKA NG PILIPINAS • LALAWIGAN NG NUEVA ECIJA • 15.7909° N, 120.9986° E
          </div>

          {/* Grand Civic Heading */}
          <h2 
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(1.9rem, 3.8vw, 3.4rem)',
              color: 'var(--text-headline)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              marginBottom: '4px'
            }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--seal-green-dark)' }}>Lungsod ng</span>{' '}
            <span style={{ fontWeight: 700 }}>San Jose</span>
          </h2>

          {/* Golden Subtitle */}
          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(8.5px, 1.3vw, 11px)',
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
          Upon scrolling: Smoothly shrinks into a centered luxury framed showcase with HUD overlays
        */}
        <div 
          onClick={handleTogglePlay}
          style={{
            position: 'relative',
            zIndex: 5,
            width: `clamp(320px, ${100 - scrollProgress * 38}vw, 100vw)`,
            height: `clamp(220px, ${100 - scrollProgress * 48}vh, 100vh)`,
            maxWidth: '100vw',
            maxHeight: '100vh',
            borderRadius: `${scrollProgress * 26}px`,
            overflow: 'hidden',
            boxShadow: scrollProgress > 0.04 
              ? `0 ${scrollProgress * 32}px ${scrollProgress * 80}px -15px rgba(0, 0, 0, ${0.25 + scrollProgress * 0.35}), 0 0 0 1px rgba(255, 199, 44, 0.4), 0 0 ${scrollProgress * 50}px rgba(0, 132, 61, 0.2)` 
              : 'none',
            border: scrollProgress > 0.1 ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
            transition: 'box-shadow 0.25s ease-out, border-radius 0.1s linear',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            margin: '0 auto',
            cursor: 'pointer'
          }}
        >
          {/* The Pure Video Element */}
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

          {/* Video Frame Frosted HUD Badges (Visible as video shrinks) */}
          {editorialContentOpacity > 0.3 && (
            <>
              {/* Top-Left: Live 4K Dispatch Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  zIndex: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(8, 13, 20, 0.72)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: editorialContentOpacity,
                  transition: 'opacity 0.2s ease'
                }}
              >
                <span 
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isPlaying ? 'var(--seal-emerald)' : 'var(--seal-crimson)',
                    boxShadow: `0 0 8px ${isPlaying ? 'var(--seal-emerald)' : 'var(--seal-crimson)'}`
                  }} 
                />
                <span>{isPlaying ? '4K CINEMATIC DISPATCH' : 'PAUSED'}</span>
              </div>

              {/* Bottom-Right: Interactive Play/Pause Pill Button */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  zIndex: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(8, 13, 20, 0.78)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.1em',
                  opacity: editorialContentOpacity,
                  transition: 'opacity 0.2s ease'
                }}
              >
                {isPlaying ? <Pause size={12} color="var(--seal-gold)" /> : <Play size={12} color="var(--seal-gold)" />}
                <span>{isPlaying ? 'CLICK TO PAUSE' : 'CLICK TO PLAY'}</span>
              </div>
            </>
          )}
        </div>

        {/* 
          EDITORIAL PROSE & CIVIC PILLARS BELOW THE VIDEO (Appears as video contracts)
          Rich authentic Filipino civic pride + 4 interactive heritage cards
        */}
        <div 
          style={{
            position: 'absolute',
            bottom: 'clamp(12px, 2.5vh, 28px)',
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
            padding: '0 clamp(16px, 4vw, 48px)',
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div style={{ maxWidth: '840px', width: '100%' }}>
            {/* 4 Authentic San Jose City Civic & Tourist Pillar Chips */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}
            >
              {[
                { label: 'TANDUYONG ONION CAPITAL', sub: '>80% Regional Output', icon: '🧅' },
                { label: 'CARABALLO GATEWAY', sub: 'Crossroads AH26', icon: '⛰️' },
                { label: '32 UNITED BARANGAYS', sub: '1969 Charter City', icon: '🏛️' },
                { label: '160 KM FROM MANILA', sub: 'Central Luzon Heart', icon: '📍' }
              ].map((chip, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 132, 61, 0.18)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <span style={{ fontSize: '11px' }}>{chip.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--seal-green-dark)'
                  }}>
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Authentic Poetic Heritage Motto */}
            <div 
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.15rem, 2vw, 1.55rem)',
                fontWeight: 600,
                color: 'var(--text-headline)',
                letterSpacing: '-0.01em',
                marginBottom: '4px'
              }}
            >
              <span style={{ fontStyle: 'italic' }}>"Bantayog ng Kasipagan, Lunduyan ng Kasaysayan at Kaunlaran"</span>
            </div>

            {/* Poetic Dispatch */}
            <p 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.85rem, 1.3vw, 0.98rem)',
                lineHeight: 1.55,
                color: 'var(--text-body)',
                maxWidth: '680px',
                margin: '0 auto 6px'
              }}
            >
              Cradled by the emerald peaks of the Caraballo Mountains and blessed with the fertile plains of Central Luzon,
              each landscape tells a story shaped by generations of pride, industry, and devotion.
            </p>

            {/* Scroll Down to Jeepney Tour Prompt */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--seal-green-dark)'
              }}
            >
              <span>BOARD THE VIRTUAL JEEPNEY TOUR BELOW</span>
              <ChevronDown size={13} className="animate-bounce" color="var(--seal-green)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}