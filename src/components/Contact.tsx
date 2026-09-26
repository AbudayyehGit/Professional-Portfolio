import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Copy, Check, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Architecture & Delivery',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const directEmail = 'joeabudayyeh@gmail.com';

  const projectTypes = [
    'Architecture & Delivery',
    'Systems Consulting',
    'Technical Governance',
    'CalAIM & Healthcare',
    'Principal Contract'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    // Simulate direct dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`[Delivery Inquiry] ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Joe,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}`
    );
    window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="max-w-2xl mx-auto text-center space-y-6 min-w-0"
      >
        <div className="min-w-0">
          <h2 className="text-xs font-mono text-[#9E2A2B] uppercase tracking-widest font-semibold">
            Connect &amp; Engage
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 break-words">
            Let's Architect Something Resilient
          </p>
        </div>

        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
          Available for principal systems architecture, application delivery leadership, server environments (LAMP, cPanel), cloud deployment (GitHub, Vercel), SPAs, and healthcare compliance governance (CalAIM / ECM / HIPAA).
        </p>

        {/* Quick Contact & Availability Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-gray-600 pt-2 max-w-full">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" />
            <span>Los Angeles, CA (PST)</span>
          </div>
          <span className="text-gray-400 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Response within 24 hrs</span>
          </div>
          <span className="text-gray-400 hidden sm:inline">·</span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-gray-800 hover:text-[#9E2A2B] transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-[#005596] shrink-0" />
            <span>{copiedEmail ? 'Email Copied!' : directEmail}</span>
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-500" />}
          </button>
        </div>

        {/* Form Container */}
        {isSubmitted ? (
          <div className="mt-8 p-6 sm:p-8 bg-white border border-emerald-500/40 rounded-xl text-left space-y-4 shadow-sm animate-in fade-in min-w-0">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">Direct Message Prepared &amp; Queued</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
              Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>. Your inquiry regarding <span className="font-mono text-[#9E2A2B] font-semibold">{formData.projectType}</span> has been received.
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 space-y-1 overflow-hidden min-w-0">
              <div className="text-gray-500 truncate">From: {formData.name} &lt;{formData.email}&gt;</div>
              <div className="text-gray-500 truncate">Subject: {formData.projectType} Consultation</div>
              <div className="pt-2 text-gray-900 whitespace-pre-line border-t border-gray-200 break-words">
                "{formData.message}"
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleOpenMailClient}
                className="px-4 py-2.5 bg-[#9E2A2B] hover:bg-[#852324] text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5" /> Open in Mail Client
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', projectType: 'Architecture & Delivery', message: '' });
                }}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left w-full min-w-0">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#9E2A2B] text-xs font-mono break-words">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="min-w-0">
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1.5 font-semibold">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B]/30 transition-colors shadow-xs"
                />
              </div>

              <div className="min-w-0">
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1.5 font-semibold">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B]/30 transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* Project / Engagement Type Selector */}
            <div className="min-w-0">
              <label className="block text-xs font-mono uppercase text-gray-600 mb-1.5 font-semibold">
                Area of Engagement
              </label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                      formData.projectType === type
                        ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/40 font-semibold'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <label className="block text-xs font-mono uppercase text-gray-600 mb-1.5 font-semibold">
                Project Details or Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your technical architecture goals, timeline, or operational needs..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B]/30 transition-colors shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#9E2A2B] hover:bg-[#852324] disabled:opacity-70 text-white font-medium py-3 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-[#9E2A2B]/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSubmitting ? (
                <span>Dispatching Message...</span>
              ) : (
                <>
                  <span>Send Message Direct</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
