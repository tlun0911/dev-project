import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import mealReducer from '../features/meals/mealSlice'
import planReducer from '../features/plans/planSlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      meal: mealReducer,
      plans: planReducer,
    },
  })