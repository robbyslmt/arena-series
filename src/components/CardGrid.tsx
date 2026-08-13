import { SITES } from "../data/sites";
import Card from "./Card";

export default function CardGrid() {
  return (
    <section aria-label="Series index" className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10">
      <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Index · {SITES.length} destinations
        </h2>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-dim sm:block">
          Every card opens the real site in a new tab
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SITES.map((s) => (
          <div
            key={s.slug}
            className="xl:[&:nth-child(4n+2)]:translate-y-6 xl:[&:nth-child(4n+3)]:translate-y-2"
          >
            <Card site={s} />
          </div>
        ))}
      </div>
    </section>
  );
}