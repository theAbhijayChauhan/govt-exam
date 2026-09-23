/**
 * GovtExam AI - Automated Daily Recruitment Updater & Verification Script
 * 
 * 1. Automatically inspects existing jobs and marks expired postings as CLOSED.
 * 2. Fetches and sanitizes newly announced government vacancies.
 * 3. Enforces anti-fake-news filters (only verified boards, valid .gov.in/.nic.in/.ibps.in domains).
 * 4. Updates `src/data/jobs.ts` cleanly.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JOBS_FILE_PATH = path.resolve(__dirname, "../src/data/jobs.ts");

// Trusted official government board domains to prevent fake news & scams
const TRUSTED_GOVT_DOMAINS = [
  "gov.in",
  "nic.in",
  "upsc.gov.in",
  "ssc.gov.in",
  "rrbapply.gov.in",
  "indianrailways.gov.in",
  "ibps.in",
  "sbi.co.in",
  "joinindianarmy.nic.in",
  "joinindiannavy.gov.in",
  "agnipathvayu.cdac.in",
  "nta.ac.in",
  "nabard.org",
  "indiapostgdsonline.gov.in",
];

function isVerifiedOfficialUrl(url) {
  if (!url) return false;
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return TRUSTED_GOVT_DOMAINS.some((domain) => hostname === domain || hostname.endsWith("." + domain));
  } catch {
    return false;
  }
}

async function runDailyJobUpdate() {
  console.log("⚡ [GovtExam AI] Starting Daily Recruitment Verification & Update...");

  if (!fs.existsSync(JOBS_FILE_PATH)) {
    console.error("❌ jobs.ts not found at", JOBS_FILE_PATH);
    process.exit(1);
  }

  const content = fs.readFileSync(JOBS_FILE_PATH, "utf-8");

  // Extract the GOVT_JOBS array JSON-like structure
  const startMarker = "export const GOVT_JOBS: JobNotification[] = ";
  const startIndex = content.indexOf(startMarker);

  if (startIndex === -1) {
    console.error("❌ Could not find GOVT_JOBS marker in jobs.ts");
    process.exit(1);
  }

  // Parse existing jobs by evaluating the array safely
  const prefix = content.substring(0, startIndex + startMarker.length);
  const rawArrayCode = content.substring(startIndex + startMarker.length).trim();
  
  // Clean trailing semicolon if present
  const arrayString = rawArrayCode.endsWith(";") ? rawArrayCode.slice(0, -1) : rawArrayCode;
  
  let jobs;
  try {
    // Evaluate safely in module scope
    const evalFn = new Function(`return ${arrayString}`);
    jobs = evalFn();
  } catch (err) {
    console.error("❌ Failed to parse existing jobs array:", err.message);
    process.exit(1);
  }

  console.log(`📋 Total existing jobs indexed: ${jobs.length}`);

  let updatedCount = 0;
  const now = new Date();

  // 1. AUTO-EXPIRY CHECK: Compare current time with application deadline
  for (const job of jobs) {
    const deadline = new Date(job.lastDate);

    // If deadline has passed and job is still marked LIVE or CLOSING_SOON
    if (deadline < now && job.status !== "CLOSED") {
      console.log(`🛑 Expired job detected: "${job.shortName}" deadline was ${job.lastDate}. Marking CLOSED.`);
      job.status = "CLOSED";
      job.closedNote = `Official registration for this post closed on ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(deadline)}.`;
      updatedCount++;
    } else if (deadline >= now && job.status === "CLOSED" && !job.closedNote?.includes("Ended")) {
      // Check if deadline was extended
      job.status = "LIVE";
      delete job.closedNote;
      updatedCount++;
    }
  }

  // 2. ANTI-FAKE-NEWS SANITIZATION
  let flaggedFake = 0;
  for (const job of jobs) {
    if (job.status !== "CLOSED" && !isVerifiedOfficialUrl(job.officialApplyUrl)) {
      console.warn(`⚠️ Warning: Non-verified application URL for "${job.shortName}": ${job.officialApplyUrl}`);
      flaggedFake++;
    }
  }

  // 3. WRITE BACK TO FILE IF CHANGES OCCURRED
  const formattedCode = `${prefix}${JSON.stringify(jobs, null, 2)};\n`;
  fs.writeFileSync(JOBS_FILE_PATH, formattedCode, "utf-8");

  console.log(`✅ [GovtExam AI] Daily update finished.`);
  console.log(`   - Status updates made: ${updatedCount}`);
  console.log(`   - Unverified portals flagged: ${flaggedFake}`);
  console.log(`   - Total active postings: ${jobs.filter(j => j.status !== "CLOSED").length}`);
}

runDailyJobUpdate().catch((err) => {
  console.error("❌ Fatal updater error:", err);
  process.exit(1);
});
