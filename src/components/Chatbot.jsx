import { useState, useEffect, useRef } from "react";
import { getChatbotResponse, QUICK_REPLIES } from "../chatbotEngine.js";

// -------------------------------------------------------
// Markdown-lite renderer — handles **bold**, bullet points, line breaks
// -------------------------------------------------------
function renderMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Parse **bold**
    const parseBold = (str) => {
      const parts = str.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="font-semibold text-emerald-300">{part}</strong> : part
      );
    };

    if (line.trim() === "") return <br key={i} />;

    // Table-like lines (simple)
    if (line.includes("|")) {
      if (line.match(/^\|[-\s|]+\|$/)) return null; // skip separator
      const cells = line.split("|").filter(c => c.trim() !== "");
      return (
        <div key={i} className="flex gap-1 text-xs mt-0.5 flex-wrap">
          {cells.map((cell, j) => (
            <span key={j} className="bg-slate-700/60 px-2 py-0.5 rounded text-slate-200">{parseBold(cell.trim())}</span>
          ))}
        </div>
      );
    }

    return (
      <div key={i} className="leading-snug">
        {parseBold(line)}
      </div>
    );
  }).filter(Boolean);
}

// -------------------------------------------------------
// Typing indicator component
// -------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-3 py-2.5">
      {[0, 1, 2].map(i => (
        <span key={i} className="typing-dot w-2 h-2 bg-emerald-400 rounded-full block" />
      ))}
    </div>
  );
}

// -------------------------------------------------------
// Single message bubble
// -------------------------------------------------------
function MessageBubble({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div className={`flex chat-bubble-in ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">G</div>
      )}
      <div
        className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed space-y-0.5 ${
          isBot
            ? "bg-slate-700/80 text-slate-100 rounded-tl-sm"
            : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-tr-sm"
        }`}
      >
        {isBot ? renderMessage(msg.text) : <p>{msg.text}</p>}
        <div className={`text-xs mt-1 ${isBot ? "text-slate-500" : "text-emerald-200/70"}`}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Main Chatbot Widget Component
// -------------------------------------------------------
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hello! Welcome to **Greenwood Academy** Virtual Assistant!\n\nI can help you with admissions, fees, academics, facilities, and more.\n\nType **\"help\"** to see all topics, or ask me anything!",
      time: formatTime(new Date()),
      id: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function formatTime(date) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [isOpen]);

  const sendMessage = (text) => {
    const userText = (text || input).trim();
    if (!userText) return;

    const userMsg = {
      role: "user",
      text: userText,
      time: formatTime(new Date()),
      id: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowQuickReplies(false);

    // Simulate bot thinking delay (800–1400ms)
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const responseText = getChatbotResponse(userText);
      const botMsg = {
        role: "bot",
        text: responseText,
        time: formatTime(new Date()),
        id: Date.now() + 1,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      if (!isOpen) setUnread(n => n + 1);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  const clearChat = () => {
    setMessages([{
      role: "bot",
      text: "Chat cleared! 🌿 How can I help you today? Type **\"help\"** to see all topics.",
      time: formatTime(new Date()),
      id: Date.now(),
    }]);
    setShowQuickReplies(true);
  };

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label="Open school chatbot"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/40 flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-200 group"
      >
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <>
            <span>💬</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-6 z-[998] w-[360px] max-w-[calc(100vw-24px)] bg-slate-800 rounded-2xl shadow-2xl shadow-black/50 border border-slate-600/50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-t-2xl px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-base">G</div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-teal-800"></div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">Greenwood Assistant</div>
              <div className="text-emerald-200 text-xs">Online • Usually replies instantly</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all"
            >
              🗑
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white text-lg w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* School tag */}
        <div className="bg-slate-700/50 border-b border-slate-600/40 px-4 py-1.5 flex items-center gap-2">
          <span className="text-emerald-400 text-xs">🏫</span>
          <span className="text-slate-400 text-xs">Greenwood Academy · CBSE Affiliated · Noida</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scroll-smooth" style={{ scrollbarWidth: "thin" }}>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">G</div>
              <div className="bg-slate-700/80 rounded-2xl rounded-tl-sm">
                <TypingIndicator />
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {showQuickReplies && !isTyping && messages.length <= 2 && (
            <div className="mt-3">
              <p className="text-slate-500 text-xs mb-2 px-1">Quick topics:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map(qr => (
                  <button
                    key={qr}
                    onClick={() => handleQuickReply(qr)}
                    className="text-xs bg-slate-700 hover:bg-emerald-600 border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-all"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-slate-600/50 px-3 py-3">
          <div className="flex gap-2 items-end">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about admissions, fees..."
              className="flex-1 bg-slate-700 border border-slate-600 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                input.trim() && !isTyping
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-105"
                  : "bg-slate-700 text-slate-600 cursor-not-allowed"
              }`}
            >
              ➤
            </button>
          </div>
          <p className="text-slate-600 text-[10px] text-center mt-2">
            Greenwood Academy Virtual Assistant · For urgent queries call {"+91 98765 43210"}
          </p>
        </div>
      </div>
    </>
  );
}
