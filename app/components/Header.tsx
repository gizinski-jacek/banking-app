'use client';

import Link from 'next/link';
import Button from './Button';
import { useState } from 'react';
import hamburgerMenu from '../styles/Hamburger.module.scss';
import ThemeSelect from './ThemeSelect';

export default function Header() {
	const [openHamMenu, setOpenHamMenu] = useState(false);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-row justify-between justify-center'>
				<div className='flex flex-row gap-5 items-center justify-center'>
					<div className='logo text-center'>
						Big Bux
						<br />
						Banking
					</div>
					<div
						className='md:hidden relative'
						onClick={() => setOpenHamMenu(!openHamMenu)}
					>
						<div
							className={`${hamburgerMenu.icon} ${
								hamburgerMenu.nav_icon
							} overflow-hidden ease-in-out duration-300 ${
								openHamMenu ? hamburgerMenu.open : ''
							}`}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<nav
							className={`${
								openHamMenu ? 'max-h-screen' : 'max-h-0'
							} absolute top-100 left-0 overflow-hidden`}
						>
							<ul className='flex flex-col gap-2 text-lg font-semibold'>
								<li>
									<Button href='/personal-accounts' styleClass='p-0'>
										Personal Accounts
									</Button>
								</li>
								<li>
									<Button href='/cards' styleClass='p-0'>
										Cards
									</Button>
								</li>
								<li>
									<Button href='/loans' styleClass='p-0'>
										Loans
									</Button>
								</li>
								<li>
									<Button href='/mortgage' styleClass='p-0'>
										Mortgage
									</Button>
								</li>
								<li>
									<Button href='/insurance' styleClass='p-0'>
										Insurance
									</Button>
								</li>
								<li>
									<Button href='/safety-tips' styleClass='p-0'>
										Safety Tips
									</Button>
								</li>
								<li>
									<Button href='/news' styleClass='p-0'>
										News
									</Button>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className='flex flex-col gap-5'>
					<div className='flex gap-2 items-center justify-end'>
						<div>
							<Link href='/help'>Help</Link>
						</div>
						<div>
							<Link href='/contact'>Contact</Link>
						</div>
						<div>
							<Link href='/language'>Language</Link>
						</div>
						{/* fix animatyion !!! */}
						<ThemeSelect />
					</div>
					<div className='flex justify-end items-center text-lg'>
						<div className='flex gap-5'>
							<Button href='/open-account' buttonLike={true}>
								<div>Open Account</div>
							</Button>
							<Button href='/login' buttonLike={true}>
								<div>Log In</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<nav className='hidden md:block border-purple-600 border-b-2'>
				<ul className='flex justify-between gap-5 text-xl font-semibold whitespace-nowrap'>
					<li>
						<Button href='/personal-accounts' fillUp={true}>
							Personal Accounts
						</Button>
					</li>
					<li>
						<Button href='/cards' fillUp={true}>
							Cards
						</Button>
					</li>
					<li>
						<Button href='/loans' fillUp={true}>
							Loans
						</Button>
					</li>
					<li>
						<Button href='/mortgage' fillUp={true}>
							Mortgage
						</Button>
					</li>
					<li>
						<Button href='/insurance' fillUp={true}>
							Insurance
						</Button>
					</li>
					<li>
						<Button href='/safety-tips' fillUp={true}>
							Safety Tips
						</Button>
					</li>
					<li>
						<Button href='/news' fillUp={true}>
							News
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	);
}
