import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
    isAuth: false,
    status: "idle",
}

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (data) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()

        return json
    }
)

export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (data) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const remind = createAsyncThunk(
    "auth/remind",
    async () => {

        const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        // console.log(json);
        return json
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.isAuth = true
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null
                state.isAuth = false
                state.token = null
                state.error = null
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.isAuth = false

            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(remind.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(remind.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.isAuth = true
            })
            .addCase(remind.rejected, (state, action) => {
                state.status = 'failed'
                state.isAuth = false
                state.user = null;
                state.error = action.error.message || "failed"
            })
    }
})

export default authSlice.reducer