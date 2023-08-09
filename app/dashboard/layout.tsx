'use client';

import { signOut, useSession } from 'next-auth/react';
import Button from '../components/Button';
import Auth from '../components/Auth';
import ThemeSelect from '../components/ThemeSelect';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const path = usePathname();
	const { data: session } = useSession();

	return (
		<Auth>
			<nav className='hidden md:flex justify-between items-center border-purple-600 border-b-2'>
				<ul className='flex justify-between items-center gap-5 text-xl font-semibold whitespace-nowrap'>
					<li>
						<Button
							href='/dashboard'
							active={path === '/dashboard'}
							fillUp={true}
						>
							Dashboard
						</Button>
					</li>
					<li>
						<Button
							href='/dashboard/accounts'
							active={path === '/dashboard/accounts'}
							fillUp={true}
						>
							Accounts
						</Button>
					</li>
					<li>
						<Button
							href='/dashboard/transfer'
							active={path === '/dashboard/transfer'}
							fillUp={true}
						>
							Transfer
						</Button>
					</li>
				</ul>
				<div className='flex items-center gap-2'>
					<h3>
						{session?.user.firstName} {session?.user.lastName}
					</h3>
					<ThemeSelect />
					<Button styleClass='p-0 px-1' cta={signOut}>
						Sign Out
					</Button>
				</div>
			</nav>
			{children}
		</Auth>
	);
}
