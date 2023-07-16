'use client';

import style from '../styles/Modal.module.scss';
import Button from './Button';

interface Props {
	children: React.ReactNode;
	show: boolean;
	dismiss?: (e: React.MouseEvent) => void;
	styleClass?: string;
	styleObj?: React.CSSProperties;
	dismissBtn?: boolean;
}

export default function Modal({
	children,
	show,
	dismiss,
	styleClass,
	styleObj,
	dismissBtn = true,
}: Props) {
	return (
		<div
			className={`${style.modal} ${show ? `${style.show}` : ''} ${
				styleClass || ''
			}`}
		>
			<div
				className={style.fade}
				onClick={(e) => (dismiss ? dismiss(e) : null)}
			/>
			<div
				className={`${style['modal-content']} flex flex-col items-center gap-2`}
				style={styleObj}
			>
				{children}
				{dismissBtn && (
					<Button cta={dismiss} styleClass='mt-6'>
						Close
					</Button>
				)}
			</div>
		</div>
	);
}
