'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import capitalize from '../lib/capitalize';

export default function Breadcrumbs() {
	const pathname = usePathname();

	return pathname === '/' ? null : (
		<div className='flex gap-1 text-sm'>
			<Link href='/'>Home</Link>
			{pathname.split('/').map((path, i, arr) => {
				return pathname === `/${path}` ? (
					<>
						<div className='underline'>{capitalize(path)}</div>
						{i !== arr.length - 1 && <span>{'>'}</span>}
					</>
				) : (
					<>
						<Link key={i} href={path}>
							{capitalize(path)}
						</Link>
						{i !== arr.length - 1 && <span>{'>'}</span>}
					</>
				);
			})}
		</div>
	);
}
