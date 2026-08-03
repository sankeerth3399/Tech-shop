import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  Circle,
  Sparkles,
  Info,
  Layers,
  Camera,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

interface ChecklistItem {
  id: string;
  category: 'xerox' | 'photo' | 'binding' | 'govt';
  categoryLabel: string;
  title: string;
  description: string;
  tip: string;
  defaultChecked?: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'pdf-format',
    category: 'xerox',
    categoryLabel: 'Xerox & Printing',
    title: 'Convert File to standard PDF Format',
    description: 'PDF format guarantees fonts, margins, and layout remain exact on any printer.',
    tip: 'Avoid sending raw Word (.docx) or PowerPoint (.pptx) files to prevent layout shift.',
  },
  {
    id: 'high-dpi',
    category: 'photo',
    categoryLabel: 'Photo & Color Print',
    title: 'Resolution set to 300+ DPI',
    description: 'Ensure images, logos, and photos are saved in high resolution for crisp output.',
    tip: 'Screenshots from phone chat apps are usually compressed. Send raw image files if possible.',
  },
  {
    id: 'govt-id-both-sides',
    category: 'govt',
    categoryLabel: 'Govt e-Services & IDs',
    title: 'Aadhaar / PAN / Voter ID Both Sides Visible',
    description: 'Place both front and back sides of card clearly scanned on a single page or image.',
    tip: 'Ensure no glare on holographic patches or glossy laminate films.',
  },
  {
    id: 'passport-photo-bg',
    category: 'photo',
    categoryLabel: 'Photo & Color Print',
    title: 'Plain White / Light Background for Passport Photos',
    description: 'Required for official passport, visa, government job, and exam hall ticket applications.',
    tip: 'We also offer instant studio photography in-store if you need new photos taken!',
  },
  {
    id: 'duplex-orientation',
    category: 'xerox',
    categoryLabel: 'Xerox & Printing',
    title: 'Double-Sided (Duplex) Orientation Check',
    description: 'Specify flip on long-edge (standard book style) or short-edge (notepad style).',
    tip: 'Avoid upside-down backing pages by matching page orientation across all pages.',
  }
];

export const DocumentPrepGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    'pdf-format': true,
    'high-dpi': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = CHECKLIST_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const totalCount = filteredItems.length;
  const completedCount = filteredItems.filter((item) => checkedIds[item.id]).length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  const whatsappMsg = `Hello Sri Sai Rama Stationary, I have reviewed the Document Prep Checklist and prepared my files. Can I share them for printing?`;
  const whatsappUrl = getWhatsAppLink(whatsappMsg);

  return (
    <section id="doc-prep-guide" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 text-slate-800 dark:text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wider mb-3 border border-blue-200 dark:border-blue-800">
            <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Print Readiness Helper</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Document Preparation & Print Guide
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Follow our interactive checklist to make sure your documents, photos, and project reports print with flawless sharpness, correct margins, and zero layout shift.
          </p>
        </motion.div>

        {/* Main Card Wrapper */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xl overflow-hidden">
          
          {/* Top Bar with Category Filter & Actions */}
          <div className="p-6 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                All Checks ({CHECKLIST_ITEMS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('xerox')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'xerox'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Xerox & Docs
              </button>
              <button
                onClick={() => setSelectedCategory('photo')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'photo'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Color & Photos
              </button>
              <button
                onClick={() => setSelectedCategory('binding')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'binding'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Binding
              </button>
              <button
                onClick={() => setSelectedCategory('govt')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'govt'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Govt e-Services
              </button>
            </div>
          </div>

          {/* Progress Bar Header */}
          <div className="px-6 py-4 bg-blue-50/60 dark:bg-indigo-950/40 border-b border-blue-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {progressPercent}%
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Document Readiness: {completedCount} of {totalCount} Steps Completed
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {progressPercent === 100
                    ? '🎉 Excellent! Your file is fully optimized for printing.'
                    : 'Check off steps as you format your files before visiting or sending on WhatsApp.'}
                </p>
              </div>
            </div>

            {/* Progress Meter Bar */}
            <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Checklist Items Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isChecked = !!checkedIds[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'bg-blue-50/80 dark:bg-indigo-950/50 border-blue-300 dark:border-indigo-700 shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {/* Checkbox Icon */}
                  <div className="pt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4
                        className={`text-sm font-bold ${
                          isChecked
                            ? 'text-blue-900 dark:text-blue-200 line-through opacity-90'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Pro Tip Box */}
                    <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Tip:</strong> {item.tip}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Technical Reference Grid Footer */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1 text-xs">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Preferred Format</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">PDF is best for multi-page docs. PNG or JPG (300 DPI) for photos.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1 text-xs">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Binding Clearance</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">Keep 15mm (0.6 in) free margin on left edge for spiral/hard cover punch.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1 text-xs">
                <Camera className="w-4 h-4 text-indigo-500" />
                <span>Passport Photos</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">3.5 x 4.5 cm size with white background and matte photo paper finish.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Govt Card Scans</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">Ensure Aadhaar/PAN card numbers and barcodes are clear without flash glare.</p>
            </div>
          </div>

          {/* Bottom WhatsApp Send Banner */}
          <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Need us to print your prepared document directly?</span>
              </h4>
              <p className="text-xs text-blue-100 mt-0.5">
                Send your PDF or photo file via WhatsApp for instant print queue pickup at our store in Dammaiguda!
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-500" />
              <span>Send Files via WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
