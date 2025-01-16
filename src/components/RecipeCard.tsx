import React, { useState } from 'react';
import { Clock, ChefHat, Users, Star, ChevronDown, ChevronUp } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function RecipeCard({ recipe, onFavorite, isFavorite }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{recipe.name}</h3>
          <button
            onClick={() => onFavorite(recipe.id)}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } hover:bg-gray-100 transition-colors`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mt-2">{recipe.description}</p>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.cookingTime} min
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ChefHat className="h-4 w-4 mr-1" />
            {recipe.difficulty}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {recipe.servings}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show details
            </>
          )}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm text-gray-900">Ingredients:</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-sm text-gray-900">Instructions:</h4>
              <ol className="mt-2 list-decimal list-inside text-sm text-gray-600">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-sm text-gray-900">Nutrition (per serving):</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-medium">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-medium">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-medium">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fat:</span>
                  <span className="font-medium">{recipe.nutrition.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}