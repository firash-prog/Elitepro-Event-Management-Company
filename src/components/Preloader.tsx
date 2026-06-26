import { motion, AnimatePresence } from 'motion/react';
import { usePreloader } from '../hooks/usePreloader';

export default function Preloader() {
  const { progress, isLoaded } = usePreloader();
  const words = ['H', 'E', 'L', 'L', 'O'];

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
        >
          <div className="flex gap-2 sm:gap-4 overflow-hidden mb-12">
            {words.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{
                  y: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 },
                  opacity: { duration: 0.4 }
                }}
                className="text-6xl sm:text-8xl md:text-9xl font-display font-black text-brand-teal"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-brand-teal origin-left"
              style={{ scaleX: progress / 100 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-mono text-[0.6rem] text-brand-teal tracking-[0.4em] uppercase opacity-60"
          >
            Spatial Engineering Initializing {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
