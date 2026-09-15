import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryId } from "@/data/types";
import { getUniversitiesByCategory } from "@/data/universities";
import { toBanglaNumber } from "@/lib/bangla";
import { getCategoryTheme } from "@/lib/categoryTheme";

export function CategoryGrid({ onSelect }: { onSelect: (id: CategoryId) => void }) {
  return (
    <div>
      <h2 className="mb-1 text-sm font-bold text-navy-900 sm:text-base">ক্যাটাগরি বেছে নিন</h2>
      <p className="mb-4 text-xs text-slate-500 sm:text-sm">
        একটি ক্যাটাগরিতে ক্লিক করে সংশ্লিষ্ট বিশ্ববিদ্যালয়সমূহের ভর্তি তথ্য দেখুন।
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((cat) => {
          const count = getUniversitiesByCategory(cat.id).length;
          const theme = getCategoryTheme(cat.id);
          const Icon = theme.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center justify-between gap-3 rounded-xl bg-white p-4 text-left shadow-soft ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-card hover:ring-2 ${theme.cardHoverRing}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.iconTile}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900 sm:text-base">{cat.nameBn}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{toBanglaNumber(count)}টি প্রতিষ্ঠান</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" aria-hidden />
            </button>
          );
        })}
      </div>
    </div>
  );
}
