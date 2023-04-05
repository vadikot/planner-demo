import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '~/components/Auth/ui/Copyright';
import { FormFieldsType } from '~/components/Auth/lib/types';
import { Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import { useNavigate } from 'react-router-dom';
import { isEmailValid, LOGIN_URL } from '~/utils/global';

interface RegisterFormProps {
    setCurrentTab: Function;
}

interface LoginFormValidationType {
    email: boolean;
    password: boolean;
}

const LoginForm = ({ setCurrentTab }:RegisterFormProps) => {
    const [isValid, setIsValid] = useState<LoginFormValidationType>({
        email: true,
        password: true,
    });
    const [error, setError] = useState<string>('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const isAllFieldsFilled = (fields: FormFieldsType): boolean => {
        const newValidationValue = {
            email: !!fields.email,
            password: !!fields.password,
        };

        setIsValid(newValidationValue);

        const validationResult = Object.values(newValidationValue).find((field) => !field);

        if (validationResult === undefined) {
            setError('');

            return true;
        }

        setError('Fields with * are required');

        return false;
    };

    const isFormValid = (fields: FormFieldsType): boolean => {
        if (!isAllFieldsFilled(fields)) {
            return false;
        }

        if (isEmailValid(fields?.email)) {
            setIsValid((prevState) => ({ ...prevState, email: true }));
            setError('');
        } else {
            setIsValid((prevState) => ({ ...prevState, email: false }));
            setError('Email is incorrect');

            return false;
        }

        return true;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        if (isFormValid(loginData)) {
            const authRequest = axios.post(LOGIN_URL, loginData);

            authRequest
                .then((response) => {
                    login(response?.data);
                })
                .then(() => {
                    navigate('/dashboard/home');
                })
                .catch((loginError) => {
                    if (loginError) {
                        setError(loginError?.response?.data);
                    }
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!isValid.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!isValid.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    {
                        !!error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2"> */}
                            {/*    Forgot password? */}
                            {/* </Link> */}
                        </Grid>
                        <Grid item>
                            <Link
                                href="/#"
                                variant="body2"
                                onClick={(event) => setCurrentTab(event, 1)}
                            >
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default LoginForm;
