import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Printer,
  ShoppingBag,
  HelpCircle,
  Copy,
  Check,
  Zap,
  AlertCircle
} from 'lucide-react';
import { businessInfo, getWhatsAppLink } from '../data/storeData';
import { STORE_SYSTEM_INSTRUCTION, getLocalKnowledgeResponse } from '../data/chatKnowledge';
import { ChatMessage } from '../types';

const SUGGESTED_QUESTIONS = [
  'What are your store operating hours & address?',
  'Can I send documents on WhatsApp for instant printouts?',
  'What digital & government online services (Aadhaar/PAN) do you offer?',
  'Do you have A4 paper reams, notebooks & stationery in stock?',
  'What are your Xerox, printing & project binding rates?',
  'Do you sell Chandtara slate pencils and non-dust chalks?'
];

export const AIChatbotSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! 👋 Welcome to **Sri Sai Rama Stationary & Digital Services** in Dammaiguda!\n\nI am **Sri Assistant**, your dedicated AI support specialist. I can help you with questions about:\n- 🏪 Store location, hours & contact\n- 🖨️ Xerox, printing, lamination & project binding\n- 📄 Aadhaar, PAN card, Voter ID & Meeseva digital services\n- ✏️ Notebooks, pens, A4 paper reams, calculators & slate pencils\n- 📱 Ordering via WhatsApp (+91 9866094840)\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customMessage) setInput('');
    setIsLoading(true);

    try {
      // Build history for API request (excluding error messages)
      const historyPayload = messages
        .filter((m) => !m.isError)
        .map((m) => ({
          sender: m.sender,
          text: m.text
        }));

      let replyText = '';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            history: historyPayload
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text) {
            replyText = data.text;
          }
        }
      } catch (fetchErr) {
        console.warn('Backend API unreachable, trying client fallback:', fetchErr);
      }

      // If backend API returned no reply (e.g. key missing on backend or Vercel static route)
      if (!replyText) {
        const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (clientApiKey) {
          try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: clientApiKey });
            const chat = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                systemInstruction: STORE_SYSTEM_INSTRUCTION,
                temperature: 0.7,
              },
            });
            const res = await chat.sendMessage({ message: textToSend });
            if (res.text) {
              replyText = res.text;
            }
          } catch (genErr) {
            console.log('Client-side Gemini call fallback activated.');
          }
        }
      }

      // Fallback to local store knowledge base engine
      if (!replyText) {
        replyText = getLocalKnowledgeResponse(textToSend);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply = getLocalKnowledgeResponse(textToSend);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset! 👋 How can I help you regarding **Sri Sai Rama Stationary** products, print services, or store details?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Basic markdown-like formatting helper for bold and newlines
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={lineIdx}>
          {formattedParts}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <section id="ai-chat" className="py-16 sm:py-24 bg-gradient-to-b from-blue-100/40 via-indigo-50/30 to-amber-100/40 dark:from-slate-950/80 dark:via-indigo-950/20 dark:to-slate-950/80 relative border-t border-indigo-200/50 dark:border-indigo-900/50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800/60 mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>24/7 Intelligent Customer Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500">Sri AI Assistant</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Get instant answers regarding our products, printing services, store location, digital online applications, and WhatsApp orders.
          </p>
        </motion.div>

        {/* Chatbot Interface Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col h-[650px]"
        >
          
          {/* Chat Header Bar */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 p-0.5 flex items-center justify-center shadow-md">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Sri AI Assistant</h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border border-blue-400/30">
                    Gemini AI
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  Online • Sri Sai Rama Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                title="Clear Chat History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Quick Suggested Question Chips */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap pl-1 pr-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Suggested:</span>
            </div>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400 text-xs font-medium border border-slate-200/80 dark:border-slate-700 whitespace-nowrap transition-all shadow-2xs hover:scale-[1.02] disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Thread */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 dark:bg-slate-800 text-blue-400 border border-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Box */}
                <div className="flex flex-col gap-1">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed relative group shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : msg.isError
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900 rounded-tl-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-xs'
                    }`}
                  >
                    {msg.isError && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Connection Issue</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line font-normal">
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Copy button for assistant responses */}
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-all"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Timestamp & Quick CTAs */}
                  <div
                    className={`flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 px-1 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <>
                        <span>•</span>
                        <a
                          href={getWhatsAppLink('Hi, I had a question regarding products/services.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                        >
                          Ask on WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking / Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-end">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-blue-400 border border-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <span className="text-xs font-medium">Sri Assistant is thinking</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer Form */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/90 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about store hours, products, print rates, or digital services..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-10 py-3.5 bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                Answers tailored specifically for Sri Sai Rama Stationary
              </span>
              <span className="hidden sm:inline font-mono">
                Press Enter ↵ to send
              </span>
            </div>
          </div>

        </motion.div>

        {/* Quick Contact & Store Highlights Cards below Chatbot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Visit Store</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Plot No.1, Ayyappa Colony, Dammaiguda
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Print Direct</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send PDFs to +91 9866094840
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Store Hours</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                9:00 AM - 10:00 PM Daily
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
