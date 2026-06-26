import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import FileUploader from './FileUploader';
import { Save, CheckCircle } from 'lucide-react';

export default function HeroEditor() {
  const [data, setData] = useState({
    video_path: '',
    poster_path: '',
    label: 'ELITE PRO EVENTS & ADVERTISING',
    title_line1: 'ARCHITECTS OF',
    title_line2: 'LUXURY EXPERIENCES',
    subtitle: 'We engineer high-fidelity spatial events for forward-thinking brands.',
    cta_text: 'EXPLORE OUR WORK',
    cta_link: '#portfolio',
    is_active: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'settings', 'hero');
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
      await setDoc(doc(db, 'settings', 'hero'), data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-white/50 animate-pulse">Loading Hero Settings...</div>;

  return (
    <div className="p-8 md:p-12 max-w-4xl space-y-12">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-2">Hero Section</h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">Configure the entry-point experience</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-3 px-8 py-3 rounded-none transition-all duration-300 font-medium uppercase tracking-[0.2em] text-[0.7rem] ${
            saved 
              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
              : 'bg-brand-teal text-black hover:opacity-90'
          }`}
        >
          {saving ? "Saving..." : saved ? <><CheckCircle size={16} /> Saved</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <FileUploader 
          label="Hero Video (.mp4)"
          section="hero"
          accept="video/*"
          currentPath={data.video_path}
          onUploadSuccess={(path) => setData({ ...data, video_path: path })}
        />
        <FileUploader 
          label="Poster Image (.jpg, .png)"
          section="hero"
          accept="image/*"
          currentPath={data.poster_path}
          onUploadSuccess={(path) => setData({ ...data, poster_path: path })}
        />
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-[0.6rem] uppercase tracking-widest text-brand-teal font-medium">Content Parameters</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.65rem] text-white/40 uppercase tracking-widest">Label</label>
              <input 
                type="text" 
                value={data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-teal outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] text-white/40 uppercase tracking-widest">CTA Text</label>
              <input 
                type="text" 
                value={data.cta_text}
                onChange={(e) => setData({ ...data, cta_text: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-teal outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[0.65rem] text-white/40 uppercase tracking-widest">Title Line 1</label>
            <input 
              type="text" 
              value={data.title_line1}
              onChange={(e) => setData({ ...data, title_line1: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-teal outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[0.65rem] text-white/40 uppercase tracking-widest">Title Line 2</label>
            <input 
              type="text" 
              value={data.title_line2}
              onChange={(e) => setData({ ...data, title_line2: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-teal outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[0.65rem] text-white/40 uppercase tracking-widest">Subtitle</label>
          <textarea 
            rows={4}
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-teal outline-none transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}
