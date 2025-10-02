
import { GoogleGenAI, Type } from "@google/genai";
import type { VideoResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const findVideos = async (topic: string): Promise<VideoResult[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const systemInstruction = `
あなたは日本の高校生の学習を支援する優秀なアシスタントです。
指定されたトピックに関する、無料で視聴できる質の高い授業動画を5つ見つけてください。
検索対象はYouTube、NHK高校講座、および有名な予備校や教育関連企業のサイトに限定します。
各動画について、以下の情報をJSON形式で返してください。
- title: 動画の正式なタイトル
- url: 動画を視聴できる有効なURL
- reason: なぜその動画が高校生の学習におすすめなのか、具体的で魅力的な理由（例：図解が多くて分かりやすい、基本から応用までカバーしている、など）
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: topic,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: '動画のタイトル'
              },
              url: {
                type: Type.STRING,
                description: '動画のURL'
              },
              reason: {
                type: Type.STRING,
                description: 'この動画のおすすめ理由'
              },
            },
            required: ["title", "url", "reason"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const results = JSON.parse(jsonText);
    return results as VideoResult[];

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to fetch video recommendations from AI.");
  }
};
