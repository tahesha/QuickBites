import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByIngredients } from './redux/recipesSlice';
import RecipeList from './components/RecipeList';
import SearchByName from './components/SearchByName';
import RandomRecipe from './components/RandomRecipe';
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
      <SearchByName />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <RecipeList recipes={recipes} />
      <RandomRecipe />
    </div>
  );
}

export default App;
