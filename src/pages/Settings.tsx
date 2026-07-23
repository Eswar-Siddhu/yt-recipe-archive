import { useStore } from '@/store';
import { Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const { settings, setSettings } = useStore();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6">API Configuration</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        These keys are stored locally in your browser and are never sent anywhere except directly to the respective APIs (OpenAI, GitHub, YouTube).
      </p>
      
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Repo (e.g., username/recipe-archive)</label>
          <input type="text" className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
            value={formData.githubRepo} onChange={e => setFormData({...formData, githubRepo: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Personal Access Token (PAT)</label>
          <input type="password" className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
            value={formData.githubToken} onChange={e => setFormData({...formData, githubToken: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
          <input type="password" className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
            value={formData.openaiKey} onChange={e => setFormData({...formData, openaiKey: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">YouTube Data API Key</label>
          <input type="password" className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
            value={formData.youtubeApiKey} onChange={e => setFormData({...formData, youtubeApiKey: e.target.value})} />
        </div>
        <button type="submit" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition">
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
