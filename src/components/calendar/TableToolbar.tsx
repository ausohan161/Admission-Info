"use client";

import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryId } from "@/data/types";
import { StatusFilter } from "@/lib/filters";

const STATUS_OPTIONS: { value: StatusFilter; labelBn: string }[] = [
  { value: "all", labelBn: "সব অবস্থা" },
  { value: "ongoing", labelBn: "আবেদন চলছে" },
  { value: "closed", labelBn: "আবেদন শেষ" },
  { value: "upcoming-exam", labelBn: "পরীক্ষা আসন্ন" },
  { value: "completed", labelBn: "পরীক্ষা সম্পন্ন" },
];

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  category: CategoryId | "all";
  onCategoryChange: (v: CategoryId | "all") => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
}

const selectClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:py-2 sm:text-sm";

export function TableToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="বিশ্ববিদ্যালয় খুঁজুন — যেমন BUET, DU, GST"
          aria-label="বিশ্ববিদ্যালয় অনুসন্ধান"
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-base text-slate-700 sm:text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          aria-label="ক্যাটাগরি ফিল্টার"
          className={selectClass}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as CategoryId | "all")}
        >
          <option value="all">সব ক্যাটাগরি</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.shortNameBn}
            </option>
          ))}
        </select>

        <select
          aria-label="অবস্থা ফিল্টার"
          className={selectClass}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.labelBn}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
