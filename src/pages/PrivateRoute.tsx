import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/components/Auth/lib/AuthConext';

const PrivateRoute = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        isAuth ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoute;
