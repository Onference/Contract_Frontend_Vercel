import React from 'react';
import { useAuth } from '../hooks/useAuth';
const Home = () => {
     const { email } = useAuth();
    return (
        <div>
            <h1>Namaste {email}</h1>
        </div>
    );
};

export default Home;