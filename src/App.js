import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from './redux/recipesSlice';
import RecipeList from './components/RecipeList';

function App() {
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  const handleSearch = () => {
    dispatch(fetchRecipes(ingredients));
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients"
      />
      <button onClick={handleSearch}>Search</button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
