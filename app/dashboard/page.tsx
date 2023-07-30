'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session } = useSession();

	return (
		session && (
			<div>
				<h3>Dashboard</h3>
				<div>{session.user.firstName}</div>
				<div>{session.user.lastName}</div>
			</div>
		)
	);
}
