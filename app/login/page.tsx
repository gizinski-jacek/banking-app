'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginData } from '../lib/types';
import { loginData } from '../lib/defaults';
import Button from '../components/Button';

export default function Login() {
	const router = useRouter();
	const [formData, setFormData] = useState<LoginData>(loginData);
	const [accountValid, setAccountValid] = useState<null | boolean | string>(
		null
	);
	const [passwordValid, setPasswordValid] = useState<null | boolean | string>(
		null
	);

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function verifyAccount(data: LoginData) {
		try {
			// API request to check for ID in DB
			// Toggle to password form on success
			setAccountValid(true);
		} catch (error) {
			console.log(error);
			setAccountValid('Incorrect account');
		}
	}

	async function verifyPassword(data: LoginData) {
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
			{!accountValid ? (
				<form>
					<fieldset>
						<label htmlFor='account'>Account ID</label>
						<input
							type='text'
							id='account'
							name='account'
							value={formData.account}
							required
							onChange={handleFormChange}
						/>
						{typeof accountValid === 'string' && (
							<p className='text-red-600 font-weight-semibold'>
								{accountValid}
							</p>
						)}
					</fieldset>
					<Button
						styleClass='my-3 col-span-2 mx-auto'
						cta={() => verifyAccount(formData)}
					>
						Submit
					</Button>
				</form>
			) : (
				<form>
					<fieldset>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							required
							onChange={handleFormChange}
						/>
						{typeof passwordValid === 'string' && (
							<p className='text-red-600 font-weight-semibold'>
								{passwordValid}
							</p>
						)}
					</fieldset>
					<Button
						styleClass='my-3 col-span-2 mx-auto'
						cta={() => verifyPassword(formData)}
					>
						Submit
					</Button>
				</form>
			)}
			<Button href='/' styleClass='my-3'>
				{`<-`} Go Back
			</Button>
		</div>
	);
}
