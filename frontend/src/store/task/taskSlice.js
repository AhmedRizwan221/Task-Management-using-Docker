import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// add task 
export const addTask = createAsyncThunk(
    "task/add",
    async ({ task, description }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/task/add`, { task, description });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// get single task
export const getSingleTask = createAsyncThunk(
    "task/getSingle",
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/task/${taskId}`);

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// update task
export const updateTask = createAsyncThunk(
    "task/update",
    async ({ data, taskId }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/api/v1/task/update/${taskId}`, data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// delete task
export const deleteTask = createAsyncThunk(
    "task/delete",
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/api/v1/task/delete/${taskId}`);

            // console.log(response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getAllTasks = createAsyncThunk(
    "task/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/task/get-all-tasks`);

            // console.log(response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const toggleTaskStatus = createAsyncThunk(
    "task/toggleStatus",
    async ({ taskId, status }, { rejectWithValue }) => {
        try {
            // console.log(taskId, status, "redux");
            const response = await axios.patch(`${API_URL}/api/v1/task/toggle-status/${taskId}`, { status });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    tasks: [],
    task: null,
    error: "",
    loading: false,
    status: 'idle',

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
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.tasks.push(action.payload.task);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getSingleTask.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(getSingleTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.task = action.payload.task;
            })
            .addCase(getSingleTask.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                let updatedTask = action.payload.task;
                state.tasks = state.tasks.map((task) => task === updatedTask ? updatedTask : task);
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                let id = action.payload.task;
                state.tasks = state.tasks.filter((task) => task._id !== id);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getAllTasks.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.tasks = action.payload.tasks
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload
            })
            .addCase(toggleTaskStatus.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                const updatedTask = action.payload.task;


                const index = state.tasks.findIndex(
                    (task) => task._id === updatedTask._id
                );


                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }

            })
            .addCase(toggleTaskStatus.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            })
    }

})


export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;