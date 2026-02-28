// ============================================================
//  GOOGLE SHEETS CONFIGURATION
//  ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT
//  Replace the SHEET_ID and GID values with your own sheet IDs
// ============================================================
//
//  HOW TO GET YOUR SHEET_ID & GID:
//  ─────────────────────────────────────────────────────────
//  1. Open your Google Sheet in the browser
//  2. Look at the URL:
//     https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=GID
//                                            ^^^^^^^^        ^^^
//  3. Copy the SHEET_ID (long string between /d/ and /edit)
//  4. Copy the GID (number after #gid=)
//     → The FIRST tab has gid=0 by default
//     → Other tabs have different numbers — check the URL when you click each tab
//
//  HOW TO PUBLISH YOUR SHEET:
//  ─────────────────────────────────────────────────────────
//  1. Open your Google Sheet
//  2. Click File → Share → Publish to web
//  3. Under "Link", select "Entire Document" and "Comma-separated values (.csv)"
//  4. Click "Publish" → Click OK
//  5. Your sheet is now publicly readable (read-only) ✅
//
//  COLUMN HEADERS (must match EXACTLY in your sheet):
//  ─────────────────────────────────────────────────────────
//  📋 EXAM SCHEDULE tab:  date | day | subject | class | time
//  📢 NOTICES tab:        id | title | category | date | urgent | content
//  📅 EVENTS tab:         date | month | title | category | desc
//  📚 HOMEWORK tab:       class | subject | title | due | status
//
// ============================================================

export const SHEET_CONFIG = {
  // ── Paste your Sheet ID here ──────────────────────────────
  SHEET_ID: "YOUR_GOOGLE_SHEET_ID_HERE",

  // ── Tab GIDs — get these from the URL when clicking each tab
  TABS: {
    EXAM_SCHEDULE: "0",       // gid of your "Exam Schedule" tab
    NOTICES:       "123456",  // gid of your "Notices" tab
    EVENTS:        "234567",  // gid of your "Events" tab
    HOMEWORK:      "345678",  // gid of your "Homework" tab
  },

  // ── How often to re-fetch data (in milliseconds) ──────────
  // 5 * 60 * 1000 = every 5 minutes
  // Set to 0 to disable auto-refresh
  REFRESH_INTERVAL: 5 * 60 * 1000,
};

// ── Build the fetch URL for a given tab GID ─────────────────
export function buildSheetUrl(gid) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.SHEET_ID}/export?format=csv&gid=${gid}`;
}

// ── Check if config has been filled in ──────────────────────
export function isSheetConfigured() {
  return SHEET_CONFIG.SHEET_ID !== "YOUR_GOOGLE_SHEET_ID_HERE";
}
