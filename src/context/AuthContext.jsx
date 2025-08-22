// src/context/AuthContext.js

import { createContext, useContext } from 'react';

// Create and export the context object itself
export const AuthContext = createContext(null);

// Create and export the custom hook for consuming the context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}