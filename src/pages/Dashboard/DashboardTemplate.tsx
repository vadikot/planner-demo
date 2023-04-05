import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { appRoutes } from '~/pages';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import DashboardEntity from './DashboardEntity';

interface DashboardTemplateProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const DashboardTemplate = (props:DashboardTemplateProps) => {
    const drawerWidth = 240;
    const { logout } = useContext(AuthContext);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (

        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Link
                                style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none' }}
                                to="/dashboard/home"
                            >
                                Home
                            </Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Link
                                style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none' }}
                                to="/dashboard/categories"
                            >
                                Categories
                            </Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Link
                                style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none' }}
                                to="/dashboard/tasks"
                            >
                                Tasks
                            </Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{ textAlign: 'center' }}
                        component="span"
                        style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none' }}
                        onClick={() => logout()}
                    >
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button component="span" href="/dashboard/home" sx={{ color: '#fff' }}>
                            <Link
                                style={{ color: 'white', textDecoration: 'none' }}
                                to="/dashboard/home"
                            >
                                Home
                            </Link>
                        </Button>
                        <Button
                            component="span"
                            href="/dashboard/categories"
                            sx={{ color: '#fff' }}
                        >
                            <Link
                                style={{ color: 'white', textDecoration: 'none' }}
                                to="/dashboard/categories"
                            >
                                Categories
                            </Link>
                        </Button>
                        <Button component="span" href="/dashboard/tasks" sx={{ color: '#fff' }}>
                            <Link
                                style={{ color: 'white', textDecoration: 'none' }}
                                to="/dashboard/tasks"
                            >
                                Tasks
                            </Link>
                        </Button>
                        <Button component="span" sx={{ color: '#fff' }} onClick={() => logout()}>
                            LOGOUT
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ width: '100%', p: 3 }}>
                <Toolbar />
                <DashboardEntity />
            </Box>
        </Box>
    );
};

export default DashboardTemplate;
