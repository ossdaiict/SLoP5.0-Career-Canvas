import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';

export default function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/builder" element={<Builder />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}