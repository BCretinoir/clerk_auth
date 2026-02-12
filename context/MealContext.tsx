import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useUser } from '@clerk/clerk-expo';

import { Meal } from '../models/meal';
import { Food } from '../models/food';
import { NutritionTotals } from '../models/nutrition';

import {
  getMealsByUser,
  getOrCreateTodayMeal,
  deleteMeal as deleteMealRepo,
  addFoodToMeal as addFoodRepo,
  getMealWithFoods,
} from '../database/repositories/mealRepository';

import {
  calculateFoodNutrition,
  sumNutrition,
} from '../utils/nutrition';


// ===============================
// TYPES
// ===============================
type MealWithFoods = {
  meal: Meal;
  foods: (Food & { quantity: number })[];
  totals: NutritionTotals;
};

type MealContextType = {
  meals: Meal[];
  todayMeal: Meal | null;
  selectedMeal: MealWithFoods | null;

  refreshMeals: () => void;
  selectMeal: (mealId: string) => void;
  deleteMeal: (mealId: string) => void;
  addFoodToMeal: (
    mealId: string,
    food: Food,
    quantity: number
  ) => void;
};

const MealContext = createContext<MealContextType | null>(null);

// ===============================
// PROVIDER
// ===============================
export const MealProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useUser();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);
  const [selectedMeal, setSelectedMeal] =
    useState<MealWithFoods | null>(null);

  // ===============================
  // INIT
  // ===============================
  useEffect(() => {
    if (!user?.id) return;

    const today = getOrCreateTodayMeal(user.id);
    setTodayMeal(today);

    loadMeals();
  }, [user?.id]);

  // ===============================
  // LOAD MEALS
  // ===============================
  const loadMeals = () => {
    if (!user?.id) return;
    const data = getMealsByUser(user.id);
    setMeals(data);
  };

  // ===============================
  // SELECT MEAL
  // ===============================
  const selectMeal = (mealId: string) => {
    const data = getMealWithFoods(mealId);

    if (!data.meal) {
      setSelectedMeal(null);
      return;
    }

    const nutritionList = data.foods.map((f: any) =>
      calculateFoodNutrition(f, f.quantity)
    );

    setSelectedMeal({
      meal: data.meal,
      foods: data.foods,
      totals: sumNutrition(nutritionList),
    });
  };

  // ===============================
  // ADD FOOD
  // ===============================
  const addFoodToMeal = (
    mealId: string,
    food: Food,
    quantity: number
  ) => {
    addFoodRepo(mealId, food, quantity);
    selectMeal(mealId);
    loadMeals();
  };

  // ===============================
  // DELETE MEAL
  // ===============================
  const deleteMeal = (mealId: string) => {
    deleteMealRepo(mealId);
    loadMeals();
    setSelectedMeal(null);
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        todayMeal,
        selectedMeal,
        refreshMeals: loadMeals,
        selectMeal,
        deleteMeal,
        addFoodToMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

// ===============================
// HOOK
// ===============================
export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error(
      'useMeals must be used within a MealProvider'
    );
  }
  return context;
};
