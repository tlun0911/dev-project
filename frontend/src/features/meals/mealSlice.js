import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import mealService from "./mealService";

const initialState = {
  meals: [],
  status: "idle",
  error: null,
  message: "",
};

export const selectAllMeals = (state) => state.meal.meals;

export const selectMealById = (mealId) =>
  createSelector([selectAllMeals], (meals) =>
    meals.find((meal) => meal._id === mealId)
  );

//Fetch all non-user meals to browse

export const browseMeals = createAsyncThunk(
  "meals/browseMeals",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mealService.browseMeals(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create new meal
export const createMeal = createAsyncThunk(
  "meals/createMeal",
  async ({id, mealData}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mealService.createMeal(id, mealData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get meals
export const getAllMeals = createAsyncThunk(
  "meals/getAllMeals",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mealService.getAllMeals(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update meal
export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async ({ id, mealId, mealData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mealService.updateMeal(id, mealId, mealData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMeal = createAsyncThunk(
  "meals/deleteMeal",
  async ({id, mealId}, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mealService.deleteMeal(id, mealId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add meal to user collection
export const addMealToUserCollection = createAsyncThunk(
  "meals/addMealToUserCollection",
  async (mealId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log("Inside addMealToUserCollection")
      const response = await axios.post(`/api/meals/${auth.user._id}/${mealId}`, { mealId });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
    return response.data;
  }
);

export const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals.push(action.payload);
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getAllMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(getAllMeals.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(browseMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(browseMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(browseMeals.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(addMealToUserCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMealToUserCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(addMealToUserCollection.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { reset } = mealSlice.actions;
export default mealSlice.reducer;
