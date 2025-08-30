import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return null;

  return (
    <div
      className="recipe-details"
      style={{
        backgroundImage: `url(${recipe.strMealThumb !== "N/A" ? recipe.strMealThumb : ""})`,
      }}
    >
      <div className="overlay">
        <div className="details-poster">
          <img
            src={
              recipe.strMealThumb !== "N/A"
                ? recipe.strMealThumb
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={recipe.strMeal}
          />
        </div>
        <div className="details-info">
          <h2>{recipe.strMeal}</h2>
          <div className="procedure">
            {recipe.strInstructions.split('. ').map((step, index) => (
              step.trim() && <p key={index}>{index + 1}. {step.trim()}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;