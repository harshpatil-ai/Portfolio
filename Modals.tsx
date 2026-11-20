import React, { useEffect, useState } from 'react';
import {
  Award,
  Clock,
  Download,
  ExternalLink,
  Mail,
  RotateCw,
  UserPlus,
  Volume2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  HARSH_PROFILE,
  type CertificateItem,
  type ProjectItem,
} from '../data/portfolioData';
import type { SpeechState } from '../hooks/useGeminiSpeech';

/* 1. Resume Coming Soon Modal */
export const ResumeComingSoonModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="w-full max-w-md rounded-2xl bg-[#1F0B3F] text-white border border-white/15 p-6 sm:p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EA580C]/20 border border-[#F97316]/40 text-amber-300 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3
              id="resume-modal-title"
              className="font-display text-xl font-bold text-white mt-4"
            >
              Resume Coming Soon
            </h3>
            <p className="text-sm text-purple-100/80 leading-relaxed mt-2">
              Harsh Patil’s updated resume PDF is currently being finalized. Once{' '}
              <code className="font-mono text-xs text-amber-300 bg-white/10 px-1.5 py-0.5 rounded">
                Harsh_Patil_Resume.pdf
              </code>{' '}
              is placed in the public folder, both{' '}
              <strong className="text-white">Download Resume</strong> and{' '}
              <strong className="text-white">View Resume</strong> will activate automatically.
            </p>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="#certificates"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <Award className="w-4 h-4 shrink-0" />
                <span>View Verified Certificates</span>
              </a>
              <a
                href={`mailto:${HARSH_PROFILE.email}?subject=Resume%20Request%20-%20Harsh%20Patil`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Request via Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* 2. Certificate Quick-Preview Modal */
export const CertificatePreviewModal: React.FC<{
  certificate: CertificateItem | null;
  onClose: () => void;
}> = ({ certificate, onClose }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(certificate?.id === 'pms-robotics' ? -90 : 0);
  }, [certificate]);

  useEffect(() => {
    if (!certificate) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-preview-title"
            className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#1A0936] text-white border border-white/15 shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-amber-300 truncate">
                  {certificate.issuer} · {certificate.credentialId}
                </p>
                <h3
                  id="cert-preview-title"
                  className="font-display text-lg font-bold text-white truncate"
                >
                  {certificate.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {certificate.fileType === 'image' && (
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate</span>
                  </button>
                )}

                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Original</span>
                </a>

                <a
                  href={certificate.fileUrl}
                  download={certificate.downloadName}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-xs font-semibold text-white transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate preview"
                  className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Preview Body */}
            <div className="flex-1 bg-[#110524] p-4 sm:p-6 overflow-auto flex items-center justify-center min-h-[380px]">
              {certificate.fileType === 'pdf' ? (
                <iframe
                  title={certificate.title}
                  src={certificate.fileUrl}
                  className="w-full h-[65vh] rounded-xl border border-white/10 bg-white"
                />
              ) : (
                <div className="w-full h-[65vh] flex items-center justify-center overflow-hidden">
                  <img
                    src={certificate.fileUrl}
                    alt={certificate.title}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-xl transition-transform duration-200"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* 3. Project Detail Modal */
export const ProjectDetailModal: React.FC<{
  project: ProjectItem | null;
  onClose: () => void;
  speech: SpeechState;
}> = ({ project, onClose, speech }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="w-full max-w-2xl rounded-2xl bg-[#1F0B3F] text-white border border-white/15 overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-[16/9] w-full bg-[#130628]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-xs font-medium text-amber-300">
                {project.domain} <span aria-hidden="true">·</span> {project.year}
              </p>
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-bold text-white"
              >
                {project.title}
              </h3>
              <p className="text-sm text-purple-100/85 leading-relaxed">
                {project.summary}
              </p>

              <ul className="space-y-2 pt-2 text-sm text-purple-100/90">
                {project.highlights.map((h) => (
                  <li key={h}>
                    <span className="text-amber-400 font-bold mr-2" aria-hidden="true">
                      —
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <p className="pt-3 border-t border-white/10 font-mono text-xs text-purple-200/80">
                {project.stack.join(' · ')}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() =>
                    speech.speak(`project-${project.id}`, project.audioNarration, {
                      voiceName: 'Charon',
                    })
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    project.liveDemoUrl
                      ? 'border border-white/20 bg-white/10 hover:bg-white/15 text-white'
                      : 'bg-[#EA580C] hover:bg-[#F97316] text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {speech.activeId === `project-${project.id}`
                      ? 'Stop Audio Summary'
                      : 'Listen to Project Summary'}
                  </span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* 4. Mandatory Confirmation Dialog before saving contact to Google Contacts */
export const SaveContactConfirmModal: React.FC<{
  isOpen: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ isOpen, isSaving, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-contact-title"
            className="w-full max-w-md rounded-2xl bg-white text-[#1E1336] border border-[#E2D9F0] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#2B1055] text-white flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={onCancel}
                aria-label="Cancel saving contact"
                className="p-2 rounded-lg text-[#6B5D87] hover:text-[#1E1336] hover:bg-[#F3EFFA] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3
              id="save-contact-title"
              className="font-display text-lg font-bold text-[#1E1336] mt-4"
            >
              Add Harsh Patil to your Google Contacts?
            </h3>
            <p className="text-sm text-[#52466B] mt-2 leading-relaxed">
              Confirm to create a new contact entry in your Google Contacts address book with these details:
            </p>

            <div className="mt-4 rounded-xl bg-[#FAF9FC] border border-[#E6DFEF] p-4 space-y-1 text-xs text-[#2E1E4E]">
              <p className="font-bold text-sm text-[#1E1336]">
                {HARSH_PROFILE.fullName}
              </p>
              <p>{HARSH_PROFILE.email}</p>
              <p>{HARSH_PROFILE.college}</p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl border border-[#DDD4EB] text-xs font-semibold text-[#433363] hover:bg-[#F3EFFA] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-semibold transition-colors disabled:opacity-60"
              >
                {isSaving ? 'Saving Contact...' : 'Confirm & Save Contact'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
