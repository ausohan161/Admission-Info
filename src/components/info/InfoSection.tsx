import { ReactNode } from "react";

export function InfoSection({
  title,
  children,
  isEmpty,
  emptyText = "তথ্য প্রকাশিত হয়নি",
}: {
  title: string;
  children?: ReactNode;
  isEmpty: boolean;
  emptyText?: string;
}) {
  return (
    <div className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <h4 className="mb-2 text-sm font-bold text-navy-800">{title}</h4>
      {isEmpty ? <p className="text-sm text-slate-400">{emptyText}</p> : children}
    </div>
  );
}
