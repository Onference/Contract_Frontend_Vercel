import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './layouts/ProtectedLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Form from './pages/Form';
import HybridForm from './pages/HybridForm';
function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
                <Route path="/hybrid/form" element={<HybridForm />} />
            </Route>
        </Routes>
    );
}

export default App;