import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily / securely
  let genAI: GoogleGenAI | null = null;
  function getGenAI() {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
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

  // System instruction with comprehensive store & service context
  const STORE_SYSTEM_INSTRUCTION = `
You are "Sri Assistant" - the polite, knowledgeable, and helpful AI Customer Support Specialist for **Sri Sai Rama Stationary & Digital Services** (also known as Sri Vigneshwara Stationery & Digital Services) located in Dammaiguda, Hyderabad.

### STORE IDENTIFICATION & LOCATION:
- **Store Name**: Sri Sai Rama Stationary (Sri Vigneshwara Stationery & Digital Services)
- **Tagline**: Your Trusted Destination for Stationery, Office Supplies, Printing & Digital Online Services in Dammaiguda
- **Full Address**: Plot No.1, Ayyappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083
- **Phone / Call**: +91 9866094840
- **WhatsApp Order & Support**: +91 9866094840 (Direct WhatsApp link available)
- **Email**: techshop.3699@gmail.com
- **Operating Hours**: 9:00 AM to 10:00 PM (Open All 7 Days a Week, Monday to Sunday)

### CORE SERVICES & DIGITAL OFFERINGS:
1. **Xerox Photocopying**: High-speed B&W photostat copies, vibrant color copies, double-sided copying, booklet copying, ID card both-side photocopying.
2. **Color & B/W Printing**: HD digital printing from WhatsApp, Email, Pen Drive, or Mobile. Project reports, certificates, resumes, assignment printouts.
3. **Aadhaar & Government Online Services**: Aadhaar address/mobile updates, PVC plastic card printing, PAN card new applications & correction, Voter ID, Ration Card, Income & Caste certificates, Meeseva digital online applications.
4. **Passport Size Photos**: Instant glossy/matte passport photos (8, 16, or 32 copies) ready in 5 minutes with background color customization.
5. **Lamination & Document Protection**: Quick pouch hot lamination for certificates, ID cards, driving licenses, and mark sheets.
6. **Project & Book Binding**: Spiral binding, soft cover thermal binding, and hard project report binding with golden/silver embossing for school, college, and university projects.
7. **Document Scanning**: High-resolution multi-page PDF scanning sent directly to WhatsApp or Email.

### PRODUCTS & INVENTORY IN STORE:
- **Notebooks & Registers**: Classmate long books, practical record books, drawing pads, graph papers, single/double line notebooks, assignment sheets, accounts registers.
- **Pens & Writing Instruments**: Gel pens, ballpoint pens, Parker gift pens, fountain pens, mechanical pencils, wooden HB pencils, highlighters, permanent markers, whiteboard markers.
- **Paper & Envelopes**: JK Copier A4 paper reams (75/80 GSM), Legal size paper reams, Chart paper (all colors), Thermocol sheets, Cardboard sheets, Courier covers, Envelopes.
- **Calculators & Math Kits**: Scientific calculators (Casio/Orpat), financial calculators, geometry boxes, compass sets, rulers, protractors.
- **Chalk & Slate Pencils**: Chandtara white slate pencils, color slate pencils, natural slate stone pencils, non-dust white chalks, multi-color chalks, student writing slates.
- **Adhesives & Office Essentials**: Fevicol liquid glue, Glue sticks, Fevikwik, clear cello tape, double-sided foam tape, brown packaging tape, staplers, punchers, stamp pads, erasers, sharpeners, exam clipboards.

### ORDERING & CUSTOMER CONVENIENCE:
- **WhatsApp Direct Print**: Customers can send PDFs or images on WhatsApp (+91 9866094840) to have printouts ready for quick pickup.
- **Bulk & Office Orders**: Bulk discounts available on A4 paper reams, event stationery, and office registers.
- **Payment Methods**: Accepts UPI (PhonePe, Google Pay, Paytm), Cash, and Card payments.

### STRICT BEHAVIOR RULES & GUARDRAILS:
1. **Subject Domain**: ONLY answer questions directly subjected and related to Sri Sai Rama Stationary, its products, services, store hours, location, contact information, WhatsApp printing, or store policies.
2. **Polite Redirection**: If a user asks questions that are completely unrelated to our store, products, or services (e.g. general coding, quantum physics, cooking recipes, general news, or unrelated subjects), politely answer:
   "I am Sri Assistant, the AI Customer Support Assistant for Sri Sai Rama Stationary & Digital Services. I can help you with questions about our store hours, location in Dammaiguda, product availability (notebooks, pens, A4 paper, slate pencils, calculators), printing/Xerox rates, or Aadhaar/PAN online services. How may I assist you with our store today?"
3. **Tone & Style**: Friendly, professional, clear, and helpful. Format responses with clean bullet points or concise paragraphs.
4. **Call to Action**: Encourage users to visit the store at Dammaiguda or message on WhatsApp at +91 9866094840 for quick orders or printouts.
`;

  // Local Store Knowledge Base Fallback Engine
  function getLocalKnowledgeResponse(userMessage: string): string {
    const query = userMessage.toLowerCase();

    if (
      query.includes('hour') ||
      query.includes('time') ||
      query.includes('open') ||
      query.includes('close') ||
      query.includes('timing') ||
      query.includes('sunday') ||
      query.includes('schedule')
    ) {
      return `**Store Timings & Availability** ⏰\n\n- **Operating Hours**: 9:00 AM to 10:00 PM\n- **Working Days**: Open all 7 days a week (Monday through Sunday)\n\nFeel free to visit us in Dammaiguda or send print files on WhatsApp (+91 9866094840) anytime during store hours!`;
    }

    if (
      query.includes('location') ||
      query.includes('address') ||
      query.includes('where') ||
      query.includes('find') ||
      query.includes('dammaiguda') ||
      query.includes('map') ||
      query.includes('colony')
    ) {
      return `**Store Address & Location** 📍\n\n**Sri Sai Rama Stationary & Digital Services**\nPlot No. 1, Ayyappa Colony, Dammaiguda,\nHyderabad, Secunderabad, Telangana - 500083\n\n📞 **Phone**: +91 9866094840\n💬 **WhatsApp**: +91 9866094840\n\nWe are conveniently located right in Ayyappa Colony, Dammaiguda.`;
    }

    if (
      query.includes('whatsapp') ||
      query.includes('printout') ||
      query.includes('pdf') ||
      query.includes('document') ||
      query.includes('send') ||
      query.includes('file')
    ) {
      return `**WhatsApp Direct Print Service** 📱🖨️\n\nYou can easily send your files or PDFs directly to our WhatsApp number:\n👉 **+91 9866094840**\n\n**How it works**:\n1. Send your documents/PDFs on WhatsApp.\n2. Specify B&W or Color, single/double sided, and copy count.\n3. We will print them out so they are ready for quick pickup when you arrive!`;
    }

    if (
      query.includes('xerox') ||
      query.includes('copy') ||
      query.includes('print') ||
      query.includes('bind') ||
      query.includes('lamination') ||
      query.includes('scan') ||
      query.includes('photo')
    ) {
      return `**Printing, Xerox & Document Services** 🖨️\n\nWe offer complete printing & documentation solutions:\n- **Photocopy / Xerox**: High-speed B&W and color photostats, double-sided copies.\n- **Digital Printing**: High-resolution printouts from WhatsApp, Pen Drive, or Email.\n- **Project Binding**: Spiral binding, soft covers, and hard project report binding with embossing.\n- **Passport Photos**: Instant 5-minute passport photos (8, 16, 32 copies).\n- **Pouch Lamination**: Hot lamination for certificates, ID cards, and licenses.\n- **PDF Scanning**: Multi-page high quality document scanning sent to WhatsApp/Email.`;
    }

    if (
      query.includes('aadhaar') ||
      query.includes('pan') ||
      query.includes('voter') ||
      query.includes('meeseva') ||
      query.includes('government') ||
      query.includes('pvc') ||
      query.includes('ration') ||
      query.includes('certificate')
    ) {
      return `**Digital & Government Online Services** 🌐📄\n\nWe assist with online application services including:\n- **Aadhaar Services**: Address / phone updates, PVC plastic card printing.\n- **PAN Card**: New PAN applications, correction & PVC card printing.\n- **Online Services**: Voter ID card, Ration Card applications, Income & Caste certificates, Meeseva digital services.\n- **Lamination & PVC Printing**: High quality durable plastic card prints.`;
    }

    if (
      query.includes('slate') ||
      query.includes('pencil') ||
      query.includes('chalk') ||
      query.includes('chandtara') ||
      query.includes('stone') ||
      query.includes('dustless')
    ) {
      return `**Slate Pencils & Blackboard Chalks** ✏️📦\n\nYes! We carry:\n- **Chandtara Natural Slate Pencils**: White & colored natural stone slate pencils.\n- **Dustless Blackboard Chalks**: Non-toxic white and multi-color dustless chalk sticks.\n- **Writing Slates**: Traditional student writing slates.\n\nVisit our store in Dammaiguda or order via WhatsApp (+91 9866094840).`;
    }

    if (
      query.includes('paper') ||
      query.includes('a4') ||
      query.includes('jk') ||
      query.includes('copier') ||
      query.includes('ream') ||
      query.includes('legal') ||
      query.includes('chart') ||
      query.includes('thermocol')
    ) {
      return `**Paper, Reams & Craft Supplies** 📄🎨\n\n- **JK Copier A4 Paper Reams** (75/80 GSM) - Bulk & single ream discounts available.\n- **Legal Size Paper Reams**\n- **Chart Papers**: All vibrant colors for school projects.\n- **Thermocol & Cardboard Sheets**\n- **Courier Covers & Envelopes**: All sizes available.`;
    }

    if (
      query.includes('calculator') ||
      query.includes('notebook') ||
      query.includes('pen') ||
      query.includes('pencil') ||
      query.includes('classmate') ||
      query.includes('parker') ||
      query.includes('fevicol') ||
      query.includes('stapler') ||
      query.includes('geometry') ||
      query.includes('box')
    ) {
      return `**Stationery & Office Essentials** 📚✒️\n\nWe stock a full range of school and office supplies:\n- **Notebooks**: Classmate long books, graph books, drawing pads, registers.\n- **Pens**: Gel pens, ball pens, Parker gift pens, markers, highlighters.\n- **Calculators**: Scientific (Casio/Orpat) & 12-digit commercial desktop calculators.\n- **Geometry Boxes**: Compass sets, scale rulers, protractors.\n- **Adhesives & Office**: Fevicol, glue sticks, tapes, staplers, clipboards.`;
    }

    // Guardrail for unrelated topics
    if (
      query.includes('code') ||
      query.includes('programming') ||
      query.includes('recipe') ||
      query.includes('cook') ||
      query.includes('weather') ||
      query.includes('movie') ||
      query.includes('president') ||
      query.includes('quantum') ||
      query.includes('python') ||
      query.includes('java')
    ) {
      return `I am **Sri Assistant**, the AI Customer Support Assistant for **Sri Sai Rama Stationary & Digital Services**.\n\nI specialize in questions regarding our store hours, location in Dammaiguda, products (A4 paper reams, Classmate notebooks, Chandtara slate pencils, calculators), printing/Xerox services, and online government applications (Aadhaar/PAN).\n\nHow can I help you with our stationery store or digital services today?`;
    }

    // General store summary fallback
    return `**Welcome to Sri Sai Rama Stationary & Digital Services** 🛍️\n\nLocated in Plot No.1, Ayyappa Colony, Dammaiguda, Hyderabad.\n- **Store Hours**: 9:00 AM – 10:00 PM (Everyday)\n- **WhatsApp Printouts**: Send documents to **+91 9866094840** for instant printing & quick pickup.\n- **Services**: Xerox, Color Printing, Hard/Spiral Binding, Aadhaar/PAN online services, Passport photos, and full school/office stationery.\n\nHow can I assist you with your stationery or printing needs today?`;
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
