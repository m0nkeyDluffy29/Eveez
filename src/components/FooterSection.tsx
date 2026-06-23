import FigmaWhatsapp from "../../assets/social/figma-whatsapp";
import FigmaLinkedin from "../../assets/social/figma-linkedin";
import FigmaInstagram from "../../assets/social/figma-instagram";
import FigmaFacebook from "../../assets/social/figma-facebook";
import FigmaYoutube from "../../assets/social/figma-youtube";
import logo1 from "../../assets/icons/eveez-logo.png";

export default function FooterSection() {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-auto bg-neutral-950 text-neutral-300 border-t-2 border-orange-500">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
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
              <li>Ecosystem</li>
              <li>Vehicle Specs</li>
              <li>Tech Stack</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white">
              <li>About Us</li>
              <li>Press Kit</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--footer-text)]">
              Connect
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a href="#" aria-label="WhatsApp">
                <FigmaWhatsapp className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FigmaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram">
                <FigmaInstagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook">
                <FigmaFacebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube">
                <FigmaYoutube className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-5 text-xs text-white">© 2026 EVEEZ MOBILITY</p>
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
