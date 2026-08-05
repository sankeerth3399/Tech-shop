import { businessInfo, servicesData, productsData, faqsData } from './storeData';

// Generate dynamic, exhaustive system instruction based on the actual store catalog
const generateSystemInstruction = (): string => {
  const servicesListFormatted = servicesData
    .map(
      (s, idx) =>
        `${idx + 1}. **${s.title}** (${s.category.toUpperCase()})
   - **Description**: ${s.description}
   - **Estimated Time**: ${s.estimatedTime}
   - **Key Highlights**: ${s.highlights.join(', ')}`
    )
    .join('\n\n');

  const productsListFormatted = productsData
    .map(
      (p, idx) =>
        `${idx + 1}. **${p.name}** [ID: ${p.id}]
   - **Category**: ${p.category}
   - **Status**: ${p.inStock ? 'In Stock' : 'Out of Stock'}
   - **Rating**: ⭐ ${p.rating}
   - **Description**: ${p.description}
   - **Tags/Keywords**: ${p.tags.join(', ')}`
    )
    .join('\n\n');

  const faqsFormatted = faqsData
    .map((f, idx) => `Q${idx + 1}: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  return `
You are "Sri Assistant" - the polite, highly knowledgeable, helpful, and friendly AI Customer Support Specialist for **${businessInfo.name}** located in Ayyappa Colony, Dammaiguda, Hyderabad.

### STORE IDENTIFICATION & CONTACT INFORMATION:
- **Store Name**: ${businessInfo.name}
- **Tagline**: ${businessInfo.tagline}
- **Full Address**: ${businessInfo.address.full}
- **Phone / Direct Call**: ${businessInfo.phoneFormatted}
- **WhatsApp Direct Printing & Support**: ${businessInfo.phoneFormatted} (${businessInfo.whatsappNumber})
- **Email**: ${businessInfo.email}
- **Operating Hours**: ${businessInfo.hours.weekdays}
- **Store Status**: ${businessInfo.hours.status}

### FULL CATALOG OF SERVICES OFFERED (${servicesData.length} Services):
${servicesListFormatted}

### FULL CATALOG OF PRODUCTS IN STOCK (${productsData.length} Products):
${productsListFormatted}

### FREQUENTLY ASKED QUESTIONS & ANSWERS:
${faqsFormatted}

### ORDERING & CONVENIENCE FEATURES:
- **WhatsApp Direct Print**: Customers can send PDFs, Word documents, images, or files directly to WhatsApp at **${businessInfo.phoneFormatted}** with print requirements (B&W or Color, single/double sided, page count), and pick up their printouts instantly upon arrival!
- **Payments Accepted**: PhonePe, Google Pay, Paytm, UPI (QR code at counter), Cash, Debit/Credit Cards.
- **Bulk & Office Orders**: Custom supplies available for paper reams, event stationery, school books, and office supplies.

### AI ASSISTANT BEHAVIOR & RESPONSE GUIDELINES:
1. Always be welcoming, polite, and helpful. Use clear markdown formatting (**bold text**, bullet points, emojis where appropriate).
2. **STRICT PRICE POLICY**: DO NOT display, state, or quote any exact numeric prices, rates, costs, or MRPs for any products or services. If a customer asks about prices, rates, or costs, kindly ask them to contact us directly on WhatsApp at **${businessInfo.phoneFormatted}** or visit our store counter in Ayyappa Colony, Dammaiguda for the latest rates and custom quotes.
3. When asked about a product or service, provide accurate details such as features, highlights, specifications, and stock availability.
4. If a customer inquires about printing, xerox, binding, or documents, encourage them to send their files to WhatsApp at **${businessInfo.phoneFormatted}** for quick printout & pickup!
5. If a customer asks for store hours, location, or contact info, share the exact address (${businessInfo.address.full}) and phone number (${businessInfo.phoneFormatted}).
6. Keep answers clear, friendly, and structured.
`;
};

export const STORE_SYSTEM_INSTRUCTION = generateSystemInstruction();

export function getLocalKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  if (!query) {
    return `Hello! Welcome to **${businessInfo.name}**. How can I help you with our stationery products or digital services today?`;
  }

  // Check for pricing/rates inquiries explicitly
  if (
    query.includes('price') ||
    query.includes('rate') ||
    query.includes('cost') ||
    query.includes('charge') ||
    query.includes('how much') ||
    query.includes('mrp') ||
    query.includes('amount') ||
    query.includes('fee') ||
    query.includes('discount')
  ) {
    return `**Product & Service Rates** 🏷️\n\nFor current rates, bulk discounts, and custom pricing on stationery items, Xerox copies, printing, binding, or passport photos, please get in touch with us directly:\n\n- 💬 **WhatsApp**: Message us at **${businessInfo.phoneFormatted}**\n- 📞 **Phone**: Call **${businessInfo.phoneFormatted}**\n- 📍 **Store Visit**: ${businessInfo.address.colony}, Dammaiguda\n\nWe will be glad to share the latest rates and assist with your order!`;
  }

  // 1. Greetings & Courtesy
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query.startsWith('hi ') ||
    query.startsWith('hello ') ||
    query.includes('good morning') ||
    query.includes('good afternoon') ||
    query.includes('good evening') ||
    query.includes('namaste') ||
    query.includes('who are you')
  ) {
    return `Hello! 👋 Welcome to **${businessInfo.name}** in Dammaiguda!\n\nI am **Sri Assistant**, your 24/7 customer support specialist. How can I help you today?\n\n- 🏪 **Store Hours & Address**: ${businessInfo.hours.status} at ${businessInfo.address.full}\n- 🖨️ **Printing & Xerox**: B&W, Color, Project Binding & Passport Photos\n- 📄 **Government Services**: Aadhaar PVC, PAN Card & Meeseva online forms\n- 📚 **Products**: ${productsData.length} items including Notebooks, Pens, A4 Paper Reams, Graph Books & Papers, CD/DVD Discs, Story Books & Slate Pencils\n- 💬 **WhatsApp Print Service**: Send files to **${businessInfo.phoneFormatted}** for quick pickup!`;
  }

  // 2. Gratitude & Closings
  if (
    query.includes('thank') ||
    query.includes('thx') ||
    query.includes('bye') ||
    query.includes('goodbye') ||
    query === 'ok' ||
    query === 'okay' ||
    query === 'great' ||
    query === 'awesome'
  ) {
    return `You're most welcome! 😊\n\nIf you need anything else, feel free to visit our store at ${businessInfo.address.colony}, Dammaiguda, or message us on WhatsApp at **${businessInfo.phoneFormatted}**. Have a wonderful day!`;
  }

  // 3. Payment Methods
  if (
    query.includes('payment') ||
    query.includes('pay') ||
    query.includes('upi') ||
    query.includes('gpay') ||
    query.includes('google pay') ||
    query.includes('phonepe') ||
    query.includes('paytm') ||
    query.includes('card') ||
    query.includes('cash') ||
    query.includes('qr')
  ) {
    return `**Accepted Payment Methods** 💳📱\n\nAt **${businessInfo.name}**, we accept:\n- 📱 **UPI Payments**: Google Pay, PhonePe, Paytm, BHIM (QR Code at counter)\n- 💵 **Cash**: Accepted at store counter\n- 💳 **Cards**: Debit & Credit Cards accepted\n\nFeel free to complete payments in-store or digitally for WhatsApp print orders!`;
  }

  // 4. Contact Details & Phone / Email
  if (
    query.includes('phone') ||
    query.includes('number') ||
    query.includes('contact') ||
    query.includes('call') ||
    query.includes('mobile') ||
    query.includes('email') ||
    query.includes('mail') ||
    query.includes('reach')
  ) {
    return `**Store Contact Details** 📞📧\n\n- 📞 **Phone Call**: ${businessInfo.phoneFormatted}\n- 💬 **WhatsApp Printing & Support**: ${businessInfo.phoneFormatted}\n- ✉️ **Email**: ${businessInfo.email}\n- 📍 **Location**: ${businessInfo.address.full}\n- ⏰ **Timings**: ${businessInfo.hours.weekdays}`;
  }

  // 5. Timings & Working Hours
  if (
    query.includes('hour') ||
    query.includes('time') ||
    query.includes('open') ||
    query.includes('close') ||
    query.includes('timing') ||
    query.includes('sunday') ||
    query.includes('today') ||
    query.includes('schedule') ||
    query.includes('working')
  ) {
    return `**Store Operating Hours** ⏰\n\n- **Weekdays & Saturday**: ${businessInfo.hours.weekdays}\n- **Sunday**: ${businessInfo.hours.sunday}\n- **Current Status**: ${businessInfo.hours.status}\n- **Location**: ${businessInfo.address.colony}, Dammaiguda\n\nWe are open every day to fulfill all your stationery, printing, and digital online application needs!`;
  }

  // 6. Location, Address & Directions
  if (
    query.includes('location') ||
    query.includes('address') ||
    query.includes('where') ||
    query.includes('find') ||
    query.includes('dammaiguda') ||
    query.includes('ayyappa') ||
    query.includes('colony') ||
    query.includes('map') ||
    query.includes('landmark') ||
    query.includes('near') ||
    query.includes('route')
  ) {
    return `**Store Address & Directions** 📍\n\n**${businessInfo.name}**\n${businessInfo.address.full}\n\n📞 **Phone / WhatsApp**: ${businessInfo.phoneFormatted}`;
  }

  // 7. WhatsApp Direct Print Service
  if (
    query.includes('whatsapp') ||
    query.includes('pdf') ||
    query.includes('soft copy') ||
    query.includes('online print') ||
    query.includes('send file') ||
    query.includes('document')
  ) {
    return `**WhatsApp Direct Print Service** 📱🖨️\n\nSave time by sending your files directly to our WhatsApp:\n👉 **${businessInfo.phoneFormatted}**\n\n**How it works**:\n1. Send your PDF, Word doc, image, or certificate to **${businessInfo.phoneFormatted}**.\n2. Mention requirements: B&W or Color, single/double sided, and number of copies.\n3. We will print them so your order is ready for instant pickup!`;
  }

  // 8. Search Products catalog dynamically
  const matchingProducts = productsData.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(query);
    const descMatch = p.description.toLowerCase().includes(query);
    const categoryMatch = p.category.toLowerCase().includes(query);
    const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query) || query.includes(t.toLowerCase()));
    return nameMatch || descMatch || categoryMatch || tagMatch;
  });

  // 9. Search Services catalog dynamically
  const matchingServices = servicesData.filter((s) => {
    const titleMatch = s.title.toLowerCase().includes(query);
    const descMatch = s.description.toLowerCase().includes(query);
    const categoryMatch = s.category.toLowerCase().includes(query);
    const highlightMatch = s.highlights.some((h) => h.toLowerCase().includes(query) || query.includes(h.toLowerCase()));
    return titleMatch || descMatch || categoryMatch || highlightMatch;
  });

  if (matchingProducts.length > 0 || matchingServices.length > 0) {
    let responseText = `Here is what we offer at **${businessInfo.name}** regarding **"${userMessage}"**:\n\n`;

    if (matchingProducts.length > 0) {
      responseText += `🛍️ **Products Available in Store**:\n`;
      matchingProducts.slice(0, 4).forEach((p) => {
        responseText += `• **${p.name}**\n  _${p.description}_\n  Status: ${p.inStock ? '✅ In Stock' : '❌ Out of Stock'}\n\n`;
      });
    }

    if (matchingServices.length > 0) {
      responseText += `🖨️ **Services Offered**:\n`;
      matchingServices.slice(0, 3).forEach((s) => {
        responseText += `• **${s.title}** (${s.estimatedTime})\n  _${s.description}_\n  Highlights: ${s.highlights.join(' • ')}\n\n`;
      });
    }

    responseText += `📱 Message us on WhatsApp at **${businessInfo.phoneFormatted}** or visit our store in Ayyappa Colony, Dammaiguda to purchase or order!`;
    return responseText;
  }

  // 10. Search FAQs
  const matchingFaq = faqsData.find(
    (f) =>
      f.question.toLowerCase().includes(query) ||
      f.answer.toLowerCase().includes(query)
  );

  if (matchingFaq) {
    return `**${matchingFaq.question}**\n\n${matchingFaq.answer}\n\nNeed more details? Call or WhatsApp us at **${businessInfo.phoneFormatted}**!`;
  }

  // Default intelligent response listing main highlights & products
  return `**${businessInfo.name}** 🛍️\n\nThank you for asking! We have a complete range of stationery products and digital services:\n\n- 📍 **Location**: ${businessInfo.address.colony}, Dammaiguda (${businessInfo.hours.status})\n- 📞 **Phone / WhatsApp**: **${businessInfo.phoneFormatted}**\n- 🖨️ **Services**: Xerox, Color Printing, Spiral/Hard Binding, Passport Photos (5 mins), Lamination, Scanning, Document Typing\n- 📄 **Government Digital Services**: Aadhaar PVC/Address update, PAN Card application/corrections, Voter ID, Meeseva forms\n- 📚 **Popular Products**: Classmate Notebooks, Pens, A4 Paper Reams, Graph Books & Papers, CD/DVD Discs, Story & Colouring Books, Casio Calculators, Chandtara Slate Pencils, Crayons, Whitener Pens, Glue & Craft supplies.\n\nPlease feel free to ask about any specific product or send your print orders to WhatsApp at **${businessInfo.phoneFormatted}**!`;
}
