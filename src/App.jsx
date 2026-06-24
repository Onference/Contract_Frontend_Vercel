import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import AccessGuard from './components/AccessGuard';

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
            <Route
            path="/form"
            element={
                <AccessGuard value="kol">
                    <Form />
                </AccessGuard>
            }
        />

        <Route
            path="/hybrid/form"
            element={
                <AccessGuard value="hybrid">
                    <HybridForm />
                </AccessGuard>
            }
        />
            </Route>
        </Routes>
    );
}

export default App;