import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
    return (
        <article className="card">
            <img src={recipe.image} alt={recipe.title} loading="lazy" />
            <h3 className="card-title">
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
        </article>
    );
}
