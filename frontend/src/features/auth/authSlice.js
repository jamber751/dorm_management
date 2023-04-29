import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    isAuthenticated: false,
    isPending: true,
    isRejected: false,
    username: '',
    room_number: '',
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    try {
        return await authService.logout(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const isAuth = createAsyncThunk('auth/check', async (user, thunkAPI) => {
    try {
        return await authService.isAuth()
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.isPending = false
                state.isRejected = false
                state.username = action.payload['username']
                if (action.payload['room']) {
                    state.room_number = action.payload['room']['number']
                }
                state.message = `Welcome, ${state.username}`
            })
            .addCase(register.pending, (state, action) => {
                state.isAuthenticated = false
                state.isPending = true
                state.isRejected = false
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isPending = false
                state.isRejected = true
                state.username = ''
                state.room_number = ''
                state.message = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.isPending = false
                state.isRejected = false
                state.username = action.payload['username']
                if (action.payload['room']) {
                    state.room_number = action.payload['room']['number']
                }
                state.message = `Welcome, ${state.username}`
            })
            .addCase(login.pending, (state, action) => {
                state.isAuthenticated = false
                state.isPending = true
                state.isRejected = false
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isPending = false
                state.isRejected = true
                state.username = ''
                state.room_number = ''
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false
                state.isPending = false
                state.isRejected = false
                state.username = ''
                state.room_number = ''
                state.message = 'Logged out'
            })
            .addCase(logout.pending, (state, action) => {
                state.isPending = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.isPending = false
                state.message = action.payload
            })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.isPending = false
                state.isRejected = false
                state.username = action.payload['username']
                if (action.payload['room']) {
                    state.room_number = action.payload['room']['number']
                }
                state.message = ''
            })
            .addCase(isAuth.pending, (state, action) => {
                state.isAuthenticated = false
                state.isPending = true
                state.isRejected = false
                state.username = ''
                state.room_number = ''
                state.message = ''
            })
            .addCase(isAuth.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isPending = false
                state.isRejected = true
                state.username = ''
                state.room_number = ''
                state.message = ''
            })
    }
})

export default authSlice.reducer