'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Spinner from './Spinner';
import { useEffect } from 'react';

export default function Auth({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { status } = useSession();
	const path = usePathname();

	useEffect(() => {
		const match = path.includes('dashboard');
		if (status === 'unauthenticated' && match) router.push('/login');
		if (status === 'authenticated' && !match) router.push('/dashboard');
	}, [status, router, path]);

	if (status === 'loading') return <Spinner />;

	return children;
}
