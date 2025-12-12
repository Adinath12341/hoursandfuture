import React from 'react';
import { NavLink } from 'react-router-dom';
import { Check, Target, Users, Book, Star } from 'lucide-react';
import BookVisual from '../components/BookVisual';

const AboutBook: React.FC = () => {
  return (
    <div className="pt-32 bg-brand-black min-h-screen text-brand-text">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 text-center">
        <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Manual</span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Built for the Modern Age</h1>
        <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
          A comprehensive guide for navigating the noise of the digital world and finding your unique path forward.
        </p>
      </div>

      {/* Split Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
           <h2 className="text-3xl font-bold text-white mb-6">Not Just Time Management.<br/><span className="text-brand-gold">Life Architecture.</span></h2>
           <div className="space-y-6 text-brand-muted text-lg leading-relaxed">
             <p>
               We live in an age of infinite distraction. Between social media, academic pressure, and the anxiety of "what comes next," it’s easy to feel like a passenger in your own life.
             </p>
             <p>
               <strong className="text-white">Hours and Future</strong> bridges the gap between the frantic pace of student life and the purposeful clarity of high achievers.
             </p>
             <p>
               Adinathreddy Anugu breaks down complex productivity psychology into actionable steps that any young adult can apply immediately—whether you're studying for finals or launching your first startup.
             </p>
           </div>
           
           <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Beat Procrastination", "Master Deep Work", "Build Atomic Habits", "Design Your Future"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-1 rounded-full bg-brand-gold/10 text-brand-gold"><Check size={14} /></div>
                  <span className="text-white font-medium text-sm">{item}</span>
                </div>
              ))}
           </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center perspective-container">
           <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/20 blur-[100px] rounded-full"></div>
              <BookVisual className="transform hover:rotate-y-12 transition-transform duration-700" />
           </div>
        </div>
      </div>

      {/* Stats / Details */}
      <div className="border-y border-white/5 bg-[#050505] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">220+</div>
            <div className="text-brand-muted text-sm uppercase tracking-wider">Pages of Insight</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">9</div>
            <div className="text-brand-muted text-sm uppercase tracking-wider">Core Chapters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">100%</div>
            <div className="text-brand-muted text-sm uppercase tracking-wider">Actionable</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-2 text-brand-gold">
               <Star fill="currentColor" size={24} />
               <Star fill="currentColor" size={24} />
               <Star fill="currentColor" size={24} />
               <Star fill="currentColor" size={24} />
               <Star fill="currentColor" size={24} />
            </div>
            <div className="text-brand-muted text-sm uppercase tracking-wider">5-Star Quality</div>
          </div>
        </div>
      </div>
      
      {/* Sticky Buy Bar */}
      <div className="py-20 text-center">
         <NavLink to="/coming-soon" className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-brand-gold transition-colors shadow-2xl inline-block">
            Purchase Your Copy
         </NavLink>
      </div>
    </div>
  );
};

export default AboutBook;