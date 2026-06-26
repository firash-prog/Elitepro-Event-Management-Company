import { useRef, useEffect, useState } from 'react';
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
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const bgColor = index % 2 === 0 ? '#0a0a0a' : '#0f1f3a';
  const accentColor = '#d4a853';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pinning behavior for desktop
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
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
          { opacity: 0, y: 60, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            stagger: 0.15 
          }
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          "-=0.5"
        )
        .fromTo('.index-number', 
          { opacity: 0 },
          { opacity: 0.7, duration: 0.4 },
          "-=0.3"
        );
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile behavior: No pinning, standard entrance
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
        .fromTo(titleRef.current,
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
      className="relative w-full min-h-screen md:h-screen flex flex-col items-center justify-center overflow-hidden py-20 md:py-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* Index Numbering System */}
      <div className="hidden md:block absolute top-[40px] left-[60px] index-number pointer-events-none z-30">
        <span className="font-serif text-xl text-white/70 italic">{item.id}</span>
      </div>
      <div className="hidden md:block absolute bottom-[40px] right-[60px] index-number pointer-events-none z-30">
        <span className="font-serif text-xl text-white/70 italic">/0{showcases.length}</span>
      </div>

      {/* Image Collage Layout System - Mobile: Stacked, Desktop: Asymmetric Collage */}
      <div className="relative md:absolute inset-0 w-full h-full flex flex-col md:block items-center gap-8 md:gap-0 px-6 md:px-0 z-10 pointer-events-none">
        {/* Image 1 */}
        <div 
          ref={el => imageRefs.current[0] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="relative md:absolute md:left-[8%] md:top-[20%] w-full md:w-[32%] aspect-[3/4] z-10 pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.sideImage1} 
            alt="" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.05]" 
            style={{ filter: 'saturate(0.9)' }}
          />
        </div>

        {/* Image 2 (Hero Position) */}
        <div 
          ref={el => imageRefs.current[1] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="relative md:absolute md:right-[15%] md:bottom-[12%] w-full md:w-[35%] aspect-video md:aspect-square z-20 pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.mainImage} 
            alt="" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.05]"
            style={{ filter: 'saturate(0.9)' }}
          />
        </div>

        {/* Image 3 */}
        <div 
          ref={el => imageRefs.current[2] = el}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          className="relative md:absolute md:right-[10%] md:top-[12%] w-full md:w-[28%] aspect-[4/5] z-15 pointer-events-auto overflow-hidden"
        >
          <img 
            src={item.sideImage2} 
            alt="" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.05]"
            style={{ filter: 'saturate(0.9)' }}
          />
        </div>
      </div>

      {/* Project Title Typography - Positioned above collage on desktop */}
      <div 
        ref={titleRef}
        className="relative z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none mt-12 md:mt-0"
      >
        <span className="font-sans text-[0.75rem] font-medium text-white/60 uppercase tracking-[0.15em] mb-3">
          {item.category}
        </span>
        <h3 
          className="font-sans text-white uppercase leading-[0.95] tracking-[0.02em] transition-colors duration-500"
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 7rem)', 
            fontWeight: 300,
            color: isHoveringImage ? accentColor : '#ffffff'
          }}
        >
          {item.title}
        </h3>
        <p className="font-serif text-white/70 text-lg md:text-xl italic mt-6 max-w-lg">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="showcases" className="bg-black">
      {showcases.map((item, i) => (
        <ShowcaseRow key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}

