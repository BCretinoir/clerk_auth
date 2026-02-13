import { Food } from '../models/food';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://world.openfoodfacts.org';

export const searchFoods = async (
  query: string
): Promise<Food[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=20`
    );

    const data = await response.json();

    if (!data.products) return [];

    return data.products
      .filter((p: any) => p.product_name)
      .map(mapProductToFood);

  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};


export const getFoodByBarcode = async (
  barcode: string
): Promise<Food | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v0/product/${barcode}.json`
    );

    const data = await response.json();

    if (data.status !== 1) return null;

    return mapProductToFood(data.product);

  } catch (error) {
    console.error('Barcode error:', error);
    return null;
  }
};


const mapProductToFood = (product: any): Food => {

  const nutriments = product.nutriments ?? {};

  return {
    id: uuidv4(),
    barcode: product.code ?? null,

    product_name: product.product_name ?? 'Produit inconnu',
    brands: product.brands ?? null,
    image_url: product.image_url ?? null,
    nutriscore: product.nutriscore_grade ?? null,

    energy:
      nutriments['energy-kcal_100g'] ??
      nutriments['energy_100g'] ??
      0,

    proteins: nutriments['proteins_100g'] ?? 0,
    fat: nutriments['fat_100g'] ?? 0,
    carbohydrates: nutriments['carbohydrates_100g'] ?? 0,

    raw_json: JSON.stringify(product),
    created_at: new Date().toISOString(),
  };
};
