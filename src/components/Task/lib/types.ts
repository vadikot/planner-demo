export interface TaskTypeWithoutId {
    title: string;
    categoryId: number;
    isCompleted: boolean;
    timeMs: number;
    userId: number;
}

export interface TaskType extends TaskTypeWithoutId {
    readonly id: number;
}

export interface TaskWithCategoryType extends TaskType {
    categoryTitle: string;
}

export interface UpdateTaskByCompletedType {
    id: number;
    isCompleted: boolean;
}

export interface UpdateTaskType {
    id: number;
    title: string;
    categoryId: number;
}

export interface TaskFormValidationType {
    title: boolean;
    category: boolean;
}
