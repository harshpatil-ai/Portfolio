import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

function findResumePath(): string | null {
  const candidates = [
    path.resolve(__dirname, 'public', 'Harsh_Patil_Resume.pdf'),
    path.resolve(__dirname, 'dist', 'Harsh_Patil_Resume.pdf'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Check whether Harsh_Patil_Resume.pdf has been uploaded to public/
  app.get('/api/resume/status', (_req, res) => {
    const resumePath = findResumePath();
    res.json({
      available: Boolean(resumePath),
      filename: 'Harsh_Patil_Resume.pdf',
      url: '/Harsh_Patil_Resume.pdf',
    });
  });

  // Ensure /Harsh_Patil_Resume.pdf never falls back to index.html if missing
  app.all('/Harsh_Patil_Resume.pdf', (req, res) => {
    const resumePath = findResumePath();
    if (!resumePath) {
      res.status(404).json({
        available: false,
        message: 'Resume Coming Soon',
      });
      return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Harsh_Patil_Resume.pdf"');
    if (req.method === 'HEAD') {
      const stat = fs.statSync(resumePath);
      res.setHeader('Content-Length', String(stat.size));
      res.status(200).end();
      return;
    }
    res.sendFile(resumePath);
  });

  // Server-side Gemini 3.8 Flash TTS endpoint
  app.post('/api/tts', async (req, res) => {
    const { text, style, voiceName } = req.body as {
      text?: string;
      style?: string;
      voiceName?: string;
    };

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({ error: 'Text is required for speech synthesis.' });
      return;
    }

    if (text.length > 2000) {
      res.status(400).json({ error: 'Text exceeds 2000 character limit.' });
      return;
    }

    const ai = getGenAIClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured on the server. Add GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const allowedVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];
    const selectedVoice =
      voiceName && allowedVoices.includes(voiceName) ? voiceName : 'Charon';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.trim(),
                speechMetadata: {
                  style:
                    typeof style === 'string' && style.trim().length > 0
                      ? style.trim()
                      : 'Warm, articulate, confident software engineer introducing his portfolio cleanly',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const audioBase64 =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!audioBase64) {
        res.status(502).json({
          error: 'No audio data returned by Gemini TTS.',
        });
        return;
      }

      res.json({
        audioBase64,
        mimeType: 'audio/wav',
        model: 'gemini-3.8-flash-tts',
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to generate speech.';
      console.error('TTS error:', message);
      res.status(500).json({ error: message });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
