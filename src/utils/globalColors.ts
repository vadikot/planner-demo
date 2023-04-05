export enum AppColors {
    none = 'none',
    red = '#fa3216',
    brightRed = '#fc7f6d',
    purple = '#ee7ee4',
    brightPurple = '#f4aeee',
    green = '#008b23',
    brightGreen = '#60b776',
    yellow = '#f2cf0b',
    brightYellow = '#f7e167',
}

interface ColorType {
    label: string;
    color: AppColors;
}

export const GlobalColors: Record<string, ColorType> = {
    none: {
        label: 'None',
        color: AppColors.none,
    },
    red: {
        label: 'Red',
        color: AppColors.red,
    },
    brightRed: {
        label: 'Bright red',
        color: AppColors.brightRed,
    },
    purple: {
        label: 'Purple',
        color: AppColors.purple,
    },
    brightPurple: {
        label: 'Bright purple',
        color: AppColors.brightPurple,
    },
    green: {
        label: 'Green',
        color: AppColors.green,
    },
    brightGreen: {
        label: 'Bright green',
        color: AppColors.brightGreen,
    },
    yellow: {
        label: 'Yellow',
        color: AppColors.yellow,
    },
    brightYellow: {
        label: 'Bright yellow',
        color: AppColors.brightYellow,
    },
};
