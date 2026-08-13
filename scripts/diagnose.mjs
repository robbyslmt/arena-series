// Diagnose flagged sites: console error texts + HTTP status of broken image URLs.
// Usage: node scripts/diagnose.mjs <baseUrl>
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:8399";
const FLAGGED = [
  "experimental-huizhou-changsha-landing-page",
  "unconventional-sanya-landing-page",
  "premium-jeju-landing-page",
  "premium-bangkok-landing-page",
  "xinjiang-immersive-landing-page",
  "indonesian-underwater-landing-page",
  "yogyakarta-destination-landing-page",
  "nyc-the-grid-landing-page",
];
const SLUGS = process.argv[3] ? process.argv[3].split(",") : FLAGGED;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
page.setDefaultTimeout(45000);

for (const slug of SLUGS) {
  console.log(`\n========== ${slug}`);
  const consoleMsgs = [];
  const onC = (m) => {
    if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(`[${m.type()}] ${m.text().slice(0, 220)}`);
  };
  page.on("console", onC);
  try {
    await page.goto(`${base}/sites/${slug}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const brokenSrcs = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => (i.currentSrc || i.src))
    );
    // status check each unique broken src
    const unique = [...new Set(brokenSrcs)];
    const statuses = [];
    for (const u of unique) {
      try {
        const r = await page.request.get(u, { timeout: 15000 });
        statuses.push(`${r.status()} ${u.slice(0, 110)}`);
      } catch (e) {
        statuses.push(`ERR ${u.slice(0, 110)}`);
      }
    }
    console.log("-- console errors/warnings (first 6):");
    consoleMsgs.slice(0, 6).forEach((m) => console.log("   ", m));
    console.log(`-- broken images: ${unique.length}`);
    statuses.forEach((s) => console.log("   ", s));
  } catch (e) {
    console.log("PAGE FAIL:", String(e).slice(0, 200));
  }
  page.off("console", onC);
}
await browser.close();