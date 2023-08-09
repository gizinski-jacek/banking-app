'use client';

import { useSession } from 'next-auth/react';
import capitalize from '../lib/capitalize';

export default function Dashboard() {
	const { data: session } = useSession();

	return (
		session && (
			<div className='flex'>
				{session.user.accounts.map((acc) => {
					return (
						<div
							key={acc._id}
							className='p-2 rounded-md border-2 border-cstm-shadow flex flex-col gap-2'
						>
							<h3>{capitalize(acc.accountType)}</h3>
							<div>
								{(Math.round(acc.balance * 100) / 100).toFixed(2)}{' '}
								{acc.currency}
							</div>
						</div>
					);
				})}
			</div>
		)
	);
}
