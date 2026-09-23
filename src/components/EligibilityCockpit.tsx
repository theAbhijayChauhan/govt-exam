"use client";

import React, { useState, useMemo } from "react";
import { 
  QualificationLevel, 
  Stream12th, 
  StudyYear, 
  Category, 
  UserEligibilityProfile 
} from "@/lib/types";
import { matchAllJobs } from "@/lib/eligibility-matcher";
import { POPULAR_DEGREES, STUDY_YEARS } from "@/data/degrees";
import { JobCard } from "./JobCard";
import { 
  Award, 
  CheckCircle, 
  XCircle,
  Sparkles
} from "lucide-react";

interface EligibilityCockpitProps {
  initialQualification?: QualificationLevel;
}

export const EligibilityCockpit: React.FC<EligibilityCockpitProps> = ({
  initialQualification = "10th"
}) => {
  // Selected Qualification Option (10th, 12th, or Degree)
  const [selectedQualification, setSelectedQualification] = useState<QualificationLevel>(initialQualification);

  // Profile Inputs
  const [percentage10th, setPercentage10th] = useState<number>(65);
  const [stream12th, setStream12th] = useState<Stream12th>("Science PCM");
  const [percentage12th, setPercentage12th] = useState<number>(68);
  const [selectedDegree, setSelectedDegree] = useState<string>("B.Tech / B.E. (All Engineering Streams)");
  const [currentYear, setCurrentYear] = useState<StudyYear>("Final Year (Appearing)");
  const [degreePercentage, setDegreePercentage] = useState<number>(65);
  
  // Demographics
  const [category, setCategory] = useState<Category>("General");
  const [age, setAge] = useState<number>(22);

  // View Filter: All Matched vs Non-eligible
  const [showIneligible, setShowIneligible] = useState<boolean>(false);

  // Memoized Profile
  const profile: UserEligibilityProfile = useMemo(() => ({
    qualification: selectedQualification,
    percentage10th,
    stream12th,
    percentage12th,
    degreeType: selectedDegree,
    currentYear,
    degreePercentage,
    category,
    age,
  }), [
    selectedQualification,
    percentage10th,
    stream12th,
    percentage12th,
    selectedDegree,
    currentYear,
    degreePercentage,
    category,
    age
  ]);

  // Instant In-Memory Filter (< 1ms)
  const { eligible, ineligible } = useMemo(() => matchAllJobs(profile), [profile]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Heading: Liquid Glass Panel */}
      <div className="liquid-glass-panel p-6 sm:p-7">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-medium uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            10-Second Eligibility Vibe Check • Zero PDF Yapping
          </span>
          <h1 className="text-xl sm:text-3xl font-medium text-white tracking-normal">
            Find Your Sarkari Exam Matches (No PDF Scrolling)
          </h1>
          <p className="text-purple-200/80 text-xs sm:text-sm font-normal leading-relaxed">
            Drop your marks, stream &amp; college year below. We crunch reservation relaxations, percentage cutoffs, and appearing rules in &lt;1ms so you only see active jobs with 
            <span className="text-red-400 font-medium"> red bold application deadlines</span>.
          </p>
        </div>

        {/* 3 Main Qualification Selector Options */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* OPTION 1: 10th (Matriculation) */}
          <button
            type="button"
            onClick={() => setSelectedQualification("10th")}
            className={`p-4 rounded-xl flex flex-col items-start text-left transition-all border ${
              selectedQualification === "10th"
                ? "bg-purple-900/40 border-purple-400 text-white shadow-lg backdrop-blur-md"
                : "bg-[rgba(16,7,30,0.6)] border-purple-400/20 hover:border-purple-400/40 text-purple-200"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-400/30 flex items-center justify-center font-normal text-purple-200 text-xs">
                10th
              </span>
              {selectedQualification === "10th" && (
                <span className="text-[10px] font-normal uppercase text-purple-200 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-400/30">
                  Active Vibe
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-white">10th Pass Gang</span>
            <span className="text-xs text-purple-300/70 mt-1 font-normal">
              SSC GD Constable, RRB Technician, Army Agniveer
            </span>
          </button>

          {/* OPTION 2: 12th (Intermediate / +2) */}
          <button
            type="button"
            onClick={() => setSelectedQualification("12th")}
            className={`p-4 rounded-xl flex flex-col items-start text-left transition-all border ${
              selectedQualification === "12th"
                ? "bg-purple-900/40 border-purple-400 text-white shadow-lg backdrop-blur-md"
                : "bg-[rgba(16,7,30,0.6)] border-purple-400/20 hover:border-purple-400/40 text-purple-200"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-400/30 flex items-center justify-center font-normal text-amber-300 text-xs">
                12th
              </span>
              {selectedQualification === "12th" && (
                <span className="text-[10px] font-normal uppercase text-purple-200 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-400/30">
                  Active Vibe
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-white">12th Pass Hustle</span>
            <span className="text-xs text-purple-300/70 mt-1 font-normal">
              RRB NTPC (3.4k Seats Live), Delhi Police, Navy SSR
            </span>
          </button>

          {/* OPTION 3: Degree List & Year of Study */}
          <button
            type="button"
            onClick={() => setSelectedQualification("Degree")}
            className={`p-4 rounded-xl flex flex-col items-start text-left transition-all border ${
              selectedQualification === "Degree"
                ? "bg-purple-900/40 border-purple-400 text-white shadow-lg backdrop-blur-md"
                : "bg-[rgba(16,7,30,0.6)] border-purple-400/20 hover:border-purple-400/40 text-purple-200"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-400/30 flex items-center justify-center font-normal text-emerald-300 text-xs">
                Deg
              </span>
              {selectedQualification === "Degree" && (
                <span className="text-[10px] font-normal uppercase text-purple-200 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-400/30">
                  Active Vibe
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-white">College &amp; Grad Flex</span>
            <span className="text-xs text-purple-300/70 mt-1 font-normal">
              RRB NTPC (8.1k Seats Live), SBI SO, UPSC ESE, NABARD
            </span>
          </button>
        </div>

        {/* Dynamic Parameter Customizer: Frosted Glass Panel */}
        <div className="mt-6 p-5 rounded-2xl bg-[rgba(12,5,22,0.6)] backdrop-blur-md border border-purple-400/15 space-y-5">
          
          {/* 10TH OPTION CONTROLS */}
          {selectedQualification === "10th" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Your 10th (Matriculation) Board Percentage:
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="33"
                    max="100"
                    value={percentage10th}
                    onChange={(e) => setPercentage10th(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded-lg bg-[rgba(20,9,36,0.8)] border border-purple-400/30 text-white font-medium text-center text-sm focus:outline-none focus:border-purple-300"
                  />
                  <span className="text-white text-sm">%</span>
                </div>
              </div>

              <input
                type="range"
                min="35"
                max="100"
                value={percentage10th}
                onChange={(e) => setPercentage10th(Number(e.target.value))}
                className="w-full h-1.5 bg-purple-950/80 rounded appearance-none cursor-pointer accent-purple-400"
              />

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-purple-300/70 font-normal">Quick Presets:</span>
                {[45, 55, 60, 70, 80, 90, 95].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => setPercentage10th(pct)}
                    className={`px-2.5 py-0.5 rounded-lg font-normal transition-colors ${
                      percentage10th === pct
                        ? "btn-glass-primary text-white"
                        : "bg-[rgba(20,9,36,0.6)] text-purple-200 hover:bg-purple-900/40 border border-purple-400/20"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 12TH OPTION CONTROLS */}
          {selectedQualification === "12th" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Select Your 12th Standard Subject Group:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(["Science PCM", "Science PCB", "Commerce", "Arts", "Any"] as Stream12th[]).map((stream) => (
                    <button
                      type="button"
                      key={stream}
                      onClick={() => setStream12th(stream)}
                      className={`px-3 py-2 rounded-xl text-xs font-normal text-center transition-all border ${
                        stream12th === stream
                          ? "btn-glass-primary text-white border-purple-300 font-medium shadow-md"
                          : "bg-[rgba(20,9,36,0.6)] text-purple-200 hover:bg-purple-900/40 border-purple-400/20"
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Your 12th Percentage:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="33"
                      max="100"
                      value={percentage12th}
                      onChange={(e) => setPercentage12th(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg bg-[rgba(20,9,36,0.8)] border border-purple-400/30 text-white font-medium text-center text-sm focus:outline-none focus:border-purple-300"
                    />
                    <span className="text-white text-sm">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={percentage12th}
                  onChange={(e) => setPercentage12th(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-950/80 rounded appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>
          )}

          {/* DEGREE OPTION CONTROLS */}
          {selectedQualification === "Degree" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Select Your Degree / Field of Study:
                </label>
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(20,9,36,0.8)] backdrop-blur-md border border-purple-400/30 text-white text-sm focus:outline-none focus:border-purple-300 font-normal cursor-pointer"
                >
                  {POPULAR_DEGREES.map((deg) => (
                    <option key={deg} value={deg} className="bg-[#0f051c] text-white">
                      {deg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Which Year Are You Currently Studying In?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {STUDY_YEARS.map((year) => (
                    <button
                      type="button"
                      key={year}
                      onClick={() => setCurrentYear(year)}
                      className={`px-3 py-2 rounded-xl text-xs font-normal text-center transition-all border ${
                        currentYear === year
                          ? "btn-glass-primary text-white border-purple-300 font-medium shadow-md"
                          : "bg-[rgba(20,9,36,0.6)] text-purple-200 hover:bg-purple-900/40 border-purple-400/20"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                {currentYear === "Final Year (Appearing)" && (
                  <p className="text-xs text-emerald-300 mt-2 flex items-center gap-1.5 font-normal">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Verified: Exams like UPSC ESE, SBI SO/PO allow Final Year appearing students to register!
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium text-white">
                    Graduation Aggregate Score:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="35"
                      max="100"
                      value={degreePercentage}
                      onChange={(e) => setDegreePercentage(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg bg-[rgba(20,9,36,0.8)] border border-purple-400/30 text-white font-medium text-center text-sm focus:outline-none focus:border-purple-300"
                    />
                    <span className="text-white text-sm">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={degreePercentage}
                  onChange={(e) => setDegreePercentage(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-950/80 rounded appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>
          )}

          {/* Demographics: Age & Category */}
          <div className="pt-4 border-t border-purple-400/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 uppercase tracking-wider mb-1.5">
                Reservation Category (For Age Relaxation):
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["General", "OBC", "SC", "ST", "EWS"] as Category[]).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-1 rounded-lg text-xs font-normal text-center transition-all border ${
                      category === cat
                        ? "btn-glass-primary text-white border-purple-300 font-medium"
                        : "bg-[rgba(20,9,36,0.6)] text-purple-200 hover:text-white border-purple-400/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-purple-300/70 mt-1 block font-normal">
                {category === "OBC" && "+3 Years standard upper-age relaxation calculated"}
                {category === "SC" && "+5 Years standard upper-age relaxation calculated"}
                {category === "ST" && "+5 Years standard upper-age relaxation calculated"}
                {category === "General" && "Standard General / UR age limits apply"}
                {category === "EWS" && "Standard General age limits apply"}
              </span>
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-purple-300/80 uppercase tracking-wider">
                  Your Current Age:
                </label>
                <span className="font-medium text-purple-200 text-sm">{age} Years Old</span>
              </div>
              <input
                type="range"
                min="16"
                max="45"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-1.5 bg-purple-950/80 rounded appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] text-purple-300/60 mt-1 font-normal">
                <span>16 Yrs</span>
                <span>25 Yrs</span>
                <span>35 Yrs</span>
                <span>45 Yrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH RESULTS SECTION */}
      <div className="space-y-4">
        
        {/* Results Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl liquid-glass-panel">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-medium text-white flex items-center gap-2">
                <span>🎉 {eligible.length} Sarkari Drops Matched</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-normal bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                  Huge W • 100% Eligible
                </span>
              </h2>
              <p className="text-xs text-purple-300/70 font-normal">
                Matched for: {selectedQualification}, {age} yrs old, {category} category
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowIneligible(!showIneligible)}
            className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all border ${
              showIneligible
                ? "bg-red-950/60 border-red-500/40 text-red-200"
                : "btn-glass-dark text-purple-200 hover:text-white"
            }`}
          >
            {showIneligible ? "Hide Non-Matches" : `Show Missed Jobs (${ineligible.length})`}
          </button>
        </div>

        {/* Eligible Job Cards Grid: Liquid Glass Blurred Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {eligible.map((res) => (
            <JobCard
              key={res.job.id}
              job={res.job}
              isEligible={true}
              matchReasons={res.matchReasons}
            />
          ))}
        </div>

        {/* Ineligible Jobs Section */}
        {showIneligible && ineligible.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-purple-200 font-normal text-sm">
              <XCircle className="w-4 h-4 text-red-400" />
              <span>Notifications You Miss Qualification For:</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 opacity-80">
              {ineligible.map((res) => (
                <JobCard
                  key={res.job.id}
                  job={res.job}
                  isEligible={false}
                  failReasons={res.failReasons}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
