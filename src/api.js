const apiKey = "30ae2b54e5c14de49668e20714670258";

const API_BASE = "https://api.spoonacular.com";

async function checkResponse(response) {
  let bodyText = "";
  try {
    bodyText = await response.text(); // 
    const maybeJson = bodyText ? JSON.parse(bodyText) : {};
    if (!response.ok) {
      const msg =
        maybeJson?.message ||
        maybeJson?.status ||
        `HTTP ${response.status} ${response.statusText}`;
      throw new Error(msg);
    }
    return maybeJson;
  } catch (e) {
    if (response.ok) {
      throw new Error("Unexpected response format from API.");
    }
    throw e;
  }
}

function assertApiKey() {
  if (!apiKey || apiKey === "30ae2b54e5c14de49668e20714670258") {
    throw new Error(
      "Missing API key. Replace apiKey in api.js with your real Spoonacular key for the demo."
    );
  }
}

export async function searchRecipes(query) {
  assertApiKey();
  if (!query || !query.trim()) return { results: [] };

  const url = `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&addRecipeInformation=true&number=12&apiKey=${apiKey}`;

  const r = await fetch(url);
  return checkResponse(r);
}

export async function getRecipeInfo(id) {
  assertApiKey();
  const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}`;
  const r = await fetch(url);
  return checkResponse(r);
}
