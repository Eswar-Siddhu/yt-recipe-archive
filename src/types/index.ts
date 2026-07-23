import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.string(),
  basicInfo: z.object({
    name: z.string(),
    originalTitle: z.string(),
    youtubeUrl: z.string(),
    channelName: z.string(),
    importDate: z.string(),
    category: z.string(),
  }),
  summary: z.object({
    description: z.string(),
    cuisine: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    prepTimeMinutes: z.number(),
    cookTimeMinutes: z.number(),
    totalTimeMinutes: z.number(),
    servings: z.number(),
  }),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  notes: z.object({
    tips: z.array(z.string()),
    variations: z.array(z.string()),
    storage: z.string(),
  }),
  tags: z.array(z.string()),
  images: z.object({
    cover: z.string(),
    gallery: z.array(z.string()).optional()
  }),
  nutrition: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional()
  }).optional()
});

export type Recipe = z.infer<typeof RecipeSchema>;

export interface AppSettings {
  githubToken: string;
  githubRepo: string; // e.g., "username/yt-recipe-archive"
  openaiKey: string;
  youtubeApiKey: string;
  theme: 'light' | 'dark' | 'system';
}
