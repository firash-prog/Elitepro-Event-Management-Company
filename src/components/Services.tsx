import { motion } from 'motion/react';

const services = [
  { id: '01', title: 'Experiential Scenic Design', desc: 'Crafting immersive worlds through architectural set builds and spatial storytelling.' },
  { id: '02', title: 'Technical Production & AV', desc: 'State-of-the-art lighting, sound, and visual engineering for flawless execution.' },
  { id: '03', title: 'Global Guest Concierge Logistics', desc: 'Elite travel, accommodation, and ground support for international delegates.' },
  { id: '04', title: 'Immersive Spatial Technology', desc: 'Integrating AR/VR, projection mapping, and kinetic installations.' }
];

export default function Services() {
  return (
    <section className="py-32 px-6 md:px-12 bg-brand-soft text-brand-gray">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="sticky top-32">
          <p className="text-xs font-display font-bold uppercase tracking-[0.4em] text-brand-teal mb-6">Our Operations</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none text-brand-dark">
            ENGINEERING <br /> THE <span className="font-serif italic lowercase font-normal text-brand-teal">extraordinary</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group border-b border-brand-dark/10 py-12"
            >
              <div className="flex items-start gap-8">
                <span className="text-sm font-display font-bold text-brand-teal">{service.id}</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-4 group-hover:text-brand-teal transition-colors text-brand-dark">
                    {service.title}
                  </h3>
                  <p className="text-brand-gray max-w-md leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
