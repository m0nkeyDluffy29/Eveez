import FigmaWhatsapp from "../../assets/social/figma-whatsapp";
import FigmaLinkedin from "../../assets/social/figma-linkedin";
import FigmaInstagram from "../../assets/social/figma-instagram";
import FigmaFacebook from "../../assets/social/figma-facebook";
import FigmaYoutube from "../../assets/social/figma-youtube";
import logo1 from "../../assets/icons/eveez-logo.png";

export default function FooterSection() {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-auto bg-neutral-950 text-neutral-300 border-t-2 border-[#E8461F]">
      <div className="mx-auto max-w-[106rem] px-6 py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <img src={logo1} alt="EVeez" className="h-10 w-auto" />
            <p className="mt-5 max-w-md text-sm leading-7 text-white">
              Accelerating India's transition to sustainable electric mobility
              through full-stack hardware and software innovation.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Platform
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  Ecosystem
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  Vehicle Specs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  Tech Stack
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  Press Kit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--ev-orange)] transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 flex flex-col items-center lg:col-span-1 lg:items-start">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Connect
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="#"
                aria-label="WhatsApp"
                className="hover:text-[var(--ev-orange)] transition"
              >
                <FigmaWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[var(--ev-orange)] transition"
              >
                <FigmaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[var(--ev-orange)] transition"
              >
                <FigmaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[var(--ev-orange)] transition"
              >
                <FigmaFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-[var(--ev-orange)] transition"
              >
                <FigmaYoutube className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-5 text-xs text-white">© 2026 EVEEZ MOBILITY</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-[106rem] flex-col gap-3 px-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
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
