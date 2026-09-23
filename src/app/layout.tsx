import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CreatorContactWidget } from "@/components/CreatorContactWidget";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07020d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "GovtExam AI - Instant Government Job Eligibility & Live Notifications",
  description: "Check live Central and State government job eligibility in 5 seconds. Filter by 10th %, 12th %, or Degree with exact pay scale, exam patterns, and red bold application deadlines.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "govt jobs 2026",
    "rrb ntpc 2026 live",
    "ssc gd constable 10th pass",
    "10th pass govt jobs",
    "12th pass sarkari naukri",
    "graduate govt jobs",
    "railway rrb ntpc",
    "sbi specialist officer",
    "upsc ese engineering services",
    "govt exam last date alert"
  ],
  authors: [{ name: "GovtExam AI Team" }],
  creator: "GovtExam AI",
  publisher: "GovtExam AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GovtExam AI - Instant Govt Job Eligibility & Live Radar",
    description: "Instant eligibility matcher by 10th %, 12th %, or Degree. Live notification radar with red bold application deadlines.",
    siteName: "GovtExam AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovtExam AI - Instant Govt Job Eligibility Engine",
    description: "Instant eligibility matcher by 10th %, 12th %, or Degree with red bold deadlines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Structured Data for Search Engines & AI Models (SEO + AEO)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GovtExam AI",
    "url": "https://govtexam-ai.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://govtexam-ai.vercel.app/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the live government jobs for 10th pass in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently live 10th pass central government jobs include SSC GD Constable (39,481 posts in BSF, CISF, CRPF, SSB closing 14 October 2026), Railway RRB Technician, and Indian Army Agniveer GD Rally.",
        },
      },
      {
        "@type": "Question",
        "name": "Is Railway RRB NTPC application open for 12th pass students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Railway RRB NTPC Undergraduate CEN 06/2026 (3,445 posts) is currently LIVE from 21 September to 20 October 2026 for 12th pass candidates.",
        },
      },
      {
        "@type": "Question",
        "name": "Can final year college students apply for government exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, major recruitments such as UPSC Engineering Services Examination (ESE), SBI Specialist Officers (SO/PO), and AFCAT explicitly allow final year appearing students to apply.",
        },
      },
      {
        "@type": "Question",
        "name": "Has the India Post GDS 2026 application closed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, official registration for India Post GDS (44,228 vacancies) closed on 19 September 2026. State-wise merit lists and document verification are currently underway.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${roboto.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-purple-100 antialiased selection:bg-purple-600 selection:text-white font-normal relative">
        <Navbar />
        <div className="flex-1">{children}</div>
        
        {/* Persistent Floating Creator/Contact Widget in Bottom Right */}
        <CreatorContactWidget email="abhijeet.govtexamai@gmail.com" />
        
        {/* Purple & Black Mix Glass Footer */}
        <footer className="bg-[rgba(9,3,18,0.85)] backdrop-blur-xl border-t border-purple-500/20 mt-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 border border-purple-400/30 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-medium text-white">
                  GovtExam<span className="text-purple-400 font-normal">AI</span>
                </span>
                <p className="text-xs text-purple-300/70 font-normal">
                  Real-time verified recruitment intelligence platform.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-purple-300/80 font-normal">
              <Link href="/" className="hover:text-white transition-colors">
                Live Notifications
              </Link>
              <Link href="/eligibility" prefetch={true} className="hover:text-white transition-colors">
                Smart Eligibility Matcher
              </Link>
              <Link href="/llms.txt" className="hover:text-white transition-colors">
                AI Discovery (AEO)
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>

            <div className="text-xs text-purple-300/70 flex items-center gap-1.5 font-normal">
              <span>Verified Gazette Feeds</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">100% Free Open Platform</span>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-purple-500/10 text-[11px] text-purple-300/50 text-center font-normal">
            Disclaimer: GovtExam AI indexes verified public gazettes and recruitment boards (SSC, UPSC, RRB, IBPS, Defence). We are an independent educational intelligence initiative. Always verify with official portals linked on each card.
          </div>
        </footer>
      </body>
    </html>
  );
}
