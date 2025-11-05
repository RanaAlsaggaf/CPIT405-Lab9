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
      const data = await searchRecipes(q);
      setItems(data.results || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar value={q} onChange={setQ} onSubmit={doSearch} loading={loading} />
      {loading ? <Spinner /> : err ? <p className="error">{err}</p> : <RecipeGrid items={items} />}
    </>
  );
}
