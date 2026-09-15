"use client";

import { useEffect, useState } from "react";
import { getDhakaTodayISO } from "./date";

/** Returns today's ISO date in Asia/Dhaka, refreshing automatically at midnight so long-open tabs stay accurate. */
export function useToday(): string {
  const [today, setToday] = useState(getDhakaTodayISO);

  useEffect(() => {
    const scheduleNext = () => {
      const now = new Date();
      const dhakaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
      const msUntilMidnight =
        new Date(
          dhakaNow.getFullYear(),
          dhakaNow.getMonth(),
          dhakaNow.getDate() + 1,
          0,
          0,
          5
        ).getTime() - dhakaNow.getTime();

      const timeout = setTimeout(() => {
        setToday(getDhakaTodayISO());
        scheduleNext();
      }, Math.max(msUntilMidnight, 1000));

      return timeout;
    };

    const timeout = scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  return today;
}
