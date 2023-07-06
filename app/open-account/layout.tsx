import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';

export default function OpenAccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			<Breadcrumbs />
			{children}
		</div>
	);
}
