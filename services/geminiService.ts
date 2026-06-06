
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";
import { SimulationScenario } from '../types';

/**
 * AGRON NEURAL LINK CORE
 * Centralized service for institutional AI operations.
 */

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("AGRON_SEC: Neural Link Key missing from environment.");
  }
  return new GoogleGenAI({ apiKey });
};

// --- IMAGE ANALYSIS & EDITING (FLASH 2.5 / PRO 3) ---

export const analyzeImage = async (imageB64: string, prompt: string): Promise<string> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      { inlineData: { data: imageB64, mimeType: 'image/jpeg' } },
      { text: prompt }
    ]
  });
  return response.text || "Analysis failed.";
};

export const editImage = async (imageB64: string, prompt: string): Promise<string | null> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: imageB64, mimeType: 'image/jpeg' } },
        { text: `Edit this image based on the following instruction: ${prompt}. Maintain institutional and professional quality.` }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

// --- HIGH QUALITY IMAGE GENERATION (PRO 3 IMAGE) ---

export const generateProImage = async (prompt: string, aspectRatio: string, imageSize: "1K" | "2K" | "4K"): Promise<string | null> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

// --- VIDEO GENERATION (VEO 3.1) ---

export const generateVeoVideo = async (imageB64: string, prompt: string, aspectRatio: "16:9" | "9:16"): Promise<string | null> => {
  const ai = getClient();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: {
      imageBytes: imageB64,
      mimeType: 'image/jpeg',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) return null;

  const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

// --- LOW LATENCY PROCESSING (FLASH LITE) ---

export const getQuickResponse = async (prompt: string): Promise<string> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
    config: {
      systemInstruction: "You are an AGRON technical assistant specializing in autonomous drone systems and AgOps. Provide ultra-concise, institutional-grade responses."
    }
  });
  return response.text || "No response.";
};

// --- LEGACY EXPORTS (Refactored for consistency) ---

export const generateHeroImage = async (prompt: string): Promise<string | null> => {
  const ai = getClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) { return null; }
};

export const generateSimulationScenario = async (platform: string, env: string, level: string): Promise<SimulationScenario> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate an autonomous drone mission simulation for a ${platform} platform in a ${env} environment. Complexity: ${level}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          platformType: { type: Type.STRING },
          environment: { type: Type.STRING },
          riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "Critical"] },
          objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
          safetyProtocols: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "platformType", "riskLevel", "objectives", "safetyProtocols"]
      }
    }
  });
  return JSON.parse(response.text || '{}') as SimulationScenario;
};
