import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: {
    difficulty?: string;
    cookingTime?: number;
    dietary?: string[];
  }) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            onChange={(e) =>
              onFilterChange({ difficulty: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cooking Time
          </label>
          <select
            onChange={(e) =>
              onFilterChange({ cookingTime: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="30">Under 30 mins</option>
            <option value="60">Under 1 hour</option>
            <option value="120">Under 2 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dietary Restrictions
          </label>
          <div className="mt-2 space-y-2">
            {['vegetarian', 'vegan', 'gluten-free', 'dairy-free'].map((diet) => (
              <label key={diet} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onFilterChange({
                      dietary: e.target.checked ? [diet] : []
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {diet.charAt(0).toUpperCase() + diet.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}