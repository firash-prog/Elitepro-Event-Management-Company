import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  sideImage1: string;
  sideImage2: string;
  desc: string;
}

const showcases: CaseStudy[] = [
  {
    id: '01',
    title: 'GLOBAL INNOVATION SUMMIT',
    category: 'TECH EXPERIENTIAL',
    mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=500',
    desc: 'Immersive mainstage environment for tech industry change-makers.'
  },
  {
    id: '02',
    title: 'COUTURE LUXURY GALA',
    category: 'PREMIUM HOSPITALITY',
    mainImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500',
    desc: 'High-fidelity spatial events for fashion & lifestyle pioneers.'
  },
  {
    id: '03',
    title: 'NEXT-GEN AUTOMOTIVE ROLLOUT',
    category: 'KINETIC STAGE MECHANICS',
    mainImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=500',
    desc: 'Bespoke kinetic stages and high-production value live system arrays.'
  }
];

function ShowcaseRow({ item, index }: { item: CaseStudy; index: number; key?: string | number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const indexRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const bgConfigs = [
    { 
      bg: 'linear-gradient(180deg, #0a0a0a 0%, #0d1f1a 100%)', 
      glow: 'radial-gradient(ellipse at 70% 30%, rgba(57,175,150,0.08) 0%, transparent 60%)',
      accent: '#39af96' 
    },
    { 
      bg: 'linear-gradient(180deg, #0d1f1a 0%, #0a1612 100%)', 
      glow: 'radial-gradient(ellipse at 30% 70%, rgba(130,191,117,0.06) 0%, transparent 60%)',
      accent: '#82bf75' 
    },
    { 
      bg: 'linear-gradient(180deg, #0a0a0a 0%, #0d1f1a 100%)', 
      glow: 'radial-gradient(ellipse at 50% 50%, rgba(209,213,68,0.05) 0%, transparent 60%)',
      accent: '#d1d544' 
    }
  ];

  const config = bgConfigs[index % bgConfigs.length];
  const accentYellow = '#fde12b';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pinning behavior
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Entrance Animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });

        tl.fromTo(imageRefs.current, 
          { opacity: 0, y: 80, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.9, 
            ease: 'power2.out',
            stagger: 0.2 
          }
        )
        .fromTo(contentRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          "-=0.5"
        )
        .fromTo(indexRefs.current,
          { opacity: 0 },
          { opacity: 0.6, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(lineRef.current,
          { width: 0 },
          { width: 40, duration: 0.6 },
          "-=0.2"
        );
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });

        tl.fromTo(imageRefs.current, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
        )
        .fromTo(contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: config.bg, zIndex: (index + 1) * 10 }}
    >
      {/* Soft Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: config.glow }}
      />

      {/* Index Numbers */}
      <div ref={el => indexRefs.current[0] = el} className="absolute top-[40px] left-[60px] z-50 hidden md:block">
        <span className="font-serif text-xl italic" style={{ color: 'rgba(57,175,150,0.5)' }}>{item.id}</span>
      </div>
      <div ref={el => indexRefs.current[1] = el} className="absolute bottom-[40px] right-[60px] z-50 hidden md:block">
        <span className="font-serif text-xl italic" style={{ color: 'rgba(57,175,150,0.5)' }}>/0{showcases.length}</span>
      </div>

      {/* Collage Layout - Desktop Only */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
        {/* Image 1: SideImage 1 - Left Large */}
        <div 
          ref={el => imageRefs.current[0] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="absolute left-[5%] top-[20%] w-[50%] h-[60%] pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.sideImage1} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Image 2: MainImage - Center Right Medium */}
        <div 
          ref={el => imageRefs.current[1] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="absolute right-[8%] top-[10%] w-[40%] h-[45%] z-20 pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.mainImage} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Image 3: SideImage 2 - Bottom Right Medium */}
        <div 
          ref={el => imageRefs.current[2] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="absolute right-[5%] bottom-[15%] w-[35%] h-[50%] z-30 pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.sideImage2} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile Image Stack */}
      <div className="flex flex-col gap-4 w-full px-6 md:hidden z-10 mb-8 max-h-[50vh] overflow-y-auto">
        <img src={item.sideImage1} className="w-full aspect-[4/3] object-cover" alt="" />
        <img src={item.mainImage} className="w-full aspect-[4/3] object-cover" alt="" />
        <img src={item.sideImage2} className="w-full aspect-[4/3] object-cover" alt="" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-40 text-center px-6 pointer-events-none">
        <div className="flex flex-col items-center mb-4">
          <span 
            className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-2 transition-colors duration-300"
            style={{ color: isHoveringImage ? accentYellow : config.accent }}
          >
            {item.category}
          </span>
          <div 
            ref={lineRef}
            className="h-px"
            style={{ 
              background: `linear-gradient(90deg, ${config.accent}, transparent)`
            }}
          />
        </div>
        <h3 
          className="font-sans uppercase leading-[0.95] tracking-[0.02em] transition-colors duration-500"
          style={{ 
            fontSize: 'clamp(2.5rem, 7vw, 6rem)', 
            fontWeight: 300,
            color: isHoveringImage ? '#39af96' : '#ffffff'
          }}
        >
          {item.title}
        </h3>
        <p className="font-serif italic text-brand-gray text-lg md:text-xl mt-8 max-w-xl mx-auto">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

const youtubeVideos = [
  { id: '1', title: 'Global Innovation Summit 2024', category: 'Corporate', location: 'Riyadh' },
  { id: '2', title: 'Luxury Automotive Rollout', category: 'Activation', location: 'Dubai' },
  { id: '3', title: 'Industrial Trade Expo Build', category: 'Exhibition', location: 'Dammam' },
  { id: '4', title: 'Couture Fashion Gala Lights', category: 'Technical', location: 'Jeddah' }
];

function YouTubeGrid() {
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeVertical, setActiveVertical] = useState('All');

  const locations = ['All', 'Riyadh', 'Jeddah', 'Dammam', 'Dubai'];
  const verticals = ['All', 'Corporate', 'Exhibition', 'Activation', 'Technical'];

  return (
    <section className="py-32 px-6 md:px-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white uppercase font-sans font-light tracking-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            CROSS-PLATFORM AUTHORITY
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            Live project showcases synced from our YouTube channel
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`text-[0.75rem] font-medium uppercase tracking-widest pb-1 transition-all duration-300 border-b ${
                  activeLocation === loc ? 'text-brand-teal border-brand-teal' : 'text-brand-gray border-transparent hover:text-white'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <div className="hidden md:block w-px h-6 bg-brand-teal/20" />
          <div className="flex flex-wrap justify-center gap-4">
            {verticals.map(vert => (
              <button
                key={vert}
                onClick={() => setActiveVertical(vert)}
                className={`text-[0.75rem] font-medium uppercase tracking-widest pb-1 transition-all duration-300 border-b ${
                  activeVertical === vert ? 'text-brand-teal border-brand-teal' : 'text-brand-gray border-transparent hover:text-white'
                }`}
              >
                {vert}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {youtubeVideos
            .filter(video => (activeLocation === 'All' || video.location === activeLocation) && (activeVertical === 'All' || video.category === activeVertical))
            .map(video => (
              <motion.a
              key={video.id}
              href="https://youtube.com/@EliteproEventsAdvertising"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="relative aspect-video bg-brand-teal-dark overflow-hidden group"
            >
              <img 
                src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop`}
                alt={video.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-brand-teal/20 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center bg-brand-teal/10">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-brand-teal border-b-[8px] border-b-transparent translate-x-[2px]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[0.6rem] font-medium text-brand-teal uppercase tracking-widest mb-1 block">
                  {video.location} | {video.category}
                </span>
                <p className="text-white text-sm font-sans font-light uppercase tracking-tight">
                  {video.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CaseStudies() {
  return (
    <section id="showcases" className="bg-brand-dark overflow-hidden">
      {showcases.map((item, i) => (
        <ShowcaseRow key={item.id} item={item} index={i} />
      ))}
      <YouTubeGrid />
    </section>
  );
}
