# অ্যাডমিশন ক্যালেন্ডার

একনজরে বিশ্ববিদ্যালয়সমূহের ভর্তি পরীক্ষার সূচি ও তথ্য — বাংলাদেশের মেডিকেল, ইঞ্জিনিয়ারিং ও সাধারণ বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার তারিখ, আবেদনের সময়সীমা ও গুরুত্বপূর্ণ তথ্য একটি জায়গায় দেখার জন্য তৈরি একটি data-driven admission information portal।

## ⚠️ ডেটা সম্পর্কে গুরুত্বপূর্ণ নোট

এই প্রজেক্টে এখনো কোনো **official admission circular** থেকে তথ্য (তারিখ, আসনসংখ্যা, যোগ্যতা, পরীক্ষার ধরন, ফলাফল পদ্ধতি, সার্কুলার লিংক) সরবরাহ করা হয়নি। তাই:

- সব informational field ডিফল্টভাবে `null` রাখা হয়েছে এবং UI-তে **"তথ্য প্রকাশিত হয়নি"** দেখায়।
- ইন্টারফেসের dynamic ফিচার (countdown, status badge, sorting, deadline alert) প্রদর্শনের জন্য কিছু ইউনিটে `isDemoData: true` সহ নমুনা তারিখ যুক্ত করা হয়েছে — সেগুলোর পাশে একটি বেগুনি **"ডেমো ডেটা"** ট্যাগ দেখা যাবে। এগুলো বাস্তব সার্কুলার নয়।
- প্রকৃত তথ্য যুক্ত করতে হয় **অ্যাডমিন প্যানেল (`/admin`)** ব্যবহার করুন, অথবা সরাসরি `src/data/universities/*.json` ফাইল এডিট করুন — নিচের "তথ্য আপডেট করা" অংশ দেখুন।

## টেক স্ট্যাক

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — Hind Siliguri (Bengali) টাইপোগ্রাফি
- **lucide-react** — আইকন
- সম্পূর্ণভাবে ক্লায়েন্ট-সাইড dynamic date logic (Asia/Dhaka timezone), কোনো ব্যাকএন্ড/ডেটাবেজ প্রয়োজন নেই
- **Static export** (`output: "export"`) — বিল্ড করলে plain HTML/CSS/JS ফাইল তৈরি হয়, তাই Hostinger-এর মতো যেকোনো সাধারণ (shared) হোস্টিং-এ Node.js ছাড়াই চলে
- **Decap CMS** (`/admin`) — যেকোনো জায়গা থেকে ব্রাউজারে লগইন করে তথ্য এডিট করার জন্য ওয়েব-ভিত্তিক অ্যাডমিন প্যানেল, প্রতিটি সেভ সরাসরি GitHub-এ কমিট হয়
- **GitHub Actions** — `main`-এ push হলেই স্বয়ংক্রিয়ভাবে বিল্ড হয়ে Hostinger-এ FTP দিয়ে ডিপ্লয় হয়ে যায়

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
    universities/              # ⭐ প্রতিটি প্রতিষ্ঠানের জন্য একটি JSON ফাইল — /admin CMS এখানেই লেখে
    universities.ts             # generated JSON ইম্পোর্ট করে + helper ফাংশন এক্সপোর্ট করে
    universities.generated.json # অটো-জেনারেটেড, .gitignore-এ আছে, হাতে এডিট করবেন না

scripts/
  build-data.js              # universities/*.json গুলো একত্র করে generated JSON বানায় (prebuild/predev-এ চলে)

public/
  admin/                     # Decap CMS অ্যাডমিন প্যানেল (index.html + config.yml)

cms-oauth/                   # আলাদাভাবে Cloudflare Pages-এ ডিপ্লয় করার জন্য — CMS লগইনের OAuth proxy

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

## তথ্য আপডেট করা

দুইভাবে তথ্য আপডেট করা যায়:

### পদ্ধতি ১ — অ্যাডমিন প্যানেল দিয়ে (সুপারিশকৃত)

`https://আপনার-ডোমেইন/admin` এ যান, GitHub দিয়ে লগইন করুন, "বিশ্ববিদ্যালয় / প্রতিষ্ঠান" থেকে যেটা এডিট করতে চান সেটা খুলুন (বা নতুন একটা "New universities" দিয়ে তৈরি করুন), ফর্ম পূরণ করে **Publish** চাপুন — সরাসরি GitHub-এ কমিট হয়ে যাবে এবং GitHub Actions স্বয়ংক্রিয়ভাবে বিল্ড করে Hostinger-এ লাইভ করে দেবে (২-৩ মিনিট লাগতে পারে)। কোনো কোড/টার্মিনাল লাগবে না — শুধু ব্রাউজার।

এই অ্যাডমিন প্যানেল প্রথমবার কাজ করার আগে একবার সেটআপ করতে হবে — নিচের **"অ্যাডমিন প্যানেল সেটআপ"** অংশ দেখুন।

### পদ্ধতি ২ — সরাসরি JSON ফাইল এডিট করে

প্রতিটি প্রতিষ্ঠানের তথ্য `src/data/universities/<id>.json` এ আলাদা ফাইলে থাকে (যেমন `buet.json`, `du.json`)। ফাইলটি সরাসরি এডিট করে `npm run dev` বা `npm run build` চালালেই পরিবর্তন প্রতিফলিত হবে (এই দুটো কমান্ডের আগে `scripts/build-data.js` অটোমেটিক চলে সব ফাইল একত্র করে)।

```json
{
  "id": "example-uni",
  "nameBn": "উদাহরণ বিশ্ববিদ্যালয়",
  "nameEn": "Example University",
  "shortName": "EU",
  "category": "general-independent",
  "admissionSession": "২০২৬-২৭",
  "units": [
    {
      "id": "science",
      "nameBn": "বিজ্ঞান ইউনিট",
      "applicationStart": "2026-11-01",
      "applicationEnd": "2026-11-25",
      "examDate": "2026-12-20",
      "seats": { "total": 1200 },
      "eligibility": { "descriptionBn": "..." },
      "examPattern": "MCQ",
      "subjects": [{ "nameBn": "পদার্থবিজ্ঞান", "marks": 25 }],
      "resultMethod": "...",
      "circularUrl": "https://..."
    }
  ]
}
```

তারিখ না জানা থাকলে `null` রাখুন — countdown/status স্বয়ংক্রিয়ভাবে "তথ্য প্রকাশিত হয়নি" দেখাবে, কোনো fake তথ্য দেখাবে না। **নতুন প্রতিষ্ঠান যোগ করতে**: `src/data/universities/` এ একটি নতুন `<id>.json` ফাইল তৈরি করুন — ফাইলের নাম আর ভেতরের `"id"` ফিল্ড অবশ্যই একই হতে হবে।

## অ্যাডমিন প্যানেল (CMS) সেটআপ — একবারের জন্য

অ্যাডমিন প্যানেল ([Decap CMS](https://decapcms.org)) GitHub-এ সরাসরি কমিট করে, তাই লগইনের জন্য একটি GitHub OAuth অ্যাপ ও একটি ছোট্ট (বিনামূল্যে) প্রক্সি সার্ভিস লাগে — কারণ Hostinger-এ কোনো সার্ভার নেই যেখানে এই লগইন হ্যান্ডশেক চালানো যায়। এটি **Cloudflare Pages**-এ (ফ্রি) হোস্ট হবে।

**ধাপ ১ — Cloudflare Pages-এ OAuth proxy ডিপ্লয় করা**

1. [dash.cloudflare.com](https://dash.cloudflare.com) এ একটি ফ্রি অ্যাকাউন্ট বানান/লগইন করুন।
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**।
3. আপনার GitHub অ্যাকাউন্ট কানেক্ট করে **ausohan161/Admission-Info** রিপো সিলেক্ট করুন।
4. বিল্ড সেটিংসে:
   - **Root directory**: `cms-oauth`
   - **Build command**: খালি রাখুন
   - **Build output directory**: `public`
5. **Save and Deploy** চাপুন। ডিপ্লয় শেষে একটি URL পাবেন, যেমন `https://admission-info-xyz.pages.dev` — এটা কপি করে রাখুন।

**ধাপ ২ — GitHub OAuth App তৈরি করা**

1. [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** → **New OAuth App**।
2. পূরণ করুন:
   - **Application name**: যা খুশি, যেমন `Admission Calendar CMS`
   - **Homepage URL**: `https://github.com/ausohan161/Admission-Info`
   - **Authorization callback URL**: ধাপ ১-এর URL + `/callback`, যেমন `https://admission-info-xyz.pages.dev/callback`
3. **Register application** চাপুন।
4. **Client ID** কপি করুন। **Generate a new client secret** চেপে **Client Secret**-ও কপি করুন (এটা শুধু একবারই দেখাবে)।

**ধাপ ৩ — Cloudflare Pages-এ secret বসানো**

1. Cloudflare Pages-এ ফিরে যান → আপনার প্রজেক্ট → **Settings** → **Environment variables**।
2. দুটো variable যোগ করুন (Production ও Preview দুই জায়গাতেই):
   - `GITHUB_CLIENT_ID` = ধাপ ২-এর Client ID
   - `GITHUB_CLIENT_SECRET` = ধাপ ২-এর Client Secret
3. **Save** করার পর প্রজেক্টটি একবার আবার Deploy করুন (Deployments ট্যাব থেকে "Retry deployment"), যাতে নতুন variable কার্যকর হয়।

**ধাপ ৪ — অ্যাডমিন প্যানেলকে এই URL-এর সাথে যুক্ত করা**

`public/admin/config.yml` ফাইলে `base_url: https://REPLACE-WITH-YOUR-CLOUDFLARE-PAGES-URL` লাইনটা ধাপ ১-এর আসল URL দিয়ে বদলে দিন (আমাকে URL দিলে আমি এডিট করে push করে দেব)। এরপর `git push` করলে (বা আমাকে বললে আমি করে দেব) সাইট বিল্ড হয়ে `/admin` কাজ করা শুরু করবে।

**যাচাই করা**: `https://আপনার-ডোমেইন/admin` এ গিয়ে "Login with GitHub" চাপুন — GitHub-এ authorize করলে অ্যাডমিন প্যানেল খুলে যাবে।

## Hostinger-এ লাইভ করা (Shared/Business হোস্টিং)

Hostinger-এর সাধারণ শেয়ার্ড হোস্টিংয়ে Node.js সার্ভার চলে না, কিন্তু এই সাইটটি **static export** হিসেবে বিল্ড হয় (`next.config.mjs`-এ `output: "export"` সেট করা আছে) — মানে বিল্ডের পর যা তৈরি হয় তা শুধু plain HTML/CSS/JS ফাইল, যেকোনো সাধারণ ওয়েব হোস্টিং-এই চলবে।

**প্রথমবার লাইভ করা:**

1. `npm run build` চালান — একটি `out/` ফোল্ডার তৈরি হবে।
2. Hostinger-এর **hPanel** → **Files** → **File Manager**-এ যান (অথবা FileZilla-এর মতো একটি FTP ক্লায়েন্ট ব্যবহার করুন, hPanel-এর "FTP Accounts" থেকে লগইন তথ্য পাবেন)।
3. আপনার ডোমেইনের **`public_html`** ফোল্ডারে ঢুকুন (সাবডোমেইন/অ্যাডঅন ডোমেইন হলে hPanel-এ দেখানো নির্দিষ্ট ফোল্ডারে)।
4. `out/` ফোল্ডারের **ভেতরের সব ফাইল ও ফোল্ডার** (যেমন `index.html`, `_next/`, `university/`, `category/` ইত্যাদি) `public_html`-এ আপলোড করুন — `out` ফোল্ডারটি নিজে নয়, ওর ভেতরের কন্টেন্ট আপলোড করবেন।
5. ব্যস, আপনার ডোমেইনে গিয়ে সাইটটি দেখা যাবে।

**পরবর্তীতে তথ্য আপডেট করার ধাপ (অ্যাডমিন প্যানেল সেটআপ করা থাকলে — সুপারিশকৃত):**

`/admin` এ লগইন করে এডিট করে Publish করুন — GitHub Actions ("Deploy to Hostinger" workflow, `.github/workflows/deploy.yml`) স্বয়ংক্রিয়ভাবে বিল্ড করে FTP দিয়ে Hostinger-এ আপলোড করে দেবে। কিছুই ম্যানুয়ালি করতে হবে না।

**পরবর্তীতে তথ্য আপডেট করার ধাপ (ম্যানুয়াল, অ্যাডমিন প্যানেল ছাড়া):**

1. `src/data/universities/<id>.json` ফাইল এডিট করুন।
2. `npm run build` চালান — `out/` ফোল্ডার নতুন তথ্য দিয়ে regenerate হবে।
3. hPanel File Manager বা FTP দিয়ে `public_html`-এর পুরনো ফাইলগুলো নতুন `out/`-এর ফাইল দিয়ে replace করুন।
4. সাইট রিফ্রেশ করলেই নতুন তথ্য দেখা যাবে (ব্রাউজার cache-এর কারণে না দেখা গেলে Ctrl+Shift+R দিয়ে হার্ড রিফ্রেশ করুন)।

**যা আপডেট করার জন্য rebuild/reupload লাগবে না:** প্রতিদিনের countdown ("বাকি দিন"), current status ("আবেদন চলছে" / "আবেদন শেষ" ইত্যাদি) — এগুলো ভিজিটরের ব্রাউজারে সরাসরি জাভাস্ক্রিপ্ট দিয়ে হিসাব হয় (আজকের তারিখের ভিত্তিতে), তাই প্রতিদিন এগুলো এমনিতেই সঠিক থাকবে। শুধু **আসল তথ্য পরিবর্তন হলে** (নতুন সার্কুলার প্রকাশ, তারিখ বদল, নতুন প্রতিষ্ঠান যোগ ইত্যাদি) rebuild + deploy লাগবে — যা অ্যাডমিন প্যানেল/GitHub Actions দিয়ে স্বয়ংক্রিয়ই হয়ে যায়।

**টিপস:**
- আপলোডের আগে `npx serve out` দিয়ে লোকালি চেক করে নিন সব ঠিক আছে কিনা।
- বড় পরিবর্তনের সময় পুরনো `public_html` ফোল্ডারের একটি ব্যাকআপ রাখুন (hPanel-এর "Backups" ফিচার থেকেও নেওয়া যায়), যাতে কিছু ভুল হলে সহজে ফিরিয়ে আনা যায়।

## জানা সীমাবদ্ধতা

- `npm audit`-এ Next.js-এর নিজস্ব বান্ডলড `postcss` (build-time dev dependency) এর একটি moderate/high অ্যাডভাইজরি থেকে যায়, যা কেবল Next.js 16-এ upgrade করলে সম্পূর্ণ সমাধান হয় — এটি একটি major breaking upgrade, তাই এই প্রজেক্টে অন্তর্ভুক্ত করা হয়নি। রানটাইমে ব্যবহারকারীর ব্রাউজারে এর কোনো প্রভাব নেই, শুধু বিল্ড-টাইম টুলিং সংক্রান্ত।
- Static export মোডে (`output: "export"`) API route বা server action ব্যবহার করা যায় না — ভবিষ্যতে যদি database-ভিত্তিক dynamic backend দরকার হয় (Node.js/VPS হোস্টিং-এ), তখন `next.config.mjs` থেকে `output: "export"` লাইনটি সরিয়ে ফেলতে হবে।
- অ্যাডমিন প্যানেল (`/admin`) কাজ করার আগে একবার বাইরের সেটআপ লাগে (GitHub OAuth App + Cloudflare Pages-এ `cms-oauth/` ডিপ্লয়) — "অ্যাডমিন প্যানেল (CMS) সেটআপ" অংশ দেখুন। সেটআপ না করা পর্যন্ত `/admin`-এ গেলে GitHub লগইন কাজ করবে না।
