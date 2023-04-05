import React from 'react';
import { CategoryList } from '~/components/Category';
import CreateCategoryForm from '~/components/Category/ui/CreateCategoryForm';

const CategoryPage = () => (
    <div>
        <h1 style={{ textAlign: 'center' }}>Category page</h1>
        <CreateCategoryForm />
        <CategoryList />
    </div>
);

export default CategoryPage;
