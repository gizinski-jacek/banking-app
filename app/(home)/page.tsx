'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '../components/Spinner';

export default function Home() {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') return;
		if (status === 'authenticated') router.push('/dashboard');
	}, [status, router]);

	return status === 'loading' ? <Spinner /> : <div>Home</div>;
}
