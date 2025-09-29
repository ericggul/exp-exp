//get embeddings
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DUMMY_SYSTEM_CONTENT = "You are a helpful assistant that can answer questions and help with tasks.";

export default async function handler(req, res) {
  try {
    const response = await openai.chat.completions.create({
      model: "o3-mini", // Ensure that the correct model name is used.
      messages: [
        { role: "system", content: DUMMY_SYSTEM_CONTENT },
        { role: "user", content: req.body.userContent },
      ],
    });

    console.log('response', response);

    const result = response.choices[0].message.content;
    console.log('result', result);
    
    res.status(200).json({ text: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
