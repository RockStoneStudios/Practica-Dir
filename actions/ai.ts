"use server";

import { GoogleGenAI } from "@google/genai";
import { BusinessState } from "@/utils/types/business";


const apiKey = process.env.GEMEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const aiGenerateBusinessDescription = async (
  business: BusinessState
): Promise<string> => {
  try {
    const prompt = `Generar 180 palabras de contenido SEO en formato HTML (con h2, h3, ul, li, sin incluir <doctype html>, etc.),
     sin Markdown, para esta empresa.: ${JSON.stringify(business)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // modelo más nuevo
      contents: prompt,
    });

    return response.text ?? "";
  } catch (error) {
    console.error("Error generating business description:", error);
    throw new Error("Failed to generate description");
  }
};
