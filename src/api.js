const API_BASE = "https://api.spoonacular.com";

async function checkResponse(response) {
  if (!response.ok) {
    const msg = `Error ${response.status}: ${response.statusText}`;
    throw new Error(msg);
  }
  return response.json();
}

export async function searchRecipes(query) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

  if (!query || !query.trim()) return { results: [] };

  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;

  const response = await fetch(url);
  return checkResponse(response);
}

export async function getRecipeInfo(id) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

  const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}`;
  const response = await fetch(url);
  return checkResponse(response);
}