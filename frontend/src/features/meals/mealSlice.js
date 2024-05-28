import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import mealService from './mealService';

const initialState = {
    meals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new meal
export const createMeal = createAsyncThunk('meals/create',
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
    'meals/getAll',
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

export const getMeal = createAsyncThunk(
    'meals/getMeal',
    async(mealId, thunkAPI) => {
        try {
            console.log('Inside getMeal slice function')
            const token = thunkAPI.getState().auth.user.token
            data = await mealService.getMeal(mealId, token)
            console.log(data)
            return data
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
                state.isLoading = true
            })
            .addCase(createMeal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.meals.push(action.payload)
            })
            .addCase(createMeal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllMeals.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getAllMeals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.meals = action.payload
              })
            .addCase(getAllMeals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
              })
            .addCase(getMeal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMeal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.meals = action.payload
            })
            .addCase(getMeal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = mealSlice.actions
export default mealSlice.reducer