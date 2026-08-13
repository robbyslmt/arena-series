import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrs = [];
page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text().slice(0, 160)));
const pageErrs = [];
page.on("pageerror", (e) => pageErrs.push(String(e).slice(0, 160)));

await page.goto("https://robbyslmt.github.io/arena-series/?v=" + Date.now(), { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500);

const video = await page.$eval("header video", (el) => ({
  playing: !el.paused,
  readyState: el.readyState,
  src: (el.currentSrc || "").includes("15204928"),
})).catch(() => null);
console.log("LIVE video:", JSON.stringify(video));

const cards = await page.$$eval("[data-card-link]", (els) => els.length);
console.log("LIVE cards:", cards);

const toggle = await page.$('button[aria-label*="Switch to"]');
console.log("LIVE toggle:", toggle ? "found" : "missing");

const marquee = await page.$("[class*='marquee']");
console.log("LIVE marquee:", marquee ? "present (bad)" : "absent (good)");

console.log("LIVE console errors:", consoleErrs.slice(0, 4));
console.log("LIVE page errors:", pageErrs.slice(0, 4));
await browser.close();