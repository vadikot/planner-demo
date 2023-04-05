import { createSelector } from '@reduxjs/toolkit';
import { TaskType, TaskWithCategoryType } from '~/components/Task';
import { CategoryType } from '~/components/Category';
import { RootState } from '../store';
import { getAllCategories } from '../category/categorySelectors';

export const getTaskFetchStatus = (state: RootState) => state.task.status;
export const getAllTasks = (state: RootState) => state.task.tasks;

export const getAllTasksWithCategories = createSelector(
    [getAllTasks, getAllCategories],
    (tasks: TaskType[], categories: CategoryType[]): TaskWithCategoryType[] => {
        if (tasks?.length && categories?.length) {
            return tasks.map((task) => {
                const taskCategory = categories.find((category) => category.id === task.categoryId);

                return { ...task, categoryTitle: (taskCategory) ? taskCategory?.title : '' };
            });
        }

        return [];
    },
);

export const getTasksByCategoryId = (id: number | '') => createSelector(
    [getAllTasksWithCategories],
    (tasks: TaskWithCategoryType[]) => {
        if (id === '') {
            return tasks;
        }
        return tasks?.filter((task) => task.categoryId === id) || [];
    },
);

export const getAmountOfTasksInCategory = (id: number) => createSelector(
    [getTasksByCategoryId(id)],
    (tasks: TaskWithCategoryType[]) => tasks?.length || 0,
);

export const getAmountOfCompletedTasksInCategory = (id: number) => createSelector(
    [getTasksByCategoryId(id)],
    (tasks: TaskWithCategoryType[]) => tasks?.filter((task) => task.isCompleted).length || 0,
);
