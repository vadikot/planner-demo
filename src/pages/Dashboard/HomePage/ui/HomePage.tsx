import React from 'react';
import { LocalStorage } from '~/utils/global';
import classes from './HomePage.module.scss';

const HomePage = () => {
    const firstName = LocalStorage.getUser()?.firstName || 'anonymous';
    const lastName = LocalStorage.getUser()?.lastName || 'anonymous';

    return (
        <div className={classes.DashboardHome}>
            <h1>Dashboard HomePage</h1>
            <p>
                {`Hi, ${firstName} ${lastName}`}
            </p>
            <p><b>This page is not ready yet, updates coming soon...</b></p>
        </div>
    );
};

export default HomePage;
