'use client';

import Button from '@/app/components/Button';
import {
	BusinessAccFormData,
	RegularAccFormData,
	VIPAccFormData,
} from '@/app/lib/types';
import axios from 'axios';

import { useState } from 'react';
import Business from './business';
import Regular from './regular';
import VIP from './vip';

export default function OpenAccount() {
	const [accType, setAccType] = useState<'regular' | 'vip' | 'business' | null>(
		null
	);

	function changeAccountType(type: 'regular' | 'vip' | 'business' | null) {
		setAccType(type);
	}

	async function createAccount(
		data: RegularAccFormData | VIPAccFormData | BusinessAccFormData
	) {
		try {
			const formErrors = {} as RegularAccFormData;
			for (const [key, value] of Object.entries(data)) {
				if (!value) {
					formErrors[key as keyof RegularAccFormData] = `Invalid ${key}`;
				}
			}
			if (Object.keys(formErrors).length !== 0) throw new Error('formErrors');
			const d = await axios.post(`/api/open-account?accType=${accType}`, data);
			console.log(d);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='flex flex-col items-center text-center p-5'>
			<div
				className={`overflow-hidden ease-in-out duration-300 ${
					accType === 'regular' ? 'max-h-screen delay-500' : 'max-h-0'
				}`}
			>
				<Regular
					changeAccountType={changeAccountType}
					createAccount={createAccount}
				/>
			</div>
			<div
				className={`overflow-hidden ease-in-out duration-300 ${
					accType === 'vip' ? 'max-h-screen delay-500' : 'max-h-0'
				}`}
			>
				<VIP
					changeAccountType={changeAccountType}
					createAccount={createAccount}
				/>
			</div>
			<div
				className={`overflow-hidden ease-in-out duration-300 ${
					accType === 'business' ? 'max-h-screen delay-500' : 'max-h-0'
				}`}
			>
				<Business
					changeAccountType={changeAccountType}
					createAccount={createAccount}
				/>
			</div>
			<div
				className={`flex flex-col gap-5 md:flex-row justify-center text-center overflow-hidden ease-in-out duration-300 ${
					accType === null ? 'max-h-screen delay-500' : 'max-h-0'
				}`}
			>
				<div className='flex flex-col gap-2'>
					<h2>Regular Account</h2>
					<p>Simple account for non-demanding users.</p>
					<Button cta={() => changeAccountType('regular')}>
						Open Regular Account
					</Button>
				</div>
				<div className='flex flex-col gap-2'>
					<h2>VIP Account</h2>
					<p>Special account with extra bells and whistles.</p>
					<Button cta={() => changeAccountType('vip')}>Open VIP Account</Button>
				</div>
				<div className='flex flex-col gap-2'>
					<h2>Business Account</h2>
					<p>Best for brave entrepreneurs.</p>
					<Button cta={() => changeAccountType('business')}>
						Open Business Account
					</Button>
				</div>
			</div>
		</div>
	);
}
