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
            gap: '12px',
            padding: '9px 20px 9px 14px',
            borderRadius: '999px',
            backgroundColor: '#080D14',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 199, 44, 0.35)',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -4px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--seal-green)';
            e.currentTarget.style.borderColor = 'var(--seal-emerald)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 132, 61, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#080D14';
            e.currentTarget.style.borderColor = 'rgba(255, 199, 44, 0.35)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(0, 0, 0, 0.35)';
          }}
        >
          {/* Jeepney Miniature Icon */}
          <div style={{ width: '38px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/assets/jeepney-cropped.png" 
              alt="Jeepney"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
              className="animate-jeepney-idle"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={14} color="var(--seal-gold)" />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              BACK / BALIK
            </span>
          </div>
        </button>
      </header>

      {/* Main Destination Showcase Content */}
      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(32px, 6vh, 60px) clamp(20px, 4vw, 40px)' }}>
        
        {/* Eyebrow & Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          backgroundColor: 'var(--seal-green-soft)',
          border: '1px solid rgba(0, 132, 61, 0.25)',
          marginBottom: '16px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--seal-emerald)', boxShadow: '0 0 8px var(--seal-emerald)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
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
            fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text-headline)',
            marginBottom: '10px'
          }}
        >
          {destination.name}
        </h1>

        <p 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(12px, 1.8vw, 15px)',
            color: 'var(--seal-gold-deep)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: 'clamp(24px, 4vh, 36px)'
          }}
        >
          {destination.subtitle}
        </p>

        {/* Hero Visual Banner (Luxury Framed Photography) */}
        <div 
          style={{
            position: 'relative',
            borderRadius: 'clamp(20px, 3.5vw, 32px)',
            overflow: 'hidden',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: 'clamp(36px, 5.5vh, 56px)',
            backgroundColor: '#0A121A'
          }}
        >
          <img 
            src={destination.image} 
            alt={destination.name}
            style={{
              width: '100%',
              height: 'clamp(340px, 54vh, 620px)',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Gradient Overlay & Badge */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8, 13, 20, 0.88) 0%, rgba(8, 13, 20, 0.2) 50%, transparent 100%)',
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
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--seal-gold)',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MapPin size={12} color="var(--seal-gold)" />
                OFFICIAL SAN JOSE CITY LANDMARK DOSSIER
              </div>
              <div style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 400
              }}>
                {destination.name} • Nueva Ecija
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}>
              <span style={{ color: 'var(--seal-gold)' }}>★</span>
              <span>MAHARLIKA AH26 CORRIDOR</span>
            </div>
          </div>
        </div>

        {/* Narrative & Details Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(32px, 5vw, 60px)',
            marginBottom: 'clamp(40px, 6vh, 64px)'
          }}
        >
          {/* Left Column: Story & History & Fast Facts */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
              fontWeight: 400,
              marginBottom: '16px',
              color: 'var(--text-headline)',
              lineHeight: 1.15
            }}>
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Curated</span> Heritage & Dispatch
            </h3>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              lineHeight: 1.85,
              color: 'var(--text-body)',
              marginBottom: '20px'
            }}>
              {destination.desc}
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.85,
              color: 'var(--text-body)',
              marginBottom: '32px'
            }}>
              {destination.details}
            </p>

            {/* Fast Facts Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '20px',
                borderRadius: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                  LOCATION
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--text-headline)' }}>
                  {destination.km.split('•')[0]}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                  CORRIDOR
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--text-headline)' }}>
                  Maharlika Hwy (AH26)
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                  BEST SEASON
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--seal-green-dark)' }}>
                  October to May
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                  ADMISSION
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--seal-gold-deep)' }}>
                  Open to Public
                </div>
              </div>
            </div>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 36px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--seal-green-dark)',
                marginBottom: '18px'
              }}>
                <Sparkles size={14} color="var(--seal-emerald)" />
                FEATURED HIGHLIGHTS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {destination.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--seal-green-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={15} color="var(--seal-green)" />
                    </div>
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
                padding: 'clamp(22px, 3.8vw, 32px)',
                border: '1.5px solid rgba(255, 199, 44, 0.4)',
                boxShadow: '0 12px 30px -10px rgba(217, 119, 6, 0.15)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--seal-gold-deep)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>💡</span>
                INSIDER TRAVEL DISPATCH
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--text-headline)', fontWeight: 500 }}>
                "{destination.tip}"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA to return */}
        <div 
          style={{
            padding: ' clamp(28px, 4vw, 42px)',
            borderRadius: '28px',
            backgroundColor: '#080D14',
            color: '#FFFFFF',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)',
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
              padding: '13px 32px',
              borderRadius: '999px',
              backgroundColor: 'var(--seal-green)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 8px 24px rgba(0, 132, 61, 0.45)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#10B981';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--seal-green)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 132, 61, 0.45)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Highway Safari</span>
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
