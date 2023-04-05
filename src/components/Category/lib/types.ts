import { AppColors } from '~/utils/globalColors';

export interface CategoryTypeWithoutId {
    title: string;
    color: AppColors;
    order?: number;
    userId: number;
}

export interface CategoryType extends CategoryTypeWithoutId {
    readonly id: number;
}

export interface UpdateCategoryType {
    id: number;
    title: string;
    color: AppColors;
}
