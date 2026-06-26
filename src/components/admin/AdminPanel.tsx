import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import AdminSidebar from './AdminSidebar';
import HeroEditor from './HeroEditor';
import RFQViewer from './RFQViewer';
import PortfolioManager from './PortfolioManager';
import AboutEditor from './AboutEditor';
import { useFirebase } from '../../context/FirebaseContext';
import LoginPage from './LoginPage';
import { Loader2, MessageSquare, Briefcase, Users, ArrowUpRight } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAdmin, loading } = useFirebase();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-teal" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function Dashboard() {
  const { user } = useFirebase();
  const [stats, setStats] = useState({
    rfqs: 0,
    portfolio: 0,
    admins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [rfqSnap, portfolioSnap, adminSnap] = await Promise.all([
          getDocs(collection(db, 'rfqs')),
          getDocs(collection(db, 'portfolio')),
          getDocs(collection(db, 'admins'))
        ]);
        setStats({
          rfqs: rfqSnap.size,
          portfolio: portfolioSnap.size,
          admins: adminSnap.size
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-12">
      <div className="border-b border-white/5 pb-8">
        <h2 className="text-4xl font-sans font-light tracking-[0.2em] text-white uppercase mb-4">Command Center</h2>
        <div className="flex items-center gap-4 text-white/40">
          <p className="text-brand-gray font-serif italic text-lg">Welcome back, {user?.displayName || 'Admin'}.</p>
          <div className="h-1 w-1 bg-brand-teal rounded-full" />
          <p className="text-[0.6rem] uppercase tracking-widest">Awaiting spatial orchestration</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white/[0.02] border border-white/5 group hover:border-brand-teal/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-brand-teal/5 text-brand-teal">
              <MessageSquare size={20} />
            </div>
            <ArrowUpRight size={16} className="text-white/10 group-hover:text-brand-teal transition-colors" />
          </div>
          <h4 className="text-white/40 text-[0.6rem] uppercase tracking-[0.2em] mb-2">Pending Inquiries</h4>
          <p className="text-5xl text-white font-sans font-light tracking-tighter">
            {loading ? '...' : stats.rfqs}
          </p>
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/20 text-[0.55rem] uppercase tracking-[0.15em]">Last check: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="p-8 bg-white/[0.02] border border-white/5 group hover:border-brand-teal/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-brand-teal/5 text-brand-teal">
              <Briefcase size={20} />
            </div>
            <ArrowUpRight size={16} className="text-white/10 group-hover:text-brand-teal transition-colors" />
          </div>
          <h4 className="text-white/40 text-[0.6rem] uppercase tracking-[0.2em] mb-2">Portfolio Projects</h4>
          <p className="text-5xl text-white font-sans font-light tracking-tighter">
            {loading ? '...' : stats.portfolio}
          </p>
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/20 text-[0.55rem] uppercase tracking-[0.15em]">High-fidelity showcases</p>
          </div>
        </div>

        <div className="p-8 bg-white/[0.02] border border-white/5 group hover:border-brand-teal/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-brand-teal/5 text-brand-teal">
              <Users size={20} />
            </div>
            <ArrowUpRight size={16} className="text-white/10 group-hover:text-brand-teal transition-colors" />
          </div>
          <h4 className="text-white/40 text-[0.6rem] uppercase tracking-[0.2em] mb-2">System Operators</h4>
          <p className="text-5xl text-white font-sans font-light tracking-tighter">
            {loading ? '...' : stats.admins}
          </p>
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/20 text-[0.55rem] uppercase tracking-[0.15em]">Authorized personnel only</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 border border-white/5 bg-white/[0.01]">
          <h3 className="text-white/80 text-[0.7rem] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4">
            System Uptime <div className="h-1 w-1 bg-brand-teal rounded-full animate-ping" />
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[0.6rem] text-white/30 uppercase tracking-widest">Network Stability</span>
              <span className="text-[0.7rem] text-brand-teal uppercase font-bold">99.99%</span>
            </div>
            <div className="h-1 w-full bg-white/5">
              <div className="h-full bg-brand-teal w-[99%]" />
            </div>
          </div>
        </div>
        <div className="p-10 border border-white/5 bg-white/[0.01]">
          <h3 className="text-white/80 text-[0.7rem] uppercase tracking-[0.2em] font-bold mb-8">Asset Optimization</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[0.6rem] text-white/30 uppercase tracking-widest">CDN Performance</span>
              <span className="text-[0.7rem] text-brand-teal uppercase font-bold">120ms</span>
            </div>
            <div className="h-1 w-full bg-white/5">
              <div className="h-full bg-brand-teal w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionUnderConstruction({ title }: { title: string }) {
  return (
    <div className="p-12 text-center h-[80vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-sans font-light tracking-widest text-white uppercase mb-4">{title}</h2>
      <p className="text-white/40 text-[0.6rem] uppercase tracking-widest leading-relaxed max-w-sm">
        This module is currently being optimized for high-fidelity spatial orchestration. Check back shortly.
      </p>
      <div className="mt-8 h-[1px] w-12 bg-brand-teal/30" />
    </div>
  );
}

export default function AdminPanel() {
  const { user, isAdmin, loading } = useFirebase();
  const location = useLocation();

  if (!loading && user && isAdmin && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-brand-dark">
              <AdminSidebar />
              <main className="pl-64 min-h-screen">
                <Routes>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="hero" element={<HeroEditor />} />
                  <Route path="rfq" element={<RFQViewer />} />
                  <Route path="portfolio" element={<PortfolioManager />} />
                  <Route path="about" element={<AboutEditor />} />
                  <Route path="quad-hubs" element={<SectionUnderConstruction title="Quad Hubs" />} />
                  <Route path="service-hubs" element={<SectionUnderConstruction title="Service Hubs" />} />
                  <Route path="lab" element={<SectionUnderConstruction title="The Lab" />} />
                  <Route path="settings" element={<SectionUnderConstruction title="Settings" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

