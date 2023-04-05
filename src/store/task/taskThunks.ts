import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    TaskType, TaskTypeWithoutId, UpdateTaskByCompletedType, UpdateTaskType,
} from '~/components/Task';
import { LocalStorage, TASKS_URL } from '~/utils/global';
import { getHeaders } from '~/components/Auth/lib/AuthHeader';
import { createTask, updateTask } from './taskSlice';

export const fetchTasksThunk = createAsyncThunk(
    'task/fetchTasks',
    async (limit: number = 50) => {
        const headers = getHeaders();
        const userId = LocalStorage.getUser()?.id;

        if (headers) {
            const response = await axios.get<TaskType[]>(TASKS_URL, {
                params: {
                    _limit: limit,
                    userId,
                },
                headers,
            });

            return response.data;
        }
        return [];
    },
);

export const createTaskThunk = createAsyncThunk(
    'task/createTask',
    async (task: TaskTypeWithoutId, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.post(`${TASKS_URL}`, task, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(createTask(response.data));
                });
        }
    },
);

export const updateTaskCompletedFiledThunk = createAsyncThunk(
    'task/updateCompletedFieldTask',
    async (data: UpdateTaskByCompletedType, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.patch(`${TASKS_URL}/${data.id}`, { isCompleted: data.isCompleted }, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(updateTask(response.data));
                });
        }
    },
);

export const updateTaskThunk = createAsyncThunk(
    'task/updateTask',
    async (data: UpdateTaskType, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.patch(`${TASKS_URL}/${data.id}`, {
                title: data.title,
                categoryId: data.categoryId,
            }, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(updateTask(response.data));
                });
        }
    },
);

export const removeTaskThunk = createAsyncThunk(
    'task/removeTask',
    async (id: number, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.delete(`${TASKS_URL}/${id}`, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(fetchTasksThunk());
                })
                .catch();
        }
    },
);
