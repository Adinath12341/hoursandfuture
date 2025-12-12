import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Clock, Target, Zap, BookOpen, ArrowRight, Activity, Shield, Layout, Briefcase, Globe, Database, Pen, Star, Layers, Map, Sparkles, Bot, Check, X, Image as ImageIcon, Video, Brain, Lock, ChevronLeft, ChevronRight, Bell, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Floating 3D Icon Component
const FloatingIcon = ({ icon: Icon, delay = '0s', floatClass = 'animate-float' }: { icon: any, delay?: string, floatClass?: string }) => (
  <div 
    className={`relative group perspective-container ${floatClass}`} 
    style={{ animationDelay: delay }}
  >
    <div className="absolute inset-0 bg-brand-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <div className="relative w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-[#1A1A1A] to-[#050505] border border-white/10 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12 group-hover:scale-110 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 to-transparent rounded-2xl opacity-50"></div>
      
      {/* 3D Depth Sides (Pseudo-3D) */}
      <div className="absolute right-0 bottom-0 w-full h-1 bg-brand-gold/20 transform skew-x-45 origin-bottom translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute right-0 bottom-0 w-1 h-full bg-brand-gold/10 transform skew-y-45 origin-right translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <Icon size={40} className="text-white group-hover:text-brand-gold transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" strokeWidth={1.5} />
    </div>
  </div>
);

// Updated Feature Card for 2x2 Grid Layout
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  desc, 
  highlight, 
  isGold = false 
}: { 
  icon: any, 
  title: string, 
  desc: React.ReactNode, 
  highlight?: string, 
  isGold?: boolean 
}) => (
  <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/5 flex flex-col h-full min-h-[340px]">
    
    {/* Large Background Watermark */}
    <div className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 pointer-events-none">
       <Icon size={350} className="text-white" strokeWidth={1} />
    </div>
    
    <div className="relative z-10 flex flex-col h-full items-start">
       {/* Icon Box */}
       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 ${
         isGold 
           ? 'bg-brand-gold text-brand-black shadow-[0_0_30px_rgba(251,191,36,0.3)] scale-105' 
           : 'bg-white/5 border border-white/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-transparent'
       }`}>
         <Icon size={32} />
       </div>
       
       <div className="mt-auto w-full">
         <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{title}</h3>
         <div className="text-brand-muted text-lg leading-relaxed mb-6 max-w-sm font-light">{desc}</div>
         {highlight && (
            <div className="text-brand-gold font-mono text-xl font-bold tracking-tight py-4 border-t border-white/10 inline-block w-full">
              {highlight}
            </div>
         )}
       </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentDiffIndex, setCurrentDiffIndex] = useState(0);

  const handleUpgradeClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const ecosystemItems = [
    { icon: Clock, label: "Time Mastery" },
    { icon: Target, label: "Goal Setting" },
    { icon: Zap, label: "Energy Mgmt" },
    { icon: BookOpen, label: "Deep Reading" },
    { icon: Activity, label: "Live Tracking" },
    { icon: Shield, label: "Focus Defense" },
    { icon: Layout, label: "Life Systems" },
    { icon: Briefcase, label: "Career Skills" },
    { icon: Globe, label: "Networking" },
    { icon: Database, label: "Knowledge Base" },
    { icon: Star, label: "Excellence" },
    { icon: Layers, label: "Habit Stacking" },
    { icon: Map, label: "Strategic Vision" },
    { icon: Pen, label: "Journaling" }
  ];

  const differences = [
    {
      icon: Brain,
      title: "Context-Aware Coaching",
      desc: "Grounded deeply in the 'Hours and Future' system. It doesn't just chat; it coaches you using specific frameworks tailored to your student journey."
    },
    {
      icon: ImageIcon,
      title: "Visual Analysis Engine",
      desc: "Premium users can upload schedules or study setups. The AI 'sees' your environment to offer tangible, spatial improvements for your workflow."
    },
    {
      icon: Lock,
      title: "Safe & Focused",
      desc: "A dedicated space free from social noise. Designed to reduce student anxiety and build confidence without the distractions of general platforms."
    },
    {
      icon: Target,
      title: "Goal-Oriented Memory",
      desc: "Unlike stateless bots, NextHours remembers your specific academic and personal goals, framing every answer to help you achieve them."
    },
    {
      icon: Bell,
      title: "Proactive Accountability",
      desc: "It doesn't just wait for you. NextHours checks in on your deadlines and progress, acting like a dedicated study buddy to keep you on track."
    },
    {
      icon: FileText,
      title: "Resource Integration",
      desc: "Instantly references relevant worksheets from the book, like the Time Audit, turning concepts into immediate practice within the chat."
    }
  ];

  const nextDifference = () => {
    setCurrentDiffIndex((prev) => (prev + 1) % differences.length);
  };

  const prevDifference = () => {
    setCurrentDiffIndex((prev) => (prev - 1 + differences.length) % differences.length);
  };

  return (
    <div className="overflow-hidden bg-brand-black text-brand-text">
      
      {/* --- STICKY HERO SECTION --- */}
      <div className="relative h-[115vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-black pb-12">
          
          {/* Atmospheric Glows */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="container max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            
            {/* Tag */}
            <div className="animate-fade-in mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em]">Future Proof Your Life</span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.05]">
              Step into the <br />
              Future of <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-brand-goldDim drop-shadow-lg">Focus.</span>
            </h1>
            
            <p className="animate-fade-in text-lg md:text-xl text-brand-muted mb-10 max-w-2xl leading-relaxed opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Maximize your potential with a powerful system built to shape the future of your time, habits, and ambition.
            </p>
            
            {/* CTAs */}
            <div className="animate-fade-in flex flex-col sm:flex-row items-center gap-4 mb-16 opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <NavLink to="/coming-soon" className="h-12 px-8 rounded-full bg-brand-gold text-brand-black font-bold hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(251,191,36,0.2)] flex items-center justify-center">
                Start Reading Now
              </NavLink>
              <NavLink to="/resources" className="h-12 px-8 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
                Free Resources
              </NavLink>
               <NavLink to="/nexthours" className="h-12 px-6 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-black transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                <Sparkles size={16} /> Ask NextHours AI
              </NavLink>
            </div>

            {/* Floating Elements */}
            <div className="animate-slide-up w-full max-w-5xl flex flex-wrap justify-center gap-8 md:gap-16 opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <FloatingIcon icon={Clock} delay="0s" />
              <FloatingIcon icon={Target} delay="1.5s" floatClass="animate-float-delayed" />
              <FloatingIcon icon={Zap} delay="0.5s" />
              <FloatingIcon icon={BookOpen} delay="2s" floatClass="animate-float-delayed" />
            </div>

            {/* Scroll Indicator - Moved below icons */}
            <div className="animate-bounce text-brand-muted/50 text-sm mt-24">
               Scroll to Explore
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section className="relative z-20 pt-24 pb-32 bg-[#050505] shadow-[0_-50px_100px_rgba(0,0,0,1)] rounded-t-[3rem] mt-[-15vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="text-center mb-24">
              <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Join the Revolution</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Setting a New Standard<br/>in Personal Growth</h2>
              <p className="text-brand-muted max-w-2xl mx-auto text-lg">
                Our innovative methodology delivers unleashed performance, making digital focus more effective than ever before.
              </p>
           </div>

           {/* 2x2 Grid Layout */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <FeatureCard 
                icon={Target}
                title="Goal Architecture"
                desc="Stop setting wishes. Start building systems used by top performers."
                highlight="94% Success Rate"
                isGold={true}
              />
              <FeatureCard 
                icon={Activity}
                title="Live Tracking"
                desc="Access up-to-date templates for tracking hours and energy levels precisely."
              />
              <FeatureCard 
                icon={Shield}
                title="Distraction Shield"
                desc="Leverage advanced neuroscience to block noise and retain deep focus."
              />
              <FeatureCard 
                icon={Layout}
                title="Advanced Tools"
                desc="Leverage our advanced analytics and templates to enhance your future strategy."
              />
           </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <section className="relative z-20 py-24 bg-black border-y border-white/5 overflow-hidden">
        <div className="text-center mb-16 relative z-10">
           <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Proven Methodology</span>
           <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Entire Growth Ecosystem</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-linear-fade">
             <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10"></div>
             <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10"></div>
             
             <div className="flex w-max animate-marquee space-x-16 items-center hover:pause-animation">
                {[...ecosystemItems, ...ecosystemItems].map((item, i) => (
                    <div key={i} className="group flex flex-col items-center justify-center gap-3 min-w-[100px] transition-all duration-300 cursor-default">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-gold group-hover:border-brand-gold/30 group-hover:bg-brand-gold/5 transition-all transform group-hover:scale-110 duration-500">
                          <item.icon size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold text-brand-muted/50 group-hover:text-white/80 transition-colors uppercase tracking-widest text-center whitespace-nowrap">
                          {item.label}
                        </span>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* --- NEXTHOURS AI PROMO SECTION --- */}
      <section className="relative z-20 py-32 bg-[#050505] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                  {/* Text Content */}
                  <div>
                      <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block flex items-center gap-2">
                          <Sparkles size={14} /> NextHours AI
                      </span>
                      <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                          Your Personal <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-goldDim">Growth Coach.</span>
                      </h2>
                      <p className="text-brand-muted text-lg leading-relaxed mb-8">
                          Stuck on a tough chapter? Need a specific strategy for exam week? NextHours is trained on the entire "Hours and Future" methodology to give you instant, personalized answers.
                      </p>
                      
                      <div className="space-y-4 mb-10">
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-gold">
                                  <Zap size={20} />
                              </div>
                              <div>
                                  <h4 className="text-white font-bold">Instant Clarity</h4>
                                  <p className="text-sm text-brand-muted">Get immediate answers to your productivity blockers.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-gold">
                                  <Shield size={20} />
                              </div>
                              <div>
                                  <h4 className="text-white font-bold">Personalized Strategy</h4>
                                  <p className="text-sm text-brand-muted">Advice tailored to your specific schedule and goals.</p>
                              </div>
                          </div>
                      </div>

                      <NavLink to="/nexthours" className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                          <Sparkles size={18} /> Ask NextHours AI
                      </NavLink>
                  </div>

                  {/* Chat Visual Mockup */}
                  <div className="relative">
                      {/* Abstract bg behind phone/chat */}
                      <div className="absolute inset-0 bg-brand-gold/10 blur-3xl transform rotate-6"></div>
                      
                      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                          {/* Chat Header */}
                          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-black">
                                      <Bot size={20} />
                                  </div>
                                  <div>
                                      <div className="text-white font-bold text-sm">NextHours</div>
                                      <div className="text-xs text-brand-gold flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Chat Bubbles */}
                          <div className="space-y-6">
                              {/* User Msg */}
                              <div className="flex gap-3 justify-end">
                                  <div className="bg-white/10 text-white text-sm py-3 px-5 rounded-2xl rounded-tr-sm max-w-[85%]">
                                      I'm feeling overwhelmed with finals coming up. How do I prioritize?
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs text-white">You</div>
                              </div>

                              {/* AI Msg */}
                              <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-xs text-brand-black font-bold">AI</div>
                                  <div className="bg-[#151515] border border-white/10 text-brand-muted text-sm py-4 px-5 rounded-2xl rounded-tl-sm shadow-lg">
                                      <p className="mb-2">Deep breath. Let's use the <strong>Chapter 3 Goal Architecture</strong>.</p>
                                      <p className="mb-2">1. List all subjects.<br/>2. Identify the high-impact 20% (what counts most).<br/>3. Use time-blocking for deep work sessions.</p>
                                      <p className="text-brand-gold text-xs font-bold mt-2">Shall we build a schedule together?</p>
                                  </div>
                              </div>
                          </div>

                          {/* Input Mockup */}
                          <div className="mt-6 relative">
                              <div className="w-full h-12 bg-black border border-white/10 rounded-full opacity-50"></div>
                              <div className="absolute right-2 top-1 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                  <ArrowRight size={16} className="text-white" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* --- WHY IT'S DIFFERENT SECTION (CAROUSEL) --- */}
              <div className="mt-24 mb-24 relative z-10 max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                  <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Difference</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Not Just Another Chatbot</h3>
                  <p className="text-brand-muted max-w-2xl mx-auto text-lg">
                    Most AIs offer generic information. NextHours is a specialized architect for your personal growth.
                  </p>
                </div>

                <div className="relative bg-white/[0.03] border border-white/5 rounded-[3rem] p-8 md:p-16 min-h-[400px] flex flex-col items-center justify-center text-center transition-all hover:border-brand-gold/20 shadow-2xl">
                    
                    {/* Navigation Buttons Absolute */}
                    <button 
                        onClick={prevDifference} 
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all text-white z-20"
                        aria-label="Previous feature"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextDifference} 
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all text-white z-20"
                        aria-label="Next feature"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Content with Key for Animation */}
                    <div key={currentDiffIndex} className="animate-fade-in flex flex-col items-center max-w-lg mx-auto relative z-10">
                        <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center text-brand-gold mb-8 shadow-[0_0_30px_rgba(251,191,36,0.15)] transform hover:scale-110 transition-transform">
                            {React.createElement(differences[currentDiffIndex].icon, { size: 40 })}
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                            {differences[currentDiffIndex].title}
                        </h4>
                        <p className="text-brand-muted text-lg leading-relaxed font-light">
                            {differences[currentDiffIndex].desc}
                        </p>
                    </div>

                    {/* Indicators */}
                    <div className="flex gap-3 mt-12 absolute bottom-8 left-1/2 -translate-x-1/2">
                        {differences.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentDiffIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentDiffIndex ? 'w-8 bg-brand-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
              </div>

              {/* --- NEW PRICING SECTION --- */}
              <div className="pt-12 border-t border-white/5">
                  <div className="text-center mb-12">
                      <h3 className="text-2xl font-bold text-white mb-4">Choose Your Path</h3>
                      <p className="text-brand-muted">Start for free, upgrade for unlimited power.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {/* Free Plan */}
                      <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all flex flex-col">
                          <div className="mb-6">
                              <span className="text-brand-muted text-sm font-bold uppercase tracking-wider">Free Starter</span>
                              <div className="text-4xl font-bold text-white mt-2">$0 <span className="text-lg text-brand-muted font-normal">/ mo</span></div>
                          </div>
                          <ul className="space-y-4 mb-8 flex-grow">
                              <li className="flex items-center gap-3 text-brand-muted text-sm">
                                  <Check size={16} className="text-white" /> 5 AI Chat Sessions
                              </li>
                              <li className="flex items-center gap-3 text-brand-muted text-sm">
                                  <Check size={16} className="text-white" /> Basic Text Strategy
                              </li>
                              <li className="flex items-center gap-3 text-brand-muted/50 text-sm">
                                  <X size={16} /> No Media Analysis
                              </li>
                          </ul>
                          <NavLink to="/nexthours" className="w-full block text-center border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/5 transition-all">
                              Try for Free
                          </NavLink>
                      </div>

                      {/* Standard Plan */}
                      <div className="bg-[#0e0e0e] border border-brand-gold/20 rounded-[2rem] p-8 relative hover:border-brand-gold/40 transition-all flex flex-col shadow-lg">
                          <div className="mb-6">
                              <span className="text-brand-gold/80 text-sm font-bold uppercase tracking-wider">Standard</span>
                              <div className="text-4xl font-bold text-white mt-2">$4.99 <span className="text-lg text-brand-muted font-normal">/ mo</span></div>
                          </div>
                          <ul className="space-y-4 mb-8 flex-grow">
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Check size={16} className="text-brand-gold" /> Unlimited AI Chats
                              </li>
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Check size={16} className="text-brand-gold" /> Full Knowledge Base Access
                              </li>
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Check size={16} className="text-brand-gold" /> Priority Response Time
                              </li>
                          </ul>
                          <button 
                            onClick={handleUpgradeClick}
                            className="w-full block text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-brand-gold transition-all shadow-md"
                          >
                              Get Standard
                          </button>
                      </div>

                      {/* Premium Plan */}
                      <div className="bg-[#050505] border border-brand-gold rounded-[2rem] p-8 relative hover:scale-105 transition-all flex flex-col shadow-[0_0_40px_rgba(251,191,36,0.15)] z-10">
                          <div className="absolute top-0 inset-x-0 h-1 bg-brand-gold rounded-t-[2rem]"></div>
                          <div className="absolute top-4 right-4 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-1 rounded">BEST VALUE</div>
                          <div className="mb-6">
                              <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">Premium</span>
                              <div className="text-4xl font-bold text-white mt-2">$9.99 <span className="text-lg text-brand-muted font-normal">/ mo</span></div>
                          </div>
                          <ul className="space-y-4 mb-8 flex-grow">
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Check size={16} className="text-brand-gold" /> Everything in Standard
                              </li>
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <ImageIcon size={16} className="text-brand-gold" /> Image Analysis
                              </li>
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Video size={16} className="text-brand-gold" /> Video Analysis
                              </li>
                              <li className="flex items-center gap-3 text-white text-sm font-medium">
                                  <Zap size={16} className="text-brand-gold" /> 24/7 Priority Support
                              </li>
                          </ul>
                          <button 
                            onClick={handleUpgradeClick}
                            className="w-full block text-center bg-brand-gold text-brand-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg"
                          >
                              Get Premium
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-20 py-32 bg-black text-center px-4">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-black pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to Own Your Future?</h2>
            <p className="text-xl text-brand-muted mb-12">The system is ready. The time is now.</p>
            <NavLink to="/coming-soon" className="bg-brand-gold text-brand-black text-lg font-bold py-4 px-12 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(251,191,36,0.3)] inline-block">
                Get the Book Now
            </NavLink>
          </div>
      </section>
    </div>
  );
};

export default Home;