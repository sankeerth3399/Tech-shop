import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SeoHead } from './components/SeoHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProductsSection } from './components/ProductsSection';
import { AboutSection } from './components/AboutSection';
import { AIChatbotSection } from './components/AIChatbotSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [is404, setIs404] = useState(false);

  // ScrollSpy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'products', 'ai-chat', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure page starts at top (Home section) on initial load unless an anchor hash is explicitly provided
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } else {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  const handleNavigateToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <ThemeProvider>
        <NotFoundPage onGoHome={() => setIs404(false)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-mesh-gradient text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300 relative">
        {/* Subtle dot pattern background overlay */}
        <div className="fixed inset-0 bg-dot-pattern opacity-60 pointer-events-none z-0" />

        <SeoHead />

        {/* Sticky Glass Navbar */}
        <Header
          onOpenSearch={() => {
            setSearchQuery('');
            setIsSearchOpen(true);
          }}
          activeSection={activeSection}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Hero Banner */}
          <Hero
            onSearch={handleHeroSearch}
            onNavigateToServices={handleNavigateToServices}
          />

          {/* Services Section */}
          <ServicesSection />

          {/* Products Catalog */}
          <ProductsSection />

          {/* AI Chatbot Section */}
          <AIChatbotSection />

          {/* About Us */}
          <AboutSection />

          {/* Contact Details & Google Maps */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action Button & Mobile Toolbar */}
        <FloatingWhatsApp />

        {/* Universal Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          initialQuery={searchQuery}
        />
      </div>
    </ThemeProvider>
  );
}
