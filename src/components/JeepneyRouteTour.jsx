import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import DestinationPage from './DestinationPage';

const DESTINATIONS = [
  {
    id: 'tayabo',
    stopNumber: 1,
    pct: 0,
    name: 'Tayabo Nature Park',
    subtitle: 'Freshwater Mountain Sanctuary & Eco-Reserve',
    desc: 'Nestled at the foothills of the Caraballo Mountain Range, Tayabo Nature Park features tranquil natural spring waters, mahogany and pine groves, and panoramic wooden viewing decks.',
    image: '/assets/tayabo_reserve.jpg',
    km: 'KM 164 • Maharlika Highway',
    tag: 'Eco-Tourism & Nature',
    highlights: ['Freshwater Spring Pools', 'Bamboo Raft Cruises', 'Pine Grove Hiking Trails', 'Caraballo Mountain Views'],
    details: 'Tayabo Nature Park is San Jose City\'s premier eco-tourism retreat. Spanning lush hectares of forested hills and crystal-clear spring reservoirs, it offers travelers an escape into pristine natural biodiversity just minutes off the national highway.',
    tip: 'Bring swimwear for the cool mountain spring pools, and rent a bamboo raft for scenic relaxation.'
  },
  {
    id: 'cathedral',
    stopNumber: 2,
    pct: 25,
    name: 'Saint Joseph the Worker Cathedral',
    subtitle: 'Sanctuary of Spiritual Legacy & Civic Heritage',
    desc: 'The historic heart of San Jose City, standing as a testament to faith, unity, and agrarian resilience since 1894 with its grand bell tower and peaceful plaza.',
    image: '/assets/cathedral_landmark.jpg',
    km: 'KM 155 • City Center Plaza',
    tag: 'Historical & Spiritual',
    highlights: ['Centennial Bell Tower', 'Historic Town Plaza', 'St. Joseph Feast Altar', 'Spanish-Era Heritage'],
    details: 'Serving as the seat of the Diocese of San Jose, this cathedral stands proudly at the center of civic and religious life. Built in honor of Saint Joseph the Worker, the revered patron saint of laborers and farmers.',
    tip: 'Visit in the late afternoon to experience the golden hour light filtering through the stained glass and enjoy local plaza delicacies.'
  },
  {
    id: 'palasapas',
    stopNumber: 3,
    pct: 50,
    name: 'Palasapas Falls',
    subtitle: 'Cascading Mountain Waters & Hidden Ravine Falls',
    desc: 'A hidden natural wonder tucked within the lush river ravines of San Jose, featuring tiered cold water cascades and emerald swimming basins surrounded by wild flora.',
    image: '/assets/palasapas_falls.jpg',
    km: 'KM 168 • East Mountain Foothills',
    tag: 'Adventure & Falls',
    highlights: ['Multi-Tier Cascades', 'Natural Rock Pools', 'Riverside Bouldering', 'Lush Forest Trekking'],
    details: 'Palasapas Falls is an idyllic outdoor haven for adventurous travelers. Fed by upstream mountain streams, its cool waters cascade down volcanic rock formations into crystal clear swimming pools perfect for a refreshing dip.',
    tip: 'Wear sturdy aqua shoes with good grip for the riverbed rocks and bring waterproof gear for electronics.'
  },
  {
    id: 'train-station',
    stopNumber: 4,
    pct: 75,
    name: 'Old San Jose Train Station',
    subtitle: 'PNR Heritage Site & Historic Northern Terminus',
    desc: 'The historic terminus of the Manila Railroad Company (PNR Northern Line) that once propelled San Jose into an agricultural boomtown connecting Central Luzon to Manila.',
    image: '/assets/pnr_train_station.jpg',
    km: 'KM 157 • Railroad District',
    tag: 'Industrial & Cultural Heritage',
    highlights: ['Historic Railway Tracks', 'American-Era Station Structure', 'Agrarian Trade Relics', 'Heritage Transit Monument'],
    details: 'Dating back to the golden era of rail transportation in the Philippines, the Old Train Station was the northernmost station of the PNR line. It served as the lifeblood of agrarian commerce, carrying millions of sacks of grain and red onions to Tutuban Manila.',
    tip: 'Great spot for vintage photography and learning about the locomotive history of Nueva Ecija.'
  },
  {
    id: 'placeholder-5',
    stopNumber: 5,
    pct: 100,
    name: 'Caraballo Cultural Reserve',
    subtitle: 'Future Cultural Heritage Landmark (Placeholder)',
    desc: 'A dedicated upcoming landmark celebrating the rich cultural tapestry, folklore, artisan traditions, and culinary heritage of San Jose City.',
    image: '/assets/cultural_reserve.jpg',
    km: 'KM 175 • Cultural Corridor',
    tag: 'Heritage Landmark (Placeholder)',
    highlights: ['Cultural Exhibition Center', 'Local Artisan Workshops', 'Agrarian Heritage Museum', 'Interactive Folk Displays'],
    details: 'This landmark space is slated for future cultural, recreational, and agrarian preservation developments in San Jose City, honoring the legacy of the Tanduyong festival and farming pioneers.',
    tip: 'Stay tuned for official city announcements and grand opening dates for this upcoming landmark!'
  }
];

export default function JeepneyRouteTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isWiping, setIsWiping] = useState(false);

  const containerRef = useRef(null);
  const roadTrackRef = useRef(null);
  const jeepneyRef = useRef(null);
  const progressLineRef = useRef(null);

  // Track sticky scroll progress through this section (0.0 to 1.0)
  // Smooth, continuous, responsive scroll (removed 2 full scrolls per stop)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      
      // Continuous travel percentage
      const travelPct = progress;

      // Determine active destination based on closest waypoint (0, 0.25, 0.5, 0.75, 1.0)
      let currentIdx = 0;
      if (progress >= 0.875) currentIdx = 4;
      else if (progress >= 0.625) currentIdx = 3;
      else if (progress >= 0.375) currentIdx = 2;
      else if (progress >= 0.125) currentIdx = 1;
      else currentIdx = 0;

      setActiveIndex(currentIdx);

      // Smoothly animate Jeepney along the highway line based on travelPct
      if (jeepneyRef.current && roadTrackRef.current) {
        const trackWidth = roadTrackRef.current.offsetWidth;
        const jeepWidth = jeepneyRef.current.offsetWidth;
        const maxTravel = Math.max(0, trackWidth - jeepWidth);
        const targetX = travelPct * maxTravel;

        gsap.to(jeepneyRef.current, {
          x: targetX,
          duration: 0.15,
          ease: "power1.out",
          overwrite: "auto"
        });

        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${travelPct * 100}%`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = DESTINATIONS[activeIndex];

  // Scroll to target destination on pill / dot click
  const scrollToDestination = (targetIndex) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
    
    const targetProgress = [0, 0.25, 0.50, 0.75, 1.0][targetIndex];
    const targetY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // Open Destination Page with loading-screen-style transition
  const handleOpenDestination = (destinationToOpen) => {
    setIsWiping(true);
    setTimeout(() => {
      setSelectedDestination(destinationToOpen || active);
      setIsWiping(false);
    }, 550);
  };

  const handleCloseDestination = () => {
    setIsWiping(true);
    setTimeout(() => {
      setSelectedDestination(null);
      setIsWiping(false);
    }, 450);
  };

  return (
    <>
      {/* 
        STICKY SCROLL PARENT CONTAINER:
        Smooth, natural 240vh scroll height for responsive steering without delay plateaus
      */}
      <section 
        id="jeepney-tour"
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '240vh',
          backgroundColor: '#0A121A',
          margin: 0,
          padding: 0
        }}
      >
        {/* 
          STICKY 100VH VIEWPORT CONTAINER
          Locked on screen while user scrolls through the 520vh parent
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
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0'
          }}
        >
          {/* 
            DYNAMIC DESTINATION BACKGROUND IMAGES LAYER:
            Seamlessly crossfades to the corresponding generated image as Jeepney arrives at each destination!
          */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            {DESTINATIONS.map((dest, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={dest.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
                    transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'opacity, transform'
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              );
            })}

            {/* Cinematic Scrim Overlay so Jeepney stage & typography remain crisp and vibrant */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(9, 19, 29, 0.25) 0%, rgba(8, 13, 20, 0.8) 100%), linear-gradient(to bottom, rgba(8, 13, 20, 0.65) 0%, rgba(8, 13, 20, 0.2) 50%, rgba(8, 13, 20, 0.78) 100%)',
                pointerEvents: 'none'
              }}
            />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '1240px' }}>
            
            {/* Section Header */}
            <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto clamp(10px, 1.8vh, 20px)' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(9px, 1.6vw, 11px)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--seal-gold)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                padding: '6px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                textTransform: 'uppercase',
                marginBottom: '8px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
              }}>
                <Navigation size={12} color="var(--seal-gold)" />
                EXPEDITION DISPATCH • MAHARLIKA HIGHWAY (AH26)
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)',
                marginBottom: '8px'
              }}>
                <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Ride the</span>{' '}
                <span style={{ fontWeight: 600 }}>Virtual Jeepney Safari</span>
              </h2>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(8, 13, 20, 0.55)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: 'clamp(12px, 1.6vw, 14px)',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
              }}>
                <span><strong>Scroll down</strong> to steer the King of the Road.</span>
                <span style={{ color: 'var(--seal-gold)', fontWeight: 700 }}>•</span>
                <span style={{ color: 'var(--seal-gold)', fontWeight: 700 }}>Click Jeepney at any stop to enter</span>
              </div>
            </div>

            {/* 
              THE HIGHWAY STAGE:
              Transparent stage container as requested (no opaque white card),
              allowing the scenic destination landscape to shine through unobstructed!
            */}
            <div 
              style={{
                backgroundColor: 'transparent',
                borderRadius: 'clamp(24px, 3.5vw, 36px)',
                padding: 'clamp(12px, 2vw, 20px) 0',
                boxShadow: 'none',
                border: 'none'
              }}
            >
              {/* Station Selection Pills (Luxury transit boarding cards) */}
              <div 
                className="hide-scrollbar"
                style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: '8px',
                  marginBottom: 'clamp(20px, 3vh, 36px)'
                }}
              >
                {DESTINATIONS.map((dest, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => scrollToDestination(idx)}
                      style={{
                        padding: '12px 18px',
                        borderRadius: '16px',
                        backgroundColor: isCurrent ? 'var(--seal-green)' : 'rgba(8, 16, 26, 0.72)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        textAlign: 'left',
                        minWidth: 'clamp(150px, 20vw, 205px)',
                        flex: '0 0 auto',
                        scrollSnapAlign: 'start',
                        border: isCurrent ? '1.5px solid #34D399' : '1px solid rgba(255, 255, 255, 0.14)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isCurrent 
                          ? '0 0 28px rgba(16, 185, 129, 0.45), 0 10px 25px rgba(0, 0, 0, 0.4)' 
                          : '0 6px 18px rgba(0, 0, 0, 0.35)',
                        cursor: 'pointer',
                        transform: isCurrent ? 'translateY(-2px)' : 'translateY(0)'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '9.5px',
                        color: isCurrent ? '#FFFFFF' : 'var(--seal-gold)',
                        opacity: isCurrent ? 0.95 : 0.85,
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontWeight: 700
                      }}>
                        <span>STOP 0{dest.stopNumber} • {dest.km.split('•')[0]}</span>
                        {isCurrent && (
                          <span 
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#34D399',
                              boxShadow: '0 0 8px #34D399'
                            }} 
                          />
                        )}
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontWeight: 700, 
                        fontSize: '12.5px',
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {dest.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 
                ROADWAY TRACK CONTAINER:
                1. Jeepney is rendered BEFORE the line (both in DOM and in visual layer zIndex).
                2. Exact closeness matching Image 1: Tires sit directly overlapping the highway line!
              */}
              <div 
                ref={roadTrackRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(130px, 18vw, 175px)',
                  marginBottom: '20px'
                }}
              >
                {/* 
                  1. THE JEEPNEY OBJECT:
                  - Rendered BEFORE the line in DOM order!
                  - zIndex: 15 (sits IN FRONT OF the line).
                  - Uses tightly-cropped /assets/jeepney-cropped.png (0px bottom padding).
                  - Bottom: 18px directly overlaps the 22px highway line, matching Image 1!
                */}
                <div 
                  ref={jeepneyRef}
                  onClick={() => handleOpenDestination(active)}
                  title={`Click Jeep to explore ${active.name}!`}
                  style={{
                    position: 'absolute',
                    bottom: '18px', // TIRES RESTING DIRECTLY ON TOP OF THE 22PX HIGHWAY LINE!
                    left: 0,
                    width: 'clamp(180px, 24vw, 270px)',
                    cursor: 'pointer',
                    zIndex: 15,
                    transformOrigin: 'bottom center'
                  }}
                >
                  <div className="animate-jeepney-idle" style={{ position: 'relative' }}>
                    {/* Jeepney Graphic with tires touching the bottom edge */}
                    <img 
                      src="/assets/jeepney-cropped.png" 
                      alt="Interactive Philippine Jeepney"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.45))'
                      }}
                    />
                  </div>
                </div>

                {/* 
                  2. THE HIGHWAY LINE:
                  - Rendered AFTER the Jeepney in DOM order!
                  - Pinned at bottom: 22px with height: 5px.
                  - The Jeepney tires overlap the top of this line just like Image 1!
                */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: 0,
                    right: 0,
                    height: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    borderRadius: '999px',
                    zIndex: 2,
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Active Colored Progress Fill (following the Jeepney) */}
                  <div 
                    ref={progressLineRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '0%',
                      background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 65%, #EF4444 100%)',
                      borderRadius: '999px',
                      boxShadow: '0 0 16px rgba(16, 185, 129, 0.7)'
                    }}
                  />

                  {/* Milestone Highway Notches (matching Image 1 tick marks) */}
                  {[0, 25, 50, 75, 100].map((mark) => (
                    <div 
                      key={`notch-${mark}`}
                      style={{
                        position: 'absolute',
                        left: `${mark}%`,
                        top: '-4px',
                        width: '2px',
                        height: '13px',
                        backgroundColor: (mark / 100) <= (activeIndex * 0.25) ? '#10B981' : 'rgba(255, 255, 255, 0.45)',
                        transform: 'translateX(-50%)',
                        borderRadius: '1px',
                        boxShadow: (mark / 100) <= (activeIndex * 0.25) ? '0 0 6px #10B981' : 'none'
                      }}
                    />
                  ))}

                  {/* Highway Station Marker Dots */}
                  {DESTINATIONS.map((dest, idx) => {
                    const isDotActive = idx <= activeIndex;
                    return (
                      <div 
                        key={dest.id}
                        onClick={() => scrollToDestination(idx)}
                        style={{
                          position: 'absolute',
                          left: `${dest.pct}%`,
                          top: '-6px',
                          width: '17px',
                          height: '17px',
                          borderRadius: '50%',
                          backgroundColor: isDotActive ? '#10B981' : 'rgba(255, 255, 255, 0.45)',
                          border: isDotActive ? '3px solid #FFFFFF' : '2.5px solid rgba(255, 255, 255, 0.8)',
                          transform: 'translateX(-50%)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: isDotActive ? '0 0 14px rgba(16, 185, 129, 0.8), 0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 6px rgba(0, 0, 0, 0.3)',
                          zIndex: 3
                        }}
                        title={dest.name}
                      />
                    );
                  })}
                </div>

                {/* Highway Route Milestone Labels (exact match to Image 1) */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(9px, 1.4vw, 10.5px)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: 'rgba(255, 255, 255, 0.72)',
                    textTransform: 'uppercase',
                    pointerEvents: 'none'
                  }}
                >
                  <span>KM 00 • START MILESTONE</span>
                  <span style={{ color: '#10B981', fontWeight: 800, textShadow: '0 0 8px rgba(16, 185, 129, 0.4)' }}>
                    MAHARLIKA HWY (AH26) ROUTE
                  </span>
                </div>
              </div>

              {/* 
                SLEEK ACTIVE DESTINATION STATUS STRIP:
                Refined presidential glass capsule legible over the scenic landmark photos!
              */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  padding: '16px 26px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(8, 16, 26, 0.78)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(16, 185, 129, 0.22)',
                    border: '1px solid rgba(16, 185, 129, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(16, 185, 129, 0.3)'
                  }}>
                    <MapPin size={19} color="#10B981" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--seal-gold)',
                      marginBottom: '2px'
                    }}>
                      CURRENT STOP: 0{active.stopNumber} OF 05 • {active.km} • {active.tag.toUpperCase()}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-serif-luxury)',
                      fontSize: 'clamp(1.45rem, 2.7vw, 1.95rem)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      lineHeight: 1.1
                    }}>
                      {active.name}
                    </div>
                  </div>
                </div>

                {/* Clickable CTA Button */}
                <button
                  onClick={() => handleOpenDestination(active)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '11px 24px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    color: '#080D14',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--seal-green)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 132, 61, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#080D14';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  <span>Click Jeep or Button to Enter</span>
                  <ExternalLink size={13} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 
        WHITE BACKGROUND DRIVE-AND-WIPE TRANSITION OVERLAY
        (Jeepney zooms across to the left, white screen wipes across 100% of the screen)
      */}
      {isWiping && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'whiteWipeIn 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            animation: 'jeepneyZoomLeft 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}>
            <img 
              src="/assets/jeepney.png" 
              alt="Jeepney traveling"
              style={{
                width: '160px',
                height: 'auto',
                filter: 'drop-shadow(0 15px 25px rgba(0, 132, 61, 0.3))'
              }}
              className="animate-jeepney-idle"
            />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--seal-green-dark)',
              fontWeight: 700
            }}>
              BIYAHENG {active.name.toUpperCase()}...
            </div>
          </div>
        </div>
      )}

      {/* 
        FULLSCREEN DESTINATION SHOWCASE PAGE
        (Opens when clicking Jeepney, with top-right Jeepney "BACK" button)
      */}
      {selectedDestination && (
        <DestinationPage 
          destination={selectedDestination} 
          onClose={handleCloseDestination} 
        />
      )}

      <style>{`
        @keyframes whiteWipeIn {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateX(0%);
          }
        }
        @keyframes jeepneyZoomLeft {
          0% {
            transform: translateX(60px) scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: translateX(0px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateX(-120px) scale(1.1);
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
}