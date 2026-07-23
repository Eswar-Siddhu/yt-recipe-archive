import { Link } from 'react-router-dom';
import { ChefHat, PlusCircle, Settings as SettingsIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition">
          <ChefHat className="w-6 h-6" />
          <span>Recipe Archive</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/import" className="flex items-center gap-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg transition">
            <PlusCircle className="w-4 h-4" /> Import
          </Link>
          <Link to="/settings" className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
