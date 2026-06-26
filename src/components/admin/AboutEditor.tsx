import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import FileUploader from './FileUploader';
import { Save, CheckCircle, Info, Target, Eye, Users } from 'lucide-react';

export default function AboutEditor() {
  const [data, setData] = useState({
    mission: '',
    vision: '',
    description: '',
    team_intro: '',
    stats: [
      { label: 'Events Completed', value: '150+' },
      { label: 'Creative Engineers', value: '25' },
      { label: 'Award Recognition', value: '12' }
    ],
    image_path: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'settings', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as any);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'about'), data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({ ...data, stats: newStats });
  };

  if (loading) return <div className="p-12 text-white/50 animate-pulse uppercase tracking-[0.2em] text-[0.7rem]">Loading brand parameters...</div>;

  return (
    <div className="p-8 md:p-12 max-w-5xl space-y-12">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-2">Brand Storytelling</h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">Engineer the narrative of Elite Pro Events</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-3 px-8 py-3 transition-all duration-300 font-medium uppercase tracking-[0.2em] text-[0.7rem] ${
            saved 
              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
              : 'bg-brand-teal text-black hover:opacity-90'
          }`}
        >
          {saving ? "Saving..." : saved ? <><CheckCircle size={16} /> Saved</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-brand-teal">
              <Info size={16} />
              <h3 className="text-[0.7rem] uppercase tracking-[0.3em] font-bold">The Narrative</h3>
            </div>
            <div className="space-y-4">
              <label className="text-[0.65rem] text-white/40 uppercase tracking-widest block">Main Description</label>
              <textarea 
                rows={8}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-6 text-white text-sm font-serif leading-relaxed italic outline-none focus:border-brand-teal transition-all resize-none"
                placeholder="Our story begins with a vision of spatial perfection..."
              />
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-teal">
                <Target size={16} />
                <h3 className="text-[0.65rem] uppercase tracking-widest font-bold">Mission</h3>
              </div>
              <textarea 
                rows={4}
                value={data.mission}
                onChange={(e) => setData({ ...data, mission: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs leading-relaxed outline-none focus:border-brand-teal transition-all resize-none"
                placeholder="Our mission is to engineer high-fidelity spatial events..."
              />
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-teal">
                <Eye size={16} />
                <h3 className="text-[0.65rem] uppercase tracking-widest font-bold">Vision</h3>
              </div>
              <textarea 
                rows={4}
                value={data.vision}
                onChange={(e) => setData({ ...data, vision: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs leading-relaxed outline-none focus:border-brand-teal transition-all resize-none"
                placeholder="To define the future of experiential architecture..."
              />
            </section>
          </div>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-brand-teal">
              <Users size={16} />
              <h3 className="text-[0.7rem] uppercase tracking-[0.3em] font-bold">Human Capital</h3>
            </div>
            <FileUploader 
              label="Team/Culture Image"
              section="about"
              accept="image/*"
              currentPath={data.image_path}
              onUploadSuccess={(path) => setData({ ...data, image_path: path })}
            />
            <div className="space-y-4">
              <label className="text-[0.65rem] text-white/40 uppercase tracking-widest block">Team Introduction</label>
              <textarea 
                rows={5}
                value={data.team_intro}
                onChange={(e) => setData({ ...data, team_intro: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-6 text-white text-xs leading-relaxed outline-none focus:border-brand-teal transition-all resize-none"
                placeholder="Our team is a collective of architects, engineers, and dreamers..."
              />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[0.65rem] text-brand-teal uppercase tracking-widest font-bold">Key Metrics</h3>
            <div className="space-y-4">
              {data.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    className="bg-white/5 border border-white/10 p-3 text-white text-[0.7rem] uppercase tracking-widest outline-none focus:border-brand-teal"
                    placeholder="Metric Label"
                  />
                  <input 
                    type="text" 
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    className="bg-white/5 border border-white/10 p-3 text-white text-[0.7rem] uppercase tracking-widest outline-none focus:border-brand-teal"
                    placeholder="Metric Value"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
