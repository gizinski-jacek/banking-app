'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Providers({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null | undefined;
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<SessionProvider session={session}>
			<ThemeProvider>{children}</ThemeProvider>
		</SessionProvider>
	);
}
