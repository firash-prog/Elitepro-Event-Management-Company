import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-teal/10 pt-20 pb-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <h2 className="text-xl font-sans font-light tracking-[0.2em] text-white uppercase mb-4">
              ELITEPRO
            </h2>
            <p className="text-white text-lg font-light uppercase tracking-widest mb-2">
              ElitePro Events & Advertising
            </p>
            <p className="text-brand-gray text-sm font-serif italic opacity-60">
              Premier regional live-communications agency
            </p>
          </div>

          {/* Column 2: Navigate & Hubs */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-brand-teal text-[0.75rem] font-medium tracking-[0.15em] uppercase mb-6">Navigate</h4>
              <nav className="flex flex-col gap-3">
                <a href="/" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Home</a>
                <a href="#about" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">About</a>
                <a href="#services" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Services</a>
                <a href="#showcases" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Portfolio</a>
                <a href="#rfq-engine" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">RFQ Engine</a>
              </nav>
            </div>
            <div>
              <h4 className="text-brand-teal text-[0.75rem] font-medium tracking-[0.15em] uppercase mb-6">Hubs</h4>
              <nav className="flex flex-col gap-3">
                <a href="#hub-riyadh" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Riyadh</a>
                <a href="#hub-jeddah" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Jeddah</a>
                <a href="#hub-dammam" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Dammam</a>
                <a href="#hub-dubai" className="text-brand-gray text-sm hover:text-brand-teal transition-colors">Dubai</a>
              </nav>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h4 className="text-brand-teal text-[0.75rem] font-medium tracking-[0.15em] uppercase mb-6">Contact</h4>
            <div className="text-brand-gray text-sm opacity-60 mb-6 space-y-1">
              <p>Al Souq, Dammam 32242</p>
              <p>Saudi Arabia</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="mailto:firash@eliteproeventsksa.com" className="text-white text-sm hover:text-brand-teal transition-colors">
                firash@eliteproeventsksa.com
              </a>
              <a href="tel:+966537060245" className="text-white text-sm hover:text-brand-teal transition-colors">
                +966 53 706 0245
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="flex justify-center gap-8 py-10 border-t border-b border-brand-teal/10 mb-10">
          {[
            { icon: <Instagram size={20} />, url: 'https://www.instagram.com/eliteproevents', label: 'Instagram' },
            { icon: <Linkedin size={20} />, url: 'https://sa.linkedin.com/company/digital-soul-ksa', label: 'LinkedIn' },
            { icon: <Twitter size={20} />, url: 'https://x.com/eliteproevents', label: 'X' },
            { icon: <Youtube size={20} />, url: 'https://youtube.com/@EliteproEventsAdvertising', label: 'YouTube' }
          ].map((social, i) => (
            <a 
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-12 h-12 flex items-center justify-center border border-brand-teal/20 text-brand-gray hover:text-brand-teal hover:border-brand-teal hover:shadow-[0_0_20px_rgba(57,175,150,0.15)] transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-[0.8rem] text-brand-gray opacity-40 tracking-wider">
          <p>© 2024 ElitePro Events & Advertising. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
