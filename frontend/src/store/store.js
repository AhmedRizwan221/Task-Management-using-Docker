import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";


export const store = configureStore({
    reducer: {
        task: taskReducer
    }
})