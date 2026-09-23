"use client";

import React from "react";
import Link from "next/link";
import { JobNotification } from "@/lib/types";
import { formatIndianDate } from "@/lib/utils";
import { UrgencyBadge } from "./UrgencyBadge";
import { 
  Building2, 
  Banknote, 
  GraduationCap, 
  ExternalLink, 
  FileText, 
  Share2, 
  CheckCircle2, 
  Layers, 
  Users,
  MapPin,
  AlertCircle
} from "lucide-react";

interface JobCardProps {
  job: JobNotification;
  matchReasons?: string[];
  failReasons?: string[];
  isEligible?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  matchReasons,
  failReasons,
  isEligible,
}) => {
  const isClosed = job.status === "CLOSED";

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = `Govt Job Alert: ${job.shortName} (${job.title})\n` +
      `Organization: ${job.organization}\n` +
      `Vacancies: ${job.totalVacancies.toLocaleString('en-IN')} Posts\n` +
      `Salary: ${job.salaryRange} (${job.payLevel})\n` +
      `Min Qualification: ${job.minQualification} Pass\n` +
      `${isClosed ? "STATUS: CLOSED" : `LAST DATE: ${formatIndianDate(job.lastDate)}`}\n\n` +
      `Check details & eligibility:\n${window.location.origin}/jobs/${job.slug}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Glassmorphic category colors on purple-black mix
  const categoryColorMap: Record<string, string> = {
    SSC: "border-purple-400/30 text-purple-200 bg-purple-950/40",
    UPSC: "border-amber-400/30 text-amber-200 bg-amber-950/40",
    Railways: "border-emerald-400/30 text-emerald-200 bg-emerald-950/40",
    Banking: "border-fuchsia-400/30 text-fuchsia-200 bg-fuchsia-950/40",
    Defence: "border-red-400/30 text-red-200 bg-red-950/40",
    Police: "border-teal-400/30 text-teal-200 bg-teal-950/40",
    Postal: "border-yellow-400/30 text-yellow-200 bg-yellow-950/40",
    PSU: "border-indigo-400/30 text-indigo-200 bg-indigo-950/40",
    Teaching: "border-purple-300/30 text-purple-200 bg-purple-950/40",
    "State PSC": "border-slate-400/30 text-slate-200 bg-slate-900/40",
  };

  return (
    <article className="liquid-glass-card p-5 sm:p-6 flex flex-col justify-between">
      
      {/* Top Header: Category Tag & Last Date in RED BOLD */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-md border ${
                categoryColorMap[job.category] || "border-purple-400/30 text-purple-200 bg-purple-950/40"
              }`}
            >
              {job.category}
            </span>
            <span className="text-[11px] font-normal text-purple-300/80 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" />
              {job.stateScope}
            </span>
          </div>

          {/* URGENT RED BOLD LAST DATE OR CLOSED STATUS */}
          <UrgencyBadge
            lastDate={job.lastDate}
            size="md"
            status={job.status}
            closedNote={job.closedNote}
          />
        </div>

        {/* Job Title & Organization */}
        <div className="mb-3.5">
          <h3 className="text-base sm:text-lg font-medium text-white tracking-normal hover:text-purple-300 transition-colors">
            <Link href={`/jobs/${job.slug}`}>
              {job.title}
            </Link>
          </h3>
          <p className="text-xs text-purple-300/70 flex items-center gap-1.5 mt-1 font-normal">
            <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{job.organization}</span>
          </p>
        </div>

        {/* Closed Notification Warning Banner if applicable */}
        {isClosed && (
          <div className="mb-3.5 p-2.5 rounded-lg bg-[#19091f]/80 backdrop-blur-md border border-purple-500/20 flex items-start gap-2 text-xs text-purple-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="font-normal leading-relaxed text-[11px]">
              {job.closedNote || "Official registration for this post has closed."}
            </span>
          </div>
        )}

        {/* Key Metrics Grid: Vacancies, Salary, Qualification in Frosted Glass Cells */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[rgba(14,6,26,0.65)] backdrop-blur-md border border-purple-400/15 mb-3.5 shadow-inner">
          
          {/* Vacancies */}
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" /> Seats / Vacancies
            </span>
            <p className="text-sm font-medium text-white">
              {job.totalVacancies.toLocaleString("en-IN")}{" "}
              <span className="text-xs font-normal text-purple-300/60">Seats</span>
            </p>
          </div>

          {/* Salary Scale */}
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
              <Banknote className="w-3 h-3 text-emerald-400" /> Pay Scale / Bag
            </span>
            <p className="text-sm font-medium text-emerald-300 truncate" title={job.salaryRange}>
              {job.salaryRange}
            </p>
            <p className="text-[10px] text-purple-300/60 font-normal truncate">{job.payLevel}</p>
          </div>

          {/* Qualification Requirement */}
          <div className="col-span-2 sm:col-span-1 space-y-0.5 pt-1 sm:pt-0 border-t sm:border-t-0 border-purple-400/10">
            <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-amber-400" /> Min Criteria
            </span>
            <p className="text-sm font-medium text-amber-200">
              {job.minQualification} Pass
              {job.minPercentage > 0 && (
                <span className="text-xs font-normal text-purple-300/60"> ({job.minPercentage}%)</span>
              )}
            </p>
            {job.finalYearEligible && (
              <span className="inline-block text-[10px] font-normal text-emerald-300 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                Final Year Eligible ✨
              </span>
            )}
          </div>
        </div>

        {/* Exam Structure Stages */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between text-xs font-normal text-purple-200 mb-1.5">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-purple-300/70 font-normal">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Selection Roadmap ({job.examStages.length} Rounds)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {job.examStages.map((stage, idx) => (
              <React.Fragment key={stage.stage}>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[rgba(16,7,30,0.7)] backdrop-blur-sm border border-purple-400/15 text-xs text-purple-100">
                  <span className="w-3.5 h-3.5 rounded bg-purple-800/60 text-purple-200 font-normal text-[9px] flex items-center justify-center">
                    {stage.stage}
                  </span>
                  <span className="font-normal text-[11px]">{stage.name}</span>
                </div>
                {idx < job.examStages.length - 1 && (
                  <span className="text-purple-500/60 text-xs">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Eligibility Feedback */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="mb-3.5 p-3 rounded-xl bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30">
            <span className="text-[11px] font-medium text-emerald-300 flex items-center gap-1 uppercase tracking-wide mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Why You Match (Huge W):
            </span>
            <ul className="text-xs text-emerald-200 space-y-1 list-disc list-inside font-normal">
              {matchReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {failReasons && failReasons.length > 0 && !isEligible && (
          <div className="mb-3.5 p-3 rounded-xl bg-red-950/40 backdrop-blur-md border border-red-500/30">
            <span className="text-[11px] font-medium text-red-300 flex items-center gap-1 uppercase tracking-wide mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" /> Why You Don&apos;t Match Yet:
            </span>
            <ul className="text-xs text-red-200 space-y-1 list-disc list-inside font-normal">
              {failReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Footer: Details Link, WhatsApp Share & Apply */}
      <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between gap-3 mt-1">
        <Link
          href={`/jobs/${job.slug}`}
          className="text-xs font-normal text-purple-300 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Full Breakdown &amp; Syllabus</span>
          <span className="text-xs">&rarr;</span>
        </Link>
        
        {/* Instant Eligibility Preselect Link */}
        <Link
          href={`/eligibility?preselect=${job.minQualification}`}
          prefetch={true}
          className="btn-glass-dark text-xs font-normal"
        >
          <span>Check If I Match</span>
        </Link>

        {/* Action Button Links */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="p-2 rounded-lg bg-[rgba(20,9,36,0.6)] hover:bg-[rgba(35,16,60,0.8)] border border-purple-400/25 text-emerald-400 transition-colors shadow-sm"
            title="Share on WhatsApp"
            aria-label="Share notification"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Official PDF */}
          <a
            href={job.officialPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[rgba(20,9,36,0.6)] hover:bg-[rgba(35,16,60,0.8)] border border-purple-400/25 text-xs font-normal text-purple-200 transition-colors"
            title="Download Official Notification PDF"
          >
            <FileText className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">PDF</span>
          </a>

          {/* Official Apply Online or Closed Status Link */}
          {isClosed ? (
            <span className="px-3 py-1.5 rounded-lg bg-[rgba(15,7,26,0.8)] border border-purple-500/20 text-xs font-normal text-purple-400/80">
              Registration Closed
            </span>
          ) : (
            <a
              href={job.officialApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-primary flex items-center gap-1.5 text-xs shadow-md"
            >
              <span>Apply Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
