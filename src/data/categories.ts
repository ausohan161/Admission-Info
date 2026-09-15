import { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "medical",
    slug: "medical",
    nameBn: "মেডিকেল অ্যান্ড ডেন্টাল কলেজ",
    shortNameBn: "মেডিকেল",
  },
  {
    id: "engineering-independent",
    slug: "engineering-independent",
    nameBn: "ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয় (স্বতন্ত্র)",
    shortNameBn: "ইঞ্জিনিয়ারিং — স্বতন্ত্র",
  },
  {
    id: "engineering-cluster",
    slug: "engineering-cluster",
    nameBn: "ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয় (গুচ্ছ)",
    shortNameBn: "ইঞ্জিনিয়ারিং — গুচ্ছ",
  },
  {
    id: "general-independent",
    slug: "general-independent",
    nameBn: "সাধারণ বিশ্ববিদ্যালয় (স্বতন্ত্র)",
    shortNameBn: "সাধারণ — স্বতন্ত্র",
  },
  {
    id: "general-cluster",
    slug: "general-cluster",
    nameBn: "সাধারণ বিশ্ববিদ্যালয় (গুচ্ছ)",
    shortNameBn: "সাধারণ — গুচ্ছ",
  },
];

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
