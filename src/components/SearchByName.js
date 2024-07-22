import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByName } from '../redux/recipesSlice';

const SearchByName = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  const handleSearch = () => {
    dispatch(fetchRecipesByName(name));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by name"
      />
      <button onClick={handleSearch}>Search by Name</button>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {recipes && recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      ))}
    </div>
  );
};

export default SearchByName;
