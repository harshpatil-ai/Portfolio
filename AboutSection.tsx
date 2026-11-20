import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Loader2,
  MapPin,
  Play,
  Trophy,
  VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_PILLARS, HARSH_PROFILE } from '../data/portfolioData';
import type { GeminiVoice, SpeechState } from '../hooks/useGeminiSpeech';

interface AboutSectionProps {
  speech: SpeechState;
}

const VOICE_OPTIONS: Array<{ id: GeminiVoice; label: string }> = [
  { id: 'Charon', label: 'Charon · Deep & Calm' },
  { id: 'Puck', label: 'Puck · Energetic' },
  { id: 'Kore', label: 'Kore · Studio Clear' },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ speech }) => {
  const [selectedVoice, setSelectedVoice] = useState<GeminiVoice>('Charon');
  const [customScript, setCustomScript] = useState(HARSH_PROFILE.voiceBioScript);

  const isPlaying = speech.activeId === 'about-tts';
  const isLoading = speech.loadingId === 'about-tts';

  return (
    <section id="about" className="bg-[#FAF9FC] text-[#1E1336] py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#E6DFEF]">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-sm font-semibold text-[#C2410C] tracking-wide">
              About Me
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1336]">
              Engineering with precision, curiosity, and real-world impact.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#52466B] leading-relaxed">
              Undergraduate engineer at {HARSH_PROFILE.college}. Combining strong systems fundamentals with applied AI, modern React development, and industrial robotics.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars: Biography & Profile, Education & Journey, Focus Areas & Passions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {ABOUT_PILLARS.map((pillar, idx) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-[#E6DFEF] p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-mono text-sm font-semibold text-[#EA580C] tabular-nums">
                  {pillar.number}.
                </p>
                <h3 className="font-display text-xl font-bold text-[#1E1336] mt-2">
                  {pillar.title}
                </h3>
                <p className="font-serif text-base text-[#3B1674] mt-2 leading-snug">
                  {pillar.lead}
                </p>
                <p className="text-sm text-[#52466B] leading-relaxed mt-4">
                  {pillar.body}
                </p>
              </div>

              <ul className="mt-6 pt-5 border-t border-[#F0EAF7] space-y-2.5 text-sm text-[#2E1E4E]">
                {pillar.highlights.map((item) => (
                  <li key={item} className="leading-snug">
                    <span className="text-[#EA580C] font-bold mr-2" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Gemini 3.8 Flash TTS Voice Bio Reader */}
        <div className="mt-14 bg-white rounded-2xl border border-[#E6DFEF] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-semibold text-[#C2410C]">
                Audio Introduction <span aria-hidden="true">·</span> Gemini 3.8 Flash TTS
              </p>
              <h3 className="font-display text-xl font-bold text-[#1E1336]">
                Hear Harsh’s Portfolio Summary
              </h3>
              <p className="text-sm text-[#52466B] leading-relaxed">
                Prefer listening? Play the spoken bio or edit the prompt text to test natural speech narration powered by Gemini 3.8 Flash TTS.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {VOICE_OPTIONS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVoice(v.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedVoice === v.id
                        ? 'bg-[#2B1055] text-white'
                        : 'bg-[#F3EFFA] text-[#433363] hover:bg-[#E7DFF5]'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <label
                htmlFor="tts-bio-script"
                className="block text-xs font-medium text-[#52466B]"
              >
                Spoken Script (Editable)
              </label>
              <textarea
                id="tts-bio-script"
                rows={3}
                value={customScript}
                onChange={(e) => setCustomScript(e.target.value)}
                maxLength={1500}
                className="w-full rounded-xl border border-[#DDD4EB] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1E1336] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isLoading || customScript.trim().length === 0}
                    onClick={() =>
                      speech.speak('about-tts', customScript, {
                        voiceName: selectedVoice,
                        style:
                          'Warm, articulate, confident engineering student introducing his portfolio',
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B1055]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isPlaying ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>
                      {isLoading
                        ? 'Synthesizing...'
                        : isPlaying
                          ? 'Stop Audio'
                          : 'Convert Text to Speech'}
                    </span>
                  </button>

                  {customScript !== HARSH_PROFILE.voiceBioScript && (
                    <button
                      type="button"
                      onClick={() => setCustomScript(HARSH_PROFILE.voiceBioScript)}
                      className="text-xs font-medium text-[#52466B] hover:text-[#1E1336] underline underline-offset-4 whitespace-nowrap"
                    >
                      Reset Default Bio
                    </button>
                  )}
                </div>

                <span className="font-mono text-xs text-[#6B5D87] tabular-nums">
                  {customScript.length}/1500 chars
                </span>
              </div>

              {speech.error && (
                <p className="text-xs text-[#B91C1C] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {speech.error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Education & Verified Academic Standing Showcase */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: White Undergraduate Degree Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 bg-white rounded-3xl border border-[#E6DFEF] p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold tracking-wider text-[#EA580C]">
                  UNDERGRADUATE DEGREE
                </p>
                <span className="font-mono text-xs font-semibold text-white bg-[#2B1B5B] px-3.5 py-1.5 rounded-lg tabular-nums">
                  2025 – 2029 · Second Year
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1336] mt-5 leading-tight">
                Bachelor of Engineering (B.E.)
              </h3>

              <div className="flex items-center gap-2 text-[#EA580C] font-semibold text-sm sm:text-base mt-2.5">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Engineering · AI, Software &amp; IIoT</span>
              </div>

              <dl className="mt-7 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-[#6B5D87] shrink-0">
                    <Building2 className="w-4 h-4 text-[#EA580C]" />
                    <span>College:</span>
                  </dt>
                  <dd className="font-bold text-[#1E1336] text-right">
                    Dr. D. Y. Patil College of Engineering &amp; Innovation
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-[#6B5D87] shrink-0">
                    <GraduationCap className="w-4 h-4 text-[#EA580C]" />
                    <span>University:</span>
                  </dt>
                  <dd className="font-bold text-[#1E1336] text-right">
                    Savitribai Phule Pune University
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-[#6B5D87] shrink-0">
                    <MapPin className="w-4 h-4 text-[#EA580C]" />
                    <span>Location:</span>
                  </dt>
                  <dd className="font-bold text-[#1E1336] text-right">
                    {HARSH_PROFILE.location}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-7 rounded-2xl bg-[#FAF9FC] border border-[#E6DFEF] p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0" />
              <p className="text-xs sm:text-sm text-[#433363] leading-snug">
                Completed First Year Engineering with 6 verified industry &amp; academic credentials across AI, C/C++, and IIoT.
              </p>
            </div>
          </motion.div>

          {/* Right: Deep Purple Spotlight Standing Card + 2-Column Proficiency Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5">
            {/* Deep Purple Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="flex-1 bg-[#2B1B5B] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex items-center justify-between gap-5"
            >
              <div>
                <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-purple-100/90">
                  <Trophy className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>NPTEL IIT MADRAS CONSOLIDATED SCORE</span>
                </p>

                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#F97316] tabular-nums">
                    71%
                  </span>
                  <span className="font-display text-lg sm:text-xl font-bold text-white/85">
                    / 100 · Elite
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-purple-100/85 mt-2.5">
                  Managing Intellectual Property in Universities · 2 Credits
                </p>
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#3A2873] border border-white/10 flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 sm:w-9 sm:h-9 text-[#F97316]" />
              </div>
            </motion.div>

            {/* 2-Column White Proficiency Cards */}
            <div className="grid grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-white rounded-3xl border border-[#E6DFEF] p-5 sm:p-6 shadow-sm"
              >
                <p className="text-xs sm:text-sm font-semibold text-[#52466B]">
                  Business Comm.
                </p>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#EA580C] mt-2 tabular-nums">
                  A+
                </p>
                <p className="text-xs font-bold text-[#1E1336] mt-2">
                  Imarticus · NSDC Grade
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: 0.14 }}
                className="bg-white rounded-3xl border border-[#E6DFEF] p-5 sm:p-6 shadow-sm"
              >
                <p className="text-xs sm:text-sm font-semibold text-[#52466B]">
                  C &amp; C++ Prof.
                </p>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#EA580C] mt-2 tabular-nums">
                  A
                </p>
                <p className="text-xs font-bold text-[#1E1336] mt-2">
                  Imarticus · NSDC Grade
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
