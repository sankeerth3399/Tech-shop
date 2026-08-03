import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Printer,
  FileText,
  Camera,
  CreditCard,
  Truck,
  AlertCircle,
  PackageCheck,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

interface HeroProps {
  onSearch: (query: string) => void;
  onNavigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onNavigateToServices }) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');

  // Typing animation phrases for Hero sub-headline
  const typingPhrases = [
    'Xerox services',
    'Stationery items',
    'Photo printing',
    'Government e-Services',
    'School & Office supplies',
    'Spiral & Hard binding'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === currentPhrase) {
      // Pause at full word length before deleting
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === '') {
      // Switch to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    } else {
      const speed = isDeleting ? 40 : 75;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onSearch(heroSearchInput.trim());
    }
  };

  const quickServices = [
    {
      title: 'Xerox & Print',
      desc: 'B&W / HD Color printing & scanning',
      icon: Printer,
      color: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/90 dark:text-blue-300',
      cardBg: 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-50/60 dark:from-slate-900/90 dark:to-indigo-950/70 border-blue-200 dark:border-indigo-900/70 shadow-md',
    },
    {
      title: 'Aadhar / PAN',
      desc: 'Fast application & portal edits',
      icon: CreditCard,
      color: 'bg-orange-100/80 text-orange-700 dark:bg-orange-950/90 dark:text-orange-300',
      cardBg: 'bg-gradient-to-br from-white via-orange-50/80 to-amber-50/60 dark:from-slate-900/90 dark:to-amber-950/70 border-orange-200 dark:border-amber-900/70 shadow-md',
    },
    {
      title: 'Office Supplies',
      desc: 'Notebooks, files & reams',
      icon: FileText,
      color: 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/90 dark:text-purple-300',
      cardBg: 'bg-gradient-to-br from-white via-purple-50/80 to-indigo-50/60 dark:from-slate-900/90 dark:to-purple-950/70 border-purple-200 dark:border-purple-900/70 shadow-md',
    },
    {
      title: 'Passport Photos',
      desc: 'Instant studio print in 5 mins',
      icon: Camera,
      color: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/90 dark:text-emerald-300',
      cardBg: 'bg-gradient-to-br from-white via-emerald-50/80 to-teal-50/60 dark:from-slate-900/90 dark:to-teal-950/70 border-emerald-200 dark:border-emerald-900/70 shadow-md',
    },
  ];

  const pickupNoticeText =
    'Home Delivery is not yet Enabled. Whatsapp us your requirements we will make it ready for you, collect when ever possible';

  return (
    <section id="hero" className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-transparent text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* Background Decorative Soft Vibrant Gradients */}
      <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[24rem] h-[24rem] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Top Highlight Banner Grid (Timings & Home Delivery Notice) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Business Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Timings: 9:00 AM to 10:00 PM
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Open All 7 Days (Mon - Sun) in Ayyappa Colony
                </p>
              </div>
            </div>
          </motion.div>

          {/* Home Delivery Disclaimer Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-7 bg-amber-50/90 dark:bg-amber-950/40 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-800/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Store Pickup & Requirements Notice</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-amber-950 dark:text-amber-100 leading-snug">
                  "Home Delivery is not yet Enabled. Whatsapp us your requirements we will make it ready for you, collect when ever possible"
                </p>
              </div>
            </div>

            <a
              href={getWhatsAppLink('Hello Sri Sai Rama Stationary, I want to send my requirements for store pickup:')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 shadow-md transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span className="whitespace-nowrap">WhatsApp Requirements</span>
            </a>
          </motion.div>

        </div>

        {/* Main Clean Minimal Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Card (Cols 7) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 bg-gradient-to-br from-white/95 via-blue-50/70 to-indigo-50/80 dark:from-slate-900/90 dark:via-indigo-950/50 dark:to-slate-900/90 text-slate-900 dark:text-slate-100 rounded-3xl p-8 sm:p-10 border border-blue-200/80 dark:border-indigo-800/60 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
              <Sparkles className="w-48 h-48 text-blue-600" />
            </div>

            <div className="space-y-6 relative z-10">
              
              {/* Eyebrow & Location */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-orange-500 dark:text-orange-400 font-extrabold uppercase tracking-widest text-[11px] px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200/60 dark:border-orange-800/40">
                  Dammaiguda's Premier Hub
                </span>
                <span className="text-blue-700 dark:text-blue-300 font-extrabold uppercase tracking-widest text-[11px] px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/60 flex items-center gap-1.5 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Serving Since 2008
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  Plot No. 1, Ayyappa Colony
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                Premium Quality <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  Stationery & Digital Services.
                </span>
              </h1>

              {/* Subtitle with dynamic Typing Animation */}
              <div className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Your one-stop destination for{' '}
                  <span className="inline-inline font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
                    {currentText}
                    <span className="animate-pulse text-blue-500 font-normal ml-0.5">|</span>
                  </span>
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  High-speed Xerox copies, studio passport photos, student notebooks, and online government portal applications in Ayyappa Colony, Dammaiguda.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="Search services or products (e.g. Xerox, Passport Photo, Notebooks...)"
                    className="w-full pl-11 pr-28 py-3.5 text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

            </div>

            {/* CTA Buttons & Trust Badges */}
            <div className="pt-8 space-y-4 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-7 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </a>

                <a
                  href={`tel:${businessInfo.phone}`}
                  className="bg-slate-100 hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Call +91 9866094840</span>
                </a>

                <button
                  onClick={onNavigateToServices}
                  className="text-slate-600 hover:text-blue-600 active:scale-[0.98] dark:text-slate-400 dark:hover:text-blue-400 px-4 py-3.5 font-bold text-sm flex items-center gap-1 transition-all"
                >
                  <span>View All 15 Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Serving Since 2008
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  100% High Resolution Prints
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <PackageCheck className="w-4 h-4 text-blue-500 shrink-0" />
                  Ready-for-Pickup Service
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                  5-Min Express Passport Photos
                </span>
              </div>
            </div>

          </motion.div>

          {/* Quick Services Bento Grid (Cols 5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {quickServices.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={idx}
                  className={`${svc.cardBg} rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 group`}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${svc.color}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                  
                  <button
                    onClick={onNavigateToServices}
                    className="mt-4 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1 group-hover:underline"
                  >
                    <span>View Options</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
