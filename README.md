# 🏫 Greenwood Academy — School Website

A fully responsive, modern, and professional school website built with **React.js**, **Vite**, and **Tailwind CSS**, featuring a built-in **AI-powered Chatbot** using pure JavaScript (no external API).

---

## 📸 Features

### 10 Complete Pages
| Page | Features |
|---|---|
| 🏠 **Home** | Hero section, Stats counter, Why Choose Us, Events, Testimonials slider, CTA |
| 📖 **About** | School history, Vision & Mission, Principal message, Infrastructure, Awards |
| 🎓 **Academics** | Class-wise subjects (Nursery–VIII), Academic calendar, Syllabus downloads, Timetable |
| 👩‍🏫 **Faculty** | Teacher cards, Department filters, Admin staff section |
| 📋 **Admissions** | Process steps, Fee table, Documents checklist, Validated form + mailto |
| 📢 **News & Notices** | Search, Category filters, Pagination, Expandable notices |
| 🖼️ **Gallery** | Image grid, Lightbox modal, Video section, Category filters |
| 🎒 **Student Corner** | Homework, Exam schedule, Results portal, Circulars, Timetable |
| 👨‍👩‍👧 **Parent Portal** | Login UI, Dashboard, Fee history, Attendance chart, Notifications |
| 📞 **Contact** | Info cards, Map embed, Validated form, FAQ accordion, Social links |

### 🤖 Built-in Chatbot
- Floating chat widget (bottom-right corner)
- Pure JavaScript — **zero external API dependency**
- Answers 15+ topic categories from a local knowledge base
- Supports natural language queries + quick-reply buttons
- Typing animation, message timestamps, unread badge
- Works offline — no internet needed for chatbot

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.x | UI framework |
| Vite | 6.x | Build tool & dev server |
| Tailwind CSS | 3.4.x | Utility-first styling |
| JavaScript (ES6+) | — | Chatbot engine |
| Google Fonts | — | Playfair Display + DM Sans |

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v8+ (comes with Node.js)
- **IntelliJ IDEA** (any edition) with the Node.js plugin enabled

To check if Node.js and npm are installed:
```bash
node --version
npm --version
```

---

## 🚀 Getting Started

### Step 1 — Clone or Download the Project

If you have the zip file, extract it to your desired location.

If using Git:
```bash
git clone https://github.com/your-username/greenwood-academy.git
cd greenwood-academy
```

### Step 2 — Open in IntelliJ IDEA

1. Open **IntelliJ IDEA**
2. Click **File → Open**
3. Navigate to and select the `greenwood-academy` folder
4. Click **OK / Trust Project**
5. IntelliJ will detect the project structure automatically

### Step 3 — Install Dependencies

Open the **Terminal** in IntelliJ IDEA (`View → Tool Windows → Terminal` or `Alt+F12`):

```bash
npm install
```

This installs all required packages (React, Vite, Tailwind, etc.) into the `node_modules` folder. It takes about 30–60 seconds.

### Step 4 — Start Development Server

In the same terminal:

```bash
npm run dev
```

You should see output like:
```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
  ➜  press h + enter to show help
```

The browser will **automatically open** `http://localhost:3000`. 🎉

---

## 🖥️ Running in IntelliJ IDEA (Detailed Steps)

### Method 1 — Using IntelliJ Terminal (Recommended)

1. Open IntelliJ IDEA and open the project folder
2. Press `Alt + F12` to open the terminal
3. Run: `npm install`
4. Run: `npm run dev`
5. Click the `http://localhost:3000` link in the terminal output

### Method 2 — Using npm Run Configurations

1. Click **Run → Edit Configurations**
2. Click **+** → Select **npm**
3. Set:
   - **Name:** `Dev Server`
   - **Command:** `run`
   - **Scripts:** `dev`
   - **Node interpreter:** (auto-detected or browse to Node path)
4. Click **OK**
5. Press the **▶ Run** button (or `Shift + F10`)

### Method 3 — Using the npm Tool Window

1. Go to **View → Tool Windows → npm**
2. Find the `dev` script
3. Double-click it to start the server

---

## 📁 Project Structure

```
greenwood-academy/
│
├── public/
│   └── favicon.svg              ← School favicon
│
├── src/
│   ├── components/
│   │   └── Chatbot.jsx          ← 🤖 Chatbot widget component
│   │
│   ├── App.jsx                  ← Root app (loads website + chatbot)
│   ├── SchoolWebsite.jsx        ← All 10 pages of the school website
│   ├── chatbotEngine.js         ← 🧠 Chatbot knowledge base & response logic
│   ├── index.css                ← Tailwind + custom styles
│   └── main.jsx                 ← React entry point
│
├── index.html                   ← HTML entry point with font imports
├── package.json                 ← Project dependencies & scripts
├── vite.config.js               ← Vite configuration (port 3000)
├── tailwind.config.js           ← Tailwind configuration
├── postcss.config.js            ← PostCSS configuration
└── README.md                    ← This file
```

---

## 🤖 Chatbot Documentation

The chatbot is powered by a **local JavaScript knowledge base** — no internet connection or API key required.

### How it Works

```
User Types Message
      ↓
chatbotEngine.js
      ↓
  Pattern Matching (INTENTS array)
      ↓
  Knowledge Base (KB object)
      ↓
  buildResponse(type)
      ↓
Formatted Reply Displayed
```

### Topics the Chatbot Understands

| Topic | Example Queries |
|---|---|
| Greetings | "hello", "hi", "namaste" |
| Admissions | "how to apply", "admission process", "last date" |
| Fee Structure | "what is the fee", "monthly charges", "fee structure" |
| Academics | "which classes", "subjects", "curriculum" |
| Exams | "exam schedule", "when is exam", "unit test" |
| Faculty | "who are the teachers", "principal name" |
| Facilities | "library", "labs", "swimming pool", "sports" |
| Transport | "school bus", "pickup time", "bus routes" |
| Events | "upcoming events", "sports day", "cultural fest" |
| Parent Portal | "parent login", "online attendance" |
| Uniform | "school dress", "uniform details" |
| Contact | "address", "phone number", "email", "how to visit" |
| Scholarships | "scholarship", "fee discount", "merit waiver" |
| Timings | "school timings", "what time", "hours" |
| Results | "check result", "marks", "report card" |
| Help | "help", "what can you do" |

### Customizing the Chatbot

To update the chatbot's knowledge, edit **`src/chatbotEngine.js`**:

```js
// Update school data
const KB = {
  school: {
    name: "Your School Name",
    phone: "+91 XXXXX XXXXX",
    // ... edit any field
  },
  admissions: {
    lastDate: "March 31, 2025",
    // ... update dates and details
  },
  // ... other sections
};

// Add new intents
const INTENTS = [
  {
    patterns: ["your new keyword", "another phrase"],
    type: "yourNewTopic",
  },
  // ...
];

// Add response for new intent
const responses = {
  yourNewTopic: "Your custom response text here...",
  // ...
};
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build production-ready files to `/dist` |
| `npm run preview` | Preview the production build locally |

---

## 🌐 Building for Production

To create an optimized production build:

```bash
npm run build
```

Output will be in the `/dist` folder. To preview it:

```bash
npm run preview
```

---

## 🎨 Customization Guide

### Changing School Name / Info
Edit the constants at the top of `src/SchoolWebsite.jsx`:
```js
const SCHOOL_NAME = "Your School Name";
const SCHOOL_EMAIL = "your@email.com";
const SCHOOL_PHONE = "+91 XXXXX XXXXX";
const SCHOOL_ADDRESS = "Your full address";
```

### Changing Colors
The website uses **Tailwind CSS** with an emerald/teal color scheme.  
To change the primary color, find-and-replace `emerald` with any Tailwind color:
- `blue`, `violet`, `amber`, `rose`, `cyan`, etc.

### Changing Fonts
Edit `index.html` to swap Google Fonts link, then update `src/index.css`:
```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Changing Port
Edit `vite.config.js`:
```js
server: {
  port: 8080, // ← change to any available port
}
```

---


---

## 🗂️ Google Sheets Live Integration

Update exam dates, notices, events, and homework **directly from Google Sheets — no coding or redeployment needed!**

### Which Pages Pull from Google Sheets?

| Page | Section | Google Sheet Tab |
|---|---|---|
| 🏠 Home | Upcoming Events | `Events` tab |
| 📢 News & Notices | All notices | `Notices` tab |
| 🎒 Student Corner | Exam Schedule | `Exam Schedule` tab |
| 🎒 Student Corner | Homework | `Homework` tab |

All other pages use the static fallback data in `SchoolWebsite.jsx` until you connect a sheet.

---

### ⚡ Quick Setup (15 minutes)

#### Step 1 — Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **Greenwood Academy Website Data**
3. Create **4 tabs** named exactly:
   - `Exam Schedule`
   - `Notices`
   - `Events`
   - `Homework`

#### Step 2 — Add Column Headers

Copy these headers into **Row 1** of each tab:

**Exam Schedule tab:**
```
date | day | subject | class | time
```

**Notices tab:**
```
id | title | category | date | urgent | content
```
> `urgent` column: type `true` or `false`  
> `category` options: `Admission`, `Event`, `Academic`, `Exam`, `Facility`, `Meeting`

**Events tab:**
```
date | month | title | category | desc
```
> `category` options: `Academic`, `Sports`, `Meeting`, `Cultural`

**Homework tab:**
```
class | subject | title | due | status
```
> `status` options: `Pending`, `Due Today`, `Submitted`, `Overdue`

#### Step 3 — Publish the Sheet

1. Click **File → Share → Publish to web**
2. Select **Entire Document** and **Comma-separated values (.csv)**
3. Click **Publish** → Confirm

#### Step 4 — Get Your Sheet ID and Tab GIDs

Look at the URL when your sheet is open:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=GID
                                       ^^^^^^^^^       ^^^
```
- **SHEET_ID** = the long string between `/d/` and `/edit`
- **GID** = the number after `#gid=`
  - The **first tab** (Exam Schedule) usually has `gid=0`
  - Click each tab and note its gid from the URL

#### Step 5 — Update Config File

Open **`src/googleSheetConfig.js`** and fill in your values:

```js
export const SHEET_CONFIG = {
  SHEET_ID: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", // ← paste your ID here

  TABS: {
    EXAM_SCHEDULE: "0",       // ← gid of your "Exam Schedule" tab
    NOTICES:       "123456",  // ← gid of your "Notices" tab
    EVENTS:        "234567",  // ← gid of your "Events" tab
    HOMEWORK:      "345678",  // ← gid of your "Homework" tab
  },

  REFRESH_INTERVAL: 5 * 60 * 1000, // auto-refresh every 5 minutes
};
```

#### Step 6 — Run and Test

```bash
npm run dev
```

Visit the site → you should see a green **"Live from Google Sheets"** status bar on affected pages.

---

### 📊 How to Update After Deployment

Once configured, **no code changes needed ever again** for these sections:

| To change... | Do this |
|---|---|
| Exam dates | Open `Exam Schedule` tab → edit cells → Save |
| Add a notice | Open `Notices` tab → add new row → Save |
| Update events | Open `Events` tab → edit rows → Save |
| Assign homework | Open `Homework` tab → add/edit rows → Save |

Changes appear on the live website within **5 minutes** (auto-refresh interval).

To force an immediate update, click the **↻ Refresh** button on the status bar.

---

### 🔄 Status Bar Indicators

Each live page shows a status bar:

| Indicator | Meaning |
|---|---|
| 🟢 `Live from Google Sheets` | Successfully fetching latest data |
| 🟡 `Cached data` | Showing last-known data (fetch failed) |
| ⚪ `Default data` | Sheet not configured, showing built-in data |
| 🔵 `Fetching...` | Loading in progress |

---

### 🔧 Configuring Auto-Refresh

Edit `REFRESH_INTERVAL` in `src/googleSheetConfig.js`:

```js
REFRESH_INTERVAL: 5 * 60 * 1000,   // every 5 minutes (default)
REFRESH_INTERVAL: 60 * 1000,        // every 1 minute
REFRESH_INTERVAL: 0,                // disable auto-refresh
```

---

### ⚠️ Troubleshooting

| Problem | Solution |
|---|---|
| Status shows "Default data" | Check `SHEET_ID` in `googleSheetConfig.js` |
| Status shows "Cached data" | Sheet may not be published — redo Step 3 |
| Data not updating | Click ↻ Refresh button; check sheet is published |
| Wrong data showing | Verify column header names match exactly |
| CORS error in console | Ensure sheet is published as CSV (not shared link) |

> 📖 Full setup instructions also available in `GOOGLE_SHEETS_SETUP.txt`


---

## 🔧 Troubleshooting

### "node is not recognized" Error
- Download and install Node.js from https://nodejs.org/
- Restart IntelliJ IDEA after installation
- Check: `node --version` in terminal

### Port 3000 Already in Use
Either kill the process using port 3000, or change the port in `vite.config.js`.

### Tailwind Styles Not Loading
```bash
npm install
npm run dev
```

### Blank Page on Load
Ensure you're visiting `http://localhost:3000` (not file:// path).  
Check the terminal for any error messages.

### Module Not Found Error
```bash
rm -rf node_modules
npm install
```

---

