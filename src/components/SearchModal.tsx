import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MessageSquare, ArrowRight, Printer, ShoppingBag, Sparkles } from 'lucide-react';
import { servicesData, productsData, getWhatsAppLink } from '../data/storeData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const matchedServices = servicesData.filter((s) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.highlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  const matchedProducts = productsData.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Header Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Xerox, Passport Photos, Notebooks, Aadhar/PAN..."
                className="w-full text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Container */}
            <div className="overflow-y-auto p-4 space-y-6 flex-1">
              {!query.trim() && (
                <div className="text-center py-8 space-y-3">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Type anything to search Sri Sai Rama Stationary services and products
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {['Xerox', 'Passport Photo', 'Classmate Notebook', 'Aadhar Correction', 'Spiral Binding', 'A4 Paper'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 font-semibold active:scale-95 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

          {/* Matched Services */}
          {matchedServices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Services ({matchedServices.length})
                </h4>
              </div>
              <div className="space-y-2">
                {matchedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-blue-500 transition-all"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Hello Sri Sai Rama Stationary, I am interested in "${service.title}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Inquire</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-4 h-4 text-orange-500" />
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Products ({matchedProducts.length})
                </h4>
              </div>
              <div className="space-y-2">
                {matchedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-orange-500 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                          {product.name}
                        </h5>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(`Hello Sri Sai Rama Stationary, I want to inquire about purchasing "${product.name}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Inquire</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim() && matchedServices.length === 0 && matchedProducts.length === 0 && (
            <div className="text-center py-10 space-y-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No services or products found matching "{query}"
              </p>
              <a
                href={getWhatsAppLink(`Hello Sri Sai Rama Stationary, I am looking for: "${query}". Do you have this available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Esc</kbd> to close
        </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
