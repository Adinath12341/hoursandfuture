import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Hourglass, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
        if (!formData.name) {
            setError('Name is required');
            return;
        }
        signup(formData.email, formData.name, formData.password);
        setIsSignUp(false);
        setFormData(prev => ({ ...prev, password: '' })); 
        alert('Account created! Please log in.');
    } else {
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            if (result.error === 'USER_NOT_FOUND') {
                setError("We couldn't find an account with that email.");
            } else if (result.error === 'WRONG_PASSWORD') {
                setError('Incorrect password. Please try again.');
                setPasswordAttempts(prev => prev + 1);
            }
        }
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
           <NavLink to="/" className="inline-flex items-center gap-2 mb-6 group">
             <div className="bg-brand-surfaceHighlight p-2 rounded-full border border-white/5 group-hover:border-brand-gold/30 transition-colors">
                <Hourglass size={20} className="text-brand-gold group-hover:rotate-180 transition-transform duration-700" />
             </div>
             <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-gold transition-colors">
               Hours and Future
             </span>
           </NavLink>
           <h1 className="text-3xl font-bold text-white mb-2">
             {isSignUp ? 'Create an Account' : 'Welcome Back'}
           </h1>
           <p className="text-brand-muted">
             {isSignUp ? 'Start your journey to mastering time.' : 'Access your dashboard and resources.'}
           </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-visible">
           {/* Top Glow */}
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>

           <form className="space-y-5" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="space-y-2">
                   <label className="text-xs font-bold text-brand-muted uppercase tracking-wider ml-1">Full Name</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                      <input 
                        type="text" 
                        required={isSignUp}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder-white/20"
                      />
                   </div>
                </div>
              )}
              
              <div className="space-y-2">
                   <label className="text-xs font-bold text-brand-muted uppercase tracking-wider ml-1">Email</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder-white/20"
                      />
                   </div>
              </div>

              <div className="space-y-2">
                   <div className="flex justify-between items-center relative">
                      <label className="text-xs font-bold text-brand-muted uppercase tracking-wider ml-1">Password</label>
                      {!isSignUp && (
                          <div className="relative">
                              <a href="#" className="text-xs text-brand-gold hover:underline">Forgot?</a>
                              {/* 3-Strike Tooltip */}
                              {passwordAttempts >= 3 && (
                                <div className="absolute bottom-full right-0 mb-3 w-48 animate-fade-in z-50">
                                    <div className="bg-brand-gold text-brand-black text-xs font-bold p-3 rounded-xl shadow-lg relative text-center">
                                        Forgot it? You can change it here.
                                        <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-brand-gold"></div>
                                    </div>
                                </div>
                              )}
                          </div>
                      )}
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                      <input 
                        type="password" 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder-white/20"
                      />
                   </div>
              </div>

              {error && (
                  <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      <AlertCircle size={14} />
                      <p>{error}</p>
                      {error.includes("couldn't find") && !isSignUp && (
                          <button onClick={() => setIsSignUp(true)} className="underline font-bold ml-auto">Sign Up</button>
                      )}
                  </div>
              )}

              <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)] transform hover:scale-[1.02] mt-4 flex items-center justify-center gap-2">
                 {isSignUp ? 'Sign Up' : 'Log In'} <ArrowRight size={18} />
              </button>
           </form>

           <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-sm text-brand-muted">
                 {isSignUp ? 'Already have an account?' : "Don't have an account?"} {' '}
                 <button 
                   onClick={() => {
                       setIsSignUp(!isSignUp);
                       setError('');
                       setPasswordAttempts(0);
                   }}
                   className="text-brand-gold font-bold hover:underline transition-colors"
                 >
                    {isSignUp ? 'Log In' : 'Sign Up'}
                 </button>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;