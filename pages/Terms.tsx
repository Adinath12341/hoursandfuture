import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="mb-12">
          <NavLink to="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-8 text-sm">
            <ArrowLeft size={16} /> Back to Home
          </NavLink>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-brand-gold">
            <FileText size={24} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Use</h1>
          <p className="text-brand-muted">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-12 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-brand-muted leading-relaxed">
              By accessing and using hoursandfuture.com ("the Website"), engaging with the "NextHours" AI service, or purchasing the book "Hours and Future", you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. NextHours AI Service</h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                The "NextHours" AI assistant is powered by advanced large language models. While we strive for accuracy, the AI may occasionally generate incorrect or misleading information.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Professional Advice:</strong> NextHours is for educational and motivational purposes only. It is not a substitute for professional psychological, medical, or financial advice.</li>
                <li><strong>Usage Limits:</strong> We reserve the right to limit usage or terminate accounts that abuse the system (e.g., automated scraping, harassment, or illegal content generation).</li>
                <li><strong>Data Handling:</strong> Chats may be processed to provide the service. Do not share sensitive personal information or secrets in your conversations.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Subscriptions & Billing</h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                <strong>Standard Plan ($4.99/mo):</strong> Grants access to text-based AI chat features.
              </p>
              <p>
                <strong>Premium Plan ($9.99/mo):</strong> Grants access to text, image, and video analysis features.
              </p>
              <p>
                <strong>Cancellation:</strong> You may cancel your subscription at any time. Your access will continue until the end of the current billing cycle. No partial refunds are issued for unused time in a billing cycle.
              </p>
              <p>
                <strong>Upgrades:</strong> If upgrading from Standard to Premium, you will be charged the prorated difference immediately, and the new rate will apply at the start of the next cycle.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p className="text-brand-muted leading-relaxed">
              All content on this website, including text, graphics, logos, the "Hours and Future" book content, and the "NextHours" system methodology, is the property of Adinathreddy Anugu and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-brand-muted leading-relaxed">
              In no event shall Hours and Future, its owners, or affiliates be liable for any indirect, incidental, special, consequential or punitive damages arising out of your access to or use of the website or the NextHours AI service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p className="text-brand-muted leading-relaxed">
              If you have any questions about these Terms, please contact us at <a href="mailto:hello@hoursandfuture.com" className="text-brand-gold hover:underline">hello@hoursandfuture.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;