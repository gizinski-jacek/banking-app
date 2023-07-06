'use client';

import Button from '@/app/components/Button';
import { regularAccFormData } from '@/app/lib/defaults';
import { RegularAccFormData } from '@/app/lib/types';
import { useState } from 'react';
import capitalize from '../lib/capitalize';

interface Props {
	changeAccountType: (type: 'regular' | 'vip' | 'business' | null) => void;
	createAccount: (data: RegularAccFormData) => void;
}

export default function Regular({ changeAccountType, createAccount }: Props) {
	const [formData, setFormData] =
		useState<RegularAccFormData>(regularAccFormData);
	const [formErrors, setFormErrors] = useState<RegularAccFormData | null>(null);

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

	function verifyFields(data: RegularAccFormData) {
		const formErrors = {} as RegularAccFormData;
		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				formErrors[key as keyof RegularAccFormData] = `Invalid ${key}`;
			}
		}
		if (Object.keys(formErrors).length !== 0) setFormErrors(formErrors);
		else createAccount(formData);
	}

	return (
		<div>
			<Button styleClass='my-3' cta={() => changeAccountType(null)}>
				Open Different Account
			</Button>
			<form className='flex flex-col gap-1'>
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
			</form>
			<Button styleClass='my-3' cta={() => verifyFields(formData)}>
				Submit
			</Button>
		</div>
	);
}
