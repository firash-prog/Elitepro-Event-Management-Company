import { useRef, useEffect, useState, FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, User, ArrowRight } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image_path: string;
  description: string;
  location: string;
  year: string;
  client?: string;
  is_featured?: boolean;
}

interface ShowcaseRowProps {
  item: CaseStudy;
  index: number;
  onExpand: (item: CaseStudy) => void;
}

const ShowcaseRow: FC<ShowcaseRowProps> = ({ item, index, onExpand }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        gsap.fromTo(imageRef.current, 
          { opacity: 0, x: 100, scale: 0.9 },
          { 
            opacity: 1, x: 0, scale: 1, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1
            }
          }
        );

        gsap.fromTo(contentRef.current,
          { opacity: 0, x: -50 },
          { 
            opacity: 1, x: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full min-h-screen md:h-screen flex items-center overflow-hidden py-24 md:py-0"
      style={{ background: config.bg }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: config.glow }} />
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div ref={contentRef} className="space-y-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[0.7rem] uppercase tracking-[0.3em] font-bold"
              style={{ color: config.accent }}
            >
              {item.category}
            </motion.span>
            <div ref={lineRef} className="h-px w-12" style={{ background: config.accent }} />
          </div>

          <h3 className="text-5xl md:text-8xl font-sans font-light tracking-tight text-white uppercase leading-[0.9]">
            {item.title}
          </h3>

          <p className="text-white/50 text-lg font-serif italic max-w-md leading-relaxed">
            {item.description.slice(0, 150)}...
          </p>

          <button 
            onClick={() => onExpand(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex items-center gap-4 text-white text-[0.7rem] uppercase tracking-[0.2em] font-bold border border-white/10 px-8 py-4 hover:border-brand-teal transition-all"
          >
            Explore Case Study
            <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
          </button>
        </div>

        <div 
          ref={imageRef}
          onClick={() => onExpand(item)}
          className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-pointer group"
        >
          <img 
            src={item.image_path} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Maximize2 size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 hidden md:block">
        <span className="text-white/10 text-9xl font-sans font-bold leading-none select-none">
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [projects, setProjects] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudy, setExpandedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CaseStudy[];
      setProjects(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (expandedStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [expandedStudy]);

  if (loading) {
    return (
      <div className="h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-white/20 uppercase tracking-[0.5em] text-[0.6rem] animate-pulse">
          Synchronizing Spatial Data
        </div>
      </div>
    );
  }

  return (
    <section id="showcases" className="bg-brand-dark relative">
      {projects.map((item: CaseStudy, i: number) => (
        <ShowcaseRow 
          key={item.id} 
          item={item} 
          index={i} 
          onExpand={setExpandedStudy}
        />
      ))}

      <AnimatePresence>
        {expandedStudy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-brand-dark overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setExpandedStudy(null)}
              className="absolute top-8 right-8 z-[110] p-4 bg-white/5 border border-white/10 text-white hover:bg-brand-teal hover:text-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Visual Section */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden flex-shrink-0">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                src={expandedStudy.image_path} 
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 h-full md:h-screen overflow-y-auto p-8 md:p-24 space-y-16 custom-scrollbar">
              <div className="space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand-teal text-[0.7rem] uppercase tracking-[0.4em] font-bold block"
                >
                  {expandedStudy.category}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-sans font-light tracking-tight text-white uppercase leading-none"
                >
                  {expandedStudy.title}
                </motion.h2>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-8 py-8 border-y border-white/5"
              >
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[0.6rem] text-white/30 uppercase tracking-widest">
                    <MapPin size={12} className="text-brand-teal" /> Location
                  </span>
                  <p className="text-white text-sm uppercase tracking-tight font-medium">{expandedStudy.location}</p>
                </div>
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[0.6rem] text-white/30 uppercase tracking-widest">
                    <Calendar size={12} className="text-brand-teal" /> Timeline
                  </span>
                  <p className="text-white text-sm uppercase tracking-tight font-medium">{expandedStudy.year}</p>
                </div>
                {expandedStudy.client && (
                  <div className="space-y-2">
                    <span className="flex items-center gap-2 text-[0.6rem] text-white/30 uppercase tracking-widest">
                      <User size={12} className="text-brand-teal" /> Client
                    </span>
                    <p className="text-white text-sm uppercase tracking-tight font-medium">{expandedStudy.client}</p>
                  </div>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold">The Challenge & Vision</h4>
                <p className="text-white/60 text-lg font-serif leading-relaxed italic">
                  {expandedStudy.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-10 bg-white/[0.02] border border-white/5 space-y-6"
              >
                <h4 className="text-[0.6rem] text-white uppercase tracking-widest font-bold">Spatial Engineering Specs</h4>
                <div className="space-y-4 text-[0.7rem] text-white/40 uppercase tracking-widest">
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span>Lighting Fidelity</span>
                    <span className="text-brand-teal">DMX-512 / Art-Net</span>
                  </p>
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span>Visual Array</span>
                    <span className="text-brand-teal">P2.5 LED / 8K Uncompressed</span>
                  </p>
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span>Audio Geometry</span>
                    <span className="text-brand-teal">L-Acoustics K2 System</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
