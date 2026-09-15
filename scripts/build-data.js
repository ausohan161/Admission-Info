// Aggregates the per-university JSON files (edited by the CMS, one file per
// institution) in src/data/universities/ into a single generated JSON array
// that the app imports normally. Runs automatically before `next dev` and
// `next build` via the "predev"/"prebuild" npm lifecycle hooks — never edit
// universities.generated.json by hand, it is overwritten every run.
const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join(__dirname, "..", "src", "data", "universities");
const OUTPUT_FILE = path.join(__dirname, "..", "src", "data", "universities.generated.json");

function normalizeStringOrNull(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function normalizeSeats(seats) {
  if (!seats) return null;
  const total = typeof seats.total === "number" ? seats.total : null;
  const breakdown = Array.isArray(seats.breakdown)
    ? seats.breakdown
        .filter((b) => b && normalizeStringOrNull(b.nameBn))
        .map((b) => ({ nameBn: b.nameBn.trim(), count: typeof b.count === "number" ? b.count : 0 }))
    : [];
  if (total === null && breakdown.length === 0) return null;
  return { total, breakdown };
}

function normalizeEligibility(eligibility) {
  if (!eligibility) return null;
  const descriptionBn = normalizeStringOrNull(eligibility.descriptionBn);
  const points = Array.isArray(eligibility.points)
    ? eligibility.points
        .map((p) => (typeof p === "string" ? p : p && p.point))
        .filter((p) => normalizeStringOrNull(p))
        .map((p) => p.trim())
    : [];
  if (!descriptionBn && points.length === 0) return null;
  return { descriptionBn, points };
}

function normalizeUnit(unit) {
  return {
    id: unit.id,
    nameBn: normalizeStringOrNull(unit.nameBn),
    applicationStart: normalizeStringOrNull(unit.applicationStart),
    applicationEnd: normalizeStringOrNull(unit.applicationEnd),
    examDate: normalizeStringOrNull(unit.examDate),
    isDemoData: !!unit.isDemoData,
    seats: normalizeSeats(unit.seats),
    eligibility: normalizeEligibility(unit.eligibility),
    examPattern: normalizeStringOrNull(unit.examPattern),
    subjects: Array.isArray(unit.subjects)
      ? unit.subjects
          .filter((s) => s && normalizeStringOrNull(s.nameBn))
          .map((s) => ({ nameBn: s.nameBn.trim(), marks: typeof s.marks === "number" ? s.marks : 0 }))
      : [],
    resultMethod: normalizeStringOrNull(unit.resultMethod),
    circularUrl: normalizeStringOrNull(unit.circularUrl),
  };
}

function normalizeUniversity(uni) {
  return {
    id: uni.id,
    nameBn: uni.nameBn,
    nameEn: uni.nameEn,
    shortName: uni.shortName,
    category: uni.category,
    subGroupBn: normalizeStringOrNull(uni.subGroupBn) || undefined,
    admissionSession: uni.admissionSession,
    introBn: normalizeStringOrNull(uni.introBn) || undefined,
    units: Array.isArray(uni.units) && uni.units.length > 0
      ? uni.units.map(normalizeUnit)
      : [normalizeUnit({ id: "default" })],
  };
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Universities source directory not found: ${SOURCE_DIR}`);
  }

  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const universities = files.map((file) => {
    const fullPath = path.join(SOURCE_DIR, file);
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    } catch (err) {
      throw new Error(`Invalid JSON in ${file}: ${err.message}`);
    }
    if (!parsed.id) throw new Error(`${file} is missing required field "id"`);
    if (path.basename(file, ".json") !== parsed.id) {
      throw new Error(`${file}: filename must match the "id" field ("${parsed.id}")`);
    }
    return normalizeUniversity(parsed);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(universities, null, 2) + "\n", "utf8");
  console.log(`✓ Generated ${OUTPUT_FILE} from ${files.length} university file(s).`);
}

main();
