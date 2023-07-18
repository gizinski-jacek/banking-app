import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import style from '../styles/ThemeSelect.module.scss';

export default function ThemeSelect() {
	const [openSelect, setOpenSelect] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function selectTheme(value: string) {
		setTheme(value);
		setOpenSelect(false);
	}

	return (
		<div
			className={`${style['theme-select']} ${
				openSelect ? `${style.open}` : ''
			}`}
		>
			<div className={style.toggle}>
				<div onClick={() => setOpenSelect(true)}>TT</div>
			</div>
			<div className={style.options}>
				<div onClick={() => selectTheme('light')}>LL</div>
				<div onClick={() => selectTheme('dark')}>DD</div>
				<div onClick={() => selectTheme('system')}>SS</div>
			</div>
		</div>
	);
}
