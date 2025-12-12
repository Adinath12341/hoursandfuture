import React from 'react';

const BookVisual: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative perspective-1000 group cursor-pointer ${className}`}>
      {/* Book Container */}
      <div className="relative w-64 h-96 transition-transform duration-500 transform-style-3d rotate-y-[-15deg] group-hover:rotate-y-[-5deg] group-hover:scale-105 mx-auto">
        
        {/* Front Cover */}
        <div className="absolute inset-0 bg-[#0a0a0a] rounded-r-sm shadow-2xl flex flex-col justify-between p-6 border-l-2 border-white/10 z-10 overflow-hidden">
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            
            <div className="mt-8 relative z-10">
                <p className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4 border-b border-brand-gold/30 pb-2 inline-block">Student Guide</p>
                <h1 className="text-4xl font-extrabold text-white leading-none font-sans tracking-tighter">
                    HOURS<br/>
                    <span className="text-brand-gold">AND</span><br/>
                    FUTURE
                </h1>
                <h2 className="text-sm font-medium text-brand-muted mt-4 tracking-wide">OWN YOUR TIME</h2>
            </div>

            <div className="relative z-10">
                {/* Abstract Time Icon */}
                <div className="w-12 h-12 border border-brand-gold/50 rounded-full flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-brand-gold/10 blur-md rounded-full"></div>
                    <div className="w-0.5 h-4 bg-brand-gold absolute top-2 left-[22px] origin-bottom animate-[spin_10s_linear_infinite]"></div>
                    <div className="w-0.5 h-3 bg-white absolute top-3 left-[22px] origin-bottom rotate-45"></div>
                </div>

                <p className="text-xs text-white/60 font-medium tracking-wider uppercase">Adinathreddy Anugu</p>
            </div>
            
            {/* Gold Edge Highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-white/20 to-transparent"></div>
        </div>

        {/* Side (Spine) */}
        <div className="absolute top-0.5 bottom-0.5 -left-4 w-4 bg-[#111] transform rotate-y-[-90deg] translate-x-2 rounded-l-sm border-r border-white/10 flex flex-col items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-gradient-to-b from-brand-gold/20 via-transparent to-brand-gold/20 opacity-30"></div>
        </div>
        
        {/* Pages (Right Side) */}
        <div className="absolute top-1 bottom-1 -right-3 w-4 bg-[#e2e2e2] border-r border-slate-300 transform rotate-y-90 translate-x-[-10px] shadow-inner">
             <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,#d4d4d4_2px)]"></div>
        </div>
        
        {/* Shadow */}
        <div className="absolute -bottom-10 left-4 right-4 h-6 bg-brand-gold/20 blur-2xl rounded-[100%] transform rotate-x-60"></div>
      </div>
    </div>
  );
};

export default BookVisual;