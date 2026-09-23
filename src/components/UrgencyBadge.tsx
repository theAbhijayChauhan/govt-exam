import React from "react";
import { calculateDaysLeft, formatIndianDate } from "@/lib/utils";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

interface UrgencyBadgeProps {
  lastDate: string;
  size?: "sm" | "md" | "lg";
  status?: "LIVE" | "CLOSING_SOON" | "CLOSED";
  closedNote?: string;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({
  lastDate,
  size = "md",
  status,
  closedNote,
}) => {
  const { isExpired, isUrgent, formattedText } = calculateDaysLeft(lastDate);
  const formattedDate = formatIndianDate(lastDate);

  // If explicitly closed or date has passed
  if (status === "CLOSED" || isExpired) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-md closed-badge ${
          size === "lg" ? "px-3.5 py-1.5 text-xs" : "px-2.5 py-1 text-xs"
        }`}
        title={closedNote || "Registration window closed"}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
        <span className="text-gray-300 font-normal">Closed ({formattedDate})</span>
      </div>
    );
  }

  // Active / Live / Closing Soon: Highlight Last Date in RED BOLD
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg red-deadline-badge ${
        size === "lg" ? "px-3.5 py-1.5 text-sm" : size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"
      }`}
    >
      <Clock className={`text-red-400 shrink-0 ${size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
      <span className="text-red-300 font-normal">Last Date:</span>
      {/* High-contrast Red Bold */}
      <span className="font-bold text-red-100 bg-[#381014] px-1.5 py-0.5 rounded border border-[#dc2626]/50">
        {formattedDate}
      </span>
      <span
        className={`font-medium ml-0.5 px-2 py-0.5 rounded text-[11px] ${
          isUrgent || status === "CLOSING_SOON"
            ? "bg-[#b91c1c] text-white"
            : "bg-[#2b1013] text-red-300"
        }`}
      >
        {formattedText}
      </span>
    </div>
  );
};
