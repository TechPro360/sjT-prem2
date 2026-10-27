import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, MapPin, ArrowRight, Volume2, VolumeX, Shield, Award, Calendar, Flame, Mountain, Utensils } from 'lucide-react';

const HERITAGE_STORIES = [
  {
    id: 'tanduyong-festival',
    number: '01',
    category: 'CULTURAL SPECTACLE',
    title: 'The Tanduyong Festival: Symphony of Rhythm & Harvest',
    tagline: 'Celebrated every 4th Sunday of April • Central Luzon’s Greatest Agrarian Pageantry',
    image: '/assets/tanduyong_festival.jpg',
    badge: '★ 32 BARANGAYS UNITED',
    quote: 'An explosion of golden fibers, purple onion regalia, and thunderous drumlines celebrating agrarian pride.',
    description: 'Every April, the streets of San Jose City transform into a kaleidoscopic sea of celebration. Named after the revered "Tanduyong"—a prized indigenous variety of red onion—the festival is a vibrant thanksgiving for the bountiful harvest that sustains the region. Over 100,000 spectators gather to witness the Grand Street Dancing Competition, where performers in elaborate agrarian attire echo the heartbeat of Central Luzon.',
    fastFacts: [
      { label: 'Annual Date', value: 'Fourth Sunday of April' },
      { label: 'Signature Event', value: 'Grand Street Pageantry & Drumline' },
      { label: 'Costume Artistry', value: 'Woven rice husks & onion motifs' },
      { label: 'City Tradition', value: 'Agrarian Harvest Thanksgiving' }
    ]
  },
  {
    id: 'onion-heartland',
    number: '02',
    category: 'AGRI-TOURISM & GASTRONOMY',
    title: 'The Red Onion Heartland & Culinary Heritage',
    tagline: 'Producing over 80% of Central Luzon’s Red Onions • The Tanduyong Culinary Trail',
    image: '/assets/onion_harvest_culinary.jpg',
    badge: '🧅 ONION CAPITAL OF PH',
    quote: 'From volcanic mineral soils to world-renowned sweet bulb cultivars, every crop tells a story of devotion.',
    description: 'Nourished by the pure freshwater streams flowing down from the Caraballo Mountain watershed, San Jose City’s alluvial plains are the culinary engine of Northern Luzon. Renowned as the "Onion Capital of the Philippines," the city produces millions of metric tons of red and yellow onions, powering regional cuisine from artisanal caramelized onion jams to the famed savory-sweet Nueva Ecija Batutay longganisa.',
    fastFacts: [
      { label: 'Regional Output', value: '>80% of Central Luzon Onions' },
      { label: 'Culinary Icon', value: 'Nueva Ecija Batutay Longganisa' },
      { label: 'Storage Hub', value: 'Pioneer Cold Storage Terminal' },
      { label: 'Soil Character', value: 'Caraballo Alluvial Silt' }
    ]
  },
  {
    id: 'caraballo-summit',
    number: '03',
    category: 'MOUNTAIN EXPEDITION & ECO-WILDS',
    title: 'The Caraballo Mountain Gateway & Cloud Overlooks',
    tagline: '1,298M Peaks • Pine-Scented Ridge Trails • Diamond Park Observation Deck',
    image: '/assets/caraballo_summit_nature.jpg',
    badge: '⛰️ 1,298M ELEVATION',
    quote: 'Where the mist rolls across ancient volcanic ridges, guarding the gateway to the northern valleys.',
    description: 'San Jose City sits majestically at the geographical crossroads where the Central Luzon plains rise to meet the rugged grandeur of the Caraballo Mountain Range. Climbers and eco-travelers ascend through fragrant pine groves and multi-tiered stone stairways at Diamond Park to witness breathtaking 360-degree views of the mountain sea of clouds and the winding river valleys below.',
    fastFacts: [
      { label: 'Peak Elevation', value: '1,298 Meters (Caraballo Ridge)' },
      { label: 'Key Outlook', value: 'Diamond Park Stone Pavilion' },
      { label: 'Eco-Watershed', value: 'Tayabo & Palasapas Streams' },
      { label: 'Strategic Route', value: 'Gateway to Cagayan Valley (AH26)' }
    ]
  }
];

export default function ParallaxExperienceSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFestivalAudioPlaying, setIsFestivalAudioPlaying] = useState(false);
  const [counts, setCounts] = useState({ yield: 0, barangays: 0, elevation: 0, distance: 0 });
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Parallax Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate normalized progress of this section in viewport (0 to 1)
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);

      // Trigger counter animation once section is visible
      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        animateCounters();
      }
    };

    let hasAnimatedCounters = false;
    const animateCounters = () => {
      if (hasAnimatedCounters) return;
      hasAnimatedCounters = true;

      const duration = 1800;
      const startTime = performance.now();

      const updateNumbers = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // cubic easeOut

        setCounts({
          yield: Math.floor(ease * 82),
          barangays: Math.floor(ease * 32),
          elevation: Math.floor(ease * 1298),
          distance: Math.floor(ease * 160)
        });

        if (progress < 1) {
          requestAnimationFrame(updateNumbers);
        }
      };
      requestAnimationFrame(updateNumbers);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Mouse Parallax Tilt for Cards
  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  };

  const currentStory = HERITAGE_STORIES[activeStoryIdx];

  // Parallax offsets based on scroll progress
  const bgParallaxY = (scrollProgress - 0.5) * -120;
  const floatBadgeY = (scrollProgress - 0.5) * -180;
  const counterFloatY = (scrollProgress - 0.5) * 80;

  return (
    <section 
      id="heritage-saga"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#080D14',
        color: '#FFFFFF',
        padding: 'clamp(80px, 12vh, 150px) 0 clamp(60px, 10vh, 120px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* 
        PARALLAX AMBIENT GLOW & WATERMARK LAYER
      */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${bgParallaxY}px)`,
          width: '800px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 132, 61, 0.18) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: '-5%',
          transform: `translateY(${bgParallaxY * 0.8}px)`,
          fontFamily: 'var(--font-serif-luxury)',
          fontSize: 'clamp(8rem, 22vw, 24rem)',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.02)',
          letterSpacing: '0.12em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1
        }}
      >
        TANDUYONG
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header with Parallax Eyebrow */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto clamp(36px, 6vh, 60px)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(9px, 1.5vw, 11px)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--seal-gold)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            padding: '7px 18px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 199, 44, 0.3)',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
          }}>
            <Sparkles size={13} color="var(--seal-gold)" />
            KINETIC PARALLAX CHRONICLE • CULTURAL DISPATCH
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
            marginBottom: '14px'
          }}>
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>The Tanduyong Saga &</span>{' '}
            <span style={{ fontWeight: 600 }}>Heartland Lore</span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            Where the sacred peaks of the Caraballo Mountain Range embrace the world-renowned onion heartland. 
            Immerse yourself in three living pillars of culture, gastronomy, and raw natural grandeur.
          </p>

          {/* Interactive Festival Drumline Beat Simulator Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setIsFestivalAudioPlaying(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: isFestivalAudioPlaying ? 'var(--seal-green)' : 'rgba(255, 255, 255, 0.08)',
                border: isFestivalAudioPlaying ? '1px solid var(--seal-emerald)' : '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isFestivalAudioPlaying ? '0 0 25px rgba(16, 185, 129, 0.5)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '12px' }}>
                <span className="sound-bar" style={{ animationPlayState: isFestivalAudioPlaying ? 'running' : 'paused' }} />
                <span className="sound-bar" style={{ animationPlayState: isFestivalAudioPlaying ? 'running' : 'paused' }} />
                <span className="sound-bar" style={{ animationPlayState: isFestivalAudioPlaying ? 'running' : 'paused' }} />
              </div>
              <span>{isFestivalAudioPlaying ? 'FESTIVAL RHYTHM SIMULATOR ACTIVE' : 'ACTIVATE FESTIVAL DRUMLINE PULSE'}</span>
            </button>
          </div>
        </div>

        {/* 
          PILLAR SELECTION TABS WITH GLASSMORPHISM
        */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: 'clamp(32px, 5vh, 48px)'
          }}
        >
          {HERITAGE_STORIES.map((story, idx) => {
            const isActive = idx === activeStoryIdx;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIdx(idx)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  backgroundColor: isActive ? 'var(--seal-green)' : 'rgba(10, 20, 32, 0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: isActive ? '1.5px solid #34D399' : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 10px 30px rgba(16, 185, 129, 0.45)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  transform: isActive ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '9.5px',
                  color: isActive ? '#FFFFFF' : 'var(--seal-gold)',
                  opacity: isActive ? 0.95 : 0.85,
                  marginBottom: '2px',
                  textTransform: 'uppercase'
                }}>
                  PILLAR {story.number}
                </div>
                <div>{story.category.split('•')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* 
          FEATURED INTERACTIVE PARALLAX STAGE (Multi-Layered Showcase)
        */}
        <div 
          ref={el => cardRefs.current[0] = el}
          onMouseMove={(e) => handleMouseMove(e, 0)}
          onMouseLeave={() => handleMouseLeave(0)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(28px, 4.5vw, 56px)',
            backgroundColor: 'rgba(10, 20, 32, 0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 'clamp(24px, 4vw, 36px)',
            padding: 'clamp(24px, 4vw, 48px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
            transformStyle: 'preserve-3d',
            marginBottom: 'clamp(50px, 8vh, 90px)'
          }}
        >
          {/* Left Column: Visual Photography Showcase with Parallax Badges */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '380px' }}>
            <img 
              src={currentStory.image} 
              alt={currentStory.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: `scale(1.04) translateY(${scrollProgress * 20}px)`,
                transition: 'transform 0.4s ease-out'
              }}
            />

            {/* Gradient Scrim */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 13, 20, 0.9) 0%, rgba(8, 13, 20, 0.2) 60%, transparent 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Floating Top Badge with Parallax Offset */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                transform: `translateY(${floatBadgeY * 0.3}px)`,
                backgroundColor: 'rgba(8, 13, 20, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 199, 44, 0.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--seal-gold)',
                letterSpacing: '0.1em',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
              }}
            >
              {currentStory.badge}
            </div>

            {/* Bottom Caption Overlay */}
            <div 
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--seal-gold)',
                marginBottom: '4px'
              }}>
                {currentStory.category}
              </div>
              <div style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                color: '#FFFFFF',
                fontStyle: 'italic',
                lineHeight: 1.2
              }}>
                "{currentStory.quote}"
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Fast Facts HUD */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)',
              marginBottom: '10px'
            }}>
              <span>PILLAR 0{currentStory.number} OF 03</span>
              <span>•</span>
              <span>OFFICIAL HERITAGE DOSSIER</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              marginBottom: '12px'
            }}>
              {currentStory.title}
            </h3>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--seal-emerald)',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '18px'
            }}>
              {currentStory.tagline}
            </div>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.82)',
              marginBottom: '26px'
            }}>
              {currentStory.description}
            </p>

            {/* Fast Facts 4-Grid HUD */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                padding: '18px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '24px'
              }}
            >
              {currentStory.fastFacts.map((fact, fIdx) => (
                <div key={fIdx}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--seal-gold)',
                    marginBottom: '3px'
                  }}>
                    {fact.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Jump to Safari Route CTA */}
            <div>
              <a
                href="#jeepney-tour"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--seal-green)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0, 132, 61, 0.45)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10B981';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--seal-green)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Experience on Jeepney Safari</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* 
          ANIMATED KINETIC STATS PARALLAX BAR
        */}
        <div 
          style={{
            transform: `translateY(${counterFloatY}px)`,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            padding: 'clamp(28px, 4vw, 40px)',
            borderRadius: '28px',
            backgroundColor: 'rgba(8, 16, 26, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Stat 1 */}
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              color: 'var(--seal-emerald)',
              lineHeight: 1,
              marginBottom: '6px',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {counts.yield}%
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)'
            }}>
              CENTRAL LUZON ONION HARVEST
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              Premier Tanduyong Red Onion Yield
            </div>
          </div>

          {/* Stat 2 */}
          <div style={{ textAlign: 'center', padding: '10px', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '6px',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {counts.barangays}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)'
            }}>
              CULTURAL BARANGAYS
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              United in Agrarian Heritage & Festivals
            </div>
          </div>

          {/* Stat 3 */}
          <div style={{ textAlign: 'center', padding: '10px', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              color: 'var(--seal-gold)',
              lineHeight: 1,
              marginBottom: '6px',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {counts.elevation}M
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)'
            }}>
              CARABALLO MOUNTAIN RIDGE
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              Highest Mountain Frontier Peak
            </div>
          </div>

          {/* Stat 4 */}
          <div style={{ textAlign: 'center', padding: '10px', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '6px',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {counts.distance} KM
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--seal-gold)'
            }}>
              FROM METRO MANILA
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              Direct North on Maharlika Highway AH26
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
