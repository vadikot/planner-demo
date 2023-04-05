import React from 'react';
import AppLinearProgress from '~/components/AppLinearProgress';
import categoryCls from './Category.module.scss';

interface CategoryProgressProps {
    value: number;
    amountOfTasks: number;
    amountOfCompletedTasks: number;
}

const CategoryProgress = (props: CategoryProgressProps) => {
    const {
        value,
        amountOfTasks,
        amountOfCompletedTasks,
    } = props;

    return (
        <div className={categoryCls.progress}>
            <div className={categoryCls.progressWrap}>
                <span>Progress</span>
                <span>
                    {amountOfCompletedTasks}
                    /
                    {amountOfTasks}
                </span>
            </div>
            <AppLinearProgress sx={{ height: '4px' }} value={value} />
        </div>
    );
};

export default CategoryProgress;
