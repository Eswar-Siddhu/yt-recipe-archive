import OpenAI from 'openai';
import { RecipeSchema, Recipe } from '../types';

export async function generateRecipeFromTranscript(
  transcript: string, 
  metadata: any, 
  apiKey: string
): Promise<Recipe> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const prompt = `
    Convert the following cooking video transcript and metadata into a structured JSON recipe.
    Metadata: Title: ${metadata.title}, Channel: ${metadata.channel}
    Transcript: ${transcript}
    
    Extract the exact ingredients, step-by-step instructions, and estimate times and nutrition.
    Ensure the output matches the exact JSON schema provided.
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    response_format: { type: "json_object" }
  });

  const rawJson = JSON.parse(completion.choices[0].message.content || '{}');
  
  // Inject the cover image and basic ID
  rawJson.id = metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  rawJson.images = { cover: metadata.coverImage };
  rawJson.basicInfo = {
    ...rawJson.basicInfo,
    originalTitle: metadata.title,
    channelName: metadata.channel,
    importDate: new Date().toISOString(),
  };

  // Validate against Zod schema to guarantee UI won't crash
  return RecipeSchema.parse(rawJson);
}
