const API_BASE = "https://api.spoonacular.com";
const apiKey = "30ae2b54e5c14de49668e20714670258".trim(); 

async function checkResponse(res) {
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; }
  catch { throw new Error(`Unexpected response format (${res.status})`); }
  if (!res.ok) {
    const msg = json?.message || `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return json;
}

export async function searchRecipes(query) {
  if (!query || !query.trim()) return { results: [] };
  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;
  const r = await fetch(url);
  return checkResponse(r);
}

export async function getRecipeInfo(id) {
  const url = `${API_BASE}/recipes/${encodeURIComponent(id)}/information?apiKey=${apiKey}`;
  const r = await fetch(url);
  return checkResponse(r);
}
