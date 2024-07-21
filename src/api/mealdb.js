import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipesByIngredients = async (ingredients) => {
  // Fetch recipes for the first ingredient
  const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredients[0]}`);
  const recipes = response.data.meals;

  // Filter recipes to include all provided ingredients
  return recipes.filter(recipe => {
    return ingredients.every(ingredient => recipe.strIngredients.includes(ingredient));
  });
};
