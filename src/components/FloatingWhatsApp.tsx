import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

export const FloatingWhatsApp: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const playedSoundRef = useRef(false);

  useEffect(() => {
    if (!popupOpen) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextToggle = () => {
      // If currently typing, keep typing for 2.5s - 4.5s, then pause.
      // If not typing, stay idle for 3.5s - 6s, then start typing again.
      const delay = isTyping
        ? Math.floor(Math.random() * 2000) + 2500
        : Math.floor(Math.random() * 2500) + 3500;

      timeoutId = setTimeout(() => {
        setIsTyping((prev) => !prev);
      }, delay);
    };

    scheduleNextToggle();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [popupOpen, isTyping]);

  // Auto-close popup after 60 seconds of inactivity and reset chime sound ref
  useEffect(() => {
    if (!popupOpen) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setPopupOpen(false);
        playedSoundRef.current = false;
      }, 60000);
    };

    resetInactivityTimer();

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [popupOpen]);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // First crisp tone (A5 note ~880Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Second crisp tone (D6 note ~1174Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1174.66, now + 0.07);
      gain2.gain.setValueAtTime(0.06, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.25);
    } catch {
      // AudioContext policy catch
    }
  };

  const handleTogglePopup = () => {
    if (!popupOpen && !playedSoundRef.current) {
      playChime();
      playedSoundRef.current = true;
    }
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      {/* WhatsApp Chat Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden origin-bottom-right"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Sri Sai Rama Stationary</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1.5 min-h-[16px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online</span>
                  <span className="text-emerald-200/50">•</span>
                  {isTyping ? (
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-100/90 transition-all duration-300">
                      <span>typing</span>
                      <span className="inline-flex gap-0.5 items-center">
                        <span className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce" />
                      </span>
                    </span>
                  ) : (
                    <span className="font-medium text-emerald-100/90 transition-all duration-300">
                      Dammaiguda Desk
                    </span>
                  )}
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
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 shadow-xs relative"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mb-1 font-medium">
                <span>Sri Sai Rama Desk</span>
                <span>Just now</span>
              </div>
              👋 Hello! How can we assist you today? Send us your document for Xerox, passport photo query, or stationery order.
            </motion.div>

            {/* Quick Reply Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18, ease: 'easeOut' }}
              className="space-y-1.5"
            >
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                Quick Replies
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 -mx-1 px-1">
                {[
                  { label: '🖨️ Xerox inquiry', msg: 'Hello Sri Sai Rama Stationary, I have a query regarding Xerox & printing services.' },
                  { label: '📚 Stationery order', msg: 'Hello Sri Sai Rama Stationary, I would like to place a stationery order.' },
                  { label: '📸 Photo prints', msg: 'Hello Sri Sai Rama Stationary, I need details about passport photo prints.' },
                  { label: '⏱️ Shop timings', msg: 'Hello Sri Sai Rama Stationary, what are your shop opening & closing hours today?' },
                ].map((chip) => (
                  <a
                    key={chip.label}
                    href={getWhatsAppLink(chip.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[11px] font-medium px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap active:scale-95"
                  >
                    {chip.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.22, ease: 'easeOut' }}
              href={getWhatsAppLink('Hello Sri Sai Rama Stationary, I would like to chat with your support team.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </motion.a>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Floating Action Button (Desktop & Tablet) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={handleTogglePopup}
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
