import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatusType } from '~/utils/globalTypes';
import { TaskType } from '~/components/Task';
import { fetchTasksThunk } from './taskThunks';

interface TaskState {
    tasks: TaskType[];
    status: FetchStatusType;
    error: string;
}

const initialState: TaskState = {
    tasks: [],
    status: FetchStatusType.idle,
    error: '',
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        createTask(state, action: PayloadAction<TaskType>) {
            state.tasks.push(action.payload);
        },
        updateTask(state, action: PayloadAction<TaskType>) {
            state.tasks = state.tasks?.map((task) => (
                task.id === action.payload.id ? { ...task, ...action.payload } : task));
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasksThunk.pending, (state) => {
                state.status = FetchStatusType.loading;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.status = FetchStatusType.succeeded;
                state.tasks = action.payload;
            })
            .addCase(fetchTasksThunk.rejected, (state) => {
                state.status = FetchStatusType.failed;
                // state.error = action.error.message;
            });
    },
});

export const { createTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
