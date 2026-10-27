import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Compass, Clock, Sparkles, CheckCircle2, Calendar, Share2 } from 'lucide-react';

export default function DestinationPage({ destination, onClose }) {
  // Prevent body scrolling when destination page is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!destination) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: '#FFFFFF',
        color: '#09131D',
        overflowY: 'auto',
        animation: 'destinationPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* 
        STICKY TOP BAR:
        Left: San Jose Official Seal & Breadcrumb
        Right: JEEPNEY BACK BUTTON (As requested: "button on the top right where the jeepney will be put and will say back")
      */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '14px clamp(18px, 4vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Brand & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/assets/san-jose-seal.png" 
            alt="San Jose City Seal" 
            style={{ width: '38px', height: '38px', objectFit: 'contain' }}
          />
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)'
            }}>
              SAN JOSE CITY • OFFICIAL TOURISM PORTAL
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-headline)'
            }}>
              Destination Showcase • Stop 0{destination.stopNumber}
            </div>
          </div>
        </div>

        {/* 
          TOP RIGHT EXIT BUTTON WITH JEEPNEY ICON
        */}
        <button
          onClick={onClose}
          aria-label="Back to Safari Map"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px 8px 12px',
            borderRadius: '999px',
            backgroundColor: '#0A121A',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--seal-green)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0A121A';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          {/* Jeepney Miniature Icon */}
          <div style={{ width: '36px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/assets/jeepney.png" 
              alt="Jeepney"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              className="animate-jeepney-idle"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ArrowLeft size={14} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              BACK / BALIK
            </span>
          </div>
        </button>
      </header>

      {/* Main Destination Showcase Content */}
      <main style={{ maxWidth: '1140px', margin: '0 auto', padding: 'clamp(32px, 6vh, 60px) clamp(20px, 4vw, 40px)' }}>
        
        {/* Eyebrow & Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: 'var(--seal-green-soft)',
          border: '1px solid rgba(0, 132, 61, 0.2)',
          marginBottom: '16px'
        }}>
          <MapPin size={13} color="var(--seal-green)" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--seal-green-dark)'
          }}>
            {destination.tag} • {destination.km}
          </span>
        </div>

        {/* Title Headline */}
        <h1 
          style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.6rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--text-headline)',
            marginBottom: '12px'
          }}
        >
          {destination.name}
        </h1>

        <p 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(12px, 2vw, 15px)',
            color: 'var(--seal-gold-deep)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 'clamp(24px, 4vh, 36px)'
          }}
        >
          {destination.subtitle}
        </p>

        {/* Hero Visual Banner (With fallback / placeholder image support) */}
        <div 
          style={{
            position: 'relative',
            borderRadius: 'clamp(18px, 3.5vw, 30px)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: 'clamp(32px, 5vh, 50px)',
            backgroundColor: '#0A121A'
          }}
        >
          <img 
            src={destination.image} 
            alt={destination.name}
            style={{
              width: '100%',
              height: 'clamp(320px, 52vh, 600px)',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Gradient Overlay & Badge */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9, 19, 29, 0.85) 0%, rgba(9, 19, 29, 0.15) 50%, transparent 100%)',
              pointerEvents: 'none'
            }}
          />

          <div 
            style={{
              position: 'absolute',
              bottom: 'clamp(20px, 4vw, 36px)',
              left: 'clamp(20px, 4vw, 36px)',
              right: 'clamp(20px, 4vw, 36px)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              color: '#FFFFFF'
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--seal-gold)',
                marginBottom: '4px'
              }}>
                LOCATION GUIDE
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                fontWeight: 700
              }}>
                {destination.name} • San Jose City
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600
            }}>
              <span>KM 148 - 172 ROUTE</span>
            </div>
          </div>
        </div>

        {/* Narrative & Details Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(40px, 6vh, 64px)'
          }}
        >
          {/* Left Column: Story & History */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
              fontWeight: 400,
              marginBottom: '16px',
              color: 'var(--text-headline)'
            }}>
              About This Destination
            </h3>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--text-body)',
              marginBottom: '18px'
            }}>
              {destination.desc}
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-body)'
            }}>
              {destination.details}
            </p>
          </div>

          {/* Right Column: Highlights & Visitor Tips Card */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Key Highlights */}
            <div 
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 36px)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--seal-green-dark)',
                marginBottom: '16px'
              }}>
                <Sparkles size={14} color="var(--seal-green)" />
                FEATURED HIGHLIGHTS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {destination.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="var(--seal-green)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-headline)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Transit Tip */}
            <div 
              style={{
                backgroundColor: 'var(--seal-gold-soft)',
                borderRadius: '24px',
                padding: 'clamp(20px, 3.5vw, 30px)',
                border: '1px solid rgba(255, 199, 44, 0.3)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--seal-gold-deep)',
                marginBottom: '8px'
              }}>
                COMMUTER / TRANSIT TIP
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-headline)' }}>
                {destination.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA to return */}
        <div 
          style={{
            padding: '36px',
            borderRadius: '24px',
            backgroundColor: '#0A121A',
            color: '#FFFFFF',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
            fontWeight: 400
          }}>
            Ready to continue the Virtual Jeepney Safari?
          </div>
          
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 28px',
              borderRadius: '999px',
              backgroundColor: 'var(--seal-green)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 8px 20px rgba(0, 132, 61, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Highway Route</span>
          </button>
        </div>
      </main>

      <style>{`
        @keyframes destinationPageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
