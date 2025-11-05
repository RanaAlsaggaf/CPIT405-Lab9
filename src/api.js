const API_BASE = "https://api.spoonacular.com";

const apiKey = "30ae2b54e5c14de49668e20714670258".trim();

async function checkResponse(response) {
  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    throw new Error("Unexpected response format from API.");
  }

  if (!response.ok) {
    const msg = data?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(msg);
  }

  return data;
}

export async function searchRecipes(query) {
  if (!apiKey) throw new Error("Missing API key.");
  if (!query || !query.trim()) return { results: [] };

  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;

  const response = await fetch(url);
  return checkResponse(response);
}

export async function getRecipeInfo(id) {
  if (!apiKey) throw new Error("Missing API key.");

  const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}`;
  const response = await fetch(url);
  return checkResponse(response);
}
