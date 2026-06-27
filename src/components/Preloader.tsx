import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const words = ['E', 'L', 'I', 'T', 'E'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-teal overflow-hidden"
        >
          <div className="flex gap-2 sm:gap-4 overflow-hidden">
            {words.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                  y: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 },
                  scale: { duration: 0.4 },
                  opacity: { duration: 0.4 }
                }}
                className="text-6xl sm:text-8xl md:text-9xl font-display font-black text-brand-light"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
