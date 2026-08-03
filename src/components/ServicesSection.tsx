import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PenTool, BookOpen, Briefcase, Copy, Printer, FileScan, ShieldCheck, 
  Layers, Droplet, Camera, CreditCard, FileCheck, Globe, FileText, Edit3, 
  Search, MessageSquare, Clock, ArrowRight, Check 
} from 'lucide-react';
import { ServiceItem } from '../types';
import { servicesData, getWhatsAppLink } from '../data/storeData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  PenTool,
  BookOpen,
  Briefcase,
  Copy,
  Printer,
  FileScan,
  ShieldCheck,
  Layers,
  Droplet,
  Camera,
  CreditCard,
  FileCheck,
  Globe,
  FileText,
  Edit3,
};

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'printing', label: 'Printing & Xerox' },
    { id: 'online', label: 'Online & Govt Forms' },
    { id: 'photo_binding', label: 'Photo & Binding' },
    { id: 'stationery', label: 'Stationery & Office' },
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs relative border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
            Comprehensive Digital & Stationery Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Key <span className="text-blue-600 dark:text-blue-400">Services</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            From high-speed photocopies and passport photos to online government portal submissions, we provide fast, accurate, and reliable services right in Ayyappa Colony, Dammaiguda.
          </p>
        </motion.div>

        {/* Filter Bar & Search */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter services..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Printer;
            const waCustomText = `Hello Sri Sai Rama Stationary, I would like to inquire about your "${service.title}" service.`;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Service Image Banner */}
                  {service.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/60">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.97] dark:brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Icon overlay on image */}
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Badge overlay on image */}
                      {service.badge && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500 text-white shadow-md">
                          {service.badge}
                        </div>
                      )}

                      {/* Title overlay on bottom of image for sleek look */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-lg font-bold text-white drop-shadow-md group-hover:text-blue-200 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {!service.image && (
                    <div className="p-6 pb-0">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-orange-500/10 dark:from-blue-500/20 dark:to-orange-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {service.badge && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  )}

                  <div className="p-5 space-y-4">
                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {service.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.estimatedTime}</span>
                  </div>

                  <a
                    href={getWhatsAppLink(waCustomText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors border border-emerald-200/80 dark:border-emerald-800/60"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Inquire</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state if search fails */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 font-medium text-base mb-2">
              No services matched "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
