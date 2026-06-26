import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import FileUploader from './FileUploader';
import { 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  ExternalLink,
  ChevronRight,
  GripVertical,
  Maximize2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  image_path: string;
  client: string;
  is_featured: boolean;
  order: number;
}

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (project: Project | null) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId('new');
      setFormData({
        title: '',
        category: 'Corporate Event',
        year: new Date().getFullYear().toString(),
        location: '',
        client: '',
        description: '',
        image_path: '',
        is_featured: false,
        order: projects.length
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId === 'new') {
        await addDoc(collection(db, 'portfolio'), {
          ...formData,
          created_at: serverTimestamp(),
          order: projects.length
        });
      } else if (editingId) {
        await setDoc(doc(db, 'portfolio', editingId), formData);
      }
      setEditingId(null);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project from portfolio?")) return;
    try {
      await deleteDoc(doc(db, 'portfolio', id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <div className="p-12 text-white/50 animate-pulse uppercase tracking-[0.2em] text-[0.7rem]">Loading portfolio...</div>;

  return (
    <div className="p-8 md:p-12 max-w-6xl space-y-12">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-2">Portfolio Management</h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">Curate your high-fidelity event showcases</p>
        </div>
        <button
          onClick={() => handleEdit(null)}
          className="flex items-center gap-3 bg-brand-teal px-8 py-3 font-medium uppercase tracking-[0.2em] text-[0.7rem] text-black hover:opacity-90 transition-all"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                {project.image_path ? (
                  <div className="relative w-full h-full group/image cursor-zoom-in" onClick={() => setPreviewImage(project.image_path)}>
                    <img src={project.image_path} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity bg-black/40">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <Maximize2 size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                {project.is_featured && (
                  <div className="absolute top-4 left-4 bg-brand-teal text-black text-[0.5rem] px-2 py-1 uppercase font-bold tracking-tighter pointer-events-none">FEATURED</div>
                )}
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-medium mb-1">{project.category}</p>
                  <h3 className="text-white text-lg font-sans font-light tracking-wide uppercase truncate">{project.title}</h3>
                  <p className="text-white/30 text-[0.65rem] uppercase tracking-widest mt-1">{project.location} • {project.year}</p>
                </div>
                
                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="text-[0.65rem] text-white/60 uppercase tracking-widest font-bold hover:text-brand-teal transition-colors flex items-center gap-2"
                  >
                    Edit Details <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingId(null)}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-brand-dark border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-brand-dark border-b border-white/10 p-8 flex justify-between items-center z-10">
                <div>
                  <h3 className="text-xl text-white uppercase tracking-widest font-light">
                    {editingId === 'new' ? 'New Project' : 'Edit Project'}
                  </h3>
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-widest mt-1">Configure project specifications</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setEditingId(null)}
                    className="px-6 py-2.5 text-[0.65rem] text-white/50 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brand-teal px-8 py-2.5 text-[0.65rem] text-black uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <FileUploader 
                    label="Showcase Image (2000x1200px approx)"
                    section="portfolio"
                    accept="image/*"
                    currentPath={formData.image_path}
                    onUploadSuccess={(path) => setFormData({ ...formData, image_path: path })}
                  />

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Project Title</label>
                      <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-brand-teal transition-all"
                        placeholder="e.g. LUXURY AUTO LAUNCH"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-brand-teal transition-all appearance-none"
                        >
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Product Launch">Product Launch</option>
                          <option value="Gala Dinner">Gala Dinner</option>
                          <option value="Exhibition">Exhibition</option>
                          <option value="Private Celebration">Private Celebration</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Year</label>
                        <input 
                          type="text" 
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-brand-teal transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Location</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-brand-teal transition-all"
                        placeholder="e.g. Riyadh, Saudi Arabia"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Client Name</label>
                      <input 
                        type="text" 
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-brand-teal transition-all"
                        placeholder="e.g. NeoTech Group"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5">
                      <input 
                        type="checkbox" 
                        id="featured"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-4 h-4 accent-brand-teal"
                      />
                      <label htmlFor="featured" className="text-[0.65rem] text-white/60 uppercase tracking-widest cursor-pointer select-none">
                        Featured on Homepage
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[0.6rem] text-white/30 uppercase tracking-widest">Project Narrative</label>
                    <textarea 
                      rows={12}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-6 text-white text-sm font-serif leading-relaxed outline-none focus:border-brand-teal transition-all resize-none"
                      placeholder="Describe the high-fidelity experience, architectural elements, and spatial engineering involved..."
                    />
                  </div>

                  <div className="p-8 border border-brand-teal/20 bg-brand-teal/5">
                    <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold mb-4">Preview Insight</h4>
                    <div className="space-y-4">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-teal w-3/4" />
                      </div>
                      <p className="text-white/40 text-[0.6rem] uppercase tracking-widest leading-relaxed">
                        High-resolution assets are optimized for spatial computing and high-fidelity displays. Ensure descriptions focus on sensory details and architectural precision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl cursor-zoom-out"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full flex flex-col items-center gap-6"
            >
              <div className="absolute -top-12 right-0">
                <button 
                  onClick={() => setPreviewImage(null)}
                  className="text-white/40 hover:text-white flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] font-bold transition-colors"
                >
                  Close Preview <X size={18} />
                </button>
              </div>
              <div className="bg-black/40 p-2 border border-white/10 shadow-2xl">
                <img 
                  src={previewImage} 
                  className="max-w-full max-h-[80vh] object-contain" 
                  alt="Full resolution preview" 
                />
              </div>
              <div className="px-6 py-2 bg-brand-teal/10 border border-brand-teal/20 rounded-full">
                <p className="text-brand-teal text-[0.55rem] uppercase tracking-[0.2em] font-bold">Spatial Fidelity Inspection Mode</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
