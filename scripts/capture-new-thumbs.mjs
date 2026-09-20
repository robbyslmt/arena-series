// Throwaway: capture hero thumbnails (1280x820) for the two NEW collection sites only.
// Serves live-output over a local HTTP server, hero-frame capture = same method as
// screenshot-all.mjs (two scroll sweeps, then scroll to top, wait, capture viewport).
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const OUT = process.argv[2] ?? "scripts/thumbs";
const SLUGS = ["il-sito-cmbyn-landing-page", "premium-bandung-landing-page"];
const baseDir = join(import.meta.dirname, "..", "live-output");

const MIME = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css",
  ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp",
  ".mp4":"video/mp4", ".svg":"image/svg+xml", ".woff2":"font/woff2", ".woff":"font/woff" };
const server = createServer((req, res) => {
  let p = req.url.split("?")[0]; if (p === "/") p = "/index.html";
  let f = join(baseDir, p);
  try { if (statSync(f).isDirectory()) f = join(f, "index.html"); } catch {}
  try {
    const head = readFileSync(f);
    res.writeHead(200, {"Content-Type": MIME[extname(f)] || "application/octet-stream"});
    res.end(head);
  } catch { res.writeHead(404); res.end("not found"); }
});
await new Promise(r => server.listen(8399, r));
console.log("serving live-output on :8399");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
page.setDefaultTimeout(45000);
for (const slug of SLUGS) {
  const url = `http://localhost:8399/sites/${slug}/`;
  const consoleErrs = []; const pageErrs = [];
  page.on("console", m => { if (m.type()==="error") consoleErrs.push(m.text().slice(0,160)); });
  page.on("pageerror", e => { pageErrs.push(String(e).slice(0,160)); });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    for (let pass=0; pass<2; pass++) {
      await page.evaluate(async () => { const h=document.body.scrollHeight; for (let y=0;y<h;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));} window.scrollTo(0,0); });
      await page.waitForTimeout(700);
    }
    await page.evaluate(() => window.scrollTo({ top:0, left:0, behavior:"instant" }));
    await page.waitForTimeout(1000);
    const broken = await page.evaluate(() => Array.from(document.images).filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>(i.currentSrc||i.src).slice(0,140)));
    const pageTitle = await page.title();
    await page.screenshot({ path: join(OUT, `${slug}.jpg`), type: "jpeg", quality: 68 });
    console.log(`OK ${slug} title="${pageTitle}" js=${pageErrs.length+consoleErrs.length} brokenImgs=${broken.length}`);
    consoleErrs.slice(0,4).forEach(e => console.log("   consoleErr:", e));
    pageErrs.slice(0,4).forEach(e => console.log("   pageErr:", e));
  } catch (e) { console.log(`FAIL ${slug}: ${String(e).slice(0,200)}`); }
}
await browser.close();
server.close();
console.log("thumbs written to", OUT);
