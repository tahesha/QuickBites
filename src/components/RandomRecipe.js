import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomRecipe } from '../redux/recipesSlice'; // Ensure correct import path

const RandomRecipe = () => {
  const dispatch = useDispatch();
  const randomRecipe = useSelector((state) => state.recipes.randomRecipe);
  const randomStatus = useSelector((state) => state.recipes.randomStatus);
  const randomError = useSelector((state) => state.recipes.randomError);

  const handleFetchRandomRecipe = () => {
    dispatch(fetchRandomRecipe());
  };

  if (randomStatus === 'loading') {
    return <p>Loading random recipe...</p>;
  }

  if (randomStatus === 'failed') {
    return <p>Error: {randomError}</p>;
  }

  return (
    <div>
      <button onClick={handleFetchRandomRecipe}>Get Random Recipe</button>
      {randomRecipe && (
        <div>
          <h2>{randomRecipe.strMeal}</h2>
          <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
          <p>{randomRecipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RandomRecipe;



