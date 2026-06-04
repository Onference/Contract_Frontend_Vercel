import React from 'react';
import { useAuth } from '../hooks/useAuth';
const Home = () => {
     const { name } = useAuth();
    return (
        <div>
            <h1>Namaste {name}</h1>
        </div>
    );
};

export default Home;