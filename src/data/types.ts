/**
 * Core data model for the Admission Calendar dataset.
 * Every date is an ISO string (YYYY-MM-DD) in Asia/Dhaka local time, or null
 * when the information has not been published yet. Nothing here should be
 * treated as an official source — always defer to the university's circular.
 */

export type CategoryId =
  | "medical"
  | "engineering-independent"
  | "engineering-cluster"
  | "general-independent"
  | "general-cluster";

export interface Category {
  id: CategoryId;
  slug: string;
  nameBn: string;
  shortNameBn: string;
}

export interface SubjectMark {
  nameBn: string;
  marks: number;
}

export interface SeatInfo {
  total: number | null;
  breakdown?: { nameBn: string; count: number }[];
}

export interface EligibilityInfo {
  descriptionBn: string | null;
  points?: string[];
}

export type StudentGroup = "science" | "commerce" | "arts";

/** Structured, numeric eligibility thresholds derived from `EligibilityInfo`'s
 * free text — powers the আবেদনযোগ্যতা চেকার's automatic matching. Kept
 * separate from `EligibilityInfo` (which stays free text for display) since
 * not every unit's requirements can be captured numerically; anything that
 * can't fit these fields goes in `noteBn` instead of being force-fit. */
export interface EligibilityCriteria {
  /** Which HSC background this unit accepts. "any" matches every group. */
  group: StudentGroup | "any";
  minSscGpa: number | null;
  minHscGpa: number | null;
  /** Minimum SSC + HSC combined GPA (out of 10), when the requirement is stated jointly. */
  minCombinedGpa: number | null;
  /** Per-subject HSC GPA floors, e.g. Physics ≥ 4. Only subjects with a stated minimum appear here. */
  subjectMinimums?: { subjectBn: string; minGpa: number }[];
  /** For "these N subjects must sum to at least X" rules (e.g. RUET: Higher Math +
   * Physics + Chemistry ≥ 14) that a flat per-subject minimum can't express. */
  subjectGroupMinTotal?: { subjectsBn: string[]; minTotal: number } | null;
  /** Anything that doesn't fit the numeric fields above (quota exceptions, grade-letter
   * requirements, etc.) — shown to the user as a caveat, not checked automatically. */
  noteBn?: string | null;
}

/** A single admission "unit" (e.g. বিজ্ঞান ইউনিট). Universities without
 * separate units still get exactly one AdmissionUnit with nameBn = null,
 * so the rest of the app can treat every university uniformly. */
export interface AdmissionUnit {
  id: string;
  nameBn: string | null;

  applicationStart: string | null;
  applicationEnd: string | null;
  examDate: string | null;

  /** Marks this unit's dates/info as placeholder data used only to
   * demonstrate the interface, since no official circular exists yet. */
  isDemoData?: boolean;

  seats: SeatInfo | null;
  eligibility: EligibilityInfo | null;
  /** Optional structured criteria for the আবেদনযোগ্যতা চেকার; absent when
   * the requirement can't be reduced to simple GPA thresholds. */
  eligibilityCriteria?: EligibilityCriteria | null;
  examPattern: string | null;
  subjects: SubjectMark[];
  resultMethod: string | null;
  circularUrl: string | null;
}

export interface University {
  id: string;
  nameBn: string;
  nameEn: string;
  shortName: string;
  category: CategoryId;
  /** Optional grouping label used within the medical category. */
  subGroupBn?: string;
  admissionSession: string;
  introBn?: string;
  units: AdmissionUnit[];
}

export type ApplicationStatus =
  | "not-started"
  | "ongoing"
  | "last-day"
  | "closed"
  | "upcoming-exam"
  | "exam-today"
  | "completed"
  | "unpublished";

export interface FlatUnitRow {
  university: University;
  unit: AdmissionUnit;
}
