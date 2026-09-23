import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDaysLeft(lastDateStr: string): {
  daysLeft: number;
  isExpired: boolean;
  isUrgent: boolean;
  formattedText: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(lastDateStr);
  deadline.setHours(23, 59, 59, 999);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      daysLeft: 0,
      isExpired: true,
      isUrgent: false,
      formattedText: "Application Closed",
    };
  }

  if (diffDays === 0) {
    return {
      daysLeft: 0,
      isExpired: false,
      isUrgent: true,
      formattedText: "Closes TODAY!",
    };
  }

  if (diffDays === 1) {
    return {
      daysLeft: 1,
      isExpired: false,
      isUrgent: true,
      formattedText: "1 Day Left!",
    };
  }

  return {
    daysLeft: diffDays,
    isExpired: false,
    isUrgent: diffDays <= 7,
    formattedText: `${diffDays} Days Left`,
  };
}

export function formatIndianDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, "0");
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}
