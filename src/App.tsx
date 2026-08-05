import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { SeoHead } from './components/SeoHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DocumentPrepGuide } from './components/DocumentPrepGuide';
import { ProductsSection } from './components/ProductsSection';
import { AboutSection } from './components/AboutSection';
import { AIChatbotSection } from './components/AIChatbotSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { NotFoundPage } from './components/NotFoundPage';

const sectionEntranceProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [is404, setIs404] = useState(false);

  // ScrollSpy to track active section with IntersectionObserver (zero scroll jank)
  useEffect(() => {
    const sections = ['hero', 'services', 'products', 'ai-chat', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
