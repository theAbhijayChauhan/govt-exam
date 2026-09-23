import React from "react";
import { Metadata } from "next";
import { EligibilityCockpit } from "@/components/EligibilityCockpit";
import { FileCheck2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instant Govt Job Eligibility Matcher (10th %, 12th %, Degree) | GovtExam AI",
  description: "Check exactly which live Central and State government jobs you qualify for. Match your 10th percentage, 12th stream, or Degree with appearing status and age relaxation.",
};

export default function EligibilityPage() {
  return (
    <main className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 pt-6 bg-black text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 font-normal">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Live Notifications</span>
          </Link>
          <span>/</span>
          <span className="text-gray-200 font-normal">Smart Eligibility Matcher</span>
        </div>

        {/* The Eligibility Engine Cockpit - Instant Render without blocking */}
        <EligibilityCockpit />

        {/* Informative Guidance Section */}
        <section className="amoled-panel p-6 sm:p-7 mt-8 space-y-5 bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-medium text-white">
              How the GovtExam AI Eligibility Engine Cuts Your Reading Time
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 font-normal">
            <div className="p-4 rounded-lg bg-[#000000] border border-[#1c1c1c] space-y-1.5">
              <h3 className="font-medium text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1f1f1f] text-gray-200 flex items-center justify-center text-xs">1</span>
                Exact Percentage Gates
              </h3>
              <p className="text-gray-400 leading-relaxed font-normal">
                Exams like Army Agniveer or Navy MR require strict board percentages. The engine matches your exact marks so you don&apos;t apply where you&apos;re ineligible.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#000000] border border-[#1c1c1c] space-y-1.5">
              <h3 className="font-medium text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1f1f1f] text-emerald-400 flex items-center justify-center text-xs">2</span>
                Appearing &amp; Final Year Support
              </h3>
              <p className="text-gray-400 leading-relaxed font-normal">
                College students in final year often wonder if they can sit for UPSC ESE, SBI SO, or AFCAT. The engine flags posts allowing appearing candidates vs those requiring completed degrees.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#000000] border border-[#1c1c1c] space-y-1.5">
              <h3 className="font-medium text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1f1f1f] text-amber-400 flex items-center justify-center text-xs">3</span>
                Official Age Relaxation
              </h3>
              <p className="text-gray-400 leading-relaxed font-normal">
                Automatically calculates central government age benefits (+3 years for OBC, +5 years for SC/ST) across all posts, saving you manual math from tabular annexures.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
