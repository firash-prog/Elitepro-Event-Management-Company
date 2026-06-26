import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="inquire" className="bg-brand-dark text-brand-light py-24 px-6 md:px-12">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <p className="text-xs font-display font-bold uppercase tracking-[0.6em] text-brand-teal mb-8">Ready to initiate?</p>
          <a
            href="mailto:inquire@elitepro.com"
            className="text-4xl md:text-7xl lg:text-9xl font-display font-black uppercase tracking-tighter hover:text-brand-teal transition-colors duration-500"
          >
            INQUIRE
          </a>
        </motion.div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-16 border-t border-brand-light/10">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl font-display font-black tracking-tighter mb-2 text-brand-light">ELITEPRO</p>
            <p className="text-xs font-medium opacity-60 uppercase tracking-widest text-brand-gray">© 2026 Architectural Experience Lab</p>
          </div>

          <div className="flex gap-8 text-xs font-display font-bold uppercase tracking-widest opacity-80">
            <a href="#" className="hover:text-brand-teal transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-teal transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Twitter</a>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-xs font-medium opacity-60 uppercase tracking-widest text-brand-gray">Headquarters</p>
            <p className="text-sm font-display font-bold text-brand-teal">LONDON / DUBAI / NYC</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
