import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 1 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-20 mix-blend-difference"
    >
      <div className="flex gap-10 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/70">
        <a href="#showcases" className="hover:text-brand-teal transition-colors">Portfolio</a>
        <a href="#rfq-engine" className="hover:text-brand-teal transition-colors">RFQ Engine</a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <a href="/" className="text-xl font-sans font-light tracking-[0.2em] text-white uppercase">
          ELITEPRO
        </a>
      </div>

      <div className="flex items-center gap-10">
        <div className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/70">
          <a href="#rfq-engine" className="hover:text-brand-teal transition-colors px-6 py-2 border border-brand-teal/30 hover:border-brand-teal transition-all">Launch RFQ</a>
        </div>
      </div>
    </motion.nav>
  );
}
