import { useState, useEffect, useRef } from "react";
import { useGoogleSheet, transformExamRow, transformNoticeRow, transformEventRow, transformHomeworkRow } from "./useGoogleSheet.js";
import SheetStatusBar from "./components/SheetStatusBar.jsx";

// ============================================================
// CONSTANTS & DATA
// ============================================================
const SCHOOL_NAME = "K.B KINDERGARTEN PUBLIC SCHOOL";
const SCHOOL_EMAIL = "kbkps@gmail.com";
const SCHOOL_PHONE = "+91 98765 43210";
const SCHOOL_ADDRESS = "Durganagar dibulganj anpara sonbhadra Uttarpradesh";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "academics", label: "Academics" },
  { id: "faculty", label: "Faculty" },
  { id: "admissions", label: "Admissions" },
  { id: "news", label: "News" },
  { id: "gallery", label: "Gallery" },
  { id: "student", label: "Student Corner" },
  // { id: "parent", label: "Parent Portal" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { label: "Comprehensive Curriculum", value: "800", suffix: "+" },
  { label: "Dedicated Faculty Members", value: "30", suffix: "+" },
  { label: "Years of Academic Excellence", value: "20", suffix: "+" },
  { label: "Holistic Student Development", value: "200", suffix: "+" },
];

//here is second part of first page
const WHY_CHOOSE = [
  {
    icon: "🎓",
    title: "CBSE Curriculum",
    desc: "Fully aligned with the latest CBSE guidelines ensuring comprehensive education."
  },
  {
    icon: "💻",
    title: "Computer Lab",
    desc: "Dedicated computer lab providing practical exposure to basic computing and digital skills."
  },
  {
    icon: "🏆",
    title: "Strong Academic Results",
    desc: "Consistent academic performance with a focus on conceptual clarity."
  },
  {
    icon: "🎨",
    title: "Holistic Development",
    desc: "Sports, arts, and co-curricular activities supporting overall student growth."
  },
  {
    icon: "🛡️",
    title: "Safe Campus",
    desc: "Secure campus environment with disciplined supervision."
  },
  {
    icon: "📚",
    title: "Supportive Learning Environment",
    desc: "Dedicated teachers committed to student success and personal attention."
  },
];

const EVENTS = [
  { date: "Mar 15", month: "2025", title: "Annual Science Fair", category: "Academic", desc: "Students showcase innovative projects in physics, chemistry, and biology." },
  { date: "Mar 22", month: "2025", title: "Sports Day 2025", category: "Sports", desc: "Inter-house competitions in athletics, team sports and individual events." },
  { date: "Apr 05", month: "2025", title: "Parent-Teacher Meet", category: "Meeting", desc: "Quarterly progress review and open interaction between parents and teachers." },
  { date: "Apr 18", month: "2025", title: "Cultural Fest 'Utsav'", category: "Cultural", desc: "A celebration of art, dance, music, and drama by talented students." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Parent of Class 7 Student", text: "Greenwood Academy has transformed my daughter. The teachers here genuinely care about each child's growth. The school's focus on both academics and extracurriculars is exactly what we were looking for." },
  { name: "Rahul Mehta", role: "Alumni, Batch 2018", text: "My five years at Greenwood were the best of my life. The foundation I received here helped me secure admission to IIT Delhi. The faculty's dedication is unmatched." },
  { name: "Sunita Agarwal", role: "Parent of Twins in Class 4 & 6", text: "Both my children are thriving here. The individual attention given to each student is remarkable. The school's communication with parents is excellent and very transparent." },
  { name: "Arjun Kapoor", role: "Class 10 Student", text: "The smart classrooms and lab facilities make learning so much more exciting. Our teachers make even difficult subjects interesting. I love being a Greenwood student!" },
];

const FACULTY = [
  { name: "Dr. Meera Joshi", subject: "Mathematics", qualification: "Ph.D. Mathematics, IIT Bombay", dept: "Science & Math", exp: "18 yrs", initials: "MJ", color: "bg-emerald-500" },
  { name: "Prof. Suresh Kumar", subject: "Physics", qualification: "M.Sc. Physics, Delhi University", dept: "Science & Math", exp: "14 yrs", initials: "SK", color: "bg-blue-500" },
  { name: "Mrs. Anita Singh", subject: "English Literature", qualification: "M.A. English, JNU", dept: "Languages", exp: "12 yrs", initials: "AS", color: "bg-purple-500" },
  { name: "Mr. Rajesh Gupta", subject: "Social Science", qualification: "M.A. History, BHU", dept: "Social Sciences", exp: "16 yrs", initials: "RG", color: "bg-amber-500" },
  { name: "Ms. Kavya Nair", subject: "Computer Science", qualification: "B.Tech CSE, NIT Trichy", dept: "Technology", exp: "8 yrs", initials: "KN", color: "bg-rose-500" },
  { name: "Dr. Amit Verma", subject: "Chemistry", qualification: "Ph.D. Chemistry, BITS Pilani", dept: "Science & Math", exp: "20 yrs", initials: "AV", color: "bg-teal-500" },
  { name: "Mrs. Pooja Reddy", subject: "Hindi", qualification: "M.A. Hindi, Osmania University", dept: "Languages", exp: "10 yrs", initials: "PR", color: "bg-orange-500" },
  { name: "Mr. Vikram Rao", subject: "Physical Education", qualification: "B.P.Ed, SAI Campus", dept: "Sports", exp: "15 yrs", initials: "VR", color: "bg-cyan-500" },
  { name: "Ms. Deepa Thomas", subject: "Biology", qualification: "M.Sc. Botany, Madras University", dept: "Science & Math", exp: "11 yrs", initials: "DT", color: "bg-lime-500" },
  { name: "Mr. Arun Sharma", subject: "Music & Arts", qualification: "Diploma in Fine Arts, BFA", dept: "Arts", exp: "9 yrs", initials: "ARS", color: "bg-pink-500" },
  { name: "Mrs. Rekha Pillai", subject: "Geography", qualification: "M.A. Geography, Kerala University", dept: "Social Sciences", exp: "13 yrs", initials: "RP", color: "bg-indigo-500" },
  { name: "Mr. Sanjay Bose", subject: "Economics", qualification: "M.A. Economics, Calcutta University", dept: "Social Sciences", exp: "17 yrs", initials: "SB", color: "bg-violet-500" },
];

const CLASSES = [
  { name: "Nursery", subjects: ["English", "Hindi", "Maths", "EVS", "Art & Craft", "Music", "Physical Activity"] },
  { name: "LKG", subjects: ["English", "Hindi", "Maths", "EVS", "Art & Craft", "Music", "Rhymes"] },
  { name: "UKG", subjects: ["English", "Hindi", "Maths", "EVS", "Art & Craft", "General Knowledge"] },
  { name: "Class I", subjects: ["English", "Hindi", "Mathematics", "EVS", "Computer Basics", "Art", "PE"] },
  { name: "Class II", subjects: ["English", "Hindi", "Mathematics", "EVS", "Computer", "Art", "Moral Science"] },
  { name: "Class III", subjects: ["English", "Hindi", "Mathematics", "EVS", "Computer", "GK", "Drawing"] },
  { name: "Class IV", subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer", "GK"] },
  { name: "Class V", subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer", "Sanskrit"] },
  { name: "Class VI", subjects: ["English", "Hindi", "Mathematics", "Science", "History", "Geography", "Civics", "Computer", "Sanskrit"] },
  { name: "Class VII", subjects: ["English", "Hindi", "Mathematics", "Science", "History", "Geography", "Civics", "Computer", "Sanskrit"] },
  { name: "Class VIII", subjects: ["English", "Hindi", "Mathematics", "Science", "History", "Geography", "Civics", "Computer", "Sanskrit", "Moral Education"] },
];

const NOTICES = [
  { id: 1, title: "Admission Open for Session 2025-26", category: "Admission", date: "Feb 20, 2025", urgent: true, content: "Applications are now being accepted for all classes from Nursery to Class VIII for the academic year 2025-26. Last date to apply is March 31, 2025. Visit our admissions page or office." },
  { id: 2, title: "Annual Prize Distribution Ceremony", category: "Event", date: "Feb 15, 2025", urgent: false, content: "The Annual Prize Distribution Ceremony will be held on February 28, 2025, at 10:00 AM in the school auditorium. Parents of award recipients are cordially invited." },
  { id: 3, title: "Winter Vacation Schedule", category: "Academic", date: "Feb 10, 2025", urgent: false, content: "The school will remain closed from December 25 to January 5. Classes will resume on January 6. Holiday homework has been posted on the student portal." },
  { id: 4, title: "CBSE Board Exam Timetable Released", category: "Exam", date: "Feb 05, 2025", urgent: true, content: "CBSE has released the board examination timetable for Classes X and XII. Students can download the timetable from the CBSE website or check the notice board." },
  { id: 5, title: "New Library Books Arrival", category: "Facility", date: "Jan 28, 2025", urgent: false, content: "Over 500 new books have been added to the school library including NCERT supplementary materials, reference books, and fiction for recreational reading." },
  { id: 6, title: "Parent-Teacher Meeting Schedule", category: "Meeting", date: "Jan 20, 2025", urgent: false, content: "Quarterly PTM is scheduled for February 8, 2025 from 9 AM to 1 PM. Class-wise schedule is as follows: Classes I-IV: 9-10:30 AM, Classes V-VIII: 11 AM-1 PM." },
];

const GALLERY_ITEMS = [
  { id: 1, type: "image", category: "Sports", title: "Annual Sports Day", image: "/images/sports-day.jpg", emoji: "🏃" },
  { id: 2, type: "image", category: "Cultural", title: "Cultural Fest Utsav", image: "/images/sports-day.jpg", emoji: "🎭" },
  { id: 3, type: "image", category: "Academic", title: "Science Exhibition", image: "/images/sports-day.jpg", emoji: "🔬" },
  { id: 4, type: "image", category: "Sports", title: "Cricket Tournament", image: "/images/sports-day.jpg", emoji: "🏏" },
  { id: 5, type: "image", category: "Cultural", title: "Independence Day", image: "/images/sports-day.jpg", emoji: "🇮🇳" },
  { id: 6, type: "image", category: "Academic", title: "Math Olympiad", image: "/images/sports-day.jpg", emoji: "🏆" },
  { id: 7, type: "image", category: "Cultural", title: "Dance Performance",image: "/images/sports-day.jpg", emoji: "💃" },
  { id: 8, type: "image", category: "Sports", title: "Basketball Finals", image: "/images/sports-day.jpg", emoji: "🏀" },
  { id: 9, type: "image", category: "Academic", title: "Robotics Workshop", image: "/images/sports-day.jpg", emoji: "🤖" },
];

const HOMEWORK = [
  { class: "Class VIII", subject: "Mathematics", title: "Chapter 12: Exponents & Powers", due: "Mar 18", status: "Pending" },
  { class: "Class VIII", subject: "English", title: "Essay Writing: My Favourite Season", due: "Mar 19", status: "Pending" },
  { class: "Class VII", subject: "Science", title: "Draw and label plant cell diagram", due: "Mar 17", status: "Due Today" },
  { class: "Class VI", subject: "Social Studies", title: "Map work - Rivers of India", due: "Mar 20", status: "Pending" },
  { class: "Class V", subject: "Hindi", title: "निबंध लेखन - मेरा विद्यालय", due: "Mar 18", status: "Pending" },
];

const EXAM_SCHEDULE = [
  { date: "Mar 15", day: "Mon", subject: "Mathematics", class: "All Classes", time: "9:00-11:30 AM" },
  { date: "Mar 17", day: "Wed", subject: "English", class: "All Classes", time: "9:00-11:30 AM" },
  { date: "Mar 19", day: "Fri", subject: "Science", class: "VI - VIII", time: "9:00-11:30 AM" },
  { date: "Mar 21", day: "Sun", subject: "Social Studies", class: "VI - VIII", time: "9:00-11:30 AM" },
  { date: "Mar 24", day: "Wed", subject: "Hindi", class: "All Classes", time: "9:00-11:30 AM" },
  { date: "Mar 26", day: "Fri", subject: "Computer Science", class: "IV - VIII", time: "9:00-10:30 AM" },
];

const FAQS = [
  { q: "What are the school timings?", a: "School hours are Monday to Saturday, 8:00 AM to 2:30 PM. Pre-primary classes end at 12:30 PM." },
  { q: "Is transportation facility available?", a: "Yes, we provide GPS-enabled school bus service covering major routes in the city. Contact the transport office for route details." },
  { q: "What is the student-teacher ratio?", a: "We maintain a 20:1 student-to-teacher ratio to ensure individual attention for every child." },
  { q: "Are there any scholarships available?", a: "Yes, merit-based scholarships up to 100% fee waiver are available for academically outstanding students. Sports and arts scholarships are also offered." },
  { q: "How can I track my child's progress?", a: "Parents can access the Parent Portal for real-time attendance, academic performance, and fee status. Regular PTMs are also conducted." },
];
// ============================================================
// UTILITY COMPONENTS
// ============================================================

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useIntersection(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return isVisible;
}

function StatCard({ label, value, suffix }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const count = useCountUp(value, 1800, visible);
  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-5xl font-bold text-emerald-400 font-serif">
        {count}{suffix}
      </div>
      <div className="text-slate-300 mt-2 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ============================================================
// NAVIGATION
// ============================================================
function Navbar({ activePage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/98 shadow-lg shadow-black/20 py-2" : "bg-slate-900/90 py-3"} backdrop-blur-md border-b border-slate-700/50`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button onClick={() => { setPage("home"); setMenuOpen(false); }} className="flex items-center gap-3 group">
          {/*<div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">lo</div>*/}
          <div className="text-left hidden sm:block">
            <div className="text-white font-bold text-lg leading-tight font-serif">SCHOOL_</div>
            <div className="text-emerald-400 text-xs tracking-widest uppercase">NAME</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button key={link.id} onClick={() => setPage(link.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activePage === link.id ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""} mb-1.5`}></div>
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""} mb-1.5`}></div>
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700 px-4 py-3 grid grid-cols-2 gap-1">
          {NAV_LINKS.map(link => (
            <button key={link.id} onClick={() => { setPage(link.id); setMenuOpen(false); }}
              className={`px-3 py-2 rounded-md text-sm text-left transition-all ${activePage === link.id ? "bg-emerald-500/20 text-emerald-400" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ setPage }) {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">G</div>
            <div>
              <div className="text-white font-bold font-serif text-lg">K.B KINDERGARTEN PUBLIC SCHOOL</div>
              {/*<div className="text-emerald-400 text-xs tracking-widest">Excellence in Education</div>*/}
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed"> building futures since 2005. CBSE affiliated school committed to holistic education.</p>
          <div className="flex gap-3 mt-4">
            {["f", "t", "in", "▶"].map((s, i) => (
              <div key={i} className="w-8 h-8 bg-slate-700 hover:bg-emerald-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white text-xs cursor-pointer transition-colors">{s}</div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <div className="space-y-2">
            {[["home","Home"],["about","About Us"],["academics","Academics"],["admissions","Admissions"],["faculty","Faculty"],["contact","Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => setPage(id)} className="block text-slate-400 hover:text-emerald-400 text-sm transition-colors">{label}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Academics</h4>
          <div className="space-y-2 text-slate-400 text-sm">
            {["Nursery - UKG","Classes I - V","Classes VI - VIII","CBSE Curriculum","Exam Schedule","Academic Calendar"].map(item => (
              <div key={item} className="hover:text-emerald-400 cursor-pointer transition-colors">{item}</div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h4>
          <div className="space-y-3 text-slate-400 text-sm">
            <div className="flex gap-2">
              <span className="text-emerald-400">📍</span>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL_ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{SCHOOL_ADDRESS}</a>
            </div>

            <div className="flex gap-2">
              <span className="text-emerald-400">📞</span>
              <a
                  href={`tel:${SCHOOL_PHONE}`}
                  className="hover:underline"
              >
                {SCHOOL_PHONE}
              </a>
            </div>

            <div className="flex gap-2">
              <span className="text-emerald-400">📧</span>
              <a
                  href={`mailto:${SCHOOL_EMAIL}`}
                  className="hover:underline"
              >
                {SCHOOL_EMAIL}
              </a>
            </div>

            <div className="flex gap-2">
              <span className="text-emerald-400">🕐</span>
              <span>Mon-Sat: 8:00 AM – 2:30 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-slate-500 text-sm">
        © 2025 {SCHOOL_NAME}. All rights reserved. | Affiliation No: 2130045 | School No: 55672
      </div>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // ── Live events from Google Sheets ──────────────────────
  const { data: rawEvents, source: evSource } = useGoogleSheet("EVENTS", EVENTS);
  const liveEvents = rawEvents.map((row, i) =>
    row._rowIndex ? transformEventRow(row, i) : row
  ).slice(0, 4);
  // ────────────────────────────────────────────────────────

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950"></div>
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-3xl"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Admission badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm mb-8 animate-bounce">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping inline-block"></span>
            Admissions Open for 2026-27 Session
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6">
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">K.B KINDERGARTEN</span>
            <br />
            {/*<span className="text-white font-light tracking-tight">Public School</span>*/}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">Public School</span>
          </h1>

          <p className="text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Excellence in Education.  Strong Foundations for Life. </p>
            {/*<p className="text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto mb-5 leading-relaxed font-light">*/}
            {/*   </p>*/}

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setPage("admissions")} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105 text-lg">
              Apply for Admission
            </button>
            <button onClick={() => setPage("about")} className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
              Explore Our School
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-slate-500 text-xs uppercase tracking-widest">
              <span>Scroll</span>
              <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-700">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Our Strengths</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">KG.P.S</span></h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">Where strong academics and creative growth go hand in hand..</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="group bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 rounded-2xl p-6 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="bg-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">What's Coming</div>
              <h2 className="text-4xl font-bold text-white font-serif">Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Events</span></h2>
            </div>
             {/*isko bad mai hatana hai */}
            <button onClick={() => setPage("news")} className="text-emerald-400 hover:text-emerald-300 text-sm border border-emerald-500/30 px-4 py-2 rounded-lg hover:bg-emerald-500/10 transition-all self-start md:self-auto">
              View All Events →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {liveEvents.map((ev, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all group hover:-translate-y-1">
                <div className="bg-gradient-to-br from-emerald-800/40 to-teal-900/40 p-4 border-b border-slate-700/50">
                  <div className="text-emerald-400 font-bold text-2xl">{ev.date}</div>
                  <div className="text-slate-500 text-xs">{ev.month}</div>
                </div>
                <div className="p-4">
                  <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">{ev.category}</span>
                  <h3 className="text-white font-semibold mt-2 mb-1 group-hover:text-emerald-400 transition-colors">{ev.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-950 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Voices</div>
            <h2 className="text-4xl font-bold text-white font-serif">What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Say</span></h2>
          </div>
          {/*  what people say*/}
          <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12">
            <div className="text-emerald-400 text-6xl opacity-30 absolute top-6 left-8 font-serif leading-none">"</div>
            <div className="relative z-10">
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed italic mb-8">{TESTIMONIALS[testimonialIdx].text}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {TESTIMONIALS[testimonialIdx].name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">{TESTIMONIALS[testimonialIdx].name}</div>
                  <div className="text-slate-400 text-sm">{TESTIMONIALS[testimonialIdx].role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "w-8 bg-emerald-400" : "bg-slate-600 hover:bg-slate-500"}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-900 to-teal-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">Take the First Step Towards Quality Education</h2>
          <p className="text-emerald-200 mb-8 text-lg">Admissions for the 2025-26 session are now open. Secure your child's future today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setPage("admissions")} className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg">
              Apply Now — It's Free
            </button>
            <button onClick={() => setPage("contact")} className="px-8 py-4 border-2 border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero */}
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Our Story</div>
          <h1 className="text-5xl font-bold text-white font-serif mb-4">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">School_name</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">__ years of nurturing young minds into responsible and confident individuals.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* History */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Our History</div>
              <h2 className="text-3xl font-bold text-white font-serif mb-6">20 Years of Building Excellence</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>Founded in 2005 by visionary educationist <strong className="text-emerald-400">Dr______________</strong>
                    {/*school name change */}
                    , _school_name_  began its journey with a vision to provide quality education and strong moral values to young learners. Starting with a small group of dedicated teachers and enthusiastic students, the school laid a strong foundation built on discipline, commitment, and care.</p>
                <p>Over the years, the institution has steadily grown in strength and reputation, becoming a trusted name in education within the community. Today, the school continues to focus on academic excellence while fostering confidence, creativity, and character development among students.</p>
                <p>Our philosophy remains simple and clear: every child is unique, and education should nurture individual strengths while building responsibility, knowledge, and confidence for the future.</p>
              </div>
            </div>
            <div className="space-y-3">
              {[["1997","School founded with 45 students"],["2002","CBSE affiliation granted (Aff. No. 2130045)"],["2008","New science block and computer lab inaugurated"],["2015","Smart classroom initiative launched school-wide"],["2020","Digital learning transition during pandemic"],["2024","ISO 9001:2015 certified institution"]].map(([year, event]) => (
                <div key={year} className="flex gap-4 items-start">
                  <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded text-xs font-bold min-w-[50px] text-center">{year}</div>
                  <div className="text-slate-300 text-sm pt-1">{event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Mission */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-700/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-white font-serif mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed">To be a globally recognized institution that empowers students with knowledge, values, and skills to thrive in an ever-changing world — producing leaders who are intellectually sharp, morally grounded, and socially responsible.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/20 border border-blue-700/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white font-serif mb-4">Our Mission</h3>
            <p className="text-slate-300 leading-relaxed">To provide a safe, nurturing environment where every learner is inspired to explore, question, and grow. We partner with families to cultivate excellence through evidence-based pedagogy, innovative technology, and compassionate teaching.</p>
          </div>
        </section>

        {/* Principal Message */}
        <section className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">👩‍💼</div>
              <h3 className="text-white font-bold text-xl">Mrs. principle ma'am</h3>
              <p className="text-emerald-400 text-sm">Principal, __SCHOOL</p>
              {/*<p className="text-slate-400 text-xs mt-1">M.Ed, Ph.D Education | 30+ years experience</p>*/}
            </div>
            <div className="md:col-span-2">
              <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Message from Principal</div>
              <h2 className="text-2xl font-bold text-white font-serif mb-5">Dear Students, Parents & Well-wishers</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>"Education at   ___school is not merely about academic scores — it is about shaping character, fostering curiosity, and igniting a lifelong love for learning. We believe that every child who walks through our gates carries within them an extraordinary potential waiting to bloom."</p>
                <p>"Our dedicated faculty works tirelessly to create learning experiences that are engaging, meaningful, and transformative. We are committed to preparing our students not just for examinations, but for life."</p>
                <p>"I warmly invite you to be part of the Greenwood family and experience the difference that truly caring education makes."</p>
              </div>
            </div>
          </div>
        </section>

         {/*Infrastructure*/}
        <section>
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Campus</div>
            <h2 className="text-3xl font-bold text-white font-serif">World-Class Infrastructure</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {[
                ["🏫","School Campus","Well-maintained campus providing a positive learning environment"],
                ["💻","Computer Lab","Dedicated computer lab for practical digital learning"],
                ["📚","Library Facility","Collection of academic and reference books for students"],
                ["⚽","Sports Activities","Encouraging participation in indoor and outdoor sports"],
                ["🎨","Co-Curricular Activities","Art, cultural, and activity-based learning programs"],
                ["🛡️","Safe Environment","Disciplined campus with supervised student safety"],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-all group">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">{title}</h4>
                <p className="text-slate-500 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </section>

         {/*Awards*/}
        <section>
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Recognition</div>
            <h2 className="text-3xl font-bold text-white font-serif">Awards & Accolades</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
                ["🏆","Academic Excellence Recognition","Recognized for consistent academic performance"],
                ["⭐","Community Appreciation","Acknowledged for contribution to local education"],
                ["🎖️","Excellence in Teaching Practices","Committed to quality classroom learning"],
                ["🌿","Environment Awareness Initiative","Promoting eco-friendly practices among students"],
                ["💡","Innovative Learning Approach","Encouraging creative and practical education"],
                ["🛡️","Safe Campus Commitment","Focused on student safety and discipline"],
            ].map(([icon, award, org]) => (
              <div key={award} className="flex gap-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 items-start">
                <div className="text-3xl">{icon}</div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{award}</h4>
                  <p className="text-emerald-400 text-xs mt-1">{org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// ACADEMICS PAGE
// ============================================================
function AcademicsPage() {
  const [activeClass, setActiveClass] = useState(0);
  const [openCalendar, setOpenCalendar] = useState(null);

  // here is academic calender of school

  const calendar = [
    { month: "April", events: ["School reopens (Apr 1)", "PTM - Class I-V (Apr 15)", "Admissions deadline (Apr 30)"] },
    { month: "May", events: ["Unit Test I begins (May 5)", "Summer Fest (May 20)", "Summer Vacation starts (May 25)"] },
    { month: "June-July", events: ["School reopens after summer (Jul 1)", "Independence Day preparations"] },
    { month: "August", events: ["Independence Day (Aug 15)", "Teachers Day (Aug 25 - Aug 30)", "Half-Yearly exams begin"] },
    { month: "September", events: ["Half-Yearly Results (Sep 15)", "PTM (Sep 20)", "Science Fair (Sep 28)"] },
    { month: "October", events: ["Dussehra break (Oct 2-5)", "Unit Test III (Oct 15)", "Annual Sports Day (Oct 25)"] },
    { month: "November", events: ["Annual Function 'Utsav' (Nov 8)", "Diwali break (Nov 10-14)", "Pre-board exams begin"] },
    { month: "December-March", events: ["Annual Exams (Feb-Mar)", "Prize Distribution (Mar 15)", "Session ends (Mar 31)"] },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Learning</div>
          <h1 className="text-5xl font-bold text-white font-serif mb-4">Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Excellence</span></h1>
          <p className="text-slate-400 text-lg">CBSE curriculum designed to build critical thinking, creativity, and character from Nursery to Class VIII.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Classes & Subjects */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white font-serif">Classes Offered & Subjects</h2>
          </div>
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {CLASSES.map((cls, i) => (
              <button key={i} onClick={() => setActiveClass(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeClass === i ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
                {cls.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-white font-bold text-2xl mb-2 font-serif">{CLASSES[activeClass].name}</h3>
            <p className="text-slate-400 text-sm mb-6">{CLASSES[activeClass].subjects.length} subjects in curriculum</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CLASSES[activeClass].subjects.map(sub => (
                <div key={sub} className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-200 text-sm hover:border-emerald-500/40 hover:text-emerald-300 transition-all">
                  {sub}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Calendar */}
        <section>
          <div className="text-center mb-8">
            <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Planning</div>
            <h2 className="text-3xl font-bold text-white font-serif">Academic Calendar 2025-26</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {calendar.map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-all" onClick={() => setOpenCalendar(openCalendar === i ? null : i)}>
                <div className="bg-gradient-to-r from-emerald-800/40 to-teal-800/30 px-4 py-3 flex justify-between items-center">
                  <span className="text-white font-semibold text-sm">{item.month}</span>
                  <span className="text-emerald-400 text-lg">{openCalendar === i ? "▲" : "▼"}</span>
                </div>
                {openCalendar === i && (
                  <div className="px-4 py-3 space-y-2">
                    {item.events.map(ev => (
                      <div key={ev} className="flex gap-2 items-start">
                        <span className="text-emerald-400 text-xs mt-1">•</span>
                        <span className="text-slate-300 text-xs">{ev}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Syllabus Download */}
          <section>
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white font-serif">
                      Syllabus Downloads
                  </h2>
                  <p className="text-slate-400 mt-2">
                      Download the official CBSE syllabus for each class
                  </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/*file: "/pdfs/nursery-ukg.pdf" =====> yaha pdf add akrna hoga */}
                  {[
                      { name: "Nursery - UKG", file: "/pdfs/nursery-ukg.pdf" },
                      { name: "Class I - II", file: "/pdfs/class-1-2.pdf" },
                      { name: "Class III - IV", file: "/pdfs/class-3-4.pdf" },
                      { name: "Class V", file: "/pdfs/class-5.pdf" },
                      { name: "Class VI - VII", file: "/pdfs/class-6-7.pdf" },
                      { name: "Class VIII", file: "/pdfs/class-8.pdf" },
                  ].map((cls) => (
                      <div key={cls.name} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/30 transition-all group">
                          <div className="flex gap-3 items-center">
                              <div className="w-10 h-10 bg-red-500/15 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 text-sm font-bold">PDF
                              </div>
                              <div>
                                  <div className="text-white font-medium text-sm">{cls.name} Syllabus</div>
                                  <div className="text-slate-500 text-xs">2025-26 Session</div>
                              </div>
                          </div>
                          <a href={cls.file} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-sm border border-emerald-500/30 px-3 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">⬇ Download</a>
                      </div>
                  ))}
              </div>
          </section>

        {/*/!* Timetable *!/*/}
        {/*<section>*/}
        {/*  <div className="text-center mb-8">*/}
        {/*    <h2 className="text-3xl font-bold text-white font-serif">Sample Timetable — Class VI</h2>*/}
        {/*  </div>*/}
        {/*  <div className="overflow-x-auto rounded-2xl border border-slate-700">*/}
        {/*    <table className="w-full text-sm">*/}
        {/*      <thead className="bg-slate-800">*/}
        {/*        <tr>*/}
        {/*          {["Period/Day","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(h => (*/}
        {/*            <th key={h} className="px-4 py-3 text-slate-300 font-semibold text-left border-b border-slate-700 whitespace-nowrap">{h}</th>*/}
        {/*          ))}*/}
        {/*        </tr>*/}
        {/*      </thead>*/}
        {/*      <tbody className="divide-y divide-slate-800">*/}
        {/*        {[*/}
        {/*          ["8:00-8:40","Mathematics","English","Hindi","Science","Mathematics","English"],*/}
        {/*          ["8:40-9:20","English","Mathematics","Science","History","English","Hindi"],*/}
        {/*          ["9:20-10:00","Science","Hindi","Mathematics","English","Computer","Mathematics"],*/}
        {/*          ["10:00-10:20 (Break)","—","—","—","—","—","—"],*/}
        {/*          ["10:20-11:00","History","Computer","English","Mathematics","Geography","Computer"],*/}
        {/*          ["11:00-11:40","Computer","Science","Geography","Hindi","History","PE"],*/}
        {/*          ["11:40-12:20","PE","History","Computer","Computer","Sanskrit","Art"],*/}
        {/*          ["12:20-1:00","Hindi","Geography","PE","Sanskrit","Science","Geography"],*/}
        {/*        ].map(([time, ...subjects], i) => (*/}
        {/*          <tr key={i} className={i % 2 === 0 ? "bg-slate-900/50" : "bg-slate-800/30"}>*/}
        {/*            <td className="px-4 py-2.5 text-emerald-400 font-medium whitespace-nowrap">{time}</td>*/}
        {/*            {subjects.map((sub, j) => (*/}
        {/*              <td key={j} className={`px-4 py-2.5 text-slate-300 whitespace-nowrap ${sub === "—" ? "text-slate-700 text-center" : ""}`}>{sub}</td>*/}
        {/*            ))}*/}
        {/*          </tr>*/}
        {/*        ))}*/}
        {/*      </tbody>*/}
        {/*    </table>*/}
        {/*  </div>*/}
        {/*</section>*/}

          // yaha button mai link add akrna hai
          <section className="py-20">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white font-serif">
                      Admission Process 2025–26
                  </h2>
                  <p className="text-slate-400 mt-3">
                      Follow these simple steps to complete your admission.
                  </p>
              </div>

              {/* Horizontal Timeline */}
              <div className="relative max-w-5xl mx-auto">

                  {/* Straight Connecting Line */}
                  <div className="absolute top-6 left-0 w-full h-1 bg-emerald-500/20"></div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">

                      {[
                          {
                              step: "01",
                              title: "Application Form",
                              desc: "Fill the admission form with required details."
                          },
                          {
                              step: "02",
                              title: "Document Submission",
                              desc: "Submit birth certificate and report card."
                          },
                          {
                              step: "03",
                              title: "Interaction",
                              desc: "Student interaction or basic assessment."
                          },
                          {
                              step: "04",
                              title: "Confirmation",
                              desc: "Fee payment and admission confirmation."
                          }
                      ].map((item, i) => (
                          <div key={i} className="text-center">
                              {/* Step Circle */}
                              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg hover:scale-110 transition-transform duration-300">
                                  {item.step}
                              </div>
                              {/* Title */}
                              <h3 className="text-white font-semibold mt-4">
                                  {item.title}
                              </h3>
                              {/* Description */}
                              <p className="text-slate-400 text-sm mt-2 px-2">
                                  {item.desc}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-16">
                  <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-300">
                      Apply Now
                  </button>
              </div>

          </section>
      </div>
    </div>
  );
}

// ============================================================
// FACULTY PAGE
// ============================================================
function FacultyPage() {
  const [filter, setFilter] = useState("All");
  const depts = ["All", "Science & Math", "Languages", "Social Sciences", "Technology", "Sports", "Arts"];
  const filtered = filter === "All" ? FACULTY : FACULTY.filter(f => f.dept === filter);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Our Team</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">Faculty & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Staff</span></h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">Experienced, passionate educators committed to nurturing every student's potential.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {depts.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${filter === d ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-16">
          {filtered.map((teacher, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group hover:-translate-y-1">
              <div className={`w-16 h-16 ${teacher.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {teacher.initials}
              </div>
              <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors">{teacher.name}</h3>
              <p className="text-emerald-400 text-sm font-medium mb-1">{teacher.subject}</p>
              <p className="text-slate-500 text-xs mb-3">{teacher.qualification}</p>
              <div className="flex gap-2">
                {/*<span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{teacher.dept}</span>*/}
                {/*<span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">{teacher.exp}</span>*/}
              </div>
            </div>
          ))}
        </div>

        {/* Admin Staff */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-serif">Administrative Staff</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Mr. Ramesh Agarwal", role: "finance Manager", init: "RA", color: "bg-amber-600" },
              { name: "Mrs. Deepa Verma", role: "Principal", init: "DV", color: "bg-emerald-600" },
              { name: "Mr. Sanjeev Kapoor", role: "Vice Principal", init: "SK", color: "bg-blue-600" },
              { name: "Mrs. Priya Mathur", role: "Head of Administration", init: "PM", color: "bg-purple-600" },
              { name: "Mr. Ravi Shankar", role: "Finance Manager", init: "RS", color: "bg-rose-600" },
              { name: "Ms. Neha Agarwal", role: "Admissions Coordinator", init: "NA", color: "bg-teal-600" },
              { name: "Mr. Saurabh Gupta", role: "IT Coordinator", init: "SG", color: "bg-cyan-600" },
              { name: "Mrs. Lata Saxena", role: "School Counselor", init: "LS", color: "bg-pink-600" },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 items-center bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <div className={`w-10 h-10 ${s.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{s.init}</div>
                <div>
                  <div className="text-white font-medium text-sm">{s.name}</div>
                  <div className="text-slate-400 text-xs">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// ADMISSIONS PAGE
// ============================================================
function AdmissionsPage() {
  const [form, setForm] = useState({ name: "", class: "", dob: "", parent: "", email: "", phone: "", address: "", message: "", doc: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Student name is required";
    if (!f.class) e.class = "Please select a class";
    if (!f.dob) e.dob = "Date of birth is required";
    if (!f.parent.trim()) e.parent = "Parent name is required";
    if (!f.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address";
    if (!f.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!f.address.trim()) e.address = "Address is required";
    return e;
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const handleChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    if (touched[field]) setErrors(validate(newForm));
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name:1,class:1,dob:1,parent:1,email:1,phone:1,address:1 });
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const subject = encodeURIComponent(`Admission Application - ${form.name} for ${form.class}`);
      const body = encodeURIComponent(`Student Name: ${form.name}\nClass: ${form.class}\nDOB: ${form.dob}\nParent: ${form.parent}\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}\nMessage: ${form.message}`);
      window.location.href = `mailto:${SCHOOL_EMAIL}?subject=${subject}&body=${body}`;
    }, 2000);
  };

  const resetForm = () => {
    setForm({ name:"",class:"",dob:"",parent:"",email:"",phone:"",address:"",message:"",doc:null });
    setErrors({}); setTouched({}); setSuccess(false);
  };

  const FieldError = ({ field }) => errors[field] && touched[field] ? <p className="text-red-400 text-xs mt-1">{errors[field]}</p> : null;
  const inputCls = (field) => `w-full bg-slate-700/50 border ${errors[field] && touched[field] ? "border-red-500/70 focus:border-red-400" : "border-slate-600 focus:border-emerald-500"} rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Join Us</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">Admissions <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">2026-27</span></h1>
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm mt-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping inline-block"></span>
          Applications Now Open — Limited Seats Available
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          {/* Process */}
          <section>
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Admission Process</h2>
            <div className="space-y-4">
              {["Fill Online Application Form","Submit Required Documents","Entrance Assessment (if applicable)","Interview with Principal","Fee Payment & Seat Confirmation","Welcome to school_name Family! 🎉"].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i+1}</div>
                  <div className="text-slate-300 pt-1.5 text-sm">{step}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Fee Structure */}
          <section>
            <h2 className="text-4xl font-bold text-white font-serif mb-4">Fee Structure 2025-26</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    {["Class","Admission Fee","Monthly Tuition","Annual Charge"].map(h => <th key={h} className="px-4 py-3 text-slate-300 text-left font-semibold whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[["Nursery - UKG","₹2,500","₹700","₹1,000"],["Class I - V","₹3,00","₹900","₹12,00"],["Class VI - VIII","₹4,000","₹1,000","₹1500"]].map(([cls,...fees]) => (
                    <tr key={cls} className="bg-slate-900/30 hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-emerald-400 font-medium">{cls}</td>
                      {fees.map(fee => <td key={fee} className="px-4 py-3 text-slate-300">{fee}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Documents */}
          <section>
            <h2 className="text-2xl font-bold text-white font-serif mb-4">Required Documents</h2>
            <div className="space-y-2">
              {["Birth Certificate (original + photocopy)","Aadhaar Card of child and parents","Last class Report Card / Transfer Certificate","Passport-size photographs (4 copies)","Residential proof (utility bill or rent agreement)","Immunization certificate"].map(doc => (
                <div key={doc} className="flex gap-3 items-start">
                  <span className="text-emerald-400 text-sm mt-0.5">✓</span>
                  <span className="text-slate-300 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Important Dates */}
          <section>
            <h2 className="text-2xl font-bold text-white font-serif mb-4">Important Dates</h2>
            <div className="space-y-3">
              {[["Application Opens","Mar 1, 2025"],["Last Date to Apply","Apr 31, 2025"],["Entrance Tests","Apr 5-10, 2025"],["Result Declaration","Apr 15, 2025"],["Fee Submission Deadline","Apr 25, 2025"],["Session Begins","Apr 1, 2025"]].map(([ev, date]) => (
                <div key={ev} className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300 text-sm">{ev}</span>
                  <span className="text-emerald-400 text-sm font-medium">{date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Form */}
        <div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Apply Online</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Student Name *</label>
                  <input type="text" value={form.name} onChange={e => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")} className={inputCls("name")} placeholder="Full name" />
                  <FieldError field="name" />
                </div>
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Class Applying For *</label>
                  <select value={form.class} onChange={e => handleChange("class", e.target.value)} onBlur={() => handleBlur("class")} className={inputCls("class")}>
                    <option value="" className="bg-slate-800">Select class</option>
                    {CLASSES.map(c => <option key={c.name} value={c.name} className="bg-slate-800">{c.name}</option>)}
                  </select>
                  <FieldError field="class" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Date of Birth *</label>
                  <input type="date" value={form.dob} onChange={e => handleChange("dob", e.target.value)} onBlur={() => handleBlur("dob")} className={inputCls("dob")} />
                  <FieldError field="dob" />
                </div>
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Parent/Guardian Name *</label>
                  <input type="text" value={form.parent} onChange={e => handleChange("parent", e.target.value)} onBlur={() => handleBlur("parent")} className={inputCls("parent")} placeholder="Parent's full name" />
                  <FieldError field="parent" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} className={inputCls("email")} placeholder="parent@email.com" />
                  <FieldError field="email" />
                </div>
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} className={inputCls("phone")} placeholder="10-digit mobile number" />
                  <FieldError field="phone" />
                </div>
              </div>
              <div>
                <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Residential Address *</label>
                <textarea value={form.address} onChange={e => handleChange("address", e.target.value)} onBlur={() => handleBlur("address")} className={inputCls("address") + " resize-none"} rows={2} placeholder="Full residential address" />
                <FieldError field="address" />
              </div>
              {/*<div>*/}
              {/*  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Upload Documents (UI)</label>*/}
              {/*  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">*/}
              {/*    <div className="text-slate-400 text-sm">📎 Drag & drop or <span className="text-emerald-400">browse files</span></div>*/}
              {/*    <div className="text-slate-600 text-xs mt-1">PDF, JPG, PNG up to 5MB each</div>*/}
              {/*  </div>*/}
              {/*</div>*/}


                {/*yaha abhi mail verification baki hai*/}
                <div>
                    <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">
                        Upload Documents
                    </label>

                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                            const files = e.target.files;
                            console.log(files); // yaha future me backend logic laga sakte ho
                        }}
                    />

                    <label
                        htmlFor="fileUpload"
                        className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-colors cursor-pointer block">
                        <div className="text-slate-400 text-sm">
                            📎 Drag & drop or{" "}
                            <span className="text-emerald-400">browse files</span>
                        </div>
                        <div className="text-slate-600 text-xs mt-1">
                            PDF, JPG, PNG up to 5MB each
                        </div>
                    </label>
                </div>
              <div>
                <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Additional Message</label>
                <textarea value={form.message} onChange={e => handleChange("message", e.target.value)} className={inputCls("message") + " resize-none"} rows={3} placeholder="Any additional information..." />
              </div>

              <button type="submit" disabled={!isValid || loading}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all ${isValid && !loading ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}>
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Submitting Application...
                  </span>
                ) : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 border border-emerald-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-emerald-500/10 animate-bounce-once">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white font-serif mb-3">Application Submitted!</h2>
            <p className="text-slate-300 mb-2">Thank you for applying to Greenwood Academy. We've received your application for <strong className="text-emerald-400">{form.name}</strong>.</p>
            <p className="text-slate-400 text-sm mb-8">Our admissions team will contact you at <strong className="text-white">{form.email}</strong> within 2 working days. An email confirmation has been triggered.</p>
            <button onClick={resetForm} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              Submit Another Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// NEWS PAGE
// ============================================================
function NewsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const perPage = 4;

  // ── Google Sheets live data ──────────────────────────────
  const { data: rawNotices, loading, error, lastUpdated, source, refetch } =
    useGoogleSheet("NOTICES", NOTICES);
  const notices = rawNotices.map((row, i) =>
    row._rowIndex ? transformNoticeRow(row, i) : row
  );
  // ────────────────────────────────────────────────────────

  const cats = ["All", "Admission", "Event", "Academic", "Exam", "Facility", "Meeting"];
  const filtered = notices.filter(n =>
    (category === "All" || n.category === category) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Updates</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Notices</span></h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Google Sheets Status */}
        <SheetStatusBar
          loading={loading} error={error} lastUpdated={lastUpdated}
          source={source} refetch={refetch} label="notices"
        />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            placeholder="🔍 Search notices..." />
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => { setCategory(c); setPage(1); }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${category === c ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 animate-pulse">
                <div className="flex gap-2 mb-3"><div className="h-5 w-20 bg-slate-700 rounded-full"></div><div className="h-5 w-16 bg-slate-700 rounded-full"></div></div>
                <div className="h-6 w-3/4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 w-full bg-slate-700/50 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Notices */}
        {!loading && (
          <div className="space-y-4">
            {paged.length === 0 && <div className="text-center text-slate-500 py-20">No notices found.</div>}
            {paged.map(n => (
              <div key={n.id} className={`bg-slate-800/50 border rounded-2xl overflow-hidden transition-all ${n.urgent ? "border-amber-500/30" : "border-slate-700/50"}`}>
                <div className="p-5">
                  <div className="flex flex-wrap gap-3 items-start justify-between mb-2">
                    <div className="flex gap-2 items-center">
                      {n.urgent && <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">🔔 Important</span>}
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{n.category}</span>
                    </div>
                    <span className="text-slate-500 text-xs">{n.date}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{n.title}</h3>
                  {expanded === n.id ? (
                    <div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">{n.content}</p>
                      <button onClick={() => setExpanded(null)} className="text-emerald-400 text-xs hover:text-emerald-300">▲ Show Less</button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-400 text-sm">{(n.content || "").substring(0, 100)}...</p>
                      <button onClick={() => setExpanded(n.id)} className="text-emerald-400 text-xs hover:text-emerald-300 mt-2">Read More →</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-all border border-slate-700">← Prev</button>
            {Array.from({length: totalPages}, (_, i) => (
              <button key={i} onClick={() => setPage(i+1)} className={`px-4 py-2 rounded-lg transition-all border ${page === i+1 ? "bg-emerald-500 text-white border-emerald-500" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`}>{i+1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-all border border-slate-700">Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// GALLERY PAGE
// ============================================================
function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const cats = ["All", "Sports", "Cultural", "Academic"];
  const filtered = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Memories</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Gallery</span></h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter */}
        <div className="flex gap-3 justify-center mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === c ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-12">
          {filtered.map(item => (
            <div key={item.id} onClick={() => setLightbox(item)}
              className="group aspect-square rounded-xl overflow-hidden cursor-pointer relative border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:scale-[1.02]">
              <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500`}>
                {item.emoji}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end opacity-0 group-hover:opacity-100">
                <div className="p-3 w-full">
                  <p className="text-white text-xs font-semibold">{item.title}</p>
                  <p className="text-slate-300 text-xs">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*/!* Video Section *!/*/}
        {/*<section>*/}
        {/*  <h2 className="text-2xl font-bold text-white font-serif mb-6">Video Highlights</h2>*/}
        {/*  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">*/}
        {/*    {[["Annual Sports Day 2024","from-blue-800 to-blue-600","🏃"],["Cultural Fest Utsav 2024","from-purple-800 to-pink-700","🎭"],["Science Exhibition 2024","from-green-800 to-teal-700","🔬"]].map(([title, gradient, emoji]) => (*/}
        {/*      <div key={title} className="group rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/40 transition-all cursor-pointer relative">*/}
        {/*        <div className={`bg-gradient-to-br ${gradient} aspect-video flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500`}>*/}
        {/*          {emoji}*/}
        {/*        </div>*/}
        {/*        <div className="absolute inset-0 flex items-center justify-center">*/}
        {/*          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl border-2 border-white/40 group-hover:scale-110 transition-transform">▶</div>*/}
        {/*        </div>*/}
        {/*        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">*/}
        {/*          <p className="text-white font-semibold text-sm">{title}</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className={`bg-gradient-to-br ${lightbox.color} rounded-2xl aspect-square flex items-center justify-center text-[120px] mb-4 border border-white/10`}>
              {lightbox.emoji}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-xl">{lightbox.title}</h3>
                <p className="text-slate-400 text-sm">{lightbox.category}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="text-slate-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full">×</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// STUDENT CORNER PAGE
// ============================================================
function StudentPage() {
  const [tab, setTab] = useState("homework");
  const tabs = [["homework","📚 Homework"],["exams","📋 Exam Schedule"],["results","🏆 Results"],["circulars","📄 Circulars"],["timetable","🕐 Timetable"]];

  // ── Google Sheets live data ──────────────────────────────
  const { data: rawExams, loading: exLoading, error: exError, lastUpdated: exUpdated, source: exSource, refetch: exRefetch } =
    useGoogleSheet("EXAM_SCHEDULE", EXAM_SCHEDULE);
  const exams = rawExams.map((row, i) =>
    row._rowIndex ? transformExamRow(row, i) : row
  );

  const { data: rawHomework, loading: hwLoading, error: hwError, lastUpdated: hwUpdated, source: hwSource, refetch: hwRefetch } =
    useGoogleSheet("HOMEWORK", HOMEWORK);
  const homeworkList = rawHomework.map((row, i) =>
    row._rowIndex ? transformHomeworkRow(row, i) : row
  );
  // ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">For Students</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Corner</span></h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${tab === id ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "homework" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Pending Homework</h2>
            <SheetStatusBar
              loading={hwLoading} error={hwError} lastUpdated={hwUpdated}
              source={hwSource} refetch={hwRefetch} label="homework"
            />
            {hwLoading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse"></div>)}
              </div>
            ) : (
              <div className="space-y-3">
                {homeworkList.length === 0 && <p className="text-slate-500 text-center py-10">No homework assigned right now.</p>}
                {homeworkList.map((hw, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-wrap gap-4 justify-between items-center">
                    <div>
                      <div className="flex gap-2 mb-1"><span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">{hw.class}</span><span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">{hw.subject}</span></div>
                      <h3 className="text-white font-medium">{hw.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-xs">Due: <span className="text-amber-400 font-medium">{hw.due}</span></div>
                      <div className={`text-xs font-medium mt-1 ${hw.status === "Due Today" ? "text-red-400" : "text-slate-400"}`}>{hw.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "exams" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Examinations</h2>
            <SheetStatusBar
              loading={exLoading} error={exError} lastUpdated={exUpdated}
              source={exSource} refetch={exRefetch} label="exam schedule"
            />
            {exLoading ? (
              <div className="space-y-2">
                {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-slate-800/50 border border-slate-700 rounded-lg animate-pulse"></div>)}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800">
                    <tr>{["Date","Day","Subject","Classes","Timings"].map(h => <th key={h} className="px-4 py-3 text-slate-300 font-semibold text-left whitespace-nowrap">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {exams.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No exam schedule available.</td></tr>
                    )}
                    {exams.map((ex, i) => (
                      <tr key={i} className="bg-slate-900/30 hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 text-emerald-400 font-bold">{ex.date}</td>
                        <td className="px-4 py-3 text-slate-400">{ex.day}</td>
                        <td className="px-4 py-3 text-white font-medium">{ex.subject}</td>
                        <td className="px-4 py-3 text-slate-300">{ex.class}</td>
                        <td className="px-4 py-3 text-slate-300">{ex.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "results" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Results Portal</h2>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center mb-8">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-white font-bold text-xl mb-2">Secure Results Access</h3>
              <p className="text-slate-400 mb-6">Enter your roll number and date of birth to view your results</p>
              <div className="max-w-sm mx-auto space-y-3">
                <input className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500" placeholder="Roll Number" />
                <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" />
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">View Results</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {["First Term Results 2024-25","Second Term Results 2024-25","Annual Exam Results 2023-24"].map(r => (
                <div key={r} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <p className="text-slate-300 text-sm font-medium mb-3">{r}</p>
                  <button className="text-xs text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">Download PDF</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "circulars" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Downloadable Circulars</h2>
            <div className="space-y-3">
              {[["PTM Circular - February 2025","Feb 05, 2025","Meetings"],["Annual Day Information Circular","Jan 28, 2025","Events"],["Exam Date Sheet - Term II","Jan 20, 2025","Academic"],["Holiday List 2025","Jan 01, 2025","Academic"],["Bus Route Update Circular","Dec 15, 2024","Transport"],["Winter Uniform Circular","Oct 01, 2024","General"]].map(([title, date, cat]) => (
                <div key={title} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 bg-red-500/15 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 text-xs font-bold">PDF</div>
                    <div>
                      <div className="text-white font-medium text-sm">{title}</div>
                      <div className="text-slate-500 text-xs">{date} · {cat}</div>
                    </div>
                  </div>
                  <button className="text-emerald-400 hover:text-emerald-300 text-sm border border-emerald-500/30 px-3 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">⬇</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "timetable" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Timetable</h2>
            <div className="flex gap-3 mb-6">
              {["Class VI","Class VII","Class VIII"].map(c => (
                <button key={c} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 text-sm transition-all">{c}</button>
              ))}
            </div>
            <p className="text-slate-400 text-sm mb-4">Showing timetable for Class VI (scroll right on mobile)</p>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-slate-800">
                  <tr>
                    {["Time","Mon","Tue","Wed","Thu","Fri","Sat"].map(h => <th key={h} className="px-4 py-3 text-slate-300 font-semibold text-left">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[["8:00-8:40","Math","English","Hindi","Science","Math","English"],["8:40-9:20","English","Math","Science","History","English","Hindi"],["9:20-10:00","Science","Hindi","Math","English","Computer","Math"],["10:00-10:20","— Break —","— Break —","— Break —","— Break —","— Break —","— Break —"],["10:20-11:00","History","Computer","English","Math","Geography","Computer"],["11:00-11:40","Computer","Science","Geography","Hindi","History","PE"],["11:40-1:00","PE","History","Computer","Computer","Sanskrit","Art"]].map(([time,...subjects],i) => (
                    <tr key={i} className={i%2===0?"bg-slate-900/30":"bg-slate-800/20"}>
                      <td className="px-4 py-2.5 text-emerald-400 font-medium whitespace-nowrap">{time}</td>
                      {subjects.map((s,j) => <td key={j} className={`px-4 py-2.5 whitespace-nowrap ${s.startsWith("—")?"text-slate-700 text-center":"text-slate-300"}`}>{s}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PARENT PORTAL PAGE
// ============================================================
function ParentPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ id: "", pass: "" });

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">G</div>
            <h1 className="text-3xl font-bold text-white font-serif">Parent Portal</h1>
            <p className="text-slate-400 mt-2">Sign in to access your child's information</p>
          </div>
          <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-8">
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Parent/Student ID</label>
                <input type="text" value={loginForm.id} onChange={e => setLoginForm(f => ({...f, id: e.target.value}))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. GWA2025001" />
              </div>
              <div>
                <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Password</label>
                <input type="password" value={loginForm.pass} onChange={e => setLoginForm(f => ({...f, pass: e.target.value}))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter your password" />
              </div>
              <button onClick={() => setLoggedIn(true)} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all mt-2">
                Sign In to Portal
              </button>
              <p className="text-center text-slate-500 text-xs">Demo: Click Sign In to preview the portal (UI only)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const portalTabs = [["dashboard","📊 Dashboard"],["fees","💳 Fee Payment"],["attendance","📅 Attendance"],["notifications","🔔 Notifications"]];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <div className="text-white font-medium text-sm">Arjun Kapoor</div>
              <div className="text-slate-400 text-xs">Class VIII-A · Roll No: 23</div>
            </div>
          </div>
          <button onClick={() => setLoggedIn(false)} className="text-slate-400 hover:text-white text-sm border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all">Sign Out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-8">
          {portalTabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${tab === id ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[["Attendance","94.5%","🟢","This month"],["Fees Due","₹0","🟢","All paid"],["Next Exam","Mar 15","🟡","Mathematics"],["Overall Grade","A+","🟢","Term I"]].map(([label, val, dot, sub]) => (
                <div key={label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-white font-bold text-2xl mb-1">{val}</div>
                  <div className="flex gap-1 items-center"><span>{dot}</span><span className="text-slate-500 text-xs">{sub}</span></div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Recent Marks</h3>
                <div className="space-y-3">
                  {[["Mathematics","45/50","90%"],["English","43/50","86%"],["Science","47/50","94%"],["Hindi","41/50","82%"],["Social Studies","44/50","88%"]].map(([sub, marks, pct]) => (
                    <div key={sub} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{sub}</span><span className="text-slate-400">{marks}</span></div>
                        <div className="h-1.5 bg-slate-700 rounded-full"><div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: pct }}></div></div>
                      </div>
                      <span className="text-emerald-400 text-xs font-bold w-10 text-right">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[["📥","Download TC"],["📋","View Reports"],["💬","Message Teacher"],["📅","Book PTM"],["📄","Request Certificate"],["🔔","View Notices"]].map(([icon, label]) => (
                    <button key={label} className="bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-left hover:border-emerald-500/40 hover:bg-slate-700 transition-all">
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-slate-300 text-xs">{label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "fees" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Fee Payment</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[["Total Annual Fees","₹51,000"],["Amount Paid","₹51,000"],["Balance Due","₹0"]].map(([label, val]) => (
                <div key={label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center">
                  <div className="text-slate-400 text-sm mb-1">{label}</div>
                  <div className="text-white font-bold text-3xl">{val}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold mb-4">Payment History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-700">{["Date","Description","Amount","Status"].map(h=><th key={h} className="pb-2 text-slate-400 font-medium text-left pr-4">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-800">
                    {[["Apr 2024","Term I Fees","₹17,000","Paid"],["Sep 2024","Term II Fees","₹17,000","Paid"],["Jan 2025","Term III Fees","₹17,000","Paid"]].map(([date,...rest]) => (
                      <tr key={date}><td className="py-3 text-slate-300 pr-4">{date}</td>{rest.map((r,i)=><td key={i} className={`py-3 pr-4 ${r==="Paid"?"text-emerald-400":"text-white"}`}>{r}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">Pay Online →</button>
          </div>
        )}

        {tab === "attendance" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Attendance Overview</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-1">Total Working Days</div><div className="text-white font-bold text-3xl">156</div></div>
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-1">Days Present</div><div className="text-emerald-400 font-bold text-3xl">148</div></div>
              <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-1">Days Absent</div><div className="text-red-400 font-bold text-3xl">8</div></div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Monthly Attendance</h3>
              <div className="space-y-3">
                {[["April 2024",22,22],["May 2024",18,20],["July 2024",24,25],["August 2024",26,26],["September 2024",21,22],["October 2024",20,20],["November 2024",19,21],["January 2025",22,24],["February 2025",16,18]].map(([month, present, total]) => (
                  <div key={month} className="flex items-center gap-3">
                    <div className="w-28 text-slate-400 text-xs">{month}</div>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full">
                      <div className={`h-full rounded-full ${present/total >= 0.9 ? "bg-emerald-500" : present/total >= 0.75 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${(present/total)*100}%` }}></div>
                    </div>
                    <div className="text-slate-300 text-xs w-16 text-right">{present}/{total} days</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Notifications</h2>
            <div className="space-y-3">
              {[
                { icon:"🔔", title:"PTM Scheduled for Feb 28", desc:"Parent-Teacher Meeting for Class VIII is scheduled.", time:"2 hours ago", read:false },
                { icon:"✅", title:"Fee Payment Confirmed", desc:"Your fee payment of ₹17,000 for Term III has been received.", time:"Jan 15, 2025", read:true },
                { icon:"📋", title:"Exam Timetable Released", desc:"The Term II examination timetable has been published.", time:"Jan 10, 2025", read:true },
                { icon:"🏆", title:"Arjun won 1st place in Math Olympiad", desc:"Congratulations! Arjun secured 1st place in the District Math Olympiad.", time:"Dec 18, 2024", read:true },
                { icon:"📚", title:"New Homework Assigned", desc:"Mathematics homework: Chapter 12 exercises assigned for tomorrow.", time:"Dec 15, 2024", read:true },
              ].map((n, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-all ${n.read ? "bg-slate-800/30 border-slate-700/50" : "bg-emerald-900/20 border-emerald-500/30"}`}>
                  <div className="text-2xl flex-shrink-0">{n.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`font-semibold text-sm ${n.read ? "text-slate-300" : "text-white"}`}>{n.title}</h3>
                      {!n.read && <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5"></span>}
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{n.desc}</p>
                    <p className="text-slate-600 text-xs mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Name is required";
    if (!f.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Invalid email format";
    if (!f.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length === 0) {
      const subject = encodeURIComponent(form.subject || "Contact from Website");
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`);
      window.location.href = `mailto:${SCHOOL_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setTimeout(() => { setForm({ name:"",email:"",phone:"",subject:"",message:"" }); setSubmitted(false); }, 4000);
    }
  };

  const inputCls = (field) => `w-full bg-slate-700/50 border ${errors[field] ? "border-red-500/70" : "border-slate-600 focus:border-emerald-500"} rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="bg-slate-900 border-b border-slate-700 py-16 px-4 text-center">
        <div className="text-emerald-400 text-sm uppercase tracking-widest mb-3">Get in Touch</div>
        <h1 className="text-5xl font-bold text-white font-serif mb-4">Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Us</span></h1>
        <p className="text-slate-400">We'd love to hear from you. Reach out anytime.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Find Us</h2>
            <div className="space-y-4">
              {[[" 📍","Address",SCHOOL_ADDRESS],["📞","Phone / Helpline",SCHOOL_PHONE + " | +91 98765 43211"],["✉️","Email",SCHOOL_EMAIL],["🕐","Working Hours","Mon-Sat: 8:00 AM – 2:30 PM (Office: 8AM-4PM)"]].map(([icon, label, value]) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-slate-200 text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-bold mb-3">Location Map</h3>
            <div className="rounded-2xl overflow-hidden border border-slate-700 h-64 bg-slate-800 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" style={{ backgroundImage: "linear-gradient(rgba(52,211,153,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3">📍</div>
                <p className="text-white font-semibold">SCHOOL_NAME</p>
                <p className="text-slate-400 text-sm">SONBHADRA UP</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block text-emerald-400 text-xs border border-emerald-500/30 px-3 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">Open in Google Maps ↗</a>
              </div>
            </div>
          </div>

          {/*/!* Social *!/*/}
          {/*<div>*/}
          {/*  <h3 className="text-white font-bold mb-4">Follow Us</h3>*/}
          {/*  <div className="flex gap-3">*/}
          {/*    {[["Facebook","f","bg-blue-600"],["Twitter","𝕏","bg-slate-700"],["Instagram","📷","bg-pink-600"],["YouTube","▶","bg-red-600"],["LinkedIn","in","bg-blue-700"]].map(([name, icon, bg]) => (*/}
          {/*      <div key={name} className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center text-white text-sm cursor-pointer hover:scale-110 transition-transform`}>{icon}</div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-white font-serif mb-5">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex justify-between items-center">
                    <span className="text-slate-200 text-sm font-medium">{faq.q}</span>
                    <span className={`text-emerald-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {openFaq === i && <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-700 pt-3">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Send a Message</h2>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thank you! We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} className={inputCls("name")} placeholder="Your full name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className={inputCls("email")} placeholder="your@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} className={inputCls("phone")} placeholder="Mobile number" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Subject</label>
                    <select value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))} className={inputCls("subject")}>
                      <option value="" className="bg-slate-800">Select topic</option>
                      {["Admission Inquiry","Fee Related","Academic Query","Transport","General Inquiry","Complaint"].map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-slate-300 text-xs uppercase tracking-wider mb-1.5 block">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} className={inputCls("message") + " resize-none"} rows={5} placeholder="Write your message here..." />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCHOOL WEBSITE MAIN COMPONENT
// ============================================================
export default function SchoolApp() {
  const [activePage, setActivePage] = useState("home");

  const setPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    academics: <AcademicsPage />,
    faculty: <FacultyPage />,
    admissions: <AdmissionsPage />,
    news: <NewsPage />,
    gallery: <GalleryPage />,
    student: <StudentPage />,
    // parent: <ParentPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activePage={activePage} setPage={setPage} />
      <main>{pages[activePage] || pages.home}</main>
      {activePage !== "parent" && <Footer setPage={setPage} />}
    </div>
  );
}
