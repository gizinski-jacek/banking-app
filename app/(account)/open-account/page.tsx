'use client';

import Button from '@/app/components/Button';
import {
	BusinessAccFormData,
	RegularAccFormData,
	VipAccFormData,
} from '@/app/types/types';
import axios from 'axios';

import { useState } from 'react';
import Business from './business';
import Regular from './regular';
import Vip from './vip';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/Modal';
import Spinner from '@/app/components/Spinner';

export default function OpenAccount() {
	const [accType, setAccType] = useState<'regular' | 'vip' | 'business' | null>(
		null
	);
	const [formErrors, setFormErrors] = useState<any | null>(null);
	const [fetching, setFetching] = useState(false);
	const [userId, setUserId] = useState<null | string>(null);
	const router = useRouter();

	function changeUserType(type: 'regular' | 'vip' | 'business' | null) {
		setAccType(type);
	}

	async function createAccount(
		data: RegularAccFormData | VipAccFormData | BusinessAccFormData
	) {
		try {
			const formErrors = {} as RegularAccFormData;
			for (const [key, value] of Object.entries(data)) {
				if (!value) {
					formErrors[key as keyof RegularAccFormData] = `Invalid ${key}`;
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
			setFormErrors(error);
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
			<Modal show={userId || formErrors} dismiss={dismissModal}>
				{userId ? (
					<>
						<p>Your login Id:</p>
						<h3>{userId}</h3>
						<p>Make sure you remember it.</p>
					</>
				) : formErrors ? (
					<>render errors !!!</>
				) : null}
			</Modal>
			{/* Fix dropdown anim not working (max-h-screen issue) !!! */}
			<div className='flex flex-col items-center text-center p-5'>
				<div
					className={`overflow-hidden ease-in-out duration-300 ${
						accType === 'regular' ? 'max-h-screen delay-500' : 'max-h-0'
					}`}
				>
					<Regular
						changeUserType={changeUserType}
						createAccount={createAccount}
						errors={formErrors}
					/>
				</div>
				<div
					className={`overflow-hidden ease-in-out duration-300 ${
						accType === 'vip' ? 'max-h-screen delay-500' : 'max-h-0'
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
						accType === 'business' ? 'max-h-screen delay-500' : 'max-h-0'
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
						accType === null ? 'max-h-screen delay-500' : 'max-h-0'
					}`}
				>
					<div className='flex flex-col gap-2'>
						<h2>Regular Account</h2>
						<p>Simple account for non-demanding users.</p>
						<Button styleClass='mt-auto' cta={() => changeUserType('regular')}>
							Open Regular Account
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
