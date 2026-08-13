import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://robbyslmt.github.io/arena-series/?v=" + Date.now(), { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const before = await page.evaluate(() => document.documentElement.dataset.theme);
const btn = page.locator('button[aria-label*="light mode"], button[aria-label*="Switch to"]').first();
await btn.click();
await page.waitForTimeout(600);
const after = await page.evaluate(() => document.documentElement.dataset.theme);
const stored = await page.evaluate(() => localStorage.getItem("collection-theme"));
console.log("theme before:", before, "| after click:", after, "| stored:", stored);
console.log(after !== before ? "TOGGLE WORKS ✅" : "TOGGLE DOES NOT CHANGE ❌");

// screenshot of toggled theme
await page.screenshot({ path: "scripts/hub-live-toggled.png", fullPage: true });
console.log("screenshot: scripts/hub-live-toggled.png");
await browser.close();