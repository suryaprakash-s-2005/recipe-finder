import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import "../styles/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  // Fetch popular recipes with unique IDs
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      setLoading(true);
      try {
        const uniqueIds = new Set();
        const popularRecipes = [];
        while (uniqueIds.size < 12) {
          const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
          const data = await response.json();
          if (data.meals) {
            const recipe = data.meals[0];
            if (!uniqueIds.has(recipe.idMeal)) {
              uniqueIds.add(recipe.idMeal);
              popularRecipes.push(recipe);
            }
          }
        }
        setRecipes(popularRecipes);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load popular recipes 🥲...");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
      setError(null);
      setIsSearchPerformed(true);
    } catch (err) {
      console.error(err);
      setError("Failed to search recipes...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2 className="recipes-tag">{isSearchPerformed ? "Search Results 🔍" : "Top Recipes 🍽️"}</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="recipes-section">
          {recipes.length > 0 ? (
            <div className="recipes-grid">
              {recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.idMeal} />)}
            </div>
          ) : (
            <div className="no-recipes-message">
              <p>No recipes found 🥲. Try a different search !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;