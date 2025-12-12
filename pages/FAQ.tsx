import React from 'react';
import { NavLink } from 'react-router-dom';
import { HelpCircle, Sparkles, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is 'Hours and Future' available as a physical book?",
    answer: "Currently, 'Hours and Future' is available primarily as a high-quality digital ebook and an interactive online course via this website. We are planning a limited edition physical print run for late 2024. Subscribe to our newsletter to be notified when pre-orders open."
  },
  {
    question: "What makes this different from other productivity books?",
    answer: "Most productivity books are written by CEOs for other executives. 'Hours and Future' is written specifically for the student and young adult context—dealing with exams, social media addiction, and the unique pressure of defining your future in a digital age. It's not about doing more work; it's about doing the right work."
  },
  {
    question: "How do I access the NextHours AI?",
    answer: "You can access NextHours AI directly from the navigation bar. We offer a Free Starter plan (5 prompts) so you can test it out. For unlimited coaching, you can upgrade to the Standard plan ($4.99/mo). The Premium plan ($9.99/mo) adds the ability to analyze images and videos."
  },
  {
    question: "Can I cancel my NextHours subscription anytime?",
    answer: "Absolutely. There are no lock-in contracts. You can cancel your subscription at any time from your account settings or by contacting support, and you will retain access until the end of your current billing period."
  },
  {
    question: "Is the Chapter 1 preview the full chapter?",
    answer: "Yes! We believe in the value of the book so much that we give away the entire first chapter for free. You can read it directly on the Chapters page without entering your email."
  },
  {
    question: "I purchased the book but didn't receive the email.",
    answer: "Please check your spam/junk folder first. If it's not there within 10 minutes of purchase, please email us at hello@hoursandfuture.com with your order number, and we'll resolve it immediately."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-gold border border-white/10">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about the book, the methodology, and the AI platform.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-[#0A0A0A] border rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'border-brand-gold/30 shadow-lg shadow-brand-gold/5' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-white' : 'text-white/80'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-brand-gold text-brand-black' : 'bg-white/5 text-brand-muted'}`}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-brand-muted leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NextHours Fallback CTA */}
        <div className="bg-brand-surfaceHighlight border border-brand-gold/20 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
           {/* Abstract Glow */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
           
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
                 <Sparkles size={12} /> AI Support
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Question Not Listed?</h2>
              <p className="text-brand-muted mb-8 max-w-xl mx-auto">
                Our custom AI is trained on every detail of the Hours and Future system. Ask NextHours anything and get an instant, accurate answer.
              </p>
              <NavLink 
                to="/nexthours" 
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold py-4 px-10 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] transform hover:scale-105"
              >
                Ask NextHours AI <ArrowRight size={18} />
              </NavLink>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;