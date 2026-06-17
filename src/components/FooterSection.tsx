import { Rss, Share2 } from "lucide-react";

export default function FooterSection() {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-auto bg-neutral-950 text-neutral-300 border-t-2 border-orange-500">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-semibold tracking-[0.3em] text-orange-500">
              EVeez
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--footer-text)]">
              Accelerating India's transition to sustainable electric mobility
              through full-stack hardware and software innovation.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Platform
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--footer-text)]">
              <li>Ecosystem</li>
              <li>Vehicle Specs</li>
              <li>Tech Stack</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--footer-text)]">
              <li>About Us</li>
              <li>Press Kit</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Connect
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                <Rss className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <span className="text-neutral-400 hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-neutral-400 hover:text-white transition cursor-pointer">
              Terms of Service
            </span>
          </div>
          <div className="text-center text-xs text-neutral-500">
            Developed and Maintained by
            <a href="https://nds.studio/" target="_blank">
              {" "}
              nDimension
            </a>
          </div>
          <div className="text-center text-xs text-neutral-500">
            INDIA HQ | GURUGRAM
          </div>
        </div>
      </div>
    </section>
  );
}
