/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import {
  CertificatePreviewModal,
  ProjectDetailModal,
  ResumeComingSoonModal,
} from './components/Modals';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import type { CertificateItem, ProjectItem } from './data/portfolioData';
import { useGeminiSpeech } from './hooks/useGeminiSpeech';
import { useResumeStatus } from './hooks/useResumeStatus';

export default function App() {
  const resumeStatus = useResumeStatus();
  const speech = useGeminiSpeech();

  const [resumeNoticeOpen, setResumeNoticeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [previewCertificate, setPreviewCertificate] =
    useState<CertificateItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FC] text-[#1E1336]">
      <Navbar
        resumeStatus={resumeStatus}
        onResumeUnavailableClick={() => setResumeNoticeOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          resumeStatus={resumeStatus}
          onResumeUnavailableClick={() => setResumeNoticeOpen(true)}
          speech={speech}
        />

        <AboutSection speech={speech} />

        <SkillsSection />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          speech={speech}
        />

        <CertificatesSection
          onPreviewCertificate={(cert) => setPreviewCertificate(cert)}
        />

        <ContactSection />
      </main>

      <Footer
        resumeStatus={resumeStatus}
        onResumeUnavailableClick={() => setResumeNoticeOpen(true)}
      />

      {/* Interactive Modals */}
      <ResumeComingSoonModal
        isOpen={resumeNoticeOpen}
        onClose={() => setResumeNoticeOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        speech={speech}
      />

      <CertificatePreviewModal
        certificate={previewCertificate}
        onClose={() => setPreviewCertificate(null)}
      />
    </div>
  );
}
