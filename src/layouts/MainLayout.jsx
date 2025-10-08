import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function MainLayout({ children }) {
	return (
		<div>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
