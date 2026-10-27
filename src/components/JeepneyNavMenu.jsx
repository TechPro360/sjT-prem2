import React, { useState, useEffect } from 'react';
import { X, Sparkles, MapPin, Compass, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

export default function JeepneyNavMenu({ isMuted, onToggleMute }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const menuItems = [
    {
      number: "01",
      title: "Cinematic Showcase",
      tagline: "The Golden Heartland of Nueva Ecija",
      description: "100% full-screen cinematic video capturing the agricultural beauty and mountain landscapes of San Jose City.",
      accent: "var(--seal-gold)",
      href: "#hero"
    },
    {
      number: "02",
      title: "Jeepney Route Safari",
      tagline: "Interactive Maharlika Highway Expedition",
      description: "Hop aboard the King of the Road and travel through key historical, agrarian, and scenic summit stops.",
      accent: "var(--seal-green)",
      href: "#jeepney-tour"
    },
    {
      number: "03",
      title: "Gateway Arch (KM 148)",
      tagline: "Northern Gateway to Onion Heartland",
      description: "The grand highway arch welcoming travelers to San Jose City as they enter from central Nueva Ecija.",
      accent: "#60A5FA",
      href: "#jeepney-tour"
    },
    {
      number: "04",
      title: "City Plaza & Cathedral",
      tagline: "KM 155 • Historic Spiritual Heart",
      description: "Home of St. Joseph Cathedral, heritage trees, and the vibrant cultural center of the city.",
      accent: "#E2B870",
      href: "#jeepney-tour"
    },
    {
      number: "05",
      title: "Diamond Park Overlook",
      tagline: "KM 172 • Caraballo Scenic Summit",
      description: "Climb stone steps in mountain pine groves to witness panoramic 360-degree views of Nueva Ecija plains.",
      accent: "var(--seal-crimson)",
      href: "#jeepney-tour"
    }
  ];

  const handleOpenMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 450);
  };

  const handleCloseMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 450);
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 
        TOP-RIGHT FLOATING JEEPNEY NAVIGATION TRIGGER BUTTON 
      */}
      <div 
        style={{
          position: 'fixed',
          top: 'clamp(18px, 4vh, 32px)',
          right: 'clamp(18px, 4vw, 36px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <button
          onClick={handleOpenMenu}
          aria-label="Open Navigation Menu"
          className="jeepney-trigger-btn"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '7px 18px 7px 10px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.18)',
            cursor: 'pointer',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isAnimating ? 'translateX(-120vw) scale(1.15)' : 'translateX(0)',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 18px 36px -10px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isAnimating ? 'translateX(-120vw)' : 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 30px -8px rgba(0, 0, 0, 0.18)';
          }}
        >
          {/* Jeepney Miniature Icon */}
          <div 
            style={{
              width: '42px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <img 
              src="/assets/jeepney.png" 
              alt="Philippine Jeepney"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2))'
              }}
              className="animate-jeepney-idle"
            />
          </div>

          <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)'
            }}>
              NAVIGATION
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-headline)',
              letterSpacing: '-0.01em'
            }}>
              MENU
            </div>
          </div>

          {/* Discreet animated pulse ring */}
          <span 
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--seal-green)',
              boxShadow: '0 0 10px var(--seal-green)'
            }} 
          />
        </button>
      </div>

      {/* 
        ANIMATION TRANSITION WIPER:
        When clicked, the jeepney wipes across to the left, pulling the full screen curtain!
      */}
      {isAnimating && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1099,
            backgroundColor: '#0A121A',
            transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform 0.45s cubic-bezier(0.77, 0, 0.175, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              color: '#FFFFFF'
            }}
          >
            <img 
              src="/assets/jeepney.png" 
              alt="Jeepney traveling"
              style={{
                width: '140px',
                height: 'auto',
                filter: 'drop-shadow(0 15px 25px rgba(0, 132, 61, 0.4))'
              }}
              className="animate-jeepney-idle"
            />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)'
            }}>
              BIYAHE SAN JOSE CITY...
            </div>
          </div>
        </div>
      )}

      {/* 
        FULL-SCREEN LUXURY EDITORIAL MENU PAGE OVERLAY (100% SCREEN COVERAGE)
      */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: '#0A121A',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            animation: 'fadeInMenu 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Top Bar inside Menu */}
          <div 
            style={{
              padding: 'clamp(20px, 4vh, 36px) clamp(20px, 5vw, 60px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Brand Logo & Coordinates */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src="/assets/san-jose-seal.png" 
                alt="San Jose Seal" 
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF'
                }}>
                  SAN JOSE CITY • NUEVA ECIJA
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.1em'
                }}>
                  15.7904° N, 120.9984° E • CARABALLO GATEWAY
                </div>
              </div>
            </div>

            {/* Right Controls: Sound & Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Sound Toggle */}
              {onToggleMute && (
                <button
                  onClick={onToggleMute}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                  }}
                >
                  {isMuted ? <VolumeX size={14} color="#FFC72C" /> : <Volume2 size={14} color="#00843D" />}
                  <span>{isMuted ? 'UNMUTE SOUND' : 'SOUND ON'}</span>
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={handleCloseMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--seal-crimson)';
                  e.currentTarget.style.borderColor = 'var(--seal-crimson)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <X size={15} />
                <span>CLOSE</span>
              </button>
            </div>
          </div>

          {/* Main Body: Editorial Menu Layout */}
          <div 
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(24px, 4vw, 60px)',
              padding: 'clamp(28px, 6vh, 60px) clamp(20px, 6vw, 80px)',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Numbered Editorial Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: ' clamp(10px, 2vh, 20px)' }}>
              {menuItems.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <a
                    href={item.href}
                    key={item.number}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={handleCloseMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'clamp(14px, 2.5vw, 24px)',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateX(10px)' : 'translateX(0)'
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: isHovered ? item.accent : 'rgba(255, 255, 255, 0.35)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {item.number}
                    </span>

                    <div style={{ flex: 1 }}>
                      <div 
                        style={{
                          fontFamily: 'var(--font-serif-luxury)',
                          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                          fontWeight: 400,
                          lineHeight: 1.1,
                          color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                          transition: 'color 0.25s ease'
                        }}
                      >
                        {item.title}
                      </div>
                      <div 
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: isHovered ? item.accent : 'rgba(255, 255, 255, 0.4)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginTop: '4px'
                        }}
                      >
                        {item.tagline}
                      </div>
                    </div>

                    <ArrowUpRight 
                      size={20} 
                      color={isHovered ? item.accent : 'transparent'} 
                      style={{ transition: 'all 0.25s ease', transform: isHovered ? 'translate(2px, -2px)' : 'none' }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Column: Editorial Focus Card */}
            <div 
              style={{
                position: 'relative',
                padding: 'clamp(24px, 4vh, 40px)',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} color="var(--seal-gold)" />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--seal-gold)'
                }}>
                  FEATURED DISCOVERY • ITEM {menuItems[hoveredIndex].number}
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.2
              }}>
                {menuItems[hoveredIndex].title}
              </div>

              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                {menuItems[hoveredIndex].description}
              </p>

              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '0.08em'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={12} color="var(--seal-green)" />
                  SAN JOSE CITY, NUEVA ECIJA
                </span>
                <span>PHILIPPINES</span>
              </div>
            </div>
          </div>

          {/* Footer Bar inside Menu */}
          <div 
            style={{
              padding: '18px clamp(20px, 5vw, 60px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.08em'
            }}
          >
            <div>© {new Date().getFullYear()} CITY TOURISM & CULTURAL AFFAIRS OFFICE</div>
            <div style={{ color: 'var(--seal-gold)' }}>WHERE NATURE MEETS HERITAGE</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInMenu {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
