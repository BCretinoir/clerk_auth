import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('nutrition.db');

export const initDatabase = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS foods (
      id TEXT PRIMARY KEY NOT NULL,
      barcode TEXT,
      product_name TEXT,
      brands TEXT,
      image_url TEXT,
      nutriscore TEXT,
      energy REAL,
      proteins REAL,
      fat REAL,
      carbohydrates REAL,
      raw_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS meal_foods (
      id TEXT PRIMARY KEY NOT NULL,
      meal_id TEXT NOT NULL,
      food_id TEXT NOT NULL,
      quantity REAL NOT NULL,
      FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE,
      FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_meals_user_date 
    ON meals(user_id, date);

    CREATE INDEX IF NOT EXISTS idx_meal_foods_meal 
    ON meal_foods(meal_id);
  `);
};

export default db;
