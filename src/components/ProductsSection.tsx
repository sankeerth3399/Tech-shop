import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, X, Search, Tag, Filter } from 'lucide-react';
import { ProductItem } from '../types';
import { productsData, getWhatsAppLink } from '../data/storeData';
import regeneratedImagePens from '../assets/images/regenerated_image_1785851341624.jpg';
import regeneratedImagePencils from '../assets/images/regenerated_image_1785851502909.jpg';
import regeneratedImageParker from '../assets/images/regenerated_image_1785851811413.jpg';
import regeneratedImagePaper from '../assets/images/regenerated_image_1785851815528.jpg';
import regeneratedImageStapler from '../assets/images/regenerated_image_1785851817901.jpg';
import regeneratedImageNotebooks from '../assets/images/regenerated_image_1785851937407.jpg';
import regeneratedImageHighlighters from '../assets/images/regenerated_image_1785852497215.jpg';
import regeneratedImageWhitener from '../assets/images/regenerated_image_1785852501604.jpg';
import regeneratedImageCrayons from '../assets/images/regenerated_image_1785852504467.jpg';
import regeneratedImageExamPad from '../assets/images/regenerated_image_1785856362462.jpg';
import regeneratedImageAdhesiveTapes from '../assets/images/regenerated_image_1785853554896.jpg';
import regeneratedImageColourPapers from '../assets/images/regenerated_image_1785853781419.jpg';
import regeneratedImageFilesFolders from '../assets/images/regenerated_image_1785853777456.jpg';
import regeneratedImageCardboard from '../assets/images/regenerated_image_1785856364828.jpg';
import regeneratedImageStickPens from '../assets/images/regenerated_image_1785856864330.jpg';
import regeneratedImageLiquidGlue from '../assets/images/regenerated_image_1785857897289.jpg';
import regeneratedImageGlueSticks from '../assets/images/regenerated_image_1785857900551.jpg';
import regeneratedImageGeometryBox from '../assets/images/regenerated_image_1785857892253.jpg';
import regeneratedImagePencilBoxes from '../assets/images/regenerated_image_1785859697389.jpg';
import regeneratedImagePencilPouches from '../assets/images/regenerated_image_1785860268223.jpg';
import regeneratedImageThermocol from '../assets/images/regenerated_image_1785860745992.jpg';
import regeneratedImageWhiteboard from '../assets/images/regenerated_image_1785860747991.jpg';
import regeneratedImageBookCovers from '../assets/images/regenerated_image_1785860752463.jpg';
import regeneratedImageCourierEnvelopes from '../assets/images/regenerated_image_1785861106784.jpg';
import regeneratedImageSharpeners from '../assets/images/regenerated_image_1785861107998.jpg';
import regeneratedImageErasers from '../assets/images/regenerated_image_1785861112971.jpg';
import regeneratedImageMarkers from '../assets/images/regenerated_image_1785861281169.jpg';
import regeneratedImageCalculator from '../assets/images/regenerated_image_1785861286416.jpg';

const FALLBACK_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800';

const UNSPLASH_PRODUCT_PLACEHOLDERS: Record<string, string> = {
  'notebooks': regeneratedImageNotebooks,
  'pencils': regeneratedImagePencils,
  'pens': regeneratedImagePens,
  'parker-gift-pen': regeneratedImageParker,
  'a4-paper-ream': regeneratedImagePaper,
  'heavy-duty-stapler-pin-set': regeneratedImageStapler,
  'textliner-highlighters': regeneratedImageHighlighters,
  'whitener-correction-pen': regeneratedImageWhitener,
  'smooth-crayons-box': regeneratedImageCrayons,
  'a4-colour-papers-pack': regeneratedImageColourPapers,
  'exam-pad-writing-board': regeneratedImageExamPad,
  'colour-pencils-set': regeneratedImageStickPens,
  'files-and-folders-set': regeneratedImageFilesFolders,
  'adhesive-tapes-pack': regeneratedImageAdhesiveTapes,
  'liquid-craft-glue': regeneratedImageLiquidGlue,
  'smooth-glue-sticks-set': regeneratedImageGlueSticks,
  'pencil-boxes-set': regeneratedImagePencilBoxes,
  'zipper-pencil-pouches': regeneratedImagePencilPouches,
  'mathematical-geometry-box': regeneratedImageGeometryBox,
  'cardboard-sheets': regeneratedImageCardboard,
  'thermocol-sheets-pack': regeneratedImageThermocol,
  'white-boards-marker-set': regeneratedImageWhiteboard,
  'notebook-book-covers': regeneratedImageBookCovers,
  'courier-envelopes': regeneratedImageCourierEnvelopes,
  'dual-hole-sharpeners': regeneratedImageSharpeners,
  'dust-free-erasers-pack': regeneratedImageErasers,
  'permanent-whiteboard-markers': regeneratedImageMarkers,
  'standard-desktop-calculator': regeneratedImageCalculator,
  'craft-office-scissors': 'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?auto=format&fit=crop&q=80&w=800',
  'playing-cards-deck': 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=800',
  'poster-acrylic-colour-paints': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
};

const getProductImageUrl = (product: ProductItem): string => {
  if (product.image && product.image.trim().length > 0) {
    return product.image;
  }
  return UNSPLASH_PRODUCT_PLACEHOLDERS[product.id] || FALLBACK_PRODUCT_IMAGE;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const ProductsSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(productsData.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-orange-100/40 via-amber-50/30 to-pink-100/40 dark:from-slate-950/80 dark:via-amber-950/20 dark:to-slate-950/80 relative border-t border-amber-200/50 dark:border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-10"
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

        {/* Category Tabs & Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products (e.g. notebooks, pens, glue, A4 paper)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? productsData.length
                  : productsData.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                      : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto p-8">
            <Filter className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No products found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              We couldn't find any products matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const waProductMsg = `Hello Sri Sai Rama Stationary, I want to order "${product.name}". Please let me know availability.`;

              return (
                <div
                  key={product.id}
                  className="bg-gradient-to-b from-white via-amber-50/50 to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/40 rounded-2xl border border-amber-200/70 dark:border-amber-900/60 overflow-hidden shadow-md hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== FALLBACK_PRODUCT_IMAGE) {
                            target.src = FALLBACK_PRODUCT_IMAGE;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                      </span>

                      {product.inStock && (
                        <span className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          In Stock
                        </span>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60">
                          {product.category}
                        </span>
                      </div>

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
                      className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Quick View
                    </button>

                    <a
                      href={getWhatsAppLink(waProductMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-60 sm:h-64 bg-slate-100 dark:bg-slate-800 relative shrink-0">
                <img
                  src={getProductImageUrl(selectedProduct)}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = UNSPLASH_PRODUCT_PLACEHOLDERS[selectedProduct.id] || FALLBACK_PRODUCT_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedProduct.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    In Stock at Dammaiguda Store
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProduct.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex gap-3">
                  <a
                    href={getWhatsAppLink(`Hello Sri Sai Rama Stationary, I would like to inquire about "${selectedProduct.name}". Please confirm available quantity.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order / Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

