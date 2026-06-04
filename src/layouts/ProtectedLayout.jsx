import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import NavBar from '../components/NavBar';

export const ProtectedLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? (
        <div style={{ fontFamily: 'sans-serif' }}>
            <NavBar />

            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};