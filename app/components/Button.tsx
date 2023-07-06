import Link from 'next/link';

export default function Button({
	children,
	styleClass,
	href,
	cta,
}: {
	children?: React.ReactNode;
	styleClass?: string;
	href?: string;
	cta?: (any?: any) => void;
}) {
	return href ? (
		<Link
			href={href}
			className={`py-1 px-2 rounded-md font-bold text-yellow-300 bg-purple-700 whitespace-nowrap ${styleClass}`}
		>
			{children || 'Button'}
		</Link>
	) : (
		<button
			type='button'
			className={`py-1 px-2 rounded-md font-bold text-yellow-300 bg-purple-700 whitespace-nowrap ${styleClass}`}
			onClick={() => (cta ? cta() : null)}
		>
			{children || 'Button'}
		</button>
	);
}
