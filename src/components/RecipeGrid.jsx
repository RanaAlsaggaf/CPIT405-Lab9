import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ items }) {
    if (!items?.length) return <p className="muted">No recipes yet. Try a search.</p>;
    return (
        <section className="recipes-grid">
            {items.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </section>
    );
}
