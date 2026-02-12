import db from '../database';
import { v4 as uuidv4 } from 'uuid';
import { Meal } from '../../models/meal';
import { Food } from '../../models/food';
import { getTodayDate } from '../../utils/date';


// ⚠️ Si uuid n'est pas installé :
// npx expo install uuid

// =============================
// GET OR CREATE TODAY MEAL
// =============================
export const getOrCreateTodayMeal = (
  userId: string
): Meal => {
  const today = getTodayDate();

  const existing = db.getFirstSync<Meal>(
    `SELECT * FROM meals WHERE user_id = ? AND date = ?`,
    [userId, today]
  );

  if (existing) return existing;

  const newMeal: Meal = {
    id: uuidv4(),
    user_id: userId,
    date: today,
    created_at: new Date().toISOString(),
  };

  db.runSync(
    `INSERT INTO meals (id, user_id, date, created_at)
     VALUES (?, ?, ?, ?)`,
    [newMeal.id, newMeal.user_id, newMeal.date, newMeal.created_at]
  );

  return newMeal;
};


// =============================
// GET ALL MEALS BY USER
// =============================
export const getMealsByUser = (
  userId: string
): Meal[] => {
  return db.getAllSync<Meal>(
    `SELECT * FROM meals
     WHERE user_id = ?
     ORDER BY date DESC`,
    [userId]
  );
};


// =============================
// DELETE MEAL (CASCADE AUTO)
// =============================
export const deleteMeal = (mealId: string) => {
  db.runSync(`DELETE FROM meals WHERE id = ?`, [mealId]);
};


// =============================
// ADD FOOD TO MEAL
// =============================
export const addFoodToMeal = (
  mealId: string,
  food: Food,
  quantity: number
) => {

  // 1️⃣ Vérifier si le food existe déjà
  const existingFood = db.getFirstSync<Food>(
    `SELECT * FROM foods WHERE id = ?`,
    [food.id]
  );

  if (!existingFood) {
    db.runSync(
      `INSERT INTO foods (
        id,
        barcode,
        product_name,
        brands,
        image_url,
        nutriscore,
        energy,
        proteins,
        fat,
        carbohydrates,
        raw_json,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        food.id,
        food.barcode ?? null,
        food.product_name,
        food.brands ?? null,
        food.image_url ?? null,
        food.nutriscore ?? null,
        food.energy,
        food.proteins,
        food.fat,
        food.carbohydrates,
        food.raw_json,
        food.created_at,
      ]
    );
  }

  // 2️⃣ Ajouter dans pivot
  db.runSync(
    `INSERT INTO meal_foods (id, meal_id, food_id, quantity)
     VALUES (?, ?, ?, ?)`,
    [uuidv4(), mealId, food.id, quantity]
  );
};


// =============================
// GET MEAL WITH FOODS
// =============================
export const getMealWithFoods = (mealId: string) => {
  const meal = db.getFirstSync<Meal>(
    `SELECT * FROM meals WHERE id = ?`,
    [mealId]
  );

  const foods = db.getAllSync<any>(
    `
    SELECT 
      f.*,
      mf.quantity
    FROM meal_foods mf
    JOIN foods f ON f.id = mf.food_id
    WHERE mf.meal_id = ?
    `,
    [mealId]
  );

  return {
    meal,
    foods,
  };
};
