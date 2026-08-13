// Airtight: catch ALL 404/FAILED network resources across every site
// (including video posters, bg images, fonts - not just <img>).
// Usage: node scripts/sweep-404.mjs <baseUrl>
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:8399";
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

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
page.setDefaultTimeout(45000);

const problems = new Map(); // url -> Set(site)

for (const slug of SLUGS) {
  const onResp = (r) => {
    if (r.status() >= 400 && !r.url().includes("favicon")) {
      if (!problems.has(r.url())) problems.set(r.url(), new Set());
      problems.get(r.url()).add(slug);
    }
  };
  const onFail = (r) => {
    const err = r.failure()?.errorText ?? "";
    if (!r.url().includes("favicon")) {
      if (!problems.has(r.url())) problems.set(r.url(), new Set());
      problems.get(r.url()).add(`${slug} [FAILED ${err}]`);
    }
  };
  page.on("response", onResp);
  page.on("requestfailed", onFail);
  try {
    await page.goto(`${base}/sites/${slug}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3000);
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
  } catch (e) {
    console.log("PAGE FAIL", slug, String(e).slice(0, 120));
  }
  page.off("response", onResp);
  page.off("requestfailed", onFail);
}

await browser.close();

console.log("\n=== ALL 4xx / FAILED RESOURCES (deduped) ===");
for (const [url, sites] of problems) {
  console.log(`${url}`);
  console.log(`    seen in: ${[...sites].join(", ")}`);
}
console.log(`\nTOTAL: ${problems.size} unique problem URLs`);