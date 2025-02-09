import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for user info on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Parse the stored user
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                localStorage.removeItem('user'); // Remove invalid data
            }
        }
    }, []);


    const login = (username) => {
        setUser(username);
        localStorage.setItem('user', JSON.stringify(username)); // Store user info in local storage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user info from local storage
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};