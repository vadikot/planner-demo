import React, { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import { Edit as EditIcon } from '@mui/icons-material';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '~/store/hooks';
import { removeTaskThunk, updateTaskCompletedFiledThunk, updateTaskThunk } from '~/store/task/taskThunks';
import { isStringEmpty } from '~/utils/global';
import { textFieldEventType } from '~/utils/globalTypes';
import { TaskWithCategoryType } from '~/components/Task';
import { TaskFormValidationType } from '~/components/Task/lib/types';
import categoryCls from '~/components/Category/ui/Category.module.scss';
import taskCls from './Task.module.scss';
import { CategorySelect } from '../../Category';

interface TaskProps {
    task: TaskWithCategoryType;
}

const Task = ({ task }: TaskProps) => {
    const {
        id, title, categoryId, categoryTitle, isCompleted,
    } = task;

    const [newTitle, setNewTitle] = useState<string>(title);
    const [newCategoryId, setNewCategoryId] = useState<number>(categoryId);

    const [isEditInputOpen, setIsEditInputOpen] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(isCompleted);
    const [isValid, setIsValid] = useState<TaskFormValidationType>({ title: true, category: true });

    const dispatch = useAppDispatch();

    const editTaskButtonHandler = () => {
        setIsEditInputOpen((prevState) => !prevState);
        setIsValid({ title: true, category: true });
    };

    const checkFormValidation = (): boolean => {
        const isTitleValid = !isStringEmpty(newTitle);
        const isCategoryValid = Boolean(newCategoryId);

        setIsValid({ title: isTitleValid, category: isCategoryValid });
        return isTitleValid && isCategoryValid;
    };

    const saveChangesHandler = (): void => {
        const isFromValid = checkFormValidation();

        // todo save only if we have changes

        if (isFromValid) {
            dispatch(updateTaskThunk({ id, title: newTitle, categoryId: newCategoryId }))
                .then(() => {
                    setIsEditInputOpen(false);
                });
        }
    };

    const handleToggle = (): void => {
        dispatch(updateTaskCompletedFiledThunk({ id, isCompleted: !isDone }))
            .then(() => setIsDone((prevState) => !prevState));
    };

    const labelId = `checkbox-list-label-${id}`;

    const listItemStyle = {
        '&.Mui-selected': {
            backgroundColor: '#b9f6ca',

        },
    };

    const taskEditForm = useMemo(() => (
        <div className={categoryCls.editFormWrap}>
            <TextField
                sx={{ flexGrow: 3, mb: 1 }}
                id="standard-basic"
                label="Task name"
                variant="standard"
                value={newTitle}
                onChange={(e: textFieldEventType) => setNewTitle(e.target.value)}
                required
                error={!isValid.title}
            />
            <CategorySelect
                sx={{ width: '250px' }}
                value={newCategoryId}
                setValue={setNewCategoryId}
                isValid={isValid.category}
            />
            <Button
                sx={{ mx: 3 }}
                variant="contained"
                color="primary"
                size="small"
                onClick={saveChangesHandler}
            >
                Save
            </Button>
        </div>
    ), [newTitle, newCategoryId]);

    return (
        <ListItem
            className={taskCls.taskListItem}
            sx={listItemStyle}
            key={id}
            selected={isDone}
            divider
        >
            <div className={categoryCls.categoryWrap}>
                <ListItemText className={taskCls.itemText} id={labelId} primary={title} />
                {/* <ListItemText sx={{ mr: 3 }} id={labelId} primary={categoryTitle} /> */}
                {
                    isEditInputOpen && taskEditForm
                }
            </div>
            <div className={taskCls.buttonsWrap}>
                <ListItemIcon onClick={handleToggle}>
                    <Checkbox
                        edge="start"
                        checked={isDone}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={editTaskButtonHandler}>
                        {
                            isEditInputOpen ? <CloseIcon /> : <EditIcon />
                        }
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={() => dispatch(removeTaskThunk(id))}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemIcon>
            </div>
        </ListItem>

    );
};

export default Task;
