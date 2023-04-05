import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getAllTasks, getTaskFetchStatus, getTasksByCategoryId } from '~/store/task/taskSelectors';
import { fetchTasksThunk } from '~/store/task/taskThunks';
import { fetchCategoriesThunk } from '~/store/category/categoryThunks';
import { getAllCategories, getCategoryById, getCategoryFetchStatus } from '~/store/category/categorySelectors';
import { FetchStatusType } from '~/utils/globalTypes';
import { useSortTasksByValue } from '~/components/Task';
import { CategorySelect } from '~/components/Category';
import Task from './Task';
import TaskSortSelect, { TaskSortSelectType } from './TaskSortSelect';
import taskCls from './Task.module.scss';

const listStyles = {
    bgcolor: 'background.paper',
    '& .MuiListItem-root:hover': {
        bgcolor: '#f5f5f5',
    },
};

const TaskList = () => {
    const [filterByCategoryId, setFilterByCategoryId] = useState<number | ''>('');
    const [sortValue, setSortValue] = useState<TaskSortSelectType>(TaskSortSelectType.none);

    const dispatch = useAppDispatch();
    const categoriesFetchStatus = useAppSelector(getCategoryFetchStatus);
    const tasksFetchStatus = useAppSelector(getTaskFetchStatus);

    const allUserTasksAmount = useAppSelector(getAllTasks).length;
    const currentCategory = useAppSelector(getCategoryById(filterByCategoryId));
    const tasksByCategory = useAppSelector(getTasksByCategoryId(filterByCategoryId));
    const sortedTasks = useSortTasksByValue(tasksByCategory, sortValue);

    useEffect(() => {
        if (categoriesFetchStatus === FetchStatusType.idle) {
            dispatch(fetchCategoriesThunk());
        }
        if (tasksFetchStatus === FetchStatusType.idle) {
            dispatch(fetchTasksThunk());
        }
    }, []);

    const isTasksLoading = categoriesFetchStatus === FetchStatusType.loading;

    if (tasksFetchStatus === FetchStatusType.failed) {
        return (
            <Alert sx={{ mt: 1 }} severity="error">
                Sorry, we have a problem connecting to our database. Please try again later.
            </Alert>
        );
    }

    if (allUserTasksAmount === 0) {
        return (
            <Alert sx={{ mt: 1 }} severity="info">You don&apos;t have any tasks yet</Alert>
        );
    }

    return (
        <List sx={{ ...listStyles }}>
            <div className={taskCls.additional}>
                <div className={taskCls.filter}>
                    <div className={taskCls.label}>Filter by</div>
                    <CategorySelect value={filterByCategoryId} setValue={setFilterByCategoryId} />
                </div>
                <div className={taskCls.sort}>
                    <div className={taskCls.label}>Sort by</div>
                    <TaskSortSelect value={sortValue} setValue={setSortValue} />
                </div>
            </div>
            {
                isTasksLoading && <CircularProgress />
            }
            {
                tasksByCategory?.length
                    ? sortedTasks?.map((task) => <Task key={task.id} task={task} />)
                    : (
                        <Alert severity="info">
                            You don&apos;t have any tasks in
                            <b>{` ${currentCategory?.title} `}</b>
                            category
                        </Alert>
                    )
            }
        </List>
    );
};

export default TaskList;
