# অ্যাডমিশন ক্যালেন্ডার

একনজরে বিশ্ববিদ্যালয়সমূহের ভর্তি পরীক্ষার সূচি ও তথ্য — বাংলাদেশের মেডিকেল, ইঞ্জিনিয়ারিং ও সাধারণ বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার তারিখ, আবেদনের সময়সীমা ও গুরুত্বপূর্ণ তথ্য একটি জায়গায় দেখার জন্য তৈরি একটি data-driven admission information portal।

## ⚠️ ডেটা সম্পর্কে গুরুত্বপূর্ণ নোট

এই প্রজেক্টে এখনো কোনো **official admission circular** থেকে তথ্য (তারিখ, আসনসংখ্যা, যোগ্যতা, পরীক্ষার ধরন, ফলাফল পদ্ধতি, সার্কুলার লিংক) সরবরাহ করা হয়নি। তাই:

- সব informational field ডিফল্টভাবে `null` রাখা হয়েছে এবং UI-তে **"তথ্য প্রকাশিত হয়নি"** দেখায়।
- ইন্টারফেসের dynamic ফিচার (countdown, status badge, sorting, deadline alert) প্রদর্শনের জন্য কিছু ইউনিটে `isDemoData: true` সহ নমুনা তারিখ যুক্ত করা হয়েছে — সেগুলোর পাশে একটি বেগুনি **"ডেমো ডেটা"** ট্যাগ দেখা যাবে। এগুলো বাস্তব সার্কুলার নয়।
- প্রকৃত তথ্য যুক্ত করতে শুধু `src/data/universities.ts` ফাইল সম্পাদনা করুন — কোনো UI কম্পোনেন্ট পরিবর্তনের প্রয়োজন নেই।

## টেক স্ট্যাক

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — Hind Siliguri (Bengali) টাইপোগ্রাফি
- **lucide-react** — আইকন
- সম্পূর্ণভাবে ক্লায়েন্ট-সাইড dynamic date logic (Asia/Dhaka timezone), কোনো ব্যাকএন্ড/ডেটাবেজ প্রয়োজন নেই
- **Static export** (`output: "export"`) — বিল্ড করলে plain HTML/CSS/JS ফাইল তৈরি হয়, তাই Hostinger-এর মতো যেকোনো সাধারণ (shared) হোস্টিং-এ Node.js ছাড়াই চলে

## প্রজেক্ট চালানো (নিজের কম্পিউটারে)

```bash
npm install
npm run dev       # http://localhost:3000
```

স্ট্যাটিক প্রোডাকশন বিল্ড তৈরি করা (Hostinger-এ আপলোডের জন্য):

```bash
npm run build     # তৈরি হবে: out/ ফোল্ডার (plain HTML/CSS/JS)
```

আপলোডের আগে লোকালি চেক করতে চাইলে:

```bash
npx serve out     # http://localhost:3000-এর মতো একটি লিংক দেখাবে
```

## ফোল্ডার স্ট্রাকচার

```
src/
  app/
    page.tsx                  # হোম পেজ — ৩টি প্রধান ট্যাব পরিচালনা করে
    layout.tsx                # রুট লেআউট, ফন্ট, SEO metadata
    globals.css
    university/[id]/page.tsx  # একটি নির্দিষ্ট বিশ্ববিদ্যালয়ের deep-link পেজ
    category/[slug]/page.tsx  # একটি ক্যাটাগরির deep-link পেজ

  data/
    types.ts                  # University, AdmissionUnit ইত্যাদি TypeScript টাইপ
    categories.ts              # ৫টি প্রধান ক্যাটাগরি
    universities.ts             # ⭐ সব বিশ্ববিদ্যালয়ের ডেটা — এখানেই এডিট করবেন

  lib/
    date.ts                   # Asia/Dhaka today, day-diff হিসাব
    bangla.ts                 # বাংলা সংখ্যা ও তারিখ ফরম্যাটিং
    status.ts                 # countdown ও application status গণনা
    summary.ts                # সামারি স্ট্যাটস, আসন্ন পরীক্ষা, deadline alert
    filters.ts                # সার্চ, ফিল্টার, সর্টিং লজিক
    flatten.ts                # University[] -> unit-ভিত্তিক row[]
    useToday.ts                # রিয়েল-টাইম "আজ" hook (মধ্যরাতে অটো-রিফ্রেশ)

  components/
    layout/                   # Header, Footer, MainTabs
    ui/                       # StatusBadge, CountdownBadge, EmptyState, ErrorState, Skeleton, DemoTag
    calendar/                 # Tab 1: একনজরে অ্যাডমিশন ক্যালেন্ডার
    category/                 # Tab 2: ক্যাটাগরি অনুযায়ী অ্যাডমিশন ক্যালেন্ডার
    info/                     # Tab 3: অ্যাডমিশন তথ্যকণিকা
```

## নতুন তথ্য/বিশ্ববিদ্যালয় যোগ করা

`src/data/universities.ts`-এ প্রতিটি বিশ্ববিদ্যালয় একটি `University` অবজেক্ট, যার ভেতরে এক বা একাধিক `units` থাকে। কোনো ইউনিট না থাকলেও একটিমাত্র ডিফল্ট `AdmissionUnit` (nameBn: null) ব্যবহার করা হয়, যাতে বাকি অ্যাপ সব বিশ্ববিদ্যালয়কে একই কাঠামোতে দেখতে পারে।

```ts
{
  id: "example-uni",
  nameBn: "উদাহরণ বিশ্ববিদ্যালয়",
  nameEn: "Example University",
  shortName: "EU",
  category: "general-independent",
  admissionSession: "২০২৬-২৭",
  units: [
    {
      id: "science",
      nameBn: "বিজ্ঞান ইউনিট",
      applicationStart: "2026-11-01",   // ISO ফরম্যাট (YYYY-MM-DD)
      applicationEnd: "2026-11-25",
      examDate: "2026-12-20",
      seats: { total: 1200 },
      eligibility: { descriptionBn: "..." },
      examPattern: "MCQ",
      subjects: [{ nameBn: "পদার্থবিজ্ঞান", marks: 25 }],
      resultMethod: "...",
      circularUrl: "https://...",
    },
  ],
}
```

তারিখ না জানা থাকলে `null` রাখুন — countdown/status স্বয়ংক্রিয়ভাবে "তথ্য প্রকাশিত হয়নি" দেখাবে, কোনো fake তথ্য দেখাবে না।

## Hostinger-এ লাইভ করা (Shared/Business হোস্টিং)

Hostinger-এর সাধারণ শেয়ার্ড হোস্টিংয়ে Node.js সার্ভার চলে না, কিন্তু এই সাইটটি **static export** হিসেবে বিল্ড হয় (`next.config.mjs`-এ `output: "export"` সেট করা আছে) — মানে বিল্ডের পর যা তৈরি হয় তা শুধু plain HTML/CSS/JS ফাইল, যেকোনো সাধারণ ওয়েব হোস্টিং-এই চলবে।

**প্রথমবার লাইভ করা:**

1. `npm run build` চালান — একটি `out/` ফোল্ডার তৈরি হবে।
2. Hostinger-এর **hPanel** → **Files** → **File Manager**-এ যান (অথবা FileZilla-এর মতো একটি FTP ক্লায়েন্ট ব্যবহার করুন, hPanel-এর "FTP Accounts" থেকে লগইন তথ্য পাবেন)।
3. আপনার ডোমেইনের **`public_html`** ফোল্ডারে ঢুকুন (সাবডোমেইন/অ্যাডঅন ডোমেইন হলে hPanel-এ দেখানো নির্দিষ্ট ফোল্ডারে)।
4. `out/` ফোল্ডারের **ভেতরের সব ফাইল ও ফোল্ডার** (যেমন `index.html`, `_next/`, `university/`, `category/` ইত্যাদি) `public_html`-এ আপলোড করুন — `out` ফোল্ডারটি নিজে নয়, ওর ভেতরের কন্টেন্ট আপলোড করবেন।
5. ব্যস, আপনার ডোমেইনে গিয়ে সাইটটি দেখা যাবে।

**পরবর্তীতে তথ্য আপডেট করার ধাপ:**

1. নিজের কম্পিউটারে `src/data/universities.ts` ফাইল এডিট করুন — নতুন তারিখ, আসনসংখ্যা, যোগ্যতা, সার্কুলার লিংক ইত্যাদি বসান (নিচের "নতুন তথ্য/বিশ্ববিদ্যালয় যোগ করা" অংশ দেখুন)।
2. আবার `npm run build` চালান — `out/` ফোল্ডার নতুন তথ্য দিয়ে regenerate হবে।
3. hPanel File Manager বা FTP দিয়ে `public_html`-এর পুরনো ফাইলগুলো নতুন `out/`-এর ফাইল দিয়ে replace করুন (পুরো ফোল্ডার আপলোড করে ওভাররাইট করাই সবচেয়ে নিরাপদ, যাতে পুরনো কোনো ফাইল রয়ে না যায়)।
4. সাইট রিফ্রেশ করলেই নতুন তথ্য দেখা যাবে (ব্রাউজার cache-এর কারণে না দেখা গেলে Ctrl+Shift+R দিয়ে হার্ড রিফ্রেশ করুন)।

**যা আপডেট করার জন্য rebuild/reupload লাগবে না:** প্রতিদিনের countdown ("বাকি দিন"), current status ("আবেদন চলছে" / "আবেদন শেষ" ইত্যাদি) — এগুলো ভিজিটরের ব্রাউজারে সরাসরি জাভাস্ক্রিপ্ট দিয়ে হিসাব হয় (আজকের তারিখের ভিত্তিতে), তাই প্রতিদিন এগুলো এমনিতেই সঠিক থাকবে, আলাদা করে rebuild করার দরকার নেই। শুধু **আসল তথ্য পরিবর্তন হলে** (নতুন সার্কুলার প্রকাশ, তারিখ বদল, নতুন বিশ্ববিদ্যালয় যোগ ইত্যাদি) rebuild + reupload করতে হবে।

**টিপস:**
- আপলোডের আগে `npx serve out` দিয়ে লোকালি চেক করে নিন সব ঠিক আছে কিনা।
- বড় পরিবর্তনের সময় পুরনো `public_html` ফোল্ডারের একটি ব্যাকআপ রাখুন (hPanel-এর "Backups" ফিচার থেকেও নেওয়া যায়), যাতে কিছু ভুল হলে সহজে ফিরিয়ে আনা যায়।
- বারবার ম্যানুয়ালি আপলোড করা ঝামেলার মনে হলে, Hostinger-এর কিছু প্ল্যানে hPanel → **Git** ফিচার দিয়ে একটি GitHub repo থেকে auto-deploy সেটআপ করা যায় — চাইলে এটি নিয়ে পরে আলাদাভাবে সাহায্য নিতে পারেন।

## ভবিষ্যতে API/CMS যুক্ত করা

`src/data/universities.ts`-এর `universities` অ্যারে এবং `getUniversityById` / `getUniversitiesByCategory` ফাংশন দুটোই বাকি অ্যাপের একমাত্র ডেটা-এন্ট্রি পয়েন্ট। এই ফাইলটিকে পরবর্তীতে একটি API কল বা CMS fetch দিয়ে প্রতিস্থাপন করলেই পুরো অ্যাপ কাজ করবে — কোনো কম্পোনেন্ট পরিবর্তনের প্রয়োজন নেই। রাউটিং structure (`/category/[slug]`, `/university/[id]`) আগে থেকেই SEO-friendly deep-link সাপোর্ট করে।

## জানা সীমাবদ্ধতা

- `npm audit`-এ Next.js-এর নিজস্ব বান্ডলড `postcss` (build-time dev dependency) এর একটি moderate/high অ্যাডভাইজরি থেকে যায়, যা কেবল Next.js 16-এ upgrade করলে সম্পূর্ণ সমাধান হয় — এটি একটি major breaking upgrade, তাই এই প্রজেক্টে অন্তর্ভুক্ত করা হয়নি। রানটাইমে ব্যবহারকারীর ব্রাউজারে এর কোনো প্রভাব নেই, শুধু বিল্ড-টাইম টুলিং সংক্রান্ত।
- Static export মোডে (`output: "export"`) API route বা server action ব্যবহার করা যায় না — ভবিষ্যতে যদি database/admin-panel-ভিত্তিক dynamic backend দরকার হয় (Node.js/VPS হোস্টিং-এ), তখন `next.config.mjs` থেকে `output: "export"` লাইনটি সরিয়ে ফেলতে হবে।
