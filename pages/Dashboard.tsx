import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { User, CreditCard, MessageSquare, Clock, Zap, Shield, Check, LogOut, Sparkles, Settings, Camera, Calendar, Mail, Lock, AlertCircle, X, Hourglass } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout, updateSubscription, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'account'>('overview');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const navigate = useNavigate();
  
  // Account Form States
  const [accountForm, setAccountForm] = useState({
      name: user?.name || '',
      dob: user?.dob || '',
      newPassword: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubscriptionChange = (tier: 'free' | 'standard' | 'premium') => {
    if (tier === 'free') {
        // Allow downgrading immediately
        setIsProcessing(tier);
        setTimeout(() => {
            updateSubscription(tier);
            setIsProcessing(null);
        }, 1500);
    } else {
        // Show Coming Soon for paid tiers
        setShowPurchaseModal(true);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing('profile');
      
      setTimeout(() => {
          updateUserProfile({
              name: accountForm.name,
              dob: accountForm.dob,
              password: accountForm.newPassword || undefined
          });
          setAccountForm(prev => ({ ...prev, newPassword: '' })); // clear password field
          setIsProcessing(null);
          alert('Profile updated successfully!');
      }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              updateUserProfile({ profilePicture: reader.result as string });
          };
          reader.readAsDataURL(file);
      }
  };

  const handleChatClick = (chatId: string, messages: any[]) => {
      navigate('/nexthours', { state: { chatSessionId: chatId, initialMessages: messages } });
  };

  // Helper to format ISO date
  const formatDate = (isoString?: string) => {
      if (!isoString) return 'N/A';
      return new Date(isoString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white p-4">
      
      {/* Purchase Coming Soon Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
           <div className="bg-[#0A0A0A] border border-brand-gold/30 rounded-[2rem] max-w-md w-full p-8 relative shadow-[0_0_50px_rgba(251,191,36,0.2)] text-center">
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="absolute top-4 right-4 text-brand-muted hover:text-white"
              >
                 <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold border border-brand-gold/20">
                 <Hourglass size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Payments Coming Soon</h3>
              <p className="text-brand-muted mb-8 leading-relaxed">
                 We are currently finalizing our secure payment gateway. The ability to upgrade to Standard and Premium plans will be available extremely soon.
              </p>
              
              <button 
                 onClick={() => setShowPurchaseModal(false)}
                 className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg"
              >
                 Got it
              </button>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2rem] shadow-xl">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex items-center gap-4">
                   <div className="relative group cursor-pointer" onClick={() => activeTab === 'account' && fileInputRef.current?.click()}>
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold/50 bg-[#151515]">
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-brand-gold bg-brand-gold/10">
                                    <User size={32} />
                                </div>
                            )}
                        </div>
                        {activeTab === 'account' && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={20} className="text-white" />
                            </div>
                        )}
                   </div>
                   
                   <div>
                        <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}</h1>
                        <p className="text-brand-muted text-sm">{user.email}</p>
                   </div>
               </div>

               <div className="flex flex-wrap gap-3">
                  <NavLink to="/nexthours" className="bg-brand-gold text-brand-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all shadow-lg flex items-center gap-2">
                     <Sparkles size={18} /> New Chat
                  </NavLink>
                  <button 
                    onClick={logout}
                    className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all flex items-center gap-2"
                  >
                     <LogOut size={18} /> Sign Out
                  </button>
               </div>
           </div>

           {/* Tabs */}
           <div className="flex gap-6 mt-8 border-b border-white/5">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${
                        activeTab === 'overview' ? 'text-brand-gold' : 'text-brand-muted hover:text-white'
                    }`}
                >
                    Overview
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold"></div>}
                </button>
                <button 
                    onClick={() => setActiveTab('account')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${
                        activeTab === 'account' ? 'text-brand-gold' : 'text-brand-muted hover:text-white'
                    }`}
                >
                    Account Settings
                    {activeTab === 'account' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold"></div>}
                </button>
           </div>
        </div>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Subscription */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* Stats Card */}
                <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-[2rem]">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-brand-gold" /> Usage Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-white mb-1">{user.chatHistory.length}</div>
                        <div className="text-xs text-brand-muted uppercase tracking-wider">Total Chats</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-white mb-1">
                            {user.subscriptionTier === 'free' ? `${user.freeUsageCount}/5` : '∞'}
                        </div>
                        <div className="text-xs text-brand-muted uppercase tracking-wider">Chats Used</div>
                        </div>
                    </div>
                </div>

                {/* Subscription Management */}
                <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CreditCard size={100} />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <CreditCard size={18} className="text-brand-gold" /> Your Plan
                    </h2>
                    
                    <div className="mb-6 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl font-bold text-white capitalize">{user.subscriptionTier}</span>
                            {user.subscriptionTier !== 'free' && (
                                <span className="bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                            )}
                        </div>
                        <p className="text-brand-muted text-sm mb-4">
                        {user.subscriptionTier === 'free' && 'Basic access. Limited prompts.'}
                        {user.subscriptionTier === 'standard' && 'Unlimited text coaching.'}
                        {user.subscriptionTier === 'premium' && 'Unlimited text + Media analysis.'}
                        </p>
                        
                        {user.subscriptionTier !== 'free' && user.nextBillingDate && (
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs text-brand-muted">
                                Next billing date: <span className="text-white font-bold">{formatDate(user.nextBillingDate)}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3 relative z-10">
                        {user.subscriptionTier !== 'premium' && (
                        <button 
                            onClick={() => handleSubscriptionChange('premium')}
                            disabled={isProcessing !== null}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldDim text-brand-black font-bold hover:brightness-110 transition-all shadow-lg"
                        >
                            {isProcessing === 'premium' ? 'Upgrading...' : 'Upgrade to Premium ($9.99)'}
                        </button>
                        )}
                        {user.subscriptionTier !== 'standard' && (
                        <button 
                            onClick={() => handleSubscriptionChange('standard')}
                            disabled={isProcessing !== null}
                            className={`w-full py-3 rounded-xl font-bold border border-white/10 transition-all ${
                                user.subscriptionTier === 'premium' 
                                ? 'bg-transparent text-white hover:bg-white/5' 
                                : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        >
                            {isProcessing === 'standard' ? 'Processing...' : 'Switch to Standard ($4.99)'}
                        </button>
                        )}
                        {user.subscriptionTier !== 'free' && (
                            <button 
                            onClick={() => handleSubscriptionChange('free')}
                            className="w-full py-3 rounded-xl border border-white/10 text-brand-muted text-sm hover:text-white hover:bg-white/5 transition-all"
                            >
                            Cancel Subscription
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Chat History */}
            <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 p-8 rounded-[2rem] flex flex-col h-full min-h-[500px]">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare size={20} className="text-brand-gold" /> Recent Conversations
                </h2>
                
                <div className="flex-grow space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-surfaceHighlight">
                    {user.chatHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-50">
                        <MessageSquare size={48} className="mb-4 text-brand-muted" />
                        <p className="text-brand-muted">No conversations yet.</p>
                        <NavLink to="/nexthours" className="text-brand-gold hover:underline mt-2">Start your first chat</NavLink>
                        </div>
                    ) : (
                        user.chatHistory.map((chat) => (
                        <div 
                            key={chat.id} 
                            onClick={() => handleChatClick(chat.id, chat.messages)}
                            className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:border-brand-gold/30 transition-colors group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">{chat.title}</h3>
                                <span className="text-xs text-brand-muted font-mono">{chat.date}</span>
                            </div>
                            <p className="text-sm text-brand-muted line-clamp-2">{chat.preview}</p>
                        </div>
                        ))
                    )}
                </div>
            </div>
            </div>
        )}

        {/* --- ACCOUNT TAB --- */}
        {activeTab === 'account' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 p-8 rounded-[2rem]">
                    <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <Settings size={20} className="text-brand-gold" /> Profile Details
                    </h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        
                        {/* Profile Picture Upload Hidden Input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            accept="image/*"
                        />
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-[#151515] border border-white/10 overflow-hidden flex items-center justify-center">
                                {user.profilePicture ? (
                                    <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-brand-muted" />
                                )}
                            </div>
                            <div>
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors mb-2"
                                >
                                    Change Photo
                                </button>
                                <p className="text-xs text-brand-muted">Recommended: Square JPG, PNG</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Display Name</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                    <input 
                                        type="text" 
                                        value={accountForm.name}
                                        onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Date of Birth</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                    <input 
                                        type="date" 
                                        value={accountForm.dob}
                                        onChange={(e) => setAccountForm({...accountForm, dob: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold focus:outline-none placeholder-brand-muted"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Email (Cannot change)</label>
                            <div className="relative opacity-50">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                <input 
                                    type="email" 
                                    value={user.email}
                                    disabled
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-6 mt-6">
                            <h3 className="text-lg font-bold text-white mb-4">Security</h3>
                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">New Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                    <input 
                                        type="password" 
                                        placeholder="Leave blank to keep current"
                                        value={accountForm.newPassword}
                                        onChange={(e) => setAccountForm({...accountForm, newPassword: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isProcessing === 'profile'}
                                className="bg-brand-gold text-brand-black font-bold px-8 py-3 rounded-xl hover:bg-white transition-all shadow-lg"
                            >
                                {isProcessing === 'profile' ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-8">
                    {/* Payment Method Status Logic */}
                    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-[2rem]">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-brand-gold" /> Payment Method
                        </h2>
                        
                        {user.subscriptionTier === 'free' ? (
                            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/5 border-dashed">
                                <p className="text-brand-muted mb-2 text-sm">No payment method added.</p>
                                <div className="inline-flex items-center gap-1 text-xs text-brand-muted/50 bg-white/5 px-2 py-1 rounded">
                                    <Lock size={10} /> Secure Encryption
                                </div>
                            </div>
                        ) : (
                            // Paid Tier view
                            <div className="space-y-4">
                                <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-xl p-5 border border-white/10 relative overflow-hidden group">
                                    {/* Mock Chip */}
                                    <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded mb-4 opacity-80"></div>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="font-mono text-white text-lg tracking-widest">
                                            •••• •••• •••• {user.paymentMethod?.last4 || '4242'}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] text-brand-muted uppercase">Card Holder</div>
                                            <div className="text-xs text-white font-medium uppercase">{user.name}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-brand-muted uppercase">Expires</div>
                                            <div className="text-xs text-white font-medium">{user.paymentMethod?.expiry || '12/28'}</div>
                                        </div>
                                        <div className="font-bold text-white italic">{user.paymentMethod?.brand || 'VISA'}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-brand-muted px-2">
                                    <div className="flex items-center gap-1 text-green-500">
                                        <Shield size={12} /> Securely Saved
                                    </div>
                                    <span>256-bit SSL Encrypted</span>
                                </div>
                                
                                <button className="w-full border border-white/10 text-brand-muted text-sm py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors">
                                    Update Payment Method
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;