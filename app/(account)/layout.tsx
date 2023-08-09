import Auth from '../components/Auth';

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Auth>{children}</Auth>;
}
