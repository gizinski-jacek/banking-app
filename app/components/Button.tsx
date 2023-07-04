import Link from 'next/link';

export default function Button({
	children,
	href,
}: {
	children?: React.ReactNode;
	href?: string;
}) {
	return href ? (
		<Link
			href={href}
			className='py-1 px-2 rounded-md font-bold text-yellow-300 bg-purple-700'
		>
			{children || 'Button'}
		</Link>
	) : (
		<div className='py-1 px-2 rounded-md font-bold text-yellow-300 bg-purple-700'>
			{children || 'Button'}
		</div>
	);
}
