// ============================================================
//  useGoogleSheet  —  Custom React Hook
//  Fetches a Google Sheet tab as CSV, parses it into objects,
//  caches the result, and auto-refreshes on interval.
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { buildSheetUrl, isSheetConfigured, SHEET_CONFIG } from "./googleSheetConfig.js";

// ── Parse CSV text → array of objects using first row as keys
function parseCSV(csvText) {
  const lines = csvText
    .trim()
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  // Parse a single CSV line respecting quoted fields
  const parseLine = (line) => {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, "_"));

  return lines.slice(1).map((line, idx) => {
    const values = parseLine(line);
    const obj = { _rowIndex: idx + 2 }; // 1-based, skip header row
    headers.forEach((header, i) => {
      obj[header] = values[i] ?? "";
    });
    return obj;
  }).filter(row => {
    // Skip completely empty rows
    return Object.values(row).some(v => v !== "" && v !== undefined);
  });
}

// ── In-memory cache so we don't refetch on every re-render
const cache = new Map();

// ── The hook itself
export function useGoogleSheet(tabKey, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [source, setSource] = useState("fallback"); // "sheet" | "cache" | "fallback"

  const gid = SHEET_CONFIG.TABS[tabKey];
  const url = isSheetConfigured() ? buildSheetUrl(gid) : null;
  const cacheKey = `sheet_${tabKey}`;

  const fetchData = useCallback(async (silent = false) => {
    if (!url) {
      setSource("fallback");
      return;
    }

    if (!silent) setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const csvText = await response.text();
      const parsed = parseCSV(csvText);

      if (parsed.length === 0) throw new Error("Sheet is empty or has no data rows");

      cache.set(cacheKey, { data: parsed, time: Date.now() });
      setData(parsed);
      setLastUpdated(new Date());
      setSource("sheet");
    } catch (err) {
      // Try cache
      const cached = cache.get(cacheKey);
      if (cached) {
        setData(cached.data);
        setLastUpdated(new Date(cached.time));
        setSource("cache");
        setError(`Using cached data. Live fetch failed: ${err.message}`);
      } else {
        // Fall back to static data
        setData(fallbackData);
        setSource("fallback");
        setError(`Could not load from Google Sheets: ${err.message}. Showing default data.`);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [url, cacheKey, fallbackData]);

  // Initial fetch
  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  // Auto-refresh interval
  useEffect(() => {
    if (!url || !SHEET_CONFIG.REFRESH_INTERVAL) return;
    const interval = setInterval(() => fetchData(true), SHEET_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [url, fetchData]);

  return { data, loading, error, lastUpdated, source, refetch: () => fetchData(false) };
}

// ── Row transformers — convert raw CSV row objects into the
//    exact shape our components expect
// ────────────────────────────────────────────────────────────

export function transformExamRow(row, idx) {
  return {
    date:    row.date    || "TBA",
    day:     row.day     || "",
    subject: row.subject || "Subject",
    class:   row.class   || "All Classes",
    time:    row.time    || "9:00 AM",
  };
}

export function transformNoticeRow(row, idx) {
  return {
    id:       parseInt(row.id) || idx + 1,
    title:    row.title    || "Notice",
    category: row.category || "General",
    date:     row.date     || "",
    urgent:   String(row.urgent).toLowerCase() === "true" || row.urgent === "1" || row.urgent === "yes",
    content:  row.content  || "",
  };
}

export function transformEventRow(row) {
  return {
    date:     row.date     || "",
    month:    row.month    || "2025",
    title:    row.title    || "Event",
    category: row.category || "General",
    desc:     row.desc     || "",
  };
}

export function transformHomeworkRow(row) {
  return {
    class:   row.class   || "",
    subject: row.subject || "",
    title:   row.title   || "",
    due:     row.due     || "",
    status:  row.status  || "Pending",
  };
}
