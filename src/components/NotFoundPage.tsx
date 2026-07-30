import React from 'react';
import { ShoppingBag, Home, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '../data/storeData';

export const NotFoundPage: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404 - Page Not Found</h1>
          <p className="text-sm text-slate-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
