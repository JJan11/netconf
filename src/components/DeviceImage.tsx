import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Server, Shield, Loader2 } from 'lucide-react';

const DB_NAME = 'DeviceImagesDB_v2';
const STORE_NAME = 'images';

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCachedImage(key: string): Promise<string | null> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    return null;
  }
}

async function cacheImage(key: string, data: string): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(data, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error('Cache error', e);
  }
}

export default function DeviceImage({ model, type }: { model: string, type: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        const cached = await getCachedImage(model);
        if (cached) {
          if (isMounted) {
            setImgSrc(cached);
            setLoading(false);
          }
          return;
        }

        const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
        const prompt = `A massive 12U rack-mounted chassis network ${type} (model ${model}), installed in a telecom server rack. Features multiple horizontal line cards, high-density fiber optic ports, glowing cyan and blue status LEDs. Sleek, modern, professional 3D render on a dark background, studio lighting, high tech, unified minimalist style, isometric view, highly detailed.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }]
          }
        });

        let base64Image = '';
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }

        if (base64Image) {
          await cacheImage(model, base64Image);
          if (isMounted) {
            setImgSrc(base64Image);
          }
        } else {
          if (isMounted) setError(true);
        }
      } catch (e) {
        console.error("Failed to generate image", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [model, type]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/50 gap-2 z-0">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <span className="text-[10px] text-primary font-mono animate-pulse">AI Generating...</span>
      </div>
    );
  }

  if (error || !imgSrc) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface/50 z-0">
        {type.includes('Firewall') ? <Shield className="w-12 h-12 text-slate-500 opacity-50" /> : <Server className="w-12 h-12 text-slate-500 opacity-50" />}
      </div>
    );
  }

  return <img src={imgSrc} alt={model} className="absolute inset-0 object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal z-0" />;
}
