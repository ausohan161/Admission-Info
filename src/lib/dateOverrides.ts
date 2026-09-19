import { universities } from "@/data/universities";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

type DateField = "applicationStart" | "applicationEnd" | "examDate";
const FIELDS: DateField[] = ["applicationStart", "applicationEnd", "examDate"];

/** Applies the server-hosted `dates.json` on top of the built-in dates, in place.
 * Only well-formed YYYY-MM-DD strings override; blank/null/invalid values keep
 * the built-in date. Returns how many dates changed. */
export function applyDateOverrides(overrides: Record<string, unknown>): number {
  let changed = 0;
  for (const university of universities) {
    for (const unit of university.units) {
      const entry = overrides[`${university.id}/${unit.id}`];
      if (!entry || typeof entry !== "object") continue;
      for (const field of FIELDS) {
        const value = (entry as Record<string, unknown>)[field];
        if (value == null || value === "") continue;
        if (!isValidIsoDate(value)) {
          console.warn(`dates.json: "${university.id}/${unit.id}" → ${field}: "${String(value)}" বৈধ তারিখ নয় (YYYY-MM-DD লিখুন), উপেক্ষা করা হলো।`);
          continue;
        }
        if (unit[field] !== value) {
          unit[field] = value;
          unit.isDemoData = false;
          changed++;
        }
      }
    }
  }
  return changed;
}
