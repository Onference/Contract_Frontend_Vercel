import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [name,setName] = useState(null)
    const checkAuthStatus = async () => {
        try {
            const response = await api.get('/');
            setEmail(response.data.email);
            setName(response.data.name)
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            setEmail(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, email, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};