import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import './styles/global.css';

export default function App() {
    return (
        <MainLayout>
            <Home />
        </MainLayout>
    );
}