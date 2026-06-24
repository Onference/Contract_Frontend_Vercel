import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { api } from '../services/api';

export default function AccessGuard({ value, children }) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                await api.post(`/${value}/access`);

                setAllowed(true);
            } catch (error) {
                setAllowed(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [value]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!allowed) {
        return <Navigate to="/" replace />;
    }

    return children;
}