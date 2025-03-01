import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); 
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false); 
    }, []);

    const login = (username) => {
        setUser(username);
        localStorage.setItem('user', JSON.stringify(username));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};