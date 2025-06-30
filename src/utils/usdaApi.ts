// USDA FoodData Central API utility
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY || '';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function searchUSDAFoods(query: string) {
  const res = await fetch(`${BASE_URL}/foods/search?query=${encodeURIComponent(query)}&api_key=${USDA_API_KEY}`);
  if (!res.ok) throw new Error('USDA Food search failed');
  return res.json();
}

export async function getUSDAFoodDetails(fdcId: string) {
  const res = await fetch(`${BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`);
  if (!res.ok) throw new Error('USDA Food details fetch failed');
  return res.json();
} 