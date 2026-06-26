import { motion } from 'motion/react';

export default function Hero() {
  const containerVars = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 3.2
      }
    }
  };

  const itemVars = {
    initial: { y: '100%' },
    animate: {
      y: 0,
      transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 bg-brand-dark text-brand-light">
      <motion.div
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="text-[10px] uppercase tracking-[0.5em] font-mono text-brand-teal mb-8 font-bold"
        >
          // PRODUCTION ARCHITECTURE ENGINE
        </motion.p>

        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={itemVars}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-tight tracking-tighter uppercase text-brand-light"
          >
            ARCHITECTS <span className="font-serif italic lowercase font-normal text-brand-teal">of</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            variants={itemVars}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-tight tracking-tighter uppercase text-brand-light"
          >
            LUXURY EXPERIENCES
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xl font-light tracking-tight leading-relaxed text-brand-light/60">
            We engineer high-fidelity spatial events, blending ultra-wide structural set architecture with advanced dynamic production assets for forward-thinking brand partners.
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative floating bubbles with official colors */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-4 overflow-hidden pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 rounded-full blur-xl"
            style={{
              backgroundColor: i === 1 ? '#26BBA4' : i === 2 ? '#A0D526' : '#FCEE21',
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
