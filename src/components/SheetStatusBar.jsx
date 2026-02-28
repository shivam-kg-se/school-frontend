// ============================================================
//  SheetStatusBar
//  A small indicator bar shown on pages that use Google Sheets
//  Shows: live ✅ | cached 🟡 | fallback ⚪ | loading 🔄 | error ❌
// ============================================================

import { isSheetConfigured } from "../googleSheetConfig.js";

export default function SheetStatusBar({ loading, error, lastUpdated, source, refetch, label = "data" }) {
  if (!isSheetConfigured()) {
    return (
      <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2 mb-5 text-xs">
        <span className="text-slate-500">⚙️</span>
        <span className="text-slate-500">
          Google Sheets not configured — showing default {label}.{" "}
          <span className="text-amber-400">Edit <code className="bg-slate-700 px-1 py-0.5 rounded">src/googleSheetConfig.js</code> to connect your sheet.</span>
        </span>
      </div>
    );
  }

  const sourceConfig = {
    sheet:    { dot: "bg-emerald-400",  label: "Live from Google Sheets", text: "text-emerald-400" },
    cache:    { dot: "bg-amber-400",    label: "Cached data",             text: "text-amber-400"  },
    fallback: { dot: "bg-slate-500",    label: "Default data",            text: "text-slate-400"  },
  };

  const cfg = sourceConfig[source] || sourceConfig.fallback;

  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-xl px-4 py-2 mb-5 text-xs border ${
      source === "sheet" ? "bg-emerald-900/20 border-emerald-700/30" :
      source === "cache" ? "bg-amber-900/20 border-amber-700/30"    :
                           "bg-slate-800/60 border-slate-700/60"
    }`}>
      {loading ? (
        <>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-blue-400">Fetching latest {label} from Google Sheets…</span>
        </>
      ) : (
        <>
          <span className={`w-2 h-2 rounded-full ${cfg.dot} ${source === "sheet" ? "animate-pulse" : ""}`}></span>
          <span className={cfg.text}>{cfg.label}</span>
          {lastUpdated && (
            <span className="text-slate-600">
              · Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {error && <span className="text-amber-500 ml-1">⚠ {error}</span>}
          <button
            onClick={refetch}
            className="ml-auto text-slate-400 hover:text-emerald-400 border border-slate-600 hover:border-emerald-500/50 px-2 py-0.5 rounded-lg transition-all"
          >
            ↻ Refresh
          </button>
        </>
      )}
    </div>
  );
}
