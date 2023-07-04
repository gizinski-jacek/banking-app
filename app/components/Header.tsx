'use client';

import Link from 'next/link';
import Button from './Button';
import { useState } from 'react';
import hamburgerMenu from '../styles/Hamburger.module.scss';

export default function Header() {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<div className='flex flex-col gap-5 my-5'>
			<div className='flex flex-row justify-between justify-center'>
				<div className='flex flex-row gap-5 my-5 items-center justify-center'>
					<div className='logo text-center'>
						Big Bux
						<br />
						Banking
					</div>
					<div className='relative' onClick={() => setOpenMenu(!openMenu)}>
						<div
							className={`${hamburgerMenu.icon} ${hamburgerMenu.nav_icon} ${
								openMenu ? hamburgerMenu.open : ''
							}`}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<nav
							className={`${
								openMenu ? 'initial' : 'hidden'
							} py-2 absolute top-100 left-0`}
						>
							<ul className='flex flex-col gap-5 text-xl font-semibold'>
								<li>
									<Link href='/personal-accounts'>Personal Accounts</Link>
								</li>
								<li>
									<Link href='/cards'>Cards</Link>
								</li>
								<li>
									<Link href='/loans'>Loans</Link>
								</li>
								<li>
									<Link href='/mortgage'>Mortgage</Link>
								</li>
								<li>
									<Link href='/insurance'>Insurance</Link>
								</li>
								<li>
									<Link href='/safety-tips'>Safety Tips</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className='flex flex-col gap-5 my-5'>
					<div className='flex gap-5 justify-end text-sm'>
						<div>
							<Link href='/help'>Help</Link>
						</div>
						<div>
							<Link href='/contact'>Contact</Link>
						</div>
						<div>
							<Link href='/language'>Language</Link>
						</div>
					</div>
					<div className='flex justify-between items-center text-lg'>
						<div className='flex gap-5'>
							<Button href='/open-account'>
								<div>Open Account</div>
							</Button>
							<Button href='/login'>
								<div>Log In</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<nav className='hidden md:block py-2 border-purple-600 border-b-2'>
				<ul className='flex justify-between gap-10 text-2xl font-semibold'>
					<li>
						<Link href='/personal-accounts'>Personal Accounts</Link>
					</li>
					<li>
						<Link href='/cards'>Cards</Link>
					</li>
					<li>
						<Link href='/loans'>Loans</Link>
					</li>
					<li>
						<Link href='/mortgage'>Mortgage</Link>
					</li>
					<li>
						<Link href='/insurance'>Insurance</Link>
					</li>
					<li>
						<Link href='/safety-tips'>Safety Tips</Link>
					</li>
					<li>
						<Link href='/news'>News</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
