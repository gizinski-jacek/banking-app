'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import capitalize from '../lib/capitalize';

export default function Breadcrumbs() {
	const pathname = usePathname();

	return pathname === '/' ? null : (
		<div className='flex gap-1 text-sm'>
			<Link className='font-normal underline' href='/'>
				Home
			</Link>
			{pathname
				.split('/')
				.filter((s) => s)
				.map((path, i, arr) => {
					return (
						<div key={i} className='flex items-center'>
							<div className='p-1 select-none'>{'>'}</div>
							{i + 1 === arr.length ? (
								<div className='py-1 px-2 font-bold'>{capitalize(path)}</div>
							) : (
								<Link className='underline' key={i} href={path}>
									{capitalize(path)}
								</Link>
							)}
						</div>
					);
				})}
		</div>
	);
}
