// Screenshot every site's top hero viewport (1280x820) + collect console/page errors.
// Doubles as the post-merge verification pass. Thumbnails must show the hero,
// not the largest image found later in the page.
// Usage: node scripts/screenshot-all.mjs <baseUrl> <outDir>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] ?? "http://localhost:8399";
const outDir = process.argv[3] ?? "scripts/thumbs"; // staging; merge.mjs copies into live-output/thumbs

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
];

mkdirSync(outDir, { recursive: true });
const report = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
page.setDefaultTimeout(45000);

for (const slug of SLUGS) {
  const url = `${base}/sites/${slug}/`;
  const entry = { slug, url, ok: false, pageErrors: 0, consoleErrors: 0, brokenImages: 0, brokenImageSrcs: [], title: null };
  try {
    const consoleErrors = [];
    const pageErrors = [];
    const onConsole = (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200));
    };
    const onPageError = (e) => pageErrors.push(String(e).slice(0, 200));
    page.on("console", onConsole);
    page.on("pageerror", onPageError);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    // allow fonts + hero video poster + lazy init
    await page.waitForTimeout(3500);
    // TWO scroll sweeps with yields (IO callbacks starve under sync sweeps; a
    // single sweep + settle still leaves below-fold lazy images unloaded)
    for (let pass = 0; pass < 2; pass++) {
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);
    }

    // HERO FRAME: always capture the actual top-of-page viewport. Previous
    // smart-framing centered on the largest image and made cards 03, 04, 05,
    // 08, 09, and 12 show lower sections instead of their hero screens.
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    await page.waitForTimeout(1000);

    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => (i.currentSrc || i.src).slice(0, 160))
    );
    entry.brokenImages = broken.length;
    entry.brokenImageSrcs = broken.slice(0, 5);
    entry.title = await page.title();
    entry.pageErrors = pageErrors.length;
    entry.consoleErrors = consoleErrors.length;

    await page.screenshot({
      path: join(outDir, `${slug}.jpg`),
      type: "jpeg",
      quality: 68,
    });
    entry.ok = true;

    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  } catch (e) {
    entry.error = String(e).slice(0, 300);
  }
  report.push(entry);
  console.log(
    `${entry.ok ? "OK " : "FAIL"} ${slug}  title="${entry.title}"  jsErrors=${entry.pageErrors + entry.consoleErrors}  brokenImgs=${entry.brokenImages}`
  );
}

await browser.close();
writeFileSync("scripts/screenshot-report.json", JSON.stringify(report, null, 2));
console.log("report: scripts/screenshot-report.json");