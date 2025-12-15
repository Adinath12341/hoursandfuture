import React, { useState } from 'react';
import { Menu, X, Hourglass, Sparkles, User, LayoutDashboard, BookOpen, Layers, PenTool, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'The Book', path: '/book', icon: BookOpen },
  { label: 'Chapters', path: '/chapters', icon: Layers },
  { label: 'Resources', path: '/resources', icon: PenTool },
  { label: 'Author', path: '/author', icon: UserCircle },
];

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Visible md+) --- */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 bg-[#050505] border-r border-white/10 flex-col justify-between z-50 p-6">
        
        {/* Header */}
        <div>
           <NavLink to="/" className="flex items-center gap-3 mb-12 group">
              <div className="w-10 h-10 bg-brand-gold/10 border border-brand-gold/20 rounded-lg flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                 <Hourglass size={20} className="text-brand-gold group-hover:text-black" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg leading-none tracking-tight">HOURS</h1>
                <p className="text-[10px] text-brand-muted tracking-[0.2em] uppercase">And Future</p>
              </div>
           </NavLink>

           {/* Navigation Links */}
           <nav className="space-y-1">
              <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-4 font-mono">System</div>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive 
                        ? 'bg-white/10 text-white border-l-2 border-brand-gold' 
                        : 'text-brand-muted hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
              
              <div className="h-6"></div>
              
              <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-4 font-mono">Intelligence</div>
              <NavLink
                to="/nexthours"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 border border-transparent ${
                    isActive 
                      ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' 
                      : 'text-brand-gold hover:bg-brand-gold/10'
                  }`
                }
              >
                <Sparkles size={16} />
                NextHours AI
              </NavLink>
           </nav>
        </div>

        {/* Footer / Account */}
        <div className="border-t border-white/10 pt-6">
           {isAuthenticated ? (
               <NavLink to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-[#111] border border-white/5 hover:border-brand-gold/30 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-surfaceHighlight overflow-hidden">
                      {user?.profilePicture ? (
                          <img src={user.profilePicture} alt="Me" className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-muted"><User size={14} /></div>
                      )}
                  </div>
                  <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate group-hover:text-brand-gold">{user?.name}</p>
                      <p className="text-[10px] text-brand-muted">Dashboard</p>
                  </div>
               </NavLink>
           ) : (
               <div className="grid grid-cols-2 gap-2">
                   <NavLink to="/login" className="text-center py-2 rounded-lg border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-all">
                      Log In
                   </NavLink>
                   <NavLink to="/coming-soon" className="text-center py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-brand-gold transition-all">
                      Get Book
                   </NavLink>
               </div>
           )}
        </div>
      </aside>

      {/* --- MOBILE HEADER (Visible < md) --- */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
                <Hourglass size={20} className="text-brand-gold" />
                <span className="font-bold text-white tracking-tight">Hours<span className="text-brand-muted">Future</span></span>
            </NavLink>
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg"
            >
               {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-white/10 p-4 shadow-2xl animate-slide-up">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                      isActive ? 'bg-white/10 text-white' : 'text-brand-muted hover:text-white'
                    }`
                  }
                >
                  <item.icon size={16} /> {item.label}
                </NavLink>
              ))}
              <NavLink
                  to="/nexthours"
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-bold text-brand-gold bg-brand-gold/10 mt-2 flex items-center gap-3"
              >
                  <Sparkles size={16} /> NextHours AI
              </NavLink>
              
              <div className="h-px bg-white/10 my-3"></div>

              {isAuthenticated ? (
                 <NavLink to="/dashboard" onClick={() => setIsMobileOpen(false)} className="block text-center py-3 rounded-lg bg-[#151515] border border-white/10 text-white font-bold">
                    Go to Dashboard
                 </NavLink>
              ) : (
                 <div className="flex gap-2">
                    <NavLink to="/login" onClick={() => setIsMobileOpen(false)} className="flex-1 text-center py-3 rounded-lg border border-white/10 text-white font-bold">
                       Log In
                    </NavLink>
                    <NavLink to="/coming-soon" onClick={() => setIsMobileOpen(false)} className="flex-1 text-center py-3 rounded-lg bg-brand-gold text-black font-bold">
                       Get Book
                    </NavLink>
                 </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;