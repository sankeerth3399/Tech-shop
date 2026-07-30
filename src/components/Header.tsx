import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Search, Sparkles, ShoppingBag } from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';

interface HeaderProps {
  onOpenSearch: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'AI Chatbot', href: '#ai-chat' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-slate-950/50 border-b border-slate-200/90 dark:border-slate-800/90 py-2 sm:py-2.5'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md py-4 sm:py-5 border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <div
              className={`rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
              }`}
            >
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShoppingBag
                  className={`text-blue-600 dark:text-blue-400 transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4 sm:w-4.5 sm:h-4.5' : 'w-4.5 h-4.5 sm:w-5 sm:h-5'
                  }`}
                />
              </div>
            </div>
            <div>
              <span
                className={`font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 transition-all duration-300 ${
                  isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                }`}
              >
                Sri Sai Rama
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 font-semibold border border-orange-200 dark:border-orange-800/50">
                  Stationary
                </span>
              </span>
              <p
                className={`text-slate-500 dark:text-slate-400 font-medium hidden sm:block transition-all duration-300 ${
                  isScrolled ? 'text-[10px] opacity-80' : 'text-[11px] opacity-100'
                }`}
              >
                Dammaiguda, Hyderabad
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 border border-slate-200/80 dark:border-slate-800"
              title="Search Services & Products (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono hidden lg:inline-block">
                Search...
              </span>
            </button>

            {/* Phone Call CTA */}
            <a
              href={`tel:${businessInfo.phone}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Call Us</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden border border-slate-200 dark:border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <a
              href={`tel:${businessInfo.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Call +91 9866094840</span>
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
