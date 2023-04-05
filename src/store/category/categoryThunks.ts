import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CategoryType, CategoryTypeWithoutId, UpdateCategoryType } from '~/components/Category';
import { CATEGORY_URL, LocalStorage } from '~/utils/global';
import { getHeaders } from '~/components/Auth/lib/AuthHeader';
import { createCategory, updateCategory } from './categorySlice';

export const fetchCategoriesThunk = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const headers = getHeaders();
        const userId = LocalStorage.getUser()?.id;

        if (headers) {
            const response = await axios.get<CategoryType[]>(CATEGORY_URL, {
                params: {
                    _limit: 50,
                    userId,
                },
                headers,
            });

            return response.data;
        }
        return [];
    },
);

export const createCategoryThunk = createAsyncThunk(
    'categories/createCategory',
    async (category: CategoryTypeWithoutId, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.post(`${CATEGORY_URL}`, category, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(createCategory(response.data));
                });
        }
    },
);

export const updateCategoryThunk = createAsyncThunk(
    'categories/updateCategory',
    async (data: UpdateCategoryType, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.patch(`${CATEGORY_URL}/${data.id}`, { title: data.title, color: data.color }, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(updateCategory(response.data));
                });
        }
    },
);

export const removeCategoryThunk = createAsyncThunk(
    'categories/removeCategory',
    async (id: number, thunkAPI) => {
        const headers = getHeaders();

        if (headers) {
            axios.delete(`${CATEGORY_URL}/${id}`, {
                headers,
            })
                .then((response) => {
                    thunkAPI.dispatch(fetchCategoriesThunk());
                })
                .catch();
        }
    },
);
