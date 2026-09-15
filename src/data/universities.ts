import { University } from "./types";
import generated from "./universities.generated.json";

/**
 * NOTE ON DATA
 * ------------
 * The actual admission data now lives as one JSON file per institution in
 * `src/data/universities/*.json` — that's what the CMS at `/admin` edits
 * directly (each save is a git commit to that folder). This file just
 * imports the generated, aggregated array; it is regenerated automatically
 * before every `npm run dev` / `npm run build` by `scripts/build-data.js`
 * (see the "predev"/"prebuild" scripts in package.json) — never edit
 * `universities.generated.json` by hand, it gets overwritten.
 *
 * To edit data without the CMS, edit the relevant file directly under
 * `src/data/universities/` (one JSON object per institution, matching the
 * shapes in `./types`) and rerun `npm run dev` or `npm run build`.
 */
export const universities: University[] = generated as University[];

export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}

export function getUniversitiesByCategory(categoryId: string): University[] {
  return universities.filter((u) => u.category === categoryId);
}
