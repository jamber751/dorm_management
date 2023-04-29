import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apptService from './apptService'

const initialState = {
    appointments: null,
    message: ''
}

export const getAppts = createAsyncThunk('appt/get', async (user, thunkAPI) => {
    try {
        return await apptService.getAppts(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookAppt = createAsyncThunk('appt/book', async (user, thunkAPI) => {
    try {
        return await apptService.bookAppt(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const myAppt = createAsyncThunk('appt/my', async (user, thunkAPI) => {
    try {
        return await apptService.myAppts(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const cancelAppt = createAsyncThunk('appt/cance', async (user, thunkAPI) => {
    try {
        return await apptService.cancelAppt(user)
    } catch (error) {
        const message = error.response.data['error']
        return thunkAPI.rejectWithValue(message)
    }
})

export const apptSlice = createSlice({
    name: "appt",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppts.fulfilled, (state, action) => {
                state.appointments = action.payload
            })
            .addCase(getAppts.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(bookAppt.fulfilled, (state, action) => {
                state.message = 'Appointment booked'
            })
            .addCase(bookAppt.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(myAppt.fulfilled, (state, action) => {
                state.appointments = action.payload
                state.message = ''
            })
            .addCase(myAppt.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(cancelAppt.fulfilled, (state, action) => {
                state.message = action.payload.message
            })
            .addCase(cancelAppt.rejected, (state, action) => {
                state.message = action.payload
            })
    }


})

export default apptSlice.reducer