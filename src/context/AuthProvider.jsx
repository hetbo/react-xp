// src/context/AuthProvider.jsx

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext'; // Import the context from our new file

// This file now ONLY exports a React component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ... useEffect logic is the same ...
        try {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                setUser(JSON.parse(userCookie));
            }
        } catch (error) {
            Cookies.remove('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (username) => {
        // ... login logic is the same ...
        return new Promise(resolve => {
            setTimeout(() => {
                const userData = { name: username, email: `${username}@example.com` };
                setUser(userData);
                Cookies.set('user', JSON.stringify(userData), { expires: 1, path: '/' });
                resolve(userData);
            }, 1000);
        });
    };

    const logout = (callback) => {

        setUser(null);
        Cookies.remove('user', { path: '/' });

        // If a callback function was provided, call it.
        if (callback) {
            callback();
        }
    };


    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}