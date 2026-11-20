import React, { useState } from 'react';
import { ArrowUpRight, Cpu, ExternalLink, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS_DATA, type ProjectItem } from '../data/portfolioData';
import type { SpeechState } from '../hooks/useGeminiSpeech';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  speech: SpeechState;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  speech,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-[#1E0B3B] to-[#15072B] text-white py-20 sm:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-amber-300 tracking-wide">
              Featured Projects
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Applied Engineering Builds &amp; Case Studies
            </h2>
          </div>
          <p className="text-sm sm:text-base text-purple-100/75 max-w-md">
            Selected technical builds spanning BFSI AI analytics, Industrial IoT robotics, generative voice tooling, and core C++ systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {PROJECTS_DATA.map((project, idx) => {
            const isSpeaking = speech.activeId === `project-${project.id}`;
            const isSpotlight = Boolean(project.isLive);

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`group bg-[#27104C]/90 rounded-2xl border border-white/10 overflow-hidden hover:border-amber-400/50 transition-colors ${
                  isSpotlight
                    ? 'md:col-span-2 grid grid-cols-1 lg:grid-cols-12 items-stretch'
                    : 'flex flex-col justify-between'
                }`}
              >
                {/* 4:3 Project Illustration Container with Zero-Broken-Image Fallback */}
                <div
                  className={`relative overflow-hidden bg-[#140729] ${
                    isSpotlight
                      ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full'
                      : 'aspect-[4/3] w-full'
                  }`}
                >
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={`${project.title} illustration`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#351666] to-[#1A0936] p-6 text-center">
                      <Cpu className="w-10 h-10 text-amber-300 mb-3" />
                      <span className="font-display text-lg font-bold text-white">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#27104C] via-transparent to-transparent opacity-65"
                  />
                </div>

                {/* Copy & Actions Container */}
                <div
                  className={`flex flex-col justify-between ${
                    isSpotlight ? 'lg:col-span-7' : 'flex-1'
                  }`}
                >
                  <div className="p-6 sm:p-7">
                    <p className="text-xs font-medium text-amber-300">
                      {project.domain} <span aria-hidden="true">·</span>{' '}
                      <span className="font-mono tabular-nums">{project.year}</span>
                      {project.isLive && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="text-emerald-300 font-semibold">Live Project</span>
                        </>
                      )}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-purple-100/80 leading-relaxed mt-3">
                      {project.summary}
                    </p>

                    {isSpotlight && (
                      <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-purple-100/85">
                        {project.highlights.map((h) => (
                          <li key={h}>
                            <span className="text-amber-400 font-bold mr-2" aria-hidden="true">
                              —
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 pt-4 border-t border-white/10 font-mono text-xs text-purple-200/80">
                      {project.stack.join(' · ')}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 sm:px-7 pb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          project.liveDemoUrl
                            ? 'border border-white/20 bg-white/10 hover:bg-white/15 text-white'
                            : 'bg-[#EA580C] hover:bg-[#F97316] text-white'
                        }`}
                      >
                        <span>Project Details</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          speech.speak(`project-${project.id}`, project.audioNarration, {
                            voiceName: 'Charon',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-purple-100 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                      >
                        <Volume2 className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
                      </button>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-purple-200 hover:text-amber-300 transition-colors whitespace-nowrap"
                    >
                      <span>GitHub Repo</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
