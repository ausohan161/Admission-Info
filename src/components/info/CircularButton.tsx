import { ExternalLink, FileX2 } from "lucide-react";

export function CircularButton({
  url,
  solidClassName = "bg-indigo-600 hover:bg-indigo-700",
}: {
  url: string | null;
  /** Complete literal Tailwind classes for the solid background + hover state. */
  solidClassName?: string;
}) {
  if (!url) {
    return (
      <button
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-400"
      >
        <FileX2 className="h-4 w-4" aria-hidden />
        সার্কুলার প্রকাশিত হয়নি
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white shadow-sm transition-colors ${solidClassName}`}
    >
      অফিশিয়াল সার্কুলার দেখুন
      <ExternalLink className="h-4 w-4" aria-hidden />
    </a>
  );
}
