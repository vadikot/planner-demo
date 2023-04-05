import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import { Alert } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

interface SuccessRegisterModalProps {
    isModalOpen: boolean;
}

const SuccessRegisterModal = ({ isModalOpen }:SuccessRegisterModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const handleStartButton = () => {
        navigate('/dashboard/home');
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isModalOpen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <Alert sx={{ mt: 2 }} severity="success">
                    You have successfully registered.
                </Alert>
            </DialogContent>
            <DialogActions sx={{ alignSelf: 'center' }}>
                <Button
                    sx={{ mb: 2, alignSelf: 'center' }}
                    variant="contained"
                    onClick={handleStartButton}
                    autoFocus
                >
                    Start
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessRegisterModal;
