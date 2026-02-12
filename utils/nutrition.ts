import { NutritionTotals } from '../models/nutrition';
import { Food } from '../models/food';

export const calculateFoodNutrition = (
  food: Food,
  quantity: number
): NutritionTotals => {
  return {
    calories: (food.energy * quantity) / 100,
    proteins: (food.proteins * quantity) / 100,
    fat: (food.fat * quantity) / 100,
    carbohydrates: (food.carbohydrates * quantity) / 100,
  };
};

export const sumNutrition = (
  totals: NutritionTotals[]
): NutritionTotals => {
  return totals.reduce(
    (acc, curr) => ({
      calories: acc.calories + curr.calories,
      proteins: acc.proteins + curr.proteins,
      fat: acc.fat + curr.fat,
      carbohydrates: acc.carbohydrates + curr.carbohydrates,
    }),
    {
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    }
  );
};
