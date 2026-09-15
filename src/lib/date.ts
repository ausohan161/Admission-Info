const DHAKA_TZ = "Asia/Dhaka";

/** Returns today's date as an ISO string (YYYY-MM-DD) in Asia/Dhaka, regardless of the visitor's own timezone. */
export function getDhakaTodayISO(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: DHAKA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date()); // en-CA -> YYYY-MM-DD
}

function isoToUtcMidnight(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Whole-day difference (b - a) between two ISO dates. Positive means b is after a. */
export function diffInDays(aISO: string, bISO: string): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((isoToUtcMidnight(bISO) - isoToUtcMidnight(aISO)) / MS_PER_DAY);
}

export function isSameDay(aISO: string, bISO: string): boolean {
  return aISO === bISO;
}

export function isBefore(aISO: string, bISO: string): boolean {
  return isoToUtcMidnight(aISO) < isoToUtcMidnight(bISO);
}

export function isAfter(aISO: string, bISO: string): boolean {
  return isoToUtcMidnight(aISO) > isoToUtcMidnight(bISO);
}

/** Days remaining until targetISO, measured from todayISO. Can be negative if the date has passed. */
export function daysUntil(todayISO: string, targetISO: string): number {
  return diffInDays(todayISO, targetISO);
}
