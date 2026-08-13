export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
              Colophon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              Formula, prompts and audit by Robby (v1 to v14 — logged in{" "}
              <em className="text-paper/80 not-italic">Prompt Anti Slop.txt</em>),
              codified into the Hermes skill{" "}
              <em className="text-paper/80 not-italic">
                arena-anti-slop-landing-pages
              </em>
              . Sites built by Arena AI and by Hermes Agent directly. Every page
              was rendered, built and visually verified before it joined this
              board. The em-dash is banned here and in every site that followed
              Bangkok.
            </p>
          </div>

          <div className="min-w-[260px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
              Type lineage
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px]">
              <span className="border border-line px-2 py-1 text-paper/80">FRAUNCES ×4</span>
              <span className="text-dim">→</span>
              <span className="border border-line px-2 py-1 text-paper/80">BRICOLAGE ×3</span>
              <span className="text-dim">→</span>
              <span className="border border-line px-2 py-1 text-signal">
                ARCHIVO BLACK
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-dim">
              Four consecutive builds converged on Fraunces; the v11 fence
              retired it; three converged on Bricolage; the rotation rule keeps
              rotating. Convergence is the enemy — a human art director would
              change the typeface, so the formula must too.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>The Collection · Series 01 · 13 destinations</p>
          <p>Concepts derived, never themed · One interactive per site</p>
        </div>
      </div>
    </footer>
  );
}