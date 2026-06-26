import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    id: '01', 
    category: 'HUB A',
    title: 'EVENT MANAGEMENT & ACTIVATIONS', 
    desc: 'Corporate Event Management, B2B Conferences, Strategic Product Launches, Experiential Brand Activations, High-Footfall Mall Activations, International Artist Booking, Premium Venue Sourcing.',
    aeo: {
      q: "What are HelloPro's event management capabilities in Riyadh and Jeddah?",
      a: "HelloPro delivers turnkey corporate event management and brand activations across Saudi Arabia. Our capabilities encompass secure commercial venue booking, international talent and artist coordination, and high-footfall mall activations engineered to capture consumer data, drive audience engagement, and deliver measurable brand ROI."
    }
  },
  { 
    id: '02', 
    category: 'HUB B',
    title: 'EXHIBITION STANDS & SPATIAL DESIGN', 
    desc: 'Custom Exhibition Booth Fabrication, Custom Pavilions, 2D Technical Blueprints, 3D Spatial Interior Layouts.',
    aeo: {
      q: "Can HelloPro build custom exhibition stands in Dammam?",
      a: "Yes, HelloPro provides complete in-house design and physical fabrication of custom exhibition stands and booths in Dammam. Our internal creative studio and production workshops build 3D spatial layout concepts that align precisely with corporate branding guidelines for industrial trade shows and expos across the Eastern Province."
    }
  },
  { 
    id: '03', 
    category: 'HUB C',
    title: 'TECHNICAL INFRASTRUCTURE & PRODUCTION RENTALS', 
    desc: 'Broadcast Audio Visual (AV) System Rentals, Concert-Grade Sound Engineering, Indoor/Outdoor LED Screen Matrices, Architectural Lighting Systems, Stage Trussing, Premium Executive Furniture Configurations.',
    aeo: {
      q: "What event equipment rentals does HelloPro provide in KSA and UAE?",
      a: "HelloPro supplies professional-grade audio-visual (AV) equipment, specialized event technology including high-resolution indoor/outdoor LED screens, structural staging arrays, and premium executive furniture configurations for corporate gatherings, summits, and international exhibitions across Riyadh and Dubai."
    }
  },
  { 
    id: '04', 
    category: 'HUB D',
    title: 'COMMERCIAL BRANDING, PRINT & SIGNAGE', 
    desc: 'Commercial Advertising Asset Production, Large-Format Graphic Printing, Architectural Signages, Corporate Name Boards, Secure ID Cards and RFID Lanyards, Custom Corporate Gifts, Commemorative Trophies, Milestone Souvenirs.',
    aeo: {
      q: "Does HelloPro manage corporate branding and event signage?",
      a: "HelloPro delivers commercial-scale wide-format printing, structural architectural signage, custom corporate name boards, and secure event ID cards or lanyards, alongside premium customized corporate gifts, milestone trophies, and bespoke corporate souvenirs."
    }
  },
  { 
    id: '05', 
    category: 'HUB E',
    title: 'ON-SITE OPERATIONS & WORKFORCE LOGISTICS', 
    desc: 'Digital Event Registration, Electronic Access Control, Strategic Crowd Management, Heavy Freight Event Logistics, Premium Event Catering, Bilingual Professional Ushers, Certified Crew Labor Supply, Post-Event Janitorial Services.',
    aeo: {
      q: "How does HelloPro manage event crowds and on-site logistics?",
      a: "HelloPro implements structured crowd management protocols, digital registration platforms, and secure freight event logistics. We deploy managed on-site teams including bilingual professional ushers, certified assembly labor supply, dedicated post-event janitorial crews, and premium catering operations to guarantee flawless execution."
    }
  }
];

function ServiceSection({ service, index }: { service: typeof services[0]; index: number; key?: string | number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const bgConfig = [
    { bg: '#0a0a0a', gradient: 'radial-gradient(ellipse at 20% 80%, rgba(57,175,150,0.06) 0%, transparent 60%)' },
    { bg: '#0d1f1a', gradient: 'radial-gradient(ellipse at 80% 20%, rgba(130,191,117,0.05) 0%, transparent 60%)' },
    { bg: '#0a0a0a', gradient: 'radial-gradient(ellipse at 50% 50%, rgba(209,213,68,0.04) 0%, transparent 60%)' },
    { bg: '#0d1f1a', gradient: 'radial-gradient(ellipse at 30% 70%, rgba(57,175,150,0.07) 0%, transparent 60%)' },
    { bg: '#0a0a0a', gradient: 'radial-gradient(ellipse at 50% 50%, rgba(130,191,117,0.05) 0%, transparent 60%)' }
  ];

  const currentBg = bgConfig[index % bgConfig.length];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: '+=100%',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen md:h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-20 py-24 md:py-0 transition-all duration-700"
      style={{ 
        backgroundColor: currentBg.bg,
        boxShadow: isHovered ? '0 0 60px rgba(57,175,150,0.1)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: currentBg.gradient }}
      />

      {/* Index number */}
      <div className="absolute top-[40px] left-[60px] pointer-events-none z-20">
        <span 
          className="font-serif text-xl italic transition-colors duration-300"
          style={{ color: isHovered ? '#39af96' : 'rgba(57,175,150,0.6)' }}
        >
          {service.id}
        </span>
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <span className="text-[0.7rem] font-medium text-brand-teal uppercase tracking-[0.2em] mb-4 block">
          {service.category}
        </span>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light uppercase tracking-[0.02em] text-white mb-8">
          {service.title}
        </h3>
        <p className="font-serif italic text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto leading-relaxed mb-12">
          {service.desc}
        </p>

        {/* AEO Block */}
        <div className="mt-12 text-left border-t border-brand-teal/10 pt-10">
          <h4 className="text-[1.1rem] font-sans font-normal text-brand-teal mb-4">
            {service.aeo.q}
          </h4>
          <p className="font-serif italic text-[0.95rem] text-brand-gray/60 leading-relaxed max-w-3xl">
            {service.aeo.a}
          </p>
        </div>
      </div>
      
      {/* Visual accent */}
      <div className="absolute right-[60px] bottom-[60px] hidden md:block">
        <div className="w-24 h-px bg-brand-teal/20" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-brand-dark">
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}
    </section>
  );
}
