import { useCallback, useEffect, useRef, useState } from 'react';

export type GeminiVoice = 'Charon' | 'Puck' | 'Kore' | 'Fenrir' | 'Zephyr';

export interface SpeechState {
  activeId: string | null;
  loadingId: string | null;
  error: string | null;
  speak: (id: string, text: string, options?: { voiceName?: GeminiVoice; style?: string }) => Promise<void>;
  stop: () => void;
}

export function useGeminiSpeech(): SpeechState {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setActiveId(null);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      cacheRef.current.forEach((url) => URL.revokeObjectURL(url));
      cacheRef.current.clear();
    };
  }, []);

  const speak = useCallback(
    async (
      id: string,
      text: string,
      options?: { voiceName?: GeminiVoice; style?: string }
    ) => {
      setError(null);

      // Toggle off if clicking the currently playing clip
      if (activeId === id) {
        stop();
        return;
      }

      stop();
      const voiceName = options?.voiceName ?? 'Charon';
      const cacheKey = `${id}:${voiceName}:${text.slice(0, 60)}`;

      try {
        let audioUrl = cacheRef.current.get(cacheKey);
        if (!audioUrl) {
          setLoadingId(id);
          const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text,
              voiceName,
              style: options?.style,
            }),
          });

          const data = (await response.json()) as {
            audioBase64?: string;
            mimeType?: string;
            error?: string;
          };

          if (!response.ok || !data.audioBase64) {
            throw new Error(data.error || 'Unable to generate voice audio.');
          }

          const binary = atob(data.audioBase64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
          audioUrl = URL.createObjectURL(blob);
          cacheRef.current.set(cacheKey, audioUrl);
        }

        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        setActiveId(id);

        audio.onended = () => {
          setActiveId(null);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setError('Audio playback failed in browser.');
          setActiveId(null);
          audioRef.current = null;
        };

        await audio.play();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Speech synthesis failed.';
        setError(message);
        setActiveId(null);
      } finally {
        setLoadingId(null);
      }
    },
    [activeId, stop]
  );

  return { activeId, loadingId, error, speak, stop };
}
