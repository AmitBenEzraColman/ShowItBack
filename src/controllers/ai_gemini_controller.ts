import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";

export const sendGeminiReq = async (req: Request, res: Response) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `I have watched and liked the tv show: ${req.query.tvShowTitle}. 
    I want you to give me a reccomentation for my next tv show based on this tv show.
    If you dont find any tv show, please return a random reccomended tv show.
    Please tell me the tv show name and the author 
    and a short description of the tv show (2-3 sentences).
    Please put on tv show name quotes and a dot after the author name.
    Please return all in plain text with no html or other formatting.`;

    const result = await model.generateContent(prompt);

    res.status(200).send(result.response.text());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gemini Request Failed." });
  }
};