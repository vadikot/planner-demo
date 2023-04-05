import { RootState } from '../store';

export const getAllCategories = (state: RootState) => state.category.categories;
export const getCategoryFetchStatus = (state: RootState) => state.category.status;

export const getCategoryById = (categoryId: number | '') => (state: RootState) => (
    state.category.categories.find((category) => category.id === categoryId)) || undefined;
