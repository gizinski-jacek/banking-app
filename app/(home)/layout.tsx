import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<Breadcrumbs />
			{children}
		</>
	);
}
