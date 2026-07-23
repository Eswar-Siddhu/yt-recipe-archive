import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.images.cover} 
          alt={recipe.basicInfo.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200">
          {recipe.summary.difficulty}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {recipe.summary.cuisine || recipe.basicInfo.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {recipe.basicInfo.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.summary.totalTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span className="truncate max-w-[120px]">{recipe.basicInfo.channelName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
