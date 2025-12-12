import React, { useState, useEffect } from 'react';
import { Menu, X, Hourglass, Sparkles, User, LayoutDashboard } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'The Book', path: '/book' },
  { label: 'Chapters', path: '/chapters' },
  { label: 'Resources', path: '/resources' },
  { label: 'Author', path: '/author' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-4 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${
        isScrolled 
        ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-full px-6 py-3' 
        : 'bg-transparent px-2 py-3'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand */}
          <NavLink to="/" className="flex items-center space-x-3 group relative z-10">
            <div className="bg-brand-surfaceHighlight p-2 rounded-full border border-white/5 group-hover:border-brand-gold/30 transition-colors">
               <Hourglass size={20} className="text-brand-gold group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-gold transition-colors duration-300">
              Hours and Future
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 relative ${
                    isActive 
                      ? 'text-brand-black bg-white shadow-lg' 
                      : 'text-brand-muted hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {/* NextHours AI Special Link */}
            <NavLink
              to="/nexthours"
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 ml-1 ${
                  isActive 
                    ? 'bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
                    : 'text-brand-gold hover:bg-brand-gold/10'
                }`
              }
            >
              <Sparkles size={14} />
              NextHours AI
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4 relative z-10">
            {isAuthenticated ? (
               <NavLink to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 pl-2 pr-4 py-1.5 rounded-full transition-all border border-white/5 group">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-brand-surfaceHighlight flex items-center justify-center">
                      {user?.profilePicture ? (
                          <img src={user.profilePicture} alt="Me" className="w-full h-full object-cover" />
                      ) : (
                          <LayoutDashboard size={14} />
                      )}
                  </div>
                  <span>Dashboard</span>
               </NavLink>
            ) : (
               <NavLink to="/login" className="text-sm font-medium text-brand-muted hover:text-white transition-colors">
                 Log In
               </NavLink>
            )}
            
            <NavLink 
              to="/coming-soon"
              className="bg-brand-gold hover:bg-white hover:text-brand-black text-brand-black font-bold text-sm py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
            >
              Get the Book
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-0 md:hidden animate-fade-in z-40">
          <div className="rounded-2xl p-4 flex flex-col space-y-2 shadow-2xl bg-[#000000] border border-white/10">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-gold text-brand-black'
                      : 'text-brand-muted hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
                to="/nexthours"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-brand-gold text-brand-black'
                      : 'text-brand-gold hover:bg-brand-gold/10'
                  }`
                }
              >
                <Sparkles size={16} /> NextHours AI
            </NavLink>
            <div className="h-px bg-white/10 my-2"></div>
            
            {isAuthenticated ? (
               <NavLink to="/dashboard" className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-white bg-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 bg-brand-surfaceHighlight flex items-center justify-center">
                      {user?.profilePicture ? (
                          <img src={user.profilePicture} alt="Me" className="w-full h-full object-cover" />
                      ) : (
                          <LayoutDashboard size={14} />
                      )}
                  </div>
                  Dashboard
               </NavLink>
            ) : (
               <NavLink to="/login" className="block px-4 py-3 rounded-xl text-base font-medium text-brand-muted hover:bg-white/5 hover:text-white transition-colors">
                 Log In
               </NavLink>
            )}

            <NavLink 
              to="/coming-soon"
              className="block w-full text-center bg-white text-brand-black font-bold py-3 px-5 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Get the Book
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;