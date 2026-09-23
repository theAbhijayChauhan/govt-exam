"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  CheckCircle2, 
  GraduationCap,
  Menu,
  X,
  Sparkles
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Latest Drops",
      href: "/",
      icon: Compass,
      badge: "Live Radar",
    },
    {
      name: "Eligibility Vibe Check",
      href: "/eligibility",
      icon: CheckCircle2,
      badge: "10-Sec Test",
      highlight: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(8,3,16,0.8)] backdrop-blur-xl border-b border-purple-500/20">
      {/* Top Notification Ticker */}
      <div className="bg-gradient-to-r from-[#180628] via-[#090214] to-[#180628] border-b border-purple-500/20 py-1.5 px-4 text-xs text-purple-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400 uppercase tracking-wider text-[11px]">Sarkari Radar:</span>
          </div>
          <div className="truncate text-purple-200 flex items-center gap-6 text-[11px] sm:text-xs font-normal">
            <span><strong>RRB NTPC 2026</strong> Forms are <strong>LIVE 🔥</strong> (11.5k+ Seats)</span>
            <span className="hidden sm:inline text-purple-500/40">•</span>
            <span className="hidden sm:inline"><strong>SSC GD (39.4k Posts)</strong>: Deadline <strong>14 OCT ⏳</strong></span>
            <span className="hidden md:inline text-purple-500/40">•</span>
            <span className="hidden md:inline"><strong>India Post GDS</strong>: Closed <strong>19 Sept</strong> (Don't fall for fake news)</span>
          </div>
          <Link 
            href="/eligibility"
            prefetch={true}
            className="shrink-0 text-[11px] font-medium text-purple-300 hover:text-white transition-colors"
          >
            Run Vibe Check &rarr;
          </Link>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 border border-purple-300/30 text-white shadow-md">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-medium tracking-tight text-white">
                  GovtExam<span className="text-purple-400 font-normal">AI</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-normal bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  OS
                </span>
              </div>
              <p className="text-[11px] text-purple-300/70 hidden sm:block font-normal">
                Zero PDF Yapping • Verified Sarkari Radar &amp; Instant Matches
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-normal transition-all border ${
                    isActive
                      ? "btn-glass-primary text-white border-purple-300 font-medium shadow-md"
                      : "bg-[rgba(20,9,36,0.6)] backdrop-blur-md text-purple-200 hover:text-white border-purple-400/20 hover:border-purple-400/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-300" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-normal uppercase tracking-wider ${
                      isActive
                        ? "bg-purple-950/90 text-purple-200"
                        : "bg-[rgba(14,6,26,0.8)] text-purple-300/70"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/eligibility"
              prefetch={true}
              className="btn-glass-primary flex items-center gap-1.5 text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Instant Eligibility Match</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[rgba(25,12,45,0.7)] border border-purple-400/30 text-purple-200 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgba(10,4,19,0.95)] backdrop-blur-2xl border-b border-purple-500/20 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-normal ${
                  isActive
                    ? "bg-purple-900/60 border border-purple-400/40 text-white font-medium"
                    : "text-purple-200 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-purple-300" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-normal bg-purple-950 text-purple-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/eligibility"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-glass-primary flex items-center justify-center gap-2 py-2 text-sm"
            >
              <span>Test 10th / 12th / Degree Eligibility</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
