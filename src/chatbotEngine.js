// ============================================================
// GREENWOOD ACADEMY CHATBOT — Knowledge Base & Response Engine
// Pure JavaScript — No external API required
// ============================================================

// -------------------------------------------------------
// KNOWLEDGE BASE
// -------------------------------------------------------
const KB = {
  school: {
    name: "Greenwood Academy",
    founded: "1997",
    founder: "Dr. Ramesh Agarwal",
    affiliation: "CBSE (Affiliation No: 2130045, School No: 55672)",
    location: "123 Knowledge Park, Sector 18, Noida, Uttar Pradesh 201301",
    phone: "+91 98765 43210",
    email: "admissions@greenwoodacademy.edu",
    timings: "Monday to Saturday, 8:00 AM – 2:30 PM. Office hours: 8 AM – 4 PM.",
    principal: "Mrs. Deepa Verma (M.Ed, Ph.D, 30+ years experience)",
    students: "2400+",
    teachers: "120+",
    years: "28+",
    awards: "85+",
    campus: "5-acre green campus with modern infrastructure",
    iso: "ISO 9001:2015 certified",
    website: "www.greenwoodacademy.edu",
  },

  admissions: {
    session: "2025-26",
    status: "OPEN",
    classes: "Nursery to Class VIII",
    lastDate: "March 31, 2025",
    testDates: "April 5–10, 2025",
    resultDate: "April 15, 2025",
    feeDeadline: "April 25, 2025",
    process: [
      "Fill the online application form",
      "Submit required documents",
      "Entrance assessment (if applicable)",
      "Interview with Principal",
      "Fee payment and seat confirmation",
    ],
    documents: [
      "Birth Certificate (original + photocopy)",
      "Aadhaar Card of child and parents",
      "Last class Report Card / Transfer Certificate",
      "4 passport-size photographs",
      "Residential proof",
      "Immunization certificate",
    ],
    fees: {
      "Nursery–UKG": { admission: "₹5,000", monthly: "₹2,500", annual: "₹8,000" },
      "Class I–V": { admission: "₹8,000", monthly: "₹3,500", annual: "₹12,000" },
      "Class VI–VIII": { admission: "₹10,000", monthly: "₹4,500", annual: "₹15,000" },
    },
    contact: "admissions@greenwoodacademy.edu | +91 98765 43210",
  },

  academics: {
    board: "CBSE",
    classes: "Nursery, LKG, UKG, Class I to Class VIII",
    classrooms: "Smart classrooms with interactive digital boards",
    sessionStart: "April 1",
    sessionEnd: "March 31",
    examTypes: "Unit Tests, Half-Yearly, Annual Examinations, Pre-Board (for Class VIII)",
    resultFrequency: "Quarterly (4 times per year)",
    subjects: {
      "Nursery–UKG": "English, Hindi, Maths, EVS, Art & Craft, Music, Rhymes, Physical Activity",
      "Class I–III": "English, Hindi, Mathematics, EVS, Computer, Art, PE, Moral Science",
      "Class IV–V": "English, Hindi, Mathematics, Science, Social Studies, Computer, Sanskrit, GK",
      "Class VI–VIII": "English, Hindi, Mathematics, Science, History, Geography, Civics, Computer, Sanskrit",
    },
    specialPrograms: "Math Olympiad, Science Olympiad, National Talent Search (NTS), Robotics Club",
    syllabus: "Available for download on the Academics page of the website",
  },

  faculty: {
    total: "120+ qualified teachers",
    ratio: "20:1 (students to teacher)",
    qualifications: "Our faculty hold degrees from IITs, NITs, Central Universities, and premier institutions",
    departments: ["Science & Math", "Languages", "Social Sciences", "Technology", "Sports", "Arts"],
    notable: [
      "Dr. Meera Joshi – Ph.D Mathematics (IIT Bombay), 18 years experience",
      "Dr. Amit Verma – Ph.D Chemistry (BITS Pilani), 20 years experience",
      "Mrs. Anita Singh – M.A. English (JNU), 12 years experience",
    ],
    counselor: "Mrs. Lata Saxena (School Counselor – available daily)",
  },

  facilities: {
    labs: "6 science labs (Physics, Chemistry, Biology, Electronics), 4 computer labs (200+ systems)",
    library: "Central Library with 15,000+ books and digital resources",
    sports: "Football ground, cricket pitch, basketball court, swimming pool (Olympic-standard)",
    auditorium: "800-seat AC auditorium with AV systems",
    transport: "GPS-enabled school buses covering major Noida/Delhi NCR routes",
    canteen: "Hygienic, nutritionist-approved meals",
    medical: "On-campus medical room with trained first-aid staff",
    security: "CCTV-monitored campus, biometric entry, trained security personnel",
    wifi: "High-speed Wi-Fi across campus",
    art: "Dedicated Art and Music rooms",
  },

  events: {
    upcoming: [
      "Annual Science Fair – March 15, 2025",
      "Sports Day 2025 – March 22, 2025",
      "Parent-Teacher Meeting – April 5, 2025",
      "Cultural Fest 'Utsav' – April 18, 2025",
    ],
    annual: ["Annual Sports Day (October)", "Annual Prize Distribution (March)", "Cultural Fest 'Utsav' (November)", "Science Exhibition (September)"],
    ptm: "Quarterly – April, September, November, February",
  },

  transport: {
    available: "Yes, school bus service is available",
    features: "GPS-tracked, CCTV-fitted buses with trained drivers and female attendants",
    coverage: "Covers Noida Sectors 12, 15, 18, 21, 44, 50, 62, 63, 76 and Greater Noida",
    contact: "Transport Office: +91 98765 43211",
    timing: "Morning pickup starts at 7:00 AM; afternoon drop by 3:30 PM",
  },

  fees: {
    payment: "Quarterly (April, July, October, January)",
    modes: "Online (Parent Portal), NEFT/RTGS, Cheque, Demand Draft",
    lateFee: "₹50 per day after due date",
    scholarship: "Merit-based scholarships up to 100% fee waiver available",
    sibling: "10% discount for siblings",
  },

  parentPortal: {
    access: "Available at the Parent Portal section of the website",
    features: ["Real-time attendance tracking", "Academic marks and grades", "Fee payment history and online payment", "Notifications and circulars", "Homework updates", "Teacher communication"],
    login: "Use your Parent/Student ID (e.g., GWA2025001) and registered password",
    support: "For portal login issues, email: support@greenwoodacademy.edu",
  },

  uniform: {
    summer: "White shirt, grey trousers/skirt, black shoes, grey socks – April to October",
    winter: "Grey blazer with school crest, white shirt, grey trousers/skirt, black shoes – November to March",
    pe: "School PE kit (available at the school store)",
    purchase: "Uniforms available at the school store (Gate 2)",
  },

  contact: {
    address: "123 Knowledge Park, Sector 18, Noida, UP 201301",
    phone: "+91 98765 43210",
    helpline: "+91 98765 43211",
    email: "admissions@greenwoodacademy.edu",
    principal_email: "principal@greenwoodacademy.edu",
    timings: "Monday–Saturday, 8:00 AM – 4:00 PM",
    visitTip: "For campus visits, please call ahead and book an appointment.",
  },

  faq: {
    "holidays": "The academic calendar includes Diwali (Nov), Dussehra (Oct), Summer vacation (May-June), and all national holidays.",
    "result board class 10": "Greenwood currently offers up to Class VIII. For Class IX–XII, we have affiliated school partners.",
    "school bag": "Students of Class I–III carry books for 4 subjects daily. Class IV and above follow a timetable-based system.",
    "canteen food": "Our canteen serves vegetarian and egg-based snacks. Outside food is allowed in the lunch box.",
    "mobile phones": "Mobile phones are not allowed for students in school premises.",
    "special needs": "We offer support for students with learning differences. Please contact the counselor for details.",
  },
};

// -------------------------------------------------------
// INTENT PATTERNS — maps user phrases to KB topics
// -------------------------------------------------------
const INTENTS = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "namaste", "greetings"],
    type: "greeting",
  },
  // Goodbye
  {
    patterns: ["bye", "goodbye", "see you", "thanks bye", "thank you bye", "ok thanks", "alright thanks", "that's all"],
    type: "farewell",
  },
  // Thank you
  {
    patterns: ["thank you", "thanks", "thankyou", "thx", "ty"],
    type: "thanks",
  },
  // About school
  {
    patterns: ["about school", "about greenwood", "tell me about", "what is greenwood", "school info", "school history", "founded", "established", "founder", "who started", "when was", "affiliation", "cbse affiliation"],
    type: "about",
  },
  // Admissions
  {
    patterns: ["admission", "apply", "application", "how to enroll", "enroll", "enrollment", "join", "seat", "registration", "how to register", "new student", "open", "last date", "deadline", "when can i apply"],
    type: "admissions",
  },
  // Fee
  {
    patterns: ["fee", "fees", "cost", "price", "charges", "tuition", "how much", "payment", "fee structure", "monthly fee", "annual fee", "admission fee"],
    type: "fees",
  },
  // Academics / classes / subjects
  {
    patterns: ["class", "classes", "subjects", "syllabus", "curriculum", "academics", "education", "course", "which class", "nursery", "lkg", "ukg", "class 1", "class 2", "class 3", "class 4", "class 5", "class 6", "class 7", "class 8", "primary", "junior"],
    type: "academics",
  },
  // Exam
  {
    patterns: ["exam", "examination", "test", "unit test", "half yearly", "annual exam", "board", "schedule", "timetable", "when is exam"],
    type: "exams",
  },
  // Faculty / teachers
  {
    patterns: ["teacher", "teachers", "faculty", "staff", "principal", "headmaster", "who teaches", "professor", "educator"],
    type: "faculty",
  },
  // Facilities
  {
    patterns: ["facility", "facilities", "lab", "library", "pool", "swimming", "auditorium", "sports", "playground", "canteen", "campus", "infrastructure", "computer lab", "science lab"],
    type: "facilities",
  },
  // Transport
  {
    patterns: ["bus", "transport", "vehicle", "pickup", "drop", "conveyance", "route", "school bus", "transportation"],
    type: "transport",
  },
  // Events
  {
    patterns: ["event", "events", "upcoming", "function", "fest", "utsav", "sports day", "science fair", "annual day", "cultural"],
    type: "events",
  },
  // Parent Portal
  {
    patterns: ["parent portal", "portal", "parent login", "login", "dashboard", "attendance online", "online result", "parent app"],
    type: "parentPortal",
  },
  // Uniform
  {
    patterns: ["uniform", "dress", "dress code", "school dress", "clothes", "what to wear"],
    type: "uniform",
  },
  // Contact
  {
    patterns: ["contact", "address", "location", "where is", "phone number", "email", "how to reach", "office", "call", "visit"],
    type: "contact",
  },
  // Scholarship
  {
    patterns: ["scholarship", "discount", "concession", "free", "merit", "waiver", "sibling discount"],
    type: "scholarship",
  },
  // Timing / Hours
  {
    patterns: ["timing", "timings", "time", "hours", "when does school", "school start", "school end", "open time", "close time"],
    type: "timings",
  },
  // Result
  {
    patterns: ["result", "marks", "grade", "report card", "report", "progress"],
    type: "results",
  },
  // Help / what can you do
  {
    patterns: ["help", "what can you do", "what do you know", "options", "menu", "topics", "what can i ask", "how to use"],
    type: "help",
  },
];

// -------------------------------------------------------
// RESPONSE BUILDER
// -------------------------------------------------------
function buildResponse(type) {
  const s = KB.school;
  const a = KB.admissions;
  const ac = KB.academics;
  const f = KB.facilities;

  const responses = {
    greeting: [
      `👋 Hello! Welcome to **${s.name}** Virtual Assistant!\n\nI can help you with admissions, fee structure, academics, facilities, faculty, transport, and more.\n\nHow can I assist you today?`,
      `🌿 Namaste! I'm the **${s.name}** chatbot.\n\nAsk me anything about admissions, academics, fees, faculty, or school facilities. I'm here to help! 😊`,
      `Hello there! 👋 Great to have you here.\n\n**${s.name}** has been a center of excellence since ${s.founded}. I'm here to answer all your questions. What would you like to know?`,
    ],

    farewell: [
      `Thank you for chatting with us! 🌟 If you have more questions later, feel free to come back anytime. Have a wonderful day! 🙏`,
      `Goodbye! 👋 We hope to welcome your child to the **${s.name}** family soon. Don't hesitate to reach out at ${s.phone}.`,
      `Take care! For any further queries, contact us at 📧 ${s.email} or 📞 ${s.phone}. Have a great day! 🌿`,
    ],

    thanks: [
      `You're welcome! 😊 Is there anything else I can help you with?`,
      `Happy to help! 🌟 Feel free to ask if you have more questions about **${s.name}**.`,
      `Glad I could assist! Do reach out at ${s.phone} if you need to speak with our team directly.`,
    ],

    about: `🏫 **About Greenwood Academy**\n\n📍 Located at ${s.location}\n🎓 Affiliated: ${s.affiliation}\n👨‍💼 Founded by: ${s.founder} in ${s.founded}\n👩‍💼 Principal: ${s.principal}\n\n**At a Glance:**\n• ${s.students} Students Enrolled\n• ${s.teachers} Expert Teachers\n• ${s.years} Years of Excellence\n• ${s.awards} Awards Won\n• ${s.campus}\n• ${s.iso}\n\nGreenwood Academy is one of Noida's most reputed CBSE institutions, committed to holistic education and academic excellence.`,

    admissions: `📋 **Admissions ${a.session} — ${a.status}**\n\n🎯 Classes Available: ${a.classes}\n⏰ Last Date to Apply: **${a.lastDate}**\n📝 Entrance Tests: ${a.testDates}\n📊 Results: ${a.resultDate}\n💳 Fee Deadline: ${a.feeDeadline}\n\n**Admission Steps:**\n${a.process.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**Documents Needed:**\n${a.documents.map(d => `• ${d}`).join("\n")}\n\n📞 Contact: ${a.contact}\n\n➡️ Click **Admissions** in the menu to apply online!`,

    fees: `💰 **Fee Structure ${a.session}**\n\n| Class | Admission | Monthly | Annual |\n|-------|-----------|---------|--------|\n${Object.entries(a.fees).map(([cls, f]) => `| ${cls} | ${f.admission} | ${f.monthly} | ${f.annual} |`).join("\n")}\n\n**Payment Info:**\n• Payment is quarterly (April, July, October, January)\n• Modes: Online Portal, NEFT/RTGS, Cheque, DD\n• Late fee: ₹50/day after due date\n• 🎓 Scholarships available — up to 100% fee waiver!\n• 👫 10% sibling discount applicable\n\n📞 For fee queries: ${s.phone}`,

    academics: `📚 **Academics at ${s.name}**\n\n🎓 Board: ${ac.board}\n📖 Classes: ${ac.classes}\n🏫 ${ac.classrooms}\n\n**Subjects Offered:**\n• **Nursery–UKG:** ${ac.subjects["Nursery–UKG"]}\n• **Class I–III:** ${ac.subjects["Class I–III"]}\n• **Class IV–V:** ${ac.subjects["Class IV–V"]}\n• **Class VI–VIII:** ${ac.subjects["Class VI–VIII"]}\n\n🌟 **Special Programs:**\n${ac.specialPrograms}\n\n📄 Syllabus download available on the Academics page.`,

    exams: `📋 **Examination System**\n\nGreenwood follows a **continuous and comprehensive evaluation** system:\n\n• **Unit Tests** – Conducted twice per term\n• **Half-Yearly Exams** – September\n• **Annual Exams** – February–March\n• **Pre-Board** (Class VIII) – January\n\n**Results are declared quarterly** — 4 report cards per year.\n\n📅 For the current exam schedule, visit the **Student Corner** section on the website.\n\nFor exam-related queries: 📞 ${s.phone}`,

    faculty: `👩‍🏫 **Our Distinguished Faculty**\n\n• ${KB.faculty.total}\n• Student-Teacher Ratio: **${KB.faculty.ratio}**\n• Qualifications from IITs, NITs, JNU, Delhi University & more\n\n**Notable Faculty:**\n${KB.faculty.notable.map(n => `• ${n}`).join("\n")}\n\n**Departments:**\n${KB.faculty.departments.map(d => `• ${d}`).join("\n")}\n\n🧑‍💼 School Counselor: ${KB.faculty.counselor}\n\nVisit the **Faculty & Staff** page to see complete profiles!`,

    facilities: `🏗️ **World-Class Facilities**\n\n🔬 **Labs:** ${f.labs}\n📚 **Library:** ${f.library}\n⚽ **Sports:** ${f.sports}\n🎭 **Auditorium:** ${f.auditorium}\n🚌 **Transport:** ${f.transport}\n🍽️ **Canteen:** ${f.canteen}\n🏥 **Medical:** ${f.medical}\n🛡️ **Security:** ${f.security}\n📶 **Connectivity:** ${f.wifi}\n🎨 **Creative:** ${f.art}\n\nAll facilities are regularly maintained and upgraded to international standards.`,

    transport: `🚌 **School Transport Service**\n\n✅ **Available:** ${KB.transport.available}\n🛡️ **Features:** ${KB.transport.features}\n🗺️ **Coverage:** ${KB.transport.coverage}\n⏰ **Timings:** ${KB.transport.timing}\n\n📞 Transport Office: ${KB.transport.contact}\n\nFor route-specific queries, please call the transport office directly.`,

    events: `🎉 **Upcoming Events**\n\n${KB.events.upcoming.map(e => `• 📅 ${e}`).join("\n")}\n\n**Annual Events:**\n${KB.events.annual.map(e => `• ${e}`).join("\n")}\n\n📋 **Parent-Teacher Meetings:** ${KB.events.ptm}\n\nFor the full events calendar, visit the **News & Notices** page!`,

    parentPortal: `📱 **Parent Portal**\n\n**How to access:** Go to the **Parent Portal** tab on the website.\n**Login:** Use your Parent/Student ID (e.g., GWA2025001) and password.\n\n**Features:**\n${KB.parentPortal.features.map(f => `✅ ${f}`).join("\n")}\n\n🔑 **First-time login?** Your ID and default password are shared at the time of admission.\n\n📧 Support: ${KB.parentPortal.support}`,

    uniform: `👕 **School Uniform**\n\n☀️ **Summer (April–October):**\n${KB.uniform.summer}\n\n❄️ **Winter (November–March):**\n${KB.uniform.winter}\n\n🏃 **PE Uniform:**\n${KB.uniform.pe}\n\n🛍️ **Where to buy:** ${KB.uniform.purchase}`,

    contact: `📞 **Contact Greenwood Academy**\n\n📍 **Address:** ${KB.contact.address}\n📞 **Phone:** ${KB.contact.phone}\n☎️ **Helpline:** ${KB.contact.helpline}\n✉️ **Email:** ${KB.contact.email}\n👩‍💼 **Principal's Email:** ${KB.contact.principal_email}\n🕐 **Office Hours:** ${KB.contact.timings}\n\n💡 *${KB.contact.visitTip}*\n\nYou can also use the **Contact** page on our website to send a message directly!`,

    scholarship: `🎓 **Scholarships & Discounts**\n\n✨ **Merit Scholarship:** Up to **100% fee waiver** for academically outstanding students\n🏅 **Sports Scholarship:** For district/state-level sports achievers\n🎨 **Arts Scholarship:** For exceptionally talented students in music, dance, or visual arts\n👫 **Sibling Discount:** 10% fee reduction for siblings\n\n📋 **Eligibility:** Based on entrance assessment results and previous academic records.\n\n📞 For scholarship details: ${s.phone}\n✉️ ${s.email}`,

    timings: `🕐 **School Timings**\n\n📚 **Academic Hours:**\n• **Pre-Primary (Nursery–UKG):** 8:00 AM – 12:30 PM\n• **Primary & Middle (Class I–VIII):** 8:00 AM – 2:30 PM\n\n🏢 **Office Hours:**\n• Monday – Saturday: 8:00 AM – 4:00 PM\n• Sunday: Closed\n\n🚌 **Bus Timings:**\n• Morning pickup: Starts 7:00 AM\n• Afternoon drop: By 3:30 PM\n\n📅 School operates Monday–Saturday. The school observes all national holidays plus CBSE prescribed holidays.`,

    results: `📊 **Results & Reports**\n\n Greenwood provides **4 report cards per year** — after each Unit Test, Half-Yearly, and Annual Exam.\n\n**How to check results:**\n• 🖥️ Login to the **Parent Portal** on the website\n• Enter your Student Roll Number and Date of Birth\n• View and download marks/grade cards\n\n📅 **Previous results** (last 2 sessions) are also available for download.\n\n📞 For any discrepancy: ${s.phone}\n📧 ${s.email}`,

    help: `🤖 **How can I help you?**\n\nHere's what you can ask me about:\n\n🏫 **School Info** — History, founder, affiliation, stats\n📋 **Admissions** — Process, dates, documents, eligibility\n💰 **Fee Structure** — Class-wise fees, payment modes, scholarships\n📚 **Academics** — Classes, subjects, curriculum, exams\n👩‍🏫 **Faculty** — Teachers, qualifications, departments\n🏗️ **Facilities** — Labs, library, sports, transport\n📅 **Events** — Upcoming events, PTM schedule\n📱 **Parent Portal** — Login help, features\n👕 **Uniform** — Dress code details\n📞 **Contact** — Address, phone, email, office hours\n\nJust type your question naturally — I'll do my best to answer! 😊`,
  };

  const r = responses[type];
  if (Array.isArray(r)) return r[Math.floor(Math.random() * r.length)];
  return r || null;
}

// -------------------------------------------------------
// MAIN CHATBOT FUNCTION — exported for use in component
// -------------------------------------------------------
export function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  // Check each intent
  for (const intent of INTENTS) {
    for (const pattern of intent.patterns) {
      if (msg.includes(pattern)) {
        const response = buildResponse(intent.type);
        if (response) return response;
      }
    }
  }

  // Keyword fallback — pick out individual important words
  const keywords = {
    "fee": "fees",
    "cost": "fees",
    "pay": "fees",
    "school": "about",
    "class": "academics",
    "exam": "exams",
    "result": "results",
    "admit": "admissions",
    "apply": "admissions",
    "teacher": "faculty",
    "transport": "transport",
    "bus": "transport",
    "library": "facilities",
    "lab": "facilities",
    "portal": "parentPortal",
    "login": "parentPortal",
    "contact": "contact",
    "uniform": "uniform",
    "timing": "timings",
    "time": "timings",
    "event": "events",
  };

  for (const [kw, type] of Object.entries(keywords)) {
    if (msg.includes(kw)) {
      const response = buildResponse(type);
      if (response) return response;
    }
  }

  // Default response — helpful fallback
  return `🤔 I'm not sure I understood that. Here are some things I can help with:\n\n• Type **"admissions"** for enrollment info\n• Type **"fees"** for fee structure\n• Type **"academics"** for class & subject info\n• Type **"contact"** to reach us\n• Type **"help"** to see all topics\n\nOr call us directly: **${KB.school.phone}**`;
}

// -------------------------------------------------------
// SUGGESTED QUICK REPLIES
// -------------------------------------------------------
export const QUICK_REPLIES = [
  "Admissions 2025-26",
  "Fee Structure",
  "Classes Offered",
  "School Timings",
  "Transport Info",
  "Contact Details",
  "Scholarships",
  "Facilities",
];
