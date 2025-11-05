const API_BASE = "https://api.spoonacular.com";

const apiKey = "30ae2b54e5c14de49668e20714670258";

async function checkResponse(response) {
  if (!response.ok) {
    const msg = `Error ${response.status}: ${response.statusText}`;
    throw new Error(msg);
  }
  return response.json();
}

export async function searchRecipes(query) {
  if (!query || !query.trim()) return { results: [] };

  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;

  const response = await fetch(url);
  return checkResponse(response);
}

export async function getRecipeInfo(id) {
  const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}`;
  const response = await fetch(url);
  return checkResponse(response);
}