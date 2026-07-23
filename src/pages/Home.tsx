import { useState, useMemo } from 'react';
import { useStore } from '@/store';
import RecipeCard from '@/components/RecipeCard';
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const recipes = useStore((state) => state.recipes);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const categories = ['All', 'Vegetarian', 'Vegan', 'Dessert', 'Dinner', 'Breakfast'];

  const filteredAndSortedRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search match (title, tags, or ingredients)
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          recipe.basicInfo.name.toLowerCase().includes(searchLower) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower));
        
        // Category match
        const matchesFilter = filter === 'All' || 
          recipe.basicInfo.category.toLowerCase() === filter.toLowerCase() ||
          recipe.tags.some(tag => tag.toLowerCase() === filter.toLowerCase());

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'Latest') {
          return new Date(b.basicInfo.importDate).getTime() - new Date(a.basicInfo.importDate).getTime();
        }
        if (sortBy === 'Oldest') {
          return new Date(a.basicInfo.importDate).getTime() - new Date(b.basicInfo.importDate).getTime();
        }
        if (sortBy === 'Alphabetical') {
          return a.basicInfo.name.localeCompare(b.basicInfo.name);
        }
        if (sortBy === 'Quickest') {
          return a.summary.totalTimeMinutes - b.summary.totalTimeMinutes;
        }
        return 0;
      });
  }, [recipes, search, filter, sortBy]);

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No recipes yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          Your archive is empty. Start by importing your first cooking video from YouTube.
        </p>
        <Link to="/import" className="bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Import Recipe
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search recipes, ingredients..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl overflow-x-auto hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === cat 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border-none text-sm font-medium rounded-xl py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary outline-none appearance-none"
            >
              <option>Latest</option>
              <option>Oldest</option>
              <option>Alphabetical</option>
              <option>Quickest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      
      {filteredAndSortedRecipes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No recipes found matching your search criteria.
        </div>
      )}
    </div>
  );
}
