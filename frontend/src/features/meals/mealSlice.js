import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import mealService from './mealService';

const initialState = {
    meals: [],
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

//Create new meal
export const createMeal = createAsyncThunk('meal/create',
    async(mealData, thunkAPI) => {
        console.log('createMeal called, outside of try/catch')
        try {
            const token = thunkAPI.getState().auth.user.token
            console.log('token - ', token)
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
                state.isSucces = true
                state.meals.push(action.payload)
            })
            .addCase(createMeal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export default mealSlice.reducer