import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import apptReducer from '../features/appt/apptSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appt: apptReducer,
    }
})