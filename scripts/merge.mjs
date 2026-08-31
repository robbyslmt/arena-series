// Merge: dashboard dist -> live-output/index.html; each site dist -> live-output/sites/<slug>/index.html
// Usage: node scripts/merge.mjs
// Note: the old "SERIES INDEX" floating chip was removed 2026-08-14 per user request — no chip is injected anymore.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, cpSync } from "node:fs";
import { join } from "node:path";

const ARENA = "C:/Users/robby/Downloads/Arena AI";
const OUT = join(import.meta.dirname, "..", "live-output");

const SLUGS = [
  "experimental-huizhou-changsha-landing-page",
  "bali-tourism-landing-page",
  "unconventional-sanya-landing-page",
  "premium-jeju-landing-page",
  "tasikmalaya-immersive-web-design",
  "premium-tasikmalaya-landing-page",
  "premium-bangkok-landing-page",
  "xinjiang-immersive-landing-page",
  "indonesian-underwater-landing-page",
  "premium-chiang-mai-landing-page",
  "premium-phuket-landing-page",
  "yogyakarta-destination-landing-page",
  "nyc-the-grid-landing-page",
  "purnama-film-festival-landing-page",
  "archival-contact-sheet-portfolio",
  "benang-ikat-landing-page",
  "malacca-heritage-landing-page",
  "tana-toraja-landing-page",
  "tanah-coffee-landing-page",
  "kyoto-destination-landing-page",
];

// Non-destructive: never wipe the whole OUT tree (a mid-wipe EBUSY on Windows
// can gut live-output and leave no index.html). Only remove the two subdirs we
// always fully repopulate, then copy the dashboard index.html unconditionally.
rmSync(join(OUT, "sites"), { recursive: true, force: true });
rmSync(join(OUT, "thumbs"), { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, "sites"), { recursive: true });

const missing = [];

for (const slug of SLUGS) {
  const distDir = join(ARENA, slug, "dist");
  if (!existsSync(distDir)) {
    missing.push(slug);
    continue;
  }
  const destDir = join(OUT, "sites", slug);
  mkdirSync(destDir, { recursive: true });

  // 1) copy the WHOLE dist tree (index.html + public/ assets like images/)
  cpSync(distDir, destDir, { recursive: true });

  // 2) rewrite absolute root asset refs (/images/x.jpg, /videos/y.mp4, /fonts/z.woff2)
  //    -> relative (./images/x.jpg) so subpath hosting works. Only bare-root refs,
  //    never scheme-relative or already-relative ones.
  //    Also strip any legacy "SERIES INDEX" chip left from older builds.
  const indexPath = join(destDir, "index.html");
  let html = readFileSync(indexPath, "utf8");
  html = html.replace(/<!-- series index chip -->.*?<\/a>/gs, "");
  html = html.replace(/<a[^>]*>.*?SERIES INDEX.*?<\/a>/gs, "");
  html = html
    .replace(/(["'(])[ \t]*\/images\//g, "$1images/")
    .replace(/(["'(])[ \t]*\/videos\//g, "$1videos/")
    .replace(/(["'(])[ \t]*\/assets\//g, "$1assets/")
    .replace(/(["'(])[ \t]*\/fonts\//g, "$1fonts/")
    .replace(/(["'(])[ \t]*\/audio\//g, "$1audio/");
  writeFileSync(indexPath, html);
  console.log("merged:", slug);
}

// dashboard itself
const dash = join(import.meta.dirname, "..", "dist", "index.html");
if (existsSync(dash)) {
  copyFileSync(dash, join(OUT, "index.html"));
  console.log("merged: dashboard -> live-output/index.html");
} else {
  console.log("WARN: dashboard dist missing, build it first");
}

// thumbs staging -> live-output (merge wipes OUT, so thumbs must be re-staged)
const thumbsStaging = join(import.meta.dirname, "thumbs");
if (existsSync(thumbsStaging)) {
  cpSync(thumbsStaging, join(OUT, "thumbs"), { recursive: true });
  console.log("merged: thumbs -> live-output/thumbs");
} else {
  console.log("WARN: no scripts/thumbs staging; run screenshot-all.mjs first");
}

if (missing.length) console.log("MISSING DISTS:", missing.join(", "));
console.log("done:", OUT);
