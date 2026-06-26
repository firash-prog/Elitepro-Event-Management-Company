import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Info, 
  MapPin, 
  Grid3X3, 
  Briefcase, 
  FlaskConical, 
  Settings, 
  LogOut,
  FileText
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

interface SidebarItemProps {
  icon: any;
  label: string;
  to: string;
  key?: string;
}

function SidebarItem({ icon: Icon, label, to }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `w-full flex items-center gap-3 px-6 py-4 transition-all duration-300 border-l-2 ${
        isActive 
          ? 'bg-brand-teal/5 text-brand-teal border-brand-teal' 
          : 'text-white/50 border-transparent hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="text-[0.7rem] uppercase tracking-[0.2em] font-medium">{label}</span>
    </NavLink>
  );
}

export default function AdminSidebar() {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'hero', icon: Video, label: 'Hero', path: '/admin/hero' },
    { id: 'about', icon: Info, label: 'About', path: '/admin/about' },
    { id: 'quad-hubs', icon: MapPin, label: 'Quad Hubs', path: '/admin/quad-hubs' },
    { id: 'service-hubs', icon: Grid3X3, label: 'Service Hubs', path: '/admin/service-hubs' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio', path: '/admin/portfolio' },
    { id: 'lab', icon: FlaskConical, label: 'The Lab', path: '/admin/lab' },
    { id: 'rfq', icon: FileText, label: 'RFQ', path: '/admin/rfq' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-brand-dark border-r border-brand-teal/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8 border-b border-brand-teal/10">
        <h2 className="text-xl font-sans font-light tracking-[0.2em] text-white uppercase">
          HELLOPRO <span className="text-[0.6rem] text-brand-teal block tracking-widest mt-1 opacity-60">Admin CMS</span>
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            to={item.path}
          />
        ))}
      </nav>

      <div className="p-6 border-t border-brand-teal/10">
        <button 
          onClick={() => signOut(auth)}
          className="w-full flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          <span className="text-[0.65rem] uppercase tracking-widest font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
