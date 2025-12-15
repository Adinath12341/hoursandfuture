import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Clock, Target, Zap, BookOpen, ArrowRight, Shield, Activity, Star, Layers, Map, Sparkles, Layout, Globe, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BookVisual from '../components/BookVisual';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-6 lg:p-8 pt-20 md:pt-6">
      
      {/* --- GRID LAYOUT CONTAINER --- */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-min">

        {/* 1. HERO TITLE BLOCK (Spans 8 cols) */}
        <div className="col-span-1 md:col-span-4 lg:col-span-8 bg-[#0f0f0f] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-white/5 flex flex-col justify-between min-h-[500px] group">
           {/* Background Texture */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-[#0a0a0a] to-[#0a0a0a] opacity-50"></div>
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent z-10"></div>
           
           <div className="relative z-20">
              <div className="flex items-center gap-3 mb-8">
                 <div className="px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-[10px] font-mono uppercase tracking-widest">
                    Version 2.0 Live
                 </div>
                 <div className="h-px w-20 bg-white/10"></div>
                 <span className="text-brand-muted text-xs font-mono uppercase">System Active</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
                DESIGN<br/>
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-goldDim">FUTURE</span><br/>
                YOU WANT.
              </h1>
              
              <p className="max-w-xl text-lg text-brand-muted leading-relaxed mb-12 border-l-2 border-brand-gold/50 pl-6">
                Hours and Future is not just a book. It is an engineered system for students to master time, eliminate noise, and build a life of purpose.
              </p>
           </div>

           <div className="relative z-20 flex flex-wrap gap-4">
              <NavLink to="/coming-soon" className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-brand-gold transition-colors flex items-center gap-2 group/btn">
                 Start Reading <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </NavLink>
              <NavLink to="/chapters" className="px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                 Explore Modules
              </NavLink>
           </div>
        </div>

        {/* 2. BOOK VISUAL BLOCK (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-[#0A0A0A] rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[500px] group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-4 right-4 text-brand-muted/30 font-mono text-xs">FIG 01.</div>
            
            <div className="transform scale-90 group-hover:scale-100 transition-transform duration-700 ease-out">
                <BookVisual />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
               <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <div>
                    <p className="text-white font-bold text-sm">The Manual</p>
                    <p className="text-xs text-brand-muted">220 Pages • Digital & Print</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
                     <ArrowUpRight size={14} />
                  </div>
               </div>
            </div>
        </div>

        {/* 3. NEXTHOURS AI PROMO (Spans 6 cols) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-6 bg-[#0E0E0E] rounded-2xl p-8 border border-white/5 hover:border-brand-gold/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-start justify-between mb-8">
               <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center text-black">
                  <Sparkles size={24} />
               </div>
               <div className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE
               </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">Your Personal AI Coach</h3>
            <p className="text-brand-muted mb-8 max-w-md">
               NextHours isn't a chatbot. It's a productivity architect trained on the entire book's methodology.
            </p>

            <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-sm mb-8 text-brand-muted/80">
               <span className="text-brand-gold mr-2">{'>'}</span> How do I stop procrastinating on finals?<br/>
               <span className="text-white mt-2 block opacity-80">Based on Chapter 8, we need to break the "Wall of Awful". Let's start with a 5-minute entry task...</span>
            </div>

            <NavLink to="/nexthours" className="inline-flex text-white font-bold border-b border-brand-gold pb-0.5 hover:text-brand-gold transition-colors">
               Launch Interface
            </NavLink>
        </div>

        {/* 4. STATS BLOCK (Spans 3 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 flex flex-col justify-center">
            <div className="text-brand-muted text-xs font-mono uppercase mb-2">Community</div>
            <div className="text-5xl font-bold text-white mb-2 tracking-tighter">1,200+</div>
            <div className="text-sm text-brand-muted">Students optimizing their future.</div>
            <div className="mt-6 flex -space-x-3">
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#0A0A0A]"></div>
               ))}
               <div className="w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center text-xs font-bold border-2 border-[#0A0A0A]">+</div>
            </div>
        </div>

        {/* 5. FEATURES SCROLLER (Spans 3 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-[#0A0A0A] rounded-2xl p-0 border border-white/5 overflow-hidden relative group">
           <div className="absolute top-4 left-4 z-10 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-md">Methodology</div>
           
           <div className="h-full flex flex-col">
              <div className="flex-1 p-6 flex items-center justify-center border-b border-white/5 bg-white/[0.02]">
                 <Target size={48} className="text-brand-muted group-hover:text-brand-gold transition-colors" />
              </div>
              <div className="p-6">
                 <h4 className="text-white font-bold mb-1">Goal Architecture</h4>
                 <p className="text-xs text-brand-muted">The SMART+ Framework tailored for young adults.</p>
              </div>
           </div>
        </div>

        {/* 6. RESOURCES CTA (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-brand-gold rounded-2xl p-8 border border-transparent text-black flex flex-col justify-between hover:bg-white transition-colors duration-300">
           <div>
              <Layout size={32} className="mb-6" />
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Free Toolset</h3>
              <p className="text-black/70 text-sm font-medium leading-relaxed">
                 Download the Time Audit Sheet, Habit Tracker, and Weekly Planner templates without spending a dime.
              </p>
           </div>
           <div className="mt-8 flex justify-end">
              <NavLink to="/resources" className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                 <ArrowRight size={20} />
              </NavLink>
           </div>
        </div>

        {/* 7. GRID LIST (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#0A0A0A] rounded-2xl p-8 border border-white/5">
           <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Core Curriculum</h3>
           <ul className="space-y-4">
              {[
                {icon: Clock, label: "Time Auditing"},
                {icon: Shield, label: "Focus Defense"},
                {icon: Activity, label: "Energy Management"},
                {icon: Layers, label: "Habit Stacking"}
              ].map((item, i) => (
                 <li key={i} className="flex items-center gap-4 text-brand-muted hover:text-white transition-colors group cursor-default">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-colors">
                       <item.icon size={16} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                 </li>
              ))}
           </ul>
        </div>

        {/* 8. AUTHOR (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-[#0f0f0f] rounded-2xl p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/50 to-transparent"></div>
            <div className="relative z-10">
               <div className="text-brand-gold text-xs font-mono uppercase mb-4">From the Author</div>
               <blockquote className="text-xl text-white font-medium italic mb-6">
                 "Time is the only currency you spend without knowing your balance. It's time to audit your life."
               </blockquote>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                     <span className="font-bold text-xs">AA</span>
                  </div>
                  <div>
                     <div className="text-white text-sm font-bold">Adinathreddy Anugu</div>
                     <div className="text-brand-muted text-xs">Creator, Hours and Future</div>
                  </div>
               </div>
            </div>
        </div>

      </div>
      
      {/* Bottom Spacer */}
      <div className="h-20"></div>
    </div>
  );
};

export default Home;