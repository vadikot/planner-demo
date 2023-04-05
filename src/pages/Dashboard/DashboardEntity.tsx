import React from 'react';
import { useParams } from 'react-router-dom';
import { HomePage } from './HomePage';
import { CategoryPage } from './CategoryPage';
import TaskPage from './TaskPage/ui/TaskPage';
import { NotFoundPage } from '../NotFoundPage';

const DashboardEntity = () => {
    const { entity } = useParams();

    switch (entity) {
        case 'home':
            return <HomePage />;
        case 'categories':
            return <CategoryPage />;
        case 'tasks':
            return <TaskPage />;
        default:
            return <NotFoundPage />;
    }
};

export default DashboardEntity;
