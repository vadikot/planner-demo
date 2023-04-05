import React, { FC, useEffect } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getAllCategories, getCategoryById } from '~/store/category/categorySelectors';
import { fetchCategoriesThunk } from '~/store/category/categoryThunks';

interface CategorySelectProps {
    value: number | '';
    setValue: Function;
    isValid?: boolean;
    sx?: SxProps;
}

const CategorySelect: FC<CategorySelectProps> = (props) => {
    const {
        value, setValue, isValid = true, sx = {},
    } = props;

    const isFirstRender = true;

    const dispatch = useAppDispatch();
    const categories = useAppSelector(getAllCategories);
    const categoryColor = useAppSelector(getCategoryById(value))?.color;

    useEffect(() => {
        if (isFirstRender && !categories?.length) {
            dispatch(fetchCategoriesThunk());
        }
    }, []);

    const categorySelectHandler = (event: SelectChangeEvent<number>) => {
        if (event.target.value) {
            setValue(event.target?.value);
        }
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, width: '100%', ...sx }}>
            <InputLabel
                id="demo-simple-select-standard-label"
                required
                error={!isValid}
            >
                Category
            </InputLabel>
            <Select
                sx={{ bgcolor: categoryColor }}
                labelId="category-select"
                id="category-select"
                value={value}
                onChange={categorySelectHandler}
                label="category"
                error={!isValid}
            >
                {
                    categories.map((category) => (
                        <MenuItem
                            sx={{ bgcolor: category.color }}
                            key={category.id}
                            value={category.id}
                        >
                            {category.title}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
