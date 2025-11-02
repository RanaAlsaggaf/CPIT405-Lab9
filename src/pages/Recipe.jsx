import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeInfo } from "../api.js";
import Spinner from "../components/Spinner.jsx";

export default function Recipe() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const info = await getRecipeInfo(id);
        setData(info);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Spinner />;
  if (err) return <p className="error">{err}</p>;
  if (!data) return null;

  return (
    <article className="details">
      <Link to="/" className="back">← Back</Link>

      <h1 className="details-title">{data.title}</h1>

      <div className="details-intro">
        <img className="details-img" src={data.image} alt={data.title} />

        <div>
          <p className="details-meta">
            🕒 {data.readyInMinutes} mins • 👤 {data.servings} servings
          </p>

          <div
            className="details-summary"
            dangerouslySetInnerHTML={{ __html: data.summary || "" }}
          />

          {data.sourceUrl && (
            <p className="details-source">
              <a href={data.sourceUrl} target="_blank" rel="noreferrer">
                Source
              </a>
            </p>
          )}
        </div>
      </div>

      <section>
        <h2>Ingredients</h2>
        <ul className="bullets">
          {data.extendedIngredients?.map((ing) => (
            <li key={ing.id || ing.original}>{ing.original}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        {data.analyzedInstructions?.length ? (
          <ol className="steps">
            {data.analyzedInstructions[0].steps.map((s) => (
              <li key={s.number}>{s.step}</li>
            ))}
          </ol>
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: data.instructions || "No instructions available.",
            }}
          />
        )}
      </section>
    </article>
  );
}