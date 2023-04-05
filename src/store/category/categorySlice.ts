import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from '~/components/Category';
import { FetchStatusType } from '~/utils/globalTypes';
import { fetchCategoriesThunk } from './categoryThunks';

interface CategoryState {
    categories: CategoryType[];
    status: FetchStatusType;
    error: string;
}

const initialState: CategoryState = {
    categories: [],
    status: FetchStatusType.idle,
    error: '',
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        createCategory(state, action: PayloadAction<CategoryType>) {
            state.categories.push(action.payload);
        },
        updateCategory(state, action: PayloadAction<CategoryType>) {
            state.categories = state.categories?.map((category) => (
                category.id === action.payload.id ? { ...category, ...action.payload } : category));
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategoriesThunk.pending, (state) => {
                state.status = FetchStatusType.loading;
            })
            .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
                state.status = FetchStatusType.succeeded;
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesThunk.rejected, (state) => {
                state.status = FetchStatusType.failed;
            });
    },
});

export const { createCategory, updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
