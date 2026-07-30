import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { STORE_SYSTEM_INSTRUCTION, getLocalKnowledgeResponse } from './src/data/chatKnowledge';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily / securely
  let genAI: GoogleGenAI | null = null;
  function getGenAI() {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing.');
      }
      genAI = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return genAI;
  }

  // API endpoint for AI Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message text is required.' });
      }

      // Try generating response with Gemini AI
      try {
        const ai = getGenAI();

        const formattedHistory = Array.isArray(history)
          ? history.map((item: { sender: string; text: string }) => ({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            }))
          : [];

        const chat = ai.chats.create({
          model: 'gemini-3.5-flash',
          config: {
            systemInstruction: STORE_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
          history: formattedHistory,
        });

        const response = await chat.sendMessage({ message });
        if (response.text) {
          return res.json({ text: response.text });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using store knowledge base fallback:', geminiError?.message);
      }

      // Fail-safe Store Knowledge Base Response
      const fallbackText = getLocalKnowledgeResponse(message);
      return res.json({ text: fallbackText });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      const fallbackText = getLocalKnowledgeResponse(req.body?.message || '');
      return res.json({ text: fallbackText });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
