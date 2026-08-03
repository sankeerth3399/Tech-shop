import React from 'react';
import { ShoppingBag, MapPin, Phone, Mail, MessageSquare, Clock, Heart, ArrowUp } from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-slate-300 pt-16 pb-12 border-t border-indigo-900/60 relative overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Sri Sai Rama <span className="text-orange-400">Stationary</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier local stationery, office supplies, HD xerox, color printing, lamination, passport photos, and digital online services center in Dammaiguda, Hyderabad.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${businessInfo.phone}`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Call Desk"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 transition-colors"
                title="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors">Home Banner</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">15 Digital Services</a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">Stationery Catalog</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About Our Shop</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Location & Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Top Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Photostat & Xerox (B&W & Color)</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Passport Photos in 5 Mins</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Aadhar Card Corrections</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">PAN Card Application & Edits</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Spiral Binding & Lamination</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Online Job Form Filling</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Project Resume Printing</a></li>
            </ul>
          </div>

          {/* Col 4: Address & Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Visit Our Desk
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="text-slate-200 font-semibold">
                Plot No.1, Ayyappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083
              </p>
              <div className="pt-2 flex items-center gap-2 text-emerald-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Daily: 9:00 AM - 10:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sri Sai Rama Stationary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
