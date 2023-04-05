import React, { FC } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';

export enum TaskSortSelectType {
    none = 'none',
    completed = 'completed',
    notCompleted = 'notCompleted',
    newest = 'newest',
    oldest = 'oldest',
}

interface TaskSortSelectProps {
    value: TaskSortSelectType;
    setValue: Function;
}

const TaskSortSelect: FC<TaskSortSelectProps> = (props) => {
    const { value, setValue } = props;

    const taskSortSelectHandler = (event: SelectChangeEvent<TaskSortSelectType>) => {
        if (event.target.value) {
            setValue(event.target?.value);
        }
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
            <InputLabel
                id="task-sort"
            >
                Sort by
            </InputLabel>
            <Select
                labelId="task-sort"
                id="task-sort-select"
                value={value}
                onChange={taskSortSelectHandler}
                label="taskSort"
            >
                <MenuItem value={TaskSortSelectType.none}>None</MenuItem>
                <MenuItem value={TaskSortSelectType.completed}>Completed</MenuItem>
                <MenuItem value={TaskSortSelectType.notCompleted}>Not completed</MenuItem>
                <MenuItem value={TaskSortSelectType.newest}>Newest</MenuItem>
                <MenuItem value={TaskSortSelectType.oldest}>Oldest</MenuItem>
            </Select>
        </FormControl>
    );
};

export default TaskSortSelect;
