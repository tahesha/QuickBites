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
        <p>Option 1: Enter a main ingredient to see pictures of meals you can prepare. Use the photo as your inspiration. Get out of your comfort zone and try to recreate the recipe just by using the photo.</p>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter a main ingredient (e.g., rice, squash, eggs)"
        />
        <button onClick={handleSearch}>Search by Ingredient</button>
      </div>
      <p>Option 2: You can also search by name, to see pictures of meals you can recreate. Use your imagination to come up with something tasty.</p>
      <div className="search-by-name-container">
        <SearchByName />
      </div>
      <p>Option 3: Click the Random Recipe Generator button and re-create the image, using the recipe.</p>
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
