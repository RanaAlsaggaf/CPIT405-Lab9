const API_BASE = "https://api.spoonacular.com";

const withKey = (url) => {
    const key = import.meta.env.VITE_SPOONACULAR_KEY;
    const sep = url.includes("?") ? "&" : "?";
    return `${API_BASE}${url}${sep}apiKey=${key}`;
};

export async function searchRecipes(query, number = 12) {
    if (!query?.trim()) return { results: [] };
    const url = withKey(`/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    return res.json();
}

export async function getRecipeInfo(id) {
    const url = withKey(`/recipes/${id}/information`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Details failed: ${res.status}`);
    return res.json();
}
