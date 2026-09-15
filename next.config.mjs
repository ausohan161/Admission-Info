/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export — required for shared hosting (e.g. Hostinger) that has
  // no Node.js runtime. `npm run build` writes plain HTML/CSS/JS into `out/`,
  // which you upload as-is (see README.md for the exact steps).
  output: "export",
  // Folder/index.html per route (e.g. /university/du/index.html) so clean
  // URLs work on a static file server without extra rewrite rules.
  trailingSlash: true,
  images: {
    // next/image's optimizer needs a Node server; unoptimized just serves the
    // original file. Not used yet, but keeps this config safe if images are added later.
    unoptimized: true,
  },
};

export default nextConfig;
