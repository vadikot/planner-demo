import React, { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import { Edit as EditIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { removeCategoryThunk, updateCategoryThunk } from '~/store/category/categoryThunks';
import { getProgressValue, isStringEmpty } from '~/utils/global';
import { textFieldEventType } from '~/utils/globalTypes';
import { AppColors } from '~/utils/globalColors';
import { getAmountOfCompletedTasksInCategory, getAmountOfTasksInCategory } from '~/store/task/taskSelectors';
import { CategoryType } from '~/components/Category';
import ColorSelect from '~/components/ColorSelect';
import categoryCls from './Category.module.scss';
import CategoryProgress from './CategoryProgress';

interface CategoryProps {
    category: CategoryType;
}

const Category = ({ category }: CategoryProps) => {
    const [newTitle, setNewTitle] = useState<string>(category.title);
    const [isEditInputOpen, setIsEditInputOpen] = useState<boolean>(false);
    const [isEditInputValid, setIsEditInputValid] = useState<boolean>(true);
    const [newColor, setNewColor] = useState<AppColors>(category.color);

    const dispatch = useAppDispatch();

    const amountOfTasks = useAppSelector(getAmountOfTasksInCategory(category.id));
    const amountOfCompletedTasks = useAppSelector(getAmountOfCompletedTasksInCategory(category.id));
    const progressValue = getProgressValue(amountOfTasks, amountOfCompletedTasks);

    const editCategoryButtonHandler = () => {
        setIsEditInputOpen((prevState) => !prevState);
        setIsEditInputValid(true);
    };

    const saveChangesHandler = (id: number) => (): void => {
        if (isStringEmpty(newTitle)) {
            setIsEditInputValid(false);
        } else {
            setIsEditInputValid(true);

            if (newTitle !== category.title || newColor !== category.color) {
                dispatch(updateCategoryThunk({
                    id, title: newTitle, color: newColor,
                })).then(() => {
                    setIsEditInputOpen(false);
                });
            }
        }
    };

    const labelId = `checkbox-list-label-${category.id}`;

    const categoryEditForm = useMemo(() => (
        <div className={categoryCls.editFormWrap}>
            <TextField
                sx={{ flexGrow: '1', mb: 1 }}
                id="standard-basic"
                label="Category name"
                variant="standard"
                value={newTitle}
                onChange={(e: textFieldEventType) => setNewTitle(e.target.value)}
                required
                error={!isEditInputValid}
            />
            <ColorSelect value={newColor} setValue={setNewColor} />
            <Button
                sx={{ mx: 3 }}
                variant="contained"
                color="primary"
                size="small"
                onClick={saveChangesHandler(category.id)}
            >
                Save
            </Button>
        </div>
    ), [newTitle, newColor]);

    return (
        <ListItem
            sx={{ alignItems: 'flex-start', bgcolor: category.color }}
            className={categoryCls.categoryListItem}
            key={category.id}
            divider
        >
            <div className={categoryCls.categoryWrap}>
                <div className={categoryCls.categoryDataWrap}>
                    <ListItemText sx={{ mt: 1 }} id={labelId} primary={category.title} />
                    <CategoryProgress
                        value={progressValue}
                        amountOfTasks={amountOfTasks}
                        amountOfCompletedTasks={amountOfCompletedTasks}
                    />
                </div>
                {
                    isEditInputOpen && categoryEditForm
                }
            </div>
            <ListItemIcon>
                <IconButton onClick={editCategoryButtonHandler}>
                    {
                        isEditInputOpen ? <CloseIcon /> : <EditIcon />
                    }
                </IconButton>
            </ListItemIcon>
            <ListItemIcon>
                {/* You cannot delete a category if it contains tasks todo */}
                <IconButton onClick={() => dispatch(removeCategoryThunk(category.id))}>
                    <DeleteIcon />
                </IconButton>
            </ListItemIcon>

        </ListItem>
    );
};

export default Category;
