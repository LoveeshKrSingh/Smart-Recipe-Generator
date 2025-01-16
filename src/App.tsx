import React, { useState, useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { RecipeCard } from './components/RecipeCard';
import { Filters } from './components/Filters';
import { ChefHat, Search, Loader2 } from 'lucide-react';
import type { Recipe } from './types';
import toast, { Toaster } from 'react-hot-toast';

// Sample data - In production, this would come from Supabase
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and filling bowl packed with protein and fresh vegetables',
    ingredients: ['quinoa', 'cherry tomatoes', 'cucumber', 'feta cheese', 'olive oil'],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables',
      'Combine all ingredients in a bowl',
      'Drizzle with olive oil and season'
    ],
    cookingTime: 25,
    difficulty: 'easy',
    servings: 2,
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 52,
      fat: 18
    },
    dietaryTags: ['vegetarian', 'gluten-free'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Spicy Thai Basil Chicken',
    description: 'A flavorful stir-fry with aromatic Thai basil and chili',
    ingredients: ['chicken breast', 'thai basil', 'garlic', 'chili', 'soy sauce', 'oyster sauce'],
    instructions: [
      'Slice chicken into bite-sized pieces',
      'Stir-fry garlic and chili',
      'Add chicken and sauces',
      'Finish with Thai basil'
    ],
    cookingTime: 20,
    difficulty: 'medium',
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 8,
      fat: 22
    },
    dietaryTags: ['dairy-free'],
    imageUrl: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Vegan Lentil Curry',
    description: 'Hearty and warming curry with red lentils and coconut milk',
    ingredients: ['red lentils', 'coconut milk', 'curry powder', 'onion', 'garlic', 'tomatoes'],
    instructions: [
      'Sauté onions and garlic',
      'Add spices and toast',
      'Add lentils and coconut milk',
      'Simmer until lentils are tender'
    ],
    cookingTime: 35,
    difficulty: 'easy',
    servings: 6,
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14
    },
    dietaryTags: ['vegan', 'gluten-free', 'dairy-free'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80',
    rating: 4.6
  }
];

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    difficulty?: string;
    cookingTime?: number;
    dietary?: string[];
  }>({});

  const matchRecipes = (ingredientList: string[]) => {
    // Simple matching algorithm - in production this would be more sophisticated
    const matches = sampleRecipes.filter(recipe => {
      const matchCount = recipe.ingredients.filter(ingredient =>
        ingredientList.some(userIngredient =>
          ingredient.toLowerCase().includes(userIngredient.toLowerCase().trim())
        )
      ).length;
      
      // Match if at least 2 ingredients match
      return matchCount >= 2;
    });

    return matches;
  };

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    try {
      // Simulate AI image processing
      toast.success('Image uploaded! Processing ingredients...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated detected ingredients
      const detectedIngredients = 'tomatoes, cucumber, lettuce';
      setIngredients(detectedIngredients);
      
      // Find matching recipes
      const ingredientList = detectedIngredients.split(',').map(i => i.trim());
      const matches = matchRecipes(ingredientList);
      
      if (matches.length > 0) {
        setRecipes(matches);
        toast.success(`Found ${matches.length} matching recipes!`);
      } else {
        toast.error('No matching recipes found. Try different ingredients!');
      }
    } catch (error) {
      toast.error('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    toast.success('Recipe favorites updated!');
  };

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    
    let filtered = [...sampleRecipes];
    
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    
    if (filters.cookingTime) {
      filtered = filtered.filter(recipe => recipe.cookingTime <= filters.cookingTime);
    }
    
    if (filters.dietary?.length) {
      filtered = filtered.filter(recipe =>
        filters.dietary!.every(tag => recipe.dietaryTags.includes(tag))
      );
    }
    
    setRecipes(filtered);
    toast.success('Filters applied!');
  };

  const handleIngredientSearch = () => {
    if (!ingredients.trim()) {
      toast.error('Please enter some ingredients first!');
      return;
    }

    const ingredientList = ingredients.split(',').map(i => i.trim());
    const matches = matchRecipes(ingredientList);
    
    if (matches.length > 0) {
      setRecipes(matches);
      toast.success(`Found ${matches.length} matching recipes!`);
    } else {
      toast.error('No matching recipes found. Try different ingredients!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Smart Recipe Generator
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Upload Ingredients Photo</h2>
              <ImageUpload onImageUpload={handleImageUpload} />
              
              <div className="mt-6">
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                  Or type ingredients manually:
                </label>
                <div className="mt-1 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="ingredients"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter ingredients separated by commas"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <button
                    onClick={handleIngredientSearch}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>

              {ingredients && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Working with:</h3>
                  <p className="mt-1 text-sm text-gray-600">{ingredients}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(recipe.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;