import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    tasks: [],
    task: null,
    error: "",
    loading: false,

    // pagination data 
    totalPages: null,
    currentPage: null,
    limit: null,
    hasNextPage: false,
    hasPrevPage: false
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducer: {
        clearError: (state) => {
            state.error = null
        }
    }
})


export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;