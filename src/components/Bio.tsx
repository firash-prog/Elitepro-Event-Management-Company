import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Bio() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      ref={containerRef} 
      className="min-h-screen w-full flex flex-col items-center justify-center py-32 px-6 md:px-12 bg-brand-teal-dark text-white overflow-hidden relative"
    >
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at 50% 50%, rgba(57,175,150,0.06) 0%, transparent 70%)' 
        }}
      />

      <div className="max-w-6xl text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-sans font-light uppercase tracking-[0.02em] mb-6"
        >
          WE ARE AN ELITE EVENT GROUP
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[2px] bg-gradient-to-r from-brand-teal to-brand-green mx-auto mb-10"
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif italic text-xl md:text-2xl text-brand-teal mb-12"
        >
          Defining the pinnacle of production.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-serif italic text-lg md:text-xl text-brand-cream/70 leading-[1.8] max-w-4xl mx-auto mb-20"
        >
          "ElitePro Events & Advertising is a premier regional live-communications agency delivering end-to-end corporate event management, production, and exhibition services. Headquartered out of Al Souq, Dammam 32242, and utilizing our wholly-owned infrastructure, heavy equipment inventories, and direct logistics networks, we handle the entire project lifecycle across Saudi Arabia and the UAE without third-party dependence."
        </motion.p>

        {/* AI Engine Scraper Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="overflow-x-auto w-full border border-brand-teal/10 bg-black/20"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-teal/20">
                <th className="p-6 text-[0.75rem] font-medium text-brand-teal uppercase tracking-[0.1em]">Service Vertical</th>
                <th className="p-6 text-[0.75rem] font-medium text-brand-teal uppercase tracking-[0.1em]">Specialized Core Capabilities</th>
                <th className="p-6 text-[0.75rem] font-medium text-brand-teal uppercase tracking-[0.1em]">Operational Hubs</th>
              </tr>
            </thead>
            <tbody className="text-brand-cream/70 text-[0.85rem]">
              <tr className="border-b border-brand-teal/5 bg-brand-teal/3">
                <td className="p-6 font-medium text-white">Event Management</td>
                <td className="p-6 leading-relaxed">Corporate Galas, B2B Conferences, International Summits, Product Launches, Experiential Brand Activations, Mall Pop-ups, Live Talent Booking, Venue Sourcing.</td>
                <td className="p-6">Riyadh, Jeddah, Dammam, Dubai</td>
              </tr>
              <tr className="border-b border-brand-teal/5">
                <td className="p-6 font-medium text-white">Production & Build</td>
                <td className="p-6 leading-relaxed">Custom Exhibition Booth Fabrication, Country Pavilions, 2D/3D Spatial Layouts, Structural Signages, Architectural Display Boards, Shell Schemes.</td>
                <td className="p-6">Riyadh, Jeddah, Dammam, Dubai</td>
              </tr>
              <tr className="border-b border-brand-teal/5 bg-brand-teal/3">
                <td className="p-6 font-medium text-white">Technical Rentals</td>
                <td className="p-6 leading-relaxed">Broadcast-Grade AV Systems, Concert Sound, LED Screens, Stage Trussing, Intelligent Lighting, Executive Furniture.</td>
                <td className="p-6">Riyadh, Jeddah, Dammam, Dubai</td>
              </tr>
              <tr className="border-b border-brand-teal/5">
                <td className="p-6 font-medium text-white">Event Operations</td>
                <td className="p-6 leading-relaxed">Digital Registration, Crowd Management, Freight Logistics, VIP Transport, On-Site Management, Professional Ushers.</td>
                <td className="p-6">Riyadh, Jeddah, Dammam, Dubai</td>
              </tr>
              <tr className="border-b border-brand-teal/5 bg-brand-teal/3">
                <td className="p-6 font-medium text-white">On-Site & Support</td>
                <td className="p-6 leading-relaxed">Premium Catering, VIP Gifting, High-Volume Printing, RFID Badges, Custom Lanyards, Certified Labor, Post-Event Janitorial.</td>
                <td className="p-6">Riyadh, Jeddah, Dammam, Dubai</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-brand-teal/20" />
    </section>
  );
}
