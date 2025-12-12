import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Check, Zap, User, Bot, Image as ImageIcon, Paperclip, Video, X, Battery, LogOut, Hourglass } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

const NextHours: React.FC = () => {
  const { user, isAuthenticated, incrementFreeUsage, saveChatSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Local UI state for modal flow (Upgrade/Limit)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [modalType, setModalType] = useState<'feature' | 'limit'>('feature'); 
  const [showPurchaseComingSoon, setShowPurchaseComingSoon] = useState(false);
  
  // Track current session ID to update the same conversation instead of creating duplicates
  const sessionIdRef = useRef<string | undefined>(undefined);
  const [hasStartedSession, setHasStartedSession] = useState(false);
  
  const FREE_CHAT_LIMIT = 5;

  // Chat State
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hello! I'm NextHours, your personal growth AI. I can help you with time management, motivation, and questions about the 'Hours and Future' system. How can I help you today?", timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{name: string, type: 'image'|'video'} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if we are loading an existing chat from history
  useEffect(() => {
      const state = location.state as { chatSessionId?: string, initialMessages?: ChatMessage[] } | null;
      if (state?.chatSessionId && state?.initialMessages) {
          sessionIdRef.current = state.chatSessionId;
          setMessages(state.initialMessages);
          setHasStartedSession(true); // Treat as started so we don't double count if user resumes a chat
      } else {
          // New Chat initialization
          sessionIdRef.current = Date.now().toString();
      }
  }, [location.state]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-save logic
  useEffect(() => {
      if (messages.length > 1 && sessionIdRef.current) { 
          saveChatSession(messages, sessionIdRef.current);
      }
  }, [messages, saveChatSession]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;

    // Check Authentication
    if (!isAuthenticated || !user) {
        navigate('/login');
        return;
    }

    // Check Free Limit (Only on the first message of a NEW session)
    if (user.subscriptionTier === 'free' && !hasStartedSession) {
       if (user.freeUsageCount >= FREE_CHAT_LIMIT) {
          setModalType('limit');
          setShowUpgradeModal(true);
          return;
       }
       incrementFreeUsage();
       setHasStartedSession(true);
    }

    const userMessage = input.trim();
    const currentAttachment = attachedFile;
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage,
      timestamp: Date.now(),
      attachment: currentAttachment || undefined
    }]);
    
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are NextHours, an advanced AI assistant integrated into the 'Hours and Future' website by Adinathreddy Anugu...` // (Shortened for brevity, keep original)
            }
        });

        let prompt = userMessage;
        if (currentAttachment) {
          prompt += ` [User attached a ${currentAttachment.type}: ${currentAttachment.name}. Analyze this as if you could see it (Simulated for demo).]`;
        }

        const result = await chat.sendMessage({ message: prompt });
        const text = result.text;
        
        setMessages(prev => [...prev, { role: 'assistant', text: text, timestamp: Date.now() }]);

    } catch (error) {
        console.error("AI Error:", error);
        setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting to the neural network right now. Please try again in a moment.", timestamp: Date.now() }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAttachmentClick = () => {
    if (!user) return;
    if (user.subscriptionTier === 'standard' || user.subscriptionTier === 'free') {
      setModalType('feature');
      setShowUpgradeModal(true);
    } else {
      const types: ('image' | 'video')[] = ['image', 'video'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setAttachedFile({
        name: `screenshot_${Date.now()}.${randomType === 'image' ? 'png' : 'mp4'}`,
        type: randomType
      });
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
      return (
        <div className="pt-32 min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
            <p className="text-brand-muted mb-6">You need an account to access NextHours AI.</p>
            <NavLink to="/login" className="bg-brand-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
                Log In / Sign Up
            </NavLink>
        </div>
      );
  }

  // --- UPGRADE MODAL ---
  const UpgradeModal = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
       {showPurchaseComingSoon ? (
           <div className="bg-[#0A0A0A] border border-brand-gold/30 rounded-[2rem] max-w-md w-full p-8 relative shadow-[0_0_50px_rgba(251,191,36,0.2)] text-center pointer-events-auto">
              <button 
                onClick={() => {
                    setShowPurchaseComingSoon(false);
                    setShowUpgradeModal(false); // Close entire flow
                }}
                className="absolute top-4 right-4 text-brand-muted hover:text-white"
              >
                 <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold border border-brand-gold/20">
                 <Hourglass size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Payments Coming Soon</h3>
              <p className="text-brand-muted mb-8 leading-relaxed">
                 We are currently finalizing our secure payment gateway. The ability to upgrade will be available extremely soon.
              </p>
              
              <button 
                 onClick={() => {
                    setShowPurchaseComingSoon(false);
                    setShowUpgradeModal(false);
                 }}
                 className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg"
              >
                 Got it
              </button>
           </div>
       ) : (
           <div className="bg-[#0A0A0A] border border-brand-gold/30 rounded-[2rem] max-w-md w-full p-8 relative shadow-[0_0_50px_rgba(251,191,36,0.2)] pointer-events-auto">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-brand-muted hover:text-white"
              >
                 <X size={24} />
              </button>
              
              <div className="text-center mb-6">
                 <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 text-brand-black">
                    {modalType === 'limit' ? <Battery size={24} /> : <ImageIcon size={24} />}
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">
                   {modalType === 'limit' ? 'Free Chat Limit Reached' : 'Upgrade to Premium'}
                 </h3>
                 <p className="text-brand-muted">
                   {modalType === 'limit' 
                      ? "You've used all 5 free conversations. Upgrade to start new chats."
                      : "To upload images, videos, and screenshots for AI analysis, you need the Premium plan."
                   }
                 </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">
                      {modalType === 'limit' ? 'Standard Plan' : 'Premium Plan'}
                    </span>
                    <span className="text-brand-gold font-bold">
                      {modalType === 'limit' ? '$4.99' : '$9.99'} <span className="text-xs font-normal text-brand-muted">/mo</span>
                    </span>
                 </div>
                 <p className="text-xs text-brand-muted">
                    {modalType === 'limit' 
                      ? "Unlock unlimited chats & messages." 
                      : "Unlock media analysis instantly."}
                 </p>
              </div>

              <button 
                 onClick={() => setShowPurchaseComingSoon(true)}
                 className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg"
              >
                 Upgrade Now
              </button>
           </div>
       )}
    </div>
  );

  return (
    <div className="pt-24 h-screen bg-brand-black text-white flex flex-col relative pointer-events-auto">
       {showUpgradeModal && <UpgradeModal />}
       
       {/* Chat Header */}
       <div className="border-b border-white/10 bg-[#0A0A0A] px-4 py-4 flex items-center justify-between shrink-0 z-20 relative">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/20">
               <Bot size={24} className="text-brand-black" />
             </div>
             <div>
                <h1 className="font-bold text-white flex items-center gap-2">
                  NextHours AI 
                  {user.subscriptionTier === 'premium' && (
                     <span className="text-[10px] bg-brand-gold text-brand-black px-2 py-0.5 rounded-full font-bold">PREMIUM</span>
                  )}
                  {user.subscriptionTier === 'standard' && (
                     <span className="text-[10px] bg-white/10 text-brand-muted px-2 py-0.5 rounded-full border border-white/10">STANDARD</span>
                  )}
                  {user.subscriptionTier === 'free' && (
                     <span className="text-[10px] bg-white/10 text-brand-muted px-2 py-0.5 rounded-full border border-white/10">FREE TRIAL</span>
                  )}
                </h1>
                <p className="text-xs text-brand-muted flex items-center gap-1">
                   {user.subscriptionTier === 'free' 
                     ? <span className={`text-brand-gold font-bold`}>
                         {Math.max(0, FREE_CHAT_LIMIT - user.freeUsageCount)} chats left
                       </span>
                     : <><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</>
                   }
                </p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             {user.subscriptionTier !== 'premium' && (
                <button 
                  onClick={() => {
                     setModalType('feature'); // Default upgrade modal
                     setShowUpgradeModal(true);
                  }}
                  className="hidden md:flex items-center gap-1 text-xs font-bold text-brand-black bg-brand-gold px-3 py-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                   <Zap size={12} /> Upgrade
                </button>
             )}
             <button 
                onClick={() => navigate('/dashboard')} 
                className="text-xs font-bold text-white bg-white/10 hover:bg-red-500/80 transition-colors border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
             >
                <LogOut size={14} /> Exit Chat
             </button>
          </div>
       </div>

       {/* Messages Area */}
       <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-brand-surfaceHighlight scrollbar-track-transparent">
          {messages.map((msg, index) => (
             <div 
               key={index} 
               className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
             >
                {/* ... (Avatar & Bubble) */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'assistant' ? 'bg-brand-gold text-brand-black' : 'bg-white/10 text-white'
                }`}>
                   {msg.role === 'assistant' ? <Sparkles size={16} /> : <User size={16} />}
                </div>
                <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                   {msg.attachment && (
                      <div className="bg-[#111] border border-white/10 rounded-xl p-3 flex items-center gap-3 max-w-[200px]">
                         <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-brand-gold">
                            {msg.attachment.type === 'image' ? <ImageIcon size={20} /> : <Video size={20} />}
                         </div>
                         <div className="overflow-hidden">
                            <p className="text-xs text-white truncate font-medium">{msg.attachment.name}</p>
                            <p className="text-[10px] text-brand-muted uppercase">{msg.attachment.type}</p>
                         </div>
                      </div>
                   )}
                   <div className={`rounded-2xl px-6 py-4 text-base leading-7 shadow-md whitespace-pre-wrap ${
                     msg.role === 'assistant' 
                       ? 'bg-[#151515] border border-white/10 text-white/90' 
                       : 'bg-white text-black font-medium'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             </div>
          ))}
          {isLoading && (
             <div className="flex gap-4 max-w-3xl mr-auto">
                {/* ... Loading state ... */}
                <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-black flex items-center justify-center shrink-0 mt-1">
                   <Sparkles size={16} />
                </div>
                <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-1">
                   <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                   <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
       </div>

       {/* Input Area */}
       <div className="shrink-0 p-4 bg-[#050505] border-t border-white/10 relative z-20">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative">
             
             {/* --- FREE TIER USAGE VISUALIZER --- */}
             {user.subscriptionTier === 'free' && (
                <div className="mb-3 px-2 animate-fade-in">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-brand-muted mb-1.5">
                    <span>Free Trial Usage</span>
                    <span className={user.freeUsageCount >= FREE_CHAT_LIMIT ? "text-red-500" : "text-brand-gold"}>
                      {FREE_CHAT_LIMIT - user.freeUsageCount} / {FREE_CHAT_LIMIT} Chats Remaining
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ease-out ${user.freeUsageCount >= FREE_CHAT_LIMIT ? 'bg-red-500' : 'bg-brand-gold'}`}
                      style={{ width: `${(user.freeUsageCount / FREE_CHAT_LIMIT) * 100}%` }}
                    ></div>
                  </div>
                </div>
             )}

             {/* Attachment Preview */}
             {attachedFile && (
                <div className="absolute bottom-full left-0 mb-4 bg-[#1A1A1A] border border-white/10 rounded-xl p-2 flex items-center gap-3 shadow-xl animate-slide-up">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-brand-gold">
                        {attachedFile.type === 'image' ? <ImageIcon size={20} /> : <Video size={20} />}
                    </div>
                    <div>
                        <p className="text-xs text-white font-bold">{attachedFile.name}</p>
                        <p className="text-[10px] text-brand-muted">Ready to send</p>
                    </div>
                    <button 
                       type="button" 
                       onClick={() => setAttachedFile(null)}
                       className="p-1 hover:bg-white/10 rounded-full text-brand-muted hover:text-white"
                    >
                       <X size={14} />
                    </button>
                </div>
             )}

             <div className="relative flex items-center">
                 <button
                    type="button"
                    onClick={handleAttachmentClick}
                    className={`absolute left-2 p-2 rounded-full transition-colors cursor-pointer ${
                       user.subscriptionTier === 'premium' 
                          ? 'text-brand-gold hover:bg-brand-gold/10'
                          : 'text-brand-muted hover:text-white hover:bg-white/10' 
                    }`}
                    title={user.subscriptionTier === 'premium' ? "Attach image or video" : "Upgrade to attach files"}
                 >
                    <Paperclip size={20} />
                 </button>

                 <input
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder={
                      user.subscriptionTier === 'free' && user.freeUsageCount >= FREE_CHAT_LIMIT && !hasStartedSession
                        ? "Free chat limit reached. Upgrade to continue..."
                        : user.subscriptionTier === 'premium' 
                             ? "Message NextHours (Images & Video supported)..." 
                             : "Message NextHours..."
                   }
                   disabled={user.subscriptionTier === 'free' && user.freeUsageCount >= FREE_CHAT_LIMIT && !hasStartedSession}
                   className="w-full bg-[#111] text-white border border-white/10 rounded-full pl-12 pr-14 py-4 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold placeholder-white/20 transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                 />
                 <button 
                   type="submit" 
                   disabled={(!input.trim() && !attachedFile) || isLoading || (user.subscriptionTier === 'free' && user.freeUsageCount >= FREE_CHAT_LIMIT && !hasStartedSession)}
                   className="absolute right-2 p-2.5 bg-brand-gold text-brand-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                 >
                    <Send size={18} />
                 </button>
             </div>
          </form>
          <div className="text-center mt-3 text-[10px] text-brand-muted/50 flex justify-center items-center gap-2">
             <span>NextHours AI can make mistakes.</span>
             {user.subscriptionTier !== 'premium' && (
                <button 
                   onClick={() => {
                      setModalType('feature');
                      setShowUpgradeModal(true);
                   }} 
                   className="text-brand-gold hover:underline cursor-pointer"
                >
                   {user.subscriptionTier === 'free' ? 'Unlock unlimited chats.' : 'Need to upload screenshots? Upgrade to Pro.'}
                </button>
             )}
          </div>
       </div>
    </div>
  );
};

export default NextHours;