import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByIngredients, fetchRecipesByName, fetchRandomRecipe } from './redux/recipesSlice'; // Ensure correct import paths
import RecipeList from './components/RecipeList'; // Ensure correct import paths
import SearchByName from './components/SearchByName'; // Ensure correct import paths
import RandomRecipe from './components/RandomRecipe'; // Ensure correct import paths
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes || []);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  const handleSearch = () => {
    dispatch(fetchRecipesByIngredients({ ingredients }));
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <div className="search-container">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., rice, squash, eggs)"
        />
        <button onClick={handleSearch}>Search by Ingredients</button>
      </div>
      <div className="search-by-name-container">
        <SearchByName />
      </div>
      <div className="random-recipe-container">
        <RandomRecipe />
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
