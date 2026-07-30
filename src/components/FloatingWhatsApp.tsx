import React, { useState } from 'react';
import { MessageSquare, Phone, X, Sparkles, Send } from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

export const FloatingWhatsApp: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {/* WhatsApp Chat Popup */}
      {popupOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Sri Sai Rama Stationary</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • Dammaiguda Desk</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 shadow-xs">
              👋 Hello! How can we assist you today? Send us your document for Xerox, passport photo query, or stationery order.
            </div>

            <a
              href={getWhatsAppLink('Hello Sri Sai Rama Stationary, I would like to chat with your support team.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button (Desktop & Tablet) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setPopupOpen(!popupOpen)}
          className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none" />
          <MessageSquare className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 p-2.5 backdrop-blur-md sm:hidden flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${businessInfo.phone}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Call Desk</span>
        </a>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
