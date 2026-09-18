"use client";

import { LayoutGrid, BookOpenText, ClipboardCheck } from "lucide-react";

export type MainTabId = "overview" | "info" | "eligibility";

const TABS: { id: MainTabId; labelBn: string; icon: React.ElementType }[] = [
  { id: "overview", labelBn: "একনজরে অ্যাডমিশন ক্যালেন্ডার", icon: LayoutGrid },
  { id: "info", labelBn: "অ্যাডমিশন তথ্যকণিকা", icon: BookOpenText },
  { id: "eligibility", labelBn: "আবেদনযোগ্যতা চেকার", icon: ClipboardCheck },
];

export function MainTabs({
  active,
  onChange,
}: {
  active: MainTabId;
  onChange: (tab: MainTabId) => void;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div
        role="tablist"
        aria-label="প্রধান মেনু"
        className="mx-auto grid max-w-7xl grid-cols-3 gap-1 px-2 py-2 sm:gap-2 sm:px-6"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-center text-[11px] font-semibold leading-tight transition-all sm:min-h-[64px] sm:flex-row sm:gap-2 sm:text-sm ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-card"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
              <span>{tab.labelBn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
