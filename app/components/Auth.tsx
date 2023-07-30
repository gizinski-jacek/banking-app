'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import { useEffect } from 'react';

export default function Auth({
	children,
	redirect = '/login',
}: {
	children: React.ReactNode;
	redirect?: string;
	successRedirect?: string;
}) {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') router.push(redirect);
	}, [status, router, redirect]);

	if (status === 'loading') return <Spinner />;

	if (status === 'authenticated') return children;

	return null;
}
