import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="mb-12">
          <NavLink to="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-8 text-sm">
            <ArrowLeft size={16} /> Back to Home
          </NavLink>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-brand-gold">
            <Shield size={24} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-brand-muted">Last Updated: December 2025</p>
        </div>

        {/* Content */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-12 space-y-12 text-brand-muted leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              Hours and Future is committed to protecting your privacy. This Privacy Policy explains
              what personal information we collect, how we use it, who we share it with, and your rights
              regarding your data. It applies to our website and AI-powered subscription service offering
              Standard and Premium plans.
            </p>
            <p>
              This policy complies with the Australian Privacy Principles (APPs) under the Privacy Act
              1988 (Cth) and is designed to ensure transparency and protection of your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. What Personal Information We Collect</h2>
            <p className="mb-4">We collect personal information to provide our service, process payments, and improve your experience. The types of information we collect include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Email address, name, date of birth, and profile picture.</li>
              <li><strong>Payment Information:</strong> Payment method details (e.g., credit card information), billing address, and transaction history.</li>
              <li><strong>Subscription Details:</strong> Which plan (Standard or Premium) you have selected and subscription renewal dates.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our AI service, including queries, responses, and timestamps.</li>
              <li><strong>Device and Technical Information:</strong> IP address, browser type, device type, and operating system.</li>
              <li><strong>Communication Data:</strong> Any messages, feedback, or support requests you send us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Collect Your Information</h2>
            <p className="mb-4">We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direct Collection:</strong> When you sign up for an account, subscribe to Standard or Premium plans, or update your profile.</li>
              <li><strong>Payment Processing:</strong> Through our payment processor (Stripe) when you make a purchase or subscription payment.</li>
              <li><strong>Automatic Collection:</strong> Through cookies, log files, and analytics tools on our website.</li>
              <li><strong>File Access:</strong> When you upload profile pictures or when our website accesses files on your device (with your permission) for processing or syncing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Your Information</h2>
            <p className="mb-4">We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> Creating and managing your account, processing your subscription to Standard or Premium plans, and delivering AI-powered services.</li>
              <li><strong>Payment Processing:</strong> Processing and managing subscription payments, issuing invoices, and fraud prevention.</li>
              <li><strong>Age Verification:</strong> Verifying that you meet our minimum age requirements using your date of birth.</li>
              <li><strong>Profile Management:</strong> Storing and displaying your profile picture on your account.</li>
              <li><strong>Communication:</strong> Sending you subscription confirmations, renewal reminders, password resets, and service announcements.</li>
              <li><strong>Support:</strong> Responding to your questions and providing customer support.</li>
              <li><strong>Improvement:</strong> Analyzing how you use our service to improve the AI, fix bugs, and develop new features.</li>
              <li><strong>Legal Compliance:</strong> Meeting legal obligations and protecting our rights.</li>
              <li><strong>Marketing:</strong> With your consent, sending you promotional emails about new features or subscription offers (you can unsubscribe at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Payment Information and Security</h2>
            <p className="mb-4">
              We do not store your full credit card details. Payment processing is handled securely by
              Stripe, a PCI-DSS compliant third-party payment processor.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your card information is encrypted and transmitted directly to Stripe's secure servers.</li>
              <li>We only store a tokenized reference to your payment method to enable future subscription renewals.</li>
              <li>Stripe's privacy policy governs the use of your payment data; we recommend reviewing it at <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">stripe.com/au/privacy</a>.</li>
            </ul>
            <p className="mt-4 flex items-center gap-2 text-white">
              <Lock size={16} className="text-brand-gold" />
              We take payment security seriously and implement industry-standard security measures to protect your financial information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Storage and Security of Your Data</h2>
            <p className="mb-4">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encryption:</strong> Sensitive data is encrypted during transmission and at rest.</li>
              <li><strong>Access Control:</strong> Only authorized personnel with a legitimate business need can access your data.</li>
              <li><strong>Local Storage:</strong> Data accessed from files on our laptop is protected by device-level security, including password protection and regular security updates.</li>
              <li><strong>Regular Updates:</strong> We maintain updated software and security patches.</li>
              <li><strong>Limited Retention:</strong> We keep your personal information only for as long as necessary to provide our service or comply with legal obligations.</li>
            </ul>
            <p className="mt-4 italic">
              However, no security system is completely secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Who We Share Your Information With</h2>
            <p className="mb-4">We may share your personal information with the following parties:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment Processor (Stripe):</strong> To process your subscription payments securely.</li>
              <li><strong>Email Service Providers:</strong> To send transactional and marketing emails (with your consent).</li>
              <li><strong>Hosting and Cloud Service Providers:</strong> To store and manage your data safely.</li>
              <li><strong>Analytics Providers:</strong> To understand usage patterns and improve our service.</li>
              <li><strong>Legal and Regulatory Authorities:</strong> When required by law or to protect our legal rights.</li>
              <li><strong>Service Providers:</strong> Other third parties who assist us in operating our website and delivering our service (all bound by confidentiality agreements).</li>
            </ul>
            <p className="mt-4 font-medium text-white">We do not sell or rent your personal information to third parties for their marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
            <p>
              Your personal information may be transferred to, stored in, or processed in countries
              outside Australia, including the United States (where Stripe and some cloud providers
              operate). These countries may have different privacy laws than Australia.
            </p>
            <p className="mt-4">
              When we transfer data internationally, we take reasonable steps to ensure it remains
              protected at a level comparable to Australian privacy standards. By using our service, you
              consent to the transfer of your data internationally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Your Privacy Rights</h2>
            <p className="mb-4">Under the Australian Privacy Principles, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You can ask us to correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You can request deletion of your account and associated personal information (subject to legal retention requirements).</li>
              <li><strong>Marketing Opt-Out:</strong> You can unsubscribe from marketing emails by clicking the unsubscribe link in any promotional email or contacting us directly.</li>
              <li><strong>Complaint:</strong> You can lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe we have mishandled your data.</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, contact us using the details in Section 11 below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="mb-4">Our website uses cookies and similar tracking technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your login details and preferences.</li>
              <li>Understand how you use our site (analytics).</li>
              <li>Improve user experience.</li>
              <li>Track advertising effectiveness.</li>
            </ul>
            <p className="mt-4">
              You can control cookie settings through your browser. Disabling cookies may affect some
              features of our website. For more information on how cookies work, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">www.allaboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="mb-4">If you have questions about this Privacy Policy, wish to exercise your privacy rights, or want to lodge a complaint, please contact us:</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:adinathanugu@gmail.com" className="text-brand-gold hover:underline">adinathanugu@gmail.com</a></li>
              <li><strong>Website:</strong> hoursandfuture.com</li>
            </ul>
            <p className="mt-4">We will respond to your inquiry within 30 days of receipt.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, or legal requirements. We will notify you of any material changes by posting
              the updated policy on our website and updating the "Last Updated" date.
            </p>
            <p className="mt-4">
              Your continued use of our service after changes have been posted constitutes your
              acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Acknowledgment</h2>
            <p>
              By using Hours and Future and subscribing to our Standard or Premium plans, you
              acknowledge that you have read and understood this Privacy Policy and agree to the
              collection, use, and disclosure of your personal information as described.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;