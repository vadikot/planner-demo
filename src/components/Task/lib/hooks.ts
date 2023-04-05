import { useMemo } from 'react';
import { TaskSortSelectType } from '~/components/Task';
import { TaskWithCategoryType } from './types';

export const useSortTasksByValue = (
    tasks: TaskWithCategoryType[],
    sortValue: TaskSortSelectType,
): TaskWithCategoryType[] => useMemo(() => {
    const copyArray = tasks.slice();

    switch (sortValue) {
        case TaskSortSelectType.completed:
            return copyArray?.sort((task) => (task.isCompleted ? -1 : 1));
        case TaskSortSelectType.notCompleted:
            return copyArray?.sort((task) => (task.isCompleted ? 1 : -1));
        case TaskSortSelectType.newest:
            return copyArray?.sort((task1, task2) => (task1.id > task2.id ? -1 : 1));
        case TaskSortSelectType.oldest:
            return copyArray?.sort((task1, task2) => (task1.id > task2.id ? 1 : -1));
        default:
            return copyArray?.sort((task1, task2) => (task1.id > task2.id ? -1 : 1));
    }
}, [tasks, sortValue]);
