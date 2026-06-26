import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Lab() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section id="lab" ref={containerRef} className="py-40 bg-brand-dark text-brand-light relative overflow-hidden">
      {/* Parallax Backdrop Text - Split characters scattered */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.05] select-none font-display text-[25vw] leading-none tracking-[0.2em] font-extrabold z-0">
        <motion.div style={{ y: yParallax }} className="flex justify-around items-center px-10">
          <span className="translate-x-[-15%] translate-y-[-10%] text-brand-teal">E</span>
          <span className="translate-x-[10%] translate-y-[20%] text-brand-mint">L</span>
        </motion.div>
        <motion.div style={{ y: yParallax }} className="flex justify-center translate-y-[-5%] text-brand-yellow">
          <span>I</span>
        </motion.div>
        <motion.div style={{ y: yParallax }} className="flex justify-around items-center px-20">
          <span className="translate-x-[-10%] translate-y-[15%] text-brand-lime">T</span>
          <span className="translate-x-[20%] translate-y-[-10%] text-brand-teal">E</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-6">THE LAB</h2>
          <p className="text-base md:text-lg text-brand-light/70 max-w-xl mx-auto font-light leading-relaxed">
            Interactive structural proof-of-concepts, projection-mapping experiments, and internal production concepts.
          </p>
        </motion.div>
      </div>

      {/* Kinetic Marquee */}
      <div className="w-full overflow-hidden border-y border-brand-light/10 py-10 bg-black/20 backdrop-blur-sm relative z-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="font-display text-3xl md:text-4xl tracking-widest text-brand-teal uppercase">// DIGITAL EXPERIMENTATION</span>
              <div className="w-4 h-4 rounded-full bg-brand-teal shadow-[0_0_15px_rgba(38,187,164,0.5)]" />
              <span className="font-display text-3xl md:text-4xl tracking-widest text-brand-lime uppercase">SPATIAL TRACKING NODES</span>
              <div className="w-4 h-4 rounded-full bg-brand-lime/40" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
