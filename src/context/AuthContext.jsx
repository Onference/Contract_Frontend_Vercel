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
            
            const email = response.data.email;
            const name = response.data.name;
            
            setEmail(email);
            setName(name);
            setIsAuthenticated(true);

        } catch (error) {
            setIsAuthenticated(false);
            setEmail(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
   
       if (token) {
           localStorage.setItem('token', token);
           window.history.replaceState({}, document.title, window.location.pathname);
       }
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, name, email }}>
            {children}
        </AuthContext.Provider>
    );
};