import { useCallback, useEffect, useState } from 'react';

export interface ResumeStatus {
  available: boolean;
  checking: boolean;
  resumeUrl: string;
  filename: string;
  recheck: () => Promise<boolean>;
}

export function useResumeStatus(): ResumeStatus {
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkAvailability = useCallback(async (): Promise<boolean> => {
    setChecking(true);
    try {
      const statusRes = await fetch('/api/resume/status', { cache: 'no-store' });
      if (statusRes.ok) {
        const data = (await statusRes.json()) as { available?: boolean };
        if (typeof data.available === 'boolean') {
          setAvailable(data.available);
          return data.available;
        }
      }
      // Fallback check directly against the PDF endpoint verifying PDF content-type
      const headRes = await fetch('/Harsh_Patil_Resume.pdf', {
        method: 'HEAD',
        cache: 'no-store',
      });
      const contentType = headRes.headers.get('content-type') || '';
      const isPdf = headRes.ok && contentType.toLowerCase().includes('application/pdf');
      setAvailable(isPdf);
      return isPdf;
    } catch {
      setAvailable(false);
      return false;
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    void checkAvailability();
  }, [checkAvailability]);

  return {
    available,
    checking,
    resumeUrl: '/Harsh_Patil_Resume.pdf',
    filename: 'Harsh_Patil_Resume.pdf',
    recheck: checkAvailability,
  };
}
