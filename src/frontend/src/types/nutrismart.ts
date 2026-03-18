export interface UserProfile {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
  healthConditions: HealthCondition[];
  cuisineRegion: CuisineRegion;
  dailyCalorieTarget: number;
}

export type ActivityLevel =
  | "Sedentary"
  | "Lightly Active"
  | "Moderately Active"
  | "Very Active"
  | "Extra Active";

export type HealthGoal =
  | "Weight Loss"
  | "Muscle Gain"
  | "Maintenance"
  | "Condition Management";

export type HealthCondition =
  | "Diabetes"
  | "Hypertension"
  | "High Cholesterol"
  | "Nut Allergy"
  | "Shellfish Allergy"
  | "Gluten Intolerance"
  | "Lactose Intolerance";

export type CuisineRegion =
  | "Mediterranean"
  | "Asian"
  | "American"
  | "Middle Eastern"
  | "South Asian"
  | "European"
  | "African"
  | "Latin American";

export interface MealLog {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  name: string;
  calories: number;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

export interface MealPlan {
  breakfast: MealPlanItem;
  lunch: MealPlanItem;
  dinner: MealPlanItem;
  snack: MealPlanItem;
}

export interface MealPlanItem {
  name: string;
  description: string;
  calories: number;
  tags: string[];
}

export interface FoodAnalysis {
  estimatedCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  verdict: "fits" | "exceeds";
  warnings: string[];
  foodName: string;
}
