import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
const baseDir = fileURLToPath(new URL("..", import.meta.url));
const root = join(baseDir, "live-output");
const MIME = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp", ".mp4":"video/mp4", ".svg":"image/svg+xml", ".woff2":"font/woff2", ".woff":"font/woff", ".xml":"application/xml", ".txt":"text/plain" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p === "/") p = "/index.html";
  let f = join(root, p);
  try { if (statSync(f).isDirectory()) f = join(f, "index.html"); } catch {}
  try {
    const body = readFileSync(f);
    res.writeHead(200, { "Content-Type": MIME[extname(f)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("not found"); }
});
await new Promise(r => server.listen(8399, r));
console.log("serving live-output on :8399 — press Ctrl-C to stop");
