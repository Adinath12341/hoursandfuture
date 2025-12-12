import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight, Instagram } from 'lucide-react';

const AboutAuthor: React.FC = () => {
  return (
    <div className="pt-32 bg-brand-black min-h-screen text-white relative">
      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20 text-center relative z-10">
        
        {/* Content */}
        <div className="flex flex-col justify-center items-center">
          <div className="mb-8 animate-fade-in">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand-gold font-mono text-xs uppercase tracking-widest">The Author</span>
              <h2 className="text-3xl font-bold text-white mt-4 tracking-tight">Adinathreddy Anugu</h2>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12 tracking-tighter leading-none animate-slide-up" style={{ animationDelay: '0.1s' }}>
            "I wrote the book<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-goldDim">I needed.</span>"
          </h1>
          
          <div className="space-y-8 text-lg md:text-xl text-brand-muted leading-relaxed max-w-2xl text-left mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p>
              Like many students, I struggled. I had ambitions, but my daily habits didn't match my dreams. I would spend hours "busy" but get nothing done, then stay up late doom-scrolling, promising myself that tomorrow would be different.
            </p>
            <p>
              It wasn't until I started treating my time like a limited resource. Just like money, that things changed. I dove deep into psychology, habit formation, and productivity systems, testing them in the chaos of real student life.
            </p>
            <div className="border-l-2 border-brand-gold pl-8 py-2 my-10 relative">
              <p className="text-2xl text-white font-light italic">
                Hours and Future is not about becoming a robot. It's about building a system that allows you to work hard on what matters.
              </p>
            </div>
            <p>
              My goal is simple: to help one million students take back control of their time and build a future they are actually excited to live in.
            </p>
          </div>

          <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <NavLink to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-brand-gold transition-colors shadow-lg hover:shadow-brand-gold/20">
              Contact Me <ArrowUpRight size={20} />
            </NavLink>
            <a href="https://www.instagram.com/adinathanugu123/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all">
              <Instagram size={20} /> Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;