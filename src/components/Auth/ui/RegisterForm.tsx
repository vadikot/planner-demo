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
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Copyright from '~/components/Auth/ui/Copyright';
import { isEmailValid, REGISTER_URL } from '~/utils/global';
import { Alert, Tooltip } from '@mui/material';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import SuccessRegisterModal from '~/components/Auth/ui/SuccessRegisterModal';
import {
    FormDataValueType, FormFieldsType, RegisterFormErrorsType, RegisterFormValidationType,
} from '../lib/types';

export const sxAlert = { mt: 2, ml: 2, width: '100%' };
const passwordHintText = `
Password must:
contain a single digit from 1 to 9;
contain one lowercase letter;
contain one uppercase letter;
be 8-16 characters long;
`;

interface RegisterFormProps {
    setCurrentTab: Function;
}

const RegisterForm = ({ setCurrentTab }: RegisterFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<RegisterFormValidationType>({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        repeatPassword: true,
    });
    const [errors, setErrors] = useState<RegisterFormErrorsType>({
        main: '',
        email: '',
        password: '',
    });

    const { login } = useContext(AuthContext);

    const isAllFieldsFilled = (fields: FormFieldsType): boolean => {
        const newValidationValue = {
            firstName: !!fields.firstName,
            lastName: !!fields.lastName,
            email: !!fields.email,
            password: !!fields.password,
            repeatPassword: !!fields.repeatPassword,
        };

        setIsValid(newValidationValue);

        const validationResult = Object.values(newValidationValue).find((field) => !field);

        if (validationResult === undefined) {
            setErrors((prevState) => ({ ...prevState, main: '' }));

            return true;
        }

        setErrors((prevState) => ({ ...prevState, main: 'Fields with * are required' }));

        return false;
    };

    /**
     * Checks if the entered password is correct.
     *
     *
     * (?=.*[0-9]) means that the password must contain a single digit from 1 to 9.
     * (?=.*[a-z]) means that the password must contain one lowercase letter.
     * (?=.*[A-Z]) means that the password must contain one uppercase letter.
     * .{8,16} means that the password must be 8-16 characters long.
     *
     *
     * @param value - password from input element (type: File | string | null)
     * @returns Boolean value.
     *
     * @beta
     */
    const isPasswordValid = (
        value: FormDataValueType,
    ): boolean => {
        const validRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/;

        if (typeof value === 'string') {
            if (value.match(validRegex)) {
                setIsValid((prevState) => ({ ...prevState, password: true }));
                setErrors((prevState) => ({ ...prevState, password: '' }));

                return true;
            }
        }
        setIsValid((prevState) => ({ ...prevState, password: false }));
        setErrors((prevState) => ({ ...prevState, password: 'Password is incorrect' }));

        return false;
    };

    const isSecondPasswordSame = (
        password: FormDataValueType,
        repeatPassword: FormDataValueType,
    ) => {
        if (password === repeatPassword) {
            setIsValid((prevState) => ({ ...prevState, password: true }));
            setErrors((prevState) => ({ ...prevState, password: '' }));
            return true;
        }

        setIsValid((prevState) => ({ ...prevState, password: false }));
        setErrors((prevState) => ({ ...prevState, password: 'Password mismatch' }));
        return false;
    };

    const isFormValid = (fields: FormFieldsType): boolean => {
        if (!isAllFieldsFilled(fields)) {
            return false;
        }

        if (isEmailValid(fields?.email)) {
            setIsValid((prevState) => ({ ...prevState, email: true }));
            setErrors((prevState) => ({ ...prevState, email: '' }));
        } else {
            setIsValid((prevState) => ({ ...prevState, email: false }));
            setErrors((prevState) => ({ ...prevState, email: 'Email is incorrect' }));

            return false;
        }

        if (!isPasswordValid(fields?.password)) {
            return false;
        }

        if (!isSecondPasswordSame(fields?.password, fields?.repeatPassword)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const userFormData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            repeatPassword: formData.get('repeatPassword'),
        };

        if (isFormValid(userFormData)) {
            const registerRequest = axios.post<any>(REGISTER_URL, userFormData);

            registerRequest
                .then((response) => {
                    login(response?.data);
                })
                .then(() => {
                    setIsModalOpen(true);
                })
                .catch((registerError) => {
                    if (registerError) {
                        setErrors((prevState) => ({
                            ...prevState,
                            main: registerError?.response?.data,
                        }));
                    }
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <SuccessRegisterModal isModalOpen={isModalOpen} />
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
                    Registration
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={!isValid.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                error={!isValid.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={!isValid.email}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={!isValid.password}
                            />
                            <Tooltip
                                sx={{ position: 'absolute', top: '44%' }}
                                title={passwordHintText}
                            >
                                <HelpCenterIcon color="disabled" />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                            <TextField
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Repeat password"
                                type="password"
                                id="repeatPassword"
                                autoComplete="new-password"
                                error={!isValid.repeatPassword}
                            />
                            <Tooltip
                                sx={{ position: 'absolute', top: '44%' }}
                                title={passwordHintText}
                            >
                                <HelpCenterIcon color="disabled" />
                            </Tooltip>
                        </Grid>
                        {
                            !!errors.main
                            && <Alert sx={sxAlert} severity="error">{errors.main}</Alert>
                        }
                        {
                            !!errors.email
                            && <Alert sx={sxAlert} severity="error">{errors.email}</Alert>
                        }
                        {
                            !!errors.password
                            && <Alert sx={sxAlert} severity="error">{errors.password}</Alert>
                        }
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing
                                promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                href="/#"
                                variant="body2"
                                onClick={(event) => setCurrentTab(event, 0)}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />

        </Container>
    );
};

export default RegisterForm;
