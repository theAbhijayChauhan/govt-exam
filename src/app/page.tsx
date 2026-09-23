"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GOVT_JOBS } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import { CoolorsElasticText } from "@/components/CoolorsElasticText";
import { 
  Search, 
  ShieldCheck, 
  ArrowRight,
  X,
  Sparkles
} from "lucide-react";
import { calculateDaysLeft } from "@/lib/utils";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamic counts for each filter category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: GOVT_JOBS.length,
      "10th": GOVT_JOBS.filter((j) => j.minQualification === "10th").length,
      "12th": GOVT_JOBS.filter((j) => j.minQualification === "12th").length,
      Graduate: GOVT_JOBS.filter((j) => j.minQualification === "Graduate").length,
      Urgent: GOVT_JOBS.filter((j) => {
        const { isUrgent, isExpired } = calculateDaysLeft(j.lastDate);
        return isUrgent && !isExpired;
      }).length,
      SSC: GOVT_JOBS.filter((j) => j.category === "SSC").length,
      Railways: GOVT_JOBS.filter((j) => j.category === "Railways").length,
      Defence: GOVT_JOBS.filter((j) => j.category === "Defence" || j.category === "Police").length,
      Banking: GOVT_JOBS.filter((j) => j.category === "Banking").length,
      UPSC: GOVT_JOBS.filter((j) => j.category === "UPSC").length,
    };
    return counts;
  }, []);

  const categories = [
    { label: "🔥 All Live Drops", value: "All", count: categoryCounts.All },
    { label: "⚡ 10th Pass Gang", value: "10th", count: categoryCounts["10th"] },
    { label: "🎯 12th Pass Hustle", value: "12th", count: categoryCounts["12th"] },
    { label: "🎓 Degree / Grad Flex", value: "Graduate", count: categoryCounts.Graduate },
    { label: "🚨 Deadline Alert (Don't Sleep)", value: "Urgent", count: categoryCounts.Urgent },
    { label: "🏛️ SSC Grind", value: "SSC", count: categoryCounts.SSC },
    { label: "🚆 Railways (RRB)", value: "Railways", count: categoryCounts.Railways },
    { label: "🛡️ Khaki & Defence", value: "Defence", count: categoryCounts.Defence },
    { label: "💼 Bankers Club", value: "Banking", count: categoryCounts.Banking },
    { label: "👑 UPSC Main Character", value: "UPSC", count: categoryCounts.UPSC },
  ];

  // Robust Search & Filter Matching
  const filteredJobs = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

    return GOVT_JOBS.filter((job) => {
      // 1. Search Query Matcher (Matches across all tokens)
      if (queryTokens.length > 0) {
        const searchableCorpus = [
          job.title,
          job.shortName,
          job.organization,
          job.category,
          job.minQualification,
          job.stateScope,
          job.salaryRange,
          job.payLevel,
          job.summary,
          ...(job.examStages?.map((s) => s.name) || []),
        ]
          .join(" ")
          .toLowerCase();

        const matchesAllTokens = queryTokens.every((token) =>
          searchableCorpus.includes(token)
        );

        if (!matchesAllTokens) return false;
      }

      // 2. Category Matcher
      if (selectedCategory === "All") return true;
      if (selectedCategory === "10th") return job.minQualification === "10th";
      if (selectedCategory === "12th") return job.minQualification === "12th";
      if (selectedCategory === "Graduate") return job.minQualification === "Graduate";
      if (selectedCategory === "Urgent") {
        const { isUrgent, isExpired } = calculateDaysLeft(job.lastDate);
        return isUrgent && !isExpired;
      }
      if (selectedCategory === "Defence") {
        return job.category === "Defence" || job.category === "Police";
      }

      return job.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen pb-24 text-gray-100">
      
      {/* HERO SECTION: Purple and Black Mix with Liquid Glass */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 border-b border-purple-500/15">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Verified Registry Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(25,12,45,0.7)] backdrop-blur-md border border-purple-400/25 text-purple-200 text-xs font-normal shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>🔥 Verified Sarkari Drops • Zero PDF Yapping • 2026 Batch</span>
          </div>

          {/* Headline with Coolors-Style Horizontal Left/Right Wave Bounce */}
          <div className="py-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
              <CoolorsElasticText
                text="Every Live Govt Job. Zero PDF Yapping. Instant Eligibility."
                className="hover:cursor-pointer"
              />
            </h1>
            <p className="hidden md:block text-xs text-purple-300/70 mt-3 font-normal">
              Hover across the letters above to watch them glide smoothly left and right with high-energy colors
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-purple-200/80 font-normal leading-relaxed">
            Real-time verified vacancies with 7th CPC in-hand salary flex, exam stages, and{" "}
            <span className="text-red-400 font-medium">red bold registration deadlines</span> so you never get cooked by dates.
          </p>

          {/* Quick Eligibility Cockpit CTA Box: Liquid Glass Panel */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="liquid-glass-panel p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <span className="text-xs font-medium uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  10-Second Vibe Check
                </span>
                <h3 className="text-sm sm:text-base font-medium text-white">
                  Wondering which Sarkari exams you actually qualify for?
                </h3>
                <p className="text-xs text-purple-200/70 font-normal">
                  Drop your 10th %, 12th %, or Degree year &amp; get instant matched jobs. No 50-page PDF scrolling.
                </p>
              </div>

              <Link
                href="/eligibility"
                prefetch={true}
                className="w-full sm:w-auto shrink-0 btn-glass-primary flex items-center justify-center gap-2 text-sm shadow-glass-button"
              >
                <span>Run Vibe Check</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER CONTROLS: Liquid Glass Blurred Panel */}
      <section className="sticky top-16 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="liquid-glass-panel p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="w-4 h-4 text-purple-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search exam (RRB, SSC), post name, or 10th/12th/degree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[rgba(12,5,22,0.7)] backdrop-blur-md border border-purple-400/25 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-purple-400 font-normal transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scrollable Category Filter Chips */}
          <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(isSelected && cat.value !== "All" ? "All" : cat.value);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-normal shrink-0 transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "btn-glass-primary text-white border-purple-300 font-medium shadow-md"
                      : "bg-[rgba(20,9,36,0.6)] backdrop-blur-md text-purple-200 hover:text-white border-purple-400/20 hover:border-purple-400/40"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                      isSelected
                        ? "bg-purple-950/80 text-purple-200"
                        : "bg-[rgba(14,6,26,0.8)] text-purple-300/70"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOBS FEED GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Counter and Active Filter Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-normal text-purple-200">
              Tracking <strong className="text-white font-medium">{filteredJobs.length}</strong> Live Sarkari Drops
              {selectedCategory !== "All" && (
                <span className="ml-1.5 text-xs text-purple-300 font-medium">
                  • Filter: {categories.find((c) => c.value === selectedCategory)?.label}
                </span>
              )}
            </span>
          </div>

          {/* Clear Filter button if filter active */}
          {(selectedCategory !== "All" || searchQuery.trim() !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Empty Search State */}
        {filteredJobs.length === 0 ? (
          <div className="liquid-glass-panel p-10 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-400/30 flex items-center justify-center mx-auto text-purple-300 text-xl">
              🔍
            </div>
            <h3 className="text-base font-medium text-white">No Sarkari drops found for this</h3>
            <p className="text-xs text-purple-200/70 font-normal">
              Zero live exams matched &ldquo;{searchQuery}&rdquo; in this category. Don&apos;t stress, clear the filter to see all drops!
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn-glass-primary text-xs"
            >
              Show All Live Drops
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
