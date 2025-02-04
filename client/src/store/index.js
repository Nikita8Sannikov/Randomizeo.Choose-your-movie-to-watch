import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})
