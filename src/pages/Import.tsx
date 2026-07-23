import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { getYoutubeMetadata, getTranscript } from '@/services/youtube';
import { generateRecipeFromTranscript } from '@/services/ai';
import { commitRecipeToGitHub } from '@/services/github';
import { Loader2, Youtube } from 'lucide-react';

export default function Import() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { settings, addRecipe } = useStore();
  const navigate = useNavigate();

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Extract Video ID
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      if (!videoId) throw new Error("Invalid YouTube URL");

      // 2. Fetch Metadata & Transcript
      setStatus('Fetching YouTube data...');
      const metadata = await getYoutubeMetadata(videoId, settings.youtubeApiKey);
      const transcript = await getTranscript(videoId);

      // 3. AI Processing
      setStatus('AI is writing the recipe...');
      const recipe = await generateRecipeFromTranscript(transcript, metadata, settings.openaiKey);

      // 4. Save to GitHub
      setStatus('Saving to GitHub repository...');
      await commitRecipeToGitHub(recipe, settings.githubToken, settings.githubRepo);

      // 5. Update local state
      addRecipe(recipe);
      navigate(`/recipe/${recipe.id}`);

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
          <Youtube className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold">Import Recipe</h1>
      </div>

      <form onSubmit={handleImport} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">YouTube URL</label>
          <input 
            type="url" 
            required
            className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none transition"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        
        <button 
          disabled={loading || !settings.openaiKey || !settings.githubToken}
          className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Extract Recipe'}
        </button>
        
        {status && <p className="text-sm text-center text-gray-500 mt-4 animate-pulse">{status}</p>}
        
        {(!settings.openaiKey || !settings.githubToken) && (
          <p className="text-sm text-red-500 mt-4 text-center">
            Please configure your API keys in Settings first.
          </p>
        )}
      </form>
    </div>
  );
}
