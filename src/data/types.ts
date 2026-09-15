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
