import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Home from './pages/Home';

export default function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/builder" element={<Builder />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}