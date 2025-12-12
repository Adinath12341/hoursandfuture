import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Let's Start a Conversation</h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
             Whether you're a student with a question or a school interested in a workshop, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem]">
                <h3 className="text-white font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-brand-gold mt-1"><Mail size={20} /></div>
                    <div>
                      <p className="text-brand-muted text-sm mb-1">Email</p>
                      <p className="text-white font-medium">adinathanugu@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-brand-gold mt-1"><MapPin size={20} /></div>
                    <div>
                      <p className="text-brand-muted text-sm mb-1">Location</p>
                      <p className="text-white font-medium">Sydney, Australia</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 bg-[#0A0A0A] p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                <p className="text-brand-muted mb-8">Thanks for reaching out. I'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-brand-gold font-bold hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Name</label>
                    <input type="text" id="name" required className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-black/50 text-white placeholder-white/20 transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Email</label>
                    <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-black/50 text-white placeholder-white/20 transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Topic</label>
                  <select id="subject" className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-black/50 text-white transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Speaking / Workshop</option>
                    <option>Bulk Book Orders</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea id="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-black/50 text-white placeholder-white/20 transition-all" placeholder="How can I help?"></textarea>
                </div>

                <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg transform hover:scale-[1.02]">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for check icon
const Check = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default Contact;