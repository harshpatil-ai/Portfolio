import React from 'react';
import {
  Cpu,
  GitBranch,
  MessageSquareText,
  Sparkles,
  Award,
  GraduationCap,
  ShieldCheck,
  Code2,
  Bot,
  Briefcase,
} from 'lucide-react';

export function CppLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 2.5L28 9.4V22.6L16 29.5L4 22.6V9.4L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M14.2 12.1A4.8 4.8 0 1 0 14.2 19.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 16H21.5M19.75 14.25V17.75M23 16H26.5M24.75 14.25V17.75"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PythonLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M15.8 4C11.3 4 11.6 6 11.6 6V8.6H16.1V9.5H9.6C9.6 9.5 6 9.1 6 14.1C6 19.1 9.1 18.9 9.1 18.9H11V16.4C11 16.4 10.9 13.3 14 13.3H18.4C18.4 13.3 21 13.3 21 10.8V6.5C21 6.5 21.4 4 15.8 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16.2 28C20.7 28 20.4 26 20.4 26V23.4H15.9V22.5H22.4C22.4 22.5 26 22.9 26 17.9C26 12.9 22.9 13.1 22.9 13.1H21V15.6C21 15.6 21.1 18.7 18 18.7H13.6C13.6 18.7 11 18.7 11 21.2V25.5C11 25.5 10.6 28 16.2 28Z"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="13.8" cy="6.6" r="1" fill="currentColor" />
      <circle cx="18.2" cy="25.4" r="1" fill="#F97316" />
    </svg>
  );
}

export function ReactLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="2.4" fill="#F97316" />
      <ellipse
        cx="16"
        cy="16"
        rx="12.5"
        ry="4.8"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="12.5"
        ry="4.8"
        transform="rotate(60 16 16)"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="12.5"
        ry="4.8"
        transform="rotate(120 16 16)"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14.5 14V21.2C14.5 22.8 13.5 23.6 12 23.6C11 23.6 10.3 23.2 9.8 22.6"
        stroke="#F97316"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M22.2 15.2C21.8 14.4 20.9 14 19.8 14C18.3 14 17.4 14.8 17.4 16C17.4 17.2 18.4 17.8 20 18.4C21.7 19 22.5 19.7 22.5 21.1C22.5 22.6 21.3 23.6 19.5 23.6C18.1 23.6 17.1 23 16.6 22"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GitHubLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedInLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export function InstagramLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SkillIcon({
  iconKey,
  className = 'w-6 h-6',
}: {
  iconKey: string;
  className?: string;
}) {
  switch (iconKey) {
    case 'cpp':
      return <CppLogo className={className} />;
    case 'python':
      return <PythonLogo className={className} />;
    case 'react':
      return <ReactLogo className={className} />;
    case 'javascript':
      return <JavaScriptLogo className={className} />;
    case 'github':
      return <GitBranch className={className} />;
    case 'ai':
      return <Sparkles className={className} />;
    case 'iiot':
      return <Cpu className={className} />;
    default:
      return <MessageSquareText className={className} />;
  }
}

export function CertificateIssuerIcon({
  issuerKey,
  className = 'w-6 h-6',
}: {
  issuerKey: string;
  className?: string;
}) {
  switch (issuerKey) {
    case 'nptel':
      return <GraduationCap className={className} />;
    case 'adobe':
      return <Sparkles className={className} />;
    case 'smartbridge':
      return <Briefcase className={className} />;
    case 'imarticus-cpp':
      return <Code2 className={className} />;
    case 'imarticus-comm':
      return <Award className={className} />;
    case 'pms':
      return <Bot className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
}
