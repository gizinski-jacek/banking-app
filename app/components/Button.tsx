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
		<Link href={href} className={styleClass}>
			{children || 'Button'}
		</Link>
	) : (
		<button
			type='button'
			className={styleClass}
			onClick={() => (cta ? cta() : null)}
		>
			{children || 'Button'}
		</button>
	);
}
