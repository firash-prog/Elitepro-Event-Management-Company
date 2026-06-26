import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Bio() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8 text-brand-dark">
          WE ARE AN ELITE EVENT GROUP <br />
          <span className="font-serif italic font-normal text-brand-teal capitalize">Defining the pinnacle of production.</span>
        </h2>
        <p className="text-lg md:text-xl text-brand-gray font-medium leading-relaxed">
          Specializing in high-production value corporate galas, premium product rollouts, and experiential brand activations. Our team of visionaries and technicians orchestrate complex logistical symphonies that transform spaces and captivate audiences globally.
        </p>
      </motion.div>

      <div className="flex-1 flex justify-end">
        <div className="w-px h-64 bg-brand-teal/30 hidden md:block" />
      </div>
    </section>
  );
}
