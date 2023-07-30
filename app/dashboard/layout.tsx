'use client';

import { signOut } from 'next-auth/react';
import Button from '../components/Button';
import Auth from '../components/Auth';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Auth>
			<nav className='hidden md:block border-purple-600 border-b-2'>
				<ul className='flex justify-between gap-5 text-xl font-semibold whitespace-nowrap'>
					<li>
						<Button href='/dashboard' fillUp={true}>
							Dashboard
						</Button>
					</li>
					<li>
						<Button href='/transfer' fillUp={true}>
							Transfer
						</Button>
					</li>
					<li>
						<Button href='/transfer' fillUp={true}>
							Account
						</Button>
					</li>
					<li>
						<Button cta={signOut}>Sign Out</Button>
					</li>
				</ul>
			</nav>
			{children}
		</Auth>
	);
}
