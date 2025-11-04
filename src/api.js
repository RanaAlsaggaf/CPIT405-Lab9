const API_BASE = "https://api.spoonacular.com";

const FALLBACK_KEY = "30ae2b54e5c14de49668e20714670258";

let API_KEY;

if (typeof import.meta !== "undefined" && import.meta.env) {
  API_KEY = import.meta.env.VITE_SPOONACULAR_KEY || FALLBACK_KEY;
} else {
  API_KEY = FALLBACK_KEY;
}

const withKey = (pathAndQuery) => {
  if (!API_KEY || API_KEY === "PASTE_YOUR_KEY_HERE") {
    throw new Error("⚠️ No valid API key found in src/api.js");
  }
  const sep = pathAndQuery.includes("?") ? "&" : "?";
  return `${API_BASE}${pathAndQuery}${sep}apiKey=${API_KEY}`;
};

export async function searchRecipes(query, number = 12) {
  if (!query?.trim()) return { results: [] };

  const res = await fetch(
    withKey(`/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}`)
  );
  if (!res.ok) {
    if (res.status === 401) throw new Error("401 Unauthorized — bad or missing key");
    if (res.status === 402) throw new Error("402 Quota exceeded — get a new key");
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json();
}

export async function getRecipeInfo(id) {
  const res = await fetch(withKey(`/recipes/${id}/information`));
  if (!res.ok) {
    if (res.status === 401) throw new Error("401 Unauthorized — bad or missing key");
    if (res.status === 402) throw new Error("402 Quota exceeded — get a new key");
    throw new Error(`Details failed: ${res.status}`);
  }
  return res.json();
}

