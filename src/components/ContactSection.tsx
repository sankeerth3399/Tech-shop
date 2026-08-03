import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Xerox & Color Printing',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const customMessage = `Hello Sri Sai Rama Stationary!
Name: ${formData.name}
Phone: ${formData.phone}
Service/Product Needed: ${formData.service}
Notes: ${formData.notes || 'N/A'}`;

    window.open(getWhatsAppLink(customMessage), '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-100/40 via-emerald-50/30 to-teal-100/40 dark:from-slate-950/80 dark:via-emerald-950/20 dark:to-slate-950/80 relative border-t border-emerald-200/50 dark:border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
            Visit Us or Contact Online
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get in Touch with <span className="text-blue-600 dark:text-blue-400">Sri Sai Rama</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            We are conveniently located in Ayyappa Colony, Dammaiguda. Contact us for bulk print orders, Aadhar/PAN inquiries, or product availability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/40 dark:from-slate-900 dark:to-emerald-950/40 rounded-3xl p-6 border border-emerald-200/70 dark:border-emerald-900/60 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
                Contact Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Store Location
                  </h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Plot No.1, Ayyappa Colony
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Phone & WhatsApp
                  </h4>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                  >
                    +91 9866094840
                  </a>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Click to chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/80 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Email Address
                  </h4>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors block"
                  >
                    techshop.3699@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Store Hours
                  </h4>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                    Open Daily: 9:00 AM - 10:00 PM
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Monday to Sunday
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Directions Card */}
            <div className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Planning a visit?</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Open Google Maps for precise GPS turn-by-turn directions.</p>
              </div>
              <a
                href="https://maps.google.com/?q=Dammaiguda+Hyderabad+Ayyappa+Colony"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Contact Form & Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Quick Order Form */}
            <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 dark:from-slate-900 dark:to-indigo-950/40 rounded-3xl p-6 sm:p-8 border border-blue-200/70 dark:border-indigo-900/60 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Quick Service & Order Request
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill this quick form to generate a direct formatted WhatsApp request or inquiry.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9866094840"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Service / Product Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Xerox & Color Printing">Xerox & Color Printing</option>
                    <option value="Stationery & Notebooks">Stationery & Notebooks</option>
                    <option value="Instant Passport Photos">Instant Passport Photos</option>
                    <option value="Aadhar Card Application / Correction">Aadhar Card Service</option>
                    <option value="PAN Card Application / Correction">PAN Card Service</option>
                    <option value="Spiral Binding & Lamination">Spiral Binding & Lamination</option>
                    <option value="Online Form Filling / Resume">Online Form Filling / Resume</option>
                    <option value="Other Product Inquiry">Other Product Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message / Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Need 50 pages double-sided color printout on 75 GSM paper by 4 PM..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-64 bg-slate-100 dark:bg-slate-900 relative">
              <iframe
                title="Sri Sai Rama Stationary Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.286392095944!2d78.5813!3d17.4938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c29d1052601%3A0xa19f96898b16!2sDammaiguda%2C%20Hyderabad%2C%20Telangana%20500083!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
