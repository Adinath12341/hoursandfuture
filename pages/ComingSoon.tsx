import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Hourglass, ArrowLeft, Bell, Check } from 'lucide-react';
import BookVisual from '../components/BookVisual';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        
        <div className="mb-12 flex justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-gold/20 blur-[60px] rounded-full"></div>
                <BookVisual className="transform scale-90 md:scale-100" />
            </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
           
           <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
              <Hourglass size={14} /> Launching Soon
           </span>

           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
             The Future is Almost Here
           </h1>
           
           <p className="text-xl text-brand-muted mb-8 max-w-2xl mx-auto leading-relaxed">
             "Hours and Future" is currently in the final stages of production. We are crafting a high-quality experience that will be available very soon.
           </p>

           {!submitted ? (
             <div className="max-w-md mx-auto">
               <p className="text-sm text-white mb-4 font-medium">Get notified the moment it drops:</p>
               <form onSubmit={handleSubmit} className="flex gap-2">
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email" 
                   required
                   className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                 />
                 <button type="submit" className="bg-brand-gold text-brand-black font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap">
                   <Bell size={18} /> Notify Me
                 </button>
               </form>
             </div>
           ) : (
             <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-center gap-3 text-green-500 max-w-md mx-auto animate-fade-in">
               <Check size={20} />
               <span className="font-bold">You're on the list! We'll let you know.</span>
             </div>
           )}

           <div className="mt-12 pt-8 border-t border-white/5">
             <NavLink to="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-medium">
               <ArrowLeft size={16} /> Return to Home
             </NavLink>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;