
import { GoogleGenAI } from "@google/genai";

export const askGemini = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a concise and helpful AI assistant for a modern React starter kit. Provide clear, helpful answers in Markdown format.",
        temperature: 0.7,
      },
    });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the AI service. Please check your configuration.";
  }
};
