import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function MainLayout({ children }) {
	return (<>
        <Header />
		<div>
            {children}
		</div>
        <Footer />
        </>
	);
}
