// Extract candidate palette hexes + font families from every site in the series.
// Outputs a JSON report to scripts/palette-report.json for manual curation.
// Usage: node scripts/extract-palettes.mjs <arena-folder>
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const arena = process.argv[2] ?? "C:/Users/robby/Downloads/Arena AI";
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
];

const report = {};
for (const slug of SLUGS) {
  const dir = join(arena, slug);
  const cssPaths = [
    join(dir, "src", "index.css"),
    join(dir, "src", "App.css"),
    join(dir, "src", "styles.css"),
  ];
  let css = cssPaths.filter(existsSync).map((p) => readFileSync(p, "utf8")).join("\n");
  // also scan any css under src for hexes
  if (!css) {
    const srcDir = join(dir, "src");
    if (existsSync(srcDir)) {
      const walk = (d) => {
        for (const f of readdirSync(d)) {
          const p = join(d, f);
          if (f.endsWith(".css")) css += readFileSync(p, "utf8") + "\n";
          else if (f.endsWith(".tsx")) css += readFileSync(p, "utf8") + "\n";
        }
      };
      walk(srcDir);
    }
  }
  const hexes = {};
  const re = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  let m;
  while ((m = re.exec(css))) {
    let h = m[0].toLowerCase();
    if (h.length === 4) h = h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    hexes[h] = (hexes[h] ?? 0) + 1;
  }
  const sorted = Object.entries(hexes)
    .filter(([h]) => !["#ffffff", "#000000"].includes(h))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const fonts = [...css.matchAll(/family=([A-Za-z+ ]+)/g)].map((x) => x[1].replace(/\+/g, " ").split(":")[0]);
  report[slug] = { hexes: sorted, fonts: [...new Set(fonts)].slice(0, 6) };
}
const out = join(import.meta.dirname, "palette-report.json");
writeFileSync(out, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
console.log("written:", out);