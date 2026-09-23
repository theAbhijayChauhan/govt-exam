import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { GOVT_JOBS } from "@/data/jobs";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { formatIndianDate } from "@/lib/utils";
import { 
  Building2, 
  Banknote, 
  GraduationCap, 
  ExternalLink, 
  FileText, 
  ArrowLeft, 
  Layers, 
  Users, 
  ShieldCheck, 
  Clock,
  AlertCircle
} from "lucide-react";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GOVT_JOBS.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = GOVT_JOBS.find((j) => j.slug === slug);

  if (!job) {
    return { title: "Job Notification Not Found | GovtExam AI" };
  }

  return {
    title: `${job.title} Recruitment 2026 - Last Date, Salary, Eligibility | GovtExam AI`,
    description: `Official notification for ${job.organization} - ${job.title}. ${job.totalVacancies.toLocaleString('en-IN')} vacancies. Salary: ${job.salaryRange}. Last Date: ${formatIndianDate(job.lastDate)}.`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = GOVT_JOBS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const isClosed = job.status === "CLOSED";

  // Google JobPosting JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.summary,
    "identifier": {
      "@type": "PropertyValue",
      "name": job.organization,
      "value": job.id,
    },
    "datePosted": `${job.applicationStartDate}T08:00:00+05:30`,
    "validThrough": `${job.lastDate}T23:59:59+05:30`,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.organization,
      "sameAs": job.officialApplyUrl,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": job.stateScope,
      },
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH",
      },
    },
    "educationRequirements": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": job.minQualification,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 pt-6 text-purple-100">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-purple-300/70 font-normal">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Notifications</span>
            </Link>
            <span>/</span>
            <span className="text-purple-400/50">{job.category}</span>
            <span>/</span>
            <span className="text-purple-200 font-normal truncate">{job.shortName}</span>
          </div>

          {/* Main Job Detail Container: Liquid Glass Panel */}
          <article className="liquid-glass-panel p-6 sm:p-8 space-y-7">
            
            {/* Header: Urgency & Organization */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-normal uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-950/70 text-purple-300 border border-purple-400/30">
                  {job.category} • {job.stateScope}
                </span>

                {/* RED BOLD LAST DATE OR CLOSED STATUS */}
                <UrgencyBadge
                  lastDate={job.lastDate}
                  size="lg"
                  status={job.status}
                  closedNote={job.closedNote}
                />
              </div>

              <h1 className="text-xl sm:text-3xl font-medium text-white tracking-normal leading-tight">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-purple-200/80 font-normal text-sm">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>{job.organization}</span>
              </div>
            </div>

            {/* Closed Notification Warning Banner if applicable */}
            {isClosed && (
              <div className="p-4 rounded-xl bg-[rgba(26,10,34,0.8)] backdrop-blur-md border border-purple-500/20 flex items-start gap-2.5 text-xs text-purple-200">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-medium text-white block">Application Registration Closed</span>
                  <p className="font-normal leading-relaxed text-purple-300/70">
                    {job.closedNote || "The registration window for this examination ended. Please verify current recruitment status on the official portal."}
                  </p>
                </div>
              </div>
            )}

            {/* Core Snapshot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[rgba(14,6,26,0.65)] backdrop-blur-md border border-purple-400/15">
              
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-purple-400" /> Total Posts
                </span>
                <p className="text-base font-medium text-white">
                  {job.totalVacancies.toLocaleString("en-IN")}
                </p>
                <span className="text-[11px] text-purple-300/60 font-normal">Official Vacancies</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
                  <Banknote className="w-3 h-3 text-emerald-400" /> Pay Scale
                </span>
                <p className="text-sm font-medium text-emerald-300 truncate" title={job.salaryRange}>
                  {job.salaryRange}
                </p>
                <span className="text-[11px] text-purple-300/60 font-normal truncate block">{job.payLevel}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-amber-400" /> Minimum Entry
                </span>
                <p className="text-sm font-medium text-amber-200">
                  {job.minQualification} Pass
                </p>
                <span className="text-[11px] text-purple-300/60 font-normal">
                  {job.minPercentage > 0 ? `Min ${job.minPercentage}% marks` : "Any Passing Marks"}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-normal text-purple-300/70 tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3 text-red-400" /> Age Bracket
                </span>
                <p className="text-sm font-medium text-white">
                  {job.minAge} - {job.maxAge} Yrs
                </p>
                <span className="text-[11px] text-purple-300/60 font-normal">+ Category Relaxation</span>
              </div>
            </div>

            {/* Summary Briefing */}
            <div className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wider text-purple-300/70">
                Official Gazette Overview
              </h2>
              <p className="text-sm text-purple-100 leading-relaxed font-normal">
                {job.summary}
              </p>
            </div>

            {/* Exam Structure */}
            <div className="space-y-3 pt-4 border-t border-purple-400/15">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <h2 className="text-base font-medium text-white">
                  Selection Process &amp; Exam Structure
                </h2>
              </div>

              <div className="space-y-2.5">
                {job.examStages.map((stage) => (
                  <div 
                    key={stage.stage}
                    className="p-3.5 rounded-xl bg-[rgba(14,6,26,0.65)] backdrop-blur-md border border-purple-400/15 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-purple-900/80 text-purple-200 font-normal text-xs flex items-center justify-center">
                        {stage.stage}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium text-white">{stage.name}</h3>
                        <span className="text-xs text-purple-300/70 font-normal">Mode: {stage.type} Evaluation</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-normal uppercase tracking-wider bg-[rgba(25,12,45,0.7)] text-purple-200 border border-purple-400/20">
                      {stage.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Highlights */}
            <div className="space-y-3 pt-4 border-t border-purple-400/15">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-medium text-white">
                  Eligibility &amp; Relaxation Criteria
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-purple-200 font-normal">
                <div className="p-3.5 rounded-xl bg-[rgba(14,6,26,0.65)] backdrop-blur-md border border-purple-400/15 space-y-1">
                  <span className="font-medium text-white block">Final Year / Appearing Policy:</span>
                  <span>{job.finalYearEligible ? "Appearing candidates can apply" : "Must possess passing certificate before cutoff date"}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[rgba(14,6,26,0.65)] backdrop-blur-md border border-purple-400/15 space-y-1">
                  <span className="font-medium text-white block">Category Age Relaxation:</span>
                  <span>OBC: +{job.ageRelaxation.obc} Yrs | SC/ST: +{job.ageRelaxation.scSt} Yrs | PwD: +{job.ageRelaxation.pwd} Yrs</span>
                </div>
              </div>
            </div>

            {/* Direct Action Hub */}
            <div className="pt-5 border-t border-purple-400/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <Link
                href={`/eligibility?preselect=${job.minQualification}`}
                prefetch={true}
                className="w-full sm:w-auto btn-glass-dark text-xs"
              >
                <span>Test My Profile Against This Exam</span>
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={job.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none btn-glass-dark flex items-center justify-center gap-1.5 text-xs text-purple-200"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-300" />
                  <span>Download PDF</span>
                </a>

                {isClosed ? (
                  <span className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[rgba(18,8,30,0.8)] border border-purple-400/20 text-xs text-purple-300/60 text-center font-normal">
                    Registration Closed
                  </span>
                ) : (
                  <a
                    href={job.officialApplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none btn-glass-primary flex items-center justify-center gap-2 text-xs shadow-md"
                  >
                    <span>Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </article>

        </div>
      </main>
    </>
  );
}
