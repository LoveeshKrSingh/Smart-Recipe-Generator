export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dietaryTags: string[];
  imageUrl: string;
  rating: number;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  favorites: string[];
  ratings: Record<string, number>;
}