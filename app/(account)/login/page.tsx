'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoginData } from '../../types/types';
import { loginData } from '../../lib/defaults';
import Button from '../../components/Button';
import { signIn, useSession } from 'next-auth/react';
import Spinner from '@/app/components/Spinner';

export default function Login() {
	const router = useRouter();
	const { status } = useSession();
	const [formData, setFormData] = useState<LoginData>(loginData);
	const [userIdValid, setUserIdValid] = useState<null | boolean>(null);
	const [passwordValid, setPasswordValid] = useState<null | boolean>(null);
	const [userIdError, setUserIdError] = useState<null | string>(null);
	const [passwordError, setPasswordError] = useState<null | string>(null);

	useEffect(() => {
		if (status === 'loading') return;
		if (status === 'authenticated') router.push('/dashboard');
	}, [status, router]);

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function verifyAccount(data: LoginData) {
		try {
			if (!data.userId) {
				setUserIdError('Provide valid account');
			}
			const res = await signIn('credentials-id', {
				userId: data.userId,
				redirect: false,
			});
			if (!res) {
				setUserIdError('Sign In error');
				return;
			}
			// Temporary workaround, find better way to not set
			// session but receive positive response !!!
			if (res.error === 'acc-valid') {
				setUserIdValid(true);
				return;
			}
			if (res.error) {
				throw new Error(res.error);
			}
			setUserIdValid(true);
		} catch (error: any) {
			console.log(error);
			setUserIdError('Incorrect login Id');
		}
	}

	async function verifyPassword(data: LoginData) {
		try {
			if (!data.password) {
				setPasswordError('Provide valid password');
			}
			const res = await signIn('credentials-password', {
				...data,
				redirect: false,
			});
			if (!res) {
				setUserIdError('Sign In error');
				return;
			}
			if (res.error) {
				throw new Error(res.error);
			}
			setUserIdValid(true);
			setPasswordValid(true);
			router.push('/dashboard');
		} catch (error: any) {
			console.log(error);
			setPasswordValid(false);
			setPasswordError('Incorrect password');
		}
	}

	return status === 'loading' ? (
		<Spinner />
	) : (
		<div className='flex flex-col items-center gap-5 mx-auto'>
			{!userIdValid ? (
				<form className='flex flex-col items-center gap-5 mx-auto text-center'>
					<fieldset>
						<label htmlFor='userId'>Account ID</label>
						<input
							className='text-center'
							type='text'
							id='userId'
							name='userId'
							value={formData.userId}
							minLength={8}
							maxLength={64}
							required
							onChange={handleFormChange}
							placeholder='Login ID'
						/>
						{userIdError && (
							<p className='text-red-600 font-weight-semibold underline'>
								{userIdValid}
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
				<form className='flex flex-col items-center gap-5 mx-auto text-center'>
					<fieldset>
						<label htmlFor='password'>Password</label>
						<input
							className='text-center'
							type='password'
							id='password'
							name='password'
							value={formData.password}
							minLength={8}
							maxLength={128}
							required
							onChange={handleFormChange}
						/>
						{passwordError && (
							<p className='text-red-600 font-weight-semibold underline'>
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
