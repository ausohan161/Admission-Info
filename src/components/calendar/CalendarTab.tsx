"use client";

import { useMemo, useState } from "react";
import { universities } from "@/data/universities";
import { CategoryId } from "@/data/types";
import { flattenUnits } from "@/lib/flatten";
import { filterByStatus, searchRows, sortRows, SortKey, StatusFilter } from "@/lib/filters";
import { computeSummaryStats, getUrgentDeadlines, getUpcomingExams } from "@/lib/summary";
import { useToday } from "@/lib/useToday";
import { SummaryStatsBar } from "./SummaryStats";
import { DeadlineTicker } from "./DeadlineTicker";
import { UpcomingTests } from "./UpcomingTests";
import { TableToolbar } from "./TableToolbar";
import { AdmissionTable } from "./AdmissionTable";
import { AdmissionMobileList } from "./AdmissionMobileCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function CalendarTab() {
  const today = useToday();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("nearest-exam");

  const allRows = useMemo(() => flattenUnits(universities), []);
  const stats = useMemo(() => computeSummaryStats(universities, allRows, today), [allRows, today]);
  const upcomingExams = useMemo(() => getUpcomingExams(allRows, today, 5), [allRows, today]);
  const urgentDeadlines = useMemo(() => getUrgentDeadlines(allRows, today, 3), [allRows, today]);

  const visibleRows = useMemo(() => {
    let rows = allRows;
    if (category !== "all") rows = rows.filter((r) => r.university.category === category);
    rows = filterByStatus(rows, status, today);
    rows = searchRows(rows, query);
    rows = sortRows(rows, sort, today);
    return rows;
  }, [allRows, category, status, query, sort, today]);

  return (
    <div className="space-y-5" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
      <SummaryStatsBar stats={stats} />

      <DeadlineTicker rows={urgentDeadlines} today={today} />

      <UpcomingTests rows={upcomingExams} today={today} />

      <section>
        <h2 className="mb-3 text-sm font-bold text-navy-900 sm:text-base">
          সকল বিশ্ববিদ্যালয়ের ভর্তি সময়সূচি
        </h2>
        <TableToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="mt-4">
          {visibleRows.length === 0 ? (
            <EmptyState
              title="কোনো ফলাফল পাওয়া যায়নি"
              description="অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"
            />
          ) : (
            <>
              <AdmissionTable rows={visibleRows} today={today} />
              <AdmissionMobileList rows={visibleRows} today={today} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
