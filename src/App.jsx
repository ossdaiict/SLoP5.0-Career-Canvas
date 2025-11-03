import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Home from './pages/Home';
import { ThemeProvider } from './state/ThemeContext';

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/builder" element={<Builder />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </MainLayout>
            </ThemeProvider>
        </BrowserRouter>
    );
}