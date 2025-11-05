const API_BASE = "https://api.spoonacular.com";

const apiKey = "30ae2b54e5c14de49668e20714670258";

async function checkResponse(response) {
  const text = await response.text();
  let json;

  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Unexpected response format (${response.status})`);
  }

  if (!response.ok) {
    const msg = json?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(msg);
  }

  return json;
}

export async function searchRecipes(query) {
  if (!apiKey) throw new Error("Missing API key.");
  if (!query || !query.trim()) return { results: [] };

  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;

  const res = await fetch(url);
  return checkResponse(res);
}

export async function getRecipeInfo(id) {
  if (!apiKey) throw new Error("Missing API key.");

  const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}`;
  const res = await fetch(url);
  return checkResponse(res);
}
