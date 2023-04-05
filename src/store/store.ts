import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import taskReducer from './task/taskSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        task: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
