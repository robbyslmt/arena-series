import type { Site } from "../data/sites";
import { cxs } from "../utils/cn";

const STATUS: Record<Site["status"], { label: string; cls: string }> = {
  verified: { label: "VERIFIED", cls: "text-ok" },
  scored: { label: "SCORED 10.5", cls: "text-signal" },
  pending: { label: "PENDING", cls: "text-dim" },
};

export default function Card({ site }: { site: Site }) {
  const st = STATUS[site.status];
  return (
    <a
      data-card-link
      href={`sites/${site.slug}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.place}: ${site.concept}. Open site.`}
      className="series-card group"
    >
      <div className="card-media">
        <img
          src={`thumbs/${site.slug}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="absolute left-3 top-3 z-10 bg-signal px-2 py-0.5 font-mono text-[10px] tracking-widest text-ink">
          {site.no}
        </span>
        <span
          className={cxs(
            "absolute bottom-3 right-3 z-10 bg-ink/70 px-2 py-0.5 font-mono text-[10px] tracking-widest backdrop-blur-sm",
            st.cls
          )}
        >
          {st.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-lg font-bold tracking-tight">
            {site.place}
          </h3>
          <span className="shrink-0 font-mono text-[10px] text-dim">
            {site.glyph}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] font-semibold text-signal">
          {site.concept}
        </p>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-dim">
          {site.line}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              {site.palette.map((h) => (
                <span
                  key={h}
                  className="h-3 w-3 rounded-full border border-line"
                  style={{ background: h }}
                />
              ))}
            </span>
            <span className="hidden font-mono text-[9.5px] uppercase tracking-wider text-dim md:inline">
              {site.interactive}
            </span>
          </div>
          <span className="text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}