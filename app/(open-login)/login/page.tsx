'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
	const router = useRouter();
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const [idValid, setIdValid] = useState<null | boolean | string>(null);
	const [passwordValid, setPasswordValid] = useState<null | boolean | string>(
		null
	);

	async function checkAccountID(e: React.FormEvent, account: string) {
		try {
			e.preventDefault();
			// API request to check for ID in DB
			// Toggle to password form on success
			setIdValid(true);
		} catch (error) {
			console.log(error);
			setIdValid('Incorrect ID');
		}
	}

	async function checkPassword(e: React.FormEvent, password: string) {
		try {
			e.preventDefault();
			// API request to check if password is valid
			// Redirect to dashboard on success
			router.push('/dashboard');
		} catch (error) {
			console.log(error);
			setPasswordValid('Incorrect password');
		}
	}

	return (
		<div>
			{!idValid ? (
				<form>
					<label htmlFor='id'>Login ID</label>
					<input type='id' value={account} />
					<button type='button' onClick={(e) => checkAccountID(e, account)}>
						Submit
					</button>
				</form>
			) : (
				<form>
					<label htmlFor='password'>Password</label>
					<input type='password' value={password} />
					<button type='button' onClick={(e) => checkPassword(e, password)}>
						Submit
					</button>
				</form>
			)}
		</div>
	);
}
