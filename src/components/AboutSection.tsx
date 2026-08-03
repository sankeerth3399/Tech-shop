import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake, Zap, Users, CheckCircle, MapPin, Building2 } from 'lucide-react';
import { businessInfo } from '../data/storeData';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Digital Services', value: '15+', icon: Zap, color: 'text-orange-500' },
    { label: 'Print Accuracy', value: '100%', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Express Turnaround', value: '5 Mins', icon: Award, color: 'text-amber-500' },
  ];

  const values = [
    {
      title: 'Precision & Quality',
      description: 'High-definition double-sided photocopies, laser printing on 75+ GSM paper, and crystal clear passport photos.',
      icon: Award,
    },
    {
      title: 'Trusted Local Portal',
      description: 'Hassle-free online form filling, e-Aadhar assistance, and PAN card corrections with strict confidentiality.',
      icon: HeartHandshake,
    },
    {
      title: 'Express WhatsApp Orders',
      description: 'Send files digitally via WhatsApp before stepping out of home to enjoy zero-wait pickup.',
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-purple-100/40 via-indigo-50/30 to-blue-100/40 dark:from-slate-950/80 dark:via-purple-950/20 dark:to-slate-950/80 backdrop-blur-xs relative border-t border-purple-200/50 dark:border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
              <img
                src="/src/assets/images/store_interior_1785399721473.jpg"
                alt="Sri Sai Rama Stationary Shop Interior"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Ayyappa Colony, Dammaiguda</span>
                </div>
                <h4 className="text-xl font-bold">Your Neighborhood Store</h4>
                <p className="text-xs text-slate-200">
                  Serving students, professionals, and households with dedication and speed.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              About Sri Sai Rama Stationary
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Delivering <span className="text-blue-600 dark:text-blue-400">Excellence</span> & Local Trust in Dammaiguda
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Located at <strong>Plot No.1, Ayyappa Colony, Dammaiguda (Secunderabad)</strong>, Sri Sai Rama Stationary is a trusted one-stop shop for all academic supplies, office paper products, high-grade photostat copying, and digital government services.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you need urgent project report spiral binding, e-Aadhar corrections, e-PAN card applications, passport photos in 5 minutes, or brand-name school notebooks (Classmate, Reynolds, Casio, Faber-Castell), our friendly desk ensures top accuracy and minimal wait times.
            </p>

            {/* Core Values Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {values.map((val, idx) => {
                const IconComp = val.icon;
                return (
                  <div key={idx} className="bg-gradient-to-br from-white via-indigo-50/60 to-purple-50/40 dark:from-slate-900 dark:to-indigo-950/50 p-4 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/60 space-y-2 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{val.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {stats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <IconComp className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
