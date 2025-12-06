import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Initialize Gemini Client
// IMPORTANT: In a real production app, API calls should go through a backend to protect the key.
// For this demo, we assume the environment variable is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProductInsights = async (product: Product, query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI Service Unavailable: Missing API Key.";
  }

  try {
    const prompt = `
      You are an expert shopping assistant for an e-commerce platform called JIOM.
      
      Product Details:
      Title: ${product.title}
      Price: ₹${product.price}
      Category: ${product.category}
      Description: ${product.description}
      Rating: ${product.rating} stars
      
      User Question: "${query}"
      
      Answer the user's question concisely and helpfully based on the product details provided. 
      If the question is about comparison, assume this is a high-quality product in its tier.
      Keep the tone professional yet friendly (Amazon-style support).
      Maximum 3 sentences.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate an answer at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI assistant right now.";
  }
};

export const generateComparison = async (products: Product[]): Promise<string> => {
    if (!process.env.API_KEY) return "AI Service Unavailable.";

    try {
        const productList = products.map(p => `- ${p.title} (₹${p.price}): ${p.description}`).join('\n');
        const prompt = `
            Compare the following products concisely for a potential buyer. Highlight the best value for money.
            
            ${productList}
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Comparison unavailable.";
    } catch (e) {
        return "Could not compare products.";
    }
}
