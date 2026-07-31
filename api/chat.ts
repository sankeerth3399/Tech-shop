import { GoogleGenAI } from '@google/genai';
import { STORE_SYSTEM_INSTRUCTION, getLocalKnowledgeResponse } from '../src/data/chatKnowledge';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('Failed to parse request body string:', e);
      }
    }

    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Gemini API expects history to start with a 'user' turn
        const rawHistory = Array.isArray(history) ? history : [];
        const firstUserIdx = rawHistory.findIndex((item: { sender: string }) => item.sender === 'user');
        const validHistory = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

        const formattedHistory = validHistory.map((item: { sender: string; text: string }) => ({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        }));

        let aiReplyText = '';

        try {
          const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: STORE_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
            history: formattedHistory,
          });

          const response = await chat.sendMessage({ message });
          if (response.text) {
            aiReplyText = response.text;
          }
        } catch (flashErr) {
          try {
            const chatPro = ai.chats.create({
              model: 'gemini-2.5-pro',
              config: {
                systemInstruction: STORE_SYSTEM_INSTRUCTION,
                temperature: 0.7,
              },
              history: formattedHistory,
            });

            const response = await chatPro.sendMessage({ message });
            if (response.text) {
              aiReplyText = response.text;
            }
          } catch (proErr) {
            console.log('Gemini model calls unavailable in Vercel API, serving local knowledge base.');
          }
        }

        if (aiReplyText) {
          return res.status(200).json({ text: aiReplyText });
        }
      } catch (geminiError: any) {
        console.log('Gemini API unavailable or fallback used in serverless handler, serving store knowledge base response.');
      }
    }

    // Fallback if GEMINI_API_KEY is not set in Vercel environment or if API call fails
    const fallbackText = getLocalKnowledgeResponse(message);
    return res.status(200).json({ text: fallbackText });
  } catch (error: any) {
    console.error('Error in Vercel /api/chat:', error);
    const fallbackText = getLocalKnowledgeResponse(req.body?.message || '');
    return res.status(200).json({ text: fallbackText });
  }
}
