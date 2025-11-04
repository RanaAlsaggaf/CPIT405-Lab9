// src/api.js
const API_BASE = "https://api.spoonacular.com";

const API_KEY =
  import.meta.env.VITE_SPOONACULAR_KEY ||
  "30ae2b54e5c14de49668e20714670258"; 

const withKey = (pathAndQuery) => {
  const sep = pathAndQuery.includes("?") ? "&" : "?";
  return `${API_BASE}${pathAndQuery}${sep}apiKey=${API_KEY}`;
};

export async function searchRecipes(query, number = 12) {
  if (!query?.trim()) return { results: [] };
  const res = await fetch(
    withKey(`/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}`)
  );
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

export async function getRecipeInfo(id) {
  const res = await fetch(withKey(`/recipes/${id}/information`));
  if (!res.ok) throw new Error(`Details failed: ${res.status}`);
  return res.json();
}
