import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AppColors } from '~/utils/globalColors';
import { useAppDispatch } from '~/store/hooks';
import { isStringEmpty, LocalStorage } from '~/utils/global';
import { createCategoryThunk } from '~/store/category/categoryThunks';
import { PromiseStatusType, textFieldEventType } from '~/utils/globalTypes';
import { CategoryTypeWithoutId } from '~/components/Category';
import ColorSelect from '~/components/ColorSelect';

const CreateCategoryForm = () => {
    const [title, setTitle] = useState<string>('');
    const [color, setColor] = useState<AppColors>(AppColors.none);
    const [isValid, setIsValid] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const checkFormValidation = (): boolean => !isStringEmpty(title) && Boolean(color);

    const createHandler = () => {
        const isFromValid = checkFormValidation();
        const userId = LocalStorage.getUser()?.id;

        if (isFromValid && userId) {
            setIsValid(true);

            const category: CategoryTypeWithoutId = {
                title,
                color,
                order: 0,
                userId,
            };

            dispatch(createCategoryThunk(category))
                .then((data) => {
                    if (data.meta.requestStatus === PromiseStatusType.fulfilled) {
                        setTitle('');
                        setColor(AppColors.none);
                    }
                });
        } else {
            setIsValid(false);
        }
    };

    return (
        <div>
            <Typography variant="h5">Create category</Typography>
            <form style={{ width: '200px' }}>
                <TextField
                    style={{ width: '200px', margin: '5px' }}
                    type="text"
                    label="Category name"
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={(e: textFieldEventType) => setTitle(e.target.value)}
                    required
                    error={!isValid}
                />
                <br />
                <ColorSelect value={color} setValue={setColor} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createHandler}
                >
                    create
                </Button>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
