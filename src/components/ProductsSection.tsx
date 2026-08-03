import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, X } from 'lucide-react';
import { ProductItem } from '../types';
import { productsData, getWhatsAppLink } from '../data/storeData';

export const ProductsSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-orange-100/40 via-amber-50/30 to-pink-100/40 dark:from-slate-950/80 dark:via-amber-950/20 dark:to-slate-950/80 relative border-t border-amber-200/50 dark:border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 font-bold text-xs uppercase tracking-wider">
            Stationery & Tech Accessories Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular <span className="text-orange-500">Products</span> In Stock
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Browse our top stationery items, school supplies, office registers, A4 paper reams, and tech accessories available for instant store pickup or local home delivery.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((product, idx) => {
            const waProductMsg = `Hello Sri Sai Rama Stationary, I want to order "${product.name}". Please let me know availability.`;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-gradient-to-b from-white via-amber-50/50 to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/40 rounded-2xl border border-amber-200/70 dark:border-amber-900/60 overflow-hidden shadow-md hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.rating}</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider inline-block px-2.5 py-0.5 rounded-md mb-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    Quick View
                  </button>

                  <a
                    href={getWhatsAppLink(waProductMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire / Order</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedProduct.name}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                {selectedProduct.description}
              </p>

              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock at Dammaiguda Store
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedProduct.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex gap-3">
                <a
                  href={getWhatsAppLink(`Hello Sri Sai Rama Stationary, I would like to inquire about "${selectedProduct.name}". Please confirm available quantity.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order / Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
