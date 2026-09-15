import { AdmissionUnit, ApplicationStatus } from "@/data/types";
import { daysUntil, isAfter, isBefore, isSameDay } from "./date";
import { toBanglaNumber } from "./bangla";

export interface StatusInfo {
  status: ApplicationStatus;
  labelBn: string;
  /** Tailwind classes for a small badge. */
  className: string;
}

export interface CountdownInfo {
  labelBn: string;
  daysLeft: number | null;
  /** Tailwind classes to color the countdown chip. */
  className: string;
  /** True once the exam date has passed. */
  isPast: boolean;
}

const STATUS_STYLES: Record<ApplicationStatus, { labelBn: string; className: string }> = {
  "not-started": {
    labelBn: "আবেদন শুরু হয়নি",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  ongoing: {
    labelBn: "আবেদন চলছে",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  "last-day": {
    labelBn: "আবেদনের শেষ দিন আজ",
    className: "bg-rose-100 text-rose-700 border-rose-200",
  },
  closed: {
    labelBn: "আবেদন শেষ",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  "upcoming-exam": {
    labelBn: "ভর্তি পরীক্ষা আসন্ন",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "exam-today": {
    labelBn: "আজ ভর্তি পরীক্ষা",
    className: "bg-gradient-to-r from-rose-600 to-orange-500 text-white border-transparent",
  },
  completed: {
    labelBn: "পরীক্ষা সম্পন্ন",
    className: "bg-slate-100 text-slate-500 border-slate-200",
  },
  unpublished: {
    labelBn: "তথ্য প্রকাশিত হয়নি",
    className: "bg-slate-50 text-slate-400 border-slate-200",
  },
};

/** Computes the current application status of a unit relative to todayISO. */
export function computeStatus(unit: AdmissionUnit, todayISO: string): StatusInfo {
  const { applicationStart, applicationEnd, examDate } = unit;

  const buildResult = (status: ApplicationStatus): StatusInfo => ({
    status,
    ...STATUS_STYLES[status],
  });

  if (!applicationStart && !applicationEnd && !examDate) {
    return buildResult("unpublished");
  }

  if (examDate && isSameDay(todayISO, examDate)) {
    return buildResult("exam-today");
  }

  if (examDate && isAfter(todayISO, examDate)) {
    return buildResult("completed");
  }

  if (applicationEnd && isSameDay(todayISO, applicationEnd)) {
    return buildResult("last-day");
  }

  if (applicationStart && isBefore(todayISO, applicationStart)) {
    return buildResult("not-started");
  }

  if (
    applicationStart &&
    applicationEnd &&
    !isBefore(todayISO, applicationStart) &&
    isBefore(todayISO, applicationEnd)
  ) {
    return buildResult("ongoing");
  }

  if (applicationEnd && isAfter(todayISO, applicationEnd)) {
    if (examDate) {
      const daysToExam = daysUntil(todayISO, examDate);
      if (daysToExam <= 15) return buildResult("upcoming-exam");
    }
    return buildResult("closed");
  }

  if (examDate && isBefore(todayISO, examDate)) {
    return buildResult("upcoming-exam");
  }

  return buildResult("unpublished");
}

/** Computes the "আর X দিন" style countdown chip for a unit's exam date. */
export function computeCountdown(unit: AdmissionUnit, todayISO: string): CountdownInfo {
  if (!unit.examDate) {
    return {
      labelBn: "তথ্য প্রকাশিত হয়নি",
      daysLeft: null,
      className: "bg-slate-50 text-slate-400 border-slate-200",
      isPast: false,
    };
  }

  const daysLeft = daysUntil(todayISO, unit.examDate);

  if (daysLeft < 0) {
    return {
      labelBn: "পরীক্ষা সম্পন্ন",
      daysLeft,
      className: "bg-slate-100 text-slate-500 border-slate-200",
      isPast: true,
    };
  }

  if (daysLeft === 0) {
    return {
      labelBn: "আজ পরীক্ষা",
      daysLeft,
      className: "bg-gradient-to-r from-rose-600 to-orange-500 text-white border-transparent font-semibold",
      isPast: false,
    };
  }

  if (daysLeft === 1) {
    return {
      labelBn: "আগামীকাল",
      daysLeft,
      className: "bg-rose-100 text-rose-700 border-rose-200 font-semibold",
      isPast: false,
    };
  }

  const banglaDays = toBanglaDaysLabel(daysLeft);

  if (daysLeft < 7) {
    return { labelBn: banglaDays, daysLeft, className: "bg-rose-50 text-rose-700 border-rose-200", isPast: false };
  }
  if (daysLeft < 15) {
    return { labelBn: banglaDays, daysLeft, className: "bg-amber-50 text-amber-700 border-amber-200", isPast: false };
  }
  return { labelBn: banglaDays, daysLeft, className: "bg-sky-50 text-sky-700 border-sky-200", isPast: false };
}

function toBanglaDaysLabel(days: number): string {
  return `আর ${toBanglaNumber(days)} দিন`;
}

/** Days remaining until an application deadline; null if unpublished. */
export function computeDeadlineDaysLeft(unit: AdmissionUnit, todayISO: string): number | null {
  if (!unit.applicationEnd) return null;
  const days = daysUntil(todayISO, unit.applicationEnd);
  return days;
}
