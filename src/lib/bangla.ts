const BN_DIGITS: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

/** Converts any ASCII-digit string/number to Bengali numerals. */
export function toBanglaNumber(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** Formats an ISO date (YYYY-MM-DD) as "২০ ডিসেম্বর ২০২৬". Returns null for null input. */
export function formatBanglaDate(iso: string | null): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return `${toBanglaNumber(d)} ${BN_MONTHS[m - 1]} ${toBanglaNumber(y)}`;
}

/** Formats an ISO date compactly, e.g. "২০ ডিসে, ২০২৬". */
export function formatBanglaDateShort(iso: string | null): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return `${toBanglaNumber(d)} ${BN_MONTHS[m - 1].slice(0, 3)}, ${toBanglaNumber(y)}`;
}
