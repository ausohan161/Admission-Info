"use client";

import { Fragment, useEffect, useState } from "react";
import { applyDateOverrides } from "@/lib/dateOverrides";

/** Fetches `/dates.json` (an editable file sitting next to the built site on the
 * server) and applies it over the built-in dates, so dates can be changed from
 * cPanel/File Manager without rebuilding. Falls back silently to the built-in
 * dates if the file is missing or not valid JSON. */
export function DateOverridesProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/dates.json?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || typeof data !== "object") return;
        // Remount the tree only when something actually changed, so
        // memoised summaries recompute from the updated dates.
        if (applyDateOverrides(data) > 0) setVersion((v) => v + 1);
      })
      .catch((err) => console.warn("dates.json লোড করা যায়নি (JSON ভুল থাকতে পারে):", err));
    return () => {
      cancelled = true;
    };
  }, []);

  return <Fragment key={version}>{children}</Fragment>;
}
