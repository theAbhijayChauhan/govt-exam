"use client";

import React, { useState, useRef } from "react";
import { 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  Send, 
  X,
  ExternalLink,
  UserCheck
} from "lucide-react";

interface CreatorContactWidgetProps {
  email?: string;
}

export const CreatorContactWidget: React.FC<CreatorContactWidgetProps> = ({
  email = "abhijeet.govtexamai@gmail.com"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth hover enter strictly for the pill and the active card
  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  // Smooth hover exit with grace interval so cursor can glide between pill and card
  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers / non-HTTPS local testing
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  // Card is visible if toggled open OR if directly hovered
  const isCardVisible = isOpen || isHovered;

  return (
    /* Outer container is pointer-events-none so surrounding empty space NEVER intercepts hover */
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-none max-w-[calc(100vw-2rem)]"
    >
      {/* Floating Popover Card with Smooth Liquid Glass Transition */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl liquid-glass-panel p-4 sm:p-5 shadow-2xl transition-all duration-300 transform origin-bottom-right ${
          isCardVisible
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(30, 14, 52, 0.95) 0%, rgba(12, 4, 22, 0.98) 100%)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          border: "1px solid rgba(192, 132, 252, 0.35)",
          boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(168, 85, 247, 0.35)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/40 border border-purple-400/40 flex items-center justify-center text-purple-200">
              <UserCheck className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Creator &amp; Fellow Aspirant</h4>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online • Zero Yapping
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsHovered(false);
            }}
            className="text-purple-300/60 hover:text-white p-1 rounded-lg"
            aria-label="Close contact card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-purple-200/80 my-3 leading-relaxed font-normal">
          Built this ₹0 tool because I was sick of opening 80-page PDFs just to find out 12th PCM was required 💀 Found a bug, wrong date, or want to drop feedback? Hit me up directly:
        </p>

        {/* Email Box with Copy Icon in Front */}
        <div className="p-3 rounded-xl bg-[rgba(10,4,18,0.85)] border border-purple-400/25 flex items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 overflow-hidden">
            <Mail className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs text-white font-medium truncate" title={email}>
              {email}
            </span>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-400/30"
            }`}
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-2">
          <a
            href={`mailto:${email}?subject=GovtExam%20AI%20Feedback%20/%20Query`}
            className="flex-1 btn-glass-primary flex items-center justify-center gap-1.5 text-xs py-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Direct Email</span>
          </a>
        </div>
      </div>

      {/* Floating Trigger Pill: ONLY this button element has pointer-events-auto and triggers hover */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto group flex items-center gap-2.5 px-4 py-2.5 rounded-full liquid-glass-panel text-white transition-all shadow-xl hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, rgba(45, 18, 77, 0.9) 0%, rgba(18, 7, 33, 0.95) 100%)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(192, 132, 252, 0.35)",
          boxShadow: "0 8px 25px -4px rgba(126, 34, 206, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)",
        }}
        aria-label="Creator / Drop a Ping"
      >
        {/* Presence indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
          <div className="w-2 h-2 rounded-full bg-emerald-400 relative" />
        </div>

        <MessageSquare className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
        <span className="text-xs font-medium tracking-normal text-purple-100 group-hover:text-white">
          Creator / Drop a Ping 💬
        </span>
      </button>
    </div>
  );
};
