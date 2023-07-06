'use client';

import Button from '@/app/components/Button';
import { businessAccFormData } from '@/app/lib/defaults';
import { BusinessAccFormData } from '@/app/lib/types';
import { useState } from 'react';
import capitalize from '../lib/capitalize';

interface Props {
	changeAccountType: (type: 'regular' | 'vip' | 'business' | null) => void;
	createAccount: (data: BusinessAccFormData) => void;
}

export default function Business({ changeAccountType, createAccount }: Props) {
	const [formData, setFormData] =
		useState<BusinessAccFormData>(businessAccFormData);
	const [formErrors, setFormErrors] = useState<BusinessAccFormData | null>(
		null
	);

	function handleFormChange(e: React.FormEvent) {
		const { name, value } = e.target as typeof e.target & {
			name: string;
			value: string;
		};
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function verifyFields(data: BusinessAccFormData) {
		const formErrors = {} as BusinessAccFormData;
		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				formErrors[key as keyof BusinessAccFormData] = `Invalid ${key}`;
			}
		}
		if (Object.keys(formErrors).length !== 0) setFormErrors(formErrors);
		else createAccount(formData);
	}

	return (
		<div>
			<form className='flex flex-col gap-1'>
				<h1>Regular Account</h1>
				<label htmlFor='first_name'>First Name</label>
				<input
					type='text'
					id='first_name'
					name='first_name'
					value={formData.first_name}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.first_name && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.first_name)}
					</p>
				)}
				<label htmlFor='last_name'>Last Name</label>
				<input
					type='text'
					id='last_name'
					name='last_name'
					value={formData.last_name}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.last_name && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.last_name)}
					</p>
				)}
				<label htmlFor='company_name'>Company Name</label>
				<input
					type='text'
					id='company_name'
					name='company_name'
					value={formData.company_name}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.company_name && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.company_name)}
					</p>
				)}
				<label htmlFor='address'>Address</label>
				<input
					type='text'
					id='address'
					name='address'
					value={formData.address}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.address && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.address)}
					</p>
				)}
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.email && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.email)}
					</p>
				)}
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					name='password'
					value={formData.password}
					required
					onChange={handleFormChange}
				/>
				{formErrors?.password && (
					<p className='text-red-600 font-weight-semibold'>
						{capitalize(formErrors.password)}
					</p>
				)}
				<Button styleClass='my-3' cta={() => verifyFields(formData)}>
					Submit
				</Button>
			</form>
			<Button styleClass='my-3' cta={() => changeAccountType(null)}>
				Open Different Account
			</Button>
		</div>
	);
}
