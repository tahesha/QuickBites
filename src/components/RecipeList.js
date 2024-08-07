import React from 'react';

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <div>Embark on a culinary journey with Culinary Adventures and discover the joy of cooking without boundaries!</div>;
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
