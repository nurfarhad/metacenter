import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a low-latency, headless auto-correction engine. Your singular task is to fix grammar, spelling, punctuation, and awkward phrasing in the provided text.
STRICT RULES:
1. Output ONLY the corrected text.
2. Do not include introductory phrases, conversational filler, or markdown formatting unless present in the original text.
3. Preserve the original tone, intent, and meaning perfectly. Do not rewrite sentences to be more creative.
4. Preserve all line breaks, spacing, and casing exactly as provided.
5. If the input has no grammatical errors, return the exact original text without modifications.`;

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please configure it in the AI Studio Secrets panel.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function correctPerformance(text: string): Promise<string> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
        maxOutputTokens: 500,
      },
    });

    return response.text || text;
  } catch (error) {
    console.error("AI Auto-correction error:", error);
    return text;
  }
}
