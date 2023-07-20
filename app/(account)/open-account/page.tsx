'use client';

import Button from '@/app/components/Button';
import {
	BusinessAccFormData,
	BasicAccFormData,
	VipAccFormData,
	BasicAccFormErrors,
} from '@/app/types/types';
import axios, { AxiosError } from 'axios';

import { useState } from 'react';
import Business from './business';
import Basic from './basic';
import Vip from './vip';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/Modal';
import Spinner from '@/app/components/Spinner';

export default function OpenAccount() {
	const [accType, setAccType] = useState<'basic' | 'vip' | 'business' | null>(
		null
	);
	const [formErrors, setFormErrors] = useState<string[] | null>(null);
	const [fetching, setFetching] = useState(false);
	const [userId, setUserId] = useState<null | string>(null);
	const router = useRouter();

	function changeUserType(type: 'basic' | 'vip' | 'business' | null) {
		setAccType(type);
	}

	async function createAccount(
		data: BasicAccFormData | VipAccFormData | BusinessAccFormData
	) {
		try {
			const formErrors = {} as BasicAccFormErrors;
			for (const [key, value] of Object.entries(data)) {
				if (!value) {
					formErrors[key as keyof BasicAccFormErrors] = `Invalid ${key}`;
				}
			}
			if (Object.keys(formErrors).length !== 0) throw new Error('formErrors');
			setFetching(true);
			const res = await axios.post(
				`/api/open-account?accType=${accType}`,
				data
			);
			setUserId(res.data);
			setFetching(false);
		} catch (error: any) {
			console.log(error);
			setFormErrors(
				error.response.data
					? error.response.data.split(',')
					: 'Unknown server error.'
			);
			setFetching(false);
		}
	}

	function dismissModal(e: React.MouseEvent) {
		e.stopPropagation();
		if (userId) {
			setUserId(null);
			router.push('/login');
		}
		if (formErrors) {
			setFormErrors(null);
		}
		setFetching(false);
	}

	return (
		<div className='flex flex-col items-center gap-10'>
			{fetching && <Spinner />}
			<Modal show={!!userId || !!formErrors} dismiss={dismissModal}>
				{userId ? (
					<>
						<p>Your login Id:</p>
						<h3>{userId}</h3>
						<p>Make sure you remember it.</p>
					</>
				) : formErrors ? (
					<>
						{formErrors.map((str, i) => {
							return <p key={i}>{str}</p>;
						})}
					</>
				) : null}
			</Modal>
			{/* Fix dropdown anim not working (max-h-full issue) !!! */}
			<div className='flex flex-col items-center text-center p-5'>
				<div
					className={`overflow-hidden ease-in-out duration-300 ${
						accType === 'basic' ? 'max-h-full delay-500' : 'max-h-0'
					}`}
				>
					<Basic
						changeUserType={changeUserType}
						createAccount={createAccount}
						errors={formErrors}
					/>
				</div>
				<div
					className={`overflow-hidden ease-in-out duration-300 ${
						accType === 'vip' ? 'max-h-full delay-500' : 'max-h-0'
					}`}
				>
					<Vip
						changeUserType={changeUserType}
						createAccount={createAccount}
						errors={formErrors}
					/>
				</div>
				<div
					className={`overflow-hidden ease-in-out duration-300 ${
						accType === 'business' ? 'max-h-full delay-500' : 'max-h-0'
					}`}
				>
					<Business
						changeUserType={changeUserType}
						createAccount={createAccount}
						errors={formErrors}
					/>
				</div>
				<div
					className={`grid grid-cols-3 gap-5 md:flex-row overflow-hidden ease-in-out duration-300 ${
						accType === null ? 'max-h-full delay-500' : 'max-h-0'
					}`}
				>
					<div className='flex flex-col gap-2'>
						<h2>Basic Account</h2>
						<p>Simple account for non-demanding users.</p>
						<Button styleClass='mt-auto' cta={() => changeUserType('basic')}>
							Open Basic Account
						</Button>
					</div>
					<div className='flex flex-col gap-2'>
						<h2>Vip Account</h2>
						<p>Special account with extra bells and whistles.</p>
						<Button styleClass='mt-auto' cta={() => changeUserType('vip')}>
							Open Vip Account
						</Button>
					</div>
					<div className='flex flex-col gap-2'>
						<h2>Business Account</h2>
						<p>Best for brave entrepreneurs.</p>
						<Button styleClass='mt-auto' cta={() => changeUserType('business')}>
							Open Business Account
						</Button>
					</div>
				</div>
			</div>
			<Button href='/' buttonLike={true}>
				{`<- Go Back To Home Page`}
			</Button>
		</div>
	);
}
