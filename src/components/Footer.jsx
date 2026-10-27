import React from 'react';
import { RotateCcw, MapPin, Mail, Phone, Compass, ArrowUpRight } from 'lucide-react';

export default function Footer({ onReplayLoader }) {
  return (
    <footer 
      style={{
        backgroundColor: '#080D14',
        color: '#FFFFFF',
        paddingTop: 'clamp(60px, 8vh, 90px)',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        {/* Main Footer Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(40px, 6vh, 64px)'
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                position: 'relative',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                padding: '2px',
                background: 'linear-gradient(135deg, var(--seal-gold) 0%, var(--seal-green) 100%)',
                boxShadow: '0 0 20px rgba(0, 132, 61, 0.3)'
              }}>
                <img 
                  src="/assets/san-jose-seal.png" 
                  alt="San Jose City Official Seal" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', backgroundColor: '#FFFFFF' }}
                />
              </div>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '19px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF'
                }}>
                  SAN JOSE CITY
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: 'var(--seal-gold)',
                  textTransform: 'uppercase'
                }}>
                  NUEVA ECIJA • EST. 1894 • CHARTERED 1969
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '22px' }}>
              The Official Tourism Portal of San Jose City. Dedicated to celebrating the rich agrarian legacy, vibrant Tanduyong festival, and natural splendour of the Caraballo Mountain gateway.
            </p>

            {/* Replay loader button in footer */}
            <button
              onClick={onReplayLoader}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '10px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--seal-green)';
                e.currentTarget.style.borderColor = 'var(--seal-emerald)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <RotateCcw size={13} color="var(--seal-gold)" />
              <span>REPLAY LOADING JOURNEY</span>
            </button>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>✦</span> DESTINATION DIRECTORY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <li>
                <a href="#jeepney-tour" style={{ color: '#E2E8F0', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--seal-gold)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}>
                  <span>Tayabo Nature Park (KM 164)</span>
                </a>
              </li>
              <li>
                <a href="#jeepney-tour" style={{ color: '#E2E8F0', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--seal-gold)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}>
                  <span>St. Joseph the Worker Cathedral (KM 155)</span>
                </a>
              </li>
              <li>
                <a href="#jeepney-tour" style={{ color: '#E2E8F0', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--seal-gold)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}>
                  <span>Palasapas Falls (KM 168)</span>
                </a>
              </li>
              <li>
                <a href="#jeepney-tour" style={{ color: '#E2E8F0', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--seal-gold)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}>
                  <span>Old San Jose Train Station (KM 157)</span>
                </a>
              </li>
              <li>
                <a href="#jeepney-tour" style={{ color: '#E2E8F0', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--seal-gold)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}>
                  <span>Caraballo Cultural Reserve (KM 175)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Visitor Assistance */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>✦</span> TOURIST ASSISTANCE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="var(--seal-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>City Hall Complex, Maharlika Highway, San Jose City, Nueva Ecija 3121</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Phone size={16} color="var(--seal-emerald)" style={{ flexShrink: 0 }} />
                <span>(044) 958-8123 • Official Tourist Information Hotline</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Mail size={16} color="var(--seal-emerald)" style={{ flexShrink: 0 }} />
                <span>tourism@sanjosecity.gov.ph</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: '#64748B'
          }}
        >
          <div>
            © {new Date().getFullYear()} City Government of San Jose, Nueva Ecija. All Rights Reserved.
          </div>
          <div style={{ color: 'var(--seal-gold)' }}>
            ✦ Crafted for the Onion Capital of the Philippines • Biyahe Tayo!
          </div>
        </div>
      </div>
    </footer>
  );
}