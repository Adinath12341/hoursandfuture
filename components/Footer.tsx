import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, ArrowRight, Hourglass, Check, Loader2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Construct mailto link
    const subject = encodeURIComponent("Newsletter Subscription Request");
    const body = encodeURIComponent(`Please subscribe the following email to the Hours and Future newsletter:\n\n${email}`);
    
    // Open email client
    window.location.href = `mailto:adinathanugu@gmail.com?subject=${subject}&body=${body}`;

    // Simulate completion
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center gap-2 text-white mb-6">
                 <Hourglass size={20} className="text-brand-gold" />
                 <span className="font-bold tracking-tight">Hours<span className="text-brand-muted">Future</span></span>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm mb-8">
              An engineered system for time mastery. Built for the next generation of students and thinkers.
            </p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/adinathanugu123/" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-white transition-colors">
                  <Instagram size={20} />
               </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Explore</h4>
             <ul className="space-y-3 text-sm text-brand-muted">
                <li><NavLink to="/book" className="hover:text-brand-gold transition-colors">Book</NavLink></li>
                <li><NavLink to="/chapters" className="hover:text-brand-gold transition-colors">Chapters</NavLink></li>
                <li><NavLink to="/nexthours" className="hover:text-brand-gold transition-colors">AI Coach</NavLink></li>
             </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Legal</h4>
             <ul className="space-y-3 text-sm text-brand-muted">
                <li><NavLink to="/privacy" className="hover:text-brand-gold transition-colors">Privacy</NavLink></li>
                <li><NavLink to="/terms" className="hover:text-brand-gold transition-colors">Terms</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-brand-gold transition-colors">Contact</NavLink></li>
             </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-3">
             <h4 className="text-brand-gold font-bold text-sm uppercase tracking-wider mb-4">Stay Ahead</h4>
             
             {status === 'success' ? (
                <div className="bg-brand-gold/10 border border-brand-gold/20 rounded p-4 flex gap-3">
                    <Check size={16} className="text-brand-gold" />
                    <p className="text-xs text-brand-muted">Request generated. Check your email app.</p>
                </div>
            ) : (
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-white text-black rounded px-3 py-2 hover:bg-brand-gold transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  </button>
                </form>
            )}
          </div>

        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-muted/40 font-mono">
           <p>&copy; {new Date().getFullYear()} ADINATHREDDY ANUGU. SYDNEY, AU.</p>
           <p>SYSTEM STATUS: ONLINE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;