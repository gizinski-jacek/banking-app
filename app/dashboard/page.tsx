'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

export default function Dashboard() {
	const router = useRouter();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/login');
		},
	});

	return status === 'loading' ? (
		<Spinner />
	) : (
		session && (
			<div>
				<h3>Dashboard</h3>
				<div>{session.user.firstName}</div>
				<div>{session.user.lastName}</div>
				<div>{(Math.round(123.123 * 100) / 100).toFixed(2)}</div>
				<div>{Number(123.123).toFixed(2)}</div>
				<Button cta={signOut}>Sign Out</Button>
			</div>
		)
	);
}
