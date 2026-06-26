import { motion } from 'motion/react';

const hubs = [
  {
    city: "Riyadh",
    hub: "Riyadh Hub",
    desc: "Mega Corporate Summits, Government Forums, and High-Level Enterprise Productions.",
    base: false
  },
  {
    city: "Jeddah",
    hub: "Jeddah Hub",
    desc: "Experiential Brand Marketing, Premium Retail Pop-Ups, and High-Footfall Mall Activations.",
    base: false
  },
  {
    city: "Dammam",
    hub: "Dammam Hub",
    desc: "Industrial Trade Shows, Strategic Technical Logistics, and Custom Exhibition Stand Fabrication.",
    base: true
  },
  {
    city: "Dubai",
    hub: "Dubai Hub",
    desc: "Cross-Border International Activations, Premium AV Systems, and Multi-Market Corporate Deployments.",
    base: false
  }
];

export default function HubGrid() {
  return (
    <section className="py-32 px-6 md:px-20 bg-brand-teal-dark relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(57,175,150,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-white uppercase font-sans font-light tracking-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            OUR OPERATIONAL FOOTPRINT
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-brand-teal to-brand-green mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, i) => (
            <motion.div
              key={hub.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                borderColor: 'rgba(57,175,150,0.4)',
                boxShadow: '0 0 30px rgba(57,175,150,0.1)',
                transition: { duration: 0.3 }
              }}
              className="bg-black/40 border border-brand-teal/15 p-10 flex flex-col items-start text-left transition-all duration-300"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <h3 className="text-white text-xl md:text-2xl font-light uppercase tracking-tight">
                  {hub.city}
                </h3>
                {hub.base && (
                  <span className="text-[0.6rem] font-medium text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 px-2 py-1">
                    Operational Base
                  </span>
                )}
              </div>
              <p className="text-[0.9rem] text-brand-gray leading-relaxed">
                {hub.desc}
              </p>
              <div className="mt-8 w-8 h-px bg-brand-teal/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
