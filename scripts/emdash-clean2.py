# Pass 2: exact-string fixes for residual em-dashes (codepoint-accurate).
import re

XJ = r"C:/Users/robby/Downloads/Arena AI/xinjiang-immersive-landing-page/src"
SG = r"C:/Users/robby/Downloads/Arena AI/indonesian-underwater-landing-page/src"

PASS2 = [
# ---- XINJIANG ----
(XJ + "/data/media.ts", [
  (' — representative imagery', ' · representative imagery'),
  (' — representative portrait', ' · representative portrait'),
  ('bürkütçi — the eagle keepers', 'bürkütçi: the eagle keepers'),
]),
(XJ + "/components/Culture.tsx", [
  ('Read the road — in Uyghur Arabic script', 'Read the road · in Uyghur Arabic script'),
  ('KARWAN — THE CARAVAN', 'KARWAN · THE CARAVAN'),
  ('— a camel driver, Turpan road, told at dawn', '· a camel driver, Turpan road, told at dawn'),
]),
(XJ + "/components/Footer.tsx", [
  (' — dispatch № 01 · field journal', ' · dispatch № 01 · field journal'),
]),
(XJ + "/components/Hero.tsx", [
  ('Dispatch № 01 — a field journal from Xinjiang', 'Dispatch № 01: a field journal from Xinjiang'),
  ('the size of Xinjiang — one sixth of China', 'the size of Xinjiang: one sixth of China'),
]),
(XJ + "/components/Karez.tsx", [
  ('open — water is on its way', 'open: water is on its way'),
]),
# ---- SEGITIGA ----
(SG + "/data/content.ts", [
  ('KM² OF OCEAN — THE CORAL TRIANGLE', 'KM² OF OCEAN · THE CORAL TRIANGLE'),
  ('374 species — still a world record', '374 species: still a world record'),
  ('famous trio — Lekuan I', 'famous trio: Lekuan I'),
  ('coral wall — the signature profile', 'coral wall: the signature profile'),
  ('bi(nongko) — four islands, one name', 'bi(nongko): four islands, one name'),
]),
(SG + "/components/Destinations.tsx", [
  ('MEDIA NOTE —</span>', 'MEDIA NOTE ·</span>'),
  ('02 · The Three Reefs — Tiga Karang', '02 · The Three Reefs · Tiga Karang'),
  ("A wall, a pass and a lagoon — the triangle's three pillars", "A wall, a pass and a lagoon: the triangle's three pillars"),
]),
(SG + "/components/Hero.tsx", [
  ("world's corals — and the dive legends", "world's corals, and the dive legends"),
]),
(SG + "/components/Manifesto.tsx", [
  ("of ocean — the Coral Triangle, larger than the Amazon basin's forest", "of ocean: the Coral Triangle, larger than the Amazon basin's forest"),
  ('reef-fish species — over a third of the global total', 'reef-fish species: over a third of the global total'),
]),
(SG + "/components/Nav.tsx", [
  ('aria-label="Segitiga — back to top"', 'aria-label="Segitiga · back to top"'),
]),
(SG + "/components/SpeciesRibbon.tsx", [
  ('03 · Field Guide — Panduan Lapangan', '03 · Field Guide · Panduan Lapangan'),
  ("currency — the first step of the region's obsessive", "currency: the first step of the region's obsessive"),
  ('drag · geser — images are thematically representative stock', 'drag · geser: images are thematically representative stock'),
]),
]

# regex extras (multiline span)
REGEX = [
  (XJ + "/components/Culture.tsx",
   re.compile(r'</span>\s*\u2014\s*the square embroidered cap\s*\u2014\s*carries'),
   '</span> (the square embroidered cap) carries'),
  (XJ + "/data/media.ts",
   re.compile(r'^(\s*"[^"\u2014]+) \u2014 (?=[\u0600-\u06FF])', re.M),
   r'\1 · '),
]

changed = 0
for path, pairs in PASS2:
    txt = open(path, encoding="utf-8").read()
    orig = txt
    for old, new in pairs:
        if old in txt:
            txt = txt.replace(old, new); changed += 1
        else:
            print(f"  MISS: {path.split('/')[-1]} :: {old[:60]!r}")
    if txt != orig:
        open(path, "w", encoding="utf-8", newline="").write(txt)
        print("edited:", path.split("/")[-1])

for path, rx, repl in REGEX:
    txt = open(path, encoding="utf-8").read()
    txt2, n = rx.subn(repl, txt)
    if n:
        open(path, "w", encoding="utf-8", newline="").write(txt2)
        changed += n
        print(f"regex edited {path.split('/')[-1]}: {n}")

print(f"\npass2 applied {changed}")

# verification: residual visible dashes, full lines
import os
for label, root in [("XJ", XJ), ("SG", SG)]:
    print("="*90); print(label, "residuals (excluding comments/bars/iucn):")
    n = 0
    for dp, _, fs in os.walk(root):
        for f in fs:
            if not f.endswith((".tsx", ".ts")): continue
            for i, l in enumerate(open(os.path.join(dp, f), encoding="utf-8", errors="ignore").read().splitlines(), 1):
                if "\u2014" not in l: continue
                s = l.strip()
                if re.match(r"^(/\*|\*|//)", s) or re.match(r"^[—\s/*-]+$", s) or "iucn" in s: continue
                n += 1
                print(f"  {os.path.basename(dp)}/{f}:{i} {s[:200]}")
    print(f"  TOTAL residual: {n}")