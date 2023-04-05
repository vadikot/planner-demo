import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { isStringEmpty, LocalStorage } from '~/utils/global';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getAllCategories } from '~/store/category/categorySelectors';
import { createTaskThunk } from '~/store/task/taskThunks';
import { fetchCategoriesThunk } from '~/store/category/categoryThunks';
import { textFieldEventType } from '~/utils/globalTypes';
import { TaskFormValidationType, TaskType } from '~/components/Task/lib/types';
import { CategorySelect } from '~/components/Category';

const CreateTaskForm = () => {
    const [title, setTitle] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [isValid, setIsValid] = useState<TaskFormValidationType>({ title: true, category: true });

    const dispatch = useAppDispatch();

    const isFirstRender = true;

    const categories = useAppSelector(getAllCategories);

    useEffect(() => {
        if (isFirstRender && !categories?.length) {
            dispatch(fetchCategoriesThunk());
        }
    }, []);

    const checkFormValidation = (): boolean => {
        const isTitleValid = !isStringEmpty(title);
        const isCategoryValid = Boolean(categoryId);

        setIsValid({ title: isTitleValid, category: isCategoryValid });
        return isTitleValid && isCategoryValid;
    };

    const createHandler = () => {
        const isFromValid = checkFormValidation();
        const userId = LocalStorage.getUser()?.id;

        if (isFromValid && userId) {
            const task: TaskType = {
                title,
                // @ts-ignore
                categoryId,
                isCompleted: false,
                timeMs: 0,
                userId,
            };

            dispatch(createTaskThunk(task))
                .then((data) => {
                    if (data.meta.requestStatus === 'fulfilled') {
                        setTitle('');
                    }
                });
        }
    };

    return (
        <div>
            <Typography variant="h5">Create task</Typography>
            {
                categories?.length
                    ? (
                        <form style={{ width: '200px' }}>
                            <TextField
                                style={{ width: '200px', margin: '5px' }}
                                type="text"
                                label="Task name"
                                variant="outlined"
                                size="small"
                                value={title}
                                onChange={(e: textFieldEventType) => setTitle(e.target.value)}
                                required
                                error={!isValid.title}
                            />
                            <br />
                            <CategorySelect
                                value={categoryId}
                                setValue={setCategoryId}
                                isValid={isValid.category}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createHandler}
                            >
                                create
                            </Button>
                        </form>
                    )
                    : (
                        <span>
                            Sorry, you need &nbsp;
                            <Link to="/categories">create category</Link>
&nbsp; first.
                        </span>
                    )
            }

        </div>
    );
};

export default CreateTaskForm;
