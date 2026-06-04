import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './layouts/ProtectedLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Form from './pages/Form';
//import Pdf from './pages/Pdf';
function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
                {
                //<Route path="/pdf/:id" element={<Pdf />} />
                }
            </Route>
        </Routes>
    );
}

export default App;