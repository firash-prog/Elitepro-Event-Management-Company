import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Lab() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        pin: true,
        end: '+=100%',
      });

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="lab" 
      ref={sectionRef} 
      className="h-screen w-full flex flex-col items-center justify-center bg-brand-teal-dark text-white relative overflow-hidden"
    >
      {/* Soft ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at 40% 60%, rgba(57,175,150,0.05) 0%, transparent 70%)' 
        }}
      />

      <div ref={contentRef} className="max-w-4xl text-center px-6 relative z-10">
        <h2 className="text-5xl md:text-8xl font-sans font-light uppercase tracking-tighter mb-8 text-white">
          THE LAB
        </h2>
        <p className="font-serif italic text-xl md:text-2xl text-brand-gray max-w-2xl mx-auto leading-relaxed mb-20">
          Interactive structural proof-of-concepts, projection-mapping experiments, and internal production concepts.
        </p>

        {/* Lab Items arranged as a grid with brand accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-left max-w-3xl mx-auto border-t border-white/10 pt-12">
          <div className="flex flex-col gap-2 group cursor-default">
            <span className="text-[0.75rem] font-medium tracking-[0.1em] text-brand-teal/40 uppercase group-hover:text-brand-teal transition-colors duration-300">// DIGITAL EXPERIMENTATION</span>
            <span className="text-lg text-brand-cream/70 font-sans">Structural Proof-of-Concepts</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-default">
            <span className="text-[0.75rem] font-medium tracking-[0.1em] text-brand-teal/40 uppercase group-hover:text-brand-teal transition-colors duration-300">// SPATIAL TRACKING NODES</span>
            <span className="text-lg text-brand-cream/70 font-sans">Kinetic Projection Mapping</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-default">
            <span className="text-[0.75rem] font-medium tracking-[0.1em] text-brand-teal/40 uppercase group-hover:text-brand-teal transition-colors duration-300">// R&D STAGE ASSETS</span>
            <span className="text-lg text-brand-cream/70 font-sans">Dynamic Production Loops</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-default">
            <span className="text-[0.75rem] font-medium tracking-[0.1em] text-brand-teal/40 uppercase group-hover:text-brand-teal transition-colors duration-300">// ENGINE PROTOCOL</span>
            <span className="text-lg text-brand-cream/70 font-sans">Real-time Visual Processing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
