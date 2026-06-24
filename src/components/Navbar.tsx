import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/icons/eveez-logo-1.png";

const NAV_LINKS = [
  { label: "Franchise", href: "#" },
  { label: "Fast Charging", href: "#" },
  { label: "Service", href: "#" },
  { label: "Tech Stack", href: "#" },
  { label: "Vehicle R&D", href: "#" },
  { label: "Training Programmes", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-30 border-b-2 py-2 border-orange bg-neutral-950">
        <div className="mx-auto max-w-[106rem] px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="EVeez"
              className="h-15 w-auto object-contain"
              loading="lazy"
            />
          </a>

          {/* Center nav — visible only above 1150px */}
          <nav className="hidden min-[1150px]:flex flex-1 justify-center items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA: hidden below 450px, shown from 450px up */}
            <a
              href="#"
              className="hidden min-[450px]:inline-flex items-center rounded-[8px] bg-[#E8461F] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#F26A4A] transition"
            >
              Become A Partner
            </a>

            {/* Hamburger — visible below 1150px */}
            <button
              className="min-[1150px]:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-6 h-0.5 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slides in from right */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/60 min-[1150px]:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 z-50 h-full w-72 bg-neutral-950 border-l border-white/10 flex flex-col px-6 py-8 min-[1150px]:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Close button */}
              <button
                className="self-end mb-8 text-white/60 hover:text-white transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M1 1l20 20M21 1L1 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Nav links */}
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base text-white/80 hover:text-[var(--ev-orange)] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* CTA inside menu — only below 450px */}
              <a
                href="#"
                className="mt-10 min-[450px]:hidden inline-flex justify-center items-center rounded-md bg-[#E8461F] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#F26A4A] transition"
              >
                Become A Partner
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
