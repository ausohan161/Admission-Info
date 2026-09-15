import { FlatUnitRow } from "@/data/types";
import { getCategoryById } from "@/data/categories";
import { computeStatus, computeDeadlineDaysLeft } from "./status";
import { daysUntil } from "./date";

export type StatusFilter = "all" | "ongoing" | "closed" | "upcoming-exam" | "completed";
export type SortKey = "nearest-exam" | "application-deadline" | "name";

export function searchRows(rows: FlatUnitRow[], query: string): FlatUnitRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(({ university, unit }) => {
    const category = getCategoryById(university.category);
    const haystack = [
      university.nameBn,
      university.nameEn,
      university.shortName,
      unit.nameBn ?? "",
      category?.nameBn ?? "",
      category?.shortNameBn ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterByStatus(rows: FlatUnitRow[], filter: StatusFilter, todayISO: string): FlatUnitRow[] {
  if (filter === "all") return rows;
  return rows.filter((row) => {
    const { status } = computeStatus(row.unit, todayISO);
    if (filter === "ongoing") return status === "ongoing" || status === "last-day";
    if (filter === "upcoming-exam") return status === "upcoming-exam" || status === "exam-today";
    if (filter === "closed") return status === "closed";
    if (filter === "completed") return status === "completed";
    return true;
  });
}

/** Ranks a days-left value so soonest-upcoming sorts first, already-passed dates sort after
 * all upcoming ones (most recently passed first), and unpublished (null) dates sort last. */
function dayRank(daysLeft: number | null): number {
  if (daysLeft === null) return Number.POSITIVE_INFINITY;
  if (daysLeft >= 0) return daysLeft;
  return 100000 - daysLeft; // negative (past) values sort after every upcoming value
}

export function sortRows(rows: FlatUnitRow[], sortKey: SortKey, todayISO: string): FlatUnitRow[] {
  const sorted = [...rows];
  if (sortKey === "name") {
    sorted.sort((a, b) => a.university.nameBn.localeCompare(b.university.nameBn, "bn"));
    return sorted;
  }
  if (sortKey === "application-deadline") {
    sorted.sort(
      (a, b) =>
        dayRank(computeDeadlineDaysLeft(a.unit, todayISO)) - dayRank(computeDeadlineDaysLeft(b.unit, todayISO))
    );
    return sorted;
  }
  // nearest-exam (default)
  sorted.sort((a, b) => {
    const da = a.unit.examDate ? daysUntil(todayISO, a.unit.examDate) : null;
    const db = b.unit.examDate ? daysUntil(todayISO, b.unit.examDate) : null;
    return dayRank(da) - dayRank(db);
  });
  return sorted;
}
