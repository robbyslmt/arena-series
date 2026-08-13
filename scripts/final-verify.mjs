// FINAL verification: for every site, find broken <img>, HTTP-status-check each,
// and report ONLY real failures (404/403/ERR). 200 = lazy/hidden false negative.
// Usage: node scripts/final-verify.mjs <baseUrl>
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

let realFailures = 0;
for (const slug of SLUGS) {
  const consoleErrs = [];
  const onC = (m) => m.type() === "error" && consoleErrs.push(m.text().slice(0, 160));
  page.on("console", onC);
  try {
    await page.goto(`${base}/sites/${slug}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    for (let pass = 0; pass < 2; pass++) {
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 110));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
    }
    const brokenSrcs = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => (i.currentSrc || i.src))
    );
    const unique = [...new Set(brokenSrcs)];
    const bad = [];
    for (const u of unique) {
      let status = "?";
      try {
        const r = await page.request.get(u, { timeout: 20000 });
        status = String(r.status());
      } catch {
        status = "NETERR";
      }
      if (!["200", "206", "304"].includes(status)) bad.push(`${status} ${u.slice(0, 130)}`);
    }
    // filter console errors to non-404-favicon noise
    const realJs = consoleErrs.filter((e) => !/favicon/i.test(e));
    if (bad.length || realJs.length) {
      console.log(`\n${slug}`);
      bad.forEach((b) => { console.log("  REAL FAIL:", b); realFailures++; });
      realJs.slice(0, 4).forEach((e) => console.log("  JS ERR:", e));
    } else {
      console.log(`${slug}: CLEAN`);
    }
  } catch (e) {
    console.log(`\n${slug}: PAGE FAIL ${String(e).slice(0, 150)}`);
    realFailures++;
  }
  page.off("console", onC);
}
await browser.close();
console.log(`\n=== REAL FAILURES: ${realFailures} ===`);