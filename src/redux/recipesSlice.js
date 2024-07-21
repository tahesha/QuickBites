import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch recipes by ingredients
export const fetchRecipesByIngredients = createAsyncThunk(
    'recipes/fetchRecipesByIngredients',
    async ({ ingredients }) => {
      // Split the ingredients by comma and trim each ingredient
      const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
  
      // Create the query string for the API request
      const query = ingredientsArray.map(ingredient => `i=${ingredient}`).join('&');
  
      // Fetch the data from the API
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${query}`);
  
      // Return the meals from the response
      return response.data.meals;
    }
  );
  

// Fetch recipes by name
export const fetchRecipesByName = createAsyncThunk(
    'recipes/fetchRecipesByName',
    async (name) => {
      // Fetch the data from the API
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  
      // Return the meals from the response
      return response.data.meals;
    }
  );
  
// Fetch a random recipe
export const fetchRandomRecipe = createAsyncThunk(
    'recipes/fetchRandomRecipe',
    async () => {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');

      console.log(response.data); // Log the API response
      return response.data.meals[0];
    }
  );
  
  

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    randomRecipe: null,
    status: 'idle',
    error: null,
    randomStatus: 'idle',
    randomError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipesByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRandomRecipe.pending, (state) => {
        state.randomStatus = 'loading';
      })
      .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
        state.randomStatus = 'succeeded';
        state.randomRecipe = action.payload;
      })
      .addCase(fetchRandomRecipe.rejected, (state, action) => {
        state.randomStatus = 'failed';
        state.randomError = action.error.message;
      });
  },
});

export default recipesSlice.reducer;

