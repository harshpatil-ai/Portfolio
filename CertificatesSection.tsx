import React, { useMemo, useState } from 'react';
import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CERTIFICATES_DATA, type CertificateItem } from '../data/portfolioData';
import { CertificateIssuerIcon } from './TechIcons';

interface CertificatesSectionProps {
  onPreviewCertificate: (cert: CertificateItem) => void;
}

const CERT_CATEGORIES: Array<'All' | CertificateItem['category']> = [
  'All',
  'AI & GenAI',
  'Engineering & Core',
  'Professional & IP',
];

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  onPreviewCertificate,
}) => {
  const [filter, setFilter] = useState<'All' | CertificateItem['category']>('All');

  const filteredCerts = useMemo(() => {
    if (filter === 'All') return CERTIFICATES_DATA;
    return CERTIFICATES_DATA.filter((c) => c.category === filter);
  }, [filter]);

  return (
    <section
      id="certificates"
      className="bg-[#120624] text-white py-20 sm:py-28 border-t border-white/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-[#F97316] tracking-wide">
              Achievements &amp; Credentials
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Certificates &amp; Verified Credentials
            </h2>
            <p className="text-sm sm:text-base text-purple-100/75 leading-relaxed">
              Every credential below connects directly to its original PDF or certificate document—click the issuer icon to preview or open and download the original file.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter certificates"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#220D42] border border-white/10"
          >
            {CERT_CATEGORIES.map((category) => {
              const selected = filter === category;
              const count =
                category === 'All'
                  ? CERTIFICATES_DATA.length
                  : CERTIFICATES_DATA.filter((c) => c.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                    selected
                      ? 'bg-[#EA580C] text-white shadow-sm'
                      : 'text-purple-100/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* All 6 Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {filteredCerts.map((cert, idx) => (
            <motion.article
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group bg-gradient-to-b from-[#27104C] to-[#1D0B3B] rounded-2xl border border-white/10 hover:border-[#F97316]/60 p-6 flex flex-col justify-between shadow-md transition-all duration-200"
            >
              <div>
                {/* Top Row: Clickable Issuer Icon + Quick Preview Icon */}
                <div className="flex items-start justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onPreviewCertificate(cert)}
                    title={`Preview ${cert.shortTitle}`}
                    aria-label={`Preview ${cert.title}`}
                    className="w-12 h-12 rounded-xl bg-[#EA580C]/15 border border-[#F97316]/40 text-[#FB923C] hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                  >
                    <CertificateIssuerIcon issuerKey={cert.issuerKey} className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onPreviewCertificate(cert)}
                    title="Inspect original credential document"
                    aria-label={`Inspect ${cert.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-200/75 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
                  >
                    {cert.fileType === 'pdf' ? (
                      <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-amber-300 shrink-0" />
                    )}
                    <span>Quick Preview</span>
                  </button>
                </div>

                {/* Certificate Issuer & Date (Clean Unboxed Typography) */}
                <div className="mt-5">
                  <p className="text-xs font-medium text-amber-300">
                    {cert.issuer}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white mt-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-purple-200/75 mt-1.5">
                    {cert.dateLabel} <span aria-hidden="true">·</span>{' '}
                    {cert.durationOrScore}
                  </p>
                </div>

                <p className="text-sm text-purple-100/75 leading-relaxed mt-3.5">
                  {cert.description}
                </p>

                {/* Credential Metadata Block */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs">
                  {cert.gradeOrTrack && (
                    <div className="flex items-center justify-between gap-2 text-purple-100/90">
                      <span className="text-purple-200/60">Standing</span>
                      <span className="font-semibold text-amber-300">
                        {cert.gradeOrTrack}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2 text-purple-100/90">
                    <span className="text-purple-200/60">Credential ID</span>
                    <span className="font-mono tabular-nums text-white/95 truncate max-w-[190px]">
                      {cert.credentialId}
                    </span>
                  </div>
                  {cert.verifyUrl && (
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <span className="text-purple-200/60">Verification</span>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium underline underline-offset-4"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Coursera Verify</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: View Certificate (new tab) + Download Certificate */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span>View Certificate</span>
                </a>

                <a
                  href={cert.fileUrl}
                  download={cert.downloadName}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Download</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
