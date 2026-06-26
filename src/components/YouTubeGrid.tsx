import { useState } from 'react';
import { motion } from 'motion/react';

const youtubeVideos = [
  { id: '1', title: 'Global Innovation Summit 2024', category: 'Corporate', location: 'Riyadh' },
  { id: '2', title: 'Luxury Automotive Rollout', category: 'Activation', location: 'Dubai' },
  { id: '3', title: 'Industrial Trade Expo Build', category: 'Exhibition', location: 'Dammam' },
  { id: '4', title: 'Couture Fashion Gala Lights', category: 'Technical', location: 'Jeddah' }
];

export default function YouTubeGrid() {
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeVertical, setActiveVertical] = useState('All');

  const locations = ['All', 'Riyadh', 'Jeddah', 'Dammam', 'Dubai'];
  const verticals = ['All', 'Corporate', 'Exhibition', 'Activation', 'Technical'];

  return (
    <section className="py-32 px-6 md:px-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white uppercase font-sans font-light tracking-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            CROSS-PLATFORM AUTHORITY
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            Live project showcases synced from our YouTube channel
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`text-[0.75rem] font-medium uppercase tracking-widest pb-1 transition-all duration-300 border-b ${
                  activeLocation === loc ? 'text-brand-teal border-brand-teal' : 'text-brand-gray border-transparent hover:text-white'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <div className="hidden md:block w-px h-6 bg-brand-teal/20" />
          <div className="flex flex-wrap justify-center gap-4">
            {verticals.map(vert => (
              <button
                key={vert}
                onClick={() => setActiveVertical(vert)}
                className={`text-[0.75rem] font-medium uppercase tracking-widest pb-1 transition-all duration-300 border-b ${
                  activeVertical === vert ? 'text-brand-teal border-brand-teal' : 'text-brand-gray border-transparent hover:text-white'
                }`}
              >
                {vert}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {youtubeVideos
            .filter(video => (activeLocation === 'All' || video.location === activeLocation) && (activeVertical === 'All' || video.category === activeVertical))
            .map(video => (
              <motion.a
              key={video.id}
              href="https://youtube.com/@EliteproEventsAdvertising"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="relative aspect-video bg-brand-teal-dark overflow-hidden group"
            >
              <img 
                src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop`}
                alt={video.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-brand-teal/20 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center bg-brand-teal/10">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-brand-teal border-b-[8px] border-b-transparent translate-x-[2px]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[0.6rem] font-medium text-brand-teal uppercase tracking-widest mb-1 block">
                  {video.location} | {video.category}
                </span>
                <p className="text-white text-sm font-sans font-light uppercase tracking-tight">
                  {video.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
