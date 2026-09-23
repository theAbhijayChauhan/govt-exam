export type QualificationLevel = "10th" | "12th" | "Degree";

export type Stream12th = "Any" | "Science PCM" | "Science PCB" | "Commerce" | "Arts";

export type StudyYear = 
  | "1st Year (Studying)" 
  | "2nd Year (Studying)" 
  | "3rd Year (Studying)" 
  | "Final Year (Appearing)" 
  | "Completed / Graduate";

export type Category = "General" | "OBC" | "SC" | "ST" | "EWS";

export type ExamCategory = 
  | "SSC" 
  | "UPSC" 
  | "Railways" 
  | "Banking" 
  | "Defence" 
  | "Police" 
  | "Postal" 
  | "Teaching" 
  | "PSU"
  | "State PSC";

export interface ExamStage {
  stage: number;
  name: string;
  type: "CBT" | "Descriptive" | "Physical" | "Typing" | "Interview" | "Merit";
}

export interface JobNotification {
  id: string;
  slug: string;
  title: string;
  shortName: string;
  organization: string;
  category: ExamCategory;
  stateScope: string; // "All India" or State name
  totalVacancies: number;
  salaryRange: string;
  payLevel: string;
  applicationStartDate: string;
  lastDate: string; // ISO date YYYY-MM-DD
  status: "LIVE" | "CLOSING_SOON" | "CLOSED";
  closedNote?: string; // E.g. "Registration Closed on 19 Sept - Merit List Ongoing"
  minQualification: "10th" | "12th" | "Diploma" | "Graduate" | "PostGraduate";
  allowed12thStreams?: Stream12th[];
  allowedDegrees?: string[];
  minPercentage: number; // e.g. 0 for no min, 50, 60
  finalYearEligible: boolean; // Can appearing students apply?
  minAge: number;
  maxAge: number;
  ageRelaxation: {
    obc: number;
    scSt: number;
    pwd: number;
  };
  examStages: ExamStage[];
  officialApplyUrl: string;
  officialPdfUrl: string;
  summary: string;
  featured?: boolean;
}

export interface UserEligibilityProfile {
  qualification: QualificationLevel;
  percentage10th: number;
  stream12th?: Stream12th;
  percentage12th?: number;
  degreeType?: string;
  currentYear?: StudyYear;
  degreePercentage?: number;
  category: Category;
  age: number;
}

export interface EligibilityResult {
  job: JobNotification;
  isEligible: boolean;
  matchReasons: string[];
  failReasons: string[];
}
