"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { universities } from "@/data/universities";
import { categories } from "@/data/categories";
import { StudentGroup } from "@/data/types";
import { getCategoryTheme } from "@/lib/categoryTheme";
import {
  CHECKER_SUBJECTS,
  CheckerSubject,
  EligibilityInput,
  EligibleUnitRow,
  findEligibleUnits,
  formatCriteriaSummary,
} from "@/lib/eligibility";
import { EmptyState } from "@/components/ui/EmptyState";
import { toBanglaNumber } from "@/lib/bangla";

const GROUP_OPTIONS: { value: StudentGroup; labelBn: string }[] = [
  { value: "science", labelBn: "বিজ্ঞান" },
  { value: "commerce", labelBn: "বাণিজ্য" },
  { value: "arts", labelBn: "মানবিক" },
];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base font-semibold text-navy-900 focus:border-purple-400 focus:ring-2 focus:ring-purple-100";

const CURRENT_YEAR = new Date().getFullYear();

export function EligibilityChecker() {
  const [group, setGroup] = useState<StudentGroup>("science");
  const [sscGpa, setSscGpa] = useState("");
  const [hscGpa, setHscGpa] = useState("");
  const [subjectGpas, setSubjectGpas] = useState<Partial<Record<CheckerSubject, string>>>({});
  const [sscYear, setSscYear] = useState("");
  const [hscYear, setHscYear] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submittedInput, setSubmittedInput] = useState<EligibilityInput | null>(null);

  const results = useMemo(() => {
    if (!submittedInput) return [];
    return findEligibleUnits(universities, submittedInput);
  }, [submittedInput]);

  const resultsByCategory = useMemo(() => {
    const map = new Map<string, EligibleUnitRow[]>();
    for (const row of results) {
      const list = map.get(row.university.category) ?? [];
      list.push(row);
      map.set(row.university.category, list);
    }
    return map;
  }, [results]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSubjects: Partial<Record<CheckerSubject, number>> = {};
    for (const subject of CHECKER_SUBJECTS) {
      const raw = subjectGpas[subject];
      if (raw && raw.trim() !== "") {
        const n = Number(raw);
        if (!Number.isNaN(n)) parsedSubjects[subject] = n;
      }
    }
    setSubmittedInput({
      group,
      sscGpa: Number(sscGpa) || 0,
      hscGpa: Number(hscGpa) || 0,
      subjectGpas: parsedSubjects,
      sscYear: Number(sscYear) || 0,
      hscYear: Number(hscYear) || 0,
      mobileNumber,
    });
  };

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
        <div className="bg-purple-600 px-4 py-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl">
            <ClipboardCheck className="h-5 w-5" aria-hidden />
            আবেদনযোগ্যতা যাচাই করুন
          </h2>
          <p className="mt-1 text-sm font-medium text-purple-100">
            আপনার জিপিএ দিন, কোন কোন বিশ্ববিদ্যালয়ে আবেদন করতে পারবেন তা সাথে সাথে দেখুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
          <div>
            <p className="mb-2 text-sm font-bold text-navy-900">গ্রুপ *</p>
            <div className="flex flex-wrap gap-2">
              {GROUP_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGroup(opt.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    group === opt.value
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.labelBn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy-900">SSC জিপিএ *</span>
              <input
                required
                type="number"
                min={0}
                max={5}
                step={0.01}
                placeholder="যেমন: ৫.০০"
                value={sscGpa}
                onChange={(e) => setSscGpa(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy-900">HSC জিপিএ *</span>
              <input
                required
                type="number"
                min={0}
                max={5}
                step={0.01}
                placeholder="যেমন: ৫.০০"
                value={hscGpa}
                onChange={(e) => setHscGpa(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          {group === "science" && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-navy-900">
                বিষয়ভিত্তিক HSC জিপিএ
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CHECKER_SUBJECTS.map((subject) => (
                  <label key={subject} className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-500">{subject}</span>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      step={0.01}
                      value={subjectGpas[subject] ?? ""}
                      onChange={(e) => setSubjectGpas((prev) => ({ ...prev, [subject]: e.target.value }))}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy-900">SSC পাসের সাল *</span>
              <input
                required
                type="number"
                min={2005}
                max={CURRENT_YEAR}
                step={1}
                placeholder={`যেমন: ${CURRENT_YEAR - 2}`}
                value={sscYear}
                onChange={(e) => setSscYear(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy-900">HSC পাসের সাল *</span>
              <input
                required
                type="number"
                min={2005}
                max={CURRENT_YEAR}
                step={1}
                placeholder={`যেমন: ${CURRENT_YEAR}`}
                value={hscYear}
                onChange={(e) => setHscYear(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-navy-900">মোবাইল নম্বর *</span>
            <input
              required
              type="tel"
              inputMode="numeric"
              pattern="01[3-9][0-9]{8}"
              maxLength={11}
              placeholder="যেমন: ০১৭xxxxxxxx"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 text-base font-extrabold text-white shadow-soft transition-opacity hover:opacity-90"
          >
            <CheckCircle2 className="h-5 w-5" aria-hidden />
            যাচাই করুন
          </button>
        </form>
      </div>

      {submittedInput && <ResultsSection resultsByCategory={resultsByCategory} totalCount={results.length} />}

      <p className="text-center text-xs font-medium text-slate-400">
        এই ফলাফল শুধুমাত্র জিপিএ-ভিত্তিক একটি প্রাথমিক অনুমান, যা ২০২৫ সালের ভর্তি বিজ্ঞপ্তির ধরন অনুসারে হিসাব করা হয়েছে। চূড়ান্ত সিদ্ধান্তের আগে সংশ্লিষ্ট বিশ্ববিদ্যালয়ের অফিসিয়াল সার্কুলার অবশ্যই যাচাই করুন।
      </p>
    </div>
  );
}

function ResultsSection({
  resultsByCategory,
  totalCount,
}: {
  resultsByCategory: Map<string, EligibleUnitRow[]>;
  totalCount: number;
}) {
  if (totalCount === 0) {
    return (
      <EmptyState
        title="আপনার দেওয়া তথ্য অনুযায়ী কোনো প্রতিষ্ঠানে যোগ্য পাওয়া যায়নি"
        description="জিপিএ ও গ্রুপ আবার যাচাই করে দেখুন, অথবা বিষয়ভিত্তিক জিপিএ যোগ করে চেষ্টা করুন।"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
        <p className="text-base font-extrabold text-emerald-800">
          আপনি মোট {toBanglaNumber(totalCount)}টি ইউনিটে আবেদনযোগ্য
        </p>
      </div>

      {categories.map((category) => {
        const rows = resultsByCategory.get(category.id);
        if (!rows || rows.length === 0) return null;
        const theme = getCategoryTheme(category.id);
        return (
          <div key={category.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
            <div className={`flex items-center justify-between px-4 py-3 text-white sm:px-5 ${theme.solid}`}>
              <h3 className="text-base font-extrabold sm:text-lg">{category.nameBn}</h3>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-sm font-bold">{toBanglaNumber(rows.length)}</span>
            </div>
            <ul className="divide-y divide-slate-200">
              {rows.map(({ university, unit, criteria }) => (
                <li key={`${university.id}-${unit.id}`} className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-base font-extrabold text-navy-900">
                        {university.nameBn}
                        <span className="ml-1.5 text-sm font-semibold text-slate-400">({university.shortName})</span>
                      </p>
                      {unit.nameBn && <p className="text-sm font-medium text-slate-500">{unit.nameBn}</p>}
                    </div>
                    <Link
                      href={`/university/${university.id}${unit.nameBn ? `?unit=${unit.id}` : ""}`}
                      className="inline-flex shrink-0 items-center gap-0.5 text-sm font-bold text-purple-600 hover:text-purple-800"
                    >
                      বিস্তারিত
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="mt-2 rounded-lg bg-slate-50 p-3">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                      সর্বনিম্ন যোগ্যতা
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-slate-700">
                      {formatCriteriaSummary(criteria, unit).map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                    {criteria.noteBn && <p className="mt-1.5 text-sm font-medium text-amber-700">টীকা: {criteria.noteBn}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
