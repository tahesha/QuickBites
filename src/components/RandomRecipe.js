import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomRecipe } from '../redux/recipesSlice';

const RandomRecipe = () => {
  const dispatch = useDispatch();
  const randomRecipe = useSelector((state) => state.recipes.randomRecipe);
  const randomStatus = useSelector((state) => state.recipes.randomStatus);
  const randomError = useSelector((state) => state.recipes.randomError);

  const handleFetchRandomRecipe = () => {
    dispatch(fetchRandomRecipe());
  };

  return (
    <div className="random-recipe-container">
      <button onClick={handleFetchRandomRecipe}>Get Random Recipe</button>
      {randomStatus === 'loading' && <p>Loading...</p>}
      {randomStatus === 'failed' && <p>{randomError}</p>}
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

