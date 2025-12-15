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
    <footer className="bg-brand-dark text-brand-muted border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
                 <Hourglass size={24} className="text-brand-gold" />
                 <span className="font-bold text-lg">Hours and Future</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-brand-muted">
              A practical guide for students and young adults to master their time, build better habits, and design a future they love.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/adinathanugu123/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all">
                <Instagram size={18} />
              </a>
              
              {/* TikTok */}
              <a href="https://www.tiktok.com/@adinath12341" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 0010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-1.003-.104z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><NavLink to="/book" className="hover:text-brand-gold transition-colors">About the Book</NavLink></li>
              <li><NavLink to="/chapters" className="hover:text-brand-gold transition-colors">Chapter Breakdown</NavLink></li>
              <li><NavLink to="/author" className="hover:text-brand-gold transition-colors">Meet Adinathreddy</NavLink></li>
              <li><NavLink to="/resources" className="hover:text-brand-gold transition-colors">Free Tools</NavLink></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><NavLink to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-brand-gold transition-colors">FAQ</NavLink></li>
              <li><NavLink to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-brand-gold transition-colors">Terms of Use</NavLink></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-brand-gold font-bold mb-6">Join the Movement</h4>
            <p className="text-xs mb-4">
              Get weekly time management tips and free resources delivered to your inbox.
            </p>
            
            {status === 'success' ? (
                <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
                    <div className="bg-brand-gold text-brand-black rounded-full p-0.5 mt-0.5 flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">Email App Opened</p>
                        <p className="text-brand-muted text-xs">Please send the pre-filled email to confirm.</p>
                    </div>
                </div>
            ) : (
                <form className="space-y-3" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-gold text-white placeholder-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-text text-brand-black font-bold py-3 px-4 rounded-lg text-sm hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                        <>
                            <Loader2 size={16} className="animate-spin" /> Opening Email...
                        </>
                    ) : (
                        <>
                            Subscribe <ArrowRight size={16} />
                        </>
                    )}
                  </button>
                </form>
            )}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-xs text-brand-muted/50">
          &copy; {new Date().getFullYear()} Adinathreddy Anugu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;