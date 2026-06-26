import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="inquire" className="bg-brand-dark text-white py-32 px-6 md:px-20 border-t border-brand-teal/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-24">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-sans font-light tracking-tighter mb-4 text-white uppercase">ELITEPRO</h2>
            <p className="text-brand-teal font-medium uppercase tracking-[0.1em] text-[0.7rem] mb-6">Events & Advertising</p>
            <p className="text-[0.85rem] text-brand-gray leading-relaxed max-w-xs mb-8">
              Premier regional live-communications agency delivering end-to-end corporate event management, production, and exhibition services.
            </p>
            <p className="text-[0.75rem] text-brand-gray/60 leading-relaxed">
              Al Souq, Dammam 32242,<br />Saudi Arabia
            </p>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center">
            <h3 className="text-brand-teal uppercase text-[0.7rem] tracking-[0.2em] mb-10">Quick Access</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <a href="#" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">Home</a>
              <a href="#services" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">Hubs</a>
              <a href="#services" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">Services</a>
              <a href="#showcases" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">Portfolio</a>
              <a href="#rfq-engine" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">RFQ Engine</a>
              <a href="#lab" className="text-[0.85rem] text-brand-gray hover:text-brand-teal transition-colors">The Lab</a>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-brand-teal uppercase text-[0.7rem] tracking-[0.2em] mb-10">Contact</h3>
            <a href="mailto:firash@eliteproeventsksa.com" className="text-xl md:text-2xl font-sans font-light hover:text-brand-teal transition-colors mb-2">
              firash@eliteproeventsksa.com
            </a>
            <a href="tel:+966537060245" className="text-xl md:text-2xl font-sans font-light hover:text-brand-teal transition-colors mb-10">
              +966 53 706 0245
            </a>
            
            <div className="flex gap-6">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/eliteproevents' },
                { name: 'LinkedIn', url: 'https://sa.linkedin.com/company/digital-soul-ksa' },
                { name: 'Twitter', url: 'https://x.com/eliteproevents' },
                { name: 'YouTube', url: 'https://youtube.com/@EliteproEventsAdvertising' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[0.7rem] uppercase tracking-[0.15em] text-brand-gray hover:text-brand-teal transition-all duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.65rem] font-medium opacity-40 uppercase tracking-[0.15em] text-brand-cream">
            © 2024 ElitePro Events & Advertising. All rights reserved.
          </p>
          <div className="text-right hidden md:block">
            <p className="text-[0.65rem] font-medium opacity-40 uppercase tracking-[0.15em] mb-2 text-brand-cream">Strategic Hubs</p>
            <p className="text-sm font-sans font-light text-white tracking-widest uppercase">RIYADH / JEDDAH / DAMMAM / DUBAI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
