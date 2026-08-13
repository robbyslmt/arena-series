# Em-dash cleanup: zero visible em-dashes in Xinjiang + SEGITIGA copy.
# Explicit substring replacements (unique phrases). Comment bars and
# code-only dashes are left untouched. Run: python scripts/emdash-clean.py

XJ = r"C:/Users/robby/Downloads/Arena AI/xinjiang-immersive-landing-page/src"
SG = r"C:/Users/robby/Downloads/Arena AI/indonesian-underwater-landing-page/src"

# (path, [(old, new), ...])
EDITS = [
# ---------------- XINJIANG media.ts ----------------
(XJ + "/data/media.ts", [
  ('" — representative', '" · representative'),   # captions
  (' — representative footage', ' · representative footage'),
  ('China — old city lanes', 'China: old city lanes'),
  ("sea level — China's lowest basin", "sea level: China's lowest basin"),
  ("embers — the hottest ground", "embers: the hottest ground"),
  ("Heaven' — glaciers whose meltwater", "Heaven': glaciers whose meltwater"),
  ("patient pot — the dish a dastarkhan is judged by", "patient pot: the dish a dastarkhan is judged by"),
  ("clay tonur — the currency of hospitality", "clay tonur: the currency of hospitality"),
  ("height of respect — no mehman leaves", "height of respect: no mehman leaves"),
]),
# ---------------- XINJIANG Culture.tsx ----------------
(XJ + "/components/Culture.tsx", [
  ('05 — MUQAM & THREAD', '05 · MUQAM & THREAD'),
  ('05 — مۇقام · Muqam &amp; Thread', '05 · مۇقام · Muqam &amp; Thread'),
  ("Muqam — is Xinjiang's classical canon", "Muqam) is Xinjiang's classical canon"),
  ('— the Twelve', '(the Twelve'),
  ('muqam — 24 hrs of song', 'muqam · 24 hrs of song'),
  ('giläm — ~1M knots', 'giläm · ~1M knots'),
  ('doppa — 4 folded panels', 'doppa · 4 folded panels'),
  ('patience — endless', 'patience · endless'),
  ('The Twelve — ئون ئىككى مۇقام', 'The Twelve · ئون ئىككى مۇقام'),
  ('not furniture — it is a cloth on the ground', 'not furniture: it is a cloth on the ground'),
  ('Manchu — the faces change', 'Manchu: the faces change'),
  ('bolung</em> — "be our guest."', 'bolung</em>: "be our guest."'),
  ('not a photograph — it is the road the caravans', 'not a photograph: it is the road the caravans'),
  ('"— the caravan road of the Milky Way burns brightest; sand glows faintly under it."', '"The caravan road of the Milky Way burns brightest; sand glows faintly under it."'),
  ('"— the Kazakh name for the Great Bear, riding low over the Altay."', '"The Kazakh name for the Great Bear, riding low over the Altay."'),
  ('"— if a star falls over the dunes, wish only for water."', '"If a star falls over the dunes, wish only for water."'),
  ('06 — DASTARKHAN · the tablecloth', '06 · DASTARKHAN · the tablecloth'),
  ('06 — داستىرخان · The Tablecloth', '06 · داستىرخان · The Tablecloth'),
  ('07 — THE PEOPLE', '07 · THE PEOPLE'),
  ('07 — خەلق · The People', '07 · خەلق · The People'),
  ('08 — THE NIGHT SHIFT', '08 · THE NIGHT SHIFT'),
  ('08 — يۇلتۇزلار · The Night Shift', '08 · يۇلتۇزلار · The Night Shift'),
]),
# ---------------- XINJIANG Karez.tsx ----------------
(XJ + "/components/Karez.tsx", [
  ('01 — قارىز · The Living Water', '01 · قارىز · The Living Water'),
  ('descend — into gravel, into shadow —', 'descend, into gravel, into shadow,'),
  ('>— water</span>', '>· water</span>'),
  ('the vineyard — the oasis wakes', 'the vineyard: the oasis wakes'),
  ('open — water is on its way...', 'open: water is on its way...'),
  ('/ ${TOTAL_SHAFTS} — ${remaining} more shaft', '/ ${TOTAL_SHAFTS} · ${remaining} more shaft'),
  ('Shaft ${i + 1} — dig the previous shaft first', 'Shaft ${i + 1}: dig the previous shaft first'),
  ('TIANSHAN — the mother of water', 'TIANSHAN: the mother of water'),
  ('GRAVEL AQUIFER — CHANNEL', 'GRAVEL AQUIFER · CHANNEL'),
  ('CROSS-SECTION — NOT TO SCALE', 'CROSS-SECTION · NOT TO SCALE'),
  ('dig — tap the mounds to open the shafts', 'dig: tap the mounds to open the shafts'),
  ('per dispatch — this is it.', 'per dispatch: this is it.'),
]),
# ---------------- XINJIANG Sections.tsx ----------------
(XJ + "/components/Sections.tsx", [
  ('02 — STOPS ALONG THE ROAD', '02 · STOPS ALONG THE ROAD'),
  ('02 — يول · The Road', '02 · يول · The Road'),
  ('cross the Taklamakan — it went around it', 'cross the Taklamakan: it went around it'),
  ('03 — INTERLUDE', '03 · INTERLUDE'),
  ('Taklamakan — "the place you enter and never leave"', 'Taklamakan: "the place you enter and never leave"'),
  ('— after Xuanzang', 'after Xuanzang'),
  ('04 — THE SUNDAY BAZAAR', '04 · THE SUNDAY BAZAAR'),
  ('04 — يەكشەنبە بازىرى', '04 · يەكشەنبە بازىرى'),
  ("rivers of livestock — sheep bound for the", "rivers of livestock: sheep bound for the"),
  ("their patterns — the bazaar is Xinjiang's oldest theatre", "their patterns: the bazaar is Xinjiang's oldest theatre"),
  ('— a tea-house saying, overheard and translated', 'a tea-house saying, overheard and translated'),
]),
# ---------------- XINJIANG Hero.tsx ----------------
(XJ + "/components/Hero.tsx", [
  ('Dispatch No 01 — a field journal from Xinjiang', 'Dispatch No 01: a field journal from Xinjiang'),
  ('lies the Taklamakan —{" "}', 'lies the Taklamakan:{" "}'),
  ('Scroll — the water is still moving', 'Scroll, the water is still moving'),
  ('Footage — {HERO_VIDEO.caption}', 'Footage · {HERO_VIDEO.caption}'),
]),
# ---------------- XINJIANG Footer.tsx ----------------
(XJ + "/components/Footer.tsx", [
  ('Colophon — ياقۇت · the last page', 'Colophon · ياقۇت · the last page'),
  ('not a guidebook — an anti-mainstream portrait of Xinjiang', 'not a guidebook: an anti-mainstream portrait of Xinjiang'),
  ('captioned as such — it evokes the region', 'captioned as such: it evokes the region'),
  ('Photographers — Pexels', 'Photographers · Pexels'),
  ('TAKLA·MAKAN — dispatch No 01', 'TAKLA·MAKAN · dispatch No 01'),
  ('سۇ · su — water finds its way', 'سۇ · su: water finds its way'),
]),
# ---------------- SEGITIGA content.ts ----------------
(SG + "/data/content.ts", [
  ('5.7M KM2 OF OCEAN — THE CORAL TRIANGLE', '5.7M KM2 OF OCEAN · THE CORAL TRIANGLE'),
  ('1 LEGENDARY CURRENT — ARUS', '1 LEGENDARY CURRENT · ARUS'),
  ('ampat = four — “the four kings”', 'ampat = four: “the four kings”'),
  ('130.5°E — THE EASTERN PILLAR', '130.5°E · THE EASTERN PILLAR'),
  ('Four great islands — Waigeo, Batanta, Salawati, Misool — and fifteen hundred', 'Four great islands, Waigeo, Batanta, Salawati, Misool, and fifteen hundred'),
  ('logged 374 species — a world record', 'logged 374 species: a world record'),
  ("water — a standard sight on the triangle's eastern reefs", "water: a standard sight on the triangle's eastern reefs"),
  ('the walled isle — a dive name that became a legend', 'the walled isle: a dive name that became a legend'),
  ('124.76°E — THE NORTHERN PILLAR', '124.76°E · THE NORTHERN PILLAR'),
  ('mosaic of its four islands — Wangi-Wangi, Kaledupa, Tomia and Binongko', 'mosaic of its four islands: Wangi-Wangi, Kaledupa, Tomia and Binongko'),
  ('123.95°E — THE SOUTHERN PILLAR', '123.95°E · THE SOUTHERN PILLAR'),
  ('Mola & Mantigola — Bajo villages', 'Mola & Mantigola · Bajo villages'),
  ('sunlit water — a classic Coral Triangle scene', 'sunlit water: a classic Coral Triangle scene'),
  ('shallow reef water — the classic form of a Bajo settlement', 'shallow reef water: the classic form of a Bajo settlement'),
  ('almost entirely on the water — stilt villages, lepa-lepa outriggers', 'almost entirely on the water: stilt villages, lepa-lepa outriggers'),
  ('spice, fish and — now — divers', 'spice, fish and, now, divers'),
  ('seaweed — literally “sea grass”', 'seaweed: literally “sea grass”'),
  ("eucheuma seaweed — Indonesia is the world's largest producer", "eucheuma seaweed: Indonesia is the world's largest producer"),
  ('The Indonesian Throughflow — the Pacific-to-Indian river', 'The Indonesian Throughflow: the Pacific-to-Indian river'),
  ('Raja Ampat — a drift dive on the edge of control', 'Raja Ampat: a drift dive on the edge of control'),
  ('Bayar — pay the reef keeper', 'Bayar · pay the reef keeper'),
  ('Sentuh — touch nothing', 'Sentuh · touch nothing'),
  ('Sewa — hire the village', 'Sewa · hire the village'),
  ('not a backdrop — one fin-kick can kill a century of coral', 'not a backdrop: one fin-kick can kill a century of coral'),
  ('hero footage — open-water fish school', 'hero footage: open-water fish school'),
]),
# ---------------- SEGITIGA Finale.tsx ----------------
(SG + "/components/Finale.tsx", [
  ('07 · The Pledge — Janji', '07 · The Pledge · Janji'),
  ('is still here — but reefs worldwide have lost half their coral', 'is still here, but reefs worldwide have lost half their coral'),
  ('the Amazon of the Seas — Raja Ampat, Bunaken and Wakatobi — written from the surface', 'the Amazon of the Seas, Raja Ampat, Bunaken and Wakatobi, written from the surface'),
  ('— {c.works}', '· {c.works}'),
  ('Stock media disclaimer — photography and footage', 'Stock media disclaimer: photography and footage'),
  ('fan-made tribute —', 'fan-made tribute ·'),
  ('© 2026 SEGITIGA — made with', '© 2026 SEGITIGA · made with'),
]),
# ---------------- SEGITIGA Manifesto.tsx ----------------
(SG + "/components/Manifesto.tsx", [
  ('01 · Manifesto — Pernyataan', '01 · Manifesto · Pernyataan'),
  ('sea the size of a rainforest — the{" "}', 'sea the size of a rainforest: the{" "}'),
  ('three reefs stand apart — each a different face', 'three reefs stand apart: each a different face'),
  ('not a place you visit — it is a civilisation you descend into', 'not a place you visit: it is a civilisation you descend into'),
  ('— field notes, liveaboard log · Raja Laut', '· field notes, liveaboard log · Raja Laut'),
  ('<em className="font-display italic">Acropora</em> — the antlers of the reef', '<em className="font-display italic">Acropora</em>: the antlers of the reef'),
]),
# ---------------- SEGITIGA DepthGauge.tsx ----------------
(SG + "/components/DepthGauge.tsx", [
  ('04 · Interactive — Kedalaman (depth)', '04 · Interactive · Kedalaman (depth)'),
  ('rise — and the reef change tenants', 'rise, and the reef change tenants'),
  ('No identifications at this depth — the water is between zones', 'No identifications at this depth: the water is between zones'),
  ('sp.iucn === "—"', 'sp.iucn === "NE"'),
  ('aria-label={`${sp.name} — ${sp.min} to ${sp.max} metres`}', 'aria-label={`${sp.name} · ${sp.min} to ${sp.max} metres`}'),
  ('aria-label={`Depth gauge — ${site.label}`}', 'aria-label={`Depth gauge · ${site.label}`}'),
  ('aria-valuetext={`${depth} metres — ${band.name}`}', 'aria-valuetext={`${depth} metres · ${band.name}`}'),
]),
# ---------------- SEGITIGA Currents.tsx ----------------
(SG + "/components/Currents.tsx", [
  ('route map of the triangle — Bunaken, Raja Ampat and Wakatobi', 'route map of the triangle: Bunaken, Raja Ampat and Wakatobi'),
  ('06 · The Currents — Arus', '06 · The Currents · Arus'),
  ('The Indonesian Throughflow — roughly fifteen million cubic metres of seawater per second — pours from', 'The Indonesian Throughflow, roughly fifteen million cubic metres of seawater per second, pours from'),
  ('SCHEMATIC —</span>', 'SCHEMATIC ·</span>'),
]),
# ---------------- SEGITIGA Culture.tsx ----------------
(SG + "/components/Culture.tsx", [
  ('05 · The People — Orang Laut', '05 · The People · Orang Laut'),
  ('read the reef the way farmers read soil —', 'read the reef the way farmers read soil,'),
  ('MEDIA NOTE — {c.caption}', 'MEDIA NOTE · {c.caption}'),
  ('We live <em className="text-gold">in</em> it — the reef is our rice field', 'We live <em className="text-gold">in</em> it: the reef is our rice field'),
]),
# ---------------- CHIANG MAI alt hygiene ----------------
(r"C:/Users/robby/Downloads/Arena AI/premium-chiang-mai-landing-page/src/data.ts", [
  ('A Lanna temple with tiered roofs against a bright blue sky in Chiang Mai', 'A Lanna temple with tiered roofs against a bright blue sky'),
]),
]

changed = 0
missing = []
for path, pairs in EDITS:
    try:
        txt = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        missing.append(path)
        continue
    orig = txt
    for old, new in pairs:
        if old in txt:
            txt = txt.replace(old, new)
            changed += 1
        else:
            print(f"  NOT FOUND in {path.split('/')[-1]}: {old[:70]!r}")
    if txt != orig:
        open(path, "w", encoding="utf-8", newline="").write(txt)
        print("edited:", path)

print(f"\napplied {changed} replacements")
if missing:
    print("MISSING FILES:", missing)