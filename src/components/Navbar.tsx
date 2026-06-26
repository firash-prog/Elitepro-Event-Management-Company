import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 3 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12"
    >
      <div className="flex gap-8 text-xs font-display font-medium uppercase tracking-widest text-brand-gray">
        <a href="#showcases" className="hover:text-brand-teal transition-colors">showcases</a>
        <a href="#lab" className="hover:text-brand-teal transition-colors">the lab</a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <a href="/" className="text-xl font-display font-black tracking-tighter text-brand-teal">
          ELITE
        </a>
      </div>

      <div className="text-xs font-display font-medium uppercase tracking-widest text-brand-gray">
        <a href="#inquire" className="hover:text-brand-teal transition-colors underline underline-offset-4">inquire</a>
      </div>
    </motion.nav>
  );
}
