import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites.js";
import "../styles/RecipeCard.css";

function RecipeCard({ recipe }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation(); 
    if (isFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  }

  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card">
      <div className="recipe-poster">
        <img
          src={recipe.strMealThumb !== "N/A" ? recipe.strMealThumb : "https://picsum.photos/500/750"}
          alt={recipe.strMeal}
        />
        <div className="recipe-overlay">
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.strMeal}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;