import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Event Management",
  "Custom Exhibition Stands",
  "Technical Audio-Visual",
  "Event Branding & Print",
  "On-Site Logistics & Support"
];

const locations = ["Riyadh", "Jeddah", "Dammam", "Dubai"];
const attendance = ["Under 250", "250 – 1,000", "1,000 – 5,000", "5,000+ Attendees"];

export default function RFQEngine() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');
  const [formData, setFormData] = useState({ company: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        pin: true,
        end: '+=100%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleService = (s: string) => {
    setSelectedServices(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!formData.company || !formData.email) return;
    setSubmitting(true);
    try {
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      await addDoc(collection(db, 'rfqs'), {
        ...formData,
        services: selectedServices,
        location: selectedLocation,
        attendance: selectedAttendance,
        status: 'new',
        created_at: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit project brief. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rfq-engine" ref={sectionRef} className="h-screen w-full flex flex-col items-center justify-center bg-brand-dark text-white relative overflow-hidden px-6">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(57,175,150,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-light uppercase tracking-tight text-white mb-4">
            {submitted ? 'THANK YOU' : 'START YOUR PROJECT'}
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            {submitted ? 'Our spatial engineering team will contact you shortly.' : 'Interactive multi-step project brief'}
          </p>
          {!submitted && (
            <div className="flex justify-center gap-4 mt-8">
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`w-12 h-1 transition-colors duration-500 ${step >= i ? 'bg-brand-teal' : 'bg-brand-teal/10'}`} 
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="bg-black/30 border border-brand-teal/10 p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-xl font-light text-white/90">Project brief successfully transmitted.</p>
                <button 
                  onClick={() => { setStep(1); setSubmitted(false); setSelectedServices([]); setSelectedLocation(''); setSelectedAttendance(''); setFormData({ company: '', email: '', phone: '' }); }}
                  className="px-8 py-3 border border-brand-teal/40 text-brand-teal text-[0.7rem] uppercase tracking-widest hover:bg-brand-teal/10 transition-all"
                >
                  Start New Brief
                </button>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <p className="text-[0.9rem] text-brand-teal uppercase tracking-widest">Step 01: Service Scope</p>
                    <p className="text-xl font-light text-white/90">Select the core service verticals required for your project:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {services.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleService(s)}
                          className={`px-6 py-4 text-[0.8rem] uppercase tracking-widest border transition-all duration-300 ${
                            selectedServices.includes(s) 
                            ? 'bg-brand-teal/15 border-brand-teal text-white' 
                            : 'bg-transparent border-brand-teal/30 text-brand-gray hover:border-brand-teal/60'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={nextStep}
                      disabled={selectedServices.length === 0}
                      className="mt-8 px-12 py-4 bg-gradient-to-r from-brand-teal to-brand-green text-black text-[0.85rem] font-medium tracking-[0.15em] uppercase border-none cursor-pointer disabled:opacity-30"
                    >
                      Next Step
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <p className="text-[0.9rem] text-brand-teal uppercase tracking-widest">Step 02: Geographic & Scale</p>
                    
                    <div className="space-y-6">
                      <p className="text-lg font-light text-white/90">Identify the operational location:</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {locations.map(loc => (
                          <button
                            key={loc}
                            onClick={() => setSelectedLocation(loc)}
                            className={`px-6 py-3 text-[0.8rem] uppercase tracking-widest border transition-all duration-300 ${
                              selectedLocation === loc 
                              ? 'bg-brand-teal text-black border-brand-teal' 
                              : 'bg-transparent border-brand-teal/30 text-brand-gray'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-lg font-light text-white/90">Anticipated scale:</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {attendance.map(a => (
                          <button
                            key={a}
                            onClick={() => setSelectedAttendance(a)}
                            className={`px-6 py-3 text-[0.8rem] uppercase tracking-widest border transition-all duration-300 ${
                              selectedAttendance === a 
                              ? 'bg-brand-teal text-black border-brand-teal' 
                              : 'bg-transparent border-brand-teal/30 text-brand-gray'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                      <button onClick={prevStep} className="px-8 py-3 border border-brand-teal text-brand-teal uppercase text-[0.7rem] tracking-widest">Back</button>
                      <button 
                        onClick={nextStep}
                        disabled={!selectedLocation || !selectedAttendance}
                        className="px-12 py-4 bg-gradient-to-r from-brand-teal to-brand-green text-black text-[0.85rem] font-medium tracking-[0.15em] uppercase border-none cursor-pointer disabled:opacity-30"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <p className="text-[0.9rem] text-brand-teal uppercase tracking-widest">Step 03: Contact Details</p>
                    <div className="flex flex-col gap-4 max-w-md mx-auto text-left">
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-black/50 border border-brand-teal/20 px-6 py-4 text-white font-sans focus:border-brand-teal outline-none transition-colors"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/50 border border-brand-teal/20 px-6 py-4 text-white font-sans focus:border-brand-teal outline-none transition-colors"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/50 border border-brand-teal/20 px-6 py-4 text-white font-sans focus:border-brand-teal outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-6 mt-10">
                      <button 
                        onClick={handleSubmit}
                        disabled={submitting || !formData.company || !formData.email}
                        className="px-16 py-5 bg-gradient-to-r from-brand-teal to-brand-green text-black text-[0.85rem] font-medium tracking-[0.15em] uppercase border-none cursor-pointer hover:shadow-[0_0_40px_rgba(57,175,150,0.3)] transition-all disabled:opacity-30"
                      >
                        {submitting ? 'Transmitting...' : 'Submit Project Brief'}
                      </button>
                      
                      <div className="pt-8 border-t border-brand-teal/10 w-full">
                        <p className="text-brand-gray text-[0.8rem] mb-4 uppercase tracking-widest">Prefer to speak directly?</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                          <a href="tel:+966537060245" className="text-brand-teal hover:underline transition-all font-sans">+966 53 706 0245</a>
                          <a href="mailto:firash@eliteproeventsksa.com" className="text-brand-teal hover:underline transition-all font-sans">firash@eliteproeventsksa.com</a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
