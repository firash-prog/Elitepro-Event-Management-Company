import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import HeroEditor from './HeroEditor';
import { useFirebase } from '../../context/FirebaseContext';
import LoginPage from './LoginPage';
import { Loader2 } from 'lucide-react';

export default function AdminPanel() {
  const { user, isAdmin, loading } = useFirebase();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-teal" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-12">
            <h2 className="text-4xl font-sans font-light tracking-[0.2em] text-white uppercase mb-4">Command Center</h2>
            <p className="text-brand-gray font-serif italic text-lg opacity-60">Welcome, {user.displayName || 'Admin'}. All systems operational.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 bg-white/5 border border-brand-teal/10">
                <h4 className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-4">Active Deployments</h4>
                <p className="text-4xl text-white font-sans font-light tracking-tighter">14</p>
              </div>
              <div className="p-8 bg-white/5 border border-brand-teal/10">
                <h4 className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-4">Content Revisions</h4>
                <p className="text-4xl text-white font-sans font-light tracking-tighter">2.4k</p>
              </div>
              <div className="p-8 bg-white/5 border border-brand-teal/10">
                <h4 className="text-brand-teal text-[0.6rem] uppercase tracking-widest mb-4">Uptime</h4>
                <p className="text-4xl text-white font-sans font-light tracking-tighter">99.9%</p>
              </div>
            </div>
          </div>
        );
      case 'hero':
        return <HeroEditor />;
      default:
        return (
          <div className="p-12 text-center">
            <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-4">Section Under Construction</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase">This module is currently being optimized.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pl-64 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
}
