import { FlatUnitRow, University } from "@/data/types";

/** Flattens every university's units into one row-per-unit list, matching the overview table shape. */
export function flattenUnits(universityList: University[]): FlatUnitRow[] {
  const rows: FlatUnitRow[] = [];
  for (const university of universityList) {
    for (const unit of university.units) {
      rows.push({ university, unit });
    }
  }
  return rows;
}
