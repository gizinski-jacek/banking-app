import Link from 'next/link';

interface CommonProps {
	children?: React.ReactNode;
	styleClass?: string;
}

type ConditionalProps =
	| {
			href?: string;
			buttonLike?: boolean;
			fillUp?: never;
			cta?: never;
	  }
	| {
			href?: string;
			buttonLike?: never;
			fillUp?: boolean;
			cta?: never;
	  }
	| {
			href?: never;
			buttonLike?: never;
			fillUp?: never;
			cta?: (any?: any) => void;
	  };

type Props = CommonProps & ConditionalProps;

export default function Button({
	children,
	styleClass,
	href,
	buttonLike = false,
	fillUp = false,
	cta,
}: Props) {
	return href ? (
		<Link
			href={href}
			className={`${styleClass || ''} ${
				buttonLike
					? 'rounded-lg border-2 border-red-700 bg-cstm-btn-bg text-cstm-btn-color capitalize hover:shadow hover:shadow-cstm-shadow'
					: ''
			} ${fillUp ? 'fill-up' : ''}`}
		>
			{children || 'Button'}
		</Link>
	) : (
		<button
			type='button'
			className={`rounded-lg border-1 border-black capitalize hover:shadow hover:shadow-cstm-shadow ${
				styleClass || ''
			}`}
			onClick={() => (cta ? cta() : null)}
		>
			{children || 'Button'}
		</button>
	);
}
