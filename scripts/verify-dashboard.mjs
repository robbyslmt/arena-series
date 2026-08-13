// Verify the video-hero dashboard locally: video element, autoplay state,
// cards, toggle, console errors, and a hero screenshot.
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrs = [];
page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text().slice(0, 180)));
const pageErrs = [];
page.on("pageerror", (e) => pageErrs.push(String(e).slice(0, 180)));

await page.goto("http://localhost:8399/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const video = await page.$("header video");
console.log("hero video element:", video ? "found" : "MISSING");
if (video) {
  const v = await page.$eval("header video", (el) => ({
    muted: el.muted,
    loop: el.loop,
    autoplay: el.autoplay,
    playsInline: el.hasAttribute("playsinline"),
    paused: el.paused,
    readyState: el.readyState,
    src: (el.currentSrc || el.src || "").slice(0, 90),
  }));
  console.log("video state:", JSON.stringify(v));
}

const cards = await page.$$eval("[data-card-link]", (els) => els.length);
console.log("cards:", cards);

const themeBtn = await page.$('button[aria-label*="light"], button[aria-label*="dark"]');
console.log("theme toggle:", themeBtn ? "found" : "missing");

const marquee = await page.$(".marquee-track, [class*='marquee']");
console.log("marquee:", marquee ? "present (bad)" : "absent (good)");

console.log("console errors:", consoleErrs.slice(0, 5));
console.log("page errors:", pageErrs.slice(0, 5));

await page.screenshot({ path: "scripts/hub-video-hero.png", fullPage: true });
console.log("screenshot: scripts/hub-video-hero.png");

await browser.close();