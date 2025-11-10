//get embeddings
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DUMMY_SYSTEM_CONTENT = "You are a helpful assistant that can answer questions and help with tasks.";

export default async function handler(req, res) {
  try {
    const response = await openai.responses.create({
      model: "gpt-5",
      // Use 'instructions' to provide system-level guidance with the Responses API
      instructions: DUMMY_SYSTEM_CONTENT,
      // For simple text generation, provide the user's content as input
      input: req.body?.userContent ?? "",
    });

    console.log('response', response);

    // Prefer the SDK helper when available; fall back to extracting text manually
    const result =
      response.output_text ??
      response.output?.map?.(o =>
        o?.content?.map?.(c => c?.text?.value).filter(Boolean).join("")
      ).join("") ??
      "";
    console.log('result', result);
    
    res.status(200).json({ text: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
