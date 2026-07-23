import { useParams, Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Clock, Users, ChefHat, Youtube, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function RecipeView() {
  const { id } = useParams();
  const recipe = useStore((state) => state.recipes.find(r => r.id === id));

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Archive
        </Link>
      </div>
    );
  }

  // Extract YouTube ID for the embed
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:v=|v\/|vi=|vi\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return match ? match[1] : null;
  };
  const videoId = extractVideoId(recipe.basicInfo.youtubeUrl);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header / Hero */}
      <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg">
        <img 
          src={recipe.images.cover} 
          alt={recipe.basicInfo.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Link to="/" className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="flex gap-2 mb-3">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {recipe.summary.cuisine || recipe.basicInfo.category}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {recipe.summary.difficulty}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {recipe.basicInfo.name}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2">
            {recipe.summary.description}
          </p>
        </div>
      </div>

      {/* Meta Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Total Time</p>
              <p>{recipe.summary.totalTimeMinutes} mins</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Servings</p>
              <p>{recipe.summary.servings} people</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Source</p>
              <p className="truncate max-w-[150px]">{recipe.basicInfo.channelName}</p>
            </div>
          </div>
        </div>
        
        <a 
          href={recipe.basicInfo.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-bold transition"
        >
          <Youtube className="w-5 h-5" /> Watch Original
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar: Ingredients & Notes */}
        <div className="space-y-8 md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.notes.tips.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/50">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-500 mb-3">Chef's Tips</h3>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-yellow-900 dark:text-yellow-200/80">
                {recipe.notes.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Body: Instructions & Video Embed */}
        <div className="md:col-span-2 space-y-8">
          
          {videoId && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-primary font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-lg text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
