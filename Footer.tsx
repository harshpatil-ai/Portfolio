import React, { useEffect, useState } from 'react';
import { ArrowUp, Download, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HARSH_PROFILE } from '../data/portfolioData';
import type { ResumeStatus } from '../hooks/useResumeStatus';
import { GitHubLogo, InstagramLogo, LinkedInLogo } from './TechIcons';

interface FooterProps {
  resumeStatus: ResumeStatus;
  onResumeUnavailableClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  resumeStatus,
  onResumeUnavailableClick,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!resumeStatus.available) {
      e.preventDefault();
      onResumeUnavailableClick();
    }
  };

  return (
    <>
      <footer className="bg-[#16072D] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <a
                href="#top"
                className="font-display text-xl font-extrabold tracking-tight text-white"
              >
                {HARSH_PROFILE.brandName}
              </a>
              <p className="text-sm text-purple-200/75 mt-2 max-w-md">
                {HARSH_PROFILE.college} · {HARSH_PROFILE.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-purple-100/80">
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-white transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-white transition-colors">
                Projects
              </a>
              <a
                href="#certificates"
                className="hover:text-white transition-colors"
              >
                Certificates
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-purple-200/65">
            <p>© 2026 {HARSH_PROFILE.fullName}. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${HARSH_PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{HARSH_PROFILE.email}</span>
              </a>
              <a
                href={HARSH_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <LinkedInLogo className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={HARSH_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <GitHubLogo className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={HARSH_PROFILE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <InstagramLogo className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={resumeStatus.resumeUrl}
                download={resumeStatus.filename}
                onClick={handleResumeClick}
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-[#EA580C] hover:bg-[#F97316] text-white shadow-lg shadow-purple-950/40 border border-white/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
