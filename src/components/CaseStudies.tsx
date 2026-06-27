import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  sideImage1: string;
  sideImage2: string;
  desc: string;
  location: string;
  date: string;
  client: string;
}

const showcases: CaseStudy[] = [
  {
    id: '01',
    title: 'GLOBAL INNOVATION SUMMIT',
    category: 'TECH EXPERIENTIAL',
    mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=500',
    desc: 'Immersive mainstage environment for tech industry change-makers.',
    location: 'Riyadh, KSA',
    date: 'March 2024',
    client: 'NeoTech Group'
  },
  {
    id: '02',
    title: 'COUTURE LUXURY GALA',
    category: 'PREMIUM HOSPITALITY',
    mainImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500',
    desc: 'High-fidelity spatial events for fashion & lifestyle pioneers.',
    location: 'Dubai, UAE',
    date: 'January 2024',
    client: 'Vogue Arabia'
  },
  {
    id: '03',
    title: 'NEXT-GEN AUTOMOTIVE ROLLOUT',
    category: 'KINETIC STAGE MECHANICS',
    mainImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000',
    sideImage1: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=500',
    sideImage2: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=500',
    desc: 'Bespoke kinetic stages and high-production value live system arrays.',
    location: 'Jeddah, KSA',
    date: 'February 2024',
    client: 'LuxeMotors'
  }
];

function ShowcaseRow({ item, index, onExpand, onImageClick }: { 
  item: CaseStudy; 
  index: number; 
  onExpand: (item: CaseStudy) => void;
  onImageClick: (url: string, allImages: string[]) => void;
  key?: string | number;
}) {
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
      <div className="absolute inset-0 w-full h-full z-10 hidden md:block">
        {/* Image 1: SideImage 1 - Left Large */}
        <div 
          ref={el => imageRefs.current[0] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          onClick={() => onImageClick(item.sideImage1, [item.sideImage1, item.mainImage, item.sideImage2])}
          className="absolute left-[5%] top-[20%] w-[50%] h-[60%] pointer-events-auto overflow-hidden group cursor-pointer"
        >
          <img 
            src={item.sideImage1} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="text-white/80" size={32} />
          </div>
        </div>

        {/* Image 2: MainImage - Center Right Medium */}
        <div 
          ref={el => imageRefs.current[1] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          onClick={() => onImageClick(item.mainImage, [item.sideImage1, item.mainImage, item.sideImage2])}
          className="absolute right-[8%] top-[10%] w-[40%] h-[45%] z-20 pointer-events-auto overflow-hidden group cursor-pointer"
        >
          <img 
            src={item.mainImage} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="text-white/80" size={32} />
          </div>
        </div>

        {/* Image 3: SideImage 2 - Bottom Right Medium */}
        <div 
          ref={el => imageRefs.current[2] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          onClick={() => onImageClick(item.sideImage2, [item.sideImage1, item.mainImage, item.sideImage2])}
          className="absolute right-[5%] bottom-[15%] w-[35%] h-[50%] z-30 pointer-events-auto overflow-hidden group cursor-pointer"
        >
          <img 
            src={item.sideImage2} 
            alt="" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
            style={{ filter: isHoveringImage ? 'saturate(1.1)' : 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="text-white/80" size={32} />
          </div>
        </div>
      </div>

      {/* Mobile Image Stack */}
      <div className="flex flex-col gap-4 w-full px-6 md:hidden z-10 mb-8 max-h-[50vh] overflow-y-auto">
        <img src={item.sideImage1} className="w-full aspect-[4/3] object-cover" alt="" />
        <img src={item.mainImage} className="w-full aspect-[4/3] object-cover" alt="" />
        <img src={item.sideImage2} className="w-full aspect-[4/3] object-cover" alt="" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef} 
        className="relative z-40 text-center px-6 pointer-events-auto cursor-pointer group"
        onClick={() => onExpand(item)}
      >
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

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <button 
            className="px-8 py-3 border border-brand-teal/40 text-brand-teal text-[0.75rem] uppercase tracking-widest hover:bg-brand-teal/10 hover:border-brand-teal transition-all"
          >
            View Project
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [expandedStudy, setExpandedStudy] = useState<CaseStudy | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; all: string[] } | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedStudy(null);
        setLightbox(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handlePrev = () => {
    if (!lightbox) return;
    const idx = lightbox.all.indexOf(lightbox.url);
    const prevIdx = (idx - 1 + lightbox.all.length) % lightbox.all.length;
    setLightbox({ ...lightbox, url: lightbox.all[prevIdx] });
  };

  const handleNext = () => {
    if (!lightbox) return;
    const idx = lightbox.all.indexOf(lightbox.url);
    const nextIdx = (idx + 1) % lightbox.all.length;
    setLightbox({ ...lightbox, url: lightbox.all[nextIdx] });
  };

  return (
    <section id="showcases" className="bg-brand-dark overflow-hidden relative">
      {showcases.map((item, i) => (
        <ShowcaseRow 
          key={item.id} 
          item={item} 
          index={i} 
          onExpand={setExpandedStudy}
          onImageClick={(url, all) => setLightbox({ url, all })}
        />
      ))}

      {/* Expanded View Overlay */}
      <AnimatePresence>
        {expandedStudy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 overflow-y-auto"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setExpandedStudy(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-6xl bg-brand-dark/50 border border-brand-teal/10 overflow-hidden z-10"
            >
              <button 
                onClick={() => setExpandedStudy(null)}
                className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Gallery */}
                <div className="relative h-[400px] lg:h-full overflow-hidden">
                  <img 
                    src={expandedStudy.mainImage} 
                    alt={expandedStudy.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    onClick={() => setLightbox({ url: expandedStudy.mainImage, all: [expandedStudy.mainImage, expandedStudy.sideImage1, expandedStudy.sideImage2] })}
                  />
                </div>

                {/* Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-brand-teal text-[0.75rem] font-medium tracking-[0.2em] uppercase mb-4">
                    {expandedStudy.category}
                  </span>
                  <h2 className="text-white text-4xl md:text-6xl font-sans font-light tracking-tight uppercase leading-[0.9] mb-8">
                    {expandedStudy.title}
                  </h2>
                  <p className="text-brand-gray text-lg font-serif italic mb-12">
                    {expandedStudy.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-8 mb-12">
                    <div>
                      <p className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-2">Location</p>
                      <p className="text-white text-sm uppercase tracking-tight">{expandedStudy.location}</p>
                    </div>
                    <div>
                      <p className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-2">Date</p>
                      <p className="text-white text-sm uppercase tracking-tight">{expandedStudy.date}</p>
                    </div>
                    <div>
                      <p className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-2">Client</p>
                      <p className="text-white text-sm uppercase tracking-tight">{expandedStudy.client}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 h-[120px]">
                    <img 
                      src={expandedStudy.sideImage1} 
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setLightbox({ url: expandedStudy.sideImage1, all: [expandedStudy.mainImage, expandedStudy.sideImage1, expandedStudy.sideImage2] })}
                    />
                    <img 
                      src={expandedStudy.sideImage2} 
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setLightbox({ url: expandedStudy.sideImage2, all: [expandedStudy.mainImage, expandedStudy.sideImage1, expandedStudy.sideImage2] })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95"
          >
            <div className="absolute inset-0" onClick={() => setLightbox(null)} />
            
            <button 
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-[210] p-3 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={32} />
            </button>

            <button 
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/30 hover:text-white transition-all"
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/30 hover:text-white transition-all"
            >
              <ChevronRight size={48} />
            </button>

            <motion.img 
              key={lightbox.url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightbox.url}
              className="max-w-full max-h-full object-contain relative z-[205]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
