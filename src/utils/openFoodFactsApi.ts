// OpenFoodFacts API utility
const BASE_URL = 'https://world.openfoodfacts.org';

export async function searchOpenFoodFacts(query: string) {
  const res = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`);
  if (!res.ok) throw new Error('OpenFoodFacts search failed');
  return res.json();
}

export async function getOpenFoodFactsDetails(code: string) {
  const res = await fetch(`${BASE_URL}/api/v0/product/${code}.json`);
  if (!res.ok) throw new Error('OpenFoodFacts details fetch failed');
  return res.json();
} 