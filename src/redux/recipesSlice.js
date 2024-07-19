import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (ingredients) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    return response.data.meals;
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
