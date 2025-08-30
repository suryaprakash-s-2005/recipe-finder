import { useFavorites } from "../hooks/useFavorites.js";
import RecipeCard from "../components/RecipeCard.jsx";
import "../styles/Favorites.css" ;

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorite Recipes ❤️</h2>
        <div className="recipes-grid">
          {favorites.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.idMeal} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Recipes Yet 😴</h2>
      <p>Start adding recipes to your favorites and they will appear here 😊!</p>
    </div>
  );
}

export default Favorites;