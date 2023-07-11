'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginData } from '../../lib/types';
import { loginData } from '../../lib/defaults';
import Button from '../../components/Button';
import axios from 'axios';

export default function Login() {
	const router = useRouter();
	const [formData, setFormData] = useState<LoginData>(loginData);
	const [accountIDValid, setAccountIDValid] = useState<null | boolean | string>(
		null
	);
	const [passwordValid, setPasswordValid] = useState<null | boolean | string>(
		null
	);
	// refactor errors states

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function verifyAccount(data: LoginData) {
		try {
			if (!data.accountID) {
				setAccountIDValid('Provide valid account');
			}
			await axios.post('/api/login?cred=login', data);
			setAccountIDValid(true);
		} catch (error) {
			console.log(error);
			setAccountIDValid('Incorrect account ID');
		}
	}

	async function verifyPassword(data: LoginData) {
		try {
			if (!data.password) {
				setPasswordValid('Provide valid password');
			}
			await axios.post('/api/login?cred=password', data);
			router.push('/dashboard');
		} catch (error) {
			console.log(error);
			setPasswordValid('Incorrect password');
		}
	}

	return (
		<div className='flex flex-col items-center gap-5 mx-auto'>
			{!accountIDValid ? (
				<form className='flex flex-col items-center gap-5 mx-auto text-center'>
					<fieldset>
						<label htmlFor='accountID'>Account ID</label>
						<input
							className='text-center'
							type='text'
							id='accountID'
							name='accountID'
							value={formData.accountID}
							minLength={8}
							maxLength={64}
							required
							onChange={handleFormChange}
							placeholder='Account ID'
						/>
						{typeof accountIDValid === 'string' && (
							<p className='text-red-600 font-weight-semibold'>
								{accountIDValid}
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
							minLength={8}
							maxLength={128}
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
			<Button href='/' buttonLike={true}>
				{`<- Go Back To Home Page`}
			</Button>
		</div>
	);
}
