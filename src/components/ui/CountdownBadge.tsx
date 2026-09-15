import { AdmissionUnit } from "@/data/types";
import { computeCountdown } from "@/lib/status";

export function CountdownBadge({ unit, today }: { unit: AdmissionUnit; today: string }) {
  const info = computeCountdown(unit, today);
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2.5 py-1 text-xs ${info.className}`}
    >
      {info.labelBn}
    </span>
  );
}
