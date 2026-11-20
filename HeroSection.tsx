import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Download,
  Eye,
  Loader2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import { HARSH_PROFILE } from '../data/portfolioData';
import type { ResumeStatus } from '../hooks/useResumeStatus';
import type { SpeechState } from '../hooks/useGeminiSpeech';
import {
  CppLogo,
  GitHubLogo,
  JavaScriptLogo,
  PythonLogo,
  ReactLogo,
} from './TechIcons';

interface HeroSectionProps {
  resumeStatus: ResumeStatus;
  onResumeUnavailableClick: () => void;
  speech: SpeechState;
}

const ORBIT_PARTICLES = [
  { top: '12%', left: '10%', size: 'w-2 h-2', delay: '0s' },
  { top: '24%', left: '84%', size: 'w-2.5 h-2.5', delay: '1.1s' },
  { top: '68%', left: '14%', size: 'w-1.5 h-1.5', delay: '2.2s' },
  { top: '76%', left: '88%', size: 'w-2 h-2', delay: '0.7s' },
  { top: '46%', left: '50%', size: 'w-1.5 h-1.5', delay: '1.8s' },
  { top: '18%', left: '44%', size: 'w-2 h-2', delay: '2.8s' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  resumeStatus,
  onResumeUnavailableClick,
  speech,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const isIntroPlaying = speech.activeId === 'hero-intro';
  const isIntroLoading = speech.loadingId === 'hero-intro';

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!resumeStatus.available) {
      e.preventDefault();
      onResumeUnavailableClick();
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-[#1A0836] via-[#2C1058] to-[#170630] text-white pt-14 pb-16 sm:pt-20 sm:pb-24"
    >
      {/* Atmospheric glowing gradient orbs & particles (GPU-composited) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#6D28D9]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-[#F97316]/15 blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {ORBIT_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
            className={`absolute ${p.size} rounded-full bg-amber-300/60 shadow-[0_0_12px_rgba(251,191,36,0.65)] animate-float-particle`}
          />
        ))}
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <p className="text-sm font-medium text-amber-300 tracking-wide">
              Pune, India <span aria-hidden="true" className="mx-2 text-white/35">·</span>{' '}
              AI, Full-Stack &amp; IIoT Engineering
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-white">
              {HARSH_PROFILE.fullName}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-purple-100/95 leading-snug max-w-xl mx-auto lg:mx-0">
              {HARSH_PROFILE.roleHeadline}
            </p>

            <p className="text-base text-purple-100/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {HARSH_PROFILE.shortBio}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href={resumeStatus.resumeUrl}
                download={resumeStatus.filename}
                onClick={handleDownloadClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-950/40 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Resume</span>
              </a>

              {resumeStatus.available && (
                <a
                  href={resumeStatus.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>View Resume</span>
                </a>
              )}

              <a
                href="#certificates"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              >
                <Award className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Certificates</span>
                <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
              </a>

              <button
                type="button"
                onClick={() =>
                  speech.speak('hero-intro', HARSH_PROFILE.voiceBioScript, {
                    voiceName: 'Charon',
                    style:
                      'Confident, warm, articulate engineering student introducing his portfolio',
                  })
                }
                disabled={isIntroLoading}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-purple-300/25 bg-[#2A1154]/80 hover:bg-[#36166A] text-purple-100 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] disabled:opacity-60"
              >
                {isIntroLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                ) : isIntroPlaying ? (
                  <VolumeX className="w-4 h-4 text-amber-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-300" />
                )}
                <span>
                  {isIntroLoading
                    ? 'Generating Voice...'
                    : isIntroPlaying
                      ? 'Stop Intro Audio'
                      : 'Listen to Intro'}
                </span>
              </button>
            </div>

            {!resumeStatus.checking && !resumeStatus.available && (
              <p className="text-xs text-purple-200/65">
                Resume PDF status: Coming soon — click Download Resume for quick details or browse verified certificates below.
              </p>
            )}

            {speech.error && (
              <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-400/30 rounded-lg px-3 py-2 inline-block">
                {speech.error}
              </p>
            )}
          </motion.div>

          {/* Right/Center Orbit Showcase with Circular Photo & Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center py-6"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] flex items-center justify-center">
              {/* Outer Orbit Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-purple-300/25 animate-orbit-slow-cw"
              />
              {/* Inner Orbit Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-9 sm:inset-12 rounded-full border border-amber-400/30 shadow-[0_0_40px_rgba(249,115,22,0.12)] animate-orbit-ccw"
              />

              {/* Rotating Track 1: React (Top), Python (Bottom-Right), GitHub (Bottom-Left) */}
              <div className="absolute inset-0 animate-orbit-slow-cw pointer-events-none">
                {/* React */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 pointer-events-auto">
                  <div
                    title="React"
                    className="animate-orbit-slow-ccw w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#240F4A]/95 border border-purple-300/30 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-sky-300 hover:border-amber-400/70 transition-colors"
                  >
                    <ReactLogo className="w-6 h-6" />
                    <span className="text-[10px] font-semibold text-white/85 mt-0.5">
                      React
                    </span>
                  </div>
                </div>

                {/* Python */}
                <div className="absolute bottom-6 right-1 sm:bottom-8 sm:right-2 pointer-events-auto">
                  <div
                    title="Python"
                    className="animate-orbit-slow-ccw w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#240F4A]/95 border border-purple-300/30 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-amber-300 hover:border-amber-400/70 transition-colors"
                  >
                    <PythonLogo className="w-6 h-6" />
                    <span className="text-[10px] font-semibold text-white/85 mt-0.5">
                      Python
                    </span>
                  </div>
                </div>

                {/* GitHub */}
                <div className="absolute bottom-6 left-1 sm:bottom-8 sm:left-2 pointer-events-auto">
                  <div
                    title="GitHub"
                    className="animate-orbit-slow-ccw w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#240F4A]/95 border border-purple-300/30 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-white hover:border-amber-400/70 transition-colors"
                  >
                    <GitHubLogo className="w-5 h-5" />
                    <span className="text-[10px] font-semibold text-white/85 mt-0.5">
                      GitHub
                    </span>
                  </div>
                </div>
              </div>

              {/* Rotating Track 2 (Inner): C++ & JavaScript */}
              <div className="absolute inset-9 sm:inset-12 animate-orbit-ccw pointer-events-none">
                {/* C++ */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 pointer-events-auto">
                  <div
                    title="C++"
                    className="animate-orbit-cw w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2B1256]/95 border border-amber-400/40 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-purple-100 hover:border-amber-400 transition-colors"
                  >
                    <CppLogo className="w-6 h-6" />
                    <span className="text-[10px] font-semibold text-white/90 mt-0.5">
                      C++
                    </span>
                  </div>
                </div>

                {/* JavaScript */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 pointer-events-auto">
                  <div
                    title="JavaScript"
                    className="animate-orbit-cw w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2B1256]/95 border border-amber-400/40 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-amber-300 hover:border-amber-400 transition-colors"
                  >
                    <JavaScriptLogo className="w-6 h-6" />
                    <span className="text-[10px] font-semibold text-white/90 mt-0.5">
                      JS
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Circular Profile Photo */}
              <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#F97316] via-amber-400 to-purple-400 shadow-[0_0_50px_rgba(249,115,22,0.28)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#230E45] flex items-center justify-center">
                  {!imageFailed ? (
                    <img
                      src={HARSH_PROFILE.portraitImage}
                      alt="Harsh Pramod Patil"
                      referrerPolicy="no-referrer"
                      onError={() => setImageFailed(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3B1674] to-[#1D093D] text-white">
                      <span className="font-display text-3xl font-extrabold tracking-tight">
                        HP
                      </span>
                      <span className="text-xs text-purple-200 mt-1">
                        Harsh Patil
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Credential Summary Row Below Hero Split */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
              06
            </p>
            <p className="text-sm text-purple-200/75 mt-1">
              Verified Industry &amp; Academic Certificates
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-amber-300 tabular-nums">
              AI · BFSI
            </p>
            <p className="text-sm text-purple-200/75 mt-1">
              SmartBridge &amp; NASSCOM Internship Track
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
              71% Elite
            </p>
            <p className="text-sm text-purple-200/75 mt-1">
              IIT Madras NPTEL Certification Score
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-amber-300 tabular-nums">
              Grade A / A+
            </p>
            <p className="text-sm text-purple-200/75 mt-1">
              Imarticus C/C++ &amp; Business Communication
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
