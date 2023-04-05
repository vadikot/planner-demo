import React, { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContactPage } from '~/pages/ContactPage';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { LoginPage } from './LoginPage';
import { NotFoundPage } from './NotFoundPage';
import { HomePage as DashboardHomePage, CategoryPage, TaskPage } from './Dashboard';
import DashboardTemplate from './Dashboard/DashboardTemplate';
import PrivateRoute from './PrivateRoute';

type PageType = 'normal' | 'dashboard';

interface RouteType {
    path: string,
    label: string,
    element: React.ReactNode,
    isRouteActive: boolean,
    pageType: PageType,
    isShowLinkInMenu: Boolean,
}

export const appRoutes: RouteType[] = [
    {
        path: '/',
        label: 'Home',
        element: <HomePage />,
        isRouteActive: true,
        pageType: 'normal',
        isShowLinkInMenu: true,
    },
    {
        path: '/about',
        label: 'About',
        element: <AboutPage />,
        isRouteActive: true,
        pageType: 'normal',
        isShowLinkInMenu: true,
    },
    {
        path: '/contact',
        label: 'Contact',
        element: <ContactPage />,
        isRouteActive: true,
        pageType: 'normal',
        isShowLinkInMenu: true,
    },
    {
        path: '/login',
        label: 'Login',
        element: <LoginPage />,
        isRouteActive: true,
        pageType: 'normal',
        isShowLinkInMenu: false,
    },
    {
        path: '*',
        label: 'Not Found',
        element: <NotFoundPage />,
        isRouteActive: true,
        pageType: 'normal',
        isShowLinkInMenu: false,
    },
    {
        path: '/dashboard/home',
        label: 'Home',
        element: <DashboardHomePage />,
        isRouteActive: false,
        pageType: 'dashboard',
        isShowLinkInMenu: true,
    },
    {
        path: '/dashboard/categories',
        label: 'Categories',
        element: <CategoryPage />,
        isRouteActive: false,
        pageType: 'dashboard',
        isShowLinkInMenu: true,
    },
    {
        path: '/dashboard/tasks',
        label: 'Tasks',
        element: <TaskPage />,
        isRouteActive: false,
        pageType: 'dashboard',
        isShowLinkInMenu: true,
    },
];

const AppRouter = () => {
    const activeNormalRoutes = useMemo(() => appRoutes
        .filter((route) => (route.isRouteActive && route.pageType === 'normal'))
        .map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />
        )), [appRoutes]);

    return (
        // todo add loader
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {activeNormalRoutes}
                <Route path="/dashboard/:entity" element={<PrivateRoute />}>
                    <Route path="/dashboard/:entity" element={<DashboardTemplate />} />
                </Route>
            </Routes>

        </Suspense>
    );
};

export default AppRouter;
