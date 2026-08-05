export const STORE_SYSTEM_INSTRUCTION = `
You are "Sri Assistant" - the polite, highly knowledgeable, and friendly AI Customer Support Specialist for **Sri Sai Rama Stationary & Digital Services** (also known as Sri Vigneshwara Stationery & Digital Services) located in Ayyappa Colony, Dammaiguda, Hyderabad.

### STORE IDENTIFICATION & LOCATION:
- **Store Name**: Sri Sai Rama Stationary & Digital Services (Sri Vigneshwara Stationery & Digital Services)
- **Tagline**: Your One-Stop Destination for Stationery, Office Supplies, Printing, Photocopy & Digital Online Services in Dammaiguda
- **Full Address**: Plot No. 1, Ayyappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083
- **Phone / Call**: +91 9866094840
- **WhatsApp Direct Print & Support**: +91 9866094840
- **Email**: techshop.3699@gmail.com
- **Operating Hours**: 9:00 AM to 10:00 PM (Open All 7 Days a Week, Monday through Sunday)

### CORE SERVICES & DIGITAL OFFERINGS:
1. **Xerox & Photocopying**: High-speed B&W photostat copies, vibrant color copies, double-sided printing, booklet printing, and double-sided ID card copying.
2. **Color & B/W Printing**: HD digital printing directly from WhatsApp, Email, Pen Drive, or Mobile. Perfect for project reports, certificates, resumes, assignment printouts.
3. **Aadhaar & Government Online Services**: Aadhaar address/mobile updates, durable plastic PVC card printing, PAN card new applications & corrections, Voter ID, Ration Card, Income & Caste certificates, Meeseva digital online applications.
4. **Passport Size Photos**: Instant glossy/matte passport photos (8, 16, or 32 copies) ready in 5 minutes with background color customization.
5. **Lamination & Document Protection**: Quick pouch hot lamination for certificates, ID cards, driving licenses, mark sheets, and important documents.
6. **Project & Book Binding**: Spiral binding, soft cover thermal binding, and hard project report binding with golden/silver embossing for school, college, and university projects.
7. **Document Scanning**: High-resolution multi-page PDF scanning sent directly to your WhatsApp or Email.

### PRODUCTS & INVENTORY IN STORE:
- **Notebooks & Registers**: Classmate long books, practical record books, drawing pads, graph papers, single/double line notebooks, assignment sheets, accounts registers, project sheets.
- **Pens & Writing Instruments**: Gel pens, ballpoint pens, Parker gift pens, fountain pens, mechanical pencils (0.5mm / 0.7mm), wooden HB pencils, highlighters, permanent markers, whiteboard markers.
- **Paper & Envelopes**: JK Copier A4 paper reams (75/80 GSM), Legal size paper reams, Chart paper (all colors), Thermocol sheets, Cardboard sheets, Courier covers, Envelopes.
- **Calculators & Math Kits**: Scientific calculators (Casio / Orpat), financial calculators, geometry boxes, compass sets, rulers, protractors.
- **Chalk & Slate Pencils**: Chandtara white slate pencils, color slate pencils, natural slate stone pencils, non-dust white chalks, multi-color chalks, student writing slates.
- **Adhesives & Office Essentials**: Fevicol liquid glue, Glue sticks, Fevikwik, clear cello tape, double-sided foam tape, brown packaging tape, staplers, staple pins, punchers, stamp pads, erasers, sharpeners, exam clipboards, correction whitener pens.
- **Art & Craft**: Wax crayons, oil pastels, color pencils, sketch pens, water colors, craft sheets, drawing books.

### ORDERING & CUSTOMER CONVENIENCE:
- **WhatsApp Direct Print**: Send PDFs or images on WhatsApp (+91 9866094840) to have printouts ready for instant pickup.
- **Payments Accepted**: PhonePe, Google Pay, Paytm, UPI, Debit/Credit Cards, and Cash.
- **Bulk & Office Orders**: Special discounted rates available on A4 paper reams, event stationery, and office registers.

### RESPONSE GUIDELINES:
1. Provide complete, polite, and detailed answers to every customer query regarding our products, prices, services, timings, location, and WhatsApp ordering.
2. Maintain a warm, welcoming tone with clear formatting, helpful bullet points, and actionable advice (such as inviting them to visit or message on WhatsApp at +91 9866094840).
`;

export function getLocalKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

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
    return `Hello! 👋 Welcome to **Sri Sai Rama Stationary & Digital Services** in Dammaiguda!\n\nI am **Sri Assistant**, your 24/7 AI customer support assistant. How can I help you today?\n\n- 🏪 **Store Hours & Address**: 9 AM – 10 PM in Ayyappa Colony, Dammaiguda\n- 🖨️ **Printing & Xerox**: B&W, Color, Project Binding & Passport Photos\n- 📄 **Government Services**: Aadhaar PVC, PAN Card & Meeseva online forms\n- 📚 **Stationery & Papers**: Notebooks, Pens, A4 Paper Reams, Slate Pencils & Calculators\n- 💬 **WhatsApp Print Service**: Send files to **+91 9866094840** for quick pickup!`;
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
    return `You're most welcome! 😊\n\nIf you need anything else, feel free to visit our store in Ayyappa Colony, Dammaiguda, or send us a message on WhatsApp at **+91 9866094840**. Have a wonderful day!`;
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
    return `**Accepted Payment Methods** 💳📱\n\nAt **Sri Sai Rama Stationary**, we offer flexible payment options for your convenience:\n- 📱 **UPI Payments**: Google Pay, PhonePe, Paytm, and BHIM (QR Code available at counter)\n- 💵 **Cash**: Cash payments accepted\n- 💳 **Cards**: Debit & Credit Card payments accepted\n\nFeel free to complete your payment in-store or digitally for WhatsApp print orders!`;
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
    return `**Store Contact Details** 📞📧\n\n- 📞 **Phone Call**: +91 9866094840\n- 💬 **WhatsApp Support & Printing**: +91 9866094840\n- ✉️ **Email**: techshop.3699@gmail.com\n- 📍 **Location**: Plot No. 1, Ayyappa Colony, Dammaiguda, Hyderabad, Telangana - 500083\n- ⏰ **Timings**: 9:00 AM to 10:00 PM (Open 7 days a week)`;
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
    return `**Store Operating Hours** ⏰\n\n- **Opening Time**: 9:00 AM\n- **Closing Time**: 10:00 PM\n- **Operating Days**: Open All 7 Days a Week (Monday through Sunday)\n\nWe are open every day to serve all your stationery, printing, and digital online application needs in Dammaiguda!`;
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
    return `**Store Address & Directions** 📍\n\n**Sri Sai Rama Stationary & Digital Services**\nPlot No. 1, Ayyappa Colony, Dammaiguda,\nHyderabad, Secunderabad, Telangana - 500083\n\n📍 **Landmark**: Conveniently located in Ayyappa Colony main road, Dammaiguda.\n📞 **Phone/WhatsApp**: +91 9866094840`;
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
    return `**WhatsApp Direct Print Service** 📱🖨️\n\nSave time by sending your documents directly to our WhatsApp:\n👉 **+91 9866094840**\n\n**How it works**:\n1. Send your PDF, image, or document to **+91 9866094840**.\n2. Mention requirements: B&W or Color, single/double sided, and copy count.\n3. We will print them out so your order is ready when you arrive!`;
  }

  // 8. Xerox & Photocopying
  if (
    query.includes('xerox') ||
    query.includes('photocopy') ||
    query.includes('photostat') ||
    query.includes('b&w') ||
    query.includes('double side') ||
    query.includes('both side')
  ) {
    return `**Xerox & Photocopying Services** 📄🖨️\n\nWe provide high-quality copying at budget prices:\n- **Black & White Xerox**: Clean, crisp high-speed photostats\n- **Color Photocopies**: Vibrant digital color copies\n- **Double-Sided Xerox**: Efficient back-to-back copies\n- **ID Card Copying**: Aadhaar, Voter ID, & Driving License both-side copying on a single sheet\n\nVisit us in Dammaiguda or send files on WhatsApp (+91 9866094840).`;
  }

  // 9. Color & B/W Printing
  if (
    query.includes('print') ||
    query.includes('printing') ||
    query.includes('color print') ||
    query.includes('project report') ||
    query.includes('assignment') ||
    query.includes('resume') ||
    query.includes('certificate print')
  ) {
    return `**Digital Printing Services** 🖨️✨\n\nWe offer HD digital printing from WhatsApp, Pen Drive, Email, or Mobile:\n- **Assignment & Project Reports**: B&W and color page printouts\n- **Certificates & Resumes**: Premium paper printing for job applications and academic reports\n- **Glossy & Matte Prints**: High resolution output for diagrams and charts\n\nSend files to **+91 9866094840** on WhatsApp for quick pickup!`;
  }

  // 10. Project Binding & Thermal / Spiral
  if (
    query.includes('bind') ||
    query.includes('binding') ||
    query.includes('spiral') ||
    query.includes('hard cover') ||
    query.includes('soft cover') ||
    query.includes('emboss')
  ) {
    return `**Project & Book Binding Services** 📚🔖\n\nWe specialize in professional academic and official binding:\n- **Spiral Binding**: Durable plastic spiral coil binding with clear protective front/back sheets\n- **Soft Cover Thermal Binding**: Sleek bound presentation for project reports\n- **Hard Book Binding**: Heavy-duty hardcover project report binding with golden/silver embossing for school, college, and university submissions.`;
  }

  // 11. Passport Size Photos
  if (
    query.includes('passport') ||
    query.includes('photo') ||
    query.includes('stamp size') ||
    query.includes('instant photo')
  ) {
    return `**Instant Passport Size Photos** 📸⚡\n\n- **Speed**: Ready in just **5 minutes**!\n- **Options**: Available in packs of 8, 16, or 32 copies\n- **Finish**: Premium glossy or matte photographic paper\n- **Features**: Custom background colors (blue, white, grey) as required for official applications, visas, school admissions, and job forms.`;
  }

  // 12. Aadhaar & Government Online Services
  if (
    query.includes('aadhaar') ||
    query.includes('pan') ||
    query.includes('voter') ||
    query.includes('meeseva') ||
    query.includes('pvc') ||
    query.includes('ration') ||
    query.includes('caste') ||
    query.includes('income') ||
    query.includes('government') ||
    query.includes('online service')
  ) {
    return `**Government Online & Digital Services** 🌐📑\n\nWe assist with official digital applications and document services:\n- **Aadhaar Services**: Address / phone updates & durable PVC plastic card printing\n- **PAN Card**: New PAN application, corrections & PVC smart card printing\n- **Voter ID & Ration Card**: Online applications, status tracking & updates\n- **Certificates & Meeseva**: Income, Caste & Residence certificate applications`;
  }

  // 13. Notebooks, Registers & Exercise Books
  if (
    query.includes('notebook') ||
    query.includes('register') ||
    query.includes('classmate') ||
    query.includes('long book') ||
    query.includes('record book') ||
    query.includes('drawing book') ||
    query.includes('graph') ||
    query.includes('assignment sheet')
  ) {
    return `**Notebooks & School Registers** 📚✏️\n\nWe carry top brand exercise books and registers:\n- **Classmate Notebooks**: Long books, short notebooks, single/double line ruling\n- **Practical Records**: Physics, Chemistry & Biology laboratory record books\n- **Drawing Pads & Graph Books**: Premium white paper for art and math\n- **Assignment Sheets**: Punch sheets and project paper bundles`;
  }

  // 14. Pens, Pencils & Writing Supplies
  if (
    query.includes('pen') ||
    query.includes('pencil') ||
    query.includes('gel pen') ||
    query.includes('ball pen') ||
    query.includes('parker') ||
    query.includes('fountain') ||
    query.includes('highlighter') ||
    query.includes('marker') ||
    query.includes('mechanical') ||
    query.includes('lead')
  ) {
    return `**Pens, Pencils & Writing Supplies** ✒️✏️\n\n- **Gel & Ballpoint Pens**: Cello, Hauser, Flair, Doms, Pentonic smooth writing pens\n- **Parker Executive Pens**: Premium metallic gift pens in presentation boxes\n- **Pencils**: Wooden HB graphite pencils & precision 0.5mm/0.7mm mechanical pen pencils\n- **Markers & Highlighters**: Neon highlighters, permanent markers & whiteboard markers`;
  }

  // 15. Paper, Reams & Envelopes
  if (
    query.includes('paper') ||
    query.includes('a4') ||
    query.includes('jk') ||
    query.includes('copier') ||
    query.includes('ream') ||
    query.includes('legal paper') ||
    query.includes('chart') ||
    query.includes('colour paper') ||
    query.includes('envelope') ||
    query.includes('cover')
  ) {
    return `**Paper Reams, Chart Papers & Covers** 📄📦\n\n- **JK Copier A4 Paper Reams** (75 GSM / 80 GSM - 500 sheets pack)\n- **Legal Size Copier Paper Reams**\n- **Coloured Chart Papers**: All vibrant shades for school projects\n- **Courier Covers & Envelopes**: Cloth-lined envelopes, window covers, and document covers in all sizes`;
  }

  // 16. Calculators & Geometry Math Kits
  if (
    query.includes('calculator') ||
    query.includes('casio') ||
    query.includes('orpat') ||
    query.includes('scientific') ||
    query.includes('geometry') ||
    query.includes('compass') ||
    query.includes('scale') ||
    query.includes('ruler') ||
    query.includes('protractor')
  ) {
    return `**Calculators & Math Geometry Supplies** 📐🔢\n\n- **Scientific Calculators**: Casio (fx-82MS, fx-991EX) & Orpat engineering calculators\n- **Commercial Desktop Calculators**: 12-digit solar/battery desktop calculators\n- **Geometry Sets**: Doms & Camlin metal compass boxes, scales, set squares & protractors`;
  }

  // 17. Slate Pencils, Chalks & Slates
  if (
    query.includes('slate') ||
    query.includes('pencil') ||
    query.includes('chalk') ||
    query.includes('chandtara') ||
    query.includes('stone') ||
    query.includes('dustless')
  ) {
    return `**Slate Pencils & Blackboard Chalks** ✏️🧱\n\n- **Chandtara Natural Slate Pencils**: White & colored natural stone slate pencils\n- **Dustless Chalks**: Non-toxic white and multi-color classroom chalk sticks\n- **Writing Slates**: Durable wooden/plastic framed student slates`;
  }

  // 18. Adhesives, Tapes, Whitener & Office Tools
  if (
    query.includes('fevicol') ||
    query.includes('glue') ||
    query.includes('fevikwik') ||
    query.includes('tape') ||
    query.includes('stapler') ||
    query.includes('pin') ||
    query.includes('whitener') ||
    query.includes('correction') ||
    query.includes('puncher') ||
    query.includes('eraser') ||
    query.includes('sharpener') ||
    query.includes('clipboard')
  ) {
    return `**Adhesives, Whiteners & Desk Accessories** ✂️📌\n\n- **Adhesives**: Fevicol liquid glue, Glue sticks, Fevikwik instant adhesive\n- **Tapes**: Clear cello tape, double-sided foam tape, brown packaging tape\n- **Correction**: 0.8mm metal tip whitener pens & correction tape rollers\n- **Desk Tools**: Heavy-duty staplers with pins, 2-hole paper punchers, dust-free erasers, sharpeners & exam clipboards`;
  }

  // 19. Art, Crayons & Colors
  if (
    query.includes('crayon') ||
    query.includes('pastel') ||
    query.includes('color pencil') ||
    query.includes('water color') ||
    query.includes('paint') ||
    query.includes('drawing') ||
    query.includes('sketch')
  ) {
    return `**Art & Craft Supplies** 🎨🖍️\n\n- **Crayons & Pastels**: Smooth non-smudging wax crayons and oil pastel boxes\n- **Color Pencils**: Doms & Faber-Castell 12/24 shade color pencil sets\n- **Paints & Markers**: Water color cakes, acrylic tubes, sketch pen sets, and drawing sheets`;
  }

  // 20. Price, Discounts & Wholesale Inquiries
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('discount') ||
    query.includes('offer') ||
    query.includes('cheap') ||
    query.includes('wholesale') ||
    query.includes('bulk')
  ) {
    return `**Affordable Pricing & Bulk Discounts** 🏷️💰\n\nAt **Sri Sai Rama Stationary**, we provide wholesale and retail pricing with attractive discounts:\n- **Paper Reams**: Special bulk rates on JK Copier A4 paper reams\n- **School/Office Orders**: Quantity discounts on notebooks, files, and pens\n- **Printing**: Reduced rates for bulk Xerox and multi-page project printing\n\nContact us on WhatsApp (**+91 9866094840**) for custom quotes on bulk purchases!`;
  }

  // 21. Delivery & Orders
  if (
    query.includes('delivery') ||
    query.includes('home delivery') ||
    query.includes('order') ||
    query.includes('pickup') ||
    query.includes('ship')
  ) {
    return `**Ordering & Pickup Information** 🛍️🚚\n\n- **WhatsApp Pickup Order**: Message your required items or print files to **+91 9866094840** and pick them up instantly without waiting!\n- **Local Delivery**: Available for bulk stationery orders in Dammaiguda, Ayyappa Colony, and nearby areas.\n- **Store Visit**: Walk into our store between 9:00 AM and 10:00 PM every day!`;
  }

  // Default intelligent response for any other customer question
  return `**Sri Sai Rama Stationary & Digital Services** 🛍️\n\nThank you for reaching out! Here is how we can assist you:\n\n- 📍 **Store Location**: Plot No. 1, Ayyappa Colony, Dammaiguda, Hyderabad (9 AM – 10 PM daily)\n- 📞 **Phone / WhatsApp**: **+91 9866094840**\n- 🖨️ **Services**: Xerox, Color Printing, Hard/Spiral Binding, Passport Photos, Lamination, Scanning\n- 📄 **Government Online Services**: Aadhaar address update/PVC, PAN Card, Voter ID & Meeseva forms\n- 📚 **Products**: Classmate Notebooks, Pens, A4 Paper Reams, Casio Calculators, Chandtara Slate Pencils, Crayons & Office Stationery\n\nPlease feel free to ask any specific question or message us on WhatsApp at **+91 9866094840**!`;
}
