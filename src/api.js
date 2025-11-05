const API_BASE = "https://api.spoonacular.com";
const apiKey = "30ae2b54e5c14de49668e20714670258".trim();

console.log("Using hardcoded key:", apiKey.slice(0,6));
export async function searchRecipes(q) {
  if (!q || !q.trim()) return { results: [] };
  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(q)}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

export async function getRecipeInfo(id) {
  const url = `${API_BASE}/recipes/${encodeURIComponent(id)}/information?apiKey=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
