import React, { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  Calendar,
  Check,
  Compass,
  Copy,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  RefreshCw,
  Search,
  Send,
  UserPlus,
  Users,
} from 'lucide-react';
import { HARSH_PROFILE } from '../data/portfolioData';
import {
  fetchGoogleContacts,
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
  saveHarshPatilToGoogleContacts,
  type GoogleContactPerson,
} from '../lib/googleAuth';
import { SaveContactConfirmModal } from './Modals';
import { GitHubLogo, InstagramLogo, LinkedInLogo } from './TechIcons';

export const ContactSection: React.FC = () => {
  // Send a Message state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subjectText, setSubjectText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [inquiryFeedback, setInquiryFeedback] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Google Contacts Integration State
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<GoogleContactPerson[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [contactSearch, setContactSearch] = useState('');

  // Mandatory confirmation dialog state before mutating Google Contacts
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const loadContacts = async (token: string) => {
    setLoadingContacts(true);
    setContactsError(null);
    try {
      const list = await fetchGoogleContacts(token);
      setContacts(list);
    } catch (err: unknown) {
      setContactsError(
        err instanceof Error ? err.message : 'Unable to load Google Contacts.'
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setNeedsAuth(false);
        void loadContacts(token);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
        setContacts([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setContactsError(null);
    setSaveSuccessMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        await loadContacts(result.accessToken);
      }
    } catch (err: unknown) {
      setContactsError(
        err instanceof Error
          ? err.message
          : 'Google sign-in was cancelled or failed.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setContacts([]);
    setSaveSuccessMsg(null);
    setContactsError(null);
  };

  const handleConfirmSaveContact = async () => {
    setSavingContact(true);
    setContactsError(null);
    setSaveSuccessMsg(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        setConfirmSaveOpen(false);
        setNeedsAuth(true);
        throw new Error('Session expired. Please sign in with Google again.');
      }
      const saved = await saveHarshPatilToGoogleContacts(token);
      setSaveSuccessMsg(
        `Saved "${saved.displayName}" to your Google Contacts.`
      );
      setConfirmSaveOpen(false);
      await loadContacts(token);
    } catch (err: unknown) {
      setContactsError(
        err instanceof Error ? err.message : 'Failed to save contact.'
      );
    } finally {
      setSavingContact(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HARSH_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      return;
    }
    const finalSubject =
      subjectText.trim() || `Portfolio Inquiry from ${senderName.trim()}`;
    const subject = encodeURIComponent(finalSubject);
    const body = encodeURIComponent(
      `From: ${senderName.trim()} (${senderEmail.trim()})\n\n${messageText.trim()}`
    );
    window.location.href = `mailto:${HARSH_PROFILE.email}?subject=${subject}&body=${body}`;
    setInquiryFeedback(
      `Opening your email client to send your message to ${HARSH_PROFILE.email}.`
    );
  };

  const handleScheduleQuickCall = () => {
    const subject = encodeURIComponent(
      `Quick Call Request — ${senderName.trim() || 'Portfolio Visitor'}`
    );
    const body = encodeURIComponent(
      `Hi Harsh,\n\nI would like to schedule a quick 15-minute call to discuss opportunities or a project.\n\nName: ${senderName.trim() || '[Your Name]'}\nEmail: ${senderEmail.trim() || '[Your Email]'}\nPreferred Time Window: [Add Date/Time]\n`
    );
    window.location.href = `mailto:${HARSH_PROFILE.email}?subject=${subject}&body=${body}`;
    setInquiryFeedback(
      `Opening your email client to schedule a quick call with ${HARSH_PROFILE.email}.`
    );
  };

  const filteredContacts = contacts.filter((c) => {
    const q = contactSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      c.displayName.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.organization && c.organization.toLowerCase().includes(q))
    );
  });

  return (
    <section id="contact" className="bg-[#FAF9FC] text-[#1E1336] py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pb-12 border-b border-[#E6DFEF]">
          <p className="text-sm font-semibold text-[#C2410C] tracking-wide">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1336] mt-2">
            Connect with Harsh Patil
          </h2>
          <p className="text-base text-[#52466B] mt-3 leading-relaxed">
            Open to engineering internships, AI &amp; full-stack collaborations, and recruiter conversations. Send a message, reach out via direct coordinates, or connect via Google Contacts.
          </p>
        </div>

        {/* Main Contact Grid matching reference visual structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
          {/* Card 1: Send a Message (White Card with Orange + Deep Purple stacked CTAs) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DFEF] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-6">
              <MessageSquare className="w-6 h-6 text-[#EA580C] shrink-0" />
              <h3 className="font-display text-2xl font-extrabold text-[#1E1336]">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold tracking-wider text-[#52466B] mb-1.5"
                >
                  YOUR NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full rounded-xl border border-[#E5DDF0] bg-[#F5F4F8] px-4 py-3 text-sm text-[#1E1336] placeholder:text-[#8E83A5] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold tracking-wider text-[#52466B] mb-1.5"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-xl border border-[#E5DDF0] bg-[#F5F4F8] px-4 py-3 text-sm text-[#1E1336] placeholder:text-[#8E83A5] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold tracking-wider text-[#52466B] mb-1.5"
                >
                  SUBJECT
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subjectText}
                  onChange={(e) => setSubjectText(e.target.value)}
                  placeholder="Project inquiry or discussion"
                  className="w-full rounded-xl border border-[#E5DDF0] bg-[#F5F4F8] px-4 py-3 text-sm text-[#1E1336] placeholder:text-[#8E83A5] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold tracking-wider text-[#52466B] mb-1.5"
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Describe your project, timeline, or requirements..."
                  className="w-full rounded-xl border border-[#E5DDF0] bg-[#F5F4F8] px-4 py-3 text-sm text-[#1E1336] placeholder:text-[#8E83A5] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white text-sm font-bold tracking-wide shadow-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B1055]"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>SEND MESSAGE</span>
                </button>

                <button
                  type="button"
                  onClick={handleScheduleQuickCall}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2B1B5B] hover:bg-[#382375] text-white text-sm font-bold tracking-wide transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                >
                  <Calendar className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>SCHEDULE QUICK CALL</span>
                </button>
              </div>

              {inquiryFeedback && (
                <p className="text-xs text-[#2B1055] font-medium pt-1">
                  {inquiryFeedback}
                </p>
              )}
            </form>
          </div>

          {/* Right Column: Direct Coordinates Card + Google Contacts Network Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 2: Direct Coordinates (Deep Purple Card matching screenshot) */}
            <div className="bg-[#2B1B5B] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-2.5 pb-6">
                <Compass className="w-5 h-5 text-[#F97316] shrink-0" />
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                  Direct Coordinates
                </h3>
              </div>

              <div className="space-y-5">
                {/* Email Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#3A2873] text-[#F97316] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-purple-200/75">Email Address</p>
                      <a
                        href={`mailto:${HARSH_PROFILE.email}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors break-all"
                      >
                        {HARSH_PROFILE.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-2 rounded-lg bg-[#3A2873] hover:bg-[#49348C] text-purple-100 transition-colors shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#3A2873] text-[#F97316] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-200/75">Location</p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      {HARSH_PROFILE.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connect on Social */}
              <div className="mt-7 pt-6 border-t border-white/15">
                <p className="text-xs font-bold tracking-wider text-purple-200/80 mb-4">
                  CONNECT ON SOCIAL
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={HARSH_PROFILE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Harsh Patil on Instagram"
                    title="Instagram (@harsh_p69247)"
                    className="w-12 h-12 rounded-xl bg-[#3A2873] hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <InstagramLogo className="w-5 h-5" />
                  </a>

                  <a
                    href={HARSH_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Harsh Patil on GitHub"
                    title="GitHub (harshpatil-ai)"
                    className="w-12 h-12 rounded-xl bg-[#3A2873] hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <GitHubLogo className="w-5 h-5" />
                  </a>

                  <a
                    href={HARSH_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Harsh Patil on LinkedIn"
                    title="LinkedIn (Harsh Patil)"
                    className="w-12 h-12 rounded-xl bg-[#3A2873] hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <LinkedInLogo className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Google Contacts Workspace Integration */}
            <div className="bg-[#220D42] text-white rounded-3xl border border-purple-900/50 p-6 sm:p-7 shadow-md">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-semibold text-amber-300">
                    Google Workspace Integration
                  </p>
                  <h3 className="font-display text-lg font-bold text-white mt-0.5">
                    Google Contacts Network
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {needsAuth ? (
                <div className="pt-5 flex flex-col items-start space-y-4">
                  <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
                    Connect with Google Contacts (with your permission) to browse your contacts or save Harsh Patil’s card directly to your address book.
                  </p>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoggingIn}
                    className="gsi-material-button"
                  >
                    <div className="gsi-material-button-state" />
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          style={{ display: 'block' }}
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          />
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          />
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          />
                          <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents">
                        {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
                      </span>
                    </div>
                  </button>

                  {contactsError && (
                    <p className="text-xs text-amber-300 bg-amber-950/50 border border-amber-400/30 rounded-lg px-3 py-2">
                      {contactsError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="pt-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[11px] text-purple-200/70">Connected as</p>
                      <p className="text-xs font-semibold text-white truncate max-w-[180px]">
                        {user?.displayName || user?.email || 'Google User'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmSaveOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <UserPlus className="w-3.5 h-3.5 shrink-0" />
                        <span>Save Harsh</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        aria-label="Sign out of Google Contacts"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-xs text-purple-100 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {saveSuccessMsg && (
                    <div className="rounded-lg bg-emerald-950/60 border border-emerald-400/40 px-3 py-2 text-xs text-emerald-200 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>{saveSuccessMsg}</span>
                    </div>
                  )}

                  {contactsError && (
                    <p className="text-xs text-amber-300 bg-amber-950/50 border border-amber-400/30 rounded-lg px-3 py-2">
                      {contactsError}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-purple-300/60 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        placeholder="Filter contacts..."
                        className="w-full rounded-lg bg-[#16072D] border border-white/15 pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-purple-200/45 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const token = await getAccessToken();
                        if (token) await loadContacts(token);
                        else setNeedsAuth(true);
                      }}
                      disabled={loadingContacts}
                      aria-label="Refresh Google Contacts"
                      className="p-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-purple-100 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${loadingContacts ? 'animate-spin' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="max-h-44 overflow-y-auto divide-y divide-white/10 rounded-xl border border-white/10 bg-[#180831]">
                    {loadingContacts ? (
                      <div className="p-5 flex items-center justify-center gap-2 text-xs text-purple-200">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Loading contacts...</span>
                      </div>
                    ) : filteredContacts.length === 0 ? (
                      <div className="p-5 text-center text-xs text-purple-200/70">
                        {contacts.length === 0
                          ? 'No contacts found in your Google Contacts list.'
                          : 'No matching contacts found.'}
                      </div>
                    ) : (
                      filteredContacts.map((person) => (
                        <div
                          key={person.resourceName}
                          className="px-3.5 py-2 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {person.displayName}
                            </p>
                            <p className="text-[11px] text-purple-200/65 truncate">
                              {[person.email, person.organization]
                                .filter(Boolean)
                                .join(' · ') || 'Google Contact'}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog before mutating Google Contacts */}
      <SaveContactConfirmModal
        isOpen={confirmSaveOpen}
        isSaving={savingContact}
        onCancel={() => setConfirmSaveOpen(false)}
        onConfirm={handleConfirmSaveContact}
      />
    </section>
  );
};
