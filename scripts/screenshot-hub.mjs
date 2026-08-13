import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8399/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
await page.screenshot({ path: "scripts/hub-full.png", fullPage: true });
await browser.close();
console.log("screenshot written");