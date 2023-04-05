import React, { useEffect, useMemo } from 'react';
import List from '@mui/material/List';
import { Alert, CircularProgress } from '@mui/material';
import { FetchStatusType } from '~/utils/globalTypes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getAllCategories, getCategoryFetchStatus } from '~/store/category/categorySelectors';
import { fetchCategoriesThunk } from '~/store/category/categoryThunks';
import { getAllTasks, getTaskFetchStatus } from '~/store/task/taskSelectors';
import { fetchTasksThunk } from '~/store/task/taskThunks';
import Category from './Category';

const listStyles = {
    bgcolor: 'background.paper',
    '& .MuiListItem-root:hover': {
        bgcolor: '#f5f5f5',
    },
    '& .Mui-selected': {
        bgcolor: '#b9f6ca',

    },
};

const CategoryList = () => {
    const dispatch = useAppDispatch();

    const categories = useAppSelector(getAllCategories);
    const categoriesFetchStatus = useAppSelector(getCategoryFetchStatus);
    const taskFetchStatus = useAppSelector(getTaskFetchStatus);

    useEffect(() => {
        if (categoriesFetchStatus === FetchStatusType.idle) {
            dispatch(fetchCategoriesThunk());
        }
        if (taskFetchStatus === FetchStatusType.idle) {
            dispatch(fetchTasksThunk());
        }
    }, []);

    const isCategoriesLoading = categoriesFetchStatus === FetchStatusType.loading;

    if (categoriesFetchStatus === FetchStatusType.failed) {
        return (
            <Alert sx={{ mt: 1 }} severity="error">
                Sorry, we have a problem connecting to our database. Please try again later.
            </Alert>
        );
    }

    if (!categories?.length) {
        return (
            <Alert sx={{ mt: 1 }} severity="info">You don&apos;t have any category yet</Alert>
        );
    }

    return (
        <List sx={{ ...listStyles }}>
            {
                isCategoriesLoading && <CircularProgress />
            }
            {
                categories?.map((item) => <Category key={item.id} category={item} />)
            }

        </List>
    );
};

export default CategoryList;
