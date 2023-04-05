import React, { useContext, useState } from 'react';
import './styles/App.css';
import AuthProvider from '~/components/Auth/lib/AuthConext';
import { AppRouter } from './pages';

const App = () => (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
);

export default App;
