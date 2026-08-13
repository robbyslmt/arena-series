import ThemeToggle from "./ThemeToggle";

const HERO_VIDEO = {
  src: "https://videos.pexels.com/video-files/15204928/15204928-hd_1280_720_24fps.mp4",
  poster:
    "https://images.pexels.com/videos/15204928/snow-capped-mountains-15204928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
};

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* nature video background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
        {/* legibility overlay: darker at top for the bar, solid ink at the
            bottom so the hero melts into the page in both themes */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 pt-8 lg:px-10">
        {/* top bar — forced light-on-video treatment */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/85">
              The Collection · Series 01
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 sm:block">
              Est. 2026 · 13 destinations
            </p>
            <ThemeToggle />
          </div>
        </div>

        {/* statement */}
        <div className="py-20 lg:py-28">
          <h1 className="text-[13vw] font-extrabold leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[88px]">
            <span className="block drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
              THIRTEEN PLACES.
            </span>
            <span className="block text-white/65">ZERO TEMPLATES.</span>
          </h1>
          <p className="mt-8 max-w-xl font-mono text-[13px] leading-relaxed text-white/80">
            One series of destination sites, built with Arena AI and Hermes
            between July and August 2026. Each page takes its palette, type and
            concept from the place itself. None of them look AI-generated,
            because none of them started from a template. Open a card below,
            and the place opens with it.
          </p>
        </div>
      </div>
    </header>
  );
}