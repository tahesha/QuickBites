import React from 'react';

const RecipeList = ({ recipes }) => {
  // Ensure recipes is an array before calling map
  if (!recipes || recipes.length === 0) {
    return <div>No recipes found</div>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
