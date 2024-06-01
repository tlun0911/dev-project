import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import mealService from './mealService';

const initialState = {
    meals: [],
    status: 'idle',
    error: null,
    message: ''
}


export const selectAllMeals = (state) => state.meal.meals;

export const selectMealById = (mealId) =>
  createSelector([selectAllMeals], (meals) =>
    meals.find((meal) => meal._id === mealId)
  );

//Fetch all non-user meals to browse

export const browseMeals = createAsyncThunk(
  'meals/browseMeals',
  async(_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          return await mealService.browseMeals(token)
      } catch (error) {
          const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
  }
)

//Create new meal
export const createMeal = createAsyncThunk('meals/createMeal',
    async(mealData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await mealService.createMeal(mealData, token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)            
        }
    }
)

//Get meals
export const getAllMeals = createAsyncThunk(
    'meals/getAllMeals',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await mealService.getAllMeals(token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update meal
export const updateMeal = createAsyncThunk('meals/updateMeal',
    async({mealData, id}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await mealService.updateMeal(mealData, id, token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)            
        }
    }
)


export const deleteMeal = createAsyncThunk(
    'meals/deleteMeal',
    async(mealId, thunkAPI) => {
      console.log('mealSlice deleteMeal function fired')
        try {
            const token = thunkAPI.getState().auth.user.token
            return await mealService.deleteMeal(mealId, token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)            
        }
    }
)


export const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meals.push(action.payload)
            })
            .addCase(createMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.message = action.payload
            })
            .addCase(getAllMeals.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(getAllMeals.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meals = action.payload
              })
            .addCase(getAllMeals.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.payload
              })
            .addCase(deleteMeal.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteMeal.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meals = action.payload
            })
            .addCase(deleteMeal.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.payload
            })
            .addCase(browseMeals.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(browseMeals.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meals = action.payload
            })
            .addCase(browseMeals.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.payload
            })
            .addCase(updateMeal.pending, (state) => {
              state.status = 'loading'
            })
            .addCase(updateMeal.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meals = action.payload
            })
            .addCase(updateMeal.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.payload
            })
    }
})

export const { reset } = mealSlice.actions
export default mealSlice.reducer