import React from 'react';

const BookVisual: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative perspective-1000 group cursor-pointer ${className}`}>
      {/* Book Container */}
      <div className="relative w-64 h-96 transition-transform duration-500 transform-style-3d rotate-y-[-15deg] group-hover:rotate-y-[-5deg] group-hover:scale-105 mx-auto">
        
        {/* Front Cover */}
        <div className="absolute inset-0 bg-[#050505] shadow-2xl flex flex-col justify-between p-8 border border-white/10 z-10 overflow-hidden">
            {/* Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
            
            <div className="mt-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-brand-gold text-[10px] font-mono tracking-widest uppercase">Vol. 01</p>
                    <div className="w-4 h-4 rounded-full border border-brand-gold/50"></div>
                </div>
                
                <h1 className="text-5xl font-bold text-white leading-[0.85] font-sans tracking-tighter mb-2">
                    HOURS<br/>
                    <span className="text-brand-muted">&</span><br/>
                    FUTURE
                </h1>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-4">
                <p className="text-xs text-white font-mono uppercase tracking-widest mb-1">System Manual</p>
                <p className="text-[10px] text-brand-muted">Adinathreddy Anugu</p>
            </div>
            
            {/* Gloss */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Side (Spine) */}
        <div className="absolute top-0 bottom-0 -left-4 w-4 bg-[#0a0a0a] transform rotate-y-[-90deg] translate-x-2 border-l border-r border-white/10 flex flex-col items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-brand-gold/10"></div>
        </div>
        
        {/* Pages (Right Side) */}
        <div className="absolute top-1 bottom-1 -right-3 w-4 bg-[#1a1a1a] border-r border-white/10 transform rotate-y-90 translate-x-[-10px]">
             <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,#333_2px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default BookVisual;