import React, { useState } from 'react';
import { Download, Eye, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HARSH_PROFILE } from '../data/portfolioData';
import type { ResumeStatus } from '../hooks/useResumeStatus';

interface NavbarProps {
  resumeStatus: ResumeStatus;
  onResumeUnavailableClick: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  resumeStatus,
  onResumeUnavailableClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!resumeStatus.available) {
      e.preventDefault();
      onResumeUnavailableClick();
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1E0B3B]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
        >
          {HARSH_PROFILE.brandName}
        </a>

        {/* Zone 2: Clean single-line text nav links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Orange Resume Download) + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={resumeStatus.resumeUrl}
            download={resumeStatus.filename}
            onClick={handleResumeClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-sm font-semibold shadow-sm shadow-orange-950/40 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#190833] border-b border-white/15 px-4 py-5 space-y-4"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={resumeStatus.resumeUrl}
                download={resumeStatus.filename}
                onClick={handleResumeClick}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Resume</span>
              </a>

              {resumeStatus.available && (
                <a
                  href={resumeStatus.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>View Resume</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
