import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  User,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RFQ {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  date?: string;
  message: string;
  status: 'new' | 'read' | 'contacted' | 'archived';
  created_at: any;
}

export default function RFQViewer() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'rfqs'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RFQ[];
      setRfqs(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: RFQ['status']) => {
    try {
      await updateDoc(doc(db, 'rfqs', id), { status });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteRFQ = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, 'rfqs', id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="p-12 text-white/50 animate-pulse uppercase tracking-[0.2em] text-[0.7rem]">Synchronizing inquiries...</div>;

  return (
    <div className="p-8 md:p-12 max-w-6xl space-y-12">
      <div className="border-b border-white/5 pb-8">
        <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-2">Request for Quotation</h2>
        <p className="text-white/40 text-xs tracking-widest uppercase">Manage incoming project inquiries and client leads</p>
      </div>

      <div className="space-y-4">
        {rfqs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10">
            <MessageSquare size={32} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-[0.7rem] uppercase tracking-widest">No inquiries found</p>
          </div>
        ) : (
          rfqs.map((rfq) => (
            <div 
              key={rfq.id}
              className={`border transition-all duration-300 ${
                rfq.status === 'new' 
                  ? 'border-brand-teal/30 bg-brand-teal/5' 
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div 
                onClick={() => setExpandedId(expandedId === rfq.id ? null : rfq.id)}
                className="p-6 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-2 h-2 rounded-full ${
                    rfq.status === 'new' ? 'bg-brand-teal animate-pulse' : 'bg-white/10'
                  }`} />
                  <div>
                    <h3 className="text-white text-sm font-medium tracking-wide flex items-center gap-2">
                      {rfq.name}
                      {rfq.status === 'new' && (
                        <span className="text-[0.5rem] bg-brand-teal text-black px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-tighter">NEW</span>
                      )}
                    </h3>
                    <p className="text-white/40 text-[0.65rem] uppercase tracking-widest mt-1">{rfq.event_type || 'Event Inquiry'} • {formatDate(rfq.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-6 text-[0.6rem] uppercase tracking-widest text-white/30">
                    <span className="flex items-center gap-2"><Mail size={12} /> {rfq.email}</span>
                    {rfq.phone && <span className="flex items-center gap-2"><Phone size={12} /> {rfq.phone}</span>}
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-white/20 transition-transform duration-300 ${expandedId === rfq.id ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedId === rfq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-14 pb-8 space-y-8 border-t border-white/5 pt-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold">Client Profile</h4>
                          <div className="space-y-2 text-[0.7rem] text-white/60">
                            <p className="flex items-center gap-3"><User size={14} className="text-white/20" /> {rfq.name}</p>
                            <p className="flex items-center gap-3"><Mail size={14} className="text-white/20" /> {rfq.email}</p>
                            {rfq.phone && <p className="flex items-center gap-3"><Phone size={14} className="text-white/20" /> {rfq.phone}</p>}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold">Event Logistics</h4>
                          <div className="space-y-2 text-[0.7rem] text-white/60">
                            <p className="flex items-center gap-3"><AlertCircle size={14} className="text-white/20" /> {rfq.event_type || 'Custom Event'}</p>
                            <p className="flex items-center gap-3"><Calendar size={14} className="text-white/20" /> {rfq.date || 'To be discussed'}</p>
                            <p className="flex items-center gap-3"><Clock size={14} className="text-white/20" /> Recieved: {formatDate(rfq.created_at)}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold">Operations</h4>
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => updateStatus(rfq.id, 'contacted')}
                              className={`px-3 py-1.5 text-[0.6rem] uppercase tracking-widest font-bold border transition-all ${
                                rfq.status === 'contacted' ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              Mark Contacted
                            </button>
                            <button 
                              onClick={() => updateStatus(rfq.id, 'archived')}
                              className={`px-3 py-1.5 text-[0.6rem] uppercase tracking-widest font-bold border transition-all ${
                                rfq.status === 'archived' ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              Archive
                            </button>
                            <button 
                              onClick={() => deleteRFQ(rfq.id)}
                              className="px-3 py-1.5 text-[0.6rem] uppercase tracking-widest font-bold border border-red-500/20 text-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[0.6rem] text-brand-teal uppercase tracking-widest font-bold">Project Description</h4>
                        <div className="p-6 bg-white/5 border border-white/5 text-white/80 text-sm font-serif leading-relaxed italic">
                          "{rfq.message}"
                        </div>
                      </div>

                      {rfq.status === 'new' && (
                        <button 
                          onClick={() => updateStatus(rfq.id, 'read')}
                          className="flex items-center gap-2 text-brand-teal text-[0.6rem] uppercase tracking-widest font-bold hover:text-white transition-colors"
                        >
                          <CheckCircle size={12} /> Mark as Read
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
