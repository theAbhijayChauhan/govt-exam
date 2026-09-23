import { GOVT_JOBS } from "@/data/jobs";
import { 
  JobNotification, 
  UserEligibilityProfile, 
  EligibilityResult, 
  Category 
} from "./types";

export function checkEligibility(
  job: JobNotification,
  profile: UserEligibilityProfile
): EligibilityResult {
  const matchReasons: string[] = [];
  const failReasons: string[] = [];

  // 1. Calculate Age with Category Relaxation
  let ageRelaxationYears = 0;
  if (profile.category === "OBC") {
    ageRelaxationYears = job.ageRelaxation.obc;
  } else if (profile.category === "SC" || profile.category === "ST") {
    ageRelaxationYears = job.ageRelaxation.scSt;
  }

  const effectiveMaxAge = job.maxAge + ageRelaxationYears;

  if (profile.age < job.minAge) {
    failReasons.push(`Minimum age required is ${job.minAge} (You are ${profile.age})`);
  } else if (profile.age > effectiveMaxAge) {
    failReasons.push(
      `Age limit exceeded (Max ${effectiveMaxAge} yrs with ${profile.category} relaxation)`
    );
  } else {
    matchReasons.push(
      `Age ${profile.age} fits within ${job.minAge}-${effectiveMaxAge} yrs (${profile.category})`
    );
  }

  // 2. Educational Qualification Matching
  if (profile.qualification === "10th") {
    if (job.minQualification !== "10th") {
      failReasons.push(`Requires higher qualification (${job.minQualification})`);
    } else {
      if (job.minPercentage > 0 && profile.percentage10th < job.minPercentage) {
        failReasons.push(
          `Requires minimum ${job.minPercentage}% in 10th (You entered ${profile.percentage10th}%)`
        );
      } else {
        matchReasons.push(
          `10th Pass with ${profile.percentage10th}% meets criteria (${job.minPercentage === 0 ? "Passing marks" : `Min ${job.minPercentage}%`})`
        );
      }
    }
  } else if (profile.qualification === "12th") {
    if (job.minQualification === "Graduate" || job.minQualification === "PostGraduate") {
      failReasons.push(`Requires Graduate Degree`);
    } else if (job.minQualification === "10th") {
      // 12th pass candidate easily satisfies 10th requirement
      if (job.minPercentage > 0 && profile.percentage10th < job.minPercentage) {
        failReasons.push(`Requires ${job.minPercentage}% in 10th standard`);
      } else {
        matchReasons.push(`Your 12th qualification exceeds minimum 10th requirement`);
      }
    } else if (job.minQualification === "12th") {
      // Stream validation
      const userStream = profile.stream12th || "Any";
      const allowedStreams = job.allowed12thStreams || ["Any"];
      const isStreamOk = 
        allowedStreams.includes("Any") || 
        (userStream !== "Any" && allowedStreams.includes(userStream));

      if (!isStreamOk) {
        failReasons.push(
          `Requires 12th in ${allowedStreams.join(" / ")} (Your stream: ${userStream})`
        );
      } else {
        matchReasons.push(`12th stream matches requirements (${userStream})`);
      }

      // Percentage validation
      const user12thPct = profile.percentage12th ?? profile.percentage10th;
      if (job.minPercentage > 0 && user12thPct < job.minPercentage) {
        failReasons.push(
          `Requires minimum ${job.minPercentage}% in 12th (You entered ${user12thPct}%)`
        );
      } else {
        matchReasons.push(
          `12th score ${user12thPct}% qualifies (${job.minPercentage === 0 ? "Pass" : `Min ${job.minPercentage}%`})`
        );
      }
    }
  } else if (profile.qualification === "Degree") {
    const isCompleted = 
      !profile.currentYear || 
      profile.currentYear === "Completed / Graduate";
    const isFinalYear = profile.currentYear === "Final Year (Appearing)";
    const isEarlyYear = 
      profile.currentYear === "1st Year (Studying)" || 
      profile.currentYear === "2nd Year (Studying)" || 
      profile.currentYear === "3rd Year (Studying)";

    if (job.minQualification === "10th" || job.minQualification === "12th") {
      // Candidate has already passed 10th & 12th
      matchReasons.push(`You hold higher qualification, fully eligible for ${job.minQualification}-level post`);
    } else if (job.minQualification === "Graduate") {
      if (isEarlyYear) {
        failReasons.push(`Undergraduate (${profile.currentYear}) - this post requires Final Year or Completed Degree`);
      } else if (isFinalYear) {
        if (job.finalYearEligible) {
          matchReasons.push(`Final Year (Appearing) candidates are explicitly allowed to apply`);
        } else {
          failReasons.push(`Requires completed graduation before application cutoff date`);
        }
      } else if (isCompleted) {
        // Degree Percentage check
        const userDegPct = profile.degreePercentage ?? 60;
        if (job.minPercentage > 0 && userDegPct < job.minPercentage) {
          failReasons.push(`Requires minimum ${job.minPercentage}% in Graduation (You have ${userDegPct}%)`);
        } else {
          matchReasons.push(`Bachelor's degree with ${userDegPct}% qualifies`);
        }
      }
    }
  }

  const isEligible = failReasons.length === 0;

  return {
    job,
    isEligible,
    matchReasons,
    failReasons,
  };
}

export function matchAllJobs(profile: UserEligibilityProfile): {
  eligible: EligibilityResult[];
  ineligible: EligibilityResult[];
} {
  const results = GOVT_JOBS.map((job) => checkEligibility(job, profile));
  return {
    eligible: results.filter((r) => r.isEligible),
    ineligible: results.filter((r) => !r.isEligible),
  };
}
