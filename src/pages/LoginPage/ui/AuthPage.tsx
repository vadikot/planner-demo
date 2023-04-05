import React, { useContext, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginForm, RegisterForm } from '~/components/Auth';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import classes from './LoginPage.module.scss';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AuthPage = () => {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const changeTabHandler = (event: React.MouseEvent<HTMLElement>, tabNumber: number) => {
        event.preventDefault();
        setCurrentTab(tabNumber);
    };

    return (
        <div className={classes.LoginPage}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    sx={{
                        '.MuiTabs-flexContainer': {
                            width: '100%', justifyContent: 'center',
                        },
                    }}
                    value={currentTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Registration" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {
                (currentTab === 0)
                    ? <LoginForm setCurrentTab={changeTabHandler} />
                    : <RegisterForm setCurrentTab={changeTabHandler} />
            }
        </div>
    );
};

export default AuthPage;
