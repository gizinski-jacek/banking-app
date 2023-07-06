'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginData } from '../lib/types';
import { loginData } from '../lib/defaults';

export default function Login() {
	const router = useRouter();
	const [formData, setFormData] = useState<LoginData>(loginData);
	const [idValid, setIdValid] = useState<null | boolean | string>(null);
	const [passwordValid, setPasswordValid] = useState<null | boolean | string>(
		null
	);

	function handleFormChange(e: React.FormEvent) {
		const { name, value } = e.target as typeof e.target & {
			name: string;
			value: string;
		};
		setFormData({ ...formData, [name]: value });
	}

	async function checkAccount(account: string) {
		try {
			// API request to check for ID in DB
			// Toggle to password form on success
			setIdValid(true);
		} catch (error) {
			console.log(error);
			setIdValid('Incorrect ID');
		}
	}

	async function checkPassword(password: string) {
		try {
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
					<label htmlFor='account'>Login ID</label>
					<input
						type='text'
						id='account'
						name='account'
						value={formData.account}
						required
						onChange={handleFormChange}
					/>
					<button type='button' onClick={(e) => checkAccount(formData.account)}>
						Submit
					</button>
				</form>
			) : (
				<form>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						required
						onChange={handleFormChange}
					/>
					<button
						type='button'
						onClick={(e) => checkPassword(formData.password)}
					>
						Submit
					</button>
				</form>
			)}
		</div>
	);
}
