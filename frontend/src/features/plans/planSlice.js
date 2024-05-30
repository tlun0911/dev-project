import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import planService from '../plans/planService'

// Initial state
const initialState = {
    mealPlan: [],
    status: 'idle',
    error: null
};


// Async thunk for fetching meal plans
export const getPlan = createAsyncThunk('plans/getPlan',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await planService.getPlan(token)
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

// Async thunk for creating a new meal plan
export const createPlan = createAsyncThunk('plans/createPlan',
    async(planData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await planService.createPlan(planData, token)
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

const mealPlanSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPlan.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealPlan = action.payload;
            })
            .addCase(getPlan.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPlan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealPlan.push(action.payload);
            })
            .addCase(createPlan.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { reset } = mealPlanSlice.actions
export default mealPlanSlice.reducer;