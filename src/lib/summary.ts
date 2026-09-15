import { FlatUnitRow, University } from "@/data/types";
import { computeStatus, computeDeadlineDaysLeft } from "./status";
import { daysUntil } from "./date";

export interface SummaryStats {
  totalInstitutions: number;
  ongoingCount: number;
  upcomingExamCount: number;
  examsThisWeekCount: number;
}

export function computeSummaryStats(
  universityList: University[],
  rows: FlatUnitRow[],
  todayISO: string
): SummaryStats {
  let ongoingCount = 0;
  let upcomingExamCount = 0;
  let examsThisWeekCount = 0;

  for (const { unit } of rows) {
    const { status } = computeStatus(unit, todayISO);
    if (status === "ongoing" || status === "last-day") ongoingCount++;
    if (status === "upcoming-exam" || status === "exam-today") upcomingExamCount++;
    if (unit.examDate) {
      const days = daysUntil(todayISO, unit.examDate);
      if (days >= 0 && days <= 7) examsThisWeekCount++;
    }
  }

  return {
    totalInstitutions: universityList.length,
    ongoingCount,
    upcomingExamCount,
    examsThisWeekCount,
  };
}

/** Nearest upcoming exams (today or later), soonest first. */
export function getUpcomingExams(rows: FlatUnitRow[], todayISO: string, limit = 5): FlatUnitRow[] {
  return rows
    .filter((row) => row.unit.examDate && daysUntil(todayISO, row.unit.examDate) >= 0)
    .sort((a, b) => daysUntil(todayISO, a.unit.examDate!) - daysUntil(todayISO, b.unit.examDate!))
    .slice(0, limit);
}

/** Every urgent application deadline within `withinDays`, soonest first — feeds the scrolling news ticker. */
export function getUrgentDeadlines(
  rows: FlatUnitRow[],
  todayISO: string,
  withinDays = 3
): FlatUnitRow[] {
  return rows
    .filter((row) => {
      const days = computeDeadlineDaysLeft(row.unit, todayISO);
      return days !== null && days >= 0 && days <= withinDays;
    })
    .sort(
      (a, b) =>
        computeDeadlineDaysLeft(a.unit, todayISO)! - computeDeadlineDaysLeft(b.unit, todayISO)!
    );
}
