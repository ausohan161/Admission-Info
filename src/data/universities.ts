import { AdmissionUnit, University } from "./types";

/**
 * NOTE ON DATA
 * ------------
 * No official admission circular data (dates, seats, eligibility, exam
 * pattern, result method, circular links) has been provided for this
 * project yet. To avoid publishing anything that looks like an official
 * announcement, every informational field below is left as `null` and is
 * rendered by the UI as "তথ্য প্রকাশিত হয়নি" (not published yet).
 *
 * A small number of units carry `isDemoData: true` with sample
 * application/exam dates ONLY, so the dynamic countdown, status-badge and
 * sorting/filtering features can be exercised end to end. Those dates are
 * clearly marked as demo data in the UI (a "ডেমো ডেটা" tag) and must be
 * replaced with real circular dates before this goes live.
 *
 * To add real data: edit the relevant AdmissionUnit fields below (or wire
 * this file up to an API/CMS later — the rest of the app only depends on
 * the shapes declared in `./types`).
 */

function emptyUnit(partial: Partial<AdmissionUnit> & { id: string }): AdmissionUnit {
  return {
    nameBn: null,
    applicationStart: null,
    applicationEnd: null,
    examDate: null,
    seats: null,
    eligibility: null,
    examPattern: null,
    subjects: [],
    resultMethod: null,
    circularUrl: null,
    ...partial,
  };
}

export const universities: University[] = [
  // ---------------------------------------------------------------------
  // ১. মেডিকেল অ্যান্ড ডেন্টাল কলেজ
  // ---------------------------------------------------------------------
  {
    id: "medical-dental",
    nameBn: "মেডিকেল ও ডেন্টাল কলেজ",
    nameEn: "Medical & Dental College Admission",
    shortName: "MBBS/BDS",
    category: "medical",
    admissionSession: "২০২৬-২৭",
    introBn: "সরকারি ও বেসরকারি মেডিকেল এবং ডেন্টাল কলেজে ভর্তি পরীক্ষা।",
    units: [
      emptyUnit({
        id: "default",
        applicationStart: "2026-10-01",
        applicationEnd: "2026-10-30",
        examDate: "2026-11-20",
        isDemoData: true,
      }),
    ],
  },
  {
    id: "armed-forces-medical",
    nameBn: "আর্মড ফোর্সেস মেডিকেল কলেজ",
    nameEn: "Armed Forces Medical College",
    shortName: "AFMC",
    category: "medical",
    subGroupBn: "আর্মড ফোর্সেস মেডিকেল কলেজ",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "army-medical",
    nameBn: "আর্মি মেডিকেল কলেজ",
    nameEn: "Army Medical College",
    shortName: "AMC",
    category: "medical",
    subGroupBn: "আর্মি মেডিকেল কলেজ",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "navy-medical",
    nameBn: "নেভি মেডিকেল কলেজ",
    nameEn: "Navy Medical College",
    shortName: "NMC",
    category: "medical",
    subGroupBn: "নেভি মেডিকেল কলেজ",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },

  // ---------------------------------------------------------------------
  // ২. ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয় (স্বতন্ত্র)
  // ---------------------------------------------------------------------
  {
    id: "buet",
    nameBn: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়",
    nameEn: "Bangladesh University of Engineering and Technology",
    shortName: "BUET",
    category: "engineering-independent",
    admissionSession: "২০২৬-২৭",
    units: [
      emptyUnit({
        id: "default",
        applicationStart: "2026-09-01",
        applicationEnd: "2026-09-15",
        examDate: "2026-10-01",
        isDemoData: true,
      }),
    ],
  },
  {
    id: "butex",
    nameBn: "বাংলাদেশ টেক্সটাইল বিশ্ববিদ্যালয়",
    nameEn: "Bangladesh University of Textiles",
    shortName: "BUTEX",
    category: "engineering-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "iut",
    nameBn: "ইসলামিক ইউনিভার্সিটি অব টেকনোলজি",
    nameEn: "Islamic University of Technology",
    shortName: "IUT",
    category: "engineering-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "mist",
    nameBn: "মিলিটারি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি",
    nameEn: "Military Institute of Science and Technology",
    shortName: "MIST",
    category: "engineering-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },

  // ---------------------------------------------------------------------
  // ৩. ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয় (গুচ্ছ)
  // ---------------------------------------------------------------------
  {
    id: "ruet",
    nameBn: "রাজশাহী প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    nameEn: "Rajshahi University of Engineering & Technology",
    shortName: "RUET",
    category: "engineering-cluster",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "kuet",
    nameBn: "খুলনা প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    nameEn: "Khulna University of Engineering & Technology",
    shortName: "KUET",
    category: "engineering-cluster",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "cuet",
    nameBn: "চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    nameEn: "Chittagong University of Engineering & Technology",
    shortName: "CUET",
    category: "engineering-cluster",
    admissionSession: "২০২৬-২৭",
    units: [
      emptyUnit({
        id: "default",
        applicationStart: "2026-08-01",
        applicationEnd: "2026-08-25",
        examDate: "2026-09-15",
        isDemoData: true,
      }),
    ],
  },

  // ---------------------------------------------------------------------
  // ৪. সাধারণ বিশ্ববিদ্যালয় (স্বতন্ত্র)
  // ---------------------------------------------------------------------
  {
    id: "du",
    nameBn: "ঢাকা বিশ্ববিদ্যালয়",
    nameEn: "University of Dhaka",
    shortName: "DU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [
      emptyUnit({
        id: "science",
        nameBn: "বিজ্ঞান ইউনিট",
        applicationStart: "2026-08-01",
        applicationEnd: "2026-09-10",
        examDate: "2026-10-05",
        isDemoData: true,
      }),
      emptyUnit({
        id: "arts",
        nameBn: "কলা, আইন ও সামাজিক বিজ্ঞান ইউনিট",
        applicationStart: "2026-09-05",
        applicationEnd: "2026-09-25",
        examDate: "2026-10-20",
        isDemoData: true,
      }),
      emptyUnit({
        id: "business",
        nameBn: "ব্যবসায় শিক্ষা ইউনিট",
        applicationStart: "2026-09-20",
        applicationEnd: "2026-10-10",
        examDate: "2026-11-05",
        isDemoData: true,
      }),
      emptyUnit({
        id: "fine-arts",
        nameBn: "চারুকলা ইউনিট",
        applicationStart: "2026-07-01",
        applicationEnd: "2026-07-20",
        examDate: "2026-08-15",
        isDemoData: true,
      }),
    ],
  },
  {
    id: "ju",
    nameBn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    nameEn: "Jahangirnagar University",
    shortName: "JU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "jnu",
    nameBn: "জগন্নাথ বিশ্ববিদ্যালয়",
    nameEn: "Jagannath University",
    shortName: "JnU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "ru",
    nameBn: "রাজশাহী বিশ্ববিদ্যালয়",
    nameEn: "University of Rajshahi",
    shortName: "RU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "cu",
    nameBn: "চট্টগ্রাম বিশ্ববিদ্যালয়",
    nameEn: "University of Chittagong",
    shortName: "CU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "bup",
    nameBn: "বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস",
    nameEn: "Bangladesh University of Professionals",
    shortName: "BUP",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "ku",
    nameBn: "খুলনা বিশ্ববিদ্যালয়",
    nameEn: "Khulna University",
    shortName: "KU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "cou",
    nameBn: "কুমিল্লা বিশ্ববিদ্যালয়",
    nameEn: "Comilla University",
    shortName: "CoU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },
  {
    id: "hstu",
    nameBn: "হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
    nameEn: "Hajee Mohammad Danesh Science and Technology University",
    shortName: "HSTU",
    category: "general-independent",
    admissionSession: "২০২৬-২৭",
    units: [emptyUnit({ id: "default" })],
  },

  // ---------------------------------------------------------------------
  // ৫. সাধারণ বিশ্ববিদ্যালয় (গুচ্ছ)
  // ---------------------------------------------------------------------
  {
    id: "gst-cluster",
    nameBn: "GST গুচ্ছ",
    nameEn: "General, Science & Technology (GST) Cluster",
    shortName: "GST",
    category: "general-cluster",
    admissionSession: "২০২৬-২৭",
    introBn: "সাধারণ, বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় গুচ্ছ ভর্তি পরীক্ষা (২৪টি বিশ্ববিদ্যালয়)।",
    units: [
      emptyUnit({
        id: "default",
        applicationStart: "2026-09-01",
        applicationEnd: "2026-09-17",
        examDate: "2026-10-15",
        isDemoData: true,
      }),
    ],
  },
  {
    id: "agriculture-cluster",
    nameBn: "কৃষি গুচ্ছ",
    nameEn: "Agriculture Cluster",
    shortName: "কৃষি গুচ্ছ",
    category: "general-cluster",
    admissionSession: "২০২৬-২৭",
    introBn: "কৃষি বিশ্ববিদ্যালয় গুচ্ছ ভর্তি পরীক্ষা (৯টি বিশ্ববিদ্যালয়)।",
    units: [emptyUnit({ id: "default" })],
  },
];

export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}

export function getUniversitiesByCategory(categoryId: string): University[] {
  return universities.filter((u) => u.category === categoryId);
}
