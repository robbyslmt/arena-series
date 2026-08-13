import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8399/sites/premium-phuket-landing-page/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
await page.evaluate(() => document.querySelector("#oldtown")?.scrollIntoView() ?? window.scrollTo(0, 3200));
await page.waitForTimeout(1200);

// describe the painter DOM
const info = await page.evaluate(() => {
  const buttons = Array.from(document.querySelectorAll("button, [role=button], [aria-pressed], [data-swatch], [data-part]"));
  const painted = Array.from(document.querySelectorAll("svg [fill], [data-painted], [data-part]"));
  return {
    buttons: buttons.slice(0, 8).map(b => ({ t: (b.textContent || "").trim().slice(0, 24), pressed: b.getAttribute("aria-pressed"), cls: b.className?.toString().slice(0, 40) })),
    paintedCount: painted.length,
    paintedSample: painted.slice(0, 5).map(p => ({ tag: p.tagName, fill: p.getAttribute("fill"), cls: p.className?.toString().slice(0, 40), style: p.getAttribute("style") })),
  };
});
console.log(JSON.stringify(info, null, 1));

// click a swatch button, then a part, read fill change
const before = await page.evaluate(() => Array.from(document.querySelectorAll("svg [fill]")).map(e => e.getAttribute("fill")).join(","));
const swatches = page.locator("button, [role=button], [aria-pressed], [data-swatch]");
for (let i = 0; i < Math.min(swatches.count(), 10); i++) {
  const t = await swatches.nth(i).textContent().catch(() => "");
  if (/rose|butter|teal|andaman|rust|neon|duck/i.test(t ?? "")) {
    await swatches.nth(i).click().catch(() => {});
    await page.waitForTimeout(200);
  }
}
// click painted parts if any
const parts = page.locator("[data-part], [data-painted], svg [fill]");
for (let i = 0; i < Math.min(parts.count(), 6); i++) {
  await parts.nth(i).click().catch(() => {});
  await page.waitForTimeout(120);
}
const after = await page.evaluate(() => Array.from(document.querySelectorAll("svg [fill]")).map(e => e.getAttribute("fill")).join(","));
console.log("fill signature changed:", before !== after, "| before:", before.slice(0, 60), "| after:", after.slice(0, 60));
await browser.close();