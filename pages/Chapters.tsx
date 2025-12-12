import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Clock, Target, Lock, Eye, Book, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const chapters = [
  { id: 1, title: "Understanding Your Time", desc: "Why we perceive time differently when we scroll vs when we study. A deep dive into relativity in the digital age.", icon: Clock },
  { id: 2, title: "Identifying Distractions", desc: "The digital detox guide for the modern student. How to audit your environment for success.", icon: Target },
  { id: 3, title: "Setting Meaningful Goals", desc: "How to use the SMART+ framework tailored for young adults. Moving beyond wishful thinking.", icon: BookOpen },
  { id: 4, title: "Prioritizing Well-Being", desc: "Sleep, nutrition, and mental health as productivity multipliers, not optional extras.", icon: Clock },
  { id: 5, title: "Building a Reading Habit", desc: "Why leaders are readers, and how to read 50 books a year without burning out.", icon: BookOpen },
  { id: 6, title: "Developing New Skills", desc: "Leveraging the internet to learn anything faster. The art of autodidacticism.", icon: Target },
  { id: 7, title: "Mastering Organization", desc: "Decluttering your physical and digital space for mental clarity and speed.", icon: Clock },
  { id: 8, title: "Overcoming Procrastination", desc: "The psychological roots of 'doing it later' and how to cut them at the source.", icon: Target },
  { id: 9, title: "Living Purposefully", desc: "Connecting your daily hours to your life's ultimate mission. The capstone of the system.", icon: BookOpen },
];

// Structured content for Chapter 1
const chapter1Sections = [
  {
    title: "The Illusion of Busy",
    content: [
      "Has the question of where the hours of your day go ever crossed your mind? Perhaps you sat down to play a game or browse social media, only to discover that hours have passed. The first step to taking back your time is realizing how you spend it.",
      "If you invested those hours in things that truly matter to you, just think of what you could accomplish. This is the point at which the concept of a **Time Audit** becomes relevant. A time audit is like putting up a mirror to your everyday routines; it's not simply about keeping track of minutes. Imagine how enlightening it would be to look at your routines for what they truly are, rather than what you believe them to be."
    ]
  },
  {
    title: "Mapping Your Reality",
    content: [
      "Imagine your day for a moment. What do you do when you wake up? What do you do with your spare time after school? You'll probably identify habits that don't support your objectives or interests as you think back on them.",
      "Make a list of everything you do on a normal day to start. This straightforward activity may seem tiresome, yet it can yield unexpected insights. Perhaps you'll see that you're wasting your time binge-watching shows or aimlessly scrolling. Conversely, you may find hidden periods throughout the day that could be used for more rewarding activities, such as beginning a long-suppressed project or taking up a new interest. Sort your activities into categories after you've logged them."
    ]
  },
  {
    title: "The Power of Patterns",
    content: [
      "You can determine where your time is slipping away by identifying trends. Is there a sizable portion devoted to leisure that might be used for personal development instead? Finding these blocks is essential for making well-informed schedule selections.",
      "Even though facing your daily routine may seem overwhelming at first, keep in mind that you are capable of change. Every moment you take back is a step closer to realizing your goals. The secret is **awareness, not perfection**. As you progress through this chapter, consider the adjustments you may want to adopt and the sense of empowerment that comes from taking charge of your time."
    ]
  },
  {
    title: "Emotional Timekeeping",
    content: [
      "Do you feel energized after browsing social media, or does it make you feel depleted? It might be enlightening to consider how each action affects your motivation and mood. Developing an understanding of your emotional environment will help you make better decisions about how to spend your time.",
      "For example, if a certain hobby makes you happy, think about how you may more carefully include it in your everyday routine. Additionally, this is a fantastic chance to commemorate the times you chose to spend time with friends or drop into a project that you are pleased with."
    ]
  },
  {
    title: "Reclaiming the Margins",
    content: [
      "Let's now discuss those moments that are frequently overlooked. You might be waiting for your bus or have a few minutes before class begins. These little pieces could be hidden gems just waiting to be discovered. Think about reading a few pages of that book you've had your eye on or downloading an app to learn a language. Even the ordinary moments can change if they are redirected, second by second.",
      "What do you need to let go of as you think back on your time audit? A turning point may occur when you see that certain habits are holding you back rather than advancing you."
    ]
  },
  {
    title: "Growth, Not Perfection",
    content: [
      "Remind yourself that you are in control now that you have realized that a shift is necessary. Change is possible, and that is the crucial question. The most important aspect is having faith in your ability to efficiently manage your time and use it to support your goals.",
      "Ultimately, keep in mind that growth, not perfection, is the goal of this trip. Every step you take to become stronger at managing your time is a win. Keep your findings in mind as you close off this time audit chapter and use them to inform your future actions. You get closer to leading a life that is shaped by choice and intention rather than chaos with every moment you regain."
    ]
  }
];

const Chapters: React.FC = () => {
  const [isReading, setIsReading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Navigate to coming soon page
  const scrollToBuy = () => {
    navigate('/coming-soon');
  };

  const handleChapterClick = (id: number) => {
    if (id === 1) {
      setIsReading(true);
    } else {
      scrollToBuy();
    }
  };

  const handleScroll = () => {
    if (modalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  // Lock body scroll when reading to prevent background scrolling
  useEffect(() => {
    if (isReading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isReading]);

  return (
    <div className="pt-32 bg-brand-black min-h-screen text-white relative overflow-hidden">
      
      {/* Reading Modal */}
      {isReading && (
        <div className="fixed inset-0 z-40 bg-brand-black flex flex-col animate-fade-in pt-24 h-screen w-screen">
          
          {/* Progress Bar - Moved to Bottom */}
          <div className="h-1.5 bg-white/10 w-full fixed bottom-0 left-0 z-[60]">
             <div 
               className="h-full bg-brand-gold transition-all duration-100 ease-out shadow-[0_0_15px_rgba(251,191,36,0.8)]" 
               style={{ width: `${scrollProgress}%` }}
             ></div>
          </div>

          {/* Modal Content */}
          <div 
            ref={modalRef}
            onScroll={handleScroll}
            className="flex-grow overflow-y-auto bg-[#050505] scrollbar-thin scrollbar-thumb-brand-surfaceHighlight pb-20"
          >
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
              
              <button 
                 onClick={() => setIsReading(false)}
                 className="mb-8 flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-medium sticky top-0 bg-[#050505]/80 backdrop-blur-md py-4 z-10 w-full border-b border-white/5"
              >
                 <ArrowLeft size={16} /> Back to Chapters
              </button>

              <div className="mb-16 text-center border-b border-white/5 pb-12">
                <span className="text-brand-gold font-mono text-xs uppercase tracking-[0.3em] mb-6 block">The Beginning</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">Understanding Your Time</h1>
                <p className="text-brand-muted text-sm font-mono uppercase tracking-widest">Est. Read Time: 5 Minutes</p>
              </div>

              <div className="prose prose-invert prose-lg max-w-none space-y-16">
                {chapter1Sections.map((section, sIndex) => (
                  <section key={sIndex} className="animate-slide-up" style={{ animationDelay: `${sIndex * 0.1}s` }}>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                       <span className="text-brand-gold/30 text-base font-mono">0{sIndex + 1} //</span> {section.title}
                    </h2>
                    {section.content.map((paragraph, pIndex) => {
                       // 1. Specific Tooltip for "Time Audit"
                       let formattedText = paragraph.replace(
                          /\*\*Time Audit\*\*/g,
                          `<span class="group relative cursor-help inline-block text-brand-gold font-semibold border-b border-brand-gold/30 border-dashed pb-0.5 z-20">
                             Time Audit
                             <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-[#1a1a1a] border border-brand-gold/20 rounded-xl text-xs text-brand-muted font-normal opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl z-50 text-center leading-relaxed">
                               <span class="text-brand-gold font-bold block mb-1 uppercase tracking-wider text-[10px]">Definition</span>
                               The process of tracking exactly how you spend every minute of your day to identify patterns and waste.
                             </span>
                           </span>`
                       );

                       // 2. Generic Bold handling for other bold text
                       formattedText = formattedText.replace(
                          /\*\*(?!Time Audit)(.*?)\*\*/g, 
                          '<span class="text-brand-gold font-semibold">$1</span>'
                       );
                       
                       return (
                          <p 
                            key={pIndex} 
                            className="text-brand-muted text-lg md:text-xl leading-relaxed mb-6 font-light"
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                          />
                       );
                    })}
                  </section>
                ))}
              </div>

              {/* End of Chapter CTA */}
              <div className="mt-24 pt-16 border-t border-white/10 text-center bg-[#0A0A0A] rounded-[2rem] p-12 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready for the Next Step?</h3>
                    <p className="text-brand-muted mb-8 max-w-lg mx-auto">
                      You've mastered the basics of auditing your time. Now learn how to eliminate the distractions you found.
                    </p>
                    <button 
                      onClick={() => { setIsReading(false); setTimeout(scrollToBuy, 300); }}
                      className="bg-brand-gold text-brand-black font-bold py-4 px-12 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] transform hover:scale-105"
                    >
                      Unlock All 9 Chapters
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
             <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"></span>
             <span className="text-xs font-medium text-brand-gold uppercase tracking-wider">Curriculum</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">The System <span className="text-brand-muted">Explained</span></h1>
          <p className="text-xl text-brand-muted leading-relaxed">
            Start your journey with a free preview of Chapter 1. Unlock the full 9-step engineered pathway by purchasing the book.
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {chapters.map((chapter) => {
            const isLocked = chapter.id !== 1;

            return (
              <div 
                key={chapter.id} 
                className={`group relative border p-1 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  isLocked 
                    ? 'bg-[#080808] border-white/5 opacity-80 hover:opacity-100 hover:border-white/10' 
                    : 'bg-gradient-to-br from-brand-gold/20 to-brand-black border-brand-gold/50 shadow-[0_0_30px_rgba(251,191,36,0.1)]'
                }`}
                onClick={() => handleChapterClick(chapter.id)}
              >
                 
                 {/* Inner Card Content */}
                 <div className={`h-full rounded-[1.8rem] p-8 relative overflow-hidden flex flex-col justify-between ${
                    isLocked ? 'bg-[#0A0A0A]' : 'bg-[#0A0A0A]/90 backdrop-blur-sm'
                 }`}>
                    
                    {/* Subtle Number Watermark */}
                    <div className={`absolute -right-4 -top-6 text-[120px] font-bold font-mono select-none transition-colors duration-500 ${
                        isLocked ? 'text-white/[0.02]' : 'text-brand-gold/[0.1]'
                    }`}>
                      {chapter.id}
                    </div>

                    {/* Lock Overlay for Locked Chapters */}
                    {isLocked && (
                        <div className="absolute top-4 right-4 bg-white/5 rounded-full p-2 border border-white/5 text-brand-muted group-hover:text-white transition-colors">
                            <Lock size={16} />
                        </div>
                    )}

                    {/* Free Tag for Chapter 1 */}
                    {!isLocked && (
                        <div className="absolute top-4 right-4 bg-brand-gold text-brand-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse-slow">
                            Free Preview
                        </div>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-8">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                             isLocked 
                                ? 'bg-white/5 text-white/50 group-hover:bg-white/10' 
                                : 'bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20'
                         }`}>
                           <chapter.icon size={20} />
                         </div>
                         <span className={`font-mono text-sm tracking-wider ${isLocked ? 'text-brand-muted' : 'text-brand-gold font-bold'}`}>
                             MODULE 0{chapter.id}
                         </span>
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 pr-4 ${
                          isLocked ? 'text-white group-hover:text-white/80' : 'text-white'
                      }`}>
                        {chapter.title}
                      </h3>
                      <p className={`text-sm leading-7 transition-colors duration-300 ${
                          isLocked ? 'text-brand-muted group-hover:text-white/60' : 'text-brand-muted'
                      }`}>
                        {chapter.desc}
                      </p>
                    </div>

                    <div className={`mt-8 pt-6 border-t flex items-center text-sm font-medium transition-colors ${
                        isLocked 
                            ? 'border-white/5 text-white/30 group-hover:text-white/50' 
                            : 'border-white/10 text-brand-gold group-hover:text-white'
                    }`}>
                       {isLocked ? (
                           <>
                             <Lock size={14} className="mr-2" />
                             <span>Locked - Buy to Read</span>
                           </>
                       ) : (
                           <>
                             <Eye size={16} className="mr-2" />
                             <span className="mr-2">Read Chapter 1</span>
                             <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                           </>
                       )}
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div id="buy-section" className="bg-[#050505] border-t border-white/5 py-24 text-center px-4 relative z-20">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Unlock the Full System</h2>
            <p className="text-brand-muted mb-10 text-lg">
                Gain instant access to all 9 chapters, plus the full suite of templates and tools.
            </p>
            <button 
                onClick={scrollToBuy}
                className="bg-brand-gold text-brand-black font-bold py-4 px-12 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
            >
                Get Full Access Now
            </button>
         </div>
      </div>
    </div>
  );
};

export default Chapters;