import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import Spinner from "../components/Spinner.jsx";
import { searchRecipes } from "../api.js";

export default function Home() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

const doSearch = async () => {
  setErr("");
  setLoading(true);
  try {
    const key = "30ae2b54e5c14de49668e20714670258"; // your Spoonacular key
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      q
    )}&addRecipeInformation=true&number=12&apiKey=${key}`;

    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);

    setItems(data.results || []);
  } catch (e) {
    setErr(e.message.includes("402") ? "API quota exceeded. Try later." : e.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <SearchBar
        value={q}
        onChange={setQ}
        onSubmit={doSearch}
        loading={loading}
      />
      {loading ? (
        <Spinner />
      ) : err ? (
        <p className="error">{err}</p>
      ) : (
        <RecipeGrid items={items} />
      )}
    </>
  );
}
