import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipesByIngredients = async (ingredients) => {
  const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredients}`);
  return response.data.meals;
};
