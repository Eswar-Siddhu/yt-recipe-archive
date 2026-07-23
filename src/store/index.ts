import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings, Recipe } from '../types';

interface StoreState {
  settings: AppSettings;
  recipes: Recipe[];
  setSettings: (settings: Partial<AppSettings>) => void;
  setRecipes: (recipes: Recipe[]) => void;
  addRecipe: (recipe: Recipe) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      settings: {
        githubToken: '',
        githubRepo: '',
        openaiKey: '',
        youtubeApiKey: '',
        theme: 'system',
      },
      recipes: [],
      setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      setRecipes: (recipes) => set({ recipes }),
      addRecipe: (recipe) =>
        set((state) => ({ recipes: [recipe, ...state.recipes] })),
    }),
    { name: 'recipe-archive-storage' }
  )
);
