import React, { useMemo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { AppColors, GlobalColors } from '~/utils/globalColors';

interface ColorSelectProps {
    value: AppColors;
    setValue: Function;
    isValid?: boolean;
}

const ColorSelect = (props: ColorSelectProps) => {
    const { value, setValue, isValid = true } = props;

    const categorySelectHandler = (event: SelectChangeEvent<AppColors>) => {
        if (event.target.value) {
            setValue(event.target?.value);
        }
    };

    const colorOptions = useMemo(() => Object.values(GlobalColors).map((color) => (
        <MenuItem
            key={color.label}
            sx={{ bgcolor: color.color }}
            value={color.color}
        >
            {color.label}
        </MenuItem>
    )), [AppColors]);

    return (
        <FormControl variant="standard" sx={{ m: 1, width: '200px' }}>
            <InputLabel id="color-select">Color</InputLabel>

            <Select
                sx={{
                    bgcolor: value,
                }}
                labelId="color-select"
                id="color-select"
                value={value}
                onChange={categorySelectHandler}
                label="Color"
                error={!isValid}
            >
                {
                    colorOptions
                }
            </Select>
        </FormControl>
    );
};

export default ColorSelect;
